describe('$threadRun', function () {
  var $thread, $threadRun

  beforeEach(module('ngThread'))

  beforeEach(inject(function (_$thread_, _$threadRun_) {
    $thread = _$thread_
    $threadRun = _$threadRun_
  }))

  it('should expose the run function', function () {
    expect($threadRun).to.be.a('function')
  })

  it('should run task asynchronously', function (done) {
    $thread.killAll()
    $threadRun(function (num, done) {
      done(null, num * 2)
    }, [ 2 ]).then(function (result) {
      expect(result).to.be.equal(4)
      done()
    })
  })

  it('should kill the thread after task execution', function () {
    expect($thread.total()).to.be.equal(0)
  })
})
