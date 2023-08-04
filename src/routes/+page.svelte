<script>
  import { BranchInfoStore } from "$lib/stores/BranchInfoStore"
  import { ResultStore } from "$lib/stores/ResultStore"
  import { AuthStore } from "$lib/stores/AuthStore"

  import Login from "$lib/components/auth/Login.svelte"
  import TileLink  from "$lib/components/auth/TileLink.svelte"

  export let data

  BranchInfoStore.set(data.branchInfo)
  ResultStore.set(data.resultData)

  let quickLinks = [
    { title: 'student', subTitle: 'reg', href: "/student",  icon: 'lni-graduation' },
    { title: 'teacher', subTitle: 'reg', href: "/teacher",  icon: 'lni-user' },
    { title: 'print', subTitle: 'slip', href: '/slip', icon: 'lni-printer' },
    { title: 'result', subTitle: 'compute', href: '/result', icon: 'lni-files' }
  ]

  // toggle login form
  let login = false, homePageHeader = true

  function showLoginFrm() {
    login = !login
    homePageHeader = !homePageHeader
  }

  function showPage(evt) {
    homePageHeader = true
    login = evt.detail
  }
</script>

<svelte:head>
  <title>AFSS Ibadan Result App</title>
  <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
</svelte:head>

<main class="home-page">
  <section class="action-content">
    {#if homePageHeader}
      <header class="sch-logo-sec">
        <div class="sch-logo">
          <img src="imgs/AFSSLogo.png" alt="AFSS school logo" width="130" height="auto">
        </div>

        <h2>Result App</h2>
      </header>
    {/if}
    
    <section class="auth-cta-btn-sec">
      {#if login === false}
        {#if $AuthStore.isLoggedIn === false}
          <a href="#login" on:click={showLoginFrm} class="auth-cta-btn">login</a> 
          <a href="#signup" class="auth-cta-btn auth-cta-btn-2">signup</a>
        {/if}
      {/if}

      <!-- Auth -->
      <div class="auth-login">
        {#if login}
          <Login on:showAuth={showPage} />

          <!-- go back home -->
          <a href="#home" style="margin-top:1.5em; display:inline-block" on:click={showLoginFrm} class="auth-cta-btn auth-cta-btn-2">
            go back home
          </a>
        {/if}
      </div>

      <!-- App Auth links -->
      {#if $AuthStore.isLoggedIn === true}
        <!-- links to pages -->
        <article class="app-features-sec">
          <section class="quick-nav">
            {#each quickLinks as link}
              <TileLink linkObj={link} />
            {/each}
          </section>

          <!-- to managing payment page -->
          <div class="payment-link-btn-container">
            <a href="/payment" class="p-link-btn">
              <i class="lni lni-money-protection"></i> <span>manage payment</span>
            </a>

            <!-- manage student promotion & graduation -->
            <a href="/promotion" class="promotion-btn" data-sveltekit-preload-code="hover">
              <i class="lni lni-graduation"></i> <span>promotion</span>
            </a>
          </div>

          <!-- logout btn -->
          <div class="logout-container">
            <a href="#logout" on:click={() => { $AuthStore.isLoggedIn = false; login = false; }} class="auth-cta-btn">
              logout
            </a>
          </div>
        </article>
      {/if}
    </section>

  </section>

  <footer class="copyright-sec">
    <small>Copyright &copy;2022. AFSS Ibadan<sup>&trade;</sup> All rights Reserved</small>
  </footer>
</main>

<style>
  .home-page {
    width: 100%;
    height: 100vh;
    max-height: 100%;
    overflow: auto;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    background-color: var(--clr-sec);
    color: var(--clr-off-white);
    padding: 2em 0;
  }
  .action-content {
    padding-top: 2em;
  }
  .sch-logo-sec {
    margin-bottom: 2.5em;
    text-align: center;
  }
  .auth-cta-btn-sec {
    display: grid;
    gap: 2em;
    margin-bottom: 1em;
    width: 100%;
    min-width: 335px;
  }
  .auth-cta-btn {
    text-decoration: none;
    text-align: center;
    letter-spacing: 1px;
    text-transform: capitalize;
    font-size: 16px;
    font-family: var(--font-quicksand);
    background-color: var(--clr-off-white);
    color: var(--clr-sec);
    padding: 10px 12px;
    border-radius: 21px;
    width: 100%;
    appearance: none;
    outline: none;
    transition: background-color 0.5s ease;
  }
  .auth-cta-btn:hover {
    background-color: #dce1ec;
  }
  .auth-cta-btn-2 {
    background-color: transparent;
    color: var(--clr-off-white);
  }
  .auth-cta-btn-2:hover {
    background-color: #eaf1ff6e;
    color: var(--clr-white);
  }
  .quick-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }
  .logout-container {
    margin-top: 3em;
  }
  .logout-container a {
    display: inline-block;
  }
  .payment-link-btn-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
    padding: 1em 0em;
  }
  .p-link-btn, .promotion-btn {
    padding: 10px 8px;
    background-color: var(--clr-sec);
    color: var(--clr-off-white);
    text-decoration: none;
    text-transform: capitalize;
    font-size: 13px;
    font-family: var(--font-nunito);
    letter-spacing: 0.8px;
    outline: none;
    appearance: none;
    cursor: pointer;
    border: 1px solid var(--clr-off-white);
    border-radius: 4px;
    box-shadow: 0px 19px 40px -12px rgb(41 36 72);
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .p-link-btn:active, .promotion-btn:active {
    animation: clickBtn 600ms ease alternate;
  }
  .p-link-btn i, .promotion-btn i {
    font-size: 28px;
  }
</style>
