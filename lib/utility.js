/**
 * Elastic Client Utility Methods
 *
 * @example
 *
 *    // Select specific methods to load
 *    var my_tools = ElasticClient.utility( 'if', 'extend', 'flatten', 'unwatch', 'watch' );
 *
 * @module elastic-client
 * @sub-module Utility
 * @for elastic-client
 *
 * @params {Aarguments} List of utilities to export.
 *
 * @author potanin@UD
 * @date 7/4/13
 */
function Utility() {
  return Object.keys( arguments ) ? require( 'lodash' ).pick.apply( null, [ Utility, Array.prototype.slice.call( arguments ) ] ) : Utility;
}

Object.defineProperties( module.exports = Utility, {
  defaults: {
    value: require( 'lodash' ).defaults,
    configurable: true,
    enumerable: true,
    writable: true
  },
  extend: {
    value: require( 'lodash' ).extend,
    configurable: true,
    enumerable: true,
    writable: true
  },
  convert_schema_to_mapping: {
    /**
     * Convert a JSON Schema to ES Mapping
     *
     * @param schema {Object} Valid JSON Schema
     * @returns {Object} ElasticSearch compliant mapping.
     */
    value: function convert_schema_to_mapping( schema ) {
      var mapping = {};

      return mapping;
    },
    enumerable: true
  },
  convert_mapping_to_schema: {
    /**
     * Convert ES Mapping to a JSON Schema
     *
     * @param schema {Object} Valid JSON Schema
     * @returns {Object} ElasticSearch compliant mapping.
     */
    value: function convert_mapping_to_schema( mapping ) {
      var schema = {};
      return schema;
    },
    enumerable: true
  }
});