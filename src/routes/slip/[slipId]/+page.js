
export async function load({ params, fetch }) {
  let res = params.slipId
  
  console.log(params)
  return {
    res,
    content: 'welcome to the print slip page'
  }
}