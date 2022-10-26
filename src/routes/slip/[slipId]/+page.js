/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let res = params.slipId
  console.log(params)
  return {
    res,
    content: 'welcome to the print slip page'
  }
}