<template>
    <v-container>
      <v-layout align-center justify-start column fill-height>
        <v-flex>
          <form>
            <Slider v-model="settingsForm.difficulty" :min="1" :max="5" displayName="Difficulty" />
            <Slider v-model="settingsForm.duration" :min="1" :max="10" displayName="Duration (min)" />
            <CheckboxRepeater 
              v-model="settingsForm.operations" 
              displayName="Operations" 
              name="operations"
              v-validate="'hasSelected'" 
            />
            <v-alert
              :value="errors.has('operations')"
              type="error"
              transition="slide-x-transition"
              outline
              class="validation-alert"
            >
              {{ errors.first('operations') }}
            </v-alert>
            <v-btn @click="play">Play</v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import Slider from './Slider.vue'
import CheckboxRepeater from './CheckboxRepeater.vue'
import { Validator } from 'vee-validate'

Validator.extend('hasSelected', (value, args) => value.some(x => x.value))

const dictionary = {
  custom: {
    operations: {
      hasSelected: () => 'No operations selected',
    },
  }
}

Validator.localize('en', dictionary)

export default {
  name: 'SettingsForm',
  components: {
    Slider,
    CheckboxRepeater
  },
  created() {
    const { settingsForm } = this.$store.state
    this.settingsForm = {...settingsForm, operations: settingsForm.operations.map(x => { return {...x}}) }
  },
  mounted() {
    this.$validator.validateAll()
  },
  data () {
    return {
      settingsForm: {
        difficulty: 2,
        duration: 5,
        operations: [
          {
            name: 'Addition',
            value: true
          },
          {
            name: 'Subtraction',
            value: true
          },
          {
            name: 'Multiplication',
            value: false
          },
          {
            name: 'Division',
            value: false
          },
          {
            name: 'Exponentiation',
            value: false
          }
        ],
      },
    }
  },
  methods: {
    play () {
      this.$validator.validateAll().then(valid => {

        if (valid)
          this.$store.commit('updateSettings', this.settingsForm)
      })
    },
  },
}
</script>

<style scoped>
  .validation-alert {
    padding: 0.5rem;
  }
</style>
