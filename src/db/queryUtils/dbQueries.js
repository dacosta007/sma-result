import { results } from "$db/collections/results"
import { branches } from "$db/collections/branches"
import { students } from "$db/collections/students"


/* help get Result(Report) dataset for a specified session from the DB */
export async function getResultData(session="2022/2023") {
  try {
    const query = { 'meta.session': session }
    const resultData = await results.find(query, { projection: { _id: 0 } }).toArray()
    return resultData;
  } catch (err) {
    console.error(`Unable to query "Result Dataset" in DB(Results Collection): ${err}`)
    return { error: true, message: "Error: Unable to query 'Results' data in DB(Results Collection)"}
  }
}


/* help get info about the academic year of a branch under the sch. */
export async function getBranchInfo(branchCode="002") {
  try {
    const query = { 'branch.code': branchCode }
    const branchData = await branches.findOne(query, { projection: { _id: 0, academicYear: 1, contact: 1 } })
    return branchData
  } catch (err) {
    console.error(`Unable to query "Branch Info Data" in DB(Branches Collection): ${err}`)
    return { error: true, message: "Error: Unable to query data in DB(Branches Collection)"}
  }
}

/* help get all student within a sch branch */
export async function getBranchStudents(branch='002') {
  try {
    const query = { branchCode: branch }
    const students = await students.find(query, { projection: { _id: 0 } }).toArray()
    return students
  } catch (err) {
    console.error(`Unable to query "Students Data" in DB(students Collection): ${err}`)
    return { error: true, message: "Error: Unable to query data in DB(students Collection)"}
  }
}