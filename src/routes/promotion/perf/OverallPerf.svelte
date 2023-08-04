<script>
  import { createEventDispatcher } from "svelte"
  import { gradeScore } from "$lib/components/utils/gradeScore"
  import ProgressBar from "./ProgressBar.svelte"
  import ProgressBarStat from "./ProgressBarStat.svelte"

  
  export let sessionRept = {}
  export let currentSession = '2022/2023'
  
  let dispatch = createEventDispatcher()

  let { exam } = sessionRept

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

    // help get all total recorded term count
    let termsRecorded = 0
    if (obj.first > 0) {
      termsRecorded += 1
    }
    if (obj.second > 0) {
      termsRecorded += 1
    }
    if (obj.third > 0) {
      termsRecorded += 1
    }

    // cummulative Avg. for the session (first/second/third term total marks/scores) / (100 * terms recorded) * 100
    obj['cumm'] = Math.round( parseFloat((((obj.first + obj.second + obj.third) / (100 * termsRecorded)) * 100).toFixed(2)) )
    obj['grade'] = gradeScore(obj.cumm).grade
    obj['gradeClr'] = gradeScore(obj.cumm).gradeClr

    return obj
  })

  // total obtainable & obtained marks(scores) for the session
  let totalObtainable = (subjStats.length * 100)
  let totalObtained = subjStats.reduce((acc, ele) => acc += ele?.cumm, 0)

  // take the last entry of term report total subject as value
  let totalSubjs = allSubjs.length

  // the overall term percentage scored: (total obtained / total obtainable) * 100
  const overallPercentage = Math.round((totalObtained / totalObtainable) * 100)
  
  // overall stats for the session: (total Obtainable, total Obtained, total subjects, grade value)
  const stats = { totalObtainable, totalObtained, overallPercentage, totalSubjs }
</script>


<section class="overall-perf-sec">
  <header class="header-sec">
    <h5 class="title">stats for {currentSession} session</h5> 
    <!-- help show overall subject stats records for the session -->
    <button class="ghost-btn" on:click={() => dispatch('subjStats', true)}>
      view subject stats
    </button>
  </header>

  <div class="progress-bar-sec">
    <!-- circular progressbar -->
    <ProgressBar {overallPercentage} />
    <!-- progressbar stat analysis -->
    <ProgressBarStat {stats} />
  </div>
</section>

<style>
  .overall-perf-sec {
    padding: 0 1.2em;
    margin-top: 1.6em;
  }
  .header-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
  }
  .header-sec h5 {
    color: var(--clr-grey);
    font-size: 0.9em;
  }
  .ghost-btn {
    border: none;
    outline: none;
    appearance: none;
    padding: 0.4em;
    border-radius: 2px;
    font-variant: small-caps;
    font-size: 12px;
    background-color: transparent;
    color: var(--accent-info);
    cursor: pointer;
    transition: background-color 0.5s ease;
  }
  .ghost-btn:hover {
    background-color: rgb(109 128 254 / 20%);
  }
  .ghost-btn:active {
    animation: clickBtn 0.5s ease;
  }
  .progress-bar-sec {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em;
  }
</style>