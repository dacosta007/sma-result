<script>
  import { createEventDispatcher } from "svelte"
  import MoreSheet from "./MoreSheet.svelte";
  import SheetHeader from "./SheetHeader.svelte"
  import Button from "$lib/components/Button.svelte"
  import { handleScoresCalc } from "./spreadsheetCalc"
  
  export let sheetData = {}

  let { reports, sheetClass, sheetSession } = sheetData

  let dispatch = createEventDispatcher()

  /* help close the spreadsheet */
  function closeSpreadsheet() {
    dispatch('closeSheet', false)
  }

  /* Help get classes report subjects offered by each student in a class: To aggregate all offered subjects by students */
  function getTermReptSubjs(rept ,term) {
    let ftSubjs = [], ndSubjs = [], rdSubjs = []

    if (rept[0]?.meta.class.category === 'sss') {
      rept.forEach((ele, indx) => {
        ftSubjs.push( (ele?.exam?.report?.first) ? (ele?.exam?.report?.first).map(ele => ele?.subj ?? '') : [] )
        ndSubjs.push( (ele?.exam?.report?.second)? (ele?.exam?.report?.second).map(ele => ele?.subj ?? '') : [] )
        rdSubjs.push( (ele?.exam?.report?.third)? (ele?.exam?.report?.third).map(ele => ele?.subj ?? '') : '' )
      })
      let ftSubjsFilterDuplicates = Array.from(new Set(ftSubjs.flat().map(ele => ele))).filter(ele => ele != '')
      let ndSubjsFilterDuplicates = Array.from(new Set(ndSubjs.flat().map(ele => ele))).filter(ele => ele != '')
      let rdSubjsFilterDuplicates = Array.from(new Set(rdSubjs.flat().map(ele => ele))).filter(ele => ele != '')
      
      // combine all subject for the whole term & filter out duplicates
      let allSubjsForSssClasses = ftSubjsFilterDuplicates.concat(ndSubjsFilterDuplicates, rdSubjsFilterDuplicates)
      allSubjsForSssClasses = Array.from(new Set(allSubjsForSssClasses)).sort()
      
      return allSubjsForSssClasses
    }
    let termRept = rept[1]?.exam?.report ? (rept[1]?.exam?.report[`${term}`]).map(ele => ele?.subj ?? '') : []
    return termRept
  }

  /* @DESC:
    get all subjects offered by students within the desired class, and filter them distinctively: 
    To get all class's subjects recorded.
  */
  let firstTermClassSubjs = Array.from(new Set(getTermReptSubjs(reports, 'first')))
  firstTermClassSubjs = firstTermClassSubjs.sort()
  

  /* @DESC:
    format students info to be display on the spreadsheet:
    - student name
    - student subjects scores for first, second, and third term with 
    - average score((1st + 2nd + 3rd) / total no_ of term recoded ) 
  */
  let studentsInfos = reports.reduce((acc, ele, indx, arr) => {
    let dataObj = {}
    dataObj['name'] = `${(ele.meta.name.first).trim()} ${(ele.meta.name.last).trim()}` || ""
    
    // get all subjects scores for each terms
    dataObj['first'] = (ele.exam.report?.first) ? (ele.exam.report.first).map(s => { return { subj: s.subj, score: s.totalMark } }) : undefined
    dataObj['second'] = (ele.exam.report?.second) ? (ele.exam.report.second).map(s => { return { subj: s?.subj, score: s.totalMark } }) : undefined
    dataObj['third'] =  (ele.exam.report?.third) ? (ele.exam.report.third).map(s => { return { subj: s?.subj, score: s.totalMark } }) : undefined

    acc.push(dataObj)
    return acc
  }, [])
  
  /* sort students data info alphabetically(by name property in the data) */
  studentsInfos = studentsInfos.sort(function(a, b) { 
    let x = a.name.toLowerCase()
    let y = b.name.toLowerCase()
    if (x < y) { return -1 }
    if (x > y) { return 1 }
    return
  })

  /* @DESC:
    format subjects to be displayed per spreadsheet 
    - first sheet to only display five subjects only
    - other sheets should display maximum of six subjects only
  */
  let sheetSubjArr1 = [], sheetSubjArr2 = [], sheetSubjArrSss1 = [], sheetSubjArrSss2 = []
  let sheetSubjArrSss3 = [], sheetSubjArrSss4 = [], sheetSubjArrSss5 = []
  
  // get first five subject to be displayed on first sheet
  const firstSheet = firstTermClassSubjs.slice(0, 5)

  /* holds remaining subjects to be displayed on other sheets(for jss students class categroy) */
  const otherSheets = firstTermClassSubjs.slice(5, firstTermClassSubjs.length)
  sheetSubjArr1 = otherSheets.slice(0, 6)
  sheetSubjArr2 = otherSheets.slice(6, otherSheets.length)

  /* holds remaining subjects to be displayed on other sheets(for sss students class categroy) */
  if (firstTermClassSubjs.length > 18 ) {
    sheetSubjArrSss1 = firstTermClassSubjs.slice(5, 11)
    sheetSubjArrSss2 = firstTermClassSubjs.slice(11, 17)
    sheetSubjArrSss3 = firstTermClassSubjs.slice(17, 23)
    sheetSubjArrSss4 = firstTermClassSubjs.slice(23, 29)
    sheetSubjArrSss5 = firstTermClassSubjs.slice(29, firstTermClassSubjs.length)
  }
</script>

<article class="spreadsheet-section">
  <!-- close/back arrow button -->
  <div class="close-spreadsheet-btn">
    <i class="ti ti-arrow-left close-arrow-btn" on:click={closeSpreadsheet} on:keypress={closeSpreadsheet}></i>
  </div>

  <section class="sheet-container">
    <SheetHeader {sheetSession} />

    <section class="sheet-body">
      <table class="main-table">
        <caption>for <b>{sheetClass}</b> class</caption>
        <thead class="main-table-head">
          <tr>
            <th>No_</th>
            <th style="text-transform: uppercase;">names</th>
            <th style="text-transform: uppercase;">class</th>
            {#each firstSheet as subject}
              <th>
                {subject}
                <table>
                  <tr>
                    <th><span>1</span><sup>st</sup></th>
                    <th><span>2</span><sup>nd</sup></th>
                    <th><span>3</span><sup>rd</sup></th>
                    <th>avg.</th>
                  </tr>
                </table>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each studentsInfos as studt, indx}
            <tr>
              <td>{indx + 1}</td>
              <td>{(studt.name).toUpperCase()}</td>
              <td>{sheetClass}</td>
              <!-- 1st, 2nd, & 3rd term, & score avg. -->
              {#each firstSheet as s}
                <td>
                  <table>
                    <tr>
                      <td>{handleScoresCalc(s, studt).ftScore}</td>
                      <td>{handleScoresCalc(s, studt).ndScore}</td>
                      <td>{handleScoresCalc(s, studt).rdScore}</td>
                      <td>{handleScoresCalc(s, studt).averageScore}</td>
                    </tr>
                  </table>
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  </section>

  <!-- for jss class students category -->
  {#if reports[0].meta.class.category === 'jss'}
    <MoreSheet {sheetSession} sheetSubjs={sheetSubjArr1} sheetData={studentsInfos} {sheetClass} />
    <MoreSheet {sheetSession} sheetSubjs={sheetSubjArr2} sheetData={studentsInfos} {sheetClass} />
  {/if}
  <!-- for sss class students category -->
  {#if reports[0].meta.class.category === 'sss'}
    <MoreSheet {sheetSession} {sheetClass} sheetData={studentsInfos} sheetSubjs={sheetSubjArrSss1} />
    <MoreSheet {sheetSession} {sheetClass} sheetData={studentsInfos} sheetSubjs={sheetSubjArrSss2} />
    <MoreSheet {sheetSession} {sheetClass} sheetData={studentsInfos} sheetSubjs={sheetSubjArrSss3} />
    {#if sheetSubjArrSss4.length != 0}
      <MoreSheet {sheetSession} {sheetClass} sheetData={studentsInfos} sheetSubjs={sheetSubjArrSss4} />
    {/if}
    {#if sheetSubjArrSss5.length != 0}
      <MoreSheet {sheetSession} {sheetClass} sheetData={studentsInfos} sheetSubjs={sheetSubjArrSss5} />
    {/if}
  {/if}

  
  <!-- print button -->
  <div class="print-btn-container">
    <Button on:click={() => window.print()}>print spreadsheet</Button>
  </div>
</article>


<style>
  .close-spreadsheet-btn {
    padding: 1em 1.5em;
  }
  .close-arrow-btn {
    font-size: 18px;
    color: var(--accent-info);
    padding: 0.5em;
  }
  .close-arrow-btn:hover {
    cursor: pointer;
    background-color: rgba(217, 230, 245, 0.39);
  }
  .close-arrow-btn:active {
    animation: clickBtn 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .sheet-container {
    background-color: var(--clr-white);
    width: 100%;
    margin-bottom: 3em;
  }
  .sheet-body {
    padding: 0 1.5em 1.2em;
  }
  table {
    width: 100%;
  }
  .main-table caption {
    text-transform: uppercase;
  }
  .main-table, th, td {
    border-collapse: collapse;
    border: 1px solid;
  }
  th table, th th {
    border-collapse: collapse;
  }
  table th {
    padding: 0px;
    font-size: 15px;
  }
  tbody td {
    border-collapse: collapse;
    font-size: 13px;
  }
  tbody tr > td:nth-child(3) {
    padding-right: 1px;
    text-transform: uppercase;
  }
  td table, td td {
    border-collapse: collapse;
    text-align: center;
    border-top: 0 !important;
    border-bottom: 0 !important;
  }
  .print-btn-container {
    display: flex;
    justify-content: center;
  }

  @media print {
    .close-spreadsheet-btn, .print-btn-container {
      display: none
    }
    .sheet-body {
      padding: 0;
    }
  }
</style>