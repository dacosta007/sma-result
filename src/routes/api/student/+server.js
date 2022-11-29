// import { IMAGE_KIT_PUB } from '$env/static/private'
// import 'dotenv/config'
import { students } from "$db/collections/students"
import { results } from "$db/collections/results"
import { invalid, json } from "@sveltejs/kit"

export async function GET() {
  try {
    let queryOpt = { projection: { _id: 0 } }
    let studts = await students.find({}, queryOpt).toArray()
    
    return new Response(JSON.stringify({ studts }), { status: 200 })
  } catch (err) {
    console.log(`Error Student API: ${err}`)
    return new Response(
      JSON.stringify({ error: 'Server error, please try again in a little while' }),
      { status: 500 }
    )
  }
}


export async function POST({ request }) {
  let regFrm = await request.json()
  
  // let saveImgSecret = process.env.IMAGE_KIT_PUB
  // console.log(saveImgSecret)
  
  // save data into database
  try {
    const saveData = await students.insertOne(regFrm)

    if (saveData.acknowledge != true && !saveData.insertedId) {
      throw invalid(500, JSON.stringify({ error: true, message: "Unabble save student's data, please try again" }))
    }

    return new Response(JSON.stringify(
      {
        status: 201,
        success: 'success',
        content: saveData,
        // res: saveRes
      }
    ))    
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }
}


export async function PUT({ request }) {
  let studt = await request.json()

  // update required student's credentials in 'students db' & in 'results db'
  try {
    // for students db
    let query = { studtId: studt.studtId }
    let queryOpt = { $set: { name: studt.name, schoolingType: studt.schoolingType } }
    let res = await students.updateOne(query, queryOpt)

    // for results db
    // for result db, you can only change the student's name
    if (res.acknowledge != true && res.modifiedCount != 1) {
      return new Response(json({ error: "Unable to update Result" }), { status: 500 })
    }

    let reptQuery = { 'meta.studtId': studt.studtId }
    let reptQueryOpt = { $set: { name: studt.name } }
    let rept = await results.updateOne(reptQuery, reptQueryOpt)
    
    return new Response(JSON.stringify({ success: true, rept }))
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 }) 
  }
}


export async function DELETE({ request }) {
  const { studtId } = await request.json()

  try {
    // delete student with
    let query = { studtId: studtId }
    let res = await students.deleteOne(query)

    return new Response(JSON.stringify({success: 'success', message: res}), { status: 200 })
  } catch (err) {
    console.log(err)
    throw invalid(500, { error: true, message: 'Server error, please try again later!' })
  }
}