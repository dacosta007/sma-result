export async function post({ request }) {
  const frm = await request.formData()
  const formData = {
    name: {
      first: frm.get('fname'),
      last: frm.get('lname'),
    },
    email: frm.get('email'),
    altEmail: frm.get('altEmail'),
    username: frm.get('username'),
    password: frm.get('password'),
    admin: 'admin002'
  }

  // input validation
  if (
    !formData.name.first && 
    !formData.name.last && 
    !formData.username && 
    !formData.email && 
    !formData.altEmail && 
    !formData.password
  ) {
    return new Response({
      error: 'All fields must be field correctly with appropriate data'
    }, {
      status: 401
    })
  }

  try {
    const baseUrl = 'https://getpantry.cloud/apiv1/pantry/8e96f3a9-a647-4f37-931d-586203d634b3/basket/schAdmin'
    const db = await fetch(baseUrl)
    const dbRes = await db.json()

    const checkAdmin = dbRes[formData.admin]
    if (checkAdmin) {
      return new Response({ error: 'Invalid Credentials'}, { status: 401 })
    }

    // save user into db
    const res = await fetch(baseUrl, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'admin002': formData })
    })

    if (!res.ok) {
      return new Response({ error: 'Server Error, please try again in a little while' }, { status: 500 })
    }

    return new Response({ success: 'success', user: 'admin002' }, { status: 201 })
  } catch (err) {
    return {
      status: 400,
      body: {
        error: "Unauthorized user"
      }
    }
  }
}