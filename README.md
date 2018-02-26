# fetch-unless-cached

Store fetch responses in localStorage with expire timers! And fetch only if the timer has expired.

<hr/>

[![](https://nodei.co/npm/fetch-unless-cached.png?compact=true)](https://nodei.co/npm/fetch-unless-cached/)

[![npm](https://img.shields.io/npm/dm/fetch-unless-cached.svg?style=for-the-badge)](https://www.npmjs.com/package/fetch-unless-cached)
[![npm](https://img.shields.io/npm/l/fetch-unless-cached.svg?style=for-the-badge)](https://www.npmjs.com/package/fetch-unless-cached)

## What is it really?

   - A wrapper on top isomorphic-fetch
   - When data is fetched, it's stored in localStorage with an expire timer
   - When data is reqeusted, it checks in the storage and only fetches if needed, otherwise it resolves the cached data
   

## Installation

```shell
npm i --save fetch-unless-cached
```

## Usage

1. Use the inbuilt cached fetch which caches response for 600 minutes.

   ```javascript
   import cachedFetch from "fetch-unless-cached";
   ```

2. Or create a custom cached fetch function with your own duration

```javascript
import {createfetchUnlessCached} from "fetch-unless-cached"

/**
 * Create a custom fetch function which caches response for 300 minutes
 */
const cachedFetch = createfetchUnlessCached(300)

function fetchMyData(){
  /*
   * cachedFetch is just isomorphic-fetch but coupled with cache
   */
  ...
  return cachedFetch('myapi.com').then(res => res.json())
}
```

### Credits

* [x] isomorphic-fetch - Fetch api for node and browser
* [x] lscache - localStorage caching with timers
