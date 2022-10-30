
export async function GET({ fetch }) {
  let res = await fetch('https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket/result')
  let resData = await res.json()

  resData = JSON.stringify(resData)

  return new Response(resData)
};

export async function POST({ request, fetch }) {
  let resultData = await request.json()
  console.log(resultData)
  let res = await fetch('https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket/result')
  let resData = await res.json()

  let results = resData
  if (results.branch002 === undefined) {
    results = {}
    results.branch002 = []
    results.branch002.push(resultData)
  }

  if (results.branch002 != undefined) {
    results.branch002.push(resultData)
  }

  try {

    let saveData = await fetch('https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket/result', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    })
    let saveRes = await saveData.text()
    console.log(saveRes)
    resData = resData.branch002
    return new Response(
      JSON.stringify({
        success: 'success',
        res: resData
      })
    )
  } catch (err) {
    console.log(err)    
  }
}