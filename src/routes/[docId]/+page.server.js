import { error } from "@sveltejs/kit"
import { results } from "$db/collections/results"
import { branches } from "$db/collections/branches"

export async function load({ params }) {
  let docId = params.docId
  
  try {
    let queryBranches = ({ "branch.code": "002" })
    let branchData = await branches.findOne(queryBranches, { projection: { _id: 0, academicYear: 1 } })

    async function resultDataForCurrentSession() {
      const branchCurrentSession = branchData?.academicYear?.session

      let queryOpt = { projection: { _id: 0 } }
      let query = { "meta.session": branchCurrentSession, "meta.studtId": docId }
      
      let res = await results.findOne(query, queryOpt)
      
      return res
    }

    return { res: resultDataForCurrentSession() }
  } catch (err) {
    console.log(`Error Result Page: ${err}`)

    throw error('500', { message: 'Server Error: Please try again in a little while' })
  }
}