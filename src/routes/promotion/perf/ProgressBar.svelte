<script>
  import { gradeScore } from "$lib/components/utils/gradeScore";

  export let overallPercentage = 10

  // give the accent colour of the circular progress bar
  let progressBarAccentClr = gradeScore(overallPercentage).gradeClr

  // let inc = 0
  // function percentageCounter() {
  //   let counter = setInterval(function() {
  //     inc += 1
  //     if (inc === overallPercentage) {
  //       clearInterval(counter)
  //     }
  //     console.log(`Count: ${inc}`)
  //   }, 100)
  // }
  // percentageCounter()
</script>

<div class="progressbar-container" style="--clr-accent: {progressBarAccentClr}; --percent: {overallPercentage};">
  <svg>
    <circle cx="70" cy="70" r="70"></circle>
    <circle cx="70" cy="70" r="70"></circle>
  </svg>

  <div class="overall-percentage">
    <h2><span>{overallPercentage}</span><small>%</small></h2>
    <div>overall</div>
  </div>
</div>

<style>
  .progressbar-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  svg {
    position: relative;
    width: 100%;
    height: 100%;
    /* help view circular progressbar starting from the top(not middle, by default) */
    transform: rotate(270deg);
  }
  svg circle {
    width: 100%;
    height: 100%;
    fill: transparent;
    stroke-width: 10;
    stroke-linecap: round;
    stroke: var(--clr-off-white);
    transform: translate(26px, 12px);
  }
  svg circle:nth-child(2) {
    stroke: var(--clr-accent);
    stroke-dasharray: 440;
    stroke-dashoffset: calc(440 - (440 * var(--percent)) / 100);
    animation: progressBarAnim 2s cubic-bezier(0.45, 0.01, 0.03, 0.98);
  }

  @keyframes progressBarAnim {
    from {
      /* stroke-dasharray: 0; */
      stroke-dashoffset: 440;
    }
    to {
      /* stroke-dasharray: 440; */
      stroke-dashoffset: calc(440 - (440 * var(--percent)) / 100);
    }
  }

  .overall-percentage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    padding-top: 1.5em;
  }
  .overall-percentage h2 {
    line-height: 0.8;
  }
  .overall-percentage h2 span {
    font-size: 1.7em;
  }
  .overall-percentage > div {
    text-transform: uppercase;
    font-size: 0.75em;
    letter-spacing: 0.6px;
  }

  /* @media (min-width: 30em) and (max-width: 50em) {
    
  } */
</style>