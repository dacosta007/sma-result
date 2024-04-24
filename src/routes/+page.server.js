import { error, invalid } from "@sveltejs/kit"
import { results } from "$db/collections/results"
import { branches } from "$db/collections/branches"
import { getBranchInfo, getResultData } from "$db/queryUtils/dbQueries"

export async function load() {
  try {
    let queryBranches = ({ "branch.code": "002" })
    let branchData = await branches.findOne(queryBranches, { projection: { _id: 0, academicYear: 1, contact: 1 } })

    async function resultDataForCurrentSession() {
      const branchCurrentSession = branchData?.academicYear?.session
      const queryParams = { 'meta.session': branchCurrentSession }
      let resultData = await results.find(queryParams, { projection: { _id: 0 } }).toArray()
      return resultData
    }

    return {
      branchInfo: branchData,
      resultData: resultDataForCurrentSession()
    }
  } catch (err) {
    console.log(`Error Home page: ${err}`)
    throw error(500, "Something went wrong, please try again later")
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  updateAcademicYear: async ({ request }) => {
    // get from data
    const frmData = Object.fromEntries(await request.formData())
    const { session, currentTerm, currentTermBegins, currentTermEnds } = frmData
    const { nextTerm, nextTermBegins } = frmData

    // sanitize form data to be updated

    // check if form data aren't empty
    const chkArr = [session, currentTerm, currentTermBegins, currentTermEnds, nextTerm] // all fields to check
    let chkedArr = chkArr.some(ele => ele === '')
    if (chkedArr != false) {
      return invalid(400, {
        error: true,
        message: "All fields must be filled correctly with required appropriate values. Please fill them and try again."
      })
    }

    try {
      const uptdData = { session, currentTerm, currentTermBegins, currentTermEnds, nextTerm, nextTermBegins }

      // update branch academic info
      const dbQuery = { "branch.code": "002" }
      const updtParams = { $set: { academicYear: uptdData } }
      const updtRes = await branches.updateOne(dbQuery, updtParams)
      
      // if any updating in DB
      if (updtRes?.modifiedCount < 1) {
        return invalid(501, {
          error: true,
          message: "Something went wrong while updating data. Please try again in a little while."
        })
      }

      // get results(reports) datasets for the current academic year updated to 
      const getReports = await getResultData(session)

      return {
        success: true,
        updtAcademicInfo: uptdData,
        resultData: getReports
      }
    } catch (err) {
      console.error(`Error updating academic info: ${err}`)

      return error(500, {
        error: true,
        message: "Unable to update your data at the moment, please try again in a little bit."
      })
    }
  } 
};