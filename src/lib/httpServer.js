const http = require('http')


const server = http.createServer(function (req, res, next) {
    res.writeHead(302, {
        'Location': 'http://127.0.0.1:8089/flag',        
    })
    res.end()
})

server.listen(8080)