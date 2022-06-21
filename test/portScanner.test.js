const http = require('http')
const PortScanner = require("../src/lib/portScanner");


describe('scan-port', () => {
    test("scan all port", async () => {
        const result = await PortScanner({
            host: '127.0.0.1'
        })
        expect(result.length > 0).toBe(true)
    }, 30000);
    
    test("scan port from x to y", async () => {
        const result = await PortScanner({
            host: '127.0.0.1',
            from: 12,
            to: 50000
        })
        expect(result.length > 0).toBe(true)
    }, 30000)
    
    test("scan port 3000", async () => {
        const server = http.createServer(() => {})
        server.listen(3000, '127.0.0.1', async () => {
            const result = await PortScanner({
                host: '127.0.0.1',
                port: 3000
            })
            console.log(result)
            expect(result[0].status).toEqual('active')
            server.close()
        })
        
    })
    
})
