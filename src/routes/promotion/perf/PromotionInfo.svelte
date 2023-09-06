<script>
  export let classInfo = {}
  export let currentSession = '' // this the session specified by the admin(which is to be worked on)
  export let promotion = [
    {
      clsFrom: { category: classInfo?.class?.category, level: classInfo?.class?.level, subLevel: classInfo?.class?.subLevel, department: classInfo?.class?.department },
      clsTo: {category: 'jss', level: '2', subLevel: 'a', department: null}, 
      session: currentSession, 
      date: (new Date()).toISOString()
    }
  ]
  export let graduation = { graduated: false, session: currentSession, date: (new Date()).toISOString()}

  const checkPromotion = promotion.findIndex(ele => ele?.session === currentSession)
  const promoInfo = checkPromotion != undefined || checkPromotion != -1 ? promotion[checkPromotion] : {}
</script>


<section class="promotion-info-sec">
  <h5 class="title">promotion info</h5>

  <div class="promo-container">
    <div class="current-cls">
      <div>current class</div>
      <div>
        <span>{classInfo?.class?.category}</span> <span>{classInfo?.class?.level}</span><sup>{classInfo?.class?.subLevel}</sup> <br>
        <span style="text-transform: capitalize; font-size: 14px; color: var(--clr-grey);">{classInfo?.class?.department ?? 'no Dept.'}</span>
      </div>
    </div>
    <div class="icon">
      <i class="lni lni-arrow-right"></i>
    </div>
    <div class="promotion">
      <!-- title to be shown ('Promoted' or 'Graduated') -->
      <div>
        {classInfo?.class?.department != null && classInfo?.class?.level === '3' ? 'graduation' : 'promoted'}
      </div>
      <!-- promotion/graduation info -->
      <div>
        {#if classInfo?.class?.department != null && classInfo?.class?.level === '3'}
          <!-- Only for sss 3 students for the session -->
          <div style="display: grid; gap: 0.3em">
            <span style="color: {graduation?.graduated === true ? '#89cb89' : 'var(--clr-txt)'};">
              {graduation?.graduated === undefined || graduation?.graduated === false ? 'Null' : 'Graduated!'}
            </span> 
            <span style="text-transform: capitalize; font-size: 14px; color: var(--clr-grey);">{graduation?.session ?? ''}</span>
          </div>
        {:else}
          <!-- for classes other than sss 3 students for the session -->
          <span style="text-transform: uppercase; display: flex; flex-wrap: wrap;">
            {promoInfo?.clsTo?.category ?? 'None' } {promoInfo?.clsTo.level ?? ''}<sup style="color: var(--accent-info);">{promoInfo?.clsTo.subLevel ?? ''}</sup>
          </span> 
          <span style="text-transform: capitalize; font-size: 14px; color: var(--clr-grey);">{promoInfo?.clsTo.department ?? 'no Dept.'}</span>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .promotion-info-sec {
    margin-top: 1em;
    padding: 0 1.2em;
  }
  .promotion-info-sec > h5 {
    color: var(--clr-grey);
    font-size: 0.9em;
  }
  .promo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .current-cls, .promotion {
    line-height: 1.3;
  }
  .current-cls > div:nth-child(1), .promotion > div:nth-child(1) {
    font-variant: all-petite-caps;
    color: var(--clr-grey);
  }
  .current-cls > div:nth-child(2) {
    text-transform: uppercase;
  }
  .icon i {
    padding: 5px;
    border-radius: 50%;
    background-color: var(--accent-info-lite);
    color: var(--accent-info);
    font-size: 1.2em;
  }
</style>