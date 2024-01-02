<template>
  <q-spinner
    x-style="position: absolute; left: calc(50% - 1rem); top: calc(50% - 1rem)"
    style="position: absolute; right: 1rem; top: 1rem"
    size="2rem"
    v-show="show"
    />
</template>

<script>

export default {
  name: 'ChartSpinner',
  props: ['show']
}

</script>
