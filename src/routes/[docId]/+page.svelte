<script>
  import ResultSlip from "./ResultSlip.svelte";
  // import ResultNotice from "./ResultNotice.svelte";

  export let data
  let {res, branchData} = data
</script>

<svelte:head>
  <title>Student Report</title>
  <meta name="viewport" content="width=device-width, initial-scale=0.0">
</svelte:head>

<article>
  <!-- <ResultNotice reports={data.res.branch002} docId={data.docId} /> -->
  <ResultSlip reportData={res} {branchData} />
</article>

<style>
  
</style>