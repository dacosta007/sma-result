import { payments } from '$db/collections/payments'
import { branches } from '$db/collections/branches'
import { students } from '$db/collections/students'

export async function load() {
  try {
    // all school payments for the school current session
    let queryBranches = ({ "branch.code": "002" })
    let branchData = await branches.findOne(queryBranches, { projection: { _id: 0, academicYear: 1 } })
    let { session:currentSession } = branchData.academicYear
    
    // query payment db for the session term
    let queryPay = { branchCode: "002", "meta.session": currentSession }
    let paymentData = await payments.find(queryPay, { projection: { _id: 0 } }).toArray()
    
    let studts = await students.find({}, { projection: { _id: 0 } }).toArray()
    
    return {
      paymentData,
      studts
    }
  } catch (err) {
    console.log(`Error Payment page: ${err}`)
  }
}