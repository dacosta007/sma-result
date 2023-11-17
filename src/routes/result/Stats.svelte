<script>
  import { ResultStore } from "$lib/stores/ResultStore"
  import { BranchInfoStore } from "$lib/stores/BranchInfoStore"

  import Card from "$lib/components/Card.svelte"
  import Button from "$lib/components/Button.svelte";

  export let studts
  export let reptComptd = 0

  let btnProps = {
    btnType: 'button',
    block: true,
    showLoading: false,
    loadingStatus: 'saving to DB...',
    disableBtn: false,
    sec: true
  }

  let totalStudts = studts.length

  // sch branch details
  let { academicYear } = $BranchInfoStore
  
  if ($ResultStore === undefined || $ResultStore.length === 0) {
    reptComptd = 0
    btnProps.disableBtn = true
  }
  if ($ResultStore.length > 0) {
    reptComptd = $ResultStore.length
  }

  $:reptRemain = totalStudts - reptComptd
  
  // students without reports
  function getStudtWithoutRept() {
    let allIds = $ResultStore.map(ele => ele.meta.studtId)
    let res = studts.filter(ele => allIds.includes(ele.studtId) === false)
    // console.log(res)
  }
  // getStudtWithoutRept()
</script>

<section class="page-stats-container">
  <Card>
    <header class="stat-header">
      <h2>quick stat</h2>
    </header>
    
    <!-- stats (total students, completed, remaining) -->
    <article class="stat-sec">
      <!-- total students in sch -->
      <div class="stat-info">
        <div class="stat">{totalStudts}</div>
        <div class="s-info-title">students</div>
      </div>
      <!-- completed records -->
      <div class="stat-info">
        <div class="stat" class:success-info={reptComptd > 0} class:danger-info={reptComptd === 0}>{reptComptd}</div>
        <div class="s-info-title">completed</div>
      </div>
      <!-- remainig to complete -->
      <div class="stat-info">
        <div class="stat warning-info">{reptRemain}</div>
        <div class="s-info-title">uncompleted</div>
      </div>
      <div class="stat-info">
        <div class="stat info">{`${(academicYear.session).split('/')[0].slice(2, 4)}/${(academicYear.session).split('/')[1].slice(2, 4)}`}</div>
        <div class="s-info-title">session</div>
      </div>
      <!-- term -->
      <div class="stat-info">
        <div class="stat info" style="text-transform: capitalize;">{academicYear.currentTerm}</div>
        <div class="s-info-title">term</div>
      </div>
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
  .page-stats-container {
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
    color: var(--clr-grey);
  }
  .stat {
    font-size: 24px;
  }
  .cta-sec {
    padding: 0.8em;
  }
  .success-info {
    color: var(--accent-success);
  }
  .danger-info {
    color: var(--accent-danger);
  }
  .warning-info {
    color: var(--accent-warning);
  }
  .info {
    color: var(--accent-info);
  }
</style>