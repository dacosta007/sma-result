<script>
  export let stdInfo = {}

  const {name, studtId, class:cls} = stdInfo
</script>

<article class="studt-info-sec">
  <div class="info-sec">
    <!-- student-img -->
    <div class="std-img">
      <i class="lni lni-user"></i>
    </div>
    <div class="info">
      <!-- student name(first & last) -->
      <div class="std-name">
        <span>{name.first}</span> <span>{name.last}</span>
      </div>
      <!-- student ID & current class -->
      <div class="std-id-cls">
        <span>{studtId}</span> <span><span> {cls.category} {cls.level}</span><sup>{cls.subLevel}</sup></span>
      </div>
      {#if cls?.department != null || cls?.department != undefined}
        <!-- department -->
        <div class="dept">{cls.department}</div>
      {/if}
    </div>
  </div>
</article>


<style>
  .studt-info-sec {
    padding: 0 1.3em;
    margin: 0.5em 0;  
  }
  .info-sec {
    background-color: var(--clr-white);
    border-radius: 6px;
    box-shadow: 0 8px 19px rgb(0 0 0 / 10%);
    padding: 0.5em;
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .std-img {
    border-radius: 4px;
  }
  .std-img i {
    font-size: 50px;
    background-color: var(--accent-info-lite);
    color: var(--accent-info);
    border-radius: 4px;
    padding: 0.1em;
  }
  .info {
    line-height: 1.4;
  }
  .std-name {
    font-size: 17px;
    text-transform: capitalize;
    font-family: var(--font-quicksand);
  }
  .std-id-cls {
    display: flex;
    align-items: center;
    gap: 1em;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-size: 14px;
  }
  .std-id-cls > span {
    display: inline-flex;
    color: var(--clr-grey);
    position: relative;
  }
  .std-id-cls > span:nth-child(2)::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: var(--clr-grey);
    border-radius: 50%;
    top: 37%;
    left: -20%;
  }
  .std-id-cls > span:nth-child(2) sup {
    color: var(--accent-info);
  }
  .dept {
    color: var(--clr-grey);
    text-transform: capitalize;
    font-size: 14px;
    letter-spacing: 0.4px;
  }
</style>