'use strict'

const Cache = require('../LRUCache.js').Cache  
const Node = require('../LRUCache.js').Node  
const mocha = require('mocha')  
const chai = require('chai')  
const should = chai.should()  
const expect = chai.expect  
const sinon = require('sinon')


describe('the cache', () => {  
  describe('when initializing the cache', () => {
    let cache

    beforeEach(() => {
      cache = new Cache()
    })

    it('constructs with the correct attributes', () => {
      let copy = {
        _limit: 100,
        _size: 0,
        _map: {},
        _head: null,
        _tail: null
      }
      expect(cache).to.deep.equal(copy)
    })

    // check all the methods exist...

  })

  describe('when using the cache', () => {
    let cache

    beforeEach(() => {
      cache = new Cache()
    })

    it('creates a new item when cache is not full', () => {
      cache.set('job', 'engineer')
      expect(cache.get('job')).equal('engineer')
    })

    it('creates a new item when cache is full', () => {
      cache._limit = 2
      cache.set('age', 28)
      cache.set('job', 'engineer')
      cache.set('uh oh', 'it is happening!')
      expect(cache._tail.value).equal('engineer')
      expect(cache._head.value).equal('it is happening!')
    })

    it('overwrites an item when it exists', () => {
      cache.set('age', 28)
      cache.set('age', 28)
      cache.set('job', 'engineer')
      cache.set('job', 'engineer')
      cache.set('uh oh', 'it is happening!')
      cache.set('uh oh', 'it is happening!')
      expect(cache._size).equal(3)
    })

    it('properly sets the head when cache is empty', () => {
      let node = new Node()
      cache.setHead(node)
      expect(cache._head).to.deep.equal(node)
    })

    it('properly sets the head when there is a head and tail node', () => {
      cache.set('age', 28)
      cache.set('job', 'engineer')
      let node = new Node()
      cache.setHead(node)
      expect(cache._head).to.deep.equal(node)
      expect(cache._tail.value).equal(28)
    })

    it('properly sets the head when cache has no tail', () => {
      cache.set('job', 'engineer')
      let node = new Node()
      cache.setHead(node)
      expect(cache._head).to.deep.equal(node)
      expect(cache._tail.value).equal('engineer')
    })

    it('removes an item', () => {
      cache.set('age', 28)
      cache.set('job', 'engineer')
      cache.remove('job')
      expect(cache._size).equal(1)
      expect(cache.get('job')).equal(undefined)
    })

    it('does not remove an item when empty', () => {
      expect(() => cache.remove('fake')).not.throws()
    })

    it('does not throw when removing an item that does not exist', () => {
      cache.set('real', 'item')
      expect(() => cache.remove('fake')).not.throws()
    })

    it('clears to a fresh state', () => {
      cache.set('age', 28)
      cache.set('job', 'engineer')
      cache.clear()
      let copy = {
        _limit: 10,
        _size: 0,
        _map: {},
        _head: null,
        _tail: null
      }
      expect(cache).to.deep.equal(copy)
    })

    it('returns a JSON representation', () => {
      cache.set('age', 28)
      cache.set('job', 'engineer')
      let json = cache.toJSON()
      let expected = [ { key: 'job', value: 'engineer' }, { key: 'age', value: 28 } ]
      expect(expected).to.deep.equal(json)
    })

    it('should call a function for each node', () => {
      cache.set('one', 1)
      cache.set('two', 2)
      cache.set('three', 3)
      let callback = sinon.spy((node) => node.value++)
      cache.forEach(callback)
      expect(callback.callCount).equal(3)
      expect(cache.get('one')).equal(2)
      expect(cache.get('two')).equal(3)
      expect(cache.get('three')).equal(4)
    })
  })
})