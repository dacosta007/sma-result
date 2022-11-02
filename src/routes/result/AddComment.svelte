<script>
  import { createEventDispatcher } from "svelte";
  import { gradeScore } from "$lib/components/utils/gradeScore";
  import { comments } from "$lib/components/utils/preDefinedComments"
<<<<<<< HEAD
=======

>>>>>>> auth
  import Button from "$lib/components/Button.svelte"

  export let addReptComment = false
  export let reportData = []
  export let obtainable
  export let pComment = ''
  export let tComment = ''

  let dispatch = createEventDispatcher()

  let btnProps = {
    btnType: 'button',
    block: true,
    sec: true,
    disableBtn: true
  }

  function stats() {
    let obtained = reportData.reduce((acc, ele) => ele.totalMark + acc, 0)
    let totalSubj = reportData.length
    let obtainableMark = obtainable * totalSubj
    let percentage = parseFloat(((obtained / obtainableMark) * 100).toFixed(2))
    let { grade, gradeClr } = gradeScore(percentage)

    return { obtained, obtainableMark, percentage, totalSubj, grade, gradeClr }
  }

  function checkCommentNotEmpty(event) {
    let comments = event.target.value
    if (comments != '') {
      btnProps.disableBtn = false
      console.log(`${event.target.name}: is empty`)
      return
    }
    btnProps.disableBtn = true
  }

  function addComments() {
    if (pComment === '' && tComment === '') {
      alert('🔔 Comments must not be empty. Please add report comments')
      return
    }

    // dispatch info to parent component
    dispatch('reportComments', { pComment, tComment })
    // closes the comment section area
    addReptComment = false
  }

  function closeReptComment() {
    dispatch('closeCommentSec', false)
  }
</script>

<section class="add-rept-comment-sec" class:show-comment-sec={addReptComment}>
  <header class="add-rept-comment-header">
    <!-- closes add comment section/component -->
    <i class="ti ti-close close-comment-sec" on:click={closeReptComment} on:keypress={() => addReptComment = false}></i>
    
    <div class="std-stats-info">
      <!-- quick stats sec -->
      <div class="stats-sec">
        <!-- obtainable, obtained, percentage, grade -->
        <div class="stat-info">
          <span>obtainable</span> <span>{stats().obtainableMark}</span>
        </div> 
        <div class="stat-info">
          <span>obtained</span> <span>{stats().obtained}</span>
        </div> 
        <div class="stat-info">
          <span>percentage</span> <span>{stats().percentage}</span>
        </div> 
        <div class="stat-info">
          <span>grade</span> <span style="color: {stats().gradeClr};">{stats().grade}</span>
        </div>
      </div>
    </div>
  </header>

  <!-- show's student's name and some stats(obtainable, obtained, grade, percentage) -->
  <section class="rept-comment-container">
    <div class="inpt-sec">
      <div class="input-field">
        <label for="tComment">teacher's comment</label>
        <select name="tComment" id="tComment" on:change={checkCommentNotEmpty} bind:value={tComment}>
          <option value="">Teacher's Remarks</option>
          {#each comments.teacher as commt}
            <option>{commt}</option>
          {/each}
        </select>
<<<<<<< HEAD
        <!-- <textarea  name="tComment" id="tComment" cols="6" rows="5" height="59" placeholder="Teacher's Remarks"></textarea> -->
=======
        <!-- <textarea on:input={checkCommentNotEmpty} bind:value={tComment} name="tComment" id="tComment" cols="6" rows="5" height="59" placeholder="Teacher's Remarks"></textarea> -->
>>>>>>> auth
      </div>
      <div class="input-field">
        <label for="pComment">principal comment</label>
        <select name="pComment" id="pComment" on:change={checkCommentNotEmpty} bind:value={pComment}>
          <option value="">Principal's Remarks</option>
          {#each comments.principal as commt}
            <option>{commt}</option>
          {/each}
        </select>
<<<<<<< HEAD
        <!-- <textarea  name="pComment" id="pComment" cols="6" rows="5" height="59" placeholder="Principal's Remarks"></textarea> -->
=======
        <!-- <textarea on:input={checkCommentNotEmpty} bind:value={pComment} name="pComment" id="pComment" cols="6" rows="5" height="59" placeholder="Principal's Remarks"></textarea> -->
>>>>>>> auth
      </div>
      <div class="btn-sec">
        <Button {...btnProps} on:click={addComments}>
          add comments
        </Button>
      </div>
    </div>
  </section>
</section>

<style>
  .add-rept-comment-sec {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: var(--clr-white);
  }
  .add-rept-comment-header {
    position: relative;
    padding: 0.5em;
  }
  .close-comment-sec {
    position: absolute;
    right: 12px;
    top: 1px;
    border-radius: 50%;
    padding: 6px;
    font-weight: bold;
    font-size: 18px;
  }
  .close-comment-sec:hover {
    background-color: var(--clr-off-white);
    transition: background-color 0.5s ease;
    cursor: pointer;
  }
  .stats-sec {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.3em;
    padding-top: 1em;
  }
  .stats-sec span:nth-child(1) {
    text-transform: capitalize;
    display: inline-block;
    margin-right: 4px;
  }
  .stats-sec span:nth-child(2) {
    font-weight: bold;
  }
  .rept-comment-container {
    padding: 0.5em;
  }
  /* .inpt-sec textarea {
    resize: none;
    height: 59px;
  } */
  .btn-sec {
    padding: 0 7em;
  }
</style>