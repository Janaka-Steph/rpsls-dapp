import * as express from 'express'
import * as path from 'path'
const port = process.env.PORT || 8080
const app = express()
const appRoot: string = process.cwd()

app.use('/assets', express.static(path.resolve(appRoot, 'assets')))
app.get('/client.min.js', (req, res) => res.sendFile(`${appRoot}/client.min.js`))
app.get('*', (req, res) => res.sendFile(`${appRoot}/index.html`))

app.listen(port, function () {
  console.log("Powered by FuseBox")
  console.log(`RPS game dapp listening on port ${port}!`)
  console.log(`Served from ${appRoot}`)
})