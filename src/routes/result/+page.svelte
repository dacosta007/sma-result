<script>
  import { ResultStore } from "$lib/stores/ResultStore"
  import { LocalStore } from "$lib/stores/LocalStore"
  import ListStudt from "./ListStudt.svelte";
  import Stats from "./Stats.svelte";

  export let data
  
  LocalStore.set(data.studts.studts)

  </script>

<!-- in case redirected back from printing report document -->
<svelte:head>
  <title>Student Report</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>


<article class="result-pg">
  <h2 class="center-text">Compute Result </h2>

  <section class="result-container">
    <section class="studts-sec">
      <ListStudt allStudts={data.studts.studts} resultPref={data.resultPref} subjects={data.subjs.branch002} />
    </section>
  
    <section class="overall-stat-sec">
      <Stats studts={data.studts.studts} />
    </section>
  </section>

  <a href="/">go back home</a> 
</article>

<style>
  .result-pg {
    padding: 2em 5em;
    display: grid;
    place-items: center;
  }
  .result-container {
    display: grid;
    grid-template-columns: 3fr 2fr;
    width: 75%;
  }
  .studts-sec {
    padding: 0.5em 2em;
  }
</style>