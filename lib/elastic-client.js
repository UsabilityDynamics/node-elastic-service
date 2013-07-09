require( 'abstract' ).createModel( module.exports = function ElasticClient( model, prototype ) {

  //this.use( require( 'observe.io' ).Emmitter );
  var fs = require( 'fs' );

  this.properties({
    logger: {
      log: function log() {},
      error: console.error,
      info: function info() {},
      debug: require( 'debug' )( 'elastic-client' )
    },
    utility: require( './utility' )
  });

  this.properties( prototype, {
    search: function search() {
      this.client.search.apply( this, arguments );
      return this;
    },
    bulk: function bulk() {
      this.client.bulk.apply( this.client, arguments );
      return this;
    },
    stop: function stop() {

      // Kill the process
      process.kill( this.pid );

      // Remove from self Pool
      delete ElasticClient._data.instances[ this.pid ];

      // Emit Event
      this.emit( 'node.stopped' );

      // Return self
      return this;
    }
  });

  this.defineInstance(function(options) {
    var self = this;

    this.use( require( 'async' ) );
    this.use( require( 'eventemitter2' ).EventEmitter2.prototype );
    this.use( require( 'elastical' ) );

    this.set(options || {} );

    console.log( this.get() );
    console.log( this._meta );
    this.once( 'node.started', function( error, report ) {
      model.logger.debug( 'Node started with pid [%s]', this.get('pid') );
    });

    this.auto({
      // Validate and Prepare Options
      options: [ function options( next, report ) {

        try {

          if( self.get( 'path.data' ) ) {
            self.set( 'path.data', fs.realpathSync( self.get( 'path.data' ) ) );
          }

          if( self.get( 'path.work' ) ) {
            self.set( 'path.work', fs.realpathSync( self.get( 'path.data' ) ));
          }

          if( self.get[ 'path.logs' ] ) {
            self.get[ 'path.logs' ] = fs.realpathSync( self.get[ 'path.logs' ] );
          }

        } catch( error ) { return next( error ); }

        next( null, self.get() || {} );

      }],
      // Find Executable Path
      path: [ 'options', function path( next, report ) {

        // If path to ES is specified, resolve and return
        if( report.options.path && fs.existsSync( report.options.path ) ) {
          return next( null, fs.realpathSync( report.options.path ) )
        };

        // Try to find global self
        require( 'which' )( 'elasticsearch', function which( error, found_path ) {
          console.log(arguments);
          next( error, found_path );
        });


      }],
      // Spawn Process, "pipe" Events
      process: [ 'path', function process( next, report ) {
        var args = ['console'];

        // Command Arguments.
        Object.keys( report.options ).forEach( function( key ) {
          args.push( [ '-Des.', key, '=', report.options[ key ] ].join( '' ) );
        });
        console.log(args);
        // Spawn process and bind listeners
        report.process = require( 'child_process' ).spawn( report.path, self.args, {
          detached: false
        });

        // Input Data
        self.on( 'stdin.data', function( data ) { report.process.stdin.write( data ); });

        // Output Data and Error
        report.process.stdout.on( 'data', function( data ) { self.emit( 'process.data', data.toString() ); });
        report.process.stdout.on( 'error', function( data ) { self.emit( 'process.error', data.toString() ); });

        // Set PID
        self.pid = report.process.pid;

        // Done
        next( !report.process.pid ? new Error( 'Could now spawn process, no PID returned.' ) : null, report.process || null );

      }]
    }, function Report( error, report ) {
      process.nextTick( function() {
        self.emit( 'node.started', error, report );
        if( error ) { self.emit( 'error', error ); }
      });
    });
  });

});

var instance = module.exports.create({
  'node.name': 'boobs'
});

instance.onAny( function(data) {

  console.log( this.event, data);
});
