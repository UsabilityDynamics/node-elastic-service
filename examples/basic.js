/**
 * Basic ElasticService Example
 *
 * @author potanin@ud
 */
require( 'elastic-service' ).create( function configure () {

  // Set Port
  this.set( 'port', 9200 );

  this.on( 'started', function started() {
    console.log( 'Service Started pid:[%s]', this.pid );

    // Console all events.
    this.on( '**', function( data ) {});

  });

  this.on( 'stopped', function stopped() {
    console.log( 'Service Stopped pid:[%s]', this.pid );
  });

  // Export
  module.exports = this;

});
