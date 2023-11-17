<script>
  import SheetHeader from "./SheetHeader.svelte"
  import { handleScoresCalc } from "./spreadsheetCalc"

  export let sheetSession = '2022/2023'
  export let sheetSubjs = []
  export let sheetData = []
  export let sheetClass = ''
</script>

<article class="spreadsheet-section">
  <section class="sheet-container">
    <SheetHeader {sheetSession} />

    <section class="sheet-body">
      <table>
        <caption>for <b>{sheetClass}</b> class</caption>
        <thead>
          <tr>
            {#each sheetSubjs as subject}
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
          {#each sheetData as data}
            <tr>
              {#each sheetSubjs as subject}
                <td>
                  <table>
                    <tr>
                      <td>{handleScoresCalc(subject, data).ftScore}</td>
                      <td>{handleScoresCalc(subject, data).ndScore}</td>
                      <td>{handleScoresCalc(subject, data).rdScore}</td>
                      <td>{handleScoresCalc(subject, data).averageScore}</td>
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
</article>

<style>
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
  caption {
    text-transform: uppercase;
  }
  table, th, td {
    border: 1px solid var(--clr-sec);
    border-collapse: collapse;
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
</style>