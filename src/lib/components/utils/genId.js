async function getDB(dbCollection) {
  const res = await fetch(`api/${dbCollection}`)
  const resData = await res.json()
  return resData
}

export function genRandStr(numOfStr=5, strOptObj) {
  // possible random string outcome variables
  let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lowercase = 'abcdefghijklmnopqrstuvwxyz';
  let number = '0123456789';
  let symbol = '$@#%&|!';

  // options object for possible outcome
  let randOpt = { uppercase, lowercase, number, symbol };

  let rand = '', randStr = '', opts = [], str = '';

  if (strOptObj === undefined) {
    str = `${uppercase}${lowercase}${number}${symbol}`;
  }

  // get possible random options from the 'randOpt' variable
  for (let val in strOptObj) {
    opts.push(strOptObj[val]);
  }

  // get possible random string according to options provided in functions
  for(let opt of opts) {
    str += randOpt[opt];
  }

  // generate random strings
  for (let i = 0; i < numOfStr; i++) {
    rand = Math.round(Math.random() * (str.length - 1));
    randStr += str.charAt(rand);
  }

  return randStr;
};

// help generate student ID
export async function genStudtId(frmData) {
  const frm = frmData;
  const { branchCode, admissionYear, name } = frm;

  // student database 
  const students = await getDB('student'); 
  
  // return students;
  // student ID = year(last two digits) + sch branch code + three Random num + 2studt's name initials
  // i.e student ID = 22001321JM
  let admYr = admissionYear.slice(2);
  let nameInitials = name.first[0].toLocaleUpperCase() + name.last[0].toLocaleUpperCase();
  let arrOfIds = [];
  let allGivenStdIdsForTheSection = students.studts.map(std => std.studtId);

  // generate 5 random student ids & select one not yet given
  for (let i = 0; i < 15; i++) {
    let randNum = genRandStr(3, {number: "number"});
    let studtId = `${admYr}${branchCode}${randNum}${nameInitials}`;
    arrOfIds.push(studtId)
  }

  // filter out those ids not already given which are auto-generated above
  arrOfIds = arrOfIds.filter(id => !allGivenStdIdsForTheSection.includes(id));

  // assign new student ID out of available ones
  let studtId = arrOfIds[Math.round(Math.random() * (arrOfIds.length - 1))];


  return { studtId };
};

export function genTeachId(branchCode) {
  // teacher ID = year(last two digits) + sch branch code + T + four Random num
  // i.e student ID = 22002T1321

  // get all the teachers ids from teachers DB

  // create the ID format strings
  let yr = (new Date().getFullYear()).toString().slice(2)
  let initStr = `${yr}${branchCode}T`

  // generate 5 random ids 
  let arrOfIds = []
  for (let i = 0; i < 10; i++) {
    let randNum = genRandStr(4, { number: "number" })
    let teachId = `${initStr}${randNum}`
    arrOfIds.push(teachId)
  }

  let teachId = arrOfIds[Math.round(Math.random() * (arrOfIds.length - 1))]

  return teachId
}