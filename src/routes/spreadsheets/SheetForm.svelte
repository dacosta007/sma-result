<script>
  import { enhance } from '$app/forms'
  import { createEventDispatcher } from 'svelte'
  import Button from '$lib/components/Button.svelte'
  import Card from '$lib/components/Card.svelte'

  // help send data up to parent component
  let dispatch = createEventDispatcher()

  let btnProps = {
    btnType: 'submit',
    pry: true,
    block: true,
    disableBtn: true
  }

  // the form
  let theForm

  /* checks if all input fields: to disabled or enable the button */
  function checkAllFields() {
    // the spreadsheet form
    const frmFields = theForm.elements

    // required input fields
    let sessionVal = frmFields.session
    let clsVal = frmFields.cls
    
    // checks all fields
    if (clsVal.value === '' || sessionVal.value === '') {
      btnProps.disableBtn = true
      return
    }

    btnProps.disableBtn = false
    return
  }

  /* help check if select input field isn't empty */
  function checkInput(event) {
    let inpt = event.target
    // given the error element is the next following element
    let errMsg = (event.target).nextElementSibling
    
    // empty input
    if (inpt.value === '') {
      errMsg.innerHTML = 'Please choose an option.'
      btnProps.disableBtn = true
      return
    }

    // checks all required fields are not empty
    checkAllFields()

    // clear error message
    errMsg.innerHTML = ''
    return
  }

  /* help handle spreadsheet form */
  function handleSpreadsheet({ formElement, formData }) {
    // disable submit btn
    btnProps.disableBtn = true

    return async ({ result }) => {
      // check for error within result responses
      if (result.type === 'error') {
        alert('🚧🛑 There are no such data for the specified session!')
        return
      }
      if (result.data.error) {
        alert('🚧 No report for the selected session yet!')
        return
      }

      // send result data to parent component
      dispatch('sheetData', result.data)
    }
  }
</script>


<section class="form-sec-container">
  <div class="contain-card">
    <Card>
      <form action="?/spreadsheet" method="post" class="form-container" bind:this={theForm} use:enhance={handleSpreadsheet}>
        <header class="form-header">
          <div class="sch-img">
            <img src="imgs/AFSSLogo.png" alt="sch logo" width="100" height="auto">
          </div>
          <h3 class="title">spreadsheets</h3>
        </header>
  
        <section class="inpt-field-sec">
          <div class="input-field">
            <label for="cls">class</label>
            <select name="cls" id="cls" required on:change={checkInput} style="text-transform: uppercase;">
              <option value="" style="color: grey;">-- select a class --</option>
              <option value="jss 1" style="text-transform: uppercase;">jss 1</option>
              <option value="jss 2" style="text-transform: uppercase;">jss 2</option>
              <option value="jss 3" style="text-transform: uppercase;">jss 3</option>
              <option value="sss 1" style="text-transform: uppercase;">sss 1</option>
              <option value="sss 2" style="text-transform: uppercase;">sss 2</option>
              <option value="sss 3" style="text-transform: uppercase;">sss 3</option>
            </select>
            <small class="error-msg"></small>
          </div>
    
          <div class="input-field">
            <label for="session">session</label>
            <select name="session" id="session" required on:change={checkInput}>
              <option value="" style="color: grey;">-- select session --</option>
              <option value="2022/2023">2022/2023</option>
              <option value="2023/2024">2023/2024</option>
              <option value="2024/2025">2024/2025</option>
            </select>
            <small class="error-msg"></small>
          </div>
        </section>
  
        <footer class="form-footer">
          <Button {...btnProps}>view spreadsheet</Button>
        </footer>
      </form>
    </Card>
  </div>
</section>


<style>
  .form-sec-container {
    display: flex;
    justify-content: center;
  }
  .contain-card {
    min-width: 380px;
  }
  .form-container {
    padding: 1em 1.5em;
  }
  .form-header {
    text-align: center;
  }
  .form-footer {
    padding: 0 0.5em;
    margin-top: 0.5em;
  }
  .error-msg {
    color: var(--accent-danger);
    font-size: 11px;
  }

  @media (max-width: 600px) {
    .form-sec-container {
      align-items: center;
      min-height: 100dvh;
    }
    .contain-card {
      min-width: 100%;
    }
    .form-container {
      padding: 1em 1em;
    }
  }
</style>