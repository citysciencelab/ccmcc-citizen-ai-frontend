var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
}).listen(8010, '0.0.0.0', function () {
  console.log('cors anywhere...')
})
