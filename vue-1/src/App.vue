<template>
  <v-app>
    <SettingsForm />
    <!-- <Game /> -->
  </v-app>
</template>

<script>
import SettingsForm from './components/Settings/SettingsForm.vue'
import Game from './components/Game.vue'

const localStorageKey = 'brainTrainerSettings'

export default {
  name: 'app',
  components: {
    SettingsForm,
    Game
  },
  created: function() {
    const savedSettings = JSON.parse(localStorage.getItem(localStorageKey))

    if (savedSettings)
      this.$store.commit('updateSettings', savedSettings)

    window.addEventListener('beforeunload',this.saveSettingsToLocalStorage);
  },
  destroyed: function() {
    window.removeEventListener('beforeunload', this.saveSettingsToLocalStorage);
  },
  methods: {
    saveSettingsToLocalStorage () {
      localStorage.setItem(localStorageKey, JSON.stringify(this.$store.state.settingsForm))
    }
  }
}
</script>

<style>
</style>
