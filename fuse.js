const {CSSModules, CSSPlugin, CSSResourcePlugin, EnvPlugin, FuseBox, JSONPlugin, QuantumPlugin, PostCSSPlugin, WebIndexPlugin, Sparky} = require('fuse-box')
const express = require('express')
const resolveId = require('postcss-import/lib/resolve-id')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production' ? true : false
const POSTCSS_PLUGINS = [
  require('postcss-import')({
    root: path.join(__dirname, 'src', 'ui'),
    resolve: (id, base, options) => resolveId(id, options.root, options),
  }),
  require('postcss-cssnext')({
    browsers: ['ie >= 11', 'last 2 versions'],
  }),
]
// const outputName = isProduction ? '$name.min.js' : '$name.js'
// Producer
const fuse = FuseBox.init({
  alias: {
    'reactstrap-tether': '', // todo Remove this hack to fix import of reactstrap-tether
    '../../customModules/protocol/index.js': 'protocol/index.js', // hack to have working path for app and tests
    '../../customModules/protocol/truffle.js': 'protocol/truffle.js',
  },
  cache: !isProduction,
  debug: true,
  experimentalFeatures: true, // remove next major release of fb
  homeDir: 'src',
  //ignoreModules : [],
  log: true,
  modulesFolder: 'customModules',
  //output: `build/${outputName}`,
  output: 'build/$name.js',
  plugins: [
    EnvPlugin({
      NETWORK: process.env.NETWORK || 'testrpc',
      NODE_ENV: isProduction ? 'production' : 'development',
    }),
    [/components.*\.css$/, PostCSSPlugin(POSTCSS_PLUGINS), CSSModules(), CSSPlugin()],
    [PostCSSPlugin(POSTCSS_PLUGINS), CSSResourcePlugin({
      dist: 'build/assets',
      resolve: f => `/assets/${f}`,
    }), CSSPlugin()],
    JSONPlugin(),
    WebIndexPlugin({
      //bundles: ['assets/bundle.min.js'],
      template: 'src/ui/index.html',
      path: '.',
    }),
    isProduction && QuantumPlugin({
      api: (core) => {
        core.solveComputed('bn.js/lib/bn.js') //todo Remove when BN fix it
      },
      bakeApiIntoBundle: 'assets/bundle.min.js',
      ensureES5: true,
      removeExportsInterop: false,
      target: 'universal',
      treeshake: true,
      uglify: true,
    }),
  ],
  sourceMaps: !isProduction,
  // target: 'browser',
  useJsNext: false,
})
// Tasks
Sparky.task('clean-cache', () => Sparky.src('.fusebox/*').clean('.fusebox/'))
Sparky.task('default', ['clean', 'copy-assets', 'run'], () => {})
Sparky.task('clean', () => Sparky.src(path.resolve('build')).clean(path.resolve('build')))
Sparky.task('copy-assets', () => Sparky.src('assets/**/**.*', {base: './src/ui'}).dest('build'))
Sparky.task('run', () => {
  if (isProduction) {
    fuse.bundle('assets/bundle.min.js')
      .watch('server/**') // watch only server related code
      .instructions('> [../server.ts]')
      // Execute process right after bundling is completed
      // launch and restart express
      .completed(proc => proc.start())
  }
  else {
    fuse.dev({open: false, port: 8085, root: 'build'}, server => {
      const app = server.httpServer.app
      app.use('/assets/', express.static(path.resolve('build', 'assets')))
      app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')))
    })
    fuse.bundle('assets/app')
      .target('browser')
      .instructions(`>ui/index.tsx`)
      .hmr()
      .watch()
  }
  fuse.run()
})