import express from 'express'
import config from '@config'

class Server {
  app

  constructor() {
    this.app = express()
  }

  initServer () {
    new Promise(resolve => {
      resolve(require('@loaders').default({ expressApp: this.app }))
    }).then(() => {
      this._startServer(this.app)
    }).catch((err) => {
      console.log('Error init server:', err)
    })
  }

  _startServer(app) {
    app.listen(config.port, () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      🌐 http://localhost:${config.port}
      ################################################
    `)
    })
  }
}

new Server().initServer()