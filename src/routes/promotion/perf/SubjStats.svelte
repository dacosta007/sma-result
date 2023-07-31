<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { gradeScore } from "$lib/components/utils/gradeScore"

  export let sessionRept = {}
  
  // console.log(sessionRept)

  let dispatch = createEventDispatcher()

  let { meta:stdMeta, exam, cummulative } = sessionRept

  // all cummulatives data for the session(first, second, & third)
  let sessionCummulatives = Object.values(cummulative?.exam)

  // total terms recorded
  let totalTermsRecorded = sessionCummulatives.length

  // total obtainable & obtained marks(scores) for the session
  const totalObtainable = sessionCummulatives.reduce((acc, ele) => acc + ele.obtainable, 0)
  const totalObtained = sessionCummulatives.reduce((acc, ele) => acc + ele.obtained, 0)

  // the student's sum total performance pecentage for the session
  const overallPercentage = Math.round(parseFloat(((totalObtained / totalObtainable) * 100).toFixed(3)))

  /* all student's reports throughout the session(first, second, & third term) */
  const firstTerm = exam?.report?.first ?? []
  const secondTerm = exam?.report?.second ?? []
  const thirdTerm = exam?.report?.third ?? []

  /* all subjects offered by the students */
  let subjFirst = firstTerm.map(ele => ele.subj)
  let subjSecond = secondTerm.map(ele => ele.subj)
  let subjThird = thirdTerm.map(ele => ele.subj)
  let allSubjs = [].concat(subjFirst, subjSecond, subjThird)
  // filter-out duplicate
  allSubjs = [...(new Set(allSubjs))]

  // all the stats subjs for the session(first, second, & third term)
  const subjStats = allSubjs.map(subject => {
    let obj = {}
    obj['subj'] = subject
    obj['first'] = (firstTerm.find(totPer => totPer?.subj === subject))?.totalMark ?? 0
    obj['second'] = (secondTerm.find(totPer => totPer?.subj === subject))?.totalMark ?? 0
    obj['third'] = (thirdTerm.find(totPer => totPer?.subj === subject))?.totalMark ?? 0
    // cummulative Avg. for the session (first, second, & third term total marks/scores) / 300(100 * total terms) * 100
    obj['cumm'] = Math.round( parseFloat((((obj.first + obj.second + obj.third) / (100 * totalTermsRecorded)) * 100).toFixed(2)) )
    obj['grade'] = gradeScore(obj.cumm).grade
    obj['gradeClr'] = gradeScore(obj.cumm).gradeClr
    return obj
  })

  const totalSubjs = allSubjs
  
  // overall stats for the session: (total Obtainable, total Obtained, total subjects, grade value)
  const overallStats = { totalObtainable, totalObtained, overallPercentage, totalSubjs, grade: gradeScore(overallPercentage).grade }
  // console.log(overallStats)

  // close subjects stats components
  function closeSubjStats() {
    dispatch('closeSubjStats', 'close')
  }
</script>


<article class="subj-stat-sec">
  <section class="stat-content" out:fade={{duration: 500, delay: 500}} in:fade={{duration: 500, delay: 0}}>
    <header class="header-sec center-text">
      <!-- close subject stats -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <i class="lni lni-close close-btn" on:click={closeSubjStats} on:keypress={closeSubjStats}></i>
      <h2 class="title">session stats report ({stdMeta.session})</h2>
      <h4>
        <div>{stdMeta?.name?.first} {stdMeta?.name?.last}</div>
        <div><span>{stdMeta?.studtId}</span></div>
      </h4>
    </header>

    <div class="stats-container">
      <table>
        <thead>
          <th>subjects</th>
          <th><span>1</span><sup>st</sup> <span>term(%)</span></th>
          <th><span>2</span><sup>nd</sup> <span>term(%)</span></th>
          <th><span>3</span><sup>rd</sup> <span>term(%)</span></th>
          <th>cumm. Avg</th>
          <th>grade</th>
        </thead>
        <tbody>
          {#each subjStats as subjStat}
            <tr>
              <td>{subjStat.subj}</td>
              <td>{subjStat.first}</td>
              <td>{subjStat.second}</td>
              <td>{subjStat.third}</td>
              <td>{subjStat.cumm}</td>
              <td style="color: {subjStat.gradeClr};">{subjStat.grade}</td>
            </tr>
          {:else}
            <p style="center-text">No stats for subject yet!</p>
          {/each}
        </tbody>
      </table>
      <div class="overall-cumm-sec">
        <div>
          <span>total obtainable</span> <span>{overallStats.totalObtainable}</span>
        </div>
        <div>
          <span>total obtained</span> <span>{overallStats.totalObtained}</span>
        </div>
        <div>
          <span>overall percentage</span> <span>{overallStats.overallPercentage}<small>%</small></span>
        </div>
        <div>
          <span>grade</span> <span style="color: {gradeScore(overallPercentage).gradeClr};">{overallStats.grade}</span>
        </div>
      </div>
    </div>
  </section>
</article>

<style>
  .subj-stat-sec {
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    z-index: 6;
    background-color: rgb(0 0 0 / 30%);
    backdrop-filter: blur(3px);
  }
  .stat-content {
    position: relative;
    background-color: var(--clr-white);
    padding: 1.5em 1em;
    border-radius: 2px;
    width: 60%;
    margin: 4% auto;
  }
  .close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 0.5em;
    font-size: 15px;
    font-weight: bold;
    background-color: rgb(106 104 114 / 26%);
    color: #eaf1ffc7;
    border-radius: 50%;
    cursor: pointer;
  }
  .close-btn:active {
    animation: clickBtn 0.5s ease;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table th {
    text-align: left;
    font-variant: all-small-caps;
    font-size: 17px;
    letter-spacing: 0.5px;
    color: var(--clr-grey);
    padding: 0 0.4em;
  }
  tbody tr:nth-child(even) {
    background-color: #f0f3f5;
  }
  tbody td {
    padding: 0.4em 0.4em;
    font-size: 13px;
  }
  tbody tr td:not(:first-of-type) {
    text-align: center;
  }
  .overall-cumm-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4em 0.4em;
    border: 1px dashed var(--clr-grey);
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    font-size: 14px;
    margin-top: 0.5em;
  }
  .overall-cumm-sec > div > span:nth-child(1) {
    text-transform: capitalize;
    font-family: var(--font-quicksand);
    color: #516674;
  }
  .overall-cumm-sec > div > span:nth-child(2) {
    font-weight: 600;
  }
</style>