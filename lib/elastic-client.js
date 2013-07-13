/**
 * ElasticClient
 *
 *
 *
 * @todo Replace eventemitter2 with object-channel once namespacing is ready.
 *
 */
require( 'abstract' ).createModel( function ElasticClient( ElasticClient, prototype ) {

  // Expose Model
  module.exports = ElasticClient;

  // Use async, Object Channel (EventEmitter) and select Abstract utility methods
  ElasticClient.use( require( 'async' ) );
  ElasticClient.use( require( 'abstract' ).utility( 'defaults' ) );
  ElasticClient.use( require( 'abstract' ).utility( 'flatten_obj' ) );

  // Local Modules
  var fs = require( 'fs' );

  // Properties: Constructor
  ElasticClient.defineProperties( ElasticClient, {
    utility: require( './utility' ),
    debug: require( 'debug' )( 'elastic-client' ),
    stop: { get: function() { return ElasticClient.prototype.stop } }
  });

  // Properties: Instance
  ElasticClient.defineProperties( prototype, {
    startup: function startup( error, report ) {
      var self = this;

      ElasticClient.nextTick( function() {
        self.emit( 'node.started', error, report );
        if( error ) { self.emit( 'error', error ); }
      });

      return this;
    },
    search: function search() {
      this.client.search.apply( this, arguments );
      return this;
    },
    bulk: function bulk() {
      this.client.bulk.apply( this.client, arguments );
      return this;
    },
    stop: function stop( pid ) {

      var pid = pid || ( this.get ? this.get( 'pid' ) : undefined );

      // Emit Kill Event
      if( !pid ) {
        return this.emit ? this.emit( 'node.stopped', new Error( 'ElasticSearch process with pid [', pid ,'] not found.' ) ) : this;
      }

      // Kill the process
      process.kill( pid );

      // Return self
      return this;
    }
  });

  // Constructor
  ElasticClient.defineInstance( function Consruct( options ) {
    var self = this;

    // Instance Resources
    self.use( require( 'eventemitter2' ).EventEmitter2.prototype );
    self.use( require( 'elastical' ) );

    // Set Options with Defaults
    self.set( 'settings', ElasticClient.defaults( options, {
      path: {
        bin: undefined,
        data: undefined,
        work: undefined,
        logs: undefined
      },
      cluster: {
        name: undefined
      },
      http: {
        port: 8000
      }
    }));

    // Begin Startup
    self.auto({
      options: [ function options( next, report ) {

        if( 'object' !== typeof self.get( 'settings.path' ) ) {
          return next( null, self.get( 'settings' ) )
        }

        for( var path in self.get( 'settings.path' ) ) {

          var resolved_path;

          var set_path = self.get( 'settings.path' )[ path ];

          // Resolve path
          try {

            resolved_path = fs.realpathSync( set_path );

          } catch( error ) {

            // This doesn't seem to do anything.
            ElasticClient.debug( error );

          }

          // Update path in settings
          self.set( 'settings.path.' + path, resolved_path || undefined );

        }

        next( null, self.get( 'settings' ) || {} );

      }],
      binary: [ 'options', function binary( next, report ) {

        // If path to ES is specified, resolve and return
        if( report.options.path.bin && fs.existsSync( report.options.path.bin ) ) {

          return next( null, report.options.path.bin );

        }

        // Try to find global self
        require( 'which' )( 'elasticsearch', function which( error, found_path ) {

          next( error, found_path );

        });

      }],
      process: [ 'binary', function process( next, report ) {

        var arg_props = self.flatten_obj( report.options );

        var args = [ '-f' ];

        // Command Arguments.
        Object.keys( arg_props ).forEach( function( key ) {

          args.push( [ '-Des.', key, '=', arg_props[ key ] ].join( '' ) );

        });

        args.splice( 1, 2 );

        // Spawn process and bind listeners
        report.process = require( 'child_process' ).spawn( report.binary, args, {

          detached: false

        });

        // Input Data
        self.on( 'stdin.data', function( data ) {

          report.process.stdin.write( data );

        });

        // Output Data and Error
        report.process.stdout.on( 'data', function( data ) {

          self.emit( 'process.data', data.toString() );

        });

        report.process.stderr.on( 'data', function( data ) {

          self.emit( 'process.error', data.toString() );

        });

        // Set PID
        self.set( 'pid', report.process.pid );

        // Done
        next( !self.get( 'pid' ) ? new Error( 'Could not spawn process, no PID returned.' ) : null, report.process || null );

      }]
    }, this.startup.bind( this ) );

  });

});
