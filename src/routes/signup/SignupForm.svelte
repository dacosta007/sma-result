<script>
  import "$lib/css/auth-layout.css"
  import { AuthStore } from "$lib/stores/AuthStore"
  import { sendForm } from "$lib/components/auth/sendForm"
  
  import Card from "$lib/components/Card.svelte";
  import Button from "$lib/components/Button.svelte";

  export let error
  export let success
  export let user

  let btnProps = {
    btnType: 'submit',
    pry: true,
    block: true,
    disableBtn: false
  }


  let frmData = {
    fname: '',
    lname: '',
    email: '',
    altEmail: '',
    username: '',
    password: '',
    branchCode: '002'
  }

  async function signupFrm(event) {
    error = ''

    const frm = event.target
    const res = await sendForm(frm)

    if (res.error) {
      error = res.error
    }

    if (res.success) {
      success = res.success
      user = res.user
      
      // update Auth store value
      $AuthStore.isLoggedIn = true
      $AuthStore.userId = user
      
      // take user to login page
      // showForm()
      console.log('redirect to login/dashboard')
    }

    frm.reset()
  }
</script>

<section class="signup-sec">
  <Card>
    <div class="form-container">
      <header class="auth-header">
        <div class="sch-img">
          <div class="img">
            <img src="imgs/AFSSLogo.png" alt="sch logo" width="130" height="auto">
          </div>
        </div>
  
        <div class="title-sec">
          <h4>Admin</h4>
          <h3>Register</h3>
        </div>
      </header>
      
      <!-- error message -->
      {#if error}
        <p style="color: var(--accent-danger);">{error}</p>
      {/if}

      <form action="/signup" method="post" on:submit|preventDefault={signupFrm}>
        <!-- Admin name -->
        <div class="two-grid-container">
          <div class="input-field">
            <label for="fname">first name</label>
            <input type="text" name="fname" id="fname" value={frmData.fname} placeholder="First Name" required>
          </div>
          <div class="input-field">
            <label for="lname">first name</label>
            <input type="text" name="lname" id="lname" value={frmData.lname} placeholder="Last Name" required>
          </div>
        </div>
        <!-- Admin email -->
        <div class="two-grid-container-rwd">
          <div class="input-field">
            <label for="email">email</label>
            <input type="email" name="email" id="email" value={frmData.email} placeholder="Email" required>
          </div>
          <div class="input-field">
            <label for="altEmail">alternative email</label>
            <input type="email" name="altEmail" id="altEmail" value={frmData.altEmail} placeholder="Alternative Email" required>
          </div>
        </div>
        <!-- Admin prefered username(username + branch code) -->
        <div class="input-field">
          <label for="username">username</label>
          <input type="text" name="username" id="username" value={frmData.username} placeholder="Prefered Username" required>
        </div>
        <!-- Admin password -->
        <div class="input-field">
          <label for="password">password</label>
          <input type="password" name="password" id="password" value={frmData.password} placeholder="Password" required>
        </div>
    
        <!-- btn container -->
        <div class="btn-sec">
          <Button {...btnProps}>
            register
          </Button>
        </div>
  
        <div class="to-login-link">
          <a href="/login">Already have an account? Login</a>
        </div>
      </form>
    </div>
  </Card>
</section>

<style>
  .to-login-link {
    text-align: center;
    padding-bottom: 1em;
    font-family: var(--font-quicksand);
  }
  .to-login-link a {
    text-decoration: none;
  }
  .to-login-link a:hover {
    text-decoration: underline;
  }
</style>