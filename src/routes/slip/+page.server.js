import { students } from "$db/collections/students"
import { error } from "@sveltejs/kit"


export async function load() {
  try {
    let queryOpt = { projection: { _id: 0 } }
    let studts  = await students.find({}, queryOpt).toArray()
    
    return {
      students: studts
    }
  } catch (err) {
    console.log(`Error From Slip Page: ${err}`)
    throw error(500, { message: 'Unable to fetch students, please try again later' })
  }
}