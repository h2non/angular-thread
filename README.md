# angular-thread [![Build Status](https://api.travis-ci.org/h2non/angular-thread.svg?branch=master)][travis] [![Code Climate](https://codeclimate.com/github/h2non/angular-thread/badges/gpa.svg)](https://codeclimate.com/github/h2non/angular-thread) [![Version](https://img.shields.io/bower/v/angular-thread.svg)](https://github.com/h2non/angular-thread/releases)

[AngularJS](http://angularjs.org) primitive bindings for [thread.js](https://github.com/h2non/thread.js)

The most simple and funny multithreading ever, with Angular feelings

For more information about thread.js, please see library the [documentation](https://github.com/h2non/thread.js#basic-usage), usage [examples](https://github.com/h2non/thread.js/tree/master/examples) and be aware about [threads limitations](https://github.com/h2non/thread.js#threads-limitations)

It works with Angular >= 1.0

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
<script src="//cdn.rawgit.com/h2non/angular-thread/0.1.2/angular-thread.js"></script>
```

### Environments

- Chrome >= 5
- Firefox >= 3
- Safari >= 5
- Opera >= 10
- IE >= 8

### Setup

Load the module as dependency of your application
```js
var app = angular.module('app', ['ngThread'])
```

### Services

#### $thread

Main service to creating threads.
It's an injectable shortcut to `thread.js` public [API](https://github.com/h2non/thread.js#api)

```js
app.factory('CoolService', function ($thread) {
  var users = ['John', 'Michael', 'Jessica', 'Tom']
  var thread = $thread({
    env: { search: 'Tom' },
    require: 'http://cdn.rawgit.com/h2non/hu/0.1.1/hu.js'
  })

  thread.run(function (users) {
    return hu.filter(users, function (user) {
      return user === env.search
    })
  }, [ users ]).then(function (users) {
    console.log(users) // -> ['Tom']
  })
})
```

#### $threadRun

Shortcut service to run task in a new thread or custom thread.
See the original API [method documentation](https://github.com/h2non/thread.js#threadrunfn-env-args)

Running task in a new thread (created transparently).
The thread will be killed after the task finished with success or fail state
```js
app.factory('CoolService', function ($threadRun) {
  $threadRun(intensiveTask, /* { bind context }, [ task arguments ] */)
    .then(function (result) {
      // ...
    }, function (err) {
      // ...
    })
})
```

Reusing an existent pre-configured thread.
```js
app.factory('CoolService', function ($threadRun, $thread) {
  var thread = $thread({
    env: { timeout: 10 },
    require: 'http://cdn.rawgit.com/h2non/hu/0.1.1/hu.js'
  })
  // define the thread to reuse instead of creating a new one
  $threadRun.thread = thread
  $threadRun(intensiveTask).then(function (result) {
    // ...
  }, function (err) {
    // ...
  })
})
```

#### $threadPool

Built-in service to create pool of threads.
See the original API [method documentation](https://github.com/h2non/thread.js#threadpoolnumber)

```js
app.factory('CoolService', function ($threadPool) {
  var pool = $threadPool(10)
  pool.run(intensiveTask).then(function (result) {
    // ...
  }, function (err) {
    // ...
  })
})
```

#### $threadStore

Useful helper service to create containers to store and manage thread pools
that you could use in your application

It supports basic CRUD operations

```js
app.factory('CoolService', function ($threadStore, $thread) {
  var thread = $thread()
  // adding
  $threadStore.push(thread)
  // getting
  $threadStore.get() // -> [ Thread ]
  // checking
  $threadStore.has(thread) // -> true
  // removing
  $threadStore.remove(thread)
  // flushing
  $threadStore.flush()
  // counting
  $threadStore.total() // -> 0
})
```

##### $threadStore.push(thread)

Add a new thread to the container

##### $threadStore.get()

Get all the container threads

##### $threadStore.remove(thread)

Remove a given stored thread in the container

##### $threadStore.flush(thread)

Empty all the container store

##### $threadStore.total()

Return the total number of threads stored

##### $threadStore.has(thread)

Return `true` if the given thread is already stored in the container

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
