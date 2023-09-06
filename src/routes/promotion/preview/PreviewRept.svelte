<script>
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import ResultHeader from '../../[docId]/ResultHeader.svelte'
  import ExamResultBody from '$lib/components/ExamResultBody.svelte'
  import SessionStat from './SessionStat.svelte'

  export let stdRept = {}
  export let stdDetail = {}
  export let term = 'third'

  let dispatch = createEventDispatcher()

  /* help close report sheet */
  function closeRept() {
    dispatch('closeReptSheet', 'close')
  }
</script>

<article class="slip-container">
  <!-- close btn -->
  <i class="ti ti-close close-btn" on:click={closeRept} on:keypress={closeRept}></i>

  <!-- wouldn't show for students in 'sss 3' class -->
  <div class="slip" transition:fade>
    <ResultHeader reportTitle={"Examination Report"} />

    <ExamResultBody report={stdRept} {stdDetail} {term} />
  </div>
  <!-- show only for third tern within the session -->
  {#if term === 'third'}
    <div class="slip" transition:fade>
      <ResultHeader reportTitle={"Session Stats Report"} />

      <SessionStat stdRept={stdRept} {stdDetail} />
    </div>
  {/if}
</article>


<style>
  .slip-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 7;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3em;
    padding-top: 2em;
    padding-bottom: 2em;
    width: 100%;
    background-color: var(--clr-off-white);
  }
  .close-btn {
    position: absolute;
    right: 1em;
    padding: 0.3em;
    font-size: 15px;
    border-radius: 50%;
    color: var(--clr-white);
    background-color: rgba(128, 128, 128, 0.219);
    cursor: pointer;
  }
  .close-btn:active {
    animation: clickBtn 0.5s ease;
  }
  .slip {
    background-color: var(--clr-white);
    color: var(--clr-txt);
    border-radius: 1px;
    width: 760px;
    padding: 2em 3em;
  }

  @media print {
    .slip {
      margin: 0;
      padding: 0;
    }
  }
</style>