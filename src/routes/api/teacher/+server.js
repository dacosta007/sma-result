// import { IMAGE_KIT_PUB } from '$env/static/private'

export async function POST() {
  // let secret = IMAGE_KIT_PUB
  // console.log(secret)
  return new Response(JSON.stringify({ data: "secret" }), { status: 200 });
}