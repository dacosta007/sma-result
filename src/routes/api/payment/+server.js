import { payments } from "$db/collections/payments"
import { invalid, json } from "@sveltejs/kit"


export async function POST({ request }) {
  const payData = await request.json()

  try {
    let savePyt = await payments.insertOne(payData)

    if (savePyt.acknowledge != true &&  !savePyt.insertedId) {
      return json({ error: true, message: 'Something went wrong' }, 500)
    }

    return json({ success: true, message: 'Payment successfully created! 😀' }, 201)
  } catch (err) {
    console.log(`Error creating Payment: ${err}`)
    return invalid(500, { error: true, message: 'Server error, please try again' })
  }
}


export async function PUT({ request }) {
  const payData = await request.json()
  let currentSession = payData.meta.session

  try {
    let query = { 'meta.session': currentSession, 'meta.studtId': payData.meta.studtId, branchCode: payData.branchCode }
    let uptdOpts = { $set: { payment: payData.payment, 'meta.updatedAt': payData.meta.updatedAt } }

    // remove the currentSession property from the payData variable
    // delete payData.session

    // update payment DB
    let updtRept = await payments.updateOne(query, uptdOpts)

    // unabel to update report
    if (updtRept.acknowledge != true && updtRept.modifiedCount != 1) {
      return json({ error: true, message: 'Something went wrong, please try again later' }, 400)
    }

    return json({ success: true, message: 'Payment updated successfully! ✔' }, 200)
  } catch (err) {
    console.log(`Error updating Payment: ${err}`)
    return invalid(500, { error: true, message: 'Server error, please try again' })
  }
}