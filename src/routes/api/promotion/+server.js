import { students } from "$db/collections/students"
import { invalid, json } from "@sveltejs/kit"

export async function PUT({ request }) {
  const promotionData = await request.json()
  
  const { promotionType, studtId, data:stdData } = promotionData

  try {
    let query = { studtId: studtId }

    let uptdOpts = {}

    if (promotionType === 'graduation') {
      uptdOpts = {
        $set: { graduation: stdData }
      }
    }
    if (promotionType === 'promotion') {
      uptdOpts = {
        $set: { 
          promotion: stdData, 
          'class.category': stdData[0].clsTo.category,
          'class.level': stdData[0].clsTo.level,
          'class.subLevel': stdData[0].clsTo.subLevel,
          'class.department': stdData[0].clsTo.department
        }
      }
    }

    let saveData = await students.updateOne(query, uptdOpts)

    // unabel to update report
    if (saveData.acknowledge != true && saveData.modifiedCount != 1) {
      return json({ error: true, message: '🚩 Something went wrong, please try again later' }, 400)
    }

    return json({ success: true, message: '😀 Promotion updated successfully! ✔' }, 200)
  } catch (error) {
    console.log(`Error updating Promotion/Graduation: ${error}`)
    return invalid(500, { error: true, message: 'Server error, please try again' })
  }
}