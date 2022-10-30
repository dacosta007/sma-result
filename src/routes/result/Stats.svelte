<script>
  import { ResultStore } from "$lib/stores/ResultStore"

  import Card from "$lib/components/Card.svelte"
  import Button from "$lib/components/Button.svelte";

  export let studts

  let btnProps = {
    btnType: 'button',
    block: true,
    showLoading: false,
    loadingStatus: 'saving to DB...',
    disableBtn: false,
    sec: true
  }

  let totalStudts = studts.length
  let reptComptd = $ResultStore.length

  if ($ResultStore === undefined) {
    reptComptd = 0
    btnProps.disableBtn = true
  }


  $:reptRemain = totalStudts - reptComptd
</script>

<section>
  <Card>
    <header class="stat-header">
      <h2>quick stat</h2>
    </header>
    
    <!-- stats (total students, completed, remaining) -->
    <article class="stat-sec">
      <!-- total students in sch -->
      <div class="stat-info">
        <div class="stat">{totalStudts}</div>
        <div class="s-info-title">total students</div>
      </div>
      <!-- completed records -->
      <div class="stat-info">
        <div class="stat">{reptComptd}</div>
        <div class="s-info-title">report completed</div>
      </div>
      <!-- remainig to complete -->
      <div class="stat-info">
        <div class="stat">{reptRemain}</div>
        <div class="s-info-title">remains</div>
      </div>
      <!-- term -->
      <!-- <div class="stat-info">
        <div class="stat">{reptRemain}</div>
        <div class="s-info-title">remains</div>
      </div> -->
    </article>

    <!-- cta-sec(trigger action to save all completed report in DB ) -->
    <div class="cta-sec">
      <Button {...btnProps}>
        save all reports
      </Button>
    </div>
  </Card>
</section>

<style>
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
  }
  .cta-sec {
    padding: 0.8em;
  }
</style>