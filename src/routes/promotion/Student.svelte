<script>
  import { createEventDispatcher } from 'svelte';
  import Card from '$lib/components/Card.svelte'

  export let std = {}

  let dispatch = createEventDispatcher()

  let showDropdown = false

  /* help send the student to be showed/previewed by the parent container */
  function showStudent(event) {
    let std = event.target.dataset.stdId
    let previewType = event.target.dataset.preview

    dispatch('showStd', {std, previewType})

    showDropdown = false
  }

  function dropdown(event) {
    let dropdownEle = Array.from(event.target.classList)
    let chk = dropdownEle.some(ele => ele === 'dropdown-btn')
    // if not dropdown btn
    if (chk === false) { 
      showDropdown === false 
      return 
    }
    showDropdown = !showDropdown
  }
</script>


<div class="student-container">
  <Card>
    <div class="studt">
      <div class="img-and-name">
        <!-- student img -->
        <div class="img">
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
    
      <div class="dropdown-container">
        <i class="ti ti-more dropdown-btn" on:click|self={dropdown} on:keypress|self={dropdown}></i>
        
        <div class="dropdown" class:show-dropdown={showDropdown === true}>
          <!-- icon to toggle overall performance status -->
          <div 
            data-std-id="{std.studtId}" 
            data-preview="overallPreview" 
            on:click|self={showStudent} 
            on:keypress|self={showStudent}>
            <i 
              class="ti ti-pencil" 
              data-std-id="{std.studtId}" 
              data-preview="overallPreview" 
              on:click|self={showStudent} 
              on:keypress|self={showStudent}>
            </i>
            <span 
              data-std-id="{std.studtId}" 
              data-preview="overallPreview" 
              on:click|self={showStudent} 
              on:keypress|self={showStudent}>
              promotion
            </span>
          </div>
          <!-- toggle term subject terms stats for the session -->
          <div 
            data-std-id="{std.studtId}" 
            data-preview="sessionPreview" 
            on:click|self={showStudent} 
            on:keypress|self={showStudent}>
            <i 
              class="ti ti-stats-up" 
              data-std-id="{std.studtId}" 
              data-preview="sessionPreview" 
              on:click|self={showStudent} 
              on:keypress|self={showStudent}>
            </i>
            <span 
              data-std-id="{std.studtId}" 
              data-preview="sessionPreview" 
              on:click|self={showStudent} 
              on:keypress|self={showStudent}>
              subject stats
            </span>
          </div>
          <!-- show report sheet -->
          <div 
            data-std-id="{std.studtId}" 
            data-preview="reportSheet" 
            on:click|self={showStudent} 
            on:keypress|self={showStudent}>
            <i 
              class="ti ti-file" 
              data-std-id="{std.studtId}" 
              data-preview="reportSheet" 
              on:click|self={showStudent} 
              on:keypress|self={showStudent}>
            </i>
            <span 
              data-std-id="{std.studtId}" 
              data-preview="reportSheet" 
              on:click|self={showStudent} 
              on:keypress|self={showStudent}>
              report sheet
            </span>
          </div>
        </div>
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
  .dropdown-container {
    position: relative;
  }
  .dropdown-btn {
    transform: rotate(45deg);
    padding: 0.4em;
    border-radius: 50%;
    transition: background-color 500ms ease;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }
  .dropdown-btn:hover {
    background-color: var(--clr-off-white);
  }
  .dropdown-btn:active {
    animation: clickBtn 0.5s ease;
  }
  .dropdown {
    position: absolute;
    top: 80%;
    left: 0;
    padding: 0.3em;
    background-color: var(--clr-white);
    border-radius: 3px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    display: none;
    z-index: 2;
  }
  .show-dropdown {
    display: inherit;
  }
  .dropdown > div {
    display: flex;
    align-items: center;
    gap: 0.6em;
    padding: 0.5em 0;
    min-width: 120px;
    cursor: pointer;
  }
  .dropdown > div:hover {
    background-color: var(--clr-off-white);
  }
  .dropdown > div span {
    font-size: 13px;
    display: inline-block;
    text-transform: capitalize;
  }
</style>