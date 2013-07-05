/**
 * Document Module
 *
 * -
 *
 * @param index {String}
 * @param type {String}
 * @param id {String}
 * @param data {Object} When a document is being updated or created the data object should be set.
 *
 * @author potanin@UD
 * @date 7/4/13
 * @type {Object}
 */
function Document( index, type, id ) {

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

  // Create Elastic
  Observe.Emitter.extend( Instance, [ 'Document', index, type, id ] );

  // Inherit Document Prototype to Instance
  Observe.utility.inherit( Instance, Document.prototype );

  // Return Instance
  return Instance;

}

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Document.prototype, {
  commit: {
    /**
     * Force Immediate Save
     *
     */
    value: function commit() {
    },
    configurable: true,
    enumerable: false,
    writable: false
  },
  remove: {
    /**
     * Remove
     *
     */
    value: function remove() {},
    configurable: true,
    enumerable: false,
    writable: false
  },
  content: {
    /**
     * Set Content
     *
     */
    value: function content() {
      console.log( this );

    },
    configurable: true,
    enumerable: false,
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
