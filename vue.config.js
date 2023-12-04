const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
      devServer: {
        allowedHosts:'all',
    /*    https: {
          key: fs.readFileSync('./certs/kolareal-privateKey.key'),
          cert: fs.readFileSync('./certs/kolareal.crt'),
        },*/
       
    }
})
