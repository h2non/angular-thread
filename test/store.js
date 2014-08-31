describe('$threadStore', function () {
  var $threadStore, $thread

  beforeEach(module('ngThread'))

  beforeEach(inject(function (_$thread_, _$threadStore_) {
    $thread = _$thread_
    $threadStore = _$threadStore_
  }))

  it('should expose a pool API', function () {
    expect($threadStore).to.be.an('object')
  })

  it('should push a thread', function () {
    $threadStore.push($thread())
    expect($threadStore.total()).to.be.equal(1)
  })

  it('should push and fetch a thread', function () {
    var thread = $thread()
    $threadStore.push(thread)
    expect($threadStore.total()).to.be.equal(1)
    expect($threadStore.has(thread)).to.be.true
  })

  it('should not push if the type is invalid', function () {
    $threadStore.push({})
    expect($threadStore.total()).to.be.equal(0)
  })

  it('should remove an item', function () {
    var thread = $thread()
    $threadStore.push(thread)
    expect($threadStore.remove(thread)).to.be.equal(0)
    expect($threadStore.has(thread)).to.be.false
  })

  it('should flush the container', function () {
    $threadStore.push($thread())
    $threadStore.flush()
    expect($threadStore.total()).to.be.equal(0)
  })
})
