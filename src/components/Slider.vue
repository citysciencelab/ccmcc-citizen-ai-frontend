<template>
  <q-card
    :class="{
      'slider-card': true,
      'slider-card--active': active,
      'slider-card--negative': isNegative
    }"
    :style="offsetStyle"
    >
    <q-responsive
      ratio="1"
      @click="infoClick"
      >
      <img
        :src="`${id}.jpg`"
        class="slider-thumb"
        :style="{ opacity: imgOpacity }"
        />
    </q-responsive>
    <q-card-section
      class="slider-section-info"
      @click="infoClick"
      >
      <div class="row">
        <div class="col">
          <div class="bki-card-title"><span>{{ title }}</span></div>
          <div class="bki-card-subtitle">
            <q-icon :name="textIcon" />
            {{ text }}
          </div>
        </div>
        <div class="col col-shrink">
          <q-icon :name="active ? 'help' : 'help_outline'" size="1.2em" style="position: relative; top: -0.075em" />
        </div>
      </div>
    </q-card-section>
    <q-card-section
      class="slider-section-slider"
      >
      <q-slider
        :value="value"
        @input="v => $emit('input', v)"
        :min="0"
        :max="maxValue"
        :inner-max="innerMax"
        :step="1"
        :disable="disable"
        snap
        markers
        inner-track-color="bki-slider-track"
        track-color="transparent"
        color="primary"
        :marker-labels="markerLabel(origValue)"
        :class="{
          'slider--changed': value !== origValue
        }"
        @change="$emit('change')"
        track-size="10px"
        />
    </q-card-section>
    <!--
    <q-card-actions>
      <q-btn
        color="primary"
        icon="question_mark"
        round
        @click="$root.$emit('drawerInput', id)"
        />
    </q-card-actions>
    -->
  </q-card>
</template>

<script>

const markerLabels = {
  '-2': '--',
  '-1': '-1',
  0: '0',
  1: '+1',
  2: '+2',
  3: '+3',
  4: '+4'
}

const markerLabel = origVal => val => ({
  label: markerLabels?.[val - origVal],
  classes: 'marker-label' + (origVal === val ? ' marker-label--origval' : '')
})

let selectionEl

export default {
  name: 'Slider',
  props: ['id', 'value', 'origValue', 'maxValue', 'title', 'text', 'textIcon', 'maxInc', 'disable', 'active'],
  data: function () {
    return {
      markerLabel
    }
  },
  methods: {
    infoClick() {
      this.$bus.info.input = (this.$bus.info.input === this.id) ? false : this.id
      // limits the last row artifically so text is not cropped
      this.$bus.yOffset.input = Math.min(this.$el.offsetTop, this.$q.screen.height * 0.5)
    }
  },
  computed: {
    isNegative () {
      return this.value < this.origValue
    },
    innerMax () {
      return Math.floor(this.value + this.maxInc * this.maxValue)
    },
    imgOpacity () {
      return (this.value / this.maxValue) * 0.8 + 0.2
    },
    offsetStyle () {
      const offsetSelectionLeft = this.isNegative
        ? this.value / this.maxValue
        : this.origValue / this.maxValue
      const offsetSelectionWidth = this.isNegative
        ? (this.origValue - this.value) / this.maxValue
        : (this.value - this.origValue) / this.maxValue
      return {
        '--offset-selection-left': (offsetSelectionLeft * 100) + '%',
        '--offset-selection-width': (offsetSelectionWidth * 100) + '%'
      }
    }
  }
}

</script>

<style lang="stylus">

.marker-label
  width 1.5em
  height 1.5em
  line-height 1.5
  text-align center
  border-radius 50%
  transition background-color 800ms
  letter-spacing 0.1em
  font-weight bold

// .slider--changed .marker-label--origval
//   background rgba(0, 0, 0, 0.1)
//   body.body--dark &
//     background rgba(255, 255, 255, 0.1)

.slider-card
  display flex
  flex-direction column

.slider-section-info
  order 2
  flex-grow 1
  cursor pointer

.slider-section-slider
  order 1

.slider-thumb
  background rgba(0, 0, 0, 0.3)
  transition opacity 500ms

.bki-card-title
  font-size 125%
  font-weight 700
  line-height 1.35rem
  margin-bottom 0.3em
  word-break break-word
  hyphens auto

.bki-card-subtitle
  font-size 100%
  line-height 1.35rem

.slider-card .q-slider__selection[style]
  left var(--offset-selection-left) !important
  width var(--offset-selection-width) !important

.slider-card--negative .q-slider__thumb-shape path
  fill white
  .body--dark &
    fill black

</style>
