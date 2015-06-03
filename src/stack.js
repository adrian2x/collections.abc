/**
 * Copyright 2015 Adrian Carballo.
 * Stack data structure implementation using an array.
 * This implementation relies on the V8 optimizations to array.push and array.pop methods.
 * This assumption might not be true for other JS engines.

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
import Collection, { Node, InvalidOperationError } from './collection.js';
import { finalField } from './lambda.js';


/**
 * Stack collection type implemented with an array.
 * @extends {Collection}
 * @template T
 */
export default class Stack extends Collection {

  /**
   * Creates a new Stack with the specified options that are passed to the
   * {Collection} constructor.
   * @param {Object} opts
   * @constructor
   */
  constructor(opts) {
    super(opts);
    finalField(this, '_items', []);
  }


  /**
   * Returns the total count of items that are in the stack.
   * @returns {number}
   * @override
   */
  count() {
    return this._items.length;
  }


  /**
   * Adds a new value to the top of the Stack.
   * @param value The value to add to the stack.
   * @returns {Stack}
   * @override
   */
  add(value) {
    debugger;
    let el = new Node(value);
    this._items.push(el);
    return this;
  }


  /**
   * Removes a value from the top of the Stack.
   * @returns {T}
   * @override
   */
  remove() {
    if (this._items.length < 1) {
      throw new InvalidOperationError('Cannot remove from an empty stack.');
    }
    return this._items.pop()._value;
  }


  /**
   * Checks if a value exists in the stack.
   * @param {T} value
   * @returns {boolean}
   * @override
   */
  contains(value) {
    for (let element of this._items) {
      if (this.$equals(value, element._value))
        return true;
    }
    return false;
  }


  /**
   * Returns the first element in the stack without removing it.
   * @returns {T}
   */
  peek() {
    if (this._items.length < 1) {
      throw new InvalidOperationError('Cannot peek from an empty stack.');
    }
    return this._items[this._items.length - 1]._value;
  }


  /**
   * Checks whether the stack has no items.
   * @returns {boolean}
   */
  isEmpty() {
    return this._items.length < 1;
  }


  /**
   * Returns an array with all the items in the stack.
   * @returns {Array.<T>}
   */
  values() {
    return this._items.map(item => item._value);
  }
}
