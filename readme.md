# XCanner

# Install
```sh
npm install xcanner --global
```

# Usage
## Xcanner scan-port
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