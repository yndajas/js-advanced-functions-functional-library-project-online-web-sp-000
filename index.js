const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const values = this.values(collection);
      for (const value of values) {
        callback(value);
      }
      return collection;
    },

    map: function(collection, callback) {
      const values = this.values(collection);
      const newCollection = [];
      for (const value of values) {
        newCollection.push(callback(value));
      }
      return newCollection;
    },

    reduce: function(collection, callback, startingValue) {
      const values = collection.slice();
      let accumulator = (startingValue || values.shift());
      for (const value of values) {
        accumulator = callback(accumulator, value);
      }
      return accumulator;
    },

    find: function(collection, callback) {
      for (const value of collection) {
        if (callback(value)) {
          return value;
        }
      }
    },

    filter: function(collection, callback) {
      const newCollection = [];
      for (const value of collection) {
        if (callback(value)) {
          newCollection.push(value);
        }
      }
      return newCollection;
    },

    size: function(collection) {
      let size = 0;
      const values = this.values(collection);
      for (const value of values) {
        size++;
      }
      return size;
    },

    first: function(array, number) {
      if (number) {
        return array.slice(0, number);
      } else {
        return array[0];
      }
    },

    last: function(array, number) {
      const size = fi.size(array);
      if (number) {
        return array.slice(size - number, size);
      } else {
        return array[size - 1];
      }
    },

    compact: function(array) {
      const newArray = [];
      for (const value of array) {
        if (!!value) {
          newArray.push(value);
        }
      }
      return newArray;
    },

    sortBy: function(array, callback) {
      return array.slice().sort((a, b) => callback(a) - callback(b)); 
    },

    flatten: function(array, shallow) {
      // initialise new array based on passed in array, to be returned at the end of the function
      let newArray = array.slice();
      // initialise working array to reassign to newArray at the end of each pass of the do...while loop (or at the end of the for loop in the shallow version)
      let workingArray;

      if (shallow) {
        workingArray = [];
        for (const element of newArray) {
          if (Array.isArray(element)) {
            workingArray.push(...element);
          } else {
            workingArray.push(element);
          }
        }
        newArray = workingArray.slice();
      } else {
        // create boolean variable to indicate whether array still contains arrays
        let containedArray;
        do {
          // (re)set workingArray to empty array
          workingArray = [];
          // (re)set boolean to false
          containedArray = false;
          for (const element of newArray) {
            if (Array.isArray(element)) {
              // if the current element is an array, add its value to the working array and set containedArray flag to true
              workingArray.push(...element);
              containedArray = true;
            } else {
              // otherwise just add the element to the working array
              workingArray.push(element);
            }
          }
          // reassigned the working array to the new array
          newArray = workingArray.slice();
        } while (containedArray === true) // keep going until no more the arrays contains no nested arrays
      }

      return newArray;
    },

    uniq: function(array, isSorted, callback) {
      const newArray = [];
      if (isSorted) {
        newArray.push(array[0]);
        for (let i = 1; i < array.length; i++) {
          if (array[i] !== array[i - 1]) {
            newArray.push(array[i]);
          }
        }
      } else if (callback) {
        const mutatedArray = [];
        for (const element of array) {
          if (!mutatedArray.includes(callback(element))) {
            newArray.push(element);
            // keep track of the results of calling the function on each element, so the includes check above can be run
            mutatedArray.push(callback(element));
          }
        }
      } else {
        for (const element of array) {
          if (!newArray.includes(element)) {
            newArray.push(element);
          }
        }  
      }
      return newArray;
    },

    keys: function(object) {
      return this.map(Object.entries(object), keyValue => keyValue[0]);
    },

    values: function(collection) {
      if (Array.isArray(collection)) {
        return collection;
      } else {
        return this.map(Object.entries(collection), keyValue => keyValue[1]);
      }
    },

    functions: function(object) {
      const functions = [];
      for (const keyValue of Object.entries(object)) {
        if (typeof(keyValue[1]) === "function") {
          functions.push(keyValue[0]);
        }
      }
      return functions;
    },
  }
})()

fi.libraryMethod()
