<script>
  import { BranchInfoStore } from "$lib/stores/BranchInfoStore"
  import { ResultStore } from "$lib/stores/ResultStore"

  export let report
  export let docId
  
  // console.log(report)
  // console.log($ResultStore)
  
  report = report.find(ele => ele.meta.studtId === docId)

  let { meta, midTerm, cummulative } = report
  

  let term = 'first'

  let results = midTerm.report[term]
  let cummInfo = cummulative.midTerm[term]
  let { obtainable, obtained, totalSubj, percentage } = cummInfo

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
      <span class="info">{meta.studtId}</span>
    </div>
    <!-- class -->
    <div class="std-info">
      <span class="info-title">class</span>
      <span class="info"><span>{meta.class.category} {meta.class.level}</span>
      <sup style="text-transform: uppercase;">{meta.class.subLevel}</sup>
    </span>
    </div>
    <!-- session -->
    <div class="std-info">
      <span class="info-title">session</span>
      <span class="info">{meta.session}</span>
    </div>
    <!-- term -->
    <div class="std-info">
      <span class="info-title">term</span>
      <span class="info">{term}</span>
    </div>
    <!-- date -->
    <div class="std-info">
      <span class="info-title">data</span>
      <span class="info">{meta.createdAt}</span>
    </div>
  </div>
</section>

<section class="slip-body">
  <!-- result set shows here -->
  <div class="result-sec">
    <div class="reports">
      <header class="rept-analysis">
        <div>subjects</div>
        <div>obtainable</div>
        <div><span>1</span><sup>st</sup> <span>CA</span></div>
        <div><span>2</span><sup>nd</sup> <span>CA</span></div>
        <div>total</div>
        <div>grade</div>
      </header>
      {#each results as result}
        <div class="rept-dt">
          <!-- subj -->
          <div>{result.subj}</div>
          <!-- obtainable -->
          <div>{result.obtainable}</div>
          <!-- 1st CA -->
          <div>{result.firstCA}</div>
          <!-- 2nd CA -->
          <div>{result.secondCA}</div>
          <!-- total -->
          <div>{result.totalMark}</div>
          <!-- remarks(grade) -->
          <div style="color: {result.gradeClr};">{result.grade}</div>
        </div>
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
      <i class="comment"></i>
    </div>
    <div class="comments">
      <h5>principal's remarks</h5>
      <i class="comment"></i>
    </div>
  </article>

  <!-- slip footer -->
  <footer class="notice-container">
    <div class="notice">
      <!-- result QRcode -->
      <div class="result-qrcode">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=1100x110&amp;data={meta.studtId} " alt="result_qrcode" width="110" height="auto">
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
    padding: 1em 0.5em;
  }
  .infos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5em;
  }
  .img-sec {
    background-color: var(--clr-off-white);
    height: 130px;
    border: 2px solid var(--clr-grey);
    border-radius: 4px;
  }
  .std-info {
    line-height: 1;
    margin-bottom: 1em;
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
  }
  .result-sec {
    width: 100%;
    margin-top: 1em;
    border: 1px solid var(--clr-off-white);
  }
  .rept-analysis {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
    font-family: var(--font-quicksand);
    font-variant: all-small-caps;
    font-size: 17px;
    font-weight: bold;
    gap: 1em;
    padding: 0.7em 0.5em;
    background-color: var(--clr-sec);
    color: var(--clr-white);
  }
  .rept-dt {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1em;
    padding: 0.5em;
  }
  .cumm-sec {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.4em 0.5em;
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
  .comment {
    border-bottom: 2px dotted var(--clr-grey);
    padding-top: 0.5em;
    font-size: 13px;
    display: block;
  }
  .comment::first-letter {
    text-transform: capitalize;
  }
  .notice-container {
    display: grid;
    place-items: center;
    margin-top: -1.2em;
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
    height: 100px;
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
    /* .slip-watermart {
      font-size: 9vw;
    } */
    .btn {
      display: none;
    }
  }
</style>