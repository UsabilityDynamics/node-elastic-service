/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['index.js']) {
  _$jscoverage['index.js'] = [];
  _$jscoverage['index.js'][12] = 0;
  _$jscoverage['index.js'][14] = 0;
  _$jscoverage['index.js'][22] = 0;
  _$jscoverage['index.js'][23] = 0;
  _$jscoverage['index.js'][29] = 0;
  _$jscoverage['index.js'][41] = 0;
  _$jscoverage['index.js'][50] = 0;
}
_$jscoverage['index.js'][12]++;
function Index(options) {
  _$jscoverage['index.js'][14]++;
  Object.defineProperties(this, {settings: {value: options || {}, enumerable: true, writable: true}});
  _$jscoverage['index.js'][22]++;
  return this;
}
_$jscoverage['index.js'][23]++;
;
_$jscoverage['index.js'][29]++;
Object.defineProperties(Index.prototype, {prop: {value: {}, enumerable: true, writable: false}});
_$jscoverage['index.js'][41]++;
Object.defineProperties(module.exports = Index, {create: {get: (function create() {
  _$jscoverage['index.js'][50]++;
  return (function (options) {
  _$jscoverage['index.js'][50]++;
  return new Index(options);
});
}), enumerable: true}});
_$jscoverage['index.js'].source = ["/**"," * Index Module"," *"," * -"," *"," * @module Index"," * @constructor"," * @author potanin@UD"," * @date 7/4/13"," * @type {Object}"," */","function Index( options ) {","","  Object.defineProperties( this, {","    settings: {","      value: options || {},","      enumerable: true,","      writable: true","    }","  });","  ","  return this;","};","","/**"," * Prototypal Properties"," *"," */","Object.defineProperties( Index.prototype, {","  prop: {","    value: {},","    enumerable: true,","    writable: false    ","  }","});","","/**"," * Constructor Properties"," *"," */","Object.defineProperties( module.exports = Index, {","  create: {","    /**","     * Create Instance","     *","     * @method create","     * @for Index","     */","    get: function create() { ","      return function( options ) { return new Index( options ); } ","     },","    enumerable: true","  }","})"];