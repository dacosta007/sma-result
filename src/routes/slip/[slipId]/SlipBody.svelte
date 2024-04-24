<script>
  import { BranchInfoStore } from "$lib/stores/BranchInfoStore"

  export let std
  export let branchInfo
  export let watermark = 'original'

  let { name, gender, studtId, slipId, passport, class:stdCls } = std
  let { schoolingType, admissionYear, regDate } = std

  let { session, currentTerm } = branchInfo.academicYear

  function printSlip() {
    window.print()
  }
  function beforeSlipPrint() {
    console.log('document is about to be printed')
  }
  function afterSlipPrint() {
    console.log('document printed')
    alert('Pre-registration slip already printed!, go back home')
  }
</script>

<svelte:window on:beforeprint={beforeSlipPrint} on:afterprint={afterSlipPrint}></svelte:window>

<section class="slip-body">
  <div class="slip-watermart">{watermark}</div>

  <div class="info-container">
    <div class="info-segment">
      <!-- img & gender section -->
      <div class="img-sec">
        <div class="img">
          {#if passport }
            <img src={passport} alt="std_img" width="100" height="auto">
          {/if}
        </div>
        <div class="gender-sec">{gender}</div>
      </div>

      <div class="info-sec">
        <!-- student's name -->
        <div class="name-sec">
          <div class="info-data">
            <h5 class="info-title">first name</h5>
            <div class="info">{name.first}</div>
          </div>
          <div class="info-data">
            <h5 class="info-title">last name</h5>
            <div class="info">{name.last}</div>
          </div>
        </div>

        <!-- pre-reg ID & date -->
        <div class="pre-reg-date">
          <div class="info-data">
            <h5 class="info-title">pre-reg id</h5>
            <div class="info">{slipId}</div>
          </div>
          <div class="info-data">
            <h5 class="info-title">date</h5>
            <div class="info">{new Date(regDate).toLocaleDateString()}</div>
          </div>
        </div>
        <!-- class & department -->
        <div class="cls-dpt-sec">
          <div class="info-data">
            <h5 class="info-title">class</h5>
            <div class="info" style="text-transform: uppercase;"><span>{stdCls.category} {stdCls.level}</span><sup style="color: var(--accent-info);">{stdCls.subLevel}</sup></div>
          </div>
          <div class="info-data">
            <h5 class="info-title">department</h5>
            <div class="info">{stdCls.department}</div>
          </div>
        </div>
        <!-- schooling type admission year -->
        <div class="schType-admYr">
          <div class="info-data">
            <h5 class="info-title">schooling</h5>
            <div class="info">{schoolingType}</div>
          </div>
          <div class="info-data">
            <h5 class="info-title">admission</h5>
            <div class="info">{admissionYear ?? null}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-foot">
      <!-- stud ID -->
      <div class="info-data">
        <h5 class="info-title">student id</h5>
        <div class="info" style="font-weight: bold;">{studtId}</div>
      </div>
      <!-- slip ID -->
      <div class="info-data">
        <h5 class="info-title">slip code</h5>
        <div class="info">{slipId ?? null}</div>
      </div>
      <!-- session -->
      <div class="info-data">
        <h5 class="info-title">session</h5>
        <div class="info">{session}</div>
      </div>
      <!-- term -->
      <div class="info-data">
        <h5 class="info-title">term</h5>
        <div class="info">{currentTerm}</div>
      </div>
    </div>
  </div>

  <footer class="notice-container">
      <div class="notice">
        <h5 class="title">note:</h5>
        <p>
          you can print or save this receipt as prove of successful completion. it can be 
          reprinted in the school's student portal of you child or ward(currently in development). 
          The <b>student ID</b>, and <b>slip ID</b> will be required to make full successful 
          completion of your child or ward on the portal(when ready), Please keep safely.
        </p>
      </div>
      <!-- print button -->
      <button type="button" on:click={printSlip} style="margin-top: 1em;" class="btn" data-print-receipt="">print slip</button>
  </footer>
</section>



<style>
  .slip-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3em;
    position: relative;
  }
  .slip-watermart {
    position: absolute;
    font-size: 7vw;
    font-family: var(--font-quicksand);
    text-transform: uppercase;
    font-weight: bold;
    transform: rotate(-38deg) translate(90px, -81px);
    opacity: 0.1;
  }
  .info-container {
    width: 80%;
    border: 2px solid var(--clr-off-white);
    padding: 0 0.5em;
  }
  .info-segment {
    display: grid;
    grid-template-columns: auto 3fr;
    gap: 1em;
  }
  .img-sec {
    width: 140px;
    height: 140px;
    background-color: var(--clr-off-white);
    border-radius: 3px;
    position: relative;
    margin-top: 0.5em;
  }
  .img {
    background-color: var(--clr-off-white);
    width: 100%;
    height: 100%;
    margin-bottom: 0.3em;
    border-radius: 3px;
    border: 2px dashed var(--clr-off-white);
  }
  .img img {
    position: absolute;
    top: -4px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
  .gender-sec {
    text-transform: capitalize;
    text-align: center;
    font-size: 13px;
  }
  .name-sec {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }
  .info-data {
    line-height: 1.5;
    margin-bottom: 1em;
  }
  .info-title {
    font-variant: small-caps;
    font-size: 14px;
    font-family: var(--font-quicksand);
    color: var(--clr-grey);
  }
  .info {
    text-transform: capitalize;
  }
  .pre-reg-date {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 0.3em;
  }
  .cls-dpt-sec {
    display: flex;
    gap: 9em;
  }
  .cls-dpt-sec .info:nth-child(1) {
    text-transform: uppercase;
  }
  .schType-admYr {
    display: flex;
    gap: 8em;
  }
  .info-foot {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2em;
    justify-content: space-between;
  }
  .notice-container {
    display: grid;
    place-items: center;
    margin-top: -1.2em;
  }
  .notice {
    width: 80%;
    border: 2px dashed var(--clr-off-white);
    padding: 0.5em;
  }
  .notice p {
    font-size: 12px;
  }
  .notice p::first-letter {
    text-transform: capitalize;
  }
  .notice h5 {
    font-size: 1em;
    color: var(--accent-info);
  }
  .btn {
    padding: 14px 26px;
    font-size: 16px;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    border: 0;
    border-radius: 3px;
    background: var(--accent-info);
    color: var(--clr-off-white);
    cursor: pointer;
    user-select: none;
    opacity: 0.8;
  }

  .btn:hover {
    opacity: 1;
    transition: opacity 0.5s ease;
  }

  .btn:active {
    animation: clickBtn 0.5s ease;
  }

  @media print {
    .slip-watermart {
      font-size: 9vw;
    }
    .btn {
      display: none;
    }
  }
</style>