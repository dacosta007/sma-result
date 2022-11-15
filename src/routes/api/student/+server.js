// import { IMAGE_KIT_PUB } from '$env/static/private'
// import 'dotenv/config'

let baseUrl = 'https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket'

export async function GET() {
  try {
    let res = await fetch(`${baseUrl}/student`, {
      mode: "cors"
    })
    let studts = await res.json()
    studts = studts.branch002
  
    return new Response(JSON.stringify({
      studts
    }))
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
  const students = await fetch(`${baseUrl}/student`)

  // let saveImgSecret = process.env.IMAGE_KIT_PUB
  // console.log(saveImgSecret)
  // save data into database
  students['branch002'].push(regFrm)

  try {
    let saveStudt = await fetch(`${baseUrl}/student`, {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(students)
    })

    let saveRes = await saveStudt.text()
    return new Response(JSON.stringify(
      {
        status: 201,
        success: 'success',
        content: students['branch002'],
        res: saveRes
      }
    ))    
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }
}


export async function PUT({ request }) {
  let studt = await request.json()

  let students = await fetch(`${baseUrl}/student`)
  let results = await fetch(`${baseUrl}/result`)
  
  let studentsRes = await students.json()
  let resultsRes = await results.json()

  // update the student, as well as the result(if found) database with new name
  let stdIndx = studentsRes.branch002.findIndex(ele => ele.studtId === studt.studtId)
  studentsRes.branch002[stdIndx] = studt
  let resIndx = resultsRes.branch002.findIndex(ele => ele.meta.studtId === studt.studtId)
  if (resIndx != -1) {
    resultsRes.branch002[resIndx].meta.name = studt.name
    console.log(`Student Result Index: ${resIndx}`)
  }

  let branch = studentsRes.branch002

  try {
    let saveStudents = await fetch(`${baseUrl}/student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentsRes)
    })

    if (saveStudents.ok) {
      let saveResults = await fetch(`${baseUrl}/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultsRes)
      })
      let resResp = await saveResults.text()
      console.log(resResp)
      return new Response(
        JSON.stringify({success: "success", branchStudts: branch}), 
        { status: 201 }
      )
    }
    return new Response(
      JSON.stringify({error: 'Unable to process data, please try again in a little while'}), 
      { status: 500 }
    )
  } catch (err) {
    console.log(err)
  }
}


export async function DELETE({ request }) {
  const { studtId } = await request.json()
  let res = await fetch(`${baseUrl}/student`)
  let students = await res.json()

  // filter out student with the student ID and save the rest of the data
  let branch = students.branch002
  let filterStds = branch.filter(ele => ele.studtId != studtId)
  students.branch002 = filterStds
  // return new Response(JSON.stringify({totalStds: branch.length, afterDel: filterStds.length}))
  try {
    let saveData = await fetch(`${baseUrl}/student`, {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(students)
    })
    let saveRes = await saveData.text()
    return new Response(JSON.stringify({success: 'success', message: saveRes}), { status: 200 })
  } catch (err) {
    console.log(err)
  }
}