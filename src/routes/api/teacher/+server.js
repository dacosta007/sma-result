// import { IMAGE_KIT_PUB } from '$env/static/private'
import 'dotenv/config'


export async function POST({ request }) {
  const regFrm = await request.json()
  
  console.log(process.env.IMAGE_KIT_PUB)

  // let secret = IMAGE_KIT_PUB
  // console.log(secret)
  return new Response(JSON.stringify({ regFrm }), { status: 201 });
}