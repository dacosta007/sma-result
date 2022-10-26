import { IMAGE_KIT_PUB } from '$env/static/private'

export async function POST({ request }) {
  let body = await request.json()

  // let username = regFrm.get('username')
  // let pass = regFrm.get('pass')

  // let secret = IMAGE_KIT_PUB
  console.log(body)

  return new Response(JSON.stringify({ body }), { status: 200 });
}