// import { IMAGE_KIT_PUB } from '$env/static/private'
import 'dotenv/config'

let baseUrl = 'https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket'

async function getDB(dbCollection) {
  const res = await fetch(`${baseUrl}/${dbCollection}`)
  const resData = await res.json()

  return resData
}

export async function POST({ request }) {
  let regFrm = await request.json()
  const students = await getDB('student')

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