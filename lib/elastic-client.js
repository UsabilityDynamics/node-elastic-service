/**
 * Elastic Client
 *
 * @module ElasticClient
 * @constructor
 * @async
 * @chainable
 *
 * @author potanin@UD
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
 * @returns {Object} New ElasticClient instance.
 */
function ElasticClient( options ) {
  // ElasticClient.logger.debug( 'Starting.' );

  // Instance
  var Instance = this;

  // Modules
  var _ = require( 'lodash' );
  var fs = require( 'fs' );
  var Observe = require( 'observe.io' );

  // Create Instance Properties
  Object.defineProperties( this, {
    pid: {
      value: undefined,
      enumerable: false,
      writable: true
    },
    settings: {
      value: ElasticClient.utility.defaults( options || {}, ElasticClient._defaults || {} ),
      enumerable: false,
      writable: true
    },
    client: {
      value: new ( require( 'elastical' ) ).Client( Instance.get( 'host' ), {
        port: Instance.get( 'port' ),
        protocol: Instance.get( 'protocol' ),
        timeout: 60000,
        auth: false
      }),
      enumerable: false,
      writable: true
    },
    args: {
      value: [ '-f' ],
      enumerable: false,
      writable: true
    },
    constructor: {
      value: arguments.callee,
      enumerable: false,
      writable: false
    }
  });

  // Add Emitter functionality to Instance
  Observe.Emitter.extend( Instance, arguments.callee.name, {
    delimiter: '.',
    maxListeners: 100
  })

  // Monitor successful start
  Instance.once( 'node.started', function( error, report ) {
    ElasticClient.logger.debug( 'Node started with pid [%s]', this.pid );
    ElasticClient._data.instances[ this.pid ] = this;
  })

  // Start Instance
  ElasticClient.async.auto({
    // Validate and Prepare Options
    options: [ function options( next, report ) {

      try {

        if( Instance.settings[ 'path.data' ] ) {
          Instance.settings[ 'path.data' ] = fs.realpathSync( Instance.settings[ 'path.data' ] );
        }

        if( Instance.settings[ 'path.work' ] ) {
          Instance.settings[ 'path.work' ] = fs.realpathSync( Instance.settings[ 'path.work' ] );
        }

        if( Instance.settings[ 'path.logs' ] ) {
          Instance.settings[ 'path.logs' ] = fs.realpathSync( Instance.settings[ 'path.logs' ] );
        }

      } catch( error ) { return next( error ); }

      next( null, Instance.settings );

    }],
    // Find Executable Path
    path: [ 'options', function path( next, report ) {

      // If path to ES is specified, resolve and return
      if( report.options.path && fs.existsSync( report.options.path ) ) {
        return next( null, fs.realpathSync( report.options.path ) )
      };

      // Try to find global instance
      require( 'which' )( 'elasticsearch', function which( error, found_path ) {
        next( error, found_path );
      });

      // Failure
      next( new Error( 'ElasticSearch path not specified.' ) );

    }],
    // Spawn Process, "pipe" Events
    process: [ 'path', function process( next, report ) {

      // Command Arguments.
      Object.keys( report.options ).forEach( function( key ) {
        Instance.args.push( [ '-Des.', key, '=', report.options[ key ] ].join( '' ) );
      });

      // Spawn process and bind listeners
      report.process = require( 'child_process' ).spawn( report.path, Instance.args, {
        detached: false
      });

      // Input Data
      Instance.on( 'stdin.data', function( data ) { report.process.stdin.write( data ); });

      // Output Data and Error
      report.process.stdout.on( 'data', function( data ) { Instance.emit( 'process.data', data.toString() ); });
      report.process.stdout.on( 'error', function( data ) { Instance.emit( 'process.error', data.toString() ); });

      // Set PID
      Instance.pid = report.process.pid;

      // Done
      next( !report.process.pid ? new Error( 'Could now spawn process, no PID returned.' ) : null, report.process || null );

    }]
  }, function Report( error, report ) {
    process.nextTick( function() {
      Instance.emit( 'node.started', error, report );
      if( error ) { Instance.emit( 'error', error ); }
    });
  });

  // Return Instance
  return Instance;

}

/**
 * Prototyal Properties
 *
 */
Object.defineProperties( ElasticClient.prototype, {
  Document: {
    /**
     * Get / Update or create a Document
     *
     * @async
     * @chainable
     */
    value: require( './document' ),
    configurable: false,
    enumerable: true,
    writable: false
  },
  Index: {
    /**
     * Get / Update or create an Index
     *
     * @async
     * @chainable
     */
    value: require( './index' ),
    configurable: false,
    enumerable: true,
    writable: false
  },
  Type: {
    /**
     * Type Actions
     *
     * @async
     * @chainable
     */
    value: require( './type' ),
    configurable: false,
    enumerable: true,
    writable: false
  },
  search: {
    /**
     * Search Documents
     *
     */
    value: function search() {
      this.client.search.apply( this, arguments );
      return this;
    },
    enumerable: true,
    writable: true
  },
  bulk: {
    /**
     * Bulk Actions
     *
     */
    value: function bulk() {
      this.client.bulk.apply( this.client, arguments );
      return this;
    },
    enumerable: true,
    writable: true
  },
  get: {
    /**
     * Get Setting
     *
     * @return {} Setting value;
     * @async
     */
    value: function get( key ) {

      // Delo hostame. Just because.
      key = key || 'hostame';

      var options = this.settings || {};

      // Helper for Hostname lookup
      if( key === 'host' ) {

        if( options[ 'network.publish_host' ] ) {
          key = 'network.publish_host';
        }

      }

      // Helper for port lookup
      if( key === 'port' ) {

        if( options[ 'http.port' ] ) {
          key = 'http.port';
        }

      }

      return options[ key ] || null;

    },
    configurable: false,
    writable: false,
    enumerable: true
  },
  set: {
    /**
     * Set an Option / Options
     *
     * @param key {String}
     * @param value {Any}
     * @return {Object} Instance.
     * @chainable
     */
    value: function set( key, value ) {

      // Create Container
      this.settings = ElasticClient.utility.defaults( this.settings, ElasticClient._defaults );

      // Set Key-Value
      if( 'string' === typeof key ) {
        this.settings[ key ] = value ? value : this.settings[ key ] || undefined;
      }

      // Extend Options using Object
      if( 'object' === typeof key ) {
        ElasticClient.utility.extend( this.settings, key );
      }

      // Instance
      return this;

    },
    configurable: false,
    writable: false,
    enumerable: true
  },
  stop: {
    /**
     * Shutdown Instance
     *
     * @chainable
     * @async
     */
    value: function stop() {

      // Kill the process
      process.kill( this.pid );

      // Remove from Instance Pool
      delete ElasticClient._data.instances[ this.pid ];

      // Emit Event
      this.emit( 'node.stopped' );

      // Return Instance
      return this;

    },
    configurable: false,
    writable: false,
    enumerable: true
  }
})

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = ElasticClient, {
  _data: {
    value: {
      defaults: {
        'http.port': 9600,
        'network.publish_host': '127.0.0.1',
        'protocol': 'http'
      },
      instances: {}
    },
    enumerable: false,
    writable: true
  },
  defaults: {
    /**
     * Get / Set Defaults
     *
     * @param data
     */
    value: function defaults( data ) {

      if( data ) {
        ElasticClient._data.defaults = data;
      }

      return ElasticClient._data.defaults;

    },
    enumerable: true,
    writable: false
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
  },
  utility: {
    value: require( './utility' ),
    enumerable: true,
    writable: false
  },
  async: {
    value: require( 'async' ),
    configurable: false,
    enumerable: false,
    writable: true
  }
});
