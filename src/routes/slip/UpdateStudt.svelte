<script>
  import { StudentStore } from "$lib/stores/StudentStore"
  import Button from "$lib/components/Button.svelte";
  import Card from "$lib/components/Card.svelte";

  export let showUpdate = false
  export let info = {}

  let btnProps = {
    btnType: 'submit',
    sec: true,
    block: true,
    disableBtn: false,
    showLoading: false,
    loadingStatus: 'Please wait...'
  }

  let uploadImg = false
  let fileImg = ''

  function chooseFile(event) {
    let stdImg = event.target.files[0]
    // accepted file type
    let acceptedFileTypes = ['image/png', '.png', 'image/jpg', '.jpg', 'image/jpeg', '.jpeg', 'image/png', 'png']
    if (!acceptedFileTypes.includes(stdImg.type)) {
      alert('Only .jpg, .png, and .jpeg images are allowed')
      return
    }

    info.passport = URL.createObjectURL(stdImg)
    // removes placeholder icon
    uploadImg = true
  }

  async function updateStudt(event) {
    let frm = event.target
    // btnProps.showLoading = true
    // console.log(fileImg[0])

    try {
      let updt = await fetch('/api/student', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
      })
      let updtRes = await updt.json()
      
      if (!updtRes.success) {
        alert('Update unsuccessful, please try again in a little while')
        btnProps.showLoading = false
        return
      }
      console.log(updtRes.branchStudts)
      btnProps.showLoading = false
      
      StudentStore.set(updtRes.branchStudts)
    } catch (err) {
      console.error(err)
      btnProps.showLoading = false
    }


  }
</script>

<section class="updt-sec" class:active={showUpdate}>
  <div class="updt-container">
    <Card>
      <header class="center-text updt-header">
        <!-- close update window -->
        <i class="ti ti-close close-icon" on:click={() => showUpdate = false} on:keypress={() => showUpdate = false}></i>

        <div class="img-container">
          <div class="img">
            <input type="file" on:change={chooseFile} bind:files={fileImg} name="passport" id="passport" accept=".png, .jpg, .jpeg">
            <label for="passport" class:remove-icon={uploadImg}>
              <img src={info.passport ?? ''} alt="studt_img" width="100" height="auto">
              <i class="ti ti-user"></i>
            </label>
          </div>
        </div>
        <div class="center-text std-id">{info.studtId}</div>
      </header>

      <div class="updt-body">
        <form action="/api/student" method="put" on:submit|preventDefault={updateStudt}>
          <div class="name-inpt">
            <div class="input-field">
              <label for="fname">first name</label>
              <input type="text" bind:value={info.name.first} name="fname" id="fname" placeholder="First name" required>
            </div>
            <div class="input-field">
              <label for="lname">Last name</label>
              <input type="text" bind:value={info.name.last} name="lname" id="lname" placeholder="Last name" required>
            </div>
          </div>
          <div class="input-field">
            <label for="schType">schooling</label>
            <select bind:value={info.schoolingType} name="schoolingType" id="schType" required>
              <option value={info.schoolingType} style="text-transform: capitalize;">{info.schoolingType}</option>
              {#if info.schoolingType === 'day'}
                <option value="boarding">Boarding</option>
              {/if}
              {#if info.schoolingType === 'boarding'}
                <option value="day">Day</option>
              {/if}
            </select>
          </div>
    
          <div class="btn-sec">
            <Button {...btnProps}>
              update
            </Button>
          </div>
        </form>
      </div>
    </Card>
  </div>
</section>

<style>
  .updt-sec {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgb(0 0 0 / 30%);
    display: none;
    align-items: center;
    justify-content: center;
    overflow: auto;
    backdrop-filter: blur(2px);
  }
  .active {
    display: flex;
  }
  .updt-container {
    width: 435px;
  }
  .updt-header {
    padding: 0.5em 0.8em;
    position: relative;
  }
  .close-icon {
    position: absolute;
    right: 18px;
    top: 15px;
    font-weight: bold;
    border-radius: 50px;
    padding: 0.3em;
    cursor: pointer;
    transition: background-color 0.5s ease;
  }
  .close-icon:hover {
    background-color: var(--clr-off-white);
  }
  .close-icon:active {
    animation: clickBtn 0.5s ease;
  }
  .img-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img {
    width: 40%;
    display: flex;
    justify-content: center;
  }
  .img input {
    display: none;
  }
  .img label {
    position: relative;
    display: block;
    height: 120px;
    width: 120px;
    border-radius: 50%;
    cursor: pointer;
    isolation: isolate;
  }
  .img label img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ebedf3;
    border-radius: 50%;
    left: 0;
  }
  .img label i {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 25px;
    font-size: 60px;
  }
  .remove-icon i {
    display: none;
  }
  .updt-body {
    padding: 0.5em 0.8em;
  }
  .name-inpt {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .btn-sec {
    margin-top: 1em;
    margin-bottom: 0.6em;
    padding: 0 0.5em 0;
  }
</style>