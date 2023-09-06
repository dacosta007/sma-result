import { teachers } from "$db/collections/teachers";


export async function load() {
  let query = { branchCode: '002' }
  let queryOpt = { projection: { _id: 0 } }
  let res = await teachers.find(query, queryOpt).toArray()
  // console.log(res)

  return {
    teachers: res
  }
}

