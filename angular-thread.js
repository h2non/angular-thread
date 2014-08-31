/*! angular-thread - v0.1 - MIT License - https://github.com/h2non/angular-thread */
angular.module('ngThread', [])

  .constant('$$thread', window.thread)

  .config(['$$thread', function (thread) {
    if (typeof thread !== 'function') {
      throw new Error('thread.js is not loaded')
    }
  }])

  .provider('$thread', ['$$thread', function (thread) {
    function threadProvider() {
      return thread
    }
    threadProvider.$get = threadProvider
    return threadProvider
  }])

  .provider('$threadRun', ['$$thread', function (thread) {
    function threadRun() {
      function runner() {
        var job = runner.thread ? runner.thread : thread()
        return job.run.apply(job, arguments)
          .finally(function () { job.kill() })
      }
      runner.thread = null
      return runner
    }
    threadRun.$get = threadRun
    return threadRun
  }])

  .provider('$threadPool', ['$$thread', function (thread) {
    function poolFactory() {
      return function (num) {
        return thread().pool(num)
      }
    }
    poolFactory.$get = poolFactory
    return poolFactory
  }])

  .provider('$threadStore', ['$$thread', function ($$thread) {
    function store() {
      var buf = []
      return {
        get: function () {
          return buf.slice()
        },
        push: function (thread) {
          if (thread && thread instanceof $$thread.Thread) {
            if (!this.has(thread)) {
              buf.push(thread)
            }
          }
        },
        remove: function (thread) {
          var index = buf.indexOf(thread)
          if (index >= 0) buf.splice(index, 1)
          return index
        },
        flush: function () {
          buf.splice(0)
        },
        has: function (thread) {
          return buf.indexOf(thread) !== -1
        },
        total: function () {
          return buf.length
        }
      }
    }
    store.$get = store
    return store
  }])
