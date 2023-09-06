import { error } from '@sveltejs/kit'
import { results } from '$db/collections/results'
import { students } from '$db/collections/students'


export async function load() {
  try {
    let studts = await students.find({}, { projection: { _id: 0 } }).toArray()
    let studtReports = await results.find({}, { projection: { _id: 0 } }).toArray()

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