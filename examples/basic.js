/**
 * -
 *
 * -
 *
 * @author potanin
 * @date 7/12/13
 */

// Instantiate.
require( 'colors' );

var Instance = require( 'elastic-client' ).create( '../../Vendor/elasticsearch/bin/elasticsearch', {
  cluster: {
    name: 'Chesty-Puller'
  },
  http: { port: 9220 }
});

// Cconsole all events.
Instance.onAny( function( data ) {
  if( data && data.category ) {
    console.log( data.category.magenta, data.message.cyan );
  } else {
    // could not parse message - troubleshoot
    console.log( "Could Not Parse", data );
  }
});

// Instance started.
Instance.once( 'node.started', function( error, report ) {
  console.log( 'Node started with pid [%s]', this.get( 'pid' ) );
});

