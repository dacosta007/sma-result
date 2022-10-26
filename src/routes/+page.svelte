<script>

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
  </section>

  <footer class="copyright-sec">
    <small>Copyright &copy;2022. AFSS Ibadan<sup>&trade;</sup> All rights Reserved</small>
  </footer>


  <!-- <div>
    <a href="/login">Login</a> 
    <a href="/signup">Signup</a> 
    <a href="/admin/result">Result page</a> 
    <a href="/result-021223">Print result page</a> 
    <a href="/admin/student">Student page</a> 
    <a href="/admin/teacher">teacher page</a> 
    <a href="/slip/slip-1212">print reg slip page</a>
  </div> -->
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
</style>
