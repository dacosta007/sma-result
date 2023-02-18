import { results } from "$db/collections/results"
import { invalid } from "@sveltejs/kit"


export async function POST({ request }) {
  let resultData = await request.json()

  try {
    let saveRept = await results.insertOne(resultData)

    if (saveRept.acknowledge != true &&  !saveRept.insertedId) {
      return new Response(
        JSON.stringify({ error: true, message: 'Something went wrong, please try again later' }), 
        { status: 400 }
      )
    }

    let res = JSON.stringify({ success: 'success', saveRept })

    return new Response(res, { status: 201 })
  } catch (err) {
    console.log(err)
    throw invalid(500, {
      error: true,
      message: 'Server Error, unable to save report!. Please try again in a little while'
    })
  }
}

export async function PUT({ request }) {
  let resultData = await request.json()
  
  try {
    // database query options
    let query = { "meta.studtId": resultData.meta.studtId, "meta.session": resultData.meta.session }
    let uptdOpts = { $set: {} }

    // report type can be 'midTerm' or 'exam' (this should be set dynamically, i.e: from submitted form)
    let reportType = 'midTerm', term = 'second'

    if (reportType === 'midTerm') {
      uptdOpts.$set[`${reportType}.report.${term}`] = resultData.midTerm.report[term] 
      uptdOpts.$set[`${reportType}.comments.${term}`] = resultData.midTerm.comments[term]
      uptdOpts.$set[`cummulative.midTerm.${term}`] = resultData.cummulative.midTerm[term]
    }
    if (reportType === 'exam') {
      uptdOpts.$set[`${reportType}.report.${term}`] = resultData.exam.report[term]
      uptdOpts.$set[`${reportType}.comments.${term}`] = resultData.exam.comments[term]
      uptdOpts.$set[`cummulative.exam.${term}`] = resultData.cummulative.exam[term]
    }
    // console.log(uptdOpts)

    // update report
    let updtRept = await results.updateOne(query, uptdOpts)
    
    // unabel to update report
    if (updtRept.acknowledge != true && updtRept.modifiedCount != 1) {
      return new Response({ error: true, message: 'Something went wrong, please try again later' }, { status: 400 })
    }
    // console.log(updtRept)

    return new Response(JSON.stringify({ success: 'success', updtRept }), { status: 201 })
  } catch (err) {
    console.log(`Form Action error 'AddReport': ${err}`)
    throw invalid(500, {
      error: true,
      message: 'Server Error, unable to save report!'
    })
  }
}