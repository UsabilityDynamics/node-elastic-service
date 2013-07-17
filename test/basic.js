/**
 * Mocha Test for express
 *
 * mocha express --reporter list --ui exports --watch
 *
 * @author potanin@UD
 * @date 7/11/13
 * @type {Object}
 */
module.exports = {

  /**
   * Prepare Environment
   *
   */
  'before': function() {

    // Dependancies
    require( 'should' );

    // Test file
    //module.example = require( '../examples/basic' );

  },

  'Object States "Express" example': {

    'adds states to server object': function() {
      //module.example.has.property( 'on' );
      //module.example.has.property( 'emit' );
    }

  }

};