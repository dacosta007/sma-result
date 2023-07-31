<script>
  import { gradeScore } from '$lib/components/utils/gradeScore'

  export let examCumm = {}
  export let reptSession = '2022/2023'

  // filter out all recorded terms & it's values
  let allTerms = Object.keys(examCumm)
  let termsPercentages = (Object.values(examCumm)).map(ele => ele.percentage)

  // data format for rendering
  let totalTerms = allTerms.map((ele, indx) => {
    let resObj = {}
    resObj.term = ele
    resObj.percentage = termsPercentages[indx]
    return resObj
  })
</script>

<section class="term-report-sec">
  <header>
    <h5 class="title">terms report for {reptSession} session</h5>
  </header>

  <div class="terms-perfs">
    {#each totalTerms as term}
      <div class="term">
        <div>{term.term} term</div>
        <div style="color: {gradeScore(term.percentage).gradeClr};">
          <span>{term.percentage}</span><small>%</small>
        </div>
      </div>
    {:else}
      <p class="no-terms">No records for term yet!</p>
    {/each}
  </div>
  <small class="small-info">
    <i class="lni lni-information"></i> <span><b>Note:</b> Each terms performances scores are over 100%</span>
  </small>
</section>

<style>
  .term-report-sec {
    padding: 0 1.2em;
    margin-top: 1.3em;
  }
  .term-report-sec header {
    color: var(--clr-grey);
    font-size: 1em;
  }
  .terms-perfs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--clr-grey);
    border-radius: 2px;
  }
  .term {
    padding: 0.3em 0em;
    border-right: 1px solid var(--clr-grey);
  }
  .term > div:nth-child(1) {
    border-bottom: 1px solid var(--clr-grey);
    padding: 0 0.6em;
    text-transform: capitalize;
    font-variant: all-small-caps;
    font-size: 18px;
  }
  .term > div:nth-child(2) {
    padding: 0 0.6em;
    font-size: 18px;
  }
  .small-info {
    display: flex;
    align-items: center;
    gap: 0.3em;
    margin-top: 0.1em;
  }
  .small-info i {
    font-size: 10px;
    border-radius: 50%;
    background-color: rgb(109 128 254 / 18%);
    color: var(--accent-info);
    padding: 0.3em;
  }
  .small-info span {
    font-size: 12px;
  }
</style>