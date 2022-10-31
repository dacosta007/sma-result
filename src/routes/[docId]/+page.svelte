<script>
  import { ResultStore } from "$lib/stores/ResultStore"
  import ResultSlip from "./ResultSlip.svelte";


  export let data
  
</script>

<svelte:head>
  <title>Student Report</title>
  <meta name="viewport" content="width=device-width, initial-scale=0.0">
</svelte:head>

<article>
  <ResultSlip reportData={data.res} docId={data.docId} />
</article>

<style>
  
</style>