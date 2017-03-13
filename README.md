### Install global

```bash
npm install -g bower gulp
```

### Install bower asssets and node utils

```bash
npm install
bower install
```

### Make local config
```bash
cp app.local.example.js app.local.js
```
end edit file

### Build project and vendors
```bash
gulp vendor
gulp build
```