<script>
  import { createEventDispatcher } from 'svelte'
  import { BranchInfoStore } from '$lib/stores/BranchInfoStore'
  import StudentPreview from './StudentPreview.svelte'

  export let showPreview = false
  export let stdInfo = {}
  export let payDetail = {}
  
  let dispatch = createEventDispatcher()
  let currentSession = $BranchInfoStore.academicYear.session
  let currentTerm = $BranchInfoStore.academicYear.currentTerm

  function showPrevWind(evt) {
    showPreview = evt.detail
    // console.log(`show preview window: ${showPreview}`)
    dispatch('showPrevWind', showPreview)
  }

  /* update student payment info for the current term within the session */
  function updateTermPay(evt) {
    let termPayment = evt.detail
    console.log(termPayment)
  }

  // delete payment for the term
  function delPay(evt) {
    let delTerm = evt.detail
    // delete term payment from variable holding the data
    delete payDetail[`${delTerm}`]

    payDetail = payDetail
    
    dispatch('delTerm', delTerm)
  }

  // add payment to general data-source
  function addPayment(evt) {
    let payData = evt.detail
    payDetail = payData
  }

  // update overall term payment in database
  function updatePay(evt) {
    dispatch('uptdPay', evt.detail)
  }
</script>

<aside class="preview-wind" class:show-preview={showPreview}>
  <section class="preview-content">
    <StudentPreview 
      std={stdInfo} 
      stdPayDetails={payDetail} 
      on:showPrevWin={showPrevWind} 
      on:delTermPay={delPay} 
      on:addPayment={addPayment} 
      on:uptdPay={updatePay} 
      {currentSession} 
      {currentTerm}
    />
  </section>
</aside>

<style>
  .preview-wind {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100svh;
    overflow: auto;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: rgb(0 0 0 / 30%);
    z-index: 15;
  }
  .preview-content {
    width: clamp(350px, 100%, 400px);
  }
  .show-preview {
    display: flex;
  }
</style>