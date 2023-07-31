<script>
  import { createEventDispatcher } from "svelte";
  import { BranchInfoStore } from '$lib/stores/BranchInfoStore'
  import Student from "./Student.svelte"
  import PreviewPerf from "./perf/PreviewPerf.svelte"
  import StudtInfo from "./perf/StudtInfo.svelte"
  import TermReport from "./perf/TermReport.svelte";
  import OverallPerf from "./perf/OverallPerf.svelte";
  import SubjStats from "./perf/SubjStats.svelte";
  import PromotionInfo from "./perf/PromotionInfo.svelte"
  import Promotion from "./perf/Promotion.svelte"
  import OverallSubjStat from "./perf/OverallSubjStat.svelte"

  export let allStudts = []
  export let allReports = []

  let dispatch = createEventDispatcher()

  let currentSession = $BranchInfoStore?.academicYear?.session
  
  // all completed reports with promotion or graduation for the current session
  let getStudtWithPromo = allStudts.filter(ele => ele?.promotion != undefined || ele?.graduation != undefined)
  let allCompletedRepts = getStudtWithPromo.length === 0 ? [] : getStudtWithPromo

  // help count total numbers of promoted students (on initial load & when added into DB)
  let countPromo = allCompletedRepts.reduce((acc, ele) => {
    return ele?.promotion ? acc += 1 : acc += 0
  }, 0)
  // counts total numbers of graduated students (on initial load & when added into DB)
  let countGrad = allCompletedRepts.reduce((acc, ele) => {
    return ele?.graduation ? acc += 1 : acc += 0
  }, 0)

  /* increment promotion stat count */
  function incPromotionCount() {
    dispatch('incPromotionCount', countPromo)
  }

  /* increment graduation stat count */
  function incGraduatedCount() {
    dispatch('incGraduatedCount', countGrad)
  }

  /* for filters and sorting */
  let LocalStore = allStudts
  let studts = allStudts
  let listStudt = studts

  let showOverallPreview = false
  let showSubjSessionStats = false
  let showOverallSubjStats = false

  /* holds details on student's report and info */
  let stdDetail = {} // should be from students DB
  let stdReptDetail = {} // should be from results DB

  /* promotion and graduation status for the selected student(from student DB) */
  let promotionStatus = stdDetail?.promotion ?? []
  let graduationStatus = stdDetail?.graduation ?? {}
  

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

  function showStd(evt) {
    const { std, previewType } = evt.detail
    
    // get the student's report for the session
    let rept = allReports.find(ele => ele?.meta?.studtId === std)
    stdReptDetail = rept

    /* check student if found in 'all completed reports' list */
    let checkPromoList = allCompletedRepts.find(ele => ele?.studtId === std) ?? {}
    stdDetail = (checkPromoList?.studtId) ? checkPromoList : allStudts.find(ele => ele?.studtId === std)

    /* get student's promotion/graduation info */
    promotionStatus = stdDetail?.promotion ?? []
    graduationStatus = stdDetail?.graduation ?? {}

    // help determine which modal window to show: "overall session perfomance" or "subject session stats"
    if (previewType === 'overallPreview') {
      showOverallPreview = true
      return
    }
    if (previewType === 'sessionPreview') {
      showSubjSessionStats = true
      return
    }
  }

  /* help close the performance window */
  function closePerf(evt) {
    if (evt.detail === 'close') {
      showOverallPreview = false
    }
    return
  }

  /* show overall subject performances for the session */
  function subjStats(evt) {
    showOverallSubjStats = evt.detail
  }

  /* help close subject stats window */
  function closeSubjStats(evt) {
    showOverallSubjStats = evt.detail === 'close' ? false : true
  }

  /* help close overall subject stats */
  function closeOverallSubjStats(evt) {
    showSubjSessionStats = evt.detail === 'close' ? false : true
  }

  /* update student promotion/graduation info in DB */
  async function updateStudentPromotion(saveObj) {
    // CASE: if save data is for 'sss 3' classes
    let promotionType = Array.isArray(saveObj) === false &&  saveObj.graduated != undefined ? 'graduation' : 'promotion'
    
    let saveFrmt = { promotionType, studtId: stdDetail?.studtId, data: saveObj }

    /* save promotion/graduation data into required DB collection/table */
    let saveData = await fetch('/api/promotion', {
      method: 'PUT',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(saveFrmt)
    })

    let res = await saveData.json()
    
    return res
  }

  async function studtPromotion(evt) {
    const frm = evt.detail

    /* if for SSS 3 class: for graduation */
    if (frm?.graduated != undefined || frm?.graduated === true) {
      let { graduated, session, date } = frm
      let saveFrmt = { graduated, session, date }

      /* update the student's graduation status in DB(students DB)  */
      updateStudentPromotion(saveFrmt)

      /* if successfully updated in DB: updated promoted status */
      graduationStatus = { graduated, session, date }
      stdDetail['graduation'] = graduationStatus

      /* check if already added in 'allCompletedRepts' list */
      let chkAlreadyAddIndx = allCompletedRepts.findIndex(std => std?.studtId === stdDetail?.studtId)
      if (chkAlreadyAddIndx === -1 || chkAlreadyAddIndx === undefined) {
        allCompletedRepts = [stdDetail, ...allCompletedRepts]
        // increment counter for graduated students
        countGrad = allCompletedRepts.reduce((acc, ele) => ele?.graduation ? acc += 1 : acc += 0 , 0)
        incGraduatedCount()
      } else {
        allCompletedRepts[chkAlreadyAddIndx] = stdDetail
      }

      // close performance preview
      showOverallPreview = false
      return
    }

    /* format of promotion data object in DB */
    let addPromo = { 
      clsFrom: { category: stdDetail?.class?.category, level: stdDetail?.class?.level, subLevel: stdDetail?.class?.subLevel, department: stdDetail?.class?.department }, 
      clsTo: { category: frm.category, level: frm.level, subLevel: frm.subLevel, department: frm.dept === undefined ? null : frm.dept }, 
      session: stdReptDetail?.meta?.session ?? currentSession, 
      date: (new Date()).toISOString() 
    }

    /* student's promotion list and promotion data for the session */
    let chkPromoListIndx = promotionStatus.findIndex(ele => ele.session === stdReptDetail?.meta?.session)
    let getSessionPromo = stdDetail?.promotion != undefined ? stdDetail?.promotion.find(ele => ele?.session === currentSession) : {}

    /* === if promotion field is empty or not defined (intial state) === */
    if (chkPromoListIndx === -1) {
      /* update the student's promotion status in DB(students DB)  */
      const res = await updateStudentPromotion([addPromo, ...promotionStatus])

      if (res.error) {
        alert(res.message)
        return
      }

      promotionStatus = [addPromo, ...promotionStatus]
      stdDetail['promotion'] = promotionStatus
      allCompletedRepts = [stdDetail, ...allCompletedRepts]

      // increment counter for promoted students
      countPromo = allCompletedRepts.reduce((acc, ele) => ele?.promotion ? acc += 1 : acc += 0 , 0)
      incPromotionCount()

      // close performance preview
      showOverallPreview = false

      alert(res.message)

      return
    }

    /* === if not found in promotion list for current session === */
    if (chkPromoListIndx > -1 && getSessionPromo === undefined) {
      /* update the student's promotion status in DB(students DB) */
      const res = await updateStudentPromotion([addPromo, ...promotionStatus])
      if (res.error) {
        alert(res.message)
        return
      }

      // update the promotion status list, 'all completed reports'
      promotionStatus = [addPromo, ...promotionStatus]
      stdDetail.promotion = promotionStatus
      allCompletedRepts = [stdDetail, ...allCompletedRepts]

      // increment counter for promoted students
      countPromo = allCompletedRepts.reduce((acc, ele) => ele?.promotion ? acc += 1 : acc += 0 , 0)
      incPromotionCount()

      // close performance preview
      showOverallPreview = false

      alert(res.message)

      return
    }

    /* === if promotion already exited === */
    if (chkPromoListIndx > -1 && getSessionPromo != undefined || getSessionPromo?.session === currentSession) {
      /* update the student's promotion status in DB(students DB)  */
      promotionStatus[chkPromoListIndx] = addPromo
      let saveData = [...promotionStatus]
      const res = await updateStudentPromotion(saveData)

      if (res.error) {
        alert(res.message)
        return
      }

      // update the promotion status list, 'all completed reports'
      promotionStatus[chkPromoListIndx] = addPromo
      stdDetail.promotion = promotionStatus
      let getStdIndx = allCompletedRepts.findIndex(ele => ele?.studtId === stdDetail?.studtId)
      allCompletedRepts[getStdIndx] = stdDetail

      // close performance preview
      showOverallPreview = false

      alert(res.message)

      return
    }
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
      <Student {std} on:showStd={showStd} />
    {:else}
      <h2>No Student found for the selected class</h2>
    {/each}
  </section>

  <!-- show overall session performance -->
  {#if showOverallPreview}
    <PreviewPerf on:closePref={closePerf}>
      <!-- student meta info -->
      <StudtInfo stdInfo={stdReptDetail?.meta} />
      <!-- terms session performance report for the session -->
      <TermReport examCumm={stdReptDetail?.cummulative?.exam} reptSession={stdReptDetail?.meta?.session} />
      <!-- circular progress bar for overall session performance & grade -->
      <OverallPerf overallCummulatives={stdReptDetail?.cummulative?.exam} reptSession={stdReptDetail?.meta?.session} on:subjStats={subjStats} />
      <!-- class promotion or graduation -->
      <PromotionInfo 
        classInfo={stdReptDetail?.meta} 
        currentSession={currentSession} 
        promotion={promotionStatus} 
        graduation={graduationStatus}
      />
      <!-- promotion/graduation form -->
      <Promotion studtClass={stdReptDetail?.meta?.class} currentSession={stdReptDetail?.meta?.session} on:studtPromo={studtPromotion} />
    </PreviewPerf>
  {/if}

  {#if showOverallSubjStats === true}
    <SubjStats sessionRept={stdReptDetail} on:closeSubjStats={closeSubjStats} />
  {/if}

  {#if showSubjSessionStats === true}
    <OverallSubjStat stdRept={stdReptDetail} on:closeOverallSubjStats={closeOverallSubjStats} />
  {/if}
</article>

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