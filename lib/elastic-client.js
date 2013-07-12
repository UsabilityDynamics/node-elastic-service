/**
 *
 */
require( 'abstract' ).createModel( function ElasticClient( model, prototype ) {

  // Expose Model
  module.exports = model;

  // Use async library
  model.use( require( 'async' ) );

  // Get needed utility methods from abstract
  model.use( require( 'abstract' ).utility( 'defaults' ) );

  //this.use( require( 'observe.io' ).Emmitter );
  var fs = require( 'fs' );

  model.defineProperties( model, {
    utility: require( './utility' )
  });

  model.defineProperties( prototype, {
    startup: function startup( error, report ) {
      var self = this;

      model.nextTick( function() {
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
    stop: function stop() {

      var pid = this.get( 'pid' );

      // Emit Event
      if( !pid ) {
        return this.emit( 'node.stopped', new Error( 'ElasticSearch process with pid [', pid ,'] not found.' ) );
      }

      // Kill the process
      process.kill( pid );

      // Remove from self Pool
      // delete ElasticClient._data.instances[ this.pid ];

      // Return self
      return this;

    }
  });

  model.defineInstance( function Consruct( options ) {
    var self = this;

    // Use Externals
    self.use( require( 'eventemitter2' ).EventEmitter2.prototype );
    self.use( require( 'elastical' ) );

    // Set Options with Defaults
    self.set( 'settings', model.defaults( options, {
      path: {
        bin: undefined,
        data: undefined,
        work: undefined,
        logs: undefined,
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

        try {

          if( self.get( 'path.data' ) ) {
            self.set( 'settings.path.data', fs.realpathSync( self.get( 'path.data' ) ) );
          }

          if( self.get( 'path.work' ) ) {
            self.set( 'settings.path.work', fs.realpathSync( self.get( 'path.data' ) ));
          }

          if( self.get[ 'path.logs' ] ) {
            self.get[ 'settings.path.logs' ] = fs.realpathSync( self.get[ 'path.logs' ] );
          }

        } catch( error ) { return next( error ); }

        next( null, self.get().settings );

      }],
      binary: [ 'options', function binary( next, report ) {


        // If path to ES is specified, resolve and return
        if( report.options.path.bin && fs.existsSync( report.options.path.bin ) ) {
          return next( null, fs.realpathSync( report.options.path.bin ) )
        };

        // Try to find global self
        require( 'which' )( 'elasticsearch', function which( error, found_path ) {
          next( error, found_path );
        });


      }],
      process: [ 'binary', function process( next, report ) {

        var args = [ '-f' ];

        // Command Arguments.
        Object.keys( report.options ).forEach( function( key ) {
          args.push( [ '-Des.', key, '=', report.options[ key ] ].join( '' ) );
        });

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

        report.process.stdout.on( 'error', function( data ) {
          self.emit( 'process.error', data.toString() );
        });

        // Set PID
        self.set( 'pid', report.process.pid );

        // Done
        next( !self.get( 'pid' ) ? new Error( 'Could now spawn process, no PID returned.' ) : null, report.process || null );

      }]
    }, this.startup.bind( this ) );

  });

});
