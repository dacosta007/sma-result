import { error } from '@sveltejs/kit'
import { results } from '$db/collections/results'
import { students } from '$db/collections/students'
import { getResultData, getBranchInfo } from '$db/queryUtils/dbQueries'


export async function load() {
  try {
    let studts = await students.find({}, { projection: { _id: 0 } }).toArray()
    let branchInfo = await getBranchInfo('002')
    let academicInfo = (branchInfo.error) ? branchInfo?.message : branchInfo?.academicYear
    
    // let reports = await getResultData(academicInfo.session)
    
    let studtReports = await results.find({'meta.session': academicInfo.session}, { projection: { _id: 0 } }).toArray()

    return {
      studts,
      studtReports
    }
  } catch (err) {
    console.log(err)
    throw new Error('Something Went wrong fetching data')
  }
}


// export const actions = {
//   promote: async () => {

//   }
// };