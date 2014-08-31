# angular-thread [![Build Status](https://api.travis-ci.org/h2non/angular-thread.svg?branch=master)][travis]

[AngularJS](http://angularjs.org) primitives bindings for [thread.js](https://github.com/h2non/thread.js).
The most funny and simple multithreading ever (with Angular feelings)

## Installation

Via [Bower](http://bower.io)
```bash
bower install angular-thread
```
Via [Component](http://component.io/)
```bash
component install h2non/angular-thread
```

Or loading the script remotely
```html
<script src="//cdn.rawgit.com/h2non/angular-thread/0.1.0/angular-thread.js"></script>
```

### Environments

- Chrome >= 5
- Firefox >= 3
- Safari >= 5
- Opera >= 10
- IE >= 8

### Setup

Load the module as dependency
```js
var app = angular.module('app', ['ngThread'])
```

### Services

#### $thread

Inject and use the provider
```js
app.factory(function ($thread) {
  $thread.run(function () {

  })
})
```

#### $threadRun

#### $threadPool

#### $threadStore

#### $$thread

## Contributing

Wanna help? Cool! It will be appreciated :)

You must add new test cases for any new feature or refactor you do,
always following the same design/code patterns that already exist

### Development

Only [node.js](http://nodejs.org) is required for development

Clone the repository
```bash
$ git clone https://github.com/h2non/angular-thread.git && cd angular-thread
```

Install dependencies
```bash
$ npm install
```
```bash
$ bower install
```

Generate browser bundle source
```bash
$ make browser
```

Run tests
```bash
$ make test
```

## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: http://travis-ci.org/h2non/angular-thread
