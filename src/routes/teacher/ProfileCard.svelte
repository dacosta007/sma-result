<script>
  import { createEventDispatcher } from "svelte"
  import Card from "$lib/components/Card.svelte"

  export let teacherInfo = {}

  let dispatch = createEventDispatcher()

  function delTeacher() {
    // affirm if want to delete teacher
    let question = confirm('⚠ Are you sure you want to delete this teacher?')
    if (question != true) return

    let delId = teacherInfo.teachId
    console.log(`Delete teacher: ${delId}`)

    fetch('/api/teacher', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teachId: delId })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(`⚠ ${error.message}`)
          return
        }

        console.log(res.message)
        dispatch('delTeach', res.deleteId)
        return
      })
      .catch(err => {
        alert(`🚨 ${err.message}`)
      })
  }

  function showUptdWindow() {
    let teacher = teacherInfo.teachId

    console.log(`Show Update Window for: ${teacher}`)

    dispatch('updateTeach', teacherInfo)
  }
</script>

<Card>
  <!-- teacher's image, name, email, teacher's Id -->
  <header class="p-header-sec">
    <div class="img-sec">
      <div class="img">
        {#if teacherInfo.img}
          <img src="" alt="teacher_{teacherInfo.teachId}">
        {:else}
          <i class="ti ti-user"></i>
        {/if}
      </div>
    </div>
    <div class="center-text teach-info-sec">
      <div class="sub-text">{teacherInfo.teachId}</div>
      <h4 class="title">{teacherInfo.name.first} {teacherInfo.name.last}</h4>
      <div class="sub-text">{teacherInfo.email}</div>
    </div>
  </header>

  <!-- classes & subject handled -->
  <section class="p-content-sec">
    <!-- classes handled -->
    <div>
      <h5 class="title">classes handled</h5>
      <div class="cls-list">
        {#each teacherInfo.classes as cls}
          <span>{cls}</span>
        {/each}
      </div>
    </div>
    <!-- subject handled -->
    <div>
      <h5 class="title">teacher's subjects</h5>
      <div class="subj-list">
        {#each teacherInfo.subjects as subject}
          <div class="subj">
            <span>{subject.class}</span> <span>{subject.subj}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- C.T.A btn section -->
  <footer class="cta-sec">
    <div>
      <button type="button" class="ghost-btn del-btn" on:click={delTeacher}>
        delete
      </button>
    </div>
    <div>
      <button type="button" class="ghost-btn" on:click={showUptdWindow}>
        profile
      </button>
    </div>
  </footer>
</Card>

<style>
  .p-header-sec {
    position: relative;
  }
  .img-sec {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .img {
    width: 55%;
    height: 175px;
    background-color: #dfe5e9;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    position: relative;
  }
  .img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .img i {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    font-size: clamp(6em, 3.5vw, 4em);
    font-weight: 100;
  }
  .teach-info-sec {
    line-height: 1.4;
    margin-bottom: 1em;
  }
  .sub-text {
    color: var(--clr-grey);
    font-size: 14px;
  }
  .p-content-sec {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
    padding: 0 0.8em;
    margin-bottom: 0.5em;
  }
  .p-content-sec div:nth-child(2) h5 {
    margin-bottom: 0.4em;
  }
  .cls-list {
    display: grid;
    gap: 0.4em;
    text-transform: uppercase;
    font-size: 14px;
  }
  .subj {
    display: grid;
    line-height: 1.5;
    margin-bottom: 5px;
  }
  .subj span {
    display: inline-block;
  }
  .subj span:nth-child(1) {
    color: var(--clr-grey);
    font-size: 12px;
    text-transform: uppercase;
  }
  .subj span:nth-child(2) {
    font-size: 14px;
    text-transform: capitalize; 
    letter-spacing: 0.6px;
  }
  .cta-sec {
    background-color: #e2e8f382;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0.4em 0;
    margin-bottom: 0.3em;
  }
  .cta-sec div:nth-child(1) {
    border-right: 2px solid var(--clr-grey);
  }
  .ghost-btn {
    display: block;
    padding: 8px 8px;
    width: 100%;
    border: none;
    border-radius: 4px;
    outline: none;
    background: transparent;
    color: var(--clr-txt);
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
		letter-spacing: 0.5px;
    font-family: var(--font-nunito);
    font-size: 14px;
    transition: bold 0.5s ease;
  }
  .del-btn {
    color: var(--accent-danger)
  }
  .ghost-btn:active {
    animation: clickBtn 600ms ease;
  }
  .ghost-btn:hover, .ghost-btn:focus {
    font-weight: bold;
  }

  @media (max-width: 500px) {
    .img {
      width: 50%;
      height: 160px;
    }
    .cta-sec {
      padding: 0;
    }
    .ghost-btn {
      font-weight: 14px;
    }
  }
</style>