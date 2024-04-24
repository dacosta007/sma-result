import { students } from "$db/collections/students"
import { error } from "@sveltejs/kit"
import { getBranchInfo } from "$db/queryUtils/dbQueries"


export async function load({ params }) {
  let slip = params.slipId

  try {
    // db query
    let query = { studtId: slip }
    let queryOpt = { projection: { _id: 0 } }

    // find pre-reg slip
    let res = await students.findOne(query, queryOpt)

    // get the student's sch branch details
    let branchCode = (res.studtId).length < 10 ? '002' : (res.studtId).slice(2, 5)
    let branchInfo = await getBranchInfo(branchCode)

    return {
      std: res,
      branchInfo
    }
  } catch (err) {
    console.log(`Pre-reg Slip Error: ${err}`)
    throw error(500, { message: 'Server Error!. Please try again in a little while' })
  }
}