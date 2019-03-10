<template>
  <div>
    <v-subheader class="operations-header pl-0">{{displayName}}</v-subheader>
    <v-checkbox v-for="(field, index) in value" 
      color="primary"
      :key="field.name"
      :label="field.name"
      :input-value="field.value"
      @change="onChange($event, index)"
    />
  </div>
</template>

<script>
export default {
  name: 'CheckboxRepeater',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    displayName: String,
  },
  methods: {
    onChange (checked, index) {
      const updatedValue = this.value.map((x, i) => {
        if (i === index)
          x.value = checked

        return x
      })
      this.$emit('input', updatedValue)
    },
  }
}
</script>

<style scoped>
  .operations-header {
    font-size: 1.5rem;
  }
</style>
