<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
      rightDrawerOpen: false
    }
  },
  created () {
    window.__q = this.$q
    window.__root = this
  }
}

</script>
