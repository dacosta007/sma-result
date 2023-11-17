/* @DESC:
    this functions will help format how data is going to be shown by subject for each term per student
    - average score((1st + 2nd + 3rd) / total no_ of term recoded) 
*/
export  function handleScoresCalc(subj, studt) {
  // get the subject data for each term of the session
  let firstTerm = (studt?.first != undefined) ? studt.first.find(ele => (ele.subj).toLowerCase() === subj.toLowerCase()) : undefined
  let secondTerm = (studt?.second != undefined) ? studt.second.find(ele => (ele.subj).toLowerCase() === subj.toLowerCase()) : undefined
  let thirdTerm = (studt?.third != undefined) ? studt.third.find(ele => (ele.subj).toLowerCase() === subj.toLowerCase()) : undefined
  
  // get each term scores for the subject
  let ftScore = (firstTerm != undefined) ? parseInt(firstTerm.score ?? 0) : 0
  let ndScore = (secondTerm != undefined) ? parseInt(secondTerm.score ?? 0) : 0
  let rdScore = (thirdTerm != undefined) ? parseInt(thirdTerm.score ?? 0) : 0

  // calculate total score for the session
  let totalScore = (ftScore + ndScore + rdScore)
  
  // get total terms recorded for the session(for the subject)
  let totalTermCal = [ftScore, ndScore, rdScore].reduce((acc, ele) => {
    if (ele === 0) {
      acc += 0
      return acc
    }
    acc++
    return acc
  }, 0)

  // calculate subject average((1st + 2nd + 3rd) / total no_ of term recoded) for the session
  let averageScore = isNaN(Math.round(totalScore / totalTermCal)) === false ? Math.round(totalScore / totalTermCal) : 0

  let result = { name: studt.name, ftScore, ndScore, rdScore, averageScore }

  return result
}