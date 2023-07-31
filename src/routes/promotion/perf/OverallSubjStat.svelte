<script>
  import { createEventDispatcher } from "svelte";
  import { gradeScore } from "$lib/components/utils/gradeScore"

  export let stdRept = {}
  
  let dispatch = createEventDispatcher()


  let { meta, cummulative, exam } = stdRept

  // all cummulatives data for the session(first, second, & third)
  let sessionCummulatives = Object.values(cummulative?.exam)

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

  // filter-out duplicate subjects
  let allSubjs = [].concat(subjFirst, subjSecond, subjThird)
  allSubjs = [...(new Set(allSubjs))]

  const subjStats = allSubjs.map(subject => {
    let obj = {}

    // subject offered by the student
    obj['subj'] = subject

    /* data structure for each term to be display for each term */
    obj['first'] = {CA: 0, exam: 0, totalMark: 0, grade: '', gradeClr: ''}
    obj['second'] = {CA: 0, exam: 0, totalMark: 0, grade: '', gradeClr: ''}
    obj['third'] = {CA: 0, exam: 0, totalMark: 0, grade: '', gradeClr: ''}

    /* get each subject's(offered by the student) scores for each term within the session */
    let scoresFirstTerm = firstTerm.find(sc => sc.subj === subject) ?? {}
    let scoresSecondTerm = secondTerm.find(sc => sc.subj === subject) ?? {}
    let scoresThirdTerm = thirdTerm.find(sc => sc.subj === subject) ?? {}

    /* get the values of each subject scores for each term */
    obj.first = { 
      CA: scoresFirstTerm?.CA ?? 0, 
      exam: scoresFirstTerm?.exam ?? 0, 
      totalMark: scoresFirstTerm?.totalMark ?? 0, 
      grade: scoresFirstTerm?.grade ?? 'F', 
      gradeClr: scoresFirstTerm?.gradeClr ?? 'var(--accent-danger)' 
    }
    obj.second = { 
      CA: scoresSecondTerm?.CA ?? 0, 
      exam: scoresSecondTerm?.exam ?? 0, 
      totalMark: scoresSecondTerm?.totalMark ?? 0, 
      grade: scoresSecondTerm?.grade ?? 'F', 
      gradeClr: scoresSecondTerm?.gradeClr ?? 'var(--accent-danger)' 
    }
    obj.third = {
      CA: scoresThirdTerm?.CA ?? 0, 
      exam: scoresThirdTerm?.exam ?? 0, 
      totalMark: scoresThirdTerm?.totalMark ?? 0, 
      grade: scoresThirdTerm?.grade ?? 'F', 
      gradeClr: scoresThirdTerm?.gradeClr ?? 'var(--accent-danger)'
    }

    return obj
  })

  function closePerf() {
    dispatch('closeOverallSubjStats', 'close')
  }
</script>


<aside class="overallSubj-sec">
  <div class="subj-content">
    <header class="header-sec">
      <!-- a close btn. for closing the preview window -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <i class="close-btn lni lni-close" on:click={closePerf} on:keypress={closePerf}></i>

      <h2 class="title">overall subject stats</h2>
      <h4 class="title">
        <div>{meta?.name?.first} {meta?.name?.last}</div>
        <div>
          <span>{meta?.studtId}</span> 
          <span style="text-transform: uppercase;">{meta?.class?.category} {meta?.class?.level}</span><sup style="text-transform: uppercase; color:var(--accent-info);">{meta?.class?.subLevel}</sup>
        </div>
      </h4>
    </header>

    <section class="body-sec">
      <div class="table-container">
        <table>
          <thead>
            <th>subjects</th>
            <th>
              1<sup>st</sup> term
              <table>
                <tbody>
                  <tr>
                    <td>CA</td>
                    <td>exams</td>
                    <td>total</td>
                    <td>grade</td>
                  </tr>
                </tbody>
              </table>
            </th>
            <th>
              2<sup>nd</sup> term
              <table>
                <tr>
                  <td>CA</td>
                  <td>exams</td>
                  <td>total</td>
                  <td>grade</td>
                </tr>
              </table>
            </th>
            <th>
              3<sup>rd</sup> term
              <table>
                <tr>
                  <td>CA</td>
                  <td>exams</td>
                  <td>total</td>
                  <td>grade</td>
                </tr>
              </table>
            </th>
          </thead>

          <tbody class="subj-list-container">
            {#each subjStats as subjs}
              <tr>
                <td>{subjs.subj}</td>
                <td>
                  <table>
                    <tr>
                      <td>{subjs?.first?.CA}</td>
                      <td>{subjs?.first?.exam}</td>
                      <td>{subjs?.first?.totalMark}</td>
                      <td style="color: {subjs?.first?.gradeClr};">{subjs?.first?.grade}</td>
                    </tr>
                  </table>
                </td>
                <td>
                  <table>
                    <tr>
                      <td>{subjs?.second?.CA}</td>
                      <td>{subjs?.second?.exam}</td>
                      <td>{subjs?.second?.totalMark}</td>
                      <td style="color: {subjs?.second?.gradeClr};">{subjs?.second?.grade}</td>
                    </tr>
                  </table>
                </td>
                <td>
                  <table>
                    <tr>
                      <td>{subjs?.third?.CA}</td>
                      <td>{subjs?.third?.exam}</td>
                      <td>{subjs?.third?.totalMark}</td>
                      <td style="color: {subjs?.third?.gradeClr};">{subjs?.third?.grade}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            {:else}
              <p>No subjects to show!..</p>
            {/each}
          </tbody>
        </table>
        <div class="overall-cumm-sec">
          <div>
            <span>total subjects</span> <span>{allSubjs.length}</span>
          </div>
          <div>
            <span>total obtainable</span> <span>{totalObtainable}</span>
          </div>
          <div>
            <span>total obtained</span> <span>{totalObtained}</span>
          </div>
          <div>
            <span>overall percentage</span> <span>{overallPercentage}<small>%</small></span>
          </div>
          <div>
            <span>grade</span> <span style="color: {gradeScore(overallPercentage).gradeClr};">{gradeScore(overallPercentage).grade}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</aside>

<style>
  .overallSubj-sec {
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    z-index: 7;
    background-color: rgb(0 0 0 / 30%);
    backdrop-filter: blur(3px);
  }
  .subj-content {
    position: relative;
    width: 65%;
    background-color: var(--clr-white);
    border-radius: 2px;
    margin: 5em auto;
  }
  .header-sec {
    position: relative;
    text-align: center;
    padding: 0.5em;
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
  .body-sec {
    position: relative;
  }
  .table-container {
    position: relative;
    padding: 0em 0.4em 0.8em;
  }
  .table-container  table {
    width: 100%;
    border-collapse: collapse;
  }
  .table-container thead th:nth-child(1) {
    text-align: left;
    letter-spacing: 1px;
  }
  .table-container > table thead th {
    font-size: 15px;
    font-family: var(--font-quicksand);
    font-variant: all-small-caps;
    text-transform: capitalize;
    color: var(--clr-grey);
    padding: 0.5em 0.8em;
  }
  .table-container th table {
    font-size: 13px;
  }
  .subj-list-container > tr:nth-child(odd) {
    background-color: var(--clr-off-white);
  }
  .subj-list-container > tr:nth-child(even) {
    background-color: var(--clr-white);
  }
  .subj-list-container > tr > td {
    font-size: 13px;
    text-transform: capitalize;
    padding: 0.5em 0.8em;
  }
  .subj-list-container td table tr td {
    text-align: center;
  }
  .overall-cumm-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8em 0.6em;
    border: 1px dashed var(--clr-grey);
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    font-size: 14px;
    margin-top: 0.7em;
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