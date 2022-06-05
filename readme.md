
[![NPM Version](http://img.shields.io/npm/v/xcanner.svg?style=flat)](https://www.npmjs.org/package/xcanner)
[![NPM Downloads](https://img.shields.io/npm/dm/xcanner.svg?style=flat)](https://npmcharts.com/compare/xcanner?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=xcanner)](https://packagephobia.now.sh/result?p=xcanner)
# XCanner
- Scan server port
- Blast MD5 string 


# Install
```sh
npm install xcanner --global
```

# Command `xcanner scan-port`
## Usage
`xcanner scan-port [IP] [-options]`
### Example
```sh
$ xcanner scan-port 127.0.0.1 
// result 
[
  { host: '127.0.0.1', port: 5000, status: 'active' },
  { host: '127.0.0.1', port: 7000, status: 'active' },
  { host: '127.0.0.1', port: 7335, status: 'active' },
  { host: '127.0.0.1', port: 18412, status: 'active' },
  { host: '127.0.0.1', port: 27257, status: 'active' },
  { host: '127.0.0.1', port: 44950, status: 'active' },
  { host: '127.0.0.1', port: 44960, status: 'active' },
  { host: '127.0.0.1', port: 46624, status: 'active' },
  { host: '127.0.0.1', port: 49152, status: 'active' }
]

```

### Options


`-p, --port`
```sh
$ xcanner scan-port 127.0.0.1 -p 5000
// result 
[
  { host: '127.0.0.1', port: 5000, status: 'active' },
]

```

`-f, --from` & `-t, --to`
```sh
$ xcanner scan-port 127.0.0.1 -f 2000 -t 8000
// result 
  [
  { host: '127.0.0.1', port: 5000, status: 'active' },
  { host: '127.0.0.1', port: 7000, status: 'active' },
  { host: '127.0.0.1', port: 7335, status: 'active' }
]

```

# Command `xcanner md5-blast`
## Usage
`xcanner md5-blast [string] [-options]`
### Example
```sh
$ xcanner md5-blast 8a45ad -f 0 -t 99999999
// result 

7018045

```
