<script>
  let quickLinks = [
    { title: 'student', subTitle: 'reg', href: "/student",  icon: 'ti-id-badge' },
    { title: 'print', subTitle: 'slip', href: '/slip', icon: 'ti-file' },
    { title: 'result', subTitle: 'compute', href: '/result', icon: 'ti-files' }
  ]
</script>

<main class="home-page">
  <section class="action-content">
    <header class="sch-logo-sec">
      <div class="sch-logo">
        <img src="imgs/AFSSLogo.png" alt="AFSS school logo" width="130" height="auto">
      </div>

      <h2>Result App</h2>
    </header>
  
    <section class="auth-cta-btn-sec">
      <a href="/login" class="auth-cta-btn">login</a> 
      <a href="/signup" class="auth-cta-btn auth-cta-btn-2">signup</a>
    </section>

    <!-- links to pages -->
    <section class="quick-nav">
      {#each quickLinks as link}
        <a href="{link.href}">
          <i class="ti {link.icon}"></i>
          <div>
            <span>{link.subTitle}</span>
            <span>{link.title}</span>
          </div>
        </a>
      {/each}
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
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    background-color: var(--clr-sec);
    color: var(--clr-off-white);
    padding: 2em 0;
  }
  .action-content {
    padding-top: 4em;
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
    grid-template-columns: auto auto auto;
    gap: 1em;
  }
  .quick-nav a {
    text-decoration: none;
    display: flex;
    gap: 10px;
    align-items: center;
    color: var(--clr-txt);
    background-color: var(--clr-off-white);
    border-radius: 13px;
    padding: 0.4em 0.6em;
    box-shadow: 0 4px 19px rgb(0 0 0 / 5%);
  }
  .quick-nav a i {
    font-size: 20px;
    padding: 6px;
    border-radius: 50%;
    background-color: rgb(36 40 64 / 12%);
    color: #181f48;
  }
  .quick-nav a div {
    display: grid;
    line-height: 1;
    gap: 2px;
    padding-right: 6px;
  }
  .quick-nav a div span:nth-child(1) {
    font-family: var(--font-quicksand);
    font-variant: small-caps;
    font-size: 14px;
    color: var(--accent-info);
    font-weight: bold;
  }
  .quick-nav a div span:nth-child(2) {
    text-transform: capitalize;
    font-size: 15px;
    letter-spacing: 0.8px;
  }
</style>
