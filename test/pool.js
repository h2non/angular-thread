describe('$threadPool', function () {
  var $threadPool

  beforeEach(module('ngThread'))

  beforeEach(inject(function (_$threadPool_) {
    $threadPool = _$threadPool_
  }))

  it('should expose a pool API', function () {
    expect($threadPool).to.be.a('function')
  })

  it('should run asynchronous task', function (done) {
    var worker = $threadPool(2)
    worker.run(function (done) {
      setTimeout(done, 100)
    }).then(function () {
      expect(worker.threadPool).to.have.length(1)
      done()
    })
  })

  it('should run synchronous task', function (done) {
    $threadPool(2).run(function () {
      return 2 * 2
    }).then(function (result) {
      expect(result).to.be.equal(4)
      done()
    })
  })
})
