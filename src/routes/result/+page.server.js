
import { resultPreferences } from "$db/collections/resultPreferences"
import { subjects } from "$db/collections/subjects"
import { students } from "$db/collections/students"


export async function load() {
  let resultPref = await resultPreferences.findOne({ branchCode: "002" }, { projection: { _id: 0 } })

  let subjs = await subjects.findOne({ branchCode: "002" }, { projection: { _id: 0, subjects: 1 } })

  let queryOptStd = { graduation: {$exists: false} }
  let studts = await students.find(queryOptStd, { projection: { _id: 0 } }).toArray()

  return {
    resultPref,
    studts,
    subjs
  }
}
