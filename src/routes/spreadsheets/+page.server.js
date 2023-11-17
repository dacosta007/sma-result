import { results } from '$db/collections/results'
import { branches } from '$db/collections/branches'
import { error } from '@sveltejs/kit'

export async function load() {
  
  try {
    // @Desc: note: in next update, branch info should be gotten from 'event.local.branchInfo' for inital first load
    let branchInfo = await branches.find({'branch.code': '002'}, { projection: { _id: 0, academicYear: 1 } }).toArray()

    return {
      branchInfo: branchInfo[0]
    }
  } catch (err) {
    throw error(500, 'Something Went wrong fetching data')
  }
}


export const actions = {
  spreadsheet: async ({ request }) => {
    let frmData = Object.fromEntries(await request.formData())

    // get spreadsheet class category & level to be displayed
    const clsCategory = (frmData.cls).slice(0, 3) // i.e: 'jss' or 'sss'
    const clsLevel = (frmData.cls).slice(4) // i.e: '1', '2' or '3'

    // get spreadsheet session report to be displayed
    const sheetSession = frmData.session

    // get class reports(i.e: meta, exam. result object props) for the session
    let repts = await results
      .find(
        { 
          'meta.session': sheetSession, 
          'meta.class.category': clsCategory, 
          'meta.class.level': clsLevel 
        },
        {
          projection: {
            _id: 0,
            'meta': 1,
            'exam.report': 1
          }
        }
      ).toArray()
    ;

    // check for error in data result set from DB
    if (repts.length <= 0 || repts === '' || repts === undefined) {
      return { error: true }
    }

    return {
      reports: repts,
      sheetClass: frmData.cls,
      sheetSession
    }
  }
};