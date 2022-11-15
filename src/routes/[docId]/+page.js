import { error } from "@sveltejs/kit"


export async function load({ params, fetch }) {
  try {
    let docId = params.docId
    let res = await fetch('https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket/result')
    let resData = await res.json()
  
    // let result = resData.branch002.find(ele => ele.meta.studtId === docId)
    
    return {
      res: resData,
      docId
    }
  } catch (err) {
    console.log(`Error Result Page: ${err}`)

    throw error('500', { message: 'Server Error: Please try again in a little while' })
  }
}