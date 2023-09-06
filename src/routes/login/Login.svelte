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

  async function loginFrm(event) {
    error = ''

    const frm = event.target
    const res = await sendForm(frm)

    if (res.error) {
      error = res.error
      console.log(error)
    }
    // success = res.success
    // user = res.user
    
    if (res.success) {
      success = res.success
      user = res.user
      
      // update Auth store value
      $AuthStore.isLoggedIn = true
      $AuthStore.userId = user
      console.log($AuthStore)
      // take user to admin dashboard page
      window.location.href = '/admin'
    }

    frm.reset()
  }
</script>

<section class="login-sec">
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
          <h3>Login</h3>
        </div>
      </header>
  
      <!-- error message -->
      {#if error}
        <p class="center-text" style="color: var(--accent-danger);">{error}</p>
      {/if}

      <form action="/login" method="post" on:submit|preventDefault={loginFrm}>
        <!-- admin username/email -->
        <div class="input-field">
          <label for="username">username</label>
          <input type="text" name="username" id="username" placeholder="Username or Email" required>
        </div>
        <!-- admin password -->
        <div class="input-field">
          <label for="password">password</label>
          <input type="password" name="password" id="password" placeholder="Password" required>
        </div>
  
        <!-- btn container -->
        <div class="btn-sec">
          <Button {...btnProps}>
            login
          </Button>
        </div>
      </form>

      <div class="to-login-link">
        <a href="/signup">Don't have an account? Signup</a>
      </div>
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