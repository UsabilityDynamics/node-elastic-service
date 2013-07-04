/**
 * Elastic Client Utilities
 *
 * @module elastic-client
 * @sub-module utilities
 *
 * @author potanin@UD
 * @date 7/4/13
 */
var Utilities = Object.defineProperties( module.exports, {
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
  },
});