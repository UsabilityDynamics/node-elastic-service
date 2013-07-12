ElasticSearch Client
====================
ElasticSearch Client for Node.js

This is currently under development! This module currently lacks the following:

    - tests
    - documentation
    - examples

If you are NOT looking for a module to actually LAUNCH ElasticSearch, but only for a module to
interact with an ElasticSearch instance that is already started, you may want to look into using
Elastical, which is a great module.

This module is being developed for starting, stopping updating, installing plugins, and monitoring an actual
ElasticSearch instance. Of course once an instante is started, an API is available for making requests,
much like with Elastical.

Example Usage
-------------
One other fundamental difference between ESC and Elastical is I use Events like they're going out of style.

To create a new ElasticSearch, instantiate the module using the start() method.

    // Instantiate.
    var Instance = require( 'elastic-client' ).create({
      'path': '/usr/local/something/bin/elasticsearch',
      'node.name': 'Example-Node',
      'http.port': 9200,
      'path.data': './data_storage',
      'path.work': './work_directory',
      'path.logs': './logs_directory',
      'cluster.name': 'Example-Cluster'
    });

The "path" property should be the absolute path to the ES binary. This module will attempt to find an
ES instance using the "which" command if no path is specified.

Any ElasticSearch option can be passed into the .start() method, simply using dot-notation.
In one of the next releases I'll add support for an Object to be passed in for the settings,

Below are some example of using events to monitor ElasticSearch.

    // ES Instance Started
    Instance.on( 'node.started', function() { console.log( 'ElasticSearch started.', this.pid });

    // Example of Wildcard usage - will trigger on any event related to the ES node.
    Instance.on( 'node.*', function() { console.log( 'Some ElasticSearch "node" event:', this.event, this.pid });

    // Some Critical Failure
    Instance.on( 'error', function( error ) { console.error( error ); });

    // Forward ALL data output by the ElasticSearch terminal.
    Instance.on( 'process.data', function( data ) { console.log( data });

Once Instantiated, you may utilize interact with the instance by making standard HTTP requests, or via the
ESC API.

    // Index a Document (WIP)
    Instance.Document.index( 'the_index', 'the_type', {
      title: "Welcome to my stupid blog",
      en_us: "Blah blah."
    }).on( 'success', [some_callback_function] );

    // Save type to a variable (WIP)
    var some_type = Instance.Type.get( 'some_index', 'some_type' );

    // Access documents within type via variable (WIP)
    some_type.Document.get( 234234 ).on( 'loaded', [callback] );

Events
------
The module utlizes numerous events for interacting and monitoring ElasticSearch instance. Each instance of ESC
utilizes EventEmitter2 to handle events allowing for the use of the wildcart character; all events are
delimited with a period.

    - node.started - ElasticSearch instance started.
    - node.stopped - ElasticSearch instance stopped.
    - process.data - ElasticSearch proecess' console output.
    - process.error - ElasticSearch process' error.
    - error - General Instance error.

## Documentation
The documentation is generated using yuidoc. To enable dynamic documentation install yuidoc globally and
run the following code from the Observe.io root directory:

    yuidoc --server 7500

The full static documentation is also available in the docs directory in HTML format.

## License

(The MIT License)

Copyright (c) 2013 Usability Dynamics, Inc. &lt;info@usabilitydynamics.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
