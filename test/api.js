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
      var EC = require( '../' );
      EC.should.have.property( 'utility' );
      EC.should.have.property( 'logger' );
      EC.should.have.property( 'create' );
    }

  }

};