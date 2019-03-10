<template>
  <div>
    <v-subheader class="slider-header pl-0">{{displayName}}</v-subheader>
    <div class="slider-container">
      <h3 class="border-value">{{min}}</h3>
      <v-slider
        thumb-label="always"
        thumb-size="24"
        :min="min"
        :max="max"
        :value="value"
        @input="$emit('input', $event)"
      />
      <h3 class="border-value">{{max}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    displayName: String,
    suffix: String
  },
}
</script>

<style scoped>
  .slider-container {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .slider-header {
    font-size: 1.5rem;
  }

  .border-value {
    padding: 0 .5rem;
  }
</style>
