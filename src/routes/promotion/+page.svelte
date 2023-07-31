<script>
  import { BranchInfoStore } from '$lib/stores/BranchInfoStore'
  import ListStudt from './ListStudt.svelte';
  import Stats from './Stats.svelte';

  export let data

  const { studts:allStudts, studtReports } = data
  const { session:currentSession, currentTerm, nextTerm } = $BranchInfoStore.academicYear

  // help count total numbers of promoted students (on initial load & when added into DB)
  $: totalPromoted = allStudts?.reduce((acc, ele) => {
    return ele?.promotion != undefined ? acc += 1 : acc += 0
  }, 0)
  // counts total numbers of graduated students (on initial load & when added into DB)
  $: totalGraduated = allStudts?.reduce((acc, ele) => {
    return ele?.graduation != undefined ? acc += 1 : acc += 0
  }, 0)

  /* show on overall stat preview component */
  let statsPreview = { totalStudents: allStudts?.length, currentSession, currentTerm, nextTerm }


  /* increment promotion stat count */
  function incPromotionCount(evt) {
    let counter = parseInt(evt.detail)
    totalPromoted = counter
  }

  /* increment graduation stat count */
  function incGraduatedCount(evt) {
    let counter = parseInt(evt.detail)
    totalGraduated = counter
  }
</script>

<svelte:head>
  <title>Student Promotion & Graduation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
</svelte:head>

<article class="promotion-pg">
  <h2 class="center-text title">Promotion & Graduation</h2>

  <section class="promotion-container">
    <section class="studts-sec">
      <ListStudt {allStudts} allReports={studtReports} on:incPromotionCount={incPromotionCount} on:incGraduatedCount={incGraduatedCount} />
    </section>

    <section class="overall-stat-sec">
      <Stats {statsPreview} promotionCounter={totalPromoted} graduatedCounter={totalGraduated} />
    </section>
  </section>
</article>


<style>
  .promotion-pg {
    padding: 2em 5em;
    display: grid;
    place-items: center;
  }
  .promotion-container {
    display: grid;
    grid-template-columns: 3fr 2fr;
    width: 75%;
  }
  .studts-sec {
    padding: 0.5em 2em;
  }
  .overall-stat-sec {
    position: relative;
  }
</style>