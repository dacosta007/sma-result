import { error } from "@sveltejs/kit"
import { results } from "$db/collections/results"
import { branches } from "$db/collections/branches"


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