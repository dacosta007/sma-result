import { students } from "$db/collections/students"
import { error } from "@sveltejs/kit"


export async function load({ params }) {
  let slip = params.slipId

  try {
    // db query
    let query = { studtId: slip }
    let queryOpt = { projection: { _id: 0 } }
    // find pre-reg slip
    let res = await students.findOne(query, queryOpt)
    
    return {
      std: res
    }
  } catch (err) {
    console.log(`Pre-reg Slip Error: ${err}`)
    throw error(500, { message: 'Server Error!. Please try again in a little while' })
  }
}