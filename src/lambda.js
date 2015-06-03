/**
 * Random utility functions collection.
 * Copyright 2015 Adrian Carballo

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *     http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


'use strict';


// Comparison functions

export let identity = obj => obj;

export let equals = (a, b) => a === b;

export let compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;


// Type functions

/**
 * This function determines the correct type of an object in a cross-browser compatible
 * manner. It avoids common pitfalls with the naive typeof operator.
 * @param  {*} value Object to determine the type for
 * @return {string} The type of the object.
 */
export let typeOf = function(value) {
  let naive = typeof value;
  if (naive == 'object') {
    if (value) {
      // Check these first, so we can avoid calling Object.prototype.toString if possible.
      // IE improperly marshals tyepof across execution contexts, but a cross-context 
      // object will still return false for "instanceof Object".
      if (value instanceof Array) {
        return 'array';
      } else if (value instanceof Object) {
        return naive;
      }

      let className = value.toString();
      // In Firefox 3.6, attempting to access iframe window objects' length
      // property throws an NS_ERROR_FAILURE, so we need to special-case it
      // here.
      if (className == '[object Window]') {
        return 'object';
      }

      if ((className == '[object Array]' ||
            // In IE all non value types are wrapped as objects across window
            // boundaries (not iframe though) so we have to do object detection
            // for this edge case.
          typeof value.length == 'number' &&
          typeof value.splice != 'undefined' &&
          typeof value.propertyIsEnumerable != 'undefined' &&
          !value.propertyIsEnumerable('splice')

          )) {
        return 'array';
      }

      // IE in cross-window calls does not correctly marshal the function type
      // (it appears just as an object) so we cannot use just typeof val ==
      // 'function'. However, if the object has a call property, it is a
      // function.
      if ((className == '[object Function]' ||
          typeof value.call != 'undefined' &&
          typeof value.propertyIsEnumerable != 'undefined' &&
          !value.propertyIsEnumerable('call'))) {
        return 'function';
      }

    } else {
      return 'null';
    }

  } else if (naive == 'function' && typeof value.call == 'undefined') {
    // In Safari typeof nodeList returns 'function', and on Firefox typeof
    // behaves similarly for HTML{Applet,Embed,Object}, Elements and RegExps. We
    // would like to return object for those and we can detect an invalid
    // function by making sure that the function object has a call method.
    return 'object';
  }
  return naive;
};

export let isFunction = obj => typeOf(obj) == 'function';

export let isArray = obj => typeOf(obj) == 'array';

export let isObject = obj => typeOf(obj) == 'object';

export let isNumber = obj => typeOf(obj) == 'number';

export let isString = obj => typeOf(obj) == 'string';

export let isInteger = obj => isNumber(obj) && Math.floor(obj) === obj;


// Random number generator functions

export let randomInt = (min=0, max=2) => Math.floor(Math.random() * (max - min) + min);

export let randomBit = (p=0.5) => Math.random() < p;


// Numeric and algebraic functions

export let log2 = x => x > 0 ? Math.log(x) * 1.442695 : Number.NaN;

export let logBase = (x, y) => y > 0 && x > 0 ? Math.log(y) / Math.log(x) : Number.NaN;


// Object oriented functions.

/**
 * Adds a field to a particular object. This field is a simulated private member, that
 * is not enumerable (i.e doesn't appear in Object.keys()) and can be reassigned.
 * See: http://mzl.la/1dfsAUl
 * @param  {*} obj The object context for the field.
 * @param  {string} key Name of the field
 * @param  {*} val Value that will be assigned to the field.
 */
export let addField = (obj, key, val=null) =>
    Object.defineProperty(obj, key, { value: val, writable: true });


/**
 * Adds a final field to a particular object. This field is a simulated private member,
 * that is not enumerable (i.e doesn't appear in Object.keys()) and cannot be reassigned.
 * See: http://mzl.la/1dfsAUl
 * @param  {*} obj The object context for the field.
 * @param  {string} key Name of the field
 * @param  {*} val Value that will be assigned to the field.
 */
export let finalField = (obj, key, val=null) =>
    Object.defineProperty(obj, key, { value: val });


/**
 * Adds a property to a particular object. This property is a public member, that
 * is enumerable (i.e it appears in Object.keys()) and can be reassigned.
 * See: http://mzl.la/1dfsAUl
 * @param  {*} obj The object context for the property.
 * @param  {string} key Name of the property
 * @param  {*} val Value that will be assigned to the property.
 */
export let addProperty = (obj, key, val=null) =>
    Object.defineProperty(obj, key, { value: val, writable: true, enumerable: true });


/**
 * Adds a final property to a particular object. This property is a public member, that
 * is enumerable (i.e it appears in Object.keys()) and cannot be reassigned.
 * See: http://mzl.la/1dfsAUl
 * @param  {*} obj The object context for the property.
 * @param  {string} key Name of the property
 * @param  {*} val Value that will be assigned to the property.
 */
export let finalProperty = (obj, key, val=null) =>
    Object.defineProperty(obj, key, { value: val, writable: false, enumerable: true });
