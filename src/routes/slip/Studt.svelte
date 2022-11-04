<script>
  import { fade } from "svelte/transition";
  import { StudentStore } from "$lib/stores/StudentStore"

  import UpdateStudt from "./UpdateStudt.svelte";

  export let info

  let showdopdown = false
  let showUpdate = false

  function toggleDropdown() {
    showdopdown = !showdopdown
  }

  function updateStudt() {
    showUpdate = true
    showdopdown = false
  }

  async function delStudt(event) {
    let std = event.target.dataset.stdId
    let delAgr = confirm(`🚨 Are you sure you want to delete ${info.name.first} ${info.name.last}`)

    if (delAgr != true) {
      console.log('Delete student is false!', std)
      return
    }

    // send a delete req and await res
    try {
      let delData = await fetch('/api/student', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studtId: std })
      })

      let res = await delData.json()
      
      if (!res.success) {
        alert('🚧 Unable to delele student please try again later')
        return
      }
      console.log(res.success)
      // aler(`${info.name.first} ${info.name.last} is deleted successfully!`, std)
      StudentStore.update(items => {
        return items.filter(item => item.studtId != std)
      })
      showdopdown = !showdopdown
    } catch (err) {
      console.error(err)
    }
  }

  // get passport from local sys
  let stdImg = $StudentStore.find((ele => ele.studtId === info.studtId && ele.passport != null))
  info.passport = stdImg ?? null;
</script>

<UpdateStudt {showUpdate} {info} />

<div class="show-info-sec" transition:fade={{delay: 1, duration: 10}}>
  <div class="std-info">
    <div class="std-avatar">
      <div class="img">
        {#if info.passport === null }
          <i  class="ti ti-user avatar-placeholder"></i>
        {/if}
        {#if info.passport != null}
          <img src="{info.passport}" alt="student_img">
        {/if}
      </div>
    </div>

    <div class="info">
      <div class="std-cls"><span>{info.class.category} {info.class.level}</span><sup>{info.class.subLevel}</sup></div>
      <div class="name">{info.name.first} {info.name.last}</div>
      <div class="std-id">{info.studtId}</div>
    </div>

    <div class="cta-sec">
      <div class="dropdown-menu-icon-btn">
        <i class="ti ti-more" on:click={toggleDropdown} on:keypress={toggleDropdown}></i>
      </div>
      <div class="dropdown-icons" class:active={showdopdown === true}>
        <div on:click={updateStudt} on:keypress={updateStudt}>
          <i class="ti ti-pencil-alt"></i> <span>edit</span>
        </div>
        <div>
          <a href='/slip/{info.studtId}' target="_blank" rel=noreferrer>
            <i class="ti ti-printer"></i> <span>print</span>
          </a>
        </div>
        <div style="color: var(--accent-danger)" data-std-id={info.studtId} on:click={delStudt} on:keypress={delStudt}>
          <i class="ti ti-trash"></i> <span>delete</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .show-info-sec {
    border-radius: 5px;
    min-width: 360px;
    background-color: white;
    padding: 0.4em;
  }
  .std-info {
    display: grid;
    grid-template-columns: 70px 3fr 1fr;
    gap: 0.5em;
  }
  .std-avatar {
    position: relative;
    width: 100%;
  }
  .std-avatar .img {
    width: 100%;
    position: relative;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.2em;
  }
  .std-avatar i {
    font-size: 28px;
    border-radius: 50%;
    padding: 0.6em;
    background-color: var(--accent-info-lite);
    color: var(--accent-info);
  }
  .info {
    padding: 0.1em;
    line-height: 1.4;
  }
  .info .name {
    text-transform: capitalize;
  }
  .std-cls {
    text-transform: uppercase;
    font-size: 14px;
  }
  .std-cls sup {
    color: var(--accent-info);
  }
  .std-id {
    color: var(--clr-grey);
    font-size: 14px;
  }
  .cta-sec {
    position: relative;
  }
  .cta-sec .dropdown-menu-icon-btn {
    position: relative;
    display: flex;
    justify-content: center;
    transform: rotate(90deg);
    align-items: center;
    padding-bottom: 2em;
  }
  .cta-sec .dropdown-menu-icon-btn i {
    border: none;
    border-radius: 50px;
    font-size: 20px;
    padding: 0.3em;
  }
  .cta-sec .dropdown-menu-icon-btn i:hover {
    background-color: var(--clr-off-white);
    transition: background-color 0.5s ease;
    cursor: pointer;
  }
  .cta-sec .dropdown-icons {
    position: absolute;
    top: 45px;
    right: 4px;
    min-width: 120px;
    padding: 0.5em;
    background-color: var(--clr-white);
    border-radius: 4px;
    box-shadow: 0 6px 16px rgb(0 0 0 / 5%);
    display: none;
    gap: 5px;
    z-index: 1;
  }
  .cta-sec .active {
    display: grid !important;
  }
  .dropdown-icons div {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.3em;
    text-transform: capitalize;
  }
  .dropdown-icons div:hover {
    background-color: var(--clr-off-white);
    transition: background-color 0.5s ease;
    cursor: pointer;
  }
  .dropdown-icons div a {
    display: inline-block;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }
</style>