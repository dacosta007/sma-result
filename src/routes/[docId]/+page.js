/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let res = params.docId
  return {
    res,
    content: 'welcome to the print result page'
  }
}