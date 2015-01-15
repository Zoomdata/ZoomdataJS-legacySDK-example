ZoomdataJS-example
==================

Example using the Zoomdata.js library.

Take a look at the index.html file as a basic example of the Zoomdata Client.

*jQuery and Zoomdata.js are loaded from CDN's in the example index.html file.*

**You must replace the API Key and host properties to match your own system.**

```
var zoomdataClient = new ZoomdataClient({
    apiKey: 'YOUR API KEY',
    host: 'localhost:8080/zoomdata',
    secure: false
});
```
