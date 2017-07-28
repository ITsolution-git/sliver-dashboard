### Install global

```bash
npm install -g bower gulp
```

### Install bower asssets and node utils
It's better not to update bower.json as bower components are in strict dependency.

```bash
npm install
bower install
```

### Dependency Resolve in Bower
Set
    "angular": "1.6.5",
    "jquery": "^3.2.1"
in bower.json resolutions.

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