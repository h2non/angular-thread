describe('$thread', function () {
  var $thread, $$thread

  beforeEach(module('ngThread'))

  beforeEach(inject(function (_$$thread_, _$thread_) {
    $thread = _$thread_
    $$thread = _$$thread_
  }))

  describe('API', function () {
    it('should expose the thread API', function () {
      expect($$thread).to.be.an('function')
    })

    it('should expose the library version', function () {
      expect($$thread.VERSION).to.be.a('string')
    })

    it('should expose the main constructor', function () {
      expect($thread).to.be.an('function')
    })

    it('should expose the total static method', function () {
      expect($$thread.total).to.be.a('function')
    })
  })

  describe('run tasks', function () {
    it('should run a task synchronously', function (done) {
      $thread().run(function (num) {
        return Math.pow(num, 2)
      }, [ 2 ]).then(function (result) {
        expect(result).to.be.equal(4)
        done()
      })
    })

    it('should run a task asynchronously', function (done) {
      $thread().run(function (num, done) {
        return setTimeout(function () {
          done(null, Math.pow(num, 2))
        }, 100)
      }, [ 2 ]).then(function (result) {
        expect(result).to.be.equal(4)
        done()
      })
    })
  })
})
