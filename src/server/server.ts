import * as express from 'express'
import * as path from 'path'
const port = process.env.PORT || 8080
const app = express()
const appRoot: string = process.cwd()

app.use('/static', express.static(appRoot))
app.use('/assets/', express.static(path.resolve('assets')))
app.use('/client.min.js', express.static(path.resolve('client.min.js')))
app.get('*', (req, res) => res.sendFile(`${appRoot}/index.html`))

app.listen(port, function () {
  console.log("Powered by FuseBox")
  console.log(`RPS game dapp listening on port ${port}!`)
})