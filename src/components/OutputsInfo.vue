<template>
  <div class="info--outputs">
    <transition-group
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      >
      <div
        v-for="output in outputs"
        :key="output.id"
        v-show="output.id === showId"
        class="info-item"
        >
        <!--
        <div class="info-image">
          <img
            :src="`${output.id}.jpg`"
            class="info-image-img"
            />
        </div>
        -->
        <h1 class="info-title">{{ output.title }}</h1>
        <div class="info-text" v-html="output.description"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>

import { outputs } from '../bki-data.js'

export default {
  name: 'OutputsInfo',
  props: ['showId'],
  data: function () {
    return {
      outputs
    }
  }
}

</script>

