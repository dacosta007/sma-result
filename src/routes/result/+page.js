
export async function load({ fetch }) {
  let baseUrl = 'https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket'

  const getResultPref = async () => {
    let res = await fetch(`${baseUrl}/resultPreference`)
    let resData = await res.json()
    return resData
  }

  const getResults = async () => {
    let res = await fetch(`${baseUrl}/result`)
    let resData = await res.json()
    return resData
  }

  const getSubjects = async () => {
    let res = await fetch(`${baseUrl}/subjects`)
    let resData = await res.json()
    return resData
  }

  const getAllStudts = async () => {
    let res = await fetch('/api/student')
    let resData = await res.json()
    return  resData
  }

  return {
    resultPref: getResultPref(),
    studts:  getAllStudts(),
    subjs: getSubjects(),
    results: getResults()
  }
};