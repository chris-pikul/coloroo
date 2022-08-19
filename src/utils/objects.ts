/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * Provides utilities for objects
 */

/**
 * Tests that all the given properties of a given object match against a pattern
 * object.
 * 
 * Each key is checked for equality, as well as the values being matched against
 * the same type as the pattern.
 * 
 * @param {Object} obj Object to test
 * @param {Object} pattern Object containing dummy data to match against
 * @param {boolean} [loose = false] If true, this flag denotes that the object
 * should loosely match, meaning extra keys are ignored and only one matching
 * property results in a true return.
 * @param {boolean} [ignoreType = false] If true, type checking the values will
 * be ignored.
 * @returns {boolean} True if all the keys and value types match against the
 * given pattern.
 */
export function objectMatchesPattern(
  obj:Record<any, any>,
  pattern:Record<any, any>,
  loose = false,
  ignoreType = false,
):boolean {
  const tests = Object.entries(pattern)
    .map(([ key, value ]) => [ key, typeof value ]);
  
  // eslint-disable-next-line max-len
  const check = ([ key, value ]:Array<any>) => tests.some(([ testKey, testType ]) => {
    if(ignoreType)
      return key === testKey;
    return (key === testKey && typeof value === testType);
  });

  if(loose)
    return Object.entries(obj).some(check);
  
  return Object.entries(obj)
    .every(check);
}
