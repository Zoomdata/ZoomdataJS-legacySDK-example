ZoomdataJS-example
====
This project contains examples and tutorials for the ZoomdataJS Javascript client library (zoomdata.min.js).  These examples were developed and tested for use with ZoomdataJS client library v1.6.0-alpha.3.

The most current version of the Zoomdata Javascript client library can be downloaded from [ZoomdataJS Github Project](https://github.com/Zoomdata/ZoomdataJS).  

The project contains 2 examples:

- Simple-Example - a single page demonstrating embedding of visualizations, filtering and event handling.
- Dashboard-Example - a more stylized example showing embedding, filtering, resizing event handling and inter-chart interactions.

**Getting Started**
----
Take a look at the Simple-Example/index.html file as a basic example of the Zoomdata client Javascript library.  That example will demonstrate embeding visualizations from the Zoomdata server directly into your own web pages or web applications, ability to affect visualizations using filters and the ability to respond to events from visualizations.

The samples are written with the Real Time Sales demo data source available from a default install of Zoomdata.  
  
**Important**
----
1. Download and place the latest ZoomdataJS client library files into each of the examples' zoomdataJS subfolder.
2. Replace the placeholder API Key and host properties to match your own API Key and Zoomdata host and port information.  

```
var zoomdataClient = new ZoomdataClient({
    apiKey: 'YOUR API KEY',
    host: 'localhost:8080/zoomdata',
    secure: false
});
```

You can learn more about generating an API key at [Zoomdata Support](http://support.zoomdata.com).


_Please note the examples load some dependent libraries, including jQuery and Bootstrap from a CDN, you can of course modify the examples to load these files from your own servers._

**Resources**
----
- You can find the most current ZoomdataJS Javascript client library on [ZoomdataJS Github Project](https://github.com/Zoomdata/ZoomdataJS)
- You can download latest evaluation version of the Zoomdata application at [Zoomdata Downloads](http://www.zoomdata.com/download)

