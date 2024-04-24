<script>
  import ResultHeader from "./ResultHeader.svelte";
  import ResultBody from "./ResultBody.svelte";
  
  export let reportData
  export let branchData = { 
    contact: {
      phone: ['08034110127', '08073161483'],
      email: ['info@afssibadan.com.ng', 'contact@afssib.com.ng'],
      schAddress: 'SW8/803a, Lodge Street, Oke-Ado, Ibadan, Oyo State.'
    }, 
    academicYear: {
      session: '2023/2024',
      currentTerm: 'second',
      currentTermBegins: '2024-01-09',
      currentTermEnds: '2024-03-22',
      nextTerm: 'third',
      nextTermBegins: '2024-04-22'
    } 
  }

  // get current term stored in the db or one specified by the admin
  let { currentTerm } = branchData.academicYear
</script>

<!-- <svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=0" />
</svelte:head> -->

<section class="slip-container">
  <div class="slip">
    <ResultHeader contactInfo={branchData.contact} />
    
    <ResultBody report={reportData} {currentTerm} />
  </div>
</section>

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