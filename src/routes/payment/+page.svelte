<script>
  import { BranchInfoStore } from '$lib/stores/BranchInfoStore'
  import ListStudt from './ListStudt.svelte'
  import Stats from './Stats.svelte'

  export let data

  let { currentTerm } = $BranchInfoStore.academicYear

  let countPayStat = 0

  // help increment all payment added into DB
  function countPayAdded(evt) {
    countPayStat = parseInt(evt.detail)
  }
</script>

<svelte:head>
  <title>School Payment</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<article class="payment-pg">
  <h2 class="center-text title">school fee payments</h2>

  <section class="payment-container">
    <section class="studts-sec">
      <ListStudt allStudts={data.studts} allPayments={data.paymentData} on:incPayCount={countPayAdded} />
    </section>

    <section class="overall-stat-sec">
      <Stats allStudts={data.studts} allPayments={data.paymentData} payCountInc={countPayStat} />
    </section>
  </section>
</article>

<style>
  .payment-pg {
    padding: 2em 5em;
    display: grid;
    place-items: center;
  }
  .payment-container {
    display: grid;
    grid-template-columns: 3fr 2fr;
    width: 75%;
  }
  .studts-sec {
    padding: 0.5em 2em;
  }
</style>