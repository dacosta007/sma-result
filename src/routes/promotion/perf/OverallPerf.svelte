<script>
  import { createEventDispatcher } from "svelte"
  import ProgressBar from "./ProgressBar.svelte"
  import ProgressBarStat from "./ProgressBarStat.svelte"

  let dispatch = createEventDispatcher()

  export let overallCummulatives = {}
  export let reptSession = '2022/2023'

  // help format data required to be worked on
  let dataFormat = Object.values(overallCummulatives)

  let totalObtainable = dataFormat.reduce((acc, ele) => acc + ele.obtainable, 0)
  let totalObtained = dataFormat.reduce((acc, ele) => acc + ele.obtained, 0)
  // take the last entry of term report total subject as value
  let totalSubjs = dataFormat[(dataFormat.length) - 1].totalSubj

  // console.log(`Total Obtainable: ${totalObtainable}`, `Total Obtained: ${totalObtained}`)

  // the overall term percentage scored: (total obtained / total obtainable) * 100
  const overallPercentage = Math.round(parseFloat(((totalObtained / totalObtainable) * 100).toFixed(3)))
  
  // overall stats for the session: (total Obtainable, total Obtained, total subjects, grade value)
  const stats = { totalObtainable, totalObtained, overallPercentage, totalSubjs }
</script>


<section class="overall-perf-sec">
  <header class="header-sec">
    <h5 class="title">stats for {reptSession} session</h5> 
    <!-- help show overall subject stats records for the session -->
    <button class="ghost-btn" on:click={() => dispatch('subjStats', true)}>
      view subject stats
    </button>
  </header>

  <div class="progress-bar-sec">
    <!-- circular progressbar -->
    <ProgressBar {overallPercentage} />
    <!-- progressbar stat analysis -->
    <ProgressBarStat {stats} />
  </div>
</section>

<style>
  .overall-perf-sec {
    padding: 0 1.2em;
    margin-top: 1.6em;
  }
  .header-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
  }
  .header-sec h5 {
    color: var(--clr-grey);
    font-size: 0.9em;
  }
  .ghost-btn {
    border: none;
    outline: none;
    appearance: none;
    padding: 0.4em;
    border-radius: 2px;
    font-variant: small-caps;
    font-size: 12px;
    background-color: transparent;
    color: var(--accent-info);
    cursor: pointer;
    transition: background-color 0.5s ease;
  }
  .ghost-btn:hover {
    background-color: rgb(109 128 254 / 20%);
  }
  .ghost-btn:active {
    animation: clickBtn 0.5s ease;
  }
  .progress-bar-sec {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em;
  }
</style>