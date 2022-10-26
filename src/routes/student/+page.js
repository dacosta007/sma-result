/** @type {import('./$types').PageLoad} */
export async function POST({ request }) {
  let body = await request.json()
  console.log(body.get('username'))

  return new Response(JSON.stringify({message: "success"}))
}