<script>
  import { createEventDispatcher } from 'svelte'
  import Card from '$lib/components/Card.svelte'

  export let std = {}

  let dispatch = createEventDispatcher()

  /* help send the student to be showed/previewed by the parent container */
  function showStudent(event) {
    let std = event.target.dataset.stdId
    dispatch('showStd', std)
  }
</script>

<div class="student-container">
  <Card>
    <div class="studt">
      <div class="img-and-name">
        <!-- student img & green/grey check mark(help mark paid) -->
        <div class="img" class:img-active={std.paid === true}>
          <i class="ti ti-user"></i>
        </div>
        
        <!-- name, student ID, & class -->
        <div class="name-cont">
          <div class="name">{std.name.first} {std.name.last}</div>
          <div class="id-and-class">
            <span>{std.studtId}</span> <span>{std.class.category} {std.class.level}<sup>{std.class.subLevel}</sup></span>
          </div>
        </div>
      </div>
    
      <!-- icon to toggle payment status -->
      <div>
        <i class="ti ti-pencil toggle-cont" data-std-id="{std.studtId}" on:click={showStudent} on:keypress={showStudent}></i>
      </div>
    </div>
  </Card>
</div>

<style>
  .student-container {
    width: clamp(260px, 100%, 350px);
    padding: 0.5em;
  }
  .studt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
  }
  .img-and-name {
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .img {
    position: relative;
    background-color: var(--accent-info-lite);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img i {
    font-size: 24px;
    color: var(--accent-info);
  }
  .img-active::before {
    content: '';
    width: 13px;
    height: 13px;
    position: absolute;
    bottom: 1px;
    right: 1px;
    border-radius: 50%;
    background-color: #c9c219;
  }
  .img-active::after {
    content: '';
    width: 3px;
    height: 6px;
    position: absolute;
    bottom: 5px;
    right: 6px;
    border-right: 1px solid var(--clr-white);
    border-bottom: 1px solid var(--clr-white);
    transform: rotate(38deg)
  }
  .name-cont {
    line-height: 1.3;
  }
  .name {
    text-transform: capitalize;
    letter-spacing: 0.5px;
    font-family: var(--font-nunito);
  }
  .id-and-class {
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 1em;
    color: #b0bfdd;
  }
  .id-and-class span:nth-child(2) {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    transform: translateY(-2px);
  }
  .id-and-class span:nth-child(2) sup {
    font-weight: bold;
  }
  .toggle-cont {
    padding: 0.4em;
    border-radius: 50%;
    transition: background-color 500ms ease;
    cursor: pointer;
  }
  .toggle-cont:hover {
    background-color: var(--clr-off-white);
  }
</style>