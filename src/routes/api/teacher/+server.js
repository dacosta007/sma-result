// import { IMAGE_KIT_PUB } from '$env/static/private'
// import 'dotenv/config'
import { teachers } from "$db/collections/teachers";
// import { subjects } from "$db/collections/subjects"
import { genTeachId } from "$lib/components/utils/genId"
import { error, json } from "@sveltejs/kit";



export async function POST({ request }) {
  const frm = await request.json()

  let teachId = genTeachId(frm.branchCode)
  frm.teachId = teachId
  console.log(frm)
  
  // return new Response(JSON.stringify({ success: true, data: frm }), { status: 201 })

  // save data into db
  try {
    // check if teacher isn't already created
    let query = { email: frm.email }
    let queryOpt = { projection: { _id: 0 }  }
    let checkTeacher = await teachers.findOne(query, queryOpt)

    // console.log(checkTeacher)
    if (checkTeacher != null) {
      return new Response( 
        JSON.stringify({
          error: true,
          message: 'This teacher has already been created'
        })
      )
    }

    // save create/save new teacher
    if (checkTeacher === null) {
      let saveTeacher = await teachers.insertOne(frm)

      if (saveTeacher.acknowledge != true &&  !saveTeacher.insertedId) {
        return new Response(
          JSON.stringify({
            error: true,
            message: 'Something went wrong, please try again in a little while'
          })
        )
      }

      let saveData = JSON.stringify({
        success: true,
        data: frm
      })

      return new Response(saveData, { status: 201 })
    }
  } catch (err) {
    console.log(err)
    throw error(500, 'Server error: Please try again in a little while')
  }
}


export async function DELETE({ request }) {
  let { teachId } = await request.json()
  // console.log(teachId)
  try {
    let query = { teachId: teachId }
    let res = await teachers.deleteOne(query)

    if(res.acknowledge != true && res.deleteCount) {
      return new Response(
        JSON.stringify({
          error: true,
          message: "Something went wrong!. Please try again later"
        })
      )
    }

    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Teacher deleted successfully",
        deleteId: teachId
      })
    )
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({
      error: true,
      message: "Server Error!. Please try again in a little while."
    }))
  }
}