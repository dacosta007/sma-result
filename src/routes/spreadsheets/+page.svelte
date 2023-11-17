<script>
  import SheetForm from './SheetForm.svelte'
  import Spreadsheet from './Spreadsheet.svelte'

  export let data

  let currentSession = data.branchInfo

  // help toggle btwn showing and hiding the spreadsheet
  let showSpreadsheet = false
  let spreadsheetData = {}

  // handles showing of the spreadsheet
  function showData(evt) {
    spreadsheetData = evt.detail
    // show spreadsheet for the class
    showSpreadsheet = true
  }

  // handles close showing of spreadsheet 
  function closeSpreadsheet(evt) {
    showSpreadsheet = evt.detail // boolean value(i.e: false only)
  }
</script>

<svelte:head>
  <title>Spreadsheets For Classes</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<article class="page-wrapper">
  {#if showSpreadsheet === false}
    <SheetForm on:sheetData={showData} />
    <div class="back-home-link">
      <a href="/"><i class="ti ti-arrow-left"></i> <span>back home</span></a>
    </div>
  {/if}

  {#if showSpreadsheet}
    <Spreadsheet sheetData={spreadsheetData} on:closeSheet={closeSpreadsheet} />
  {/if}
</article>


<style>
  .page-wrapper {
    padding: 4em 3em;
    min-height: 100dvh;
    overflow: auto;
  }
  .back-home-link {
    display: flex;
    justify-content: center;
    margin-top: 1em;
  }
  .back-home-link a {
    text-decoration: none;
    text-transform: capitalize;
    letter-spacing: 0.8px;
    color: var(--accent-info);
    display: flex;
    align-items: center;
    gap: 0.6em;
  }
  .back-home-link i {
    font-size: 16px;
  }
  .back-home-link a:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    .page-wrapper {
      padding: 0em 1em;
    }
  }

  @media print {
    .page-wrapper {
      padding: 0;
    }
  }
</style>