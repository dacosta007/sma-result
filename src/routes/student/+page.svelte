<script>
  import { fade } from "svelte/transition";

  import { StudentStore } from "$lib/stores/StudentStore";
  import Card from "$lib/components/Card.svelte";
  import Button from "$lib/components/Button.svelte";

  import { genStudtId, genRandStr } from "$lib/components/utils/genId"

  // export let data

  let btnProps = {
    btnType: 'submit',
    pry: true,
    block: true,
    disableBtn: false,
    showLoading: false,
    loadingStatus: 'adding student...'
  }

  let passport, dptDisable = true;

  function checkCls(event) {
    let clsCategory = event.target.value
    
    if (clsCategory === 'jss') {
      dptDisable = true
    } else {
      dptDisable = false
    }
  }

  function chooseFile(event) {
    let stdImg = event.target.files[0]
    let acceptedFileTypes = ['image/png', '.png', 'image/jpg', '.jpg', 'image/jpeg', '.jpeg', 'image/png', 'png']
    if (!acceptedFileTypes.includes(stdImg.type)) {
      alert('Only .jpg, .png, and .jpeg images are allowed')
      return
    }
    // check for file size

    // display image about to be uploaded
    let imgSrc = URL.createObjectURL(stdImg)
    passport = imgSrc
  }

  function regFrm(event) {
    let frm = new FormData(event.target)
    let frmEle = event.target
    let frmData = {
      name: {
        first: frm.get('fname'),
        last: frm.get('lname')
      },
      gender: frm.get('gender'),
      class: {
        level: frm.get('clsLevel'),
        category: frm.get('clsCategory'),
        subLevel: frm.get('clsSubLevel'),
        department: frm.get('department')
      },
      admissionYear: frm.get('admissionYear'),
      regDate: new Date().toLocaleDateString(),
      schoolingType: frm.get('schoolingType'),
      passport: null,
      branchCode: '002'
    }

    // disable button
    btnProps.showLoading = true;
    
    // generate student ID & save student's info to DB
    genStudtId(frmData).then(res => {
      let { studtId } = res
      // update the frmData
      frmData.studtId = studtId
      frmData.slipId = `${studtId}.${genRandStr(6, { number: 'number', uppercase: 'uppercase', lowercase: 'lowercase' })}`

      fetch('/api/student', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(frmData)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          if (!res.success) {
            alert('🚨 Unable to added student into DB!')
            return
          }
          // update student store & localStorage for view all added student in DB
          frmData.passport = passport
          StudentStore.update(item => {
            if (typeof item === 'undefined') {
              return [frmData]
            }
            if (Array.from(item)) {
              return [frmData, ...item]
            }
            if (item.length === 0) {
              return [frmData]
            }
          })

          localStorage.setItem('students', JSON.stringify($StudentStore))
          
          console.log($StudentStore)

          // show success message & reset the form
          alert('Student saved success fully! 😀')

          // reset form fields
          passport = ''
          frmEle.reset()

          // enable submit button
          btnProps.showLoading = false
        })
        .catch(err => {
          console.error(err)
        })
    }).catch(err => console.error(err))
  }

</script>

<article class="studt-reg-section" out:fade={{delay: 0.5, duration: 20}}>
  <div class="reg-container">
    <Card>
      <header class="sch-logo-sec">
        <div class="sch-logo">
          <img src="imgs/AFSSLogo.png" alt="AFSS school logo" width="110" height="auto">
        </div>
    
        <h2>student signup</h2>
      </header>
  
      <section class="form-container">
        <form action="/api/student" method="post" on:submit|preventDefault={regFrm}>
          <div class="form-data-sec">
            <!-- student image -->
            <div class="studt-img-sec">
              <div class="img-container">
                <div class="img">
                  <input type="file" name="passport" id="passport" on:change={chooseFile} accept=".png, .jpg, .jpeg">
                  <label for="passport">
                    <img src="{passport}" alt="student img" width="150" height="auto">
                  </label>
                </div>
                <small class="image-notice">
                  <div>Upload Image</div>
                  <div>Please note, student passport image shouldn't be more than <b>1mb</b></div>
                </small>
              </div>
            </div>

            <!-- studt-info-sec -->
            <div class="studt-info-sec">
              <!-- name & gender container -->
              <div class="name-gender">
                <!-- first name -->
                <div class="input-field">
                  <label for="fname">first name</label>
                  <input type="text" name="fname" id="fname" placeholder="First name" required>
                </div>
                <!-- last name -->
                <div class="input-field">
                  <label for="lname">last name</label>
                  <input type="text" name="lname" id="lname" placeholder="Last name" required>
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
              </div>
    
              <!-- class & department -->
              <div class="studt-class-field">
                <div class="input-field">
                  <label for="cls-category">class category</label>
                  <select name="clsCategory" on:change={checkCls} id="cls-category" required>
                    <option value="">Class Category</option>
                    <option value="jss">JSS</option>
                    <option value="sss">SSS</option>
                  </select>
                </div>
                <div class="input-field">
                  <label for="cls-level">level</label>
                  <select name="clsLevel" id="cls-level" required>
                    <option value="">Class Level</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div class="input-field">
                  <label for="cls-subLevel">sub-level</label>
                  <select name="clsSubLevel" id="cls-subLevel" required>
                    <option value="">Class Sub-Level</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="b">C</option>
                  </select>
                </div>
                <div class="input-field">
                  <label for="dpt">department</label>
                  <select name="department" id="dpt" required disabled={dptDisable}>
                    <option value="">Department</option>
                    <option value="art">Art</option>
                    <option value="commercial">Commercial</option>
                    <option value="Science">Science</option>
                  </select>
                </div>
              </div>
    
              <!-- schoolingType & admission year -->
              <div class="sch-type-adm">
                <!-- schooling type -->
                <div class="input-field">
                  <label for="schType">schooling Type</label>
                  <select name="schoolingType" id="schType" required>
                    <option value="">Schooling Type</option>
                    <option value="day">Day</option>
                    <option value="boarding">Boarding</option>
                  </select>
                </div>
                <!-- admission year -->
                <div class="input-field">
                  <label for="admYr">admission year</label>
                  <select name="admissionYear" id="admYr" required>
                    <option value="">Admission Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                  </select>
                </div>
              </div>
            </div>  
          </div>
  
          <!-- btn container -->
          <div class="btn-container">
            <Button {...btnProps}>
              register
            </Button>

            <div class="cta">
              <a href="/">go back home</a>
            </div>
          </div>
        </form>
      </section>
    </Card>
  </div>
</article>

<style>
  .studt-reg-section {
    background-color: var(--clr-sec);
    width: 100%;
    height: 100vh;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2em 0;
    overflow: auto;
  }
  .reg-container {
    width: 60%;
  }
  .sch-logo-sec {
    text-align: center;
    padding: 1em;
  }
  .sch-logo-sec h2 {
    text-transform: capitalize;
    letter-spacing: 1px;
    font-weight: 200;
  }
  .form-container {
    padding: 1em;
  }
  .img {
    position: relative;
  }
  .img label {
    display: block;
    border: 1px solid var(--clr-off-white);
    height: 180px;
    width: 80%;
    border-radius: 5px;
  }
  .img label img {
    width: 100%;
    position: absolute;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  small.image-notice {
    font-size: 12px;
  }
  small.image-notice div:nth-child(1) {
    margin-bottom: 0.2em;
  }
  small.image-notice div:nth-child(2) {
    color: var(--accent-info);
  }

  .form-data-sec {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  .name-gender {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 0.5em;
  }
  .studt-class-field {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 0.5em;
  }
  .btn-container {
    margin-top: 2em;
    padding: 0 12em;
  }

  .cta {
    text-align: center;
    text-transform: capitalize;
    margin-top: 1.3em;
    font-family: var(--font-quicksand);
  }

  @media (max-width: 600px) {
    .reg-container {
      width: 100%;
      height: 100%;
      padding-right: 12px;
    }
    .form-data-sec {
      grid-template-columns: 1fr;
    }
    .img label {
      display: block;
      border: 1px solid var(--clr-off-white);
      height: 120px;
      width: 55%;
      border-radius: 5px;
      transform: translateX(61px);
    }
    .img {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .name-gender, .studt-class-field {
      grid-template-columns: 1fr;
    }
    .btn-container {
      padding: 0;
      margin-top: 1em;
    }
  }
</style>