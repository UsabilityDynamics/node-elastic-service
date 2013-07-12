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
  cluster: {
    name: 'Example-Cluster'
  },
  path: {
    bin: '/usr/local/Cellar/elasticsearch/bin/elasticsearch',
    logs: './logs_directory'
  }
});

// Console all events
Instance.onAny( function( data ) {
  // console.log( this.event, this );
});

// Instance started.
Instance.once( 'node.started', function( error, report ) {
  console.log( 'Node started with pid [%s]', this.get( 'pid' ) );
});
