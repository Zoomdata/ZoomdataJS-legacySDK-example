/*
 * Copyright (C) Zoomdata, Inc. 2012-2014. All rights reserved.
 */
self.onmessage = function(e) {
    debugger;
    var preparedData = processData(e.data.data, e.data.oldData, e.data.clientSort, e.data.sortAttribute);
    self.postMessage({data: preparedData});
};
function processData(data, oldData, clientSort, sortAttribute) {
    if (data instanceof Array && data.length > 0) {
        var result = [],
            oldObject = {},
            newObject = {},
            newData = data;

        if (oldData.length === 0) {
            result = newData;
        } else if (newData.length === 0) {
            result = oldData;
        } else {
            // Prepare dictionary of existed data set
            oldData.forEach(function(item) {
                var group = Array.isArray(item.group)
                    ? item.group.join()
                    : item.group;
                oldObject[group] = item;
            });
            // Prepare dictionary of new data set
            newData.forEach(function(item) {
                var group = Array.isArray(item.group)
                    ? item.group.join()
                    : item.group;
                newObject[group] = item;
            });
            
            // Merge
            for (var key in newObject) {
                if (newObject.hasOwnProperty(key)) {
                    if (newObject[key].current.count === -1) {
                        if (oldObject[key]) {
                            delete oldObject[key];
                        }
                    } else {
                        oldObject[key] = newObject[key];
                    }
                }
            }
            for (var key in oldObject) {
                if (oldObject.hasOwnProperty(key)) {
                    result.push(oldObject[key]);
                }
            }
        }
        var resultForMessage = sortData(result, clientSort, sortAttribute);
        return resultForMessage;
    }else if(data instanceof Array && data.length === 0){
        return oldData;
    }
}
function sortData(data, clientSort, sortAttribute) {
    var result = [];
    if (clientSort) {
        var sortIterator = null,
            metric = {
                raw: function(d) {
                    var result = null;
                    
                    if(sortAttribute === 'count' || !(d.current.metrics && d.current.metrics[sortAttribute])){
                        result = d.current.count;
                    }else{
                        for (var func in d.current.metrics[sortAttribute]) {
                            result = d.current.metrics[sortAttribute][func];
                            break;
                        }
                    }
                    return result;
                }
            };
        switch (clientSort) {
            case 'valueDescending':
                sortIterator = function(a, b) {
                    var diff = metric.raw(b) - metric.raw(a);
                    if (diff === 0) {
                        var aString = a.group.join ? a.group.join('') : a.group,
                            bString = b.group.join ? b.group.join('') : b.group;
                        return aString.localeCompare(bString);
                    }
                    return diff;
                };
                break;
            case 'valueAscending':
                sortIterator = function(a, b) {
                    var diff = metric.raw(a) - metric.raw(b);
                    if (diff === 0) {
                        var aString = a.group.join ? a.group.join('') : a.group,
                            bString = b.group.join ? b.group.join('') : b.group;
                        return bString.localeCompare(aString);
                    }
                    return diff;
                };
                break;
            case 'alphabetical':
                sortIterator = function(a, b) {
                    var aString = a.group.join ? a.group.join('') : a.group,
                        bString = b.group.join ? b.group.join('') : b.group;
                    return aString.localeCompare(bString);
                };
                break;
            case 'reverseAlphabetical':
                sortIterator = function(a, b) {
                    var aString = a.group.join ? a.group.join('') : a.group,
                        bString = b.group.join ? b.group.join('') : b.group;
                    return bString.localeCompare(aString);
                };
                break;
            default:
                sortIterator = null;
        }
        result = data.sort(sortIterator);
    } else {
        result = data;
    }
    return result;
}