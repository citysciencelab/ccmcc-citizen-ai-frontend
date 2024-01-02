<template>
  <q-drawer
    :value="isBig || $bus.info[modelProp] !== false"
    x-bordered
    :content-class="{
      flex: true,
      'drawer-content--big': isBig
    }"
    :overlay="!isBig"
    :side="flipSideBig"
    :breakpoint="breakpoint4k"
    show-if-above
    :width="Math.min(40 * 16, $q.screen.width - 100)"
    @hide="hide"
    has-close="!isBig"
  >
    <div
      :class="{
        'info': true,
        'info--big': isBig,
        'q-mx-lg': isBig,
        'q-ma-xl': !isBig,
        flex: false && isBig,
        'flex-center': false && isBig
      }"
      :style="{
        top: $bus.yOffset[modelProp] + 'px'
      }"
      >
      <div class="text-right" v-if="!isBig">
        <q-btn
          icon="close"
          round
          flat
          @click="hide"
          />
      </div>
      <slot></slot>
    </div>
  </q-drawer>
</template>

<script>

const breakpoint4k = 3000

export default {
  name: 'InfoDrawer',
  props: ['side', 'value', 'modelProp'],
  data: function () {
    return {
      breakpoint4k
    }
  },
  computed: {
    isBig () {
      return this.$q.screen.width > breakpoint4k
    },
    flipSideBig () {
      return this.isBig
        ? (this.side === 'left' ? 'right' : 'left')
        : this.side
    }
  },
  methods: {
    hide () {
      this.$bus.info[this.modelProp] = false
    }
  }
}

</script>

<style lang="stylus">

.info-title
  font-size 300%
  font-weight bold
  line-height 1.25

.info--big .info-title
  margin-top 0

.info-text
  font-size 120%

.info-image
  margin-bottom 3em

.info-image-img
  max-width 100%
  width 20em
  height auto

.body--dark .drawer-content--big
  background var(--q-color-dark-page)

.info
  transition top 500ms

.info--big
  position relative
  width 100%
  height 0
  .info-item
    position absolute
    left 0
    top 0
    width 100%

</style>
