<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'

  export let stdPay = {}
  export let currentSession = '2022/2023'

  let dispatch = createEventDispatcher()

  // help modify payment status by deleting
  function delPay(evt) {
    // console.log(evt.target.dataset.del)
    let delTerm = evt.target.dataset.del
    // remove the property(term payment i.e: first, second, or third) added or previously added
    delete stdPay[`${delTerm}`]
    // remove term payment from primary data-source 
    dispatch('delPay', delTerm)
  }
</script>


<div class="term-info-sec" fade>
  <div class="term-info">
    <div>
      <span>session</span> <span>{currentSession}</span>
    </div>
    <div>
      <span>{stdPay.term} term</span>
      <span class:paid={stdPay.paid} class:unpaid={!stdPay.paid}>
        {stdPay.paid === true ? 'paid' : 'unpaid'}
      </span>
    </div>
  </div>
  <!-- delete btn -->
  <div class="del-btn">
    <i class="ti ti-trash" on:click={delPay} on:keypress={delPay} data-del="{stdPay.term}"></i>
  </div>
</div>

<style>
  .term-info-sec {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0.5em 0.5em;
   border-radius: 8px;
   background-color: var(--clr-off-white);
 }
 .term-info-sec:not(:last-of-type) {
   margin-bottom: 0.5em; 
 }
 .term-info {
   display: flex;
   gap: 2em;
 }
 .term-info div:nth-child(1), 
 .term-info div:nth-child(2) {
   display: grid;
 }
 .term-info div:nth-child(1) span:nth-child(1), 
 .term-info div:nth-child(2) span:nth-child(1) {
   font-size: 11px;
   text-transform: uppercase;
   letter-spacing: 0.4px;
 }
 .term-info div:nth-child(1) span:nth-child(2), 
 .term-info div:nth-child(2) span:nth-child(2) {
   font-size: 14px;
 }
 .term-info div:nth-child(2) span:nth-child(2) {
   text-transform: capitalize;
 }
 .del-btn {
   font-size: 20px;
   color: var(--accent-danger);
   font-weight: bold;
   border-radius: 50%;
   cursor: pointer;
 }
 .paid {
   color: var(--accent-success) !important;
   font-weight: bold !important;
 }
 .unpaid {
   color: var(--accent-danger) !important;
   font-weight: bold !important;
 }
</style>