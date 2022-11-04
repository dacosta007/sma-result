<script>
  import { StudentStore } from "$lib/stores/StudentStore"
  import Studt from "./Studt.svelte";

  export let data

  let { students } = data

  StudentStore.set(students)

  function filterList(event) {
    if (event.target.value === '') return

    let category = (event.target.value).slice(0, 3)
    let level = (event.target.value).match(/\d/g).join('')

    if (category === '' & level === '') {
      listStudt = $StudentStore
      return
    }

    listStudt = $StudentStore.filter(items => items.class.category === category && items.class.level === level)
  }

  
  let listStudt = $StudentStore , totalStudt = $StudentStore
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<section class="studts-section">
  <header class="pg-header">
    <h1 class="center-text">print student slip</h1>
    <div class="input-field">
      <select placeholder=""  name="filterStudt" on:change={filterList}>
        <option value="">Filter Students By Classes</option>
        <option value="jss1">JSS 1</option>
        <option value="jss2">JSS 2</option>
        <option value="jss3">JSS 3</option>
        <option value="sss1">SSS 1</option>
        <option value="sss2">SSS 2</option>
        <option value="sss3">SSS 3</option>
      </select>
    </div>
  </header>

  <article class="studt-info-pg">
      {#each listStudt as std (std.studtId)}
        <Studt info={std} />
      {:else}
        <h1 class="text-center"><b>No Students</b> for this class</h1>
      {/each}
  </article>
</section>

<style>
  .pg-header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pg-header .input-field {
    min-width: 424px;
  }
  .studts-section {
    padding: 2em 5em;
    height: 100vh;
    min-height: 100%;
    background-color: var(--clr-off-white);
  }
  .studt-info-pg {
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }
</style>