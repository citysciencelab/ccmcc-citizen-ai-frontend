<template>
  <div :class="'radar ' + classes" :style="style">
    <div v-if="simple" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%">
      <svg height="0" style="max-height: 0px">
        <defs>
          <filter id="blur" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" :stdDeviation="$q.screen.width / 20" />
          </filter>
        </defs>
      </svg>
      <!-- the style.transform is manually adjusted to best reflect the "pentagon" on a 16:9 landscape -->
      <RadarChart
        :data="chartData"
        :options="chartOptions"
        style="width: 100vw; height: 100vh; filter: url(#blur); transform: scale(2.4, 1.6) translateY(5%)"
        />
    </div>
  <q-card v-if="!simple">
    <!--
    <q-card-section
      style="cursor: pointer"
      @click="$root.$emit('drawerOutput', 'radar')"
      >
      <div class="row">
        <div class="col">
          <div class="bki-card-title">{{ title }}</div>
          <div class="bki-card-subtitle">{{ text }}</div>
        </div>
        <div class="col col-shrink">
          <q-icon name="help_outline" size="1.2em" />
        </div>
      </div>
    </q-card-section>
    -->
    <q-card-section style="position: relative" class="chart-container-radar">
      <RadarChart
        :data="chartData"
        :options="chartOptions"
        />
      <ChartSpinner :show="loading" />
    </q-card-section>
  </q-card>
  </div>
</template>

<script>

import Chart from 'chart.js/auto'

import ChartSpinner from './ChartSpinner'

import { getCssVar } from '../helpers.js'

import {
  Radar as RadarChart
} from 'vue-chartjs'

const valueBlend = (v, noWrap) => `${noWrap ? '' : 'var(--'}bki-blend${Math.max(0, Math.min(100, Math.round(50 + v * 10)))}${noWrap ? '' : ')'}`

export default {
  name: 'Radar',
  props: ['data', 'labels', 'title', 'text', 'rAuto', 'rMin', 'rMax', 'loading', 'simple', 'classes'],
  components: {
    RadarChart,
    ChartSpinner
  },
  data: function () {
    return {
      zero: []
    }
  },
  watch: {
    data (nV) {
      if (this.zero.length > 0) return
      this.zero = this.data.map(_ => 0)
    }
  },
  computed: {
    style () {
      if (!this.simple) return ''
      return 'background: conic-gradient(' +
        [...this.data, this.data[0]].map(_ => valueBlend(_)).join(',') +
        ')'
    },
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            radius: 0,
            data: this.simple
              ? this.data.map(_ => 8 - _ * 0.2)
              : this.data,
            tension: 0.4,
            fill: this.simple
              ? {
                target: 'start',
                below: '#000' // getCssVar('bki-green-border')
              }
              : {
                target: 'start',
                below: getCssVar('bki-green-fill')
              },
            borderColor: this.simple ? '#000' : 'transparent', // getCssVar('bki-green-border'),
            // pointBorderColor: 'transparent',
            ...(this.simple ? {} : {
              pointBackgroundColor: (_) => {
                return getCssVar(valueBlend(_.parsed.r, true))
              },
              pointBorderWidth: 0,
              // pointBackgroundColor: 'purple',
              pointRadius: 8,
              pointHoverRadius: 8
            }),
            borderWidth: 10,
            // fill: false,
            // backgroundColor: this.data.map(x => x < 0 ? 'red' : 'green'),
            // not supported for radar?
            // segment: { borderColor: (ctx, v) => { console.log('#', ctx, v); return v < 0 ? 'red' : 'green' } },
            // spanGaps: true
          },
          ...(!this.simple ? [{
            radius: 0,
            data: this.zero,
            tension: 0.4,
            // disable animation here, because ChartJS over-animates the +1nth dataset on *any* change - might be a bug? of vue-chartjs?
            // we accept that we miss the animation with normalize:true
            animation: false,
            fill: {
              target: 'start',
              below: getCssVar('q-color-negative')
            },
            borderWidth: 10,
            borderColor: getCssVar('q-color-negative')
          }] : []),
        ]
      }
    },
    chartOptions () {
      return {
        responsive: true,
        maintainAspectRatio: !this.simple,
        plugins: {
          legend: { display: false },
          tooltip: false
        },
        scales: {
          r: {
            angleLines: { display: false },
            grid: {
              display: !this.simple,
              lineWidth: _ => _.tick.value === 0 ? 1 : 0,
              color: this.$q.dark.isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.6)'
            },
            ticks: {
              display: !this.simple && this.rAuto,
              color: this.$q.dark.isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.6)'
            },
            border: { display: false },
            ...(this.rAuto ? {} : { min: this.rMin, max: this.rMax }),
            pointLabels: this.simple ? false : {
              font: {
                size: 11,
                family: 'opensans_cond',
                weight: '800'
              },
              color: this.$q.dark.isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
            }
          }
        }
      }
    }
  }
}

</script>

<style lang="stylus">

</style>
