<script>
  import Card from "$lib/components/Card.svelte";
  import Button from "$lib/components/Button.svelte";

  export let data

  let btnProps = {
    btnType: 'submit',
    pry: true,
    block: true,
    disableBtn: false
  }

  console.log(data)
</script>

<article class="studt-reg-section">
  <Card>
    <header class="sch-logo-sec">
      <div class="sch-logo">
        <img src="imgs/AFSSLogo.png" alt="AFSS school logo" width="130" height="auto">
      </div>
  
      <h2>student signup</h2>
    </header>

    
    <section class="form-container">
      <form action="/api/student" method="post">
        <!-- name -->
        <div class="name-field">
          <div class="input-field">
            <label for="fname">first name</label>
            <input type="text" name="fname" id="fname" placeholder="First name" required>
          </div>
          <div class="input-field">
            <label for="lname">last name</label>
            <input type="text" name="lname" id="lname" placeholder="Last name" required>
          </div>
        </div>
        <!-- gender -->
        <div class="input-field">
          <label for="gender">gender</label>
          <select name="gender" id="gender" required>
            <option value="">Select Gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <!-- class -->
        <div class="studt-class-field">
          <div class="input-field">
            <label for="cls-category">class category</label>
            <select name="clsCategory" id="cls-category" required>
              <option value="">Class Category</option>
              <option value="jss">JSS</option>
              <option value="sss">SSS</option>
            </select>
          </div>
          <div class="input-field">
            <label for="cls-level">class level</label>
            <select name="clsLevel" id="cls-level" required>
              <option value="">Class Level</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="input-field">
            <label for="cls-subLevel">class sub-level</label>
            <select name="clsSubLevel" id="cls-subLevel" required>
              <option value="">Class Sub-Level</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="b">C</option>
            </select>
          </div>
        </div>
        <!-- admission year -->
        <div class="input-field">
          <label for="admYr">admission year</label>
          <input type="text" name="admYr" id="admYr" placeholder="Admission Year" required>
        </div>
        
        <!-- btn container -->
        <div class="btn-container">
          <Button {...btnProps}>
            register
          </Button>
        </div>
      </form>
    </section>
  </Card>

  <h2>Student Page</h2>
  <a href="/">go back home</a> 
</article>