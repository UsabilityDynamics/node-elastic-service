/**
 * Document Module
 *
 * -
 *
 * @param index {String}
 * @param type {String}
 * @param id {String}
 * @param data {Object}
 *
 * @author potanin@UD
 * @date 7/4/13
 * @type {Object}
 */
function Document( index, type, id, data ) {

  var Observe = require( 'observe.io' );

  // Create Instance using ElasticClient as Prototype
  var Instance = Object.create( this, {
    _index: {
      value: index || null,
      enumerable: true,
      writable: true
    },
    _type: {
      value: type || null,
      enumerable: true,
      writable: true
    },
    _id: {
      value: id || null,
      enumerable: true,
      writable: true
    },
  });

  Observe.Emitter.extend( Instance, [ index, type, id, ] );

  console.log( Instance._channel );
  // Return Instance
  return Instance;

}

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Document.prototype, {
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
Object.defineProperties( module.exports = Document, {
  create: {
    /**
     * Create Instance
     *
     * @method create
     * @returns {Function}
     */
    get: function create() {
      return function( options ) { return new Document( options ); }
    },
    enumerable: true
  }
});
