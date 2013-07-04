/**
 * ElasticSearch Client
 *
 * @module ElasticClient
 * @constructor
 * @async
 * @chainable
 *
 * @author potanin
 * @date 7/4/13
 *
 * @param options {Object} Client settings.
 * @param options.node.name {String} Name of instance.
 * @param options.cluster.name {String} Name of cluster for instance.
 * @param options.network.publish_host {String} Hostname of instance.
 * @param options.http.port {Number} Port of instance.
 * @param options.index.number_of_shards {Number} Number of shards.
 * @param options.index.number_of_replicas {Number} Number of replicas.
 *
 * @returns {Object} New ElasticClient instance or Error.
 */
function ElasticClient( options ) {
  ElasticClient.logger.debug( 'Starting.' );

  // Instance
  var self = this;

  // Modules
  var fs = require( 'fs' );
  var which = require( 'which' );
  var spawn = require( 'child_process' ).spawn;

  // Container for runtime instance;
  self._instance = {
    options: self.defaults( options || {}, ElasticClient._defaults || {} ),
    pid: undefined,
    args: [ '-f' ]
  };

  // Event Emitter Functionality
  for( var key in require( 'eventemitter2' ).EventEmitter2.prototype ) {
    Object.defineProperty( self, key, Object.getOwnPropertyDescriptor( require( 'eventemitter2' ).EventEmitter2.prototype, key ));
  }

  // Monitor successful start
  self.once( 'node.started', function( error, report ) {
    ElasticClient.logger.debug( 'Node started with pid [%s]', this.pid );
    ElasticClient.instances = ElasticClient.instances || {};
    ElasticClient.instances[ this.pid ] = this;
  })

  // Start Instance
  self.auto({
    /**
     * Validate and Prepare Options
     *
     * @param next
     * @param report
     */
    options: [ function options( next, report ) {

      try {

        if( self._instance.options[ 'path.data' ] ) {
          self._instance.options[ 'path.data' ] = fs.realpathSync( self._instance.options[ 'path.data' ] );
        }

        if( self._instance.options[ 'path.work' ] ) {
          self._instance.options[ 'path.work' ] = fs.realpathSync( self._instance.options[ 'path.work' ] );
        }

        if( self._instance.options[ 'path.logs' ] ) {
          self._instance.options[ 'path.logs' ] = fs.realpathSync( self._instance.options[ 'path.logs' ] );
        }

      } catch( error ) { return next( error ); }

      next( null, self._instance.options );

    }],
    /**
     * Find Executable Path
     *
     * @param next
     * @param report
     * @returns {*}
     */
    path: [ 'options', function path( next, report ) {

      // If path to ES is specified, resolve and return
      if( report.options.path && fs.existsSync( report.options.path ) ) {
        return next( null, fs.realpathSync( report.options.path ) )
      };

      // Try to find global instance
      which( 'elasticsearch', function which( error, found_path ) {
        next( error, found_path );
      });

      // Failure
      next( new Error( 'ElasticSearch path not specified.' ) );

    }],
    /**
     * Spawn Process
     *
     */
    process: [ 'path', function process( next, report ) {

      // Command Arguments.
      Object.keys( report.options ).forEach( function( key ) {
        self._instance.args.push( [ '-Des.', key, '=', report.options[ key ] ].join( '' ) );
      });

      // Spawn process and bind listeners
      report.process = spawn( report.path, self._instance.args, {
        detached: false
      });

      // Input Data
      self.on( 'stdin.data', function( data ) { report.process.stdin.write( data ); });

      // Output Data and Error
      report.process.stdout.on( 'data', function( data ) { self.emit( 'process.data', data.toString() ); });
      report.process.stdout.on( 'error', function( data ) { self.emit( 'process.error', data.toString() ); });

      // Set PID
      self._instance.pid = report.process.pid;

      // Done
      next( !report.process.pid ? new Error( 'Could now spawn process, no PID returned.' ) : null, report.process || null );

    }]
  }, function( error, report ) {
    process.nextTick( function() {
      self.emit( 'node.started', error, report );
      if( error ) { self.emit( 'error', error ); }
    });
  });

  // Return Instance
  return self;

}

/**
 * Prototyal Properties
 *
 */
Object.defineProperties( ElasticClient.prototype, {
  defaults: {
    value: require( 'lodash' ).defaults,
    enumerable: true,
    writable: true
  },
  delimiter: {
    value: '.',
    configurable: false,
    enumerable: false,
    writable: false
  },
  wildcard: {
    value: true,
    configurable: false,
    enumerable: false,
    writable: false
  },
  listenerTree: {
    value: {},
    configurable: true,
    enumerable: false,
    writable: true
  },
  pid: {
    get: function() { return this._instance.pid; },
    enumerable: true
  },
  shutdown: {
    /**
     * Shutdown Instance
     *
     * @chainable
     * @async
     */
    value: function shutdown() {
      console.log( arguments.callee, 'todo' );

      // Emit Event
      this.emit( 'stopped', {} );

      // Return Instance
      return this;

    },
    writable: false,
    enumerable: true
  },
  auto: {
    value: require( 'async' ).auto,
    enumerable: true,
    writable: true
  },
})

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = ElasticClient, {
  _defaults: {
    value: {
      'http.port': 9600,
      'network.publish_host': '127.0.0.1'
    },
    enumerable: false,
    writable: true
  },
  instances: {
    value: {},
    enumerable: false,
    writable: true
  },
  defaults: {
    /**
     * Set Defaults
     *
     * @param data
     */
    value: function defaults( data ) {

      Object.defineProperty( ElasticClient, '_defaults', {
        value: data,
        enumerable: false,
        writable: true
      });;

    },
    enumerable: true
  },
  start: {
    /**
     * Start ElasticSearch Instance
     *
     * @extends ElasticClient
     */
    get: function() { return function( options ) { return new ElasticClient( options ); }; },
    configurable: true,
    enumerable: true
  },
  install_plugin: {
    value: function install_plugin() {},
    enumerable: true
  },
  remove_plugin: {
    value: function remove_plugin() {},
    enumerable: true
  },
  logger: {
    /**
     * Define Logger
     *
     */
    value: {
      log: function log() {},
      error: console.error,
      info: function info() {},
      debug: require( 'debug' )( 'elastic-client' )
    },
    configurable: true,
    writable: true,
    enumerable: true
  }
});
