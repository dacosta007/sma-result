// export async function post({ request }) {
//   const loginFrm = await request.json()
//   let { username, password } = loginFrm
//   // let username = loginFrm
//   // let password = loginFrm

//   console.log({ username, password })

//   // return new Response({  })
//   // validate input fields
//   if (!username || !password) {
//     return new Response(JSON.stringify({error: 'Please fill in all fields'}), { status: 401 })
//   }
  
//   try {
//     const baseUrl = 'https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket/schAdmin'
//     const dbAdmin = await fetch(baseUrl)
//     const dbRes = await dbAdmin.json()

//     // db check 
//     if (
//         dbRes['admin002'].username != username || 
//         dbRes['admin002'].email != username  && 
//         dbRes['admin002'].password != password
//       ) {
//       return new Response({ error: 'Invalid username or password' }, { status: 401 })
//     }

//     // Authorize user 
//     return new Response({ 
//       success: 'success',
//       user: dbRes['admin002'] }, 
//       { status: 200 }
//     )
//   } catch (err) {
//     console.error(err)
//     return {
//       status: 400,
//       body: {
//         error: `Unauthorized user: ${err.message}`
//       }
//     }
//   }
// }
