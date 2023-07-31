<script>
  import { createEventDispatcher } from "svelte";

  export let studtClass = {}
  export let currentSession = '2022/2023'

  let dispatch = createEventDispatcher()

  let studtFormatCls = `${studtClass?.category} ${studtClass?.level}` 

  function studtPromotion(evt) {
    /* for sss 3 classes: graduation */
    if (studtClass?.category === 'sss' && studtClass?.level === '3') {
      dispatch('studtPromo', { graduated: true, session: currentSession, date: (new Date()).toISOString() })
      return
    }

    // get form's data entries
    let frm = Object.fromEntries(new FormData(evt.target))

    /* check to see if all required fields aren't empty */
    if (frm.category === '' && frm.level === '' && frm.subLevel === '') {
      alert('Please required fields must not be empty!')
      return
    }
    if (frm.category === 'sss' && frm.dept === '') {
      alert('Choose a department for the class')
      return
    }

    /* dispatch the form's data entries to the parent component */
    dispatch('studtPromo', frm)
  }

  let disableDept = true
  function checkInpt(event) {
    let inpt = event.target.value
    if (inpt === 'jss') {
      disableDept = true
      return
    }
    disableDept = false
  }
</script>



<section class="promotion-frm-sec">
  <h5 class="title">promote student</h5>

  <form action="#" method="post" on:submit|preventDefault={studtPromotion}>
    {#if studtFormatCls != 'sss 3'}
      <div class="fields">
        <div class="inpt-fld">
          <label for="category">category</label>
          <select name="category" id="category" required on:change={checkInpt}>
            <option value="">Category</option>
            <option value="jss">JSS</option>
            <option value="sss">SSS</option>
          </select>
        </div>
        <div class="inpt-fld">
          <label for="level">level</label>
          <select name="level" id="level" required>
            <option value="">Level</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div class="inpt-fld">
          <label for="subLevel">Sub-Level</label>
          <select name="subLevel" id="subLevel" required>
            <option value="">Sub-level</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
          </select>
        </div>
        <div class="inpt-fld">
          <label for="dept">Department</label>
          <select name="dept" id="dept" disabled={disableDept}>
            <option value="">Department</option>
            <option value="art">Art</option>
            <option value="commercial">Commercial</option>
            <option value="science">Science</option>
          </select>
        </div>
      </div>
    {/if}
    <div class="btn-container">
      <button type="submit">
        <!-- if is sss 3 class, show graduate student else, promote student -->
        {#if studtFormatCls === 'sss 3'}
          graduate student
        {:else}
          promote student
        {/if}
      </button>
    </div>
  </form>
</section>

<style>
  .promotion-frm-sec {
    margin-top: 1em;
    padding: 0 1.2em;
  }
  .promotion-frm-sec > h5 {
    color: var(--clr-grey);
    font-size: 0.9em;
  }
  .fields {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 7px;
  }
  .inpt-fld {
    margin-bottom: 3px;
  }
  .inpt-fld > label {
    font-variant: all-small-caps;
    display: block;
  }
  .inpt-fld > select {
    width: 100%;
    padding: 9px 5px;
    outline: none;
    appearance: none;
    border: 2px solid #8697a369;
    border-radius: 3px;
    transition: background-color 0.5s ease;
  }
  .inpt-fld > select:focus {
    border-color: rgb(109 128 254 / 53%);
  }
  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 0.9em;
  }
  .btn-container button {
    outline: none;
    appearance: none;
    border: none;
    border-radius: 3px;
    background-color: #0e3146;
    padding: 12px 6px;
    color: var(--clr-off-white);
    width: 100%;
    font-size: 15px;
    text-transform: capitalize;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .btn-container button:active {
    animation: clickBtn 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }
</style>