<script>
  export let sheetSession = ''

  const schInfo = {
    name: 'apostolic faith secondary school',
    subInfo: '(Co-Education) Boarding and Day',
    address: 'lodge street, Oke-Ado, Ibadan',
    email: 'afssib@yahoo.com',
    phone: ['08073161483', '07042414282']
  }
</script>


<header class="sheet-header">
  <div class="sch-info-container">
    <div class="logo">
      <img src="/imgs/AFSSLogo.png" alt="sch_logo" width="100" height="auto">
    </div>
  
    <div class="sch-info">
      <div class="sch-title">
        <h1>{schInfo.name}</h1>
        <div>{schInfo.subInfo}</div>
      </div>
      <div class="sch-address">{schInfo.address}</div>
      <div class="contact-info">
        <span><b>Email:</b> <i>{schInfo.email}</i></span> <span><b>Tel:</b> <i>{schInfo.phone}</i></span>
      </div>
    </div>
  </div>

  <div class="sheet-session"><span>session</span> <br> <span>{sheetSession}</span></div>
</header>


<style>
  .sheet-header {
    padding: 1em 1.5em;
    display: flex;
    justify-content: space-between;
  }
  .sch-info-container {
    display: flex;
    gap: 1.5em;
  }
  .logo {
    width: 115px;
    height: 110px;
    position: relative;
  }
  .logo img {
    position: absolute;
    width: 100%;
    height: auto;
    object-fit: fill;
    object-position: center;
  }
  .sch-title {
    line-height: 1.2;
  }
  .sch-title h1 {
    text-transform: capitalize;
    font-size: 1.7em;
    letter-spacing: 1px;
  }
  .sch-title > div {
    font-size: 14px;
    text-align: center;
    font-weight: bold;
  }
  .sch-address {
    text-align: center;
    font-size: 18px;
    text-transform: capitalize;
  }
  .contact-info {
    text-align: center;
    font-size: 14px;
  }
  .sheet-session {
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.2;
  }
  .sheet-session span:nth-child(1) {
    text-transform: uppercase;
    font-size: 0.7em !important;
    color: var(--clr-grey);
  }
</style>