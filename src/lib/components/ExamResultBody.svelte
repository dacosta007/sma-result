<script>
  import { BranchInfoStore } from '$lib/stores/BranchInfoStore'

  export let report = {}
  export let term = 'third'
  export let stdDetail = {}
  
  let { meta, exam, cummulative } = report

  let currentTerm = term ?? $BranchInfoStore?.academicYear?.currentTerm

  let results = exam?.report[currentTerm]
  let tComment = exam?.comments[currentTerm]?.teacher
  let pComment = exam?.comments[currentTerm]?.principal
  let cummInfo = cummulative?.exam[currentTerm]
  let { obtainable, obtained, totalSubj, percentage } = cummInfo

  // student promotion/graduation status
  let promotion = stdDetail?.promotion ?? []
  let graduation = stdDetail?.graduation ?? {}
  let promotionStatus = promotion.find(ele => ele?.session === meta?.session)
  let graduationStatus = graduation?.graduated

  // student's class
  let studtCls = `${stdDetail?.class?.category} ${stdDetail?.class?.level}`

  function printSlip() {
    console.log('printing slip')
    window.print()
  }
</script>

<!-- basic student info -->
<!-- student's name -->
<div class="center-text">
  <h3 class="std-name">{meta.name.first} {meta.name.last}</h3>
</div>

<section class="rept-info">
  <div class="img-sec">
  </div>
  <div class="infos">
    <!-- ID -->
    <div class="std-info">
      <span class="info-title">student ID</span>
      <span class="info">{meta?.studtId}</span>
    </div>
    <!-- class -->
    <div class="std-info">
      <span class="info-title">class</span>
      <span class="info"><span>{meta?.class?.category} {meta?.class?.level}</span>
      <sup style="text-transform: uppercase;">{meta?.class?.subLevel}</sup>
      </span>
    </div>
    <!-- department -->
    <div class="std-info">
      <span class="info-title">department</span>
      <span class="info">{meta?.class?.department}</span>
    </div>
    <!-- session -->
    <div class="std-info">
      <span class="info-title">session</span>
      <span class="info">{meta?.session}</span>
    </div>
    <!-- term -->
    <div class="std-info">
      <span class="info-title">term</span>
      <span class="info">{currentTerm}</span>
    </div>
    <!-- date -->
    <div class="std-info">
      <span class="info-title">date</span>
      <span class="info">{meta?.updatedAt}</span>
    </div>
  </div>
</section>

<section class="slip-body">
  <!-- result set shows here -->
  <div class="result-sec">
    <!-- watermark for promoted -->
    {#if currentTerm === 'third'}
      <div class="watermark-sec">
        {#if studtCls !== 'sss 3' && promotionStatus != undefined}
          <img src="/imgs/promoted_stamp_circle_purple.png" alt="promoted_watermark_stamp" width="200" height="auto">
        {/if}
        {#if studtCls === 'sss 3' && graduationStatus != undefined}
          <img src="/imgs/graduated_stamp_crown.png" alt="graduated_watermark_stamp" width="200" height="auto">
        {/if}
      </div>
    {/if}
    <div class="reports">
      <header class="rept-analysis">
        <div>subjects</div>
        <div>obtainable</div>
        <div><span>CA</span><span>(30)</span></div>
        <div><span>Exam</span><span>(70)</span></div>
        <div>total</div>
        <div>grade</div>
      </header>
      {#each results as result}
        <div class="rept-dt">
          <!-- subj -->
          <div>{result?.subj}</div>
          <!-- obtainable -->
          <div>{result?.obtainable}</div>
          <!-- CA score -->
          <div>{result?.CA}</div>
          <!-- exam score -->
          <div>{result?.exam}</div>
          <!-- total marks -->
          <div>{result?.totalMark}</div>
          <!-- remarks(grade) -->
          <div style="color: {result?.gradeClr};">{result?.grade}</div>
        </div>
      {:else}
        <p>No report to show for this term!</p>
      {/each}
    </div>
  </div>

  <!-- cummulative section -->
  <article class="cumm-sec">
    <div class="cumm">
      <span>obtainable</span> <span>{obtainable}</span>
    </div>
    <div class="cumm">
      <span>obtained</span> <span>{obtained}</span>
    </div>
    <div class="cumm">
      <span>total subject</span><span>{totalSubj}</span>
    </div>
    <div class="cumm">
      <span>percentage</span> <span>{percentage}%</span>
    </div>
  </article>

  <article class="comments-sec">
    <div class="comments">
      <h5>teacher's remarks:</h5>
      <i class="comment">{tComment}</i>
    </div>
    <div class="comments">
      <h5>principal's remarks</h5>
      <i class="comment">{pComment}</i>
    </div>
  </article>

   <!-- slip footer -->
   <footer class="notice-container">
    <div class="notice">
      <!-- result QRcode -->
      <div class="result-qrcode">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=1100x110&amp;data=htttps://result.afssib.com/{meta?.studtId} " alt="result_qrcode" width="110" height="auto">
      </div>
      <!-- result notice -->
      <div>
        <h5 class="title">note:</h5>
        <p>
          you can print or save this report. Although it can be reprinted by scanning the 
          <b>QRcode</b> of this report.
        </p>
      </div>
    </div>
    <!-- print button -->
    <!-- <button type="button" on:click={printSlip} style="margin-top: 1em;" class="btn" data-print-receipt="">print slip</button> -->
  </footer>
</section>


<style>
  .slip-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    position: relative;
  }
  .std-name {
    font-family: var(--font-quicksand);
    font-weight: 400;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    margin-bottom: 0.2em;
  }
  .rept-info {
    border: 1px solid;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1em;
    padding: 0.5em .5em;
  }
  .infos {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: .3em;
  }
  .img-sec {
    background-color: var(--clr-off-white);
    height: 100px;
    border: 2px solid var(--clr-grey);
    border-radius: 4px;
  }
  .std-info {
    line-height: 1;
    margin-bottom: 0em;
    display: grid;
  }
  .info-title {
    font-variant: small-caps;
    font-size: 14px;
    font-family: var(--font-quicksand);
    color: var(--clr-grey);
  }
  .info {
    text-transform: capitalize;
    font-size: 14px;
  }
  .result-sec {
    width: 100%;
    margin-top: 1em;
    border: 1px solid var(--clr-off-white);
    position: relative;
    isolation: isolate;
  }
  .watermark-sec {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .watermark-sec img {
    width: 300px;
    max-width: 100%;
    height: auto;
    object-fit: contain;
    object-position: center;
    filter: opacity(0.2);
  }
  .rept-analysis {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
    font-family: var(--font-quicksand);
    font-variant: all-small-caps;
    font-size: 17px;
    font-weight: 700;
    gap: 1em;
    background-color: var(--clr-sec);
    color: var(--clr-white);
    border-bottom: 1px solid var(--clr-off-white);
  }
  .rept-analysis div:not(:last-child) {
    border-right: 1px solid var(--clr-off-white);
    padding: 0.4em 0.5em;
  }
  .rept-dt {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1em;
    padding: 0.1em .5em;
    align-items: center;
  }
  .rept-dt:not(:last-child) {
    border-bottom: 1px solid var(--clr-off-white);
  }
  .rept-dt div:not(:last-child) {
    border-right: 1px solid var(--clr-off-white);
  }
  .rept-dt div:nth-child(1) {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .rept-dt div:not(:nth-child(1)) {
    font-size: 12px;
  }
  .cumm-sec {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.3em 0.5em;
    border: 2px dashed var(--clr-grey);
    border-radius: 2px;
    gap: 0.5em;
    text-transform: capitalize;
    letter-spacing: 0.5px;
  }
  .cumm span:nth-child(2) {
    font-weight: bold;
    font-family: var(--font-quicksand);
    display: inline-block;
    margin-left: 5px;
    font-size: 15px;
  }
  .comments-sec {
    width: 100%;
    border: 2px solid var(--accent-info-lite);
    padding: 0.5em 0.4em;
    border-radius: 2px;
    display: grid;
    row-gap: 1em;
  }
  .comments-sec h5 {
    font-weight: 600;
    text-transform: capitalize;
    font-variant: all-small-caps;
    font-size: 15px;
    letter-spacing: 1px;
  }
  .comments {
    display: flex;
    gap: 0.5em;
    align-items: center;
    flex-wrap: wrap;
  }
  .comment {
    border-bottom: 2px dotted var(--clr-grey);
    font-size: 12px;
    display: block;
    width: 77%;
  }
  .comment::first-letter {
    text-transform: capitalize;
  }
  .notice-container {
    display: grid;
    place-items: center;
    margin-top: 0em;
  }
  .notice {
    width: 100%;
    border: 2px dashed var(--clr-off-white);
    padding: 0.5em;
    display: flex;
    gap: 1em;
  }
  .result-qrcode {
    width: 110px;
    position: relative;
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
  /* .btn {
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
  } */

  @media print {
    /* .slip-watermart {
      font-size: 9vw;
    } */
    /* .btn {
      display: none;
    } */
  }
</style>