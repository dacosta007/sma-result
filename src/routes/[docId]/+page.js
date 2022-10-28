
export async function load({ params }) {
  // async function getResults() {

  // }
  let res = await fetch('https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket/results')
  let resultDB = await res.json()



  return {
    res: resultDB,
    content: `welcome to the print result page: ${params.docId}`
  }
}