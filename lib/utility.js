/**
 * Elastic Client Utility
 *
 * @module elastic-client
 * @sub-module Utility
 *
 * @author potanin@UD
 * @date 7/4/13
 */
var Utility = Object.defineProperties( module.exports, {
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
  inherit: {
    /**
     * Carefully inherit properties
     *
     * @param target {Object} Object to add properties to.
     * @param target {Object} Source object.
     * @returns {Object} Extended target.
     */
    value: function inherit( target, source ) {
      target = target || {};
      source = source || {};

      for( var key in source ) {
        Object.defineProperty( target, key, Object.getOwnPropertyDescriptor( source, key ));
      }

      return source;
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
  },
});