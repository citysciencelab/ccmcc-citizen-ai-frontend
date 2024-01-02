<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <!--
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="rightDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
      -->
    </q-header>

    <InfoDrawer
      model-prop="input"
      side="right"
    >
      <InputsInfo
        :showId="$bus.info.input"
        />
    </InfoDrawer>

    <InfoDrawer
      v-if="enableOutputDrawer"
      model-prop="output"
      side="left"
      @hide="$root.$emit('drawerOutput', false)"
    >
      <OutputsInfo
        :showId="$bus.info.output"
        />
    </InfoDrawer>

    <q-page-container>
      <router-view />
      <Menu />
    </q-page-container>
  </q-layout>
</template>

<script>

import InfoDrawer from '../components/InfoDrawer.vue'
import InputsInfo from '../components/InputsInfo.vue'
import OutputsInfo from '../components/OutputsInfo.vue'
import Menu from '../components/Menu.vue'

import { enableOutputDrawer, enableWebsite } from '../config.js'

export default {
  name: 'MainLayout',
  components: {
    InfoDrawer,
    InputsInfo,
    OutputsInfo,
    Menu
  },
  data () {
    return {
      enableOutputDrawer,
      enableWebsite,
      resizeWarning: false
    }
  },
  created () {
    window.addEventListener('resize', () => {
      if (this.resizeWarning) return
      this.resizeWarning = true
      this.$q.notify({
        color: 'white',
        textColor: 'black',
        icon: 'aspect_ratio',
        timeout: 0,
        message: `The charts on this page are not super responsive. If their layout seems broken, please reload the page now (and every time you resize the window or rotate the screen). Sorry!`,
        actions: [
          {
            label: 'Got it',
            color: 'black',
            handler: () => { this.resizeWarning = true }
          },
          {
            label: 'Reload now',
            color: 'black',
            handler: () => { document.location.reload() }
          }
        ]
      })
    })
  }
}
</script>
