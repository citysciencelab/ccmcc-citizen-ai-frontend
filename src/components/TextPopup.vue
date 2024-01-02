<template>
  <q-dialog :value="value" @hide="$emit('input', false)">
    <q-card :dark="false" class="textpopup">
      <q-card-section>
        <slot />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'TextPopup',
  props: ['value'],
  data: function () {
    return {
    }
  }
}

</script>
