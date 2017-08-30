import * as express from 'express'
import * as path from 'path'
const port = process.env.PORT || 8080
const app = express()

// app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')))
// app.use("/", express.static(path.resolve("build")))
app.use("*", express.static(path.resolve("build")))
app.use("/assets", express.static(path.resolve("build", "assets")))

app.listen(port, function () {
  console.log("Powered by FuseBox")
  console.log(`RPS game dapp listening on port ${port}!`)
})