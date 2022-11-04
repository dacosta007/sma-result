/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const baseUrl = 'https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket'
    const res = await fetch(`${baseUrl}/student`)
    let resData = await res.json()
    resData = resData.branch002

    return {
      students: resData
    }
}