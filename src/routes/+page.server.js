import { results } from "$db/collections/results"
import { branches } from "$db/collections/branches"


export async function load() {
  try {
    let queryBranches = ({ "branch.code": "002" })
    let branchData = await branches.findOne(queryBranches, { projection: { _id: 0, academicYear: 1, contact: 1 } })
    let resultData = await results.find({}, { projection: { _id: 0 } }).toArray()

    return {
      branchInfo: branchData,
      resultData
    }
  } catch (err) {
    console.log(`Error Home page: ${err}`)
    return {}
  }
}