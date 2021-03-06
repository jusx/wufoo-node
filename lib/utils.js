/**
 *  Utility Functions.
 */

module.exports = {
   // Copy an array of json to an array of objects as constructed by the Factory:
   //    - Make all properties camelcase.
   //
   // @params {Array} Objects to clone.
   // @params {Function} Factory of the object. This Function must return a new instantiated object to have the properties copied to.
   cloneObjects: function (objects, factory) {
      var retarr = new Array();
      for (var i =0; i < objects.length; i++) {
         var obj = objects[i];
         var ret = factory();
         for (var prop in obj) {
            var val = obj[prop];
            // Semantics. Camelcase properties please. JSON returned from Wufoo is titlecase properties.
            var propName = (prop.match(/[A-Z]/g).length <= 1 || prop.match("ID"))? prop.toLowerCase() :  prop.charAt(0).toLowerCase() + prop.slice(1);
            ret[propName] = (Object.prototype.toString.call( val ) === '[object Array]')? this.cloneObjects(val, function(){return {}}) : val;
         }
         retarr.push(ret);
      }
      return retarr;
   },

   // build a json with the properties: params and fn. Primarily for backward compatibility as we've added params as the first
   // argument in a lot of the of the public API functions.
   buildArgs: function() {
     var args = Array.prototype.slice.call(arguments, 0),
        params = (args.length==2 ? args.shift() : {}),
        fn = args.shift();
     return {params: params, fn: fn};
   }
};
