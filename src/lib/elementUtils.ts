import { Element, getRandomElement as originalGetRandomElement } from '@/data/periodicTableData';

/**
 * Gets a random element from the periodic table, excluding specified atomic numbers
 */
export const getRandomElementExcluding = (excludeAtomicNumbers: number[]): Element => {
  let newElement = originalGetRandomElement();
  
  // Keep trying until we get an element that's not in the excluded list
  while (excludeAtomicNumbers.includes(newElement.atomicNumber)) {
    newElement = originalGetRandomElement();
  }
  
  return newElement;
};
