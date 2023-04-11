<script>
  import { fade, scale } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'

  import Card from '$lib/components/Card.svelte'
  import Button from '$lib/components/Button.svelte'
  import UpdatePay from './UpdatePay.svelte'

  export let std = {}
  export let currentSession = ''
  export let currentTerm = ''
  export let stdPayDetails = {}

  let dispatch = createEventDispatcher()

  let btnProps = {
    btnType: 'button',
    sec: true,
    block: true
  }

  /* help format required data structure for showing all payment for the session */
  function formatPayData(pay) {
    // if there are no payment recorded before
    if (Object.keys(pay).length <= 0) {
      return []
    }

    let arrObjs = []
    let terms = Object.keys(pay)
    let vals = Object.values(pay)

    for(let i = 0; i < terms.length; i++) {
      let loopObj = {}
      loopObj.term = terms[i]
      loopObj.paid = vals[i]
      arrObjs[i] = loopObj
    }

    return arrObjs
  }

  /* should hold all the payment for the term */
  $:allTermPay = formatPayData(stdPayDetails)

  /* help close preview window */
  function showPrevWin(evt) {
    dispatch('showPrevWin', false)
  }

  /* help delete term payment */
  function delTermPay(evt) {
    let delTerm = evt.detail

    // update term(first, second, or third) selected value equals false
    stdPayDetails[`${delTerm}`] = false
    allTermPay = allTermPay.filter(ele => ele.term != delTerm)
    
    // update the general data-source store
    dispatch('delTermPay', delTerm)
  }

  /* hold form values */
  let frmData = { term: '', payment: '' }

  /* help add/update payment for a term */
  function addPayment(evt) {
    // if values are empty
    if (frmData.term === '' || frmData.payment === '') { return }
    
    // convert payment type to Boolean values(for database storage)
    let termPay = frmData.payment === 'unpaid' ? false : true

    // update all term payment variable value
    stdPayDetails[`${frmData.term}`] = termPay
    dispatch('addPayment', stdPayDetails)

    // reset all the values of the form fields
    frmData.term = ''
    frmData.payment = ''
    evt.target.reset()
  }
  
  /* update term payment for the session in database */
  function updateSessionPayment() {
    dispatch('uptdPay', { payUptData: stdPayDetails, stdId: std.studtId ?? std.meta.studtId })
  }
</script>


<article class="preview-container" in:fade out:scale>
  <Card>
    <header class="preview-header">
      <!-- close preview container -->
      <span class="close-btn" on:click={showPrevWin} on:keypress={showPrevWin}>&#10005;</span>

      <!-- preview container title -->
      <h2 class="center-text title">payment details</h2>

      <!-- student's info(img, name, and id)  -->
      <div class="img-and-name-cont">
        <!-- student img -->
        <div class="img-cont">
          <i class="ti ti-user"></i>
        </div>
        <!-- student name & id -->
        <div class="name-and-id">
          <div class="name">{std?.name?.first ?? std?.meta?.name?.first} {std?.name?.last ?? std?.meta?.name?.last}</div>
          <div class="id-and-class">
            <span>{std?.studtId ?? std?.meta?.studtId}</span> 
            <span>
              {std?.class?.category ?? std?.meta?.class?.category} 
              {std?.class?.level ?? std?.meta?.class?.level}<sup>{std?.class?.subLevel ?? std?.meta?.class?.subLevel}</sup>
            </span>
          </div>,
        </div>
      </div>
    </header>

    <section class="preview-body">
      <h5 class="title">current term status</h5>
      <div class="info-sec">
        <div class="info">
          <span>session</span>
          <span style="font-weight: bold;">{currentSession}</span>
        </div>
        <div class="info">
          <span>term</span>
          <span style="color: var(--accent-info);">{currentTerm}</span>
        </div>
        <div class="info">
          <span>status</span>
          <span class:unpaid={stdPayDetails[`${currentTerm}`] === undefined} class:paid={stdPayDetails[`${currentTerm}`] === true}>
            {stdPayDetails[`${currentTerm}`] === undefined ? 'unpaid': 'paid'}
          </span>
        </div>
      </div>

      <!-- payment for all the term in a session -->
      <h5 class="title">for the session: {currentSession}</h5>
      <div class="pay-session-alys-sec">
        <div class="info">
          <span>first</span>
          <span class:paid={stdPayDetails.first || stdPayDetails.first != false}  class:unpaid={stdPayDetails.first === undefined || stdPayDetails.first === false}>
            {#if stdPayDetails.first === undefined || stdPayDetails.first === false}
              unpaid
            {:else}
              paid
            {/if}
          </span>
        </div>
        <div class="info">
          <span>second</span>
          <span class:paid={stdPayDetails.first || stdPayDetails.second != false}  class:unpaid={stdPayDetails.second === undefined || stdPayDetails.second === false}>
            {#if stdPayDetails.second === undefined || stdPayDetails.second === false}
              unpaid
            {:else}
              paid
            {/if}
          </span>
        </div>
        <div class="info">
          <span>third</span>
          <span class:paid={stdPayDetails.third || stdPayDetails.third != false}  class:unpaid={stdPayDetails.third === undefined || stdPayDetails.third === false}>
            {#if stdPayDetails.third === undefined || stdPayDetails.third === false}
              unpaid
            {:else}
              paid
            {/if}
          </span>
        </div>
      </div>

      <!-- update payment section -->
      <h5 class="title">update payment</h5>
      <form action="#" method="POST" on:submit|preventDefault={addPayment}>
        <div class="uptd-sec">
          <div class="input-field">
            <label for="term">update term</label>
            <select name="term" id="term" bind:value={frmData.term}>
              <option value="" style="color: rgb(98 95 104);">Term</option>
              <option value="first">First Term</option>
              <option value="second">Second Term</option>
              <option value="third">Third Term</option>
            </select>
          </div>

          <div class="input-field">
            <label for="payment">payment</label>
            <select name="payment" id="payment" bind:value={frmData.payment}>
              <option value="" style="color: rgb(98 95 104);">Payment</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          <div class="input-field btn-add-sec">
            <button type="submit" class="btn-add">&plus;</button>
          </div>
        </div>
      </form>

      <!-- show all added term payments for the session -->
      <div class="all-term-payment">
        {#each allTermPay as termPay}
          <UpdatePay stdPay={termPay} currentSession={currentSession} on:delPay={delTermPay} />
        {:else}
          <h4>No payment recorded yet</h4>
        {/each}
      </div>

      <!-- update payment button -->
      <Button {...btnProps} on:click={updateSessionPayment}>update payment</Button>
    </section>
  </Card>
</article>

<style>
  .preview-container {
    position: relative;
    width: clamp(350px, 100%, 400px);
  }
  .title {
    margin: 0;
  }
  .preview-header {
    padding: 0.7em;
  }
  .close-btn {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 18px;
    color: #9f7cab;
    cursor: pointer;
    font-weight: bold;
  }
  .img-and-name-cont {
    margin-top: 1em;
    display: flex;
    justify-content: center;
    gap: 0.5em;
  }
  .img-cont {
    width: 80px;
    height: 80px;
    background-color: var(--accent-info-lite);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img-cont i {
    font-size: 30px;
    color: var(--accent-info);
  }
  .name-and-id {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .name {
    text-transform: capitalize;
    letter-spacing: 0.5px;
    font-family: var(--font-nunito);
  }
  .id-and-class {
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 1em;
    color: #b0bfdd;
  }
  .id-and-class span:nth-child(2) {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    transform: translateY(-2px);
  }
  .id-and-class span:nth-child(2) sup {
    font-weight: bold;
  }
  h5 {
    font-size: bold;
  }
  .preview-body {
    padding: 0 1em 0.5em;
  }
  .preview-body h5 {
    font-weight: bold;
    margin-bottom: 0.6em;
    text-transform: uppercase;
    color: #818591;
  }
  .info-sec {
    display: flex;
    justify-content: space-between;
    border-top: 2px solid var(--clr-off-white);
    border-bottom: 2px solid var(--clr-off-white);
    margin-bottom: 1em;
    padding: 0.8em 0;
  }
  .info-sec div:nth-child(1) {
    border-right: 2px solid var(--clr-off-white);
    padding-right: 16px;
  }
  .info-sec div:nth-child(2) {
    border-right: 2px solid var(--clr-off-white);
    padding-right: 24px;
  }
  .info {
    display: grid;
    gap: 0.3em;
  }
  .info span:nth-child(1) {
    font-size: 13px;
    text-transform: uppercase;
    color: #b1b4cf;
  }
  .info span:nth-child(2) {
    font-size: 14px;
    text-transform: capitalize;
    letter-spacing: 0.4px;
  }
  .pay-session-alys-sec {
    background-color: var(--clr-off-white);
    border-radius: 8px;
    padding: 0.5em;
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
  }
  .paid {
    color: var(--accent-success);
    font-weight: bold !important;
  }
  .unpaid {
    color: var(--accent-danger);
    font-weight: bold !important;
  }
  .uptd-sec {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    gap: 1em;
    align-items: center;
    margin-bottom: 0.5em;
  }
  .uptd-sec .btn-add {
    display: flex;
    align-items: center;
    padding: 0.5em 0;
  }
  .input-field {
    padding: 0;
  }
  .input-field label {
    margin-bottom: 0.3em;
  }
  .input-field select {
    padding: 10px 10px;
  }
  .btn-add {
    border: none !important;
    outline: none !important;
    appearance: none !important;
    cursor: pointer;
    font-size: 18px !important;
    border-radius: 4px !important;
    padding: 10px 22px !important;
    transform: translateY(9px);
    background-color: var(--accent-info) !important;
    color: var(--clr-white) !important;
  }
  .btn-add:active {
    animation: clickBtn 500ms ease alternate;
  }
  .all-term-payment {
    padding: 0 0.5em;
    margin-bottom: 1em;
  }
</style>