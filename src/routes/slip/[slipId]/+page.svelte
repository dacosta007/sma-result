<script>
  import SlipHeader from "$lib/components/SlipHeader.svelte";
  import SlipBody from "./SlipBody.svelte";

  export let data

  const { std, branchInfo } = data
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=0" />
</svelte:head>

<article class="slip-container">
  <section class="slip">
    <SlipHeader slipTitle={'Student Pre-Registration'} {branchInfo} />

    <SlipBody {std} {branchInfo} watermark={'reg slip'} />
  </section>
</article>

<style>
  .slip-container {
    display: flex;
    justify-content: center;
    margin-top: 2em;
    margin-bottom: 2em;
    width: 100%;
  }
  .slip {
    background-color: var(--clr-white);
    color: var(--clr-txt);
    border-radius: 1px;
    width: 760px;
    padding: 2em 3em;
  }

  @media print {
    .slip {
      margin: 0;
      padding: 0;
    }
  }
</style>