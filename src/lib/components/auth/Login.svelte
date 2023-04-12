<script>
  import { createEventDispatcher } from "svelte"

  import { AuthStore } from "$lib/stores/AuthStore"
  import Button from "../Button.svelte"

  let dispatch = createEventDispatcher()

  let btnProps = {
    btnType: 'submit',
    pry: true,
    block: true,
    disableBtn: true
  }

  let error, success

  function checkField(event) {
    let inpt = event.target.value
    if (inpt === '') {
      btnProps.disableBtn = true
      return
    }
    btnProps.disableBtn = false
  }

  function logUserIn(event) {
    let frm = event.target
    // temp login
    if (frm.username.value != 'admin002') {
      error = 'Invalid Login Credential'
      return
    }
    // password should be 6 or more characters long
    if (frm.password.value.length < 6) {
      error = 'Invalid Username or password!'
      return
    }
    if (frm.password.value != '002_admin_afssib') {
      error = 'Invalid User'
      return
    }

    $AuthStore.isLoggedIn = true
    
    dispatch('showAuth', false) 
  }
</script>

<!-- temporary login form -->
<section class="temp-login">
  <header class="auth-header">
    <div class="sch-img">
      <img src="imgs/AFSSLogo.png" alt="sch logo" width="130" height="auto">
    </div>
    <div class="title-sec">
      <h4>Admin</h4>
      <h3>Login</h3>
    </div>
  </header>

  <!-- error message -->
  {#if error}
    <p class="center-text" style="color: var(--accent-danger);">{error}</p>
  {/if}
  <article class="form-sec">
    <form action="/login" method="post" on:submit|preventDefault={logUserIn}>
      <!-- admin username/email -->
      <div class="input-field">
        <label for="username">username</label>
        <input on:input={checkField} type="text" name="username" id="username" placeholder="Username or Email" required>
      </div>
      <!-- admin password -->
      <div class="input-field">
        <label for="password">password</label>
        <input on:input={checkField} type="password" name="password" id="password" placeholder="Password" required>
      </div>

      <div class="btn-sec">
        <Button {...btnProps}>
          Login
        </Button>
      </div>
    </form>
  </article>
</section>

<style>
  .auth-header {
    text-align: center;
  }
  .title-sec {
    line-height: 1.2;
  }
  .title-sec h4 {
    font-size: 2em;
    font-weight: 400;
  }
  .title-sec h3 {
    font-size: 1.5em;
    font-family: var(--font-quicksand);
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .input-field {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0em;
  }
  .btn-sec {
    margin: 1em 0 0;
  }
</style>