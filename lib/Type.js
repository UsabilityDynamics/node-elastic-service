/**
 * Type Module
 *
 * -
 *
 * @module Type
 * @constructor
 * @author potanin@UD
 * @date 7/4/13
 * @type {Object}
 */
function Type( options ) {

  Object.defineProperties( this, {
    Document: {
      value: this.constructor.async.apply( this.Document.bind, index, type ),
      enumerable: true,
      writable: true
    },
    settings: {
      value: options || {},
      enumerable: true,
      writable: true
    }
  });

  //Document: this.async.apply( this.Document.bind, index, type ),

  return this;
};

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Type.prototype, {
  set_schema: {
    value: function set_schema( schema ) {
      return this;
    },
    enumerable: true,
    writable: false    
  },
  set_mapping: {
    value: function set_mapping( mapping ) {
      return this;
    },
    enumerable: true,
    writable: false
  },
  get_schema: {
    value: function get_schema( schema ) {},
    enumerable: true,
    writable: false
  },
  get_mapping: {
    value: function get_mapping( mapping ) {},
    enumerable: true,
    writable: false
  }
});

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = Type, {
  create: {
    /**
     * Create Instance
     *
     * @method create
     * @for Type
     */
    get: function create() { 
      return function( options ) { return new Type( options ); } 
     },
    enumerable: true
  }
})
