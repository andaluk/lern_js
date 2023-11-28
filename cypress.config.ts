import { defineConfig } from 'cypress'
import mongoose from 'mongoose'
import { MONGO_URL } from './src/const'

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on) {
      on('task', {
        async 'db:seed'() {
          mongoose.connect(MONGO_URL).then((obj) => {
            obj.connection.db.collection('login-query').drop()
          })
          return null
        },
        //...
      })
    },
  },
})
