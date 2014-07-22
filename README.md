ZoomdataJS-example
==================

Example using the Zoomdata.js library.

Take a look at the index.html file as a basic example of the Zoomdata Client. 

**The Zoomdata Client has the following dependencies.**
* jquery - 2.1.1
* underscore.js - 1.6.0
* backbone.js - 1.1.2
* jstimezonedetect - 1.0.4
* require.js - 2.1.11
*These are loaded from CDN's in the example index.html file.*

**You must replace the API Key and host properties to match your own system.**

```
var zoomdataClient = new ZoomdataClient({
    apiKey: 'YOUR API KEY',
    host: 'localhost:8080/zoomdata',
    secure: false
});
```
