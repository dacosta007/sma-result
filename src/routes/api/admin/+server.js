/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  let body = await request.json()

  console.log(body)

  let res = JSON.stringify(body)

  return new Response(res);
}