<template>
  <div class="screensizewarning">
    <q-banner>
      This web app was designed for bigger screens.<br/>
      It will work, but you will have to do a lot of scrolling to see the effects
      (the output charts are at the bottom of the page).<br/>
      Sorry!
    </q-banner>
  </div>
</template>

<style lang="stylus">

.screensizewarning
  padding 2em
  margin-top 4em
  @media (min-width: 600px)
    display none

</style>
