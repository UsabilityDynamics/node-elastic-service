/**
 * -
 *
 * -
 *
 * @author potanin
 * @date 7/12/13
 */

// Instantiate.


var Instance = require( 'elastic-client' ).create({
  path: {
    bin: '../../Vendor/elasticsearch/bin/elasticsearch',
    data: 'example/.dynamic/data',
    work: 'example/.dynamic/work',
    logs: 'example/.dynamic/logs'
  },
  cluster: {
    name: 'Motherfuckin-Cluster'
  },
  http: {
    port: 9210
  }
});

// Console all events
Instance.onAny( function( data ) {
   console.log( this.event, data );
});

// Instance started.
Instance.once( 'node.started', function( error, report ) {

  console.log( 'Node started with pid [%s]', this.get( 'pid' ) );
});

