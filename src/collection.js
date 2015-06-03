/**
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
import { equals, compare, addField, finalField, finalProperty } from './lambda.js';


/**
 * Abstract base class declaration for all collection types.
 * @class
 */
export default class Collection {

  /**
   * Creates a new collection object.
   * @param {Object} opts The options for the new collection type.
   * @param {function} opts.equals The function used to determine whether two items in the
   * collection are the same.
   * @param {function} opts.compare The function used to determine whether a given object 
   * is less than, greater than, or equal to another object in the collection.
   * @constructor
   */
  constructor(opts={equals, compare}) {
    finalField(this, '$equals', opts.equals);
    finalField(this, '$compare', opts.compare);
    addField(this, '_count', 0);
  }

  /**
   * Returns the total count of elements in the collection.
   */
  count() {}

  /**
   * Adds a new value to the collection.
   * @param value The value to add to the collection.
   */
  add(value) {}

  /**
   * Removes a given value from the collection. Some collections may require to pass in a 
   * value to remove, some others, like a queue or stack, may remove from the elements 
   * already in the collection.
   */
  remove() {}

  /**
   * Checks whether a given value is present in the collection.
   * @param value The value to check from inside of the collection. This method uses the 
   * specified {opts.equals} and {opts.compare} functions that were passed into the 
   * constructor.
   */
  contains(value) {}
}


/**
 * Abstract base class declaration for a node type that wraps a value for all node 
 * collection types.
 * @class
 */
export class Node {

  /**
   * Creates a new Node object that contains the specified value.
   * @param {T} value
   * @template T
   * @constructor
   */
  constructor(value) {
    finalField(this, '_value', value);
  }
}


/**
 * A custom error class that inherits from the Error object.
 * @extends {Error}
 * @class
 */
export class CustomError extends Error {

  /**
   * Returns a new CustomError with the specified message.
   * @param message
   * @constructor
   */
  constructor (message) {
    super();
    finalProperty(this, 'message', message);

    if (Error.hasOwnProperty('captureStackTrace'))
      Error.captureStackTrace(this, this.constructor);
    else
      finalProperty(this, 'stack', (new Error()).stack);
  }

  get name () {
    return this.constructor.name;
  }

}

/**
 * Custom error to signal an invalid operation.
 * @extends {CustomError}
 * @class
 */
export class InvalidOperationError extends CustomError {}
