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
    data: './data_storage',
    work: './work_directory',
    logs: './logs_directory'
  }
});

Instance.onAny( function(data) {
  console.log( this.event, data || '-' );
});

Instance.once( 'node.started', function( error, report ) {
  console.log( 'Node started with pid [%s]', this.get( 'pid' ) );
  //console.log( require( 'util' ).inspect( this, { showHidden: true, colors: true } ) )
  //console.log( this );
});
