
export async function load({ fetch }) {
  let baseUrl = 'https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket'
  
  let results = await fetch('/api/result')
  let resultData = await results.json()
  resultData = resultData.branch002
  
  let res = await fetch(`${baseUrl}/schBranch`)
  let resData = await res.json()
  resData = resData.branch002
  
  // console.log({ resData, resultData })

  return {
    branchInfo: resData,
    resultData
  }
}