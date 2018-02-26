import fetch from "isomorphic-fetch";
import lsCache from "lscache";
import hash from "object-hash";
import requestIdleCallback from "requestidlecallback";

const isClient = () => typeof window !== "undefined";

// 10 hours
const LSCACHE_TIMEOUT_IN_MINUTES = 10 * 60;

export function createfetchUnlessCached(
  cacheDuration = LSCACHE_TIMEOUT_IN_MINUTES
) {
  return function fetchUnlessCached(...fetchOpts) {
    /**
     * We only do caching on the client site
     */

    if (isClient()) {
      const RESOURCE_HASH = hash(fetchOpts);
      const cachedResponse = lsCache.get(RESOURCE_HASH);

      /**
       * const fetchDataFromServer - Fetch data from the api
       * Then set the data inside the cache.
       * Return the reponse object
       * @return {Object}  reponse
       */

      const fetchDataFromServer = function() {
        return fetch(...fetchOpts)
          .then(response => response.json())
          .then(response => {
            lsCache.set(RESOURCE_HASH, response, cacheDuration);
            return response;
          });
      };

      /**
       * if - cachedResponse exists for the given key
       *
       * @param  {type} cachedResponse
       */

      if (cachedResponse) {
        console.table(fetchOpts);
        /**
         * return the promise containing the saved data
         * but behind the scenes fetch new data. We can use this data the next time it is requested
         * This is async . So the response return is immediate
         */
        requestIdleCallback.request(() => {
          /**
           * Client is idle. Now fetch the response and cache
           */
          fetchDataFromServer();
        });

        /**
         * Resolve the cachedResponse first and then fetch in the idle callback at a later time
         */
        return Promise.resolve(cachedResponse);
      } else {
        return fetchDataFromServer();
      }
    } else {
      /**
       * Just do fetch on the server
       */

      return fetch(...fetchOpts).then(response => response.json());
    }
  };
}

const fetchUnlessCached = createfetchUnlessCached();
export default fetchUnlessCached;
