$(function() {

    "use strict";  // Use strict typing

    /*
        Instantiate a single Zoomdata Client object.
    */

    var deployedZoomdataClient = new ZoomdataClient({       // ZoomdataClient controls connection with server and vizes
        apiKey: 'YOUR_API_KEY',                             // substitute your API key inside the ' ' marks
        host: 'localhost:8080/zoomdata',                    // substitute with the URL of your Zoomdata server
        secure: true                                        // true for an HTTPS protocol; false for HTTP protocol
    });
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- visualizationTL implemented --------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/

// visualizationTL is anchored on the HTML element with the id='viztopleft' attribute; see "element: $('#viztopleft')" in visualizationTL's instantiation

    /*
            Instantiate each visualization using the visualize function.
    */

    var visualizationTL;

    deployedZoomdataClient.visualize({                                  // visualize the 'Donut' visualization in the
        visualization: "Donut",                                         // 'Real Time Sales' visualization source.
        source: "Real Time Sales",                                      // visualization will be attached to the HTML node
        element: $('#viztopleft').get(0)                                // that has id="viztopleft"
    })
        .progress(function(message) {
            console.log('loading...', message);
            })
        .done(function(vis) {
            console.log('topleft finished loading successfully.');
            visualizationTL = vis;
            vis.controller
                .on('interaction', function(interactiveElement) {
                    console.log(interactiveElement);                // log clicks, but don't do anything with them
                });
        })
        .fail(function(xhr, response) {
            var message = typeof xhr == 'string' ? xhr : null;
            console.log(message || (response + ': ' + xhr.statusText));
        });


/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- visualizationBottom implemented --------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/

// visualizationBottom is anchored on the HTML element with the id='vizbot' attribute; see "element: $('#vizbot')" in visualizationBottom's instantiation

    var visualizationBottom;

    deployedZoomdataClient.visualize({                                  // visualize the 'Line Trend: Attribute Values' visualization in the
        visualization: "Line Trend: Attribute Values",                  // 'Real Time Sales' visualization source.
        source: "Real Time Sales",                                      // visualization will be attached to the HTML node
        element: $('#vizbot').get(0)                                    // that has id="vizbot"
    })
        .progress(function(message) {
            console.log('loading...', message);
        })
        .done(function(vis) {
            console.log('bot finished loading successfully.');
            visualizationBottom = vis;
            vis.controller
                .on('interaction', function(interactiveElement) {
                    console.log(interactiveElement);                // log clicks, but don't do anything with them
                });
        })
        .fail(function(xhr, response) {
            var message = typeof xhr == 'string' ? xhr : null;
            console.log(message || (response + ': ' + xhr.statusText));
        });


/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- visualizationTop implemented -------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/

// visualizationTop is implemented last because it pushes a filter to visualizationBottom, which therefore must already exist.
// visualizationTop is anchored on the HTML element with the id='viztop' attribute; see "element: $('#viztop')" in visualizationTop's instantiation

    var visualizationTop;

    deployedZoomdataClient.visualize({                                  // visualize the 'Bars' visualization in the
        visualization: "Bars",                                          // 'Real Time Sales' visualization source.
        source: "Real Time Sales",                                      // visualization will be attached to the HTML node
        element: $('#viztop').get(0)                                    // that has id="viztop"
    })
        .progress(function(message) {
            console.log('loading...', message);
        })
        .done(function(vis) {
            console.log('TopViz finished loading successfully.');
            visualizationTop = vis;
            vis.controller.on('interaction', function(interactiveElement) { // create an event handler that detects clicks ('interaction') and responds.
                console.log(interactiveElement);
                var group = interactiveElement.group;                     // Here, identify which bar (product group) was clicked.
                console.log('clicked ' + group);
                var filter = {                                          // use the group as the basis of a new filter
                    operation: 'IN',                                    // includes
                    path: 'group',                                       // the category(ies) - in this particular data source, 'product group' is referred to variously.
                    value: [group]                                      // that match the clicked bar (product group)
                };
                visualizationBottom.controller.state.setFilter(filter); // set the filter for bottom right visualization using the filter
                console.log(visualizationBottom.controller);
                console.log('filtered on ' + group);
            })
        })
        .fail(function(xhr, response) {
            var message = typeof xhr == 'string' ? xhr : null;
            console.log(message || (response + ': ' + xhr.statusText));
        });

    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    /*-------------------------- Build and apply a filter based on user checkbox selections that applies to Top and BL vizes -------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------------------*/

	$('#checklist').change(function() {

        var electronicsCheck = document.getElementById('Electronics').checked;
        var booksCheck = document.getElementById('Books').checked;
        var jewelryCheck = document.getElementById('Jewelry').checked;
        var menCheck = document.getElementById('Men').checked;
        var womenCheck = document.getElementById('Women').checked;

        console.log('filter setting: ' + electronicsCheck + booksCheck + jewelryCheck + menCheck + womenCheck);

        if ((electronicsCheck == true) &&                               // If all checkboxes are checked, reset filters
            (booksCheck == true) &&
            (jewelryCheck == true) &&
            (menCheck == true) &&
            (womenCheck == true)) {
                // reset all the filters
                console.log('Resetting visualization');
                visualizationTop.controller.state.filters.reset();
                visualizationTL.controller.state.filters.reset();
        } else {

            // Build a filter for the visualizations
            var filter = {                                              // Otherwise, start building the filter
                operation: 'IN',                                        // to include
                path: 'group'                                           // data whose 'product group' is found in the array below
            };

            var filterArray = new Array();                              // build the array of groups based on which boxes are checked

            if (electronicsCheck) {
                filterArray[filterArray.length] = 'Electronics';
            }
            if (booksCheck) {
                filterArray[filterArray.length] = 'Books';
            }
            if (jewelryCheck == true) {
                filterArray[filterArray.length] = 'Jewelry';
            }
            if (menCheck == true) {
                filterArray[filterArray.length] = 'Men';
            }
            if (womenCheck == true) {
                filterArray[filterArray.length] = 'Women';
            }

            filter['value'] = filterArray;                              // add {value: filterArray} to our filter object. This contains the list of included groups

            console.log('Visualization filter set: ' + filter['value'].length + ' filters, including ' + filter['value']);
            visualizationTop.controller.state.setFilter(filter);        // set filter setting to the group(s) selection for both visualizations
            visualizationTL.controller.state.setFilter(filter);
        }
    });


    $( '#resetbutton' ).click( function() {
        console.log( 'Reset button clicked' );
        visualizationBottom.controller.state.filters.reset();           // reset all filters
        visualizationTop.controller.state.filters.reset();
        visualizationTL.controller.state.filters.reset();
        $('#checklist .checkbox label input').prop('checked', true);    // reset checkboxes
        console.log( 'Reset button event finished' );
    });

    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------- Add window resize handling code to resize visualizations when the window is adjusted ---------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------------------*/


    window.addEventListener('resize', function(event) {
        console.log('resize event');

        var width = $('#viztop').width(),                               // Get the width and height of the element that the visualization was attached to.
            height = $('#viztop').height();
        visualizationTop.controller._controller.resize(width, height);  // Pass the new width and height as parameters to the 'resize' function.

        width = $('#viztopleft').width();                               // repeat for the visualizationTL
        height = $('#viztopleft').height();
        visualizationTL.controller._controller.resize(width, height);

        width = $('#vizbot').width();                                    // repeat for the visualizationBottom
        height = $('#vizbot').height();
        visualizationBottom.controller._controller.resize(width, height);

        console.log('resize event handled');
    });


});   // JavaScript Document