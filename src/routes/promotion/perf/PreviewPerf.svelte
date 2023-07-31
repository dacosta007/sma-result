<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  let dispatch = createEventDispatcher()

  function closePerf() {
    dispatch('closePref', 'close')
  }
</script>

<article class="preview-perf">
  <div class="preview-perf-content" out:fly={{duration: 500, y: -100}} in:fly={{duration: 500, y: 100}}>
    <header class="header-sec">
      <!-- a close btn. for closing the preview window -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <i class="close-btn lni lni-close" on:click={closePerf} on:keypress={closePerf}></i>
      <h3 class="title center-text">session performance</h3>
    </header>

    <slot />
  </div>
</article>

<style>
  .preview-perf {
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: rgb(0 0 0 / 30%);
    backdrop-filter: blur(3px);
  }
  .preview-perf-content {
    position: relative;
    background-color: var(--clr-white);
    width: 35%;
    margin: 4% auto;
    border-radius: 4px;
    padding: 0em 0em 1em;
    background-image: linear-gradient(var(--clr-site) 15%, var(--clr-white) 15%);
    background-repeat: no-repeat;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .header-sec {
    padding: 1em 0.5em;
    margin-bottom: 0.2em;
  }
  .header-sec h3 {
    color: var(--clr-white);
  }
  .close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 0.5em;
    font-size: 15px;
    font-weight: bold;
    background-color: rgb(106 104 114 / 26%);
    color: #eaf1ffc7;
    border-radius: 50%;
    cursor: pointer;
  }
  .close-btn:active {
    animation: clickBtn 0.5s ease;
  }
</style>