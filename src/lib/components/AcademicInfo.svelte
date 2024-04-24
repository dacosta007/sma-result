<script>
  import { BranchInfoStore } from "$lib/stores/BranchInfoStore"
  import { ResultStore } from "$lib/stores/ResultStore"
  import Card from "$lib/components/Card.svelte"
  import AcademicInfoForm from "./AcademicInfoForm.svelte";
  import Button from "./Button.svelte";

  export let academicInfo = {}

  let btnProps = {
    btnType: "button",
    btnGhost: true,
    block: true
  }

  // toggle btw "true" and "false" update form
  let showForm = false

  let { session:currentSession, currentTerm } = academicInfo
  let { currentTermBegins, currentTermEnds } = academicInfo

  // format the session text(i.e. 2022/2023 to 22/23)
  let splitCurrentSession = currentSession.split('/')
  let sessionFormat = `${(splitCurrentSession[0]).slice(2)}/${(splitCurrentSession[1]).slice(2)}`

  // list of info on sch's current academic year
  const listArr = [
    { title: 'session', val: sessionFormat},
    { title: 'term', val: currentTerm },
    { title: 'begins', val: (new Date(currentTermBegins).toDateString()).substring(4) },
    { title: 'ends', val: (new Date(currentTermEnds).toDateString()).substring(4) }
  ]


  function closeUpdtFrm(evt) {
    showForm = evt.detail
  }

  /* help update the branch and result store to reflect new updated info in UI */
  function updateData(evt) {
    // relevant updated values need
    const { updtAcademicInfo, resultData } = evt.detail
    
    // update academic info on 'branch store'
    BranchInfoStore.update(items => {
      items.academicYear = updtAcademicInfo
      return items
    })

    // update result dataset for branch 'academic info' updated to
    ResultStore.set(resultData)

    // update the 'academicInfo' view info
    academicInfo = updtAcademicInfo

    // show alert success message
    alert("✔ School Academic infomation is updated successfully!😃")

    // close update form
    showForm = false
  }
</script>

<!-- update form -->
{#if showForm === true}
  <AcademicInfoForm {academicInfo} on:closeFrm={closeUpdtFrm} on:updateFrm={updateData} />
{/if}

<div class="academic-info-container">
  <Card>
    <header class="academic-info-header center-text">
      <h3 class="title">academic year</h3>
    </header>

    <div class="academic-info">
      {#each listArr as info}
        <div class="info">
          <div class="info-val">
            {#if info.title === 'term'}
              {@html `<span style="color: var(--accent-info); letter-spacing: 0.5px;">${info.val}</span>`}
            {:else}
              {@html (info.title === 'session') ? `<b style="letter-spacing: 0.5px;">${info.val}</b>` : info.val}
            {/if}
          </div>
          <div class="info-title">{info.title}</div>
        </div>
      {/each}
    </div>
    <!-- update ghost btn -->
    <div class="updt-btn-container">
      <Button {...btnProps} on:click={() => showForm = true}>
        update info
      </Button>
    </div>
  </Card>
</div>


<style>
  .academic-info-container {
    margin-bottom: 1em;
  }
  .academic-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    color: var(--clr-txt);
    padding: 0.3em 0.4em 0.5em;
  }
  .academic-info-header {
    padding-top: 0.6em;
  }
  .academic-info-header h3 {
    color: var(--clr-txt);
    margin-bottom: 0.2em;
  }
  .info {
    line-height: 1.5;
  }
  .info-val {
    font-size: 13px;
    text-transform: capitalize;
  }
  .info-title {
    font-variant: all-small-caps;
    color: #a4a8b9;
  }
</style>