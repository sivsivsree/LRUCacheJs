# lrucache-nodejs

[![N|lrucache-nodejs](https://img.shields.io/badge/npm%20-available-blue.svg?longCache=true&style=popout-square)](https://www.npmjs.com/package/lrucache-nodejs)

A least recently used (LRU) cache is a cache implementation that discards the least recently used item when the cache becomes full. This requires keeping track of what was used when, and becomes the crux of maintaining an O(1) time complexity.

When an item is read from the cache (or added), it is marked as the most recently used item, and all other items get "shifted" over one. If the queue is full, the last item gets removed (shifted off). The key to this is using a linked list to rearrange the elements, and a map to store everything.

### Algorithm Analysis:
  - Time complexity: O(1)
  - Space complexity: O(n)






### Installation

__lrucache-nodejs__  is plain javascript runs on browser and nodejs

via __npm__
```sh
$ npm install lrucache-nodejs --save
```





### Methods 

Import the library:
```js
const LRUCache = require('lrucache-nodejs').Cache  
```

### Implementation and Functions:

```js
  const cache = LRUCache([cacheSize = 10]);

 // return an item from the cache
  cache.get(key)

  // add an item to the cache. overwrite if already exists
  cache.set(key, value) 

  // remove an item from the cache
  cache.remove(key) 

  // reset the cache to an empty and fresh state
  cache.clear(limit = 10) 

  // Traverse each cached item and call a function
  // callback is passed [node element, element number, cache instance] 
  cache.forEach(callback) 

  // return a JSON represenation of the cache
  cache.toJSON() 
```

#### Test:
```sh
$ npm test
```

(optional) Import the Node:
```js
const LRUCache = require('lrucache-nodejs').Node  
```


#### LRU Cache TL;DR

See [LRU Cache wiki](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)


License  😎
----

ISC



[![N|lrucache-nodejs](https://img.shields.io/badge/with%20🖤-%20Siv%20S-red.svg?longCache=true&style=popout-square)](http://facebook.com/sivsivsree)



