<script>
  import ResultHeader from "./ResultHeader.svelte";
  import ResultBody from "./ResultBody.svelte";
  
  export let reportData
  export let docId
</script>

<!-- <svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=0" />
</svelte:head> -->

<section class="slip-container">
  <div class="slip">
    <ResultHeader />
    
    <ResultBody report={reportData} docId={docId} />
  </div>
</section>

<style>
  .slip-container {
    display: flex;
    justify-content: center;
    margin-top: 2em;
    margin-bottom: 2em;
    width: 100%;
  }
  .slip {
    background-color: var(--clr-white);
    color: var(--clr-txt);
    border-radius: 1px;
    width: 760px;
    padding: 2em 3em;
  }

  @media print {
    .slip {
      margin: 0;
      padding: 0;
    }
  }
</style>