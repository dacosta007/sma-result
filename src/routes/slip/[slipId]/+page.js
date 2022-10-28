
export async function load({ params, fetch }) {
  let slip = params.slipId
  let studts = await fetch('https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket/student')
  let studtRes = await studts.json()
  let stdDB = studtRes.branch002
  let std = stdDB.find(ele => ele.studtId === slip)
  
  return {
    std
  }
}