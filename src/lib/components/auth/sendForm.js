export async function sendForm(frm) {
  const res = await fetch(frm.action, {
    method: frm.method,
    headers: { accept: 'application/json' },
    body: new FormData(frm)
  })

  return await res.json()
} 