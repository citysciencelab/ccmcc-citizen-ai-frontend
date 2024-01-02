import Vue from 'vue'

const bus = new Vue({
  data: function () {
    return {
      info: {
        input: false,
        output: false
      },
      yOffset: {
        input: 0,
        output: 0
      }
    }
  }
})

Vue.prototype.$bus = bus

// export default ({ app }) => {
