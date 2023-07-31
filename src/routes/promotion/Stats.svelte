<script>
  import Card from '$lib/components/Card.svelte'
  export let statsPreview
  export let promotionCounter, graduatedCounter

  /* de-structure out all required variables needed to be shown */
  const { totalStudents, currentSession, currentTerm, nextTerm } = statsPreview
  
  let currentSessionFormat = `${(currentSession.split('/')[0]).slice(2)}/${(currentSession.split('/')[1]).slice(2)}`

  $: allStatsObj = [
    {
      title: 'students',
      value: totalStudents 
    },
    {
      title: 'promoted',
      value: promotionCounter 
    },
    {
      title: 'graduated',
      value: graduatedCounter 
    },
    {
      title: 'session',
      value: currentSessionFormat 
    },
    {
      title: 'term',
      value: currentTerm 
    },
    {
      title: 'next term',
      value: nextTerm 
    }
  ]
</script>


<section class="pg-stats-container">
  <Card>
    <header class="stat-header">
      <h2>quick stat</h2>
    </header>

    <article class="stat-sec">
      {#each allStatsObj as stats}
        <div class="stat-info">
          <div class="stat">{stats.value}</div>
          <div class="s-info-title">{stats.title}</div>
        </div>
      {/each}
    </article>
  </Card>
</section>


<style>
  .pg-stats-container {
    position: sticky;
    top: 1.5em;
  }
  .stat-header {
    padding: 1em 0.5em;
    border-bottom: 1px solid var(--clr-off-white);
    text-transform: capitalize;
    font-family: var(--font-quicksand);
  }
  .stat-sec {
    padding: 1em 0.5em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4em;
  }
  .stat-info {
    display: grid;
    line-height: 1.4;
  }
  .s-info-title {
    font-size: 12px;
    text-transform: capitalize;
  }
  .stat {
    font-size: 24px;
    text-transform: capitalize;
  }
</style>