<script>
  import Card from '$lib/components/Card.svelte'

  export let allStudts = []
  export let allPayments = []
  export let payCountInc = allPayments.length

  let arrOfStdsId = allStudts.map(ele => ele.studtId)
  let allPay = allPayments.filter(ele => arrOfStdsId.includes(ele?.meta?.studtId) != false) ?? []

  let totalStudts =  allStudts.length
  let totalPay = allPay.length
  $:currentInc = payCountInc === 0 ? totalPay : payCountInc
  // remaining student yet to be paid for the term
  $:remaining = totalStudts - currentInc
  // total students paid for the term
  $:totalPayPercentage = parseFloat(((currentInc / totalStudts) * (100 / 1)).toFixed(2))
  // totalPayPercentage = parseFloat(totalPayPercentage)
</script>

<section>
  <Card>
    <header class="stat-header">
      <h2>quick stat</h2>
    </header>
  
    <article class="stat-sec">
      <div class="stat-info">
        <div class="stat">{totalStudts}</div>
        <div class="s-info-title">total students</div>
      </div>
      <div class="stat-info">
        <div class="stat">{currentInc}</div>
        <div class="s-info-title">total payment</div>
      </div>
      <div class="stat-info">
        <div class="stat">{remaining}</div>
        <div class="s-info-title">payments remainig</div>
      </div>
      <div class="stat-info">
        <div class="stat">{totalPayPercentage}%</div>
        <div class="s-info-title">payments percentage</div>
      </div>
    </article>
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
</style>

