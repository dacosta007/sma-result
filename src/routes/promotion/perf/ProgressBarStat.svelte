<script>
  import { gradeScore } from "$lib/components/utils/gradeScore";

  export let stats = {}
  
  const { grade, gradeClr } = gradeScore(stats.overallPercentage)
</script>

<div class="stats-container">
  <h5 style="font-variant: all-small-caps; letter-spacing: 1px;">analysis</h5>
  <div class="stats-analysis-container">
    <div>
      <span>Obtainable</span> <span>{stats.totalObtainable}</span>
    </div>
    <div>
      <span>Obtained</span> <span>{stats.totalObtained}</span>
    </div>
    <div>
      <span>percentage</span> <span>{stats.overallPercentage}<small>%</small></span>
    </div>
    <div>
      <span>subjects</span> <span>{stats.totalSubjs}</span>
    </div>
    <div>
      <span>grade</span> <span style="color: {gradeClr};">{grade}</span>
    </div>
    <div>
      <span>remarks</span> 
      <span style="color: {gradeClr};">
        {#if grade === 'A1'}
          excellent!
        {/if}
        {#if grade === 'B2'}
          very good!
        {/if}
        {#if grade === 'B3'}
          good!
        {/if}
        {#if grade === 'C4'}
          fairly good!
        {/if}
        {#if grade === 'C5' || grade === 'C6'}
          fair!
        {/if}
        {#if grade === 'D7' || grade === 'E8'}
          warning!
        {/if}
        {#if grade === 'F9'}
          very bad!
        {/if}
      </span>
    </div>
  </div>
</div>

<style>
  .stats-analysis-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .stats-analysis-container > div {
    display: grid;
    line-height: 1.6;
  }
  .stats-analysis-container > div span:nth-child(1) {
    font-variant: all-small-caps;
    letter-spacing: 0.3px;
    color: var(--clr-grey);
  }
  .stats-analysis-container > div span:nth-child(2) {
    font-size: 15px;
    text-transform: capitalize;
  }
</style>