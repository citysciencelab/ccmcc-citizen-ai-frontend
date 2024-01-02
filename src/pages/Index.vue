<template>
  <q-page
    class="flex flex-center"
    >
    <Radar
      v-if="$q.screen.width > 1000"
      ref="bg"
      classes="bg"
      :data="outputsData.map(o => o.data[o.data.length - 1])"
      :simple="true"
      :r-auto="false"
      :r-min="-settings.chartYLimit"
      :r-max="settings.chartYLimit"
      :labels="outputs.map(o => o.title.toUpperCase().split(' '))"
      />
    <div>
      <ScreenSizeWarning />
      <div :class="{ inout: true, inout__limitbudget: settings.limitBudget }">
        <div class="budget" v-if="settings.limitBudget">
          <q-slider
            :min="0"
            :max="Math.max(settings.budget, remainingBudget)"
            :value="remainingBudget"
            track-size="10px"
            thumb-size="0"
            readonly
            markers
            />
        </div>
        <div class="inputs">
          <!-- {{ input }} -->
          <!-- {{ activeInputId }} -->
          <Slider
            v-for="input in inputs"
            :key="input.id"
            v-model="input.value"
            :orig-value="input.origValue"
            :max-value="input.maxValue"
            @change="process"
            :title="input.title"
            :text="input.shortDescription"
            :text-icon="authorIcon[input.author]"
            :id="input.id"
            :maxInc="remainingBudget"
            :disable="processing"
            :active="$bus.info.input === input.id"
            />
        </div>
        <div class="outputs">
          <Radar
            :data="outputsData.map(o => o.data[o.data.length - 1])"
            :labels="outputs.map(o => o.title.toUpperCase().split(' '))"
            title="Summary"
            text="Sum"
            :r-auto="settings.normalizeCharts"
            :r-min="-settings.chartYLimit"
            :r-max="settings.chartYLimit"
            :loading="processing"
            />
          <!-- sort the outputs manually so they match the radar chart somewhat -->
          <Chart
            v-for="output in [outputs[0], outputs[4], outputs[1], outputs[3], outputs[2]]"
            :key="output.id"
            :data="outputsData.find(_ => _.id === output.id)?.data"
            :labels="outputsData.find(_ => _.id === output.id)?.labels"
            :id="output.id"
            :title="output.title"
            :text="shorten(output.description)"
            :y-auto="settings.normalizeCharts"
            :y-min="-settings.chartYLimit"
            :y-max="settings.chartYLimit"
            :loading="false"
            :active="$bus.info.output === output.id"
            />
        </div>
      </div>
    </div>
    <Settings
      v-model="showSettings"
      :settings.sync="settings"
      />
  </q-page>
</template>

<script>

import Chart from '../components/Chart.vue'
import Slider from '../components/Slider.vue'
import Radar from '../components/Radar.vue'
import Settings from '../components/Settings.vue'
import ScreenSizeWarning from '../components/ScreenSizeWarning.vue'

import { authorIcon } from '../config.js'
import { inputs, outputs } from '../bki-data.js'
import { apiGet } from '../api.js'

inputs.forEach(input => input.value = input.origValue)

const shorten = str => str?.replace(/<.*?>/g, '').split(' ').slice(0, 10).join(' ') + '…'

export default {
  name: 'PageIndex',
  components: {
    Chart,
    Slider,
    Radar,
    Settings,
    ScreenSizeWarning
  },
  data: function () {
    return {
      showSettings: false,
      settings: {
        website: true,
        darkMode: true,
        themed: true,
        limitBudget: true,
        budget: 5,
        normalizeCharts: false,
        chartYLimit: 12
      },
      inputs,
      outputs,
      outputsData: [],
      processing: false,
      activeInputId: false,
      activeOutputId: false,
      authorIcon
    }
  },
  computed: {
    inputsData () {
      return this.inputs.reduce((a, c, i) => {
        a[c.id] = c.value
        return a
      }, {})
    },
    inputsCost () {
      return this.inputs.reduce((a, c) => {
        return a + c.value / c.maxValue - c.origValue
      }, 0)
    },
    remainingBudget () {
      return this.settings.limitBudget
        ? this.settings.budget - this.inputsCost
        : Infinity
    }
  },
  created () {
    this.process()
    document.addEventListener('keypress', evt => {
      if (evt.keyCode === 13) { // Enter
        this.showSettings = true
      }
      console.log(evt.keyCode, this.showSettings)
    })
    document.body.classList.toggle('themed', this.settings.themed)
    this.$q.dark.set(this.settings.darkMode)
  },
  mounted () {
    this.$root.$el.appendChild(this.$refs.bg.$el)
  },
  methods: {
    async process () {
      console.log('process', this.inputsData)
      this.processing = true
      let r
      await apiGet(
        this.inputsData,
        (status, progress) => { console.info('progress', status, progress) },
        (status, results) => {
          this.processing = false
          if (status !== 'successful') throw new Error('API not successful', results)
          this.processResults(results)
        },
        err => {
          this.processing = false
          console.error('API error', err.message, err)
          this.$q.notify({
            color: 'white',
            textColor: 'black',
            icon: 'warning',
            caption: 'API error',
            message: err.message,
            timeout: 0,
            actions: [ { label: 'Dismiss', color: 'black' } ]
          })
        })
        .catch(err => {
          this.processing = false
          console.error('API error', err.message, err)
          this.$q.notify({
            color: 'white',
            textColor: 'black',
            icon: 'warning',
            caption: 'API error',
            message: err.message,
            timeout: 0,
            actions: [ { label: 'Dismiss', color: 'black' } ]
          })
        })
      // this.outputsData = r
    },
    processResults (results) {
      this.outputsData = results
    },
    shorten: (str) => shorten(str)
  },
  watch: {
    'settings.themed': function (nV) {
      document.body.classList.toggle('themed', nV)
    },
    'settings.darkMode': function (nV) {
      this.$q.dark.set(nV)
    }
  }
}
</script>

<style lang="stylus">

$breakpoint_xs = 600px
$breakpoint_sm = 800px
$breakpoint_md = 1000px
$breakpoint_lg = 1600px

.inout
  height 100vh
  @media (min-width: $breakpoint_xs)
    display grid
    grid-template-columns 1.5fr 1fr
    grid-template-rows 1fr
    grid-template-areas \
      "inputs outputs"
    align-items stretch
  @media (min-width: $breakpoint4k)
    font-size 120%
    align-items center

.inout__limitbudget
  @media (min-width: $breakpoint_xs)
    grid-template-rows 2em 1fr
    grid-template-areas \
      "budget outputs" \
      "inputs outputs"

.inputs
  hyphens manual
  padding 2em
  @media (min-width: $breakpoint_lg)
    grid-area inputs
  @media (min-width: $breakpoint_xs)
    padding 3em 2em 3em 3em
    max-height 100%
    overflow-y auto
    overflow-x hidden
    display grid
    grid-gap 1em
    grid-template-columns 1fr 1fr
    grid-template-rows 1fr 1fr 1fr 1fr 1fr 1fr
  @media (min-width: $breakpoint_sm)
    grid-template-columns 1fr 1fr 1fr
    grid-template-rows 1fr 1fr 1fr 1fr
  @media (min-width: $breakpoint_md)
    grid-template-columns 1fr 1fr 1fr 1fr
    grid-template-rows 1fr 1fr 1fr
  @media (min-width: $breakpoint_lg)
    grid-template-columns 1fr 1fr 1fr 1fr 1fr 1fr
    grid-template-rows 1fr 1fr
  @media (min-width: $breakpoint4k)
    grid-template-columns 1fr 1fr 1fr 1fr
    grid-template-rows 1fr 1fr 1fr

.outputs
  padding 2em
  @media (min-width: $breakpoint_xs)
    grid-area outputs
  @media (min-width: $breakpoint_xs)
    padding 3em 3em 3em 2em
    max-height 100%
    overflow-y auto
    overflow-x hidden
    display grid
    grid-template-columns 1fr
    grid-template-rows 1fr 1fr 1fr 1fr 1fr 1fr
    grid-gap 1em
  @media (min-width: $breakpoint_md)
    grid-template-columns 1fr 1fr
    grid-template-rows 1fr 1fr 1fr

.budget
  padding 0 2em
  @media (min-width: $breakpoint_xs)
    padding 0 2em 0 3em

.chart-container-radar
.chart-container-line
  width 80vw
  @media (min-width: $breakpoint_xs)
    width 30vw
  @media (min-width: $breakpoint_md)
    width 15vw
  @media (min-width: $breakpoint4k)
    width 15vw

.bg
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  max-height 100%
  background var(--bki-green-bg)
  z-index -1
  overflow hidden
  canvas
    position absolute
    top 0
    left 0
    width 100%
    height 100%

body
  // overflow-y hidden !important

</style>
