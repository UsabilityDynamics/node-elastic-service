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

var util = require( 'util' );
var _ = require( 'lodash' );

var Instance = require( 'elastic-client' ).create( '../../../Vendor/elasticsearch/bin/elasticsearch', {
  path: {
    data: '.dynamic/data',
    work: '.dynamic/work',
    logs: '.dynamic/logs'
  },
  cluster: {
    name: 'Chesty-Puller'
  },
  http: {
    port: 9200
  }
});

// Console all events.
Instance.onAny( function( data ) {

if (!data) return;
//  var d = _.pick({'data':'category', 'data':'message'})
try {
 JSON.parse(data);
} catch (error) {
 console.log('error', data.red );
}

/*

  console.log( util.inspect( _(data).pick('category', 'message' ).value(), {
    colors: true
  } ));
*/





});

// Instance started.
Instance.once( 'node.started', function( error, report ) {
  console.log( 'Node started with pid [%s]', this.get( 'pid' ) );



//console.log( this.index );

/*
 setTimeout(function() {
   Instance.index('test', 'user', require('faker').Helpers.userCard(), function( error, response ) {
     if ( !error ) {
       console.log( error );
     } else {
       console.log( response )
     }
   });

 }, 7000 );
*/


});

