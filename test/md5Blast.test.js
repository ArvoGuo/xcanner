const MD5Blast = require("../src/lib/md5Blast");


describe('md5-blast', () => {
    test("blast 8a45ad", async () => {
        let result = await MD5Blast({
            from: 1,
            to: 99999999,
            target: '8a45ad',
          });
          expect(Number(result)).toEqual(7018045)
    }, 10000);
})
