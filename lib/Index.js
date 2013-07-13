/**
 * Index Module
 *
 * -
 *
 * @module Index
 * @constructor
 * @author potanin@UD
 * @date 7/4/13
 * @type {Object}
 */
function Index( options ) {

  Object.defineProperties( this, {
    settings: {
      value: options || {},
      enumerable: true,
      writable: true
    }
  });

  return this;
};

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Index.prototype, {
  prop: {
    value: {},
    enumerable: true,
    writable: false
  }
});

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = Index, {
  create: {
    /**
     * Create Instance
     *
     * @method create
     * @for Index
     */
    get: function create() {
      return function( options ) {
        return new Index( options );
      }
     },
    enumerable: true
  }
})
