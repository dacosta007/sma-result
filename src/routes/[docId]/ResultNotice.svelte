<script>
  export let reports
  export let docId = ''


  let std = reports.find(ele => ele.meta.studtId === docId)
</script>

<section class="notice-sec">
  <div class="notice-container">
    <h2 class="title center-text" style="text-transform: uppercase;">Result Notice!...</h2>
    <p class="description">
      Hello {std.meta.name.first} {std.meta.name.last}!, your <b>Midterm result</b> is currently being uploaded at 
      the moment, please bear with us, and kindly check back in few days. The school will pass across necessary 
      information when all will be ready to view your result. Thanks for your understanding. 
    </p>
    <div class="link-to-site-sec">
      Have a sneak-peek on the school site currently in development <a href="https://afssib.com">Here</a>
    </div>
  </div>
</section>

<style>
  .notice-sec {
    padding: 2em 5em;
    display: flex;
    justify-content: center;
  }
  .notice-container {
    width: 450px;
    background-color: var(--clr-white);
    padding: 0.8em;
  }
  .link-to-site-sec {
    margin-top: 0.5em;
  }
  @media (max-width: 600px) {
    .notice-sec {
      padding: 2em 1em;
      display: flex;
      justify-content: center;
    }
  }
</style>