import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
  },
  mutations: {
    updateSettings (state, settings) {
      console.log('updateSettings:', state, settings)
      state.settingsForm = settings
    }
  }
})