<template>
  <q-dialog :value="value" @input="v => $emit('input', v)">
    <q-card>
      <q-card-section>
        <div
          v-for="(v, k) in settings"
          :key="k"
          >
          <q-toggle
            v-if="typeof v === 'boolean'"
            :value="v"
            :label="k"
            @input="v => $emit('update:settings', { ...settings, ...{ [k]: v } })"
            />
          <q-input
            v-else-if="typeof v === 'number'"
            type="number"
            :value="v"
            :label="k"
            @input="v => $emit('update:settings', { ...settings, ...{ [k]: +v } })"
            />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'Settings',
  props: ['value', 'settings'],
  data: function () {
    return {
    }
  }
}

</script>

