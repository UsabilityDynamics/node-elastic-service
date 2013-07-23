/**
 * Mocha Test for api
 *
 * mocha api --reporter list --ui exports --watch
 *
 * @author potanin@UD
 * @date 7/5/13
 * @type {Object}
 */
module.exports = {

  /**
   * Prepare Environment
   *
   */
  'before': function() {},

  'Elastic Client': {

    // Very basic test
    'is available.': function() {
      var client = require( '../' );

      // Constructor tests
      client.should.be.a( 'function' );
      client.should.have.property( 'utility' );

      // Inherited Abstract methods
      client.should.have.property( 'create' );
      client.should.have.property( 'use' );
      client.should.have.property( 'get' );
      client.should.have.property( 'set' );

      // use()'d async methods
      client.should.have.property( 'nextTick' );
      client.should.have.property( 'auto' );
      client.should.have.property( 'series' );
      client.should.have.property( 'queue' );
      client.should.have.property( 'cargo' );
      client.should.have.property( 'reduce' );
      client.should.have.property( 'filter' );
      client.should.have.property( 'detect' );
      client.should.have.property( 'apply' );
      client.should.have.property( 'whilst' );
      client.should.have.property( 'times' );
      client.should.have.property( 'forever' );

      // Prototypal Methods
      client.should.have.property( 'prototype' );
      //client.prototype.should.have.property( 'search' );
      //client.prototype.should.have.property( 'bulk' );
      //client.prototype.should.have.property( 'stop' );

      client.should.have.property( 'utility' );
      client.should.have.property( 'create' );
      client.should.have.property( 'prototype' );
   },

    'connects with elasticsearch': function() {
      var Client = require( '../' );

      var Instance = Client.create( '../../Vendor/elasticsearch/bin/elasticsearch', {
        path: {
          data: 'test/.dynamic/data',
          work: 'test/.dynamic/work',
          logs: 'test/.dynamic/logs'
        },
        cluster: {
          name: 'example-Cluster'
        },
        http: {
          port: 9210
        }
      });

      // Own Properties
      //Instance.should.have.property( 'stop' );

      // Inherited async methods
      Instance.should.have.property( 'nextTick' );
      Instance.should.have.property( 'auto' );
      Instance.should.have.property( 'series' );
      Instance.should.have.property( 'queue' );
      Instance.should.have.property( 'cargo' );
      Instance.should.have.property( 'reduce' );
      Instance.should.have.property( 'filter' );
      Instance.should.have.property( 'detect' );
      Instance.should.have.property( 'apply' );
      Instance.should.have.property( 'whilst' );
      Instance.should.have.property( 'times' );
      Instance.should.have.property( 'forever' );

      // Inherited EventEmitter2 methods
      Instance.should.have.property( 'on' );
      Instance.should.have.property( 'onAny' );
      Instance.should.have.property( 'off' );
      Instance.should.have.property( 'emit' );

      // Elastical Methods
      //Instance.should.have.property( 'Client' );
      //Instance.should.have.property( 'Index' );
      //Instance.Client.should.have.property( 'prototype' );
      //Instance.Index.should.have.property( 'prototype' );
      //Instance.Index.should.have.property( 'getSettings' );
      //Instance.Index.should.have.property( 'getMapping' );

      // Stop service
      //Instance.stop();

    }

  }

};

