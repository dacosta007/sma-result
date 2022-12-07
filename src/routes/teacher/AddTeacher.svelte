<script>
  import { createEventDispatcher } from "svelte"
  import { scale, fade } from "svelte/transition";

  import { subjectList } from "$lib/components/utils/subjectList"
  import { classesList } from "$lib/components/utils/classesList"

  import Button from "$lib/components/Button.svelte";

  // create or update
  export let formType = 'create'
  export let showForm = false
  export let updateData = {}

  let dispatch = createEventDispatcher()

  // should be exported(from classes db)

  let btnProps = {
    btnType: 'submit',
    pry: true,
    block: true,
    showLoading: false,
    loadingStatus: 'please wait!..',
    disableBtn: false
  }

  // closes the form window(showForm = false)
  function closeContent() {
    dispatch('closeAddTeach', false)
  }

  let cls = '', allClasses = [] 
  $:showAddedClses = allClasses.length

  function addClasses() {
    // check if expected values are empty
    if (cls === '') return
    allClasses = [cls, ...allClasses]
    cls = ''
  }

  function removeClasses(event) {
    let clses = event.target.dataset.rmCls
    allClasses = allClasses.filter(ele => ele != clses)
  } 

  let subjObj = { class: '', subj: '' }, allSubjs = []
  $:showAddedSubjs = allSubjs.length

  function addSubj() {
    // check if expected values are empty
    if (subjObj.class === '' || subjObj.subj === '') return
    allSubjs = [subjObj, ...allSubjs]
    subjObj = { class: '', subj: '' }
  }

  function removeAddedSub(event) {
    let subj = event.target.dataset.rmSubj
    // remove the subjec & show the remaining onces
    allSubjs = allSubjs.filter(ele => ele.subj != subj)
  }

  let triggerFunc

  function createTeacher(event) {
    if (allSubjs.length === 0 || allClasses.length === 0) {
      alert('⚠ Please make sure you\'ve added "Classes and Subject"!')
      return
    }

    let frm = event.target
    let frmData = {
      name: {
        first: frm.fname.value,
        last: frm.lname.value
      },
      email: frm.email.value,
      gender: frm.gender.value,
      classes: allClasses,
      subjects: allSubjs,
      branchCode: '002'
    }
    
    // save data
    fetch('/api/teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(frmData)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log(`⚠ ${res.message}`)
          alert(`⚠ ${res.message}`)
          return
        }
        
        // console.log(res)
        // dispatch/send updated data to parent component
        dispatch('createTeacher', res.data)
      })
      .catch(err => {
        console.error(err)
        alert(`🚨 ${err.message}`)
      })
  }

  function updateTeacher() {
    console.log('Function Triggered: "Update teacher!"')
    console.log(updateData)
  }

  if (formType === 'create') {
    triggerFunc = createTeacher
  }

  if (formType === 'update') {
    triggerFunc = updateTeacher
  }
</script>

<section class="addModal" class:show-addModal={showForm}>
  <div class="addContent" in:fade out:scale>
    <!-- create/update form -->
    <form action="#" method="post" on:submit|preventDefault={triggerFunc}>
      <header class="form-header">
        <!-- close modal btn -->
        <span class="ti ti-close close-content" on:click={closeContent} on:keypress={closeContent}></span>

        <!-- sch logo -->
        <div class="sch-logo">
          <img src="imgs/AFSSLogo.png" alt="AFSS school logo" width="120" height="auto">
        </div>
        <!-- form title -->
        <h3 class="title">
          {#if formType != 'update'}
            create teacher
          {:else}
            update teacher
          {/if}
        </h3>
      </header>

      <section>
        <!-- teacher's name -->
        <div class="tname-sec">
          <div class="input-field">
            <label for="fname">first name</label>
            <input type="text" name="fname" id="fname" placeholder="First name" required>
          </div>
          <div class="input-field">
            <label for="lname">first name</label>
            <input type="text" name="lname" id="lname" placeholder="Last name" required>
          </div>
        </div>

        <div class="email-gender">
          <!-- teacher's email -->
          <div class="input-field">
            <label for="email">email</label>
            <input type="email" name="email" id="email" placeholder="Teacher's Email" required>
          </div>
  
          <!-- gender -->
          <div class="input-field">
            <label for="gender">gender</label>
            <select name="gender" id="gender">
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <!-- teacher's classes handled -->
        <div class="cls-handle-sec">
          <div class="input-field">
            <label for="addCls">
              <span>classes handled</span> <small style="color:var(--accent-info);">(press the plus button to add classes)</small>
            </label>
            <select name="classes" id="addCls" bind:value={cls}>
              <option value=""></option>
              {#each classesList as cls}
                <option value="{cls.category} {cls.level}{cls.subLevel}">{cls.category} {cls.level}{cls.subLevel}</option>
              {/each}
            </select>
          </div>
          <Button btnType={'button'} pry={true} on:click={addClasses}>
            <i class="ti ti-plus"></i>
          </Button>
        </div>

        <!-- display added classes -->
        {#if showAddedClses > 0}
          <div class="show-added-list">
            <h6 class="title">added classes</h6>
            <div class="show-added">
              {#each allClasses as allCls}
                <div class="addedCls">
                  <span>{allCls}</span> 
                  <i class="ti ti-close" data-rm-cls="{allCls}" on:click={removeClasses} on:keypress={removeClasses}></i>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- teacher's major subjects -->
        <div class="subjs-sec">
          <!-- subjects -->
          <div class="input-field">
            <label for="subjs">major subjects</label>
            <input type="text" name="subjs" list="subjData" id="subjs" bind:value={subjObj.subj}>
            <datalist id="subjData">
              {#each subjectList as subject}
                <option value="{subject.title}">{subject.title}</option>
              {/each}
            </datalist>
          </div>
          
          <!-- subject's class -->
          <div class="input-field">
            <label for="subjCls">subject class</label>
            <select name="subjects" id="subjCls" bind:value={subjObj.class}>
              <option value=""></option>
              {#each classesList as cls}
                <option value="{cls.category} {cls.level}{cls.subLevel}">{cls.category} {cls.level}{cls.subLevel}</option>                
              {/each}
            </select>
          </div>
          
          <!-- add btn -->
          <Button btnType={'button'} pry={true} on:click={addSubj}>
            <i class="ti ti-plus"></i>
          </Button>
        </div>

        <!-- display all added subjects -->
        {#if showAddedSubjs > 0}
          <div class="show-added-list">
            <h6 class="title">added subjects</h6>
            <div class="show-added">
              {#each allSubjs as subj}
                <div class="addedSubj">
                  <div>
                    <small>{subj.class}</small>
                    <span>{subj.subj}</span>
                  </div>
                  <!-- delete added subject -->
                  <i class="ti ti-close" data-rm-subj="{subj.subj}" on:click={removeAddedSub} on:keypress={removeAddedSub}></i>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </section>

      <footer>
        <!-- create/update teacher -->
        <Button {...btnProps}>
          {#if formType === "create"}
            create teacher
          {:else}
            update teacher
          {/if}
        </Button>
      </footer>
    </form>
  </div>
</section>

<style>
  .addModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: auto;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: rgb(0 0 0 / 30%);
    backdrop-filter: blur(5px);
    z-index: 15;
  }
  .show-addModal {
    display: flex;
  }
  .addContent {
    background-color: var(--clr-white);
    width: 40%;
    border-radius: 5px;
    padding: 1.2em 1em;
  }
  .form-header {
    text-align: center;
    position: relative;
  }
  .close-content {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    background-color: var(--clr-light-grey);
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    transition: background-color 500ms ease;
  }
  .close-content:active {
    animation: clickBtn 500ms ease;
  }
  .close-content:hover {
    background-color: var(--clr-off-white);
  }
  .tname-sec {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5em;
  }
  .email-gender {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 1em;
  }
  .cls-handle-sec {
    display: grid;
    grid-template-columns: 3fr auto;
    gap: 1em;
    align-items: center;
  }
  .subjs-sec {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 1em;
    align-items: center;
  }
  .show-added-list {
    margin-bottom: 0.5em;
  }
  .show-added {
    display: flex;
    gap: 1em;
  }
  .show-added > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5em;
    border-radius: 16px;
    padding: 0.2em 0.5em;
    background-color: var(--clr-off-white);
    text-transform: uppercase;
    font-size: 13px;
  }
  .show-added > div i:hover {
    cursor: pointer;
  }
  footer {
    margin-top: 1em;
  }

  @media (max-width: 500px) {
    .addContent {
      width: 100%;
    }
  }
</style>