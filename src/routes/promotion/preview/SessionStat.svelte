<script>
  import { gradeScore } from "$lib/components/utils/gradeScore"

  export let stdRept = {}
  export let stdDetail = {}

  let { meta:stdMeta, exam } = stdRept

  let promotion = stdDetail?.promotion ?? []
  let graduation = stdDetail?.graduation ?? {}

  let promotionStatus = promotion.find(ele => ele?.session === stdRept?.meta?.session)
  let graduationStatus = graduation?.graduated

  let studtCls = `${stdDetail?.class?.category} ${stdDetail?.class?.level}`

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

  const totalSubjs = subjStats.length

  // total obtainable & obtained marks(scores) for the session
  const totalObtainable = (subjStats.length * 100)
  const totalObtained = subjStats.reduce((acc, ele) => acc += ele?.cumm, 0)

  // the student's sum total performance pecentage for the session
  const  overallPercentage = Math.round((totalObtained / totalObtainable) * 100)

  // overall stats for the session: (total Obtainable, total Obtained, total subjects, grade value)
  const overallStats = { totalObtainable, totalObtained, overallPercentage, totalSubjs, grade: gradeScore(overallPercentage).grade }
</script>

<!-- student's name -->
<header class="center-text">
  <h3 class="std-name">{stdMeta.name.first} {stdMeta.name.last}</h3>
</header>

<section class="slip-body">
  <div class="result-sec">
    <!-- report watermark -->
    <div class="watermark-sec">
      {#if studtCls != 'sss 3' && promotionStatus != undefined}
        <img src="/imgs/promoted_crown_stamp_red.png" alt="promoted_stamp_red" width="200" height="auto">
      {/if}
      {#if studtCls === 'sss 3' && graduationStatus != undefined}
        <img src="/imgs/graduated_stamp_txt.png" alt="graduated_stamp" width="200" height="auto">
      {/if}
    </div>

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
            <p style="center-text">No stats for subjects yet!</p>
          {/each}
        </tbody>
      </table>
      <!-- overall cummulated stats -->
      <div class="overall-cumm-sec">
        <div>
          <span>total subjects</span> <span>{totalSubjs}</span>
        </div>
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
  </div>
</section>


<style>
  .std-name {
    font-weight: lighter;
  }
  .slip-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    position: relative;
  }
  .result-sec {
    width: 100%;
    margin-top: 1em;
    border: 1px solid var(--clr-off-white);
    position: relative;
    isolation: isolate;
  }
  .watermark-sec {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .watermark-sec img {
    width: 300px;
    max-width: 100%;
    height: auto;
    object-fit: contain;
    object-position: center;
    filter: opacity(0.3);
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