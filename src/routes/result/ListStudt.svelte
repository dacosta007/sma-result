<script>
  import { createEventDispatcher } from "svelte"
  import { LocalStore } from "$lib/stores/LocalStore"
  import { ResultStore } from "$lib/stores/ResultStore"
  import { BranchInfoStore } from "$lib/stores/BranchInfoStore"
  import { gradeScore } from "$lib/components/utils/gradeScore"

  import Modal from "$lib/components/Modal.svelte"
  import Button from "$lib/components/Button.svelte";
  import AddSubj from "./AddSubj.svelte";
  import AddComment from "./AddComment.svelte"

  export let allStudts
  export let resultPref
  export let subjects

  let dispatch = createEventDispatcher()

  let studts = allStudts
  $LocalStore = allStudts
  
  let listStudt = studts

  // sch branch details
  let { academicYear } = $BranchInfoStore

  let btnProps = {
    btnType: 'button',
    success: true
  }

  let commentBtn = {
    btnType: 'button',
    sec: true
  }
  let stdDetail = studts[1]
  let currentAddedSubj = []
  // holds principal and teacher's comments
  let tComment = '', pComment = ''
  let obtnd = currentAddedSubj.length > 0 ? currentAddedSubj.reduce((acc, ele) => ele.totalMark + acc, 0) : 0;
  let obtbl = resultPref.midTerm.obtainable

  let saveData = { 
    records: currentAddedSubj, 
    cummulative: {
      obtainable: parseInt(currentAddedSubj.length * resultPref.midTerm.obtainable),
      obtained: obtnd,
      percentage: parseFloat( ((obtnd / obtbl) * 100).toFixed(2) ),
      totalSubj: currentAddedSubj.length
    },
    comments: {
      teacher: tComment,
      principal: pComment
    }
  }

  $:addedSubjs = currentAddedSubj

  // handles adding subject 
  function addSubj(event) {
    let frm = event.target
    let totalMark = parseInt(frm.firstCA.value) + parseInt(frm.secondCA.value)
    let performanceAvg = ((totalMark / resultPref.midTerm.obtainable) * 100).toFixed(2)

    let frmData = {}
    frmData.obtainable = resultPref.midTerm.obtainable
    frmData.subj = frm.subj.value
    frmData.firstCA = parseInt(frm.firstCA.value)
    frmData.secondCA = parseInt(frm.secondCA.value)
    frmData.totalMark = totalMark
    frmData.performanceAvg = parseFloat(performanceAvg)
    frmData.grade = gradeScore(parseFloat(performanceAvg)).grade
    frmData.gradeClr = gradeScore(parseFloat(performanceAvg)).gradeClr

    if (currentAddedSubj.length <= 0) {
      currentAddedSubj = [frmData]
      return
    }

    // help remove duplicate
    if (currentAddedSubj.some(ele => ele.subj === frmData.subj)) {
      alert(`${frmData.subj} is all ready added`)
      // clear all form fields
      frm.reset()
      return
    }
    
    currentAddedSubj = [frmData, ...currentAddedSubj]
    // clear form fields
    frm.reset()
  }

  // help remove added subj
  function removeSubj(evt) {
    let subjRemove = evt.detail
    currentAddedSubj = currentAddedSubj.filter(s => s.subj != subjRemove)
  }

  // help close the modal window and clear compute records
  function closeComputeModal(evt) {
    // reset the compute form record & close modal window
    currentAddedSubj = []

    showModal = evt.detail
  }

  // add record into store
  function addRecord() {
    if (currentAddedSubj.length <= 0) {
      alert('No subject added yet!')
      return
    }

    // calculate added subjects cummulative scores
    let obtainable = parseInt(currentAddedSubj.length) * parseInt(resultPref.midTerm.obtainable)
    let obtained = currentAddedSubj.reduce((acc, ele) => ele.totalMark + acc, 0)
    let percentage = parseFloat(((obtained / obtainable) * 100).toFixed(2))
    let totalSubj = currentAddedSubj.length
    let cummulative = {obtainable, obtained, percentage, totalSubj}

    // date structure format for report data in DB
    let saveFrmt = {
      meta: {
        session: academicYear.session,
        name: stdDetail.name,
        studtId: stdDetail.studtId,
        class: stdDetail.class,
        // createdAt: new Date().toLocaleDateString()
      },
      midTerm: {
        report: {
          first: []
        },
        comments: {
          first: {
            teacher: '',
            principal: ''
          }
        }
      },
      exam: {},
      cummulative: {
        midTerm: {
          first: {obtainable: 0, obtained: 0, percentage: 0, totSubjs: 0}
        },
        exam: {}
      }
    }

    // check if record is previously found in the ResultStore(gotten from DB), then updated record
    let reptIndx = $ResultStore.findIndex(ele => ele.meta.studtId === stdDetail.studtId)
    if (reptIndx != -1 && $ResultStore != undefined) {
      // get previous student's report already in DB
      saveFrmt = $ResultStore.find(ele => ele.meta.studtId === stdDetail.studtId)

      // update neccessary report data properties
      saveFrmt.midTerm.report[academicYear.currentTerm] = currentAddedSubj
      saveFrmt.midTerm.comments[academicYear.currentTerm] = {}
      saveFrmt.midTerm.comments[academicYear.currentTerm].teacher = tComment ?? ""
      saveFrmt.midTerm.comments[academicYear.currentTerm].principal = pComment ?? ""
      saveFrmt.cummulative.midTerm[academicYear.currentTerm] = cummulative
      saveFrmt.currentTerm = academicYear.currentTerm // current term of report to be saved in DB
      // console.log(saveFrmt)

      fetch('/api/result', {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveFrmt)
      })
        .then(res => res.json())
        .then(res => {
          // error on update
          if (res.error) {
            alert(`${error.message} 🚨`)
            return
          }

          // update result store
          ResultStore.update((items) => {
            // if result already found in DB(update its index by studtId)
            let indx = $ResultStore.findIndex(ele => ele.meta.studtId === stdDetail.studtId)
            // console.log(`stdIndx: ${indx}`)
            items[indx] = saveFrmt
            return items
          })

          // close compute modal & clear currentAddedSubj
          currentAddedSubj = []
          showModal = false

          // console.log('modal window closed!')
          alert('Report is successfully updated 😀')
        })
        .catch(err => console.log(err))
      return
    }

    /* for newly created report, for a term in a new session */
    saveFrmt.meta.createdAt = new Date().toLocaleDateString()
    saveFrmt.midTerm.report[academicYear.currentTerm] = currentAddedSubj
    saveFrmt.midTerm.comments[academicYear.currentTerm] = { teacher: '', principal: '' }
    saveFrmt.midTerm.comments[academicYear.currentTerm].teacher = tComment ?? ""
    saveFrmt.midTerm.comments[academicYear.currentTerm].principal = pComment ?? ""
    saveFrmt.cummulative.midTerm[academicYear.currentTerm] = cummulative
    // console.log(saveFrmt)

    // save to database
    fetch('/api/result', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saveFrmt)
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res)

        if (res.error) {
          alert(`${error.message} 🚨`)
          return
        }
        
        // add report to store
        ResultStore.update((items) => {
          if (items === undefined) {
            items = [saveFrmt]
            return items
          }
          items = [...items, saveFrmt]
          return items
        })

        // send the total computed count to the parent container to display
        dispatch('countComputed', $ResultStore.length)

        // link to preview student's result
        disableLink = false
        // close compute modal & clear currentAddedSubj
        currentAddedSubj = []
        showModal = false

        alert('Report is successfully added into Database 😀')
      })
      .catch(err => console.error(err))
    ;
    return
  }


  function filterList(event) {
    if (event.target.value === '') { listStudt = studts; return }

    let category = (event.target.value).slice(0, 3)
    let level = (event.target.value).match(/\d/g).join('')

    if (  category === '' & level === '') {
      listStudt = $LocalStore
      return
    }

    listStudt = $LocalStore.filter(items => items.class.category === category && items.class.level === level)
  }

  // open compute modal and set student's detail result is to be computed
  let showModal = false
  function computeModal(event) {
    let stdId = event.target.dataset.stdId
    let std = allStudts.find(s => s.studtId === stdId)

    // if already added student's report into ResultStore(holds all/current added report in DB)
    if ($ResultStore != undefined) {
      let getRept = $ResultStore.find(ele => ele.meta.studtId === stdId)
      // if record are empty
      if ( getRept === undefined ) {
        // console.log('report empty!. Returned empty report', getRept)
        getRept = currentAddedSubj ?? []
        stdDetail = std
        showModal = true
        return
      }
      // set teacher's and principal's comments if available
      tComment = getRept.midTerm.comments[academicYear.currentTerm]?.teacher
      pComment = getRept.midTerm.comments[academicYear.currentTerm]?.principal

      // if for a new "term" within the session(returns and empty array)
      let records = getRept.midTerm.report[academicYear.currentTerm] ?? []
      currentAddedSubj = records

      // show current clicked student
      stdDetail = std
      showModal = true
      return
    }

    // show current clicked student
    stdDetail = std
    showModal = true
  }

  // help show result slip
  let disableLink = true;
  function veiwResult() {
    // check if result is saved before previewing 
    let chkRpt =  $ResultStore.findIndex(ele => ele.meta.studtId === stdDetail.studtId)
    if (chkRpt === -1) {
      disableLink = true;
      alert(`Please save/add "${stdDetail.name.first} ${stdDetail.name.last}'s"  report record before previewing!`)
      return
    }
    disableLink = false;
  }

  let addReptComment = false
  // handles adding report comments
  function reportComments(evt) {
    tComment = evt.detail.tComment
    pComment = evt.detail.pComment

    addReptComment = false;
  }

  // show section for adding comments on report
  function showCommentSec() {
    addReptComment = true
  }
</script>

<Modal showModal={showModal} on:closeModal={closeComputeModal}>
  <!-- student's detail(i.e name, class, no of subjects added) -->
  <header class="rec-info-header">
    <div class="compute-info">
      <span>{stdDetail?.name.first} {stdDetail?.name.last}</span>
      <span>
        <span>{stdDetail?.class.category} {stdDetail?.class.level}</span><sup>{stdDetail?.class.subLevel}</sup>
      </span>
    </div>

    <!-- added subjects info -->
    <div class="subj-stat">
      <span>subjects added</span> <span>{addedSubjs.length}/10</span>
    </div>
  </header>
  <!-- help add subject -->
  <section class="addRec-container">
    <form class="addRec-sec" on:submit|preventDefault={addSubj}>
      <div class="input-field">
        <label for="subj">subject</label>
        <input type="text" name="subj" list="subj" placeholder="Add Subject">
        <datalist id="subj">
          {#each subjects as subj}
            <option value="{subj.title}">{subj.title}</option>
          {/each}
        </datalist>
      </div>
      
      <!-- 1st CA(not more than resultPref) -->
      <div class="input-field">
        <label for="ftCA"><span>1</span><sup>st</sup> <span>CA</span></label>
        <input type="number" name="firstCA" id="ftCA" min="0" max="{resultPref.midTerm.firstCA}">
      </div>

      <!-- 2nd CA(not more than resultPref) -->
      <div class="input-field">
        <label for="ndCA"><span>2</span><sup>nd</sup> <span>CA</span></label>
        <input type="number" name="secondCA" id="ndCA" min="0" max="{resultPref.midTerm.secondCA}">
      </div>

      <!-- add button -->
      <Button btnType={"submit"} info={true} block={true}>add</Button>
    </form>
  </section>

  <!-- section for all added subjects/records -->
  <section class="show-add-rec">
    <!-- display where to add comments to records -->
    {#if addReptComment}
      <AddComment 
        on:reportComments={reportComments} 
        on:closeCommentSec={(evt) => addReptComment = evt.detail} 
        {addReptComment} 
        reportData={currentAddedSubj} 
        obtainable={resultPref.midTerm.obtainable} 
        {tComment} 
        {pComment}
      />
    {/if}
    
    {#each currentAddedSubj as subjs}
      <AddSubj subj={subjs} on:removeSubj={removeSubj} />
    {:else}
      <h2 class="center-text" style="color: var(--clr-grey); font-family: var(--font-quicksand); font-weight: 300;">
        There are no subject added yet!
      </h2>
    {/each}
  </section>

  <!-- action button to close or save record -->
  <footer class="cta-footer">
    <a href="/{stdDetail.studtId}" rel="noreferrer" target="_blank" on:click={veiwResult} disabled={disableLink}>
      <Button btnType={'button'} sec={true} btnDisabled={disableLink}>
        <i class="ti ti-eye"></i> <span>preveiw</span>
      </Button>
    </a>

    <div class="save-cta">
      <Button {...btnProps} on:click={addRecord}>
        <i class="ti ti-save"></i> <span>add record</span>
      </Button>

      <Button {...commentBtn} on:click={showCommentSec}>
        <i class="ti ti-pencil"></i> <span>comment</span>
      </Button>
    </div>
  </footer>
</Modal>

<section>
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
  
  <article class="studts-container">
    {#each listStudt  as std}
      <div class="show-info-sec">
        <div class="std-info">
          <div class="std-avatar">
            <div class="img">
              {#if std.passport === null }
                <i  class="ti ti-user avatar-placeholder"></i>
              {/if}
              {#if std.passport != null}
                <img src={std.passport} alt="student_img">
              {/if}
            </div>
          </div>

          <div class="info">
            <div class="std-cls"><span>{std.class.category} {std.class.level}</span><sup>{std.class.subLevel}</sup></div>
            <div class="name">{std.name.first} {std.name.last}</div>
            <div class="std-id">{std.studtId}</div>
          </div>

          <!-- check mark for computed result -->
          <div class="computed">
            <!-- {#if $ResultStore.length > 0}
              <i class="ti ti-eye" on:click={veiwResult} on:keypress={veiwResult} data-std-id="{std.studtId}"></i>
            {/if} -->
            <i class="ti ti-pencil-alt" on:click|self={computeModal} on:keypress|self={computeModal} data-std-id="{std.studtId}"></i>
            <!-- {#if $ResultStore.length < 0}
            {/if} -->
          </div>
        </div>
      </div>
    {:else}
      <h2>No Student found for the class selected</h2>
    {/each}
  </article>
</section>

<style>
  .pg-header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pg-header .input-field {
    min-width: 424px;
  }
  .studts-container {
    padding: 0 1.5em;
  }
  .show-info-sec {
    border-radius: 5px;
    min-width: 360px;
    background-color: white;
    padding: 0.4em;
    margin-bottom: 1em;
  }
  .std-info {
    display: grid;
    grid-template-columns: 70px 3fr 1fr;
    gap: 0.5em;
  }
  .std-avatar {
    position: relative;
    width: 100%;
  }
  .std-avatar .img {
    width: 100%;
    position: relative;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.2em;
    height: 70px;
    border-radius: 50%;
  }
  .std-avatar .img img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }
  .std-avatar i {
    font-size: 28px;
    border-radius: 50%;
    padding: 0.6em;
    background-color: var(--accent-info-lite);
    color: var(--accent-info);
  }
  .info {
    padding: 0.1em;
    line-height: 1.4;
  }
  .info .name {
    text-transform: capitalize;
  }
  .std-cls {
    text-transform: uppercase;
    font-size: 14px;
  }
  .std-cls sup {
    color: var(--accent-info);
  }
  .std-id {
    color: var(--clr-grey);
    font-size: 14px;
  }
  .computed {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .computed i {
    font-size: 22px;
    z-index: 2;
    padding: 0.4em;
    border-radius: 50%;
  }
  .computed i:hover {
    background-color: rgb(227, 232, 248);
    transition: 0.5s ease;
    cursor: pointer;
  }
  .computed i:active {
    animation: clickBtn 500ms ease;
  }
  .rec-info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
    background-color: var(--clr-sec);
    color: var(--clr-off-white);
    padding: 1em 0.5em;
    margin: 1em 0;
  }
  .compute-info {
    text-transform: capitalize;
  }
  .subj-stat {
    text-transform: capitalize;
    font-size: 15px;
  }
  .subj-stat span:nth-child(2) {
    background-color: var(--accent-info);
    padding: 3px;
    border-radius: 4px;
    font-family: var(--font-quicksand);
  }
  .addRec-sec {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
  }
  .show-add-rec {
    padding: 0.2em 0;
    border: 1px solid var(--clr-off-white);
    margin-bottom: 1em;
    height: 350px;
    overflow: auto;
    position: relative;
    isolation: isolate;
  }
  .show-add-rec::-webkit-scrollbar {
    width: 6px;
  }
  .show-add-rec::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--clr-off-white);
  }
  .cta-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.4em;
    gap: 2em;
  }
  .save-cta {
    display: flex;
    gap: 2em;
    align-items: center;
  }
</style>