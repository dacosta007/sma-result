<script>
  import { createEventDispatcher } from 'svelte'
  import { BranchInfoStore } from '$lib/stores/BranchInfoStore'
  import { PaymentStore } from '$lib/stores/PaymentStore'

  import Student from "./Student.svelte"
  import PreviewWind from "./PreviewWind.svelte"
  
  let dispatch = createEventDispatcher()

  export let allStudts = []
  export let allPayments = []

  let LocalStore = allStudts
  let studts = allStudts
  let listStudt = studts

  let currentSession = $BranchInfoStore.academicYear.session
  
  let payments = allPayments
  let arrOfStdtsId = allStudts.map(ele => ele.studtId)
  let currentAddedPay = payments.filter(ele => arrOfStdtsId.indexOf(ele?.meta?.studtId) != -1) ?? []
  PaymentStore.set(currentAddedPay)
  
  function filterList(event) {
    if (event.target.value === '') { listStudt = studts; return }

    let category = (event.target.value).slice(0, 3)
    let level = (event.target.value).match(/\d/g).join('')

    if (  category === '' & level === '') {
      listStudt = LocalStore
      return
    }

    listStudt = LocalStore.filter(items => items.class.category === category && items.class.level === level)
  }

  let showPreview = false
  let stdDetail = {}
  let payDetail = {}

  // help show the preview payment modal window
  function showStdPay(evt) {
    let stdId = evt.detail
    
    /* get student from records of payment(if already paid), else from student DB list */
    if ($PaymentStore.length === 0) {
      stdDetail = allStudts.find(ele => ele.studtId === stdId)
      payDetail = {}
      showPreview = true
      return
    }
    if ($PaymentStore.length > 0) {
      // if student not found in payment list
      let stdIndx = $PaymentStore.findIndex(ele => ele?.meta?.studtId === stdId)
      if (stdIndx === -1) {
        stdDetail = allStudts.find(ele => ele.studtId === stdId)
        payDetail = {}
        // console.log('Student not found in payment list')
      } else {
        stdDetail = $PaymentStore.find(ele => ele.meta.studtId === stdId)
        payDetail = ($PaymentStore.find(ele => ele.meta.studtId === stdId)).payment
        // console.log('Found in payment list', stdDetail)
      }

      // show preview window
      showPreview = true
      return
    }
  }

  // update payment data in database
  async function updatePay(evt) {
    let pay = evt.detail

    let chkPay = $PaymentStore.findIndex(ele => ele.meta.studtId === pay.stdId)
    
    /* Payment already found */
    if (chkPay > -1) {
      // get the payment obj data & update neccessary properties
      let stdPaytData = $PaymentStore.find(ele => ele.meta.studtId === pay.stdId)
      stdPaytData.payment = pay.payUptData
      stdPaytData.meta.updatedAt = (new Date()).toISOString()
      
      /* save date into DB */
      const uptData = await fetch('/api/payment', {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stdPaytData)
      })

      let uptdRes = await uptData.json()

      // if there are any errors when saving into DB
      if (uptdRes.error) {
        alert(`🚨 ${uptdRes.message}`)
        return
      }

      // update the payment store variable
      PaymentStore.update(items => {
        let indx = items.findIndex(ele => ele.meta.studtId === stdPaytData.meta.studtId)
        items[indx].payment = stdPaytData.payment
        return [...items]
      })

      // show success message
      alert(uptdRes.message)
      
      // close preview modal
      showPreview = false
      return
    }
    
    /* create new payment into db */
    let stdMetaInfo = LocalStore.find(ele => ele.studtId === pay.stdId)
    // console.log(stdMetaInfo)
    
    let saveData = {
      meta: {
        name: {
          first: stdMetaInfo.name.first,
          last: stdMetaInfo.name.last
        },
        studtId: stdMetaInfo.studtId,
        class: stdMetaInfo.class,
        session: currentSession,
        createdAt: (new Date()).toISOString()
      },
      payment: pay.payUptData,
      branchCode: '002'
    }
    
    const sendData = await fetch('/api/payment', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saveData)
    })

    let res = await sendData.json()

    // if there are any errors when saving into DB
    if (res.error) {
      alert(`🚨 ${res.message}`)
      return
    }

    // update the payment store variable
    PaymentStore.update(items => {
      let indx = items.findIndex(ele => ele.meta.studtId === saveData.meta.studtId)
      if (indx <= -1) {
        items = [saveData, ...items]
        return items
      }
      // (just fail save can be deleted on next update)
      saveData.meta.updatedAt = (new Date()).toISOString()
      items[indx].payment = saveData.payment
      console.log(items)
      return [...items]
    })

    // increment payment count stat
    dispatch('incPayCount', $PaymentStore.length)

    // show success message
    alert(res.message)

    // close preview modal
    showPreview = false
    return
  }
</script>

<article>
  <header class="pg-header">
    <div class="input-field">
      <select placeholder=""  name="filterStudt" on:change={filterList}>
        <option value="">Filter Students By Classes</option>
        <option value="jss1">JSS 1</option>
        <option value="jss2">JSS 2</option>
        <option value="jss3">JSS 3</option>
        <option value="sss1">SSS 1</option>
        <option value="sss2">SSS 2</option>
        <option value="sss3">SSS 3</option>
      </select>
    </div>
  </header>

  <section class="studts-container">
    {#each listStudt as std (std.studtId)}
      <Student {std} on:showStd={showStdPay} />
    {:else}
      <h2>No Student found for the selected class</h2>
    {/each}
    <div class="center-text" style="margin-top: 2.5em; text-transform: capitalize;">
      <a href="/">go back home</a>
    </div>
  </section>
</article>

<PreviewWind 
  on:showPrevWind={(evt) => showPreview = evt.detail} 
  on:uptdPay={updatePay} 
  {showPreview} 
  stdInfo={stdDetail} 
  {payDetail} 
/>

<style>
  .pg-header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pg-header .input-field {
    min-width: 424px;
  }
</style>
