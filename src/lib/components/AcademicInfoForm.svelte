<script>
  import { enhance } from "$app/forms"
  import { createEventDispatcher } from "svelte"
  import { fade, scale } from "svelte/transition"

  import Button from "./Button.svelte"
  import Card from "./Card.svelte"

  export let academicInfo = {}

  let dispatch = createEventDispatcher()

  let submitBtnProps = {
    btnType: "submit",
    sec: true,
    block: true,
    loadingStatus: "Updating!..",
    showLoading: false,
    disableBtn: true
  }

  // help hold and check values of the form is confirmed & agreed upon
  let checkAttestation = false

  // help trigger overall error message to be displayed on form
  let showOverallErrMsg = false
  let overallErrMsg = ''

  function closeFrm() {
    dispatch('closeFrm', false)
  }

  // help check term change for automatically term change for next term
  function termChange(event) {
    const term = (event.target.value).trim()

    switch (term) {
      case 'first':
        academicInfo.nextTerm = "second"
        break;
      case 'second':
        academicInfo.nextTerm = "third"
        break;
      case 'third':
        academicInfo.nextTerm = "first"
        break;
      default:
      academicInfo.nextTerm = academicInfo.nextTerm
      break;
    }
  }

  /* Regular Expression(RegEx) for checking sch session value */
  function checkSessionVal(event) {
    const valEle = event.target
    let val = (valEle.value).trim()
    let errMsg = document.querySelector("[data-err-session]")
    let regX = /[0-9]{4}\/[0-9]{4}/g
    
    // total value count isn't up to required length
    if (val.length < 9) {
      errMsg.innerHTML = "Invalid required format length value(expecting i.e: 2023/2024)."
      return
    }

    // check if value is requied format
    if (val.length === 9 && regX.test(val) === false) {
      errMsg.innerHTML = "Incorrect session format value <b>(i.e: 2021/2022)</b>."
      return
    }

    errMsg.innerHTML = ""
  }

  /* Check all required fields on form if valid for submission */
  function checkAllRequiredFields(frmData) {
    const allFields = Object.fromEntries(frmData)
    let { session, currentTermBegins, currentTermEnds } = allFields
    const regX = /[0-9]{4}\/[0-9]{4}/g

    // check if all fields aren't empty
    if (session === '' || currentTermBegins === '' || currentTermEnds === '') {
      return "Please, all input fields are to be filled"
    }

    // help check session fields thorougly
    if (session.length < 9) {
      return "Invalid required format length value<b>(expecting i.e: 2023/2024).</b>"
    }
    if (session.length === 9 && regX.test(session) === false) {
      return "Incorrect session format value <b>(i.e: 2021/2022)</b>."
    }

    return true
  }

  /* Check if the attestation/confirm checkbox is checked */
  function checkConfirmation(event) {
    const checkboxEle = event.target

    // enable the submit btn & set the checkAttestaion boolean value appropriately
    if (checkboxEle.checked) {
      submitBtnProps.disableBtn = false
      checkAttestation = checkboxEle.checked
      return
    }

    submitBtnProps.disableBtn = true
    checkAttestation = false
  }

  function updateAcademicInfo({ form, data, action, cancel }) {
    // check all form's data are not empty
    const checkFrmData = checkAllRequiredFields(data)
    if (checkFrmData != true) {
      showOverallErrMsg = true
      overallErrMsg = checkFrmData
      cancel() // prevent the form submission
      return
    }

    // hide/close overall error message(if is shown/displayed)
    showOverallErrMsg = false
    overallErrMsg = ''
    
    // result/response from server
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          // send updated data to parent component & close form
          dispatch('updateFrm', result.data)
          break;
        case 'invalid':
          // show overall error message
          showOverallErrMsg = true
          overallErrMsg = result.data.message
          break;
        case 'error':
          // show overall error message
          showOverallErrMsg = true
          overallErrMsg = result.error.message
        default:
          break;
      }
    }
  }
</script>

<aside class="updt-form-sec">
  <div class="form-content" transition:scale={{ duration: 200 }}>
    <Card>
      <form action="?/updateAcademicYear" id="frm" method="post" use:enhance={updateAcademicInfo}>
        <header class="frm-header">
          <!-- close btn -->
          <span class="ti ti-close close-btn" on:click|self={closeFrm} on:keypress|self={closeFrm}></span>
          <h4>school</h4>
          <h2>academic year</h2>
        </header>
        
        <div class="frm-content">
          <!-- current session -->
          <h5 class="frm-sec-title">SCH. current session</h5>
          <div class="input-field">
            <label for="session">session</label>
            <input 
              type="text"  
              name="session" 
              id="session" 
              on:input={checkSessionVal} 
              on:blur={checkSessionVal} 
              bind:value={academicInfo.session} 
              required 
              placeholder="i.e. 2023/2024" 
              title="sch. session in this format i.e 2023/2024" 
              maxlength="9"
            >
            <span class="error-msg" data-err-session=""></span>
          </div>
          
          <!-- current term -->
          <h5 class="frm-sec-title">SCH. current term</h5>
          <div class="input-field">
            <label for="currentTerm">current term</label>
            <select name="currentTerm" id="currentTerm" bind:value={academicInfo.currentTerm} on:change={termChange} required style="text-transform: capitalize;">
              {#if academicInfo.currentTerm === "first"}
                <option value="{academicInfo.currentTerm}">{academicInfo.currentTerm}</option>
                <option value="second">Second</option>
                <option value="third">Third</option>
              {/if}
              {#if academicInfo.currentTerm === "second"}
                <option value="{academicInfo.currentTerm}">{academicInfo.currentTerm}</option>
                <option value="third">Third</option>
                <option value="first">First</option>
              {/if}
              {#if academicInfo.currentTerm === "third"}
                <option value="{academicInfo.currentTerm}">{academicInfo.currentTerm}</option>
                <option value="first">First</option>
                <option value="second">Second</option>
              {/if}
            </select>
            <span class="error-msg" data-err-current-term=""></span>
          </div>
    
          <!-- current term Dates -->
          <div class="current-term-date-container">
            <!-- current term begins -->
            <div class="input-field">
              <label for="currentTermBegins">Term Begins</label>
              <input type="date" name="currentTermBegins" id="currentTermBegins" bind:value={academicInfo.currentTermBegins} required>
              <span class="error-msg" data-err-current-term-begins=""></span>
            </div>
            <!-- current term begins -->
            <div class="input-field">
              <label for="currentTermEnds">Term Ends</label>
              <input type="date" name="currentTermEnds" id="currentTermEnds" bind:value={academicInfo.currentTermEnds} >
              <span class="error-msg" data-err-current-term-ends=""></span>
            </div>
          </div>
    
          <!-- next Term -->
          <h5 class="frm-sec-title">SCH. next term</h5>
          <div class="next-term-container">
            <!-- next term -->
            <div class="input-field">
              <label for="nextTerm">next term</label>
              <input 
                name="nextTerm" 
                id="nextTerm" 
                bind:value={academicInfo.nextTerm} 
                readonly 
                title="This will update automatically(changing the current term)" 
                style="text-transform: capitalize; letter-spacing: 1px; background-color:#f3f8ff; color:#717781;"
              >
            </div>
            <!-- date next term begins -->
            <div class="input-field">
              <label for="nextTermBegins">next term starts</label>
              <input type="date" name="nextTermBegins" id="nextTermBegins" bind:value={academicInfo.nextTermBegins} title="Date next following term begins">
              <span class="error-msg" data-err-next-term-begins=""></span>
            </div>
          </div>
        </div>

        <!-- causion notice -->
        <div class="caution-sec">
          <input type="checkbox" name="caution" id="caution" bind:checked={checkAttestation} on:click={checkConfirmation} required>
          <label for="caution">
            <b>please note:</b> 
            <span>
              This will affect the computational data of <b>mid-term</b> and <b>exam reports</b> for the <b>term</b> 
              within the current <b>session</b> specified. When updating, please, exercise patient. Are you satisfied 
              with the above info.
            </span>
          </label>
        </div>

        <!-- overall error message when failed to submit form data -->
        {#if showOverallErrMsg}
          <div class="overall-err-msg" transition:fade>{@html overallErrMsg}</div>
        {/if}
    
        <div class="btn-sec-container">
          <Button {...submitBtnProps}>
            update academic year
          </Button>
        </div>
      </form>
    </Card>
  </div>
</aside>


<style>
  .updt-form-sec {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: clamp(100vh, 100dvh, 100svh);
    background-color: rgba(0 0 0 / 10%);
    backdrop-filter: blur(3px);
    display: grid;
    place-items: center;
    overflow: auto;
  }
  .form-content {
    width: 35%;
    margin-block: 1.5em;
  }
  #frm {
    padding: 1.5em 1em;
  }
  .frm-header {
    text-align: center;
    color: var(--clr-txt);
    text-transform: capitalize;
    letter-spacing: 1px;
    line-height: 1.4;
    margin-bottom: 1em;
    position: relative;
    overflow: hidden;
  }
  .close-btn {
    position: absolute;
    right: 1px;
    top: 0;
    font-size: 14px;
    font-weight: bold;
    padding: 0.5em;
    border-radius: 50%;
    background-color: rgb(41 36 72 / 17%);
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s linear;
  }
  .close-btn:active {
    animation: clickBtn 600ms cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }
  .close-btn:hover {
    opacity: 1;
  } 
  .current-term-date-container,
  .next-term-container
   {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }
  .btn-sec-container {
    margin-top: 1em;
    padding: 0 0.8em;
  }
  .input-field label {
    color: rgb(14 49 70 / 68%);
    font-size: x-small;
    margin-bottom: 0.3em;
  }
  .frm-sec-title {
    text-transform: capitalize;
    color: var(--clr-sec);
    font-size: smaller;
    padding-inline: 0.6em;
    margin-bottom: 0.3em;
  }
  .frm-sec-title:not(:nth-child(1)) {
    margin-top: 1em;
  }
  .caution-sec {
    display: flex;
    gap: 0.4em;
  }
  .caution-sec label {
    color: #65779d;
    font-size: 11px;
  }
  .caution-sec label:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .caution-sec label::first-letter {
    text-transform: capitalize;
  }
  input#caution {
    margin-right: 1em;
    position: relative;
    visibility: collapse;
  }
  input#caution::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 3px;
    width: 18px;
    height: 18px;
    border: 2px solid var(--clr-grey);
    border-radius: 3px;
    visibility: visible;
    background-color: var(--clr-white);
    transition: background-color 0.3s linear;
    cursor: pointer;
  }
  input#caution::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 11px;
    border-right: 2px solid #90aec1;
    border-bottom: 2px solid #90aec1;
    top: 10px;
    left: 9px;
    visibility: visible;
    rotate: 40deg;
    scale: 0;
    transition: scale 0.3s 0.3s linear(0 0%, 0.22 2.1%, 0.86 6.5%, 1.11 8.6%, 1.3 10.7%, 1.35 11.8%, 1.37 12.9%, 1.37 13.7%, 1.36 14.5%, 1.32 16.2%, 1.03 21.8%, 0.94 24%, 0.89 25.9%, 0.88 26.85%, 0.87 27.8%, 0.87 29.25%, 0.88 30.7%, 0.91 32.4%, 0.98 36.4%, 1.01 38.3%, 1.04 40.5%, 1.05 42.7%, 1.05 44.1%, 1.04 45.7%, 1 53.3%, 0.99 55.4%, 0.98 57.5%, 0.99 60.7%, 1 68.1%, 1.01 72.2%, 1 86.7%, 1 100%);
  }
  input#caution:checked::before {
    background-color: var(--clr-sec);
  }
  input#caution:checked:after {
    scale: 1;
  }
  .error-msg {
    display: block;
    color: var(--accent-danger);
    font-size: 11px;
  }
  .overall-err-msg {
    background-color: var(--accent-danger);
    color: var(--clr-off-white);
    font-size: 12px;
    border-radius: 5px;
    padding: 0.9em 0.8em;
    margin: 0 1em;
  }

  /* Large Laptops */
  @media (min-width: 1024px) and (max-width: 1440px) {
    .form-content {
      width: 45%;
    }
  }

  /* Tablet Devices */
  @media (min-width: 601px) and (max-width: 768px) {
    .form-content {
      width: 60%;
    }
  }

  /* Mobile phone */
  @media (max-width: 500px) {
    .form-content {
      width: 90%;
    }
    .frm-sec-title {
      padding-inline: 0;
    }
    .btn-sec-container {
      padding: 0;
    }
  }
</style>