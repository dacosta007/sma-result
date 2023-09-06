<script>
  import { TeacherStore } from "$lib/stores/TeacherStore"

  import Button from "$lib/components/Button.svelte"
  import ProfileCard from "./ProfileCard.svelte";
  import AddTeacher from "./AddTeacher.svelte";

  export let data
  // console.log(data)

  // set the teacherStore 
  TeacherStore.set(data.teachers)

  let allTeachers = data.teachers

  // value can be 'create' or 'update'
  let formType = 'create'
  let showForm = false

  // holds data of teacher for update
  let updateObj = {}

  // add button properties(props)
  let btnProps = {
    btnType: 'button',
    pry: true
  }

  function addTeacher(evt) {
    formType = 'create'
    showForm = true
    // console.log('add new teacher')
  }

  function updateTeacher(evt) {
    formType = 'update'
    updateObj = evt.detail
    showForm = true
  }

  function closeAddTeachFrm(evt) {
    showForm = evt.detail
  }

  function createTeacher(evt) {
    let teachData = evt.detail
    // update currently displayed created teacher
    allTeachers = [teachData, ...allTeachers]

    // close windown
    showForm = false
  }

  function deleteTeacher(evt) {
    let teachId = evt.detail
    // update currently displayed created teacher
    allTeachers = allTeachers.filter(ele => ele.teachId != teachId)
    return
  }
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<article class="teacher-pg">
  <!-- section title & C.T.A btn to add teacher -->
  <header class="main-pg-header">
    <h2 class="title">teachers</h2>

    <div class="add-btn-sec">
      <Button {...btnProps} on:click={addTeacher}>
        <i class="ti ti-plus"></i> 
        <span>add teacher</span>
      </Button>
    </div>
  </header>

  <!-- list all teachers add/saved -->
  <section class="all-teach-sec">
    {#each allTeachers as teacher}
      <div>
        <ProfileCard teacherInfo={teacher} on:updateTeach={updateTeacher} on:delTeach={deleteTeacher} />
      </div>
    {:else}
      <h1 class="title center-text">No teacher added yet</h1>
    {/each}
  </section>
</article>

<!-- help create and update teacher's info -->
<AddTeacher 
  {formType} 
  {showForm} 
  on:createTeacher={createTeacher} 
  on:closeAddTeach={closeAddTeachFrm} 
/>

<style>
  .teacher-pg {
    padding: 2em 6.5em;
  }
  .main-pg-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 2em;
  }
  .all-teach-sec {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 1em;
    column-gap: 2.4em;
  }

  @media (max-width: 500px) {
    .teacher-pg {
      padding: 2em 1em;
    }
    .all-teach-sec {
      grid-template-columns: repeat(1, 1fr);
      row-gap: 2em;
      padding: 0 0.4em;
    }
  }
</style>