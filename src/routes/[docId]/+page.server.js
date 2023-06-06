import { error } from "@sveltejs/kit"
import { results } from "$db/collections/results"
import { ObjectId } from "mongodb"

export async function load({ params }) {
  let docId = params.docId

  try {
    let query = { "meta.studtId": docId }
    let queryOpt = { projection: { _id: 0 } }
    
    let res = await results.findOne(query, queryOpt)
    // help convert MongoDB new ObjectId() to POJO(Plain Old JavaScript Object) string
    // console.log(res._id)
    // res._id = ObjectId(res._id).valueOf()
    // let tst = res._id
    // console.log(res, tst)

    return { res: res }
  } catch (err) {
    console.log(`Error Result Page: ${err}`)

    throw error('500', { message: 'Server Error: Please try again in a little while' })
  }
}