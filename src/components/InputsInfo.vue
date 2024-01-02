<template>
  <div class="info--inputs">
    <transition-group
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      >
      <div
        v-for="input in inputs"
        :key="input.id"
        v-show="input.id === showId"
        class="info-item"
        >
        <div class="info-image">
          <img
            :src="`${input.id}.jpg`"
            class="info-image-img"
            />
        </div>
        <h1 class="info-title">{{ input.title }}</h1>
        <p>
          <q-icon :name="authorIcon[input.author]" />
          {{ authorByline[input.author] }}
        </p>
        <div v-html="input.description"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>

import { inputs } from '../bki-data.js'
import { authorIcon, authorByline } from '../config.js'

export default {
  name: 'InputsInfo',
  props: ['showId'],
  data: function () {
    return {
      inputs,
      authorIcon,
      authorByline
    }
  }
}

</script>

<style lang="stylus">

.info--inputs
  .info-text
    // white-space pre-line

</style>
