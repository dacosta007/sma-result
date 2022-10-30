<script>
  import { ResultStore } from "$lib/stores/ResultStore"
  import ResultSlip from "./ResultSlip.svelte";


  export let data
  let { res } = data
  // console.log(res.branch002)
  // console.log(data.docId)
  // console.log(`Doc ID: ${data.docId}`)
</script>

<article>
  <ResultSlip reportData={data.res} docId={data.docId} />
</article>

<style>
  
</style>