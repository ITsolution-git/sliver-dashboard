### Install global

```bash
npm install -g bower gulp
```

### Install bower asssets and node utils

```bash
npm install
bower install
```

### Dependency Resolve

```
bower install angular angular-i18n angular-animate angular-route angular-sanitize angularjs-slider angular-strap angular-material angular-aria angular-bootstrap angular-ui-mask angular-loading-bar angular-bootstrap-switch angularjs-toaster angular-daterangepicker ui-router animate.css font-awesome bootbox ngBootbox lodash jquery-slimscroll toastr bootstrap-switch bootstrap-select eonasdan-bootstrap-datetimepicker bootstrap3-typeahead satellizer restangular ng-table ng-csv open-sans-fontface moment --save
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