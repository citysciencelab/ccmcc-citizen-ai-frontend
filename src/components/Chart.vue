<template>
  <q-card
    :class="{ 'chart-card': true, 'chart-card--active': active }"
    style="display: flex; flex-direction: column"
    @click="() => { if (enableOutputDrawer) infoClick() }"
    >
    <q-card-section
      class="chart-section-info"
      :style="{ cursor: enableOutputDrawer ? 'pointer' : 'auto' }"
      >
      <div class="row">
        <div class="col">
          <div class="bki-card-title"><span>{{ title }}</span></div>
          <!--
          <div
            style="min-height: 3em; min-height: 2lh"
            class="bki-card-subtitle"
            >{{ text }}</div>
          -->
        </div>
        <div class="col col-shrink" v-if="enableOutputDrawer">
          <q-icon :name="active ? 'help' : 'help_outline'" size="1.2em" style="position: relative; top: -0.075em" />
        </div>
      </div>
    </q-card-section>
    <q-card-section style="position: relative" class="chart-container-line">
      <LineChart
        style="height: 22vh; position: relative"
        :data="chartData"
        :options="chartOptions"
        />
      <ChartSpinner :show="loading" />
    </q-card-section>
    <!--
    <q-card-actions>
      <q-btn
        color="primary"
        icon="question_mark"
        round
        @click="$root.$emit('drawerOutput', id)"
        />
    </q-card-actions>
    -->
  </q-card>
</template>

<script>

/*
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
)
*/

import Chart from 'chart.js/auto'

import { enableOutputDrawer } from '../config.js'

import { getCssVar } from '../helpers.js'

import {
  Line as LineChart
} from 'vue-chartjs'

import ChartSpinner from './ChartSpinner'

/* https://www.chartjs.org/docs/latest/charts/line.html#cubicinterpolationmode */

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8]

let red
let green
let blend = []

export default {
  name: 'Chart',
  components: {
    LineChart,
    ChartSpinner
  },
  props: ['data', 'labels', 'id', 'title', 'text', 'yMin', 'yMax', 'yAuto', 'loading', 'active'],
  data: function () {
    return {
      enableOutputDrawer
    }
  },
  created () {
    green = getCssVar('bki-green-border')
    red = getCssVar('bki-red-border')
    for (let s = 0; s <= 100; s++) {
      blend[s] = getCssVar('bki-blend' + s)
    }
  },
  methods: {
    infoClick() {
      this.$bus.info.output = (this.$bus.info.output === this.id) ? false : this.id
      this.$bus.yOffset.output = this.$el.offsetTop
    }
  },
  computed: {
    pickyData () {
      // unfinished, labels missing
      return [
        { x: 0, y: this.data[0] },
        { x: 4, y: this.data[4] },
        { x: 11, y: this.data[11] },
        { x: 41, y: this.data[41] },
        { x: 50, y: this.data[50] }
      ]
    },
    chartData () {
      return {
        labels: this.labels,
        datasets: [{
          data: this.data,
          borderColor: getCssVar('q-color-primary'),
          // cubicInterpolationMode: 'monotone',
          // tension: 0.4,
          borderWidth: 10,
          borderCapStyle: 'round',
          pointStyle: false,
          segment: {
            borderColor: ctx => {
              // console.log('#', ctx)
              const y = ctx.p1.parsed.y
              const yBlend = 3
              if (y < -1 * yBlend) return red
              if (y > yBlend) return green
              const percentage = Math.round((y / yBlend) * 50 + 50)
              // const ret = `color-mix(in srgb, ${red}, ${green} ${percentage}%)`
              const ret = blend[percentage]
              return ret
            }
          },
          spanGaps: true
        }]
      }
    },
    chartOptions () {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: false
        },
        scales: {
          y: {
            grid: {
              display: true,
              lineWidth: _ => _.tick.value === 0 ? 1 : 0,
              color: this.$q.dark.isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'
            },
            ticks: { display: this.yAuto },
            border: { display: false },
            ...(this.yAuto ? {} : { min: this.yMin, max: this.yMax })
          },
          x: {
            grid: {
              display: true,
              drawBorder: false,
              lineWidth: _ => _.tick.value % 13 === 0 ? 1 : 0,
              color: this.$q.dark.isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'
            },
            ticks: {
              callback: (value, index, ticks) => {
                switch (value) {
                  case 0: return 'now'
                  case 22: return 'soon'
                  case 45: return 'future'
                  default: return null
                }
              },
              color: this.$q.dark.isActive ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
            },
            border: { display: false }
          }
        }
      }
    }
  }
}

</script>
