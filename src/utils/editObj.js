// Removes an item from an object by key and returns the edited object
const filterObjKey = (object, key) => {
    const newObj = { ...object };
    delete newObj[key];
    return newObj;
  }
  
  // Removes an item from an array by index and returns the edited array
  const filterArray = (array, index) => {
    const newArr = [...array];
    newArr.splice(index, 1);
    return newArr;
  }
  
  // Sets the value of an object by key
  const editObjVal = (object, key, value) => {
    const newObj = { ...object };
    newObj[key] = value;
    return newObj;
  }
  
  const addToArr = (object, key, value) => {
    const oldArr = object[key];
    const newArr = [...oldArr, value];
    const newObj = { ...object, [key]: newArr };
    return newObj;
  }
  
  // Gets the value from an object by a path specified as an array
  const getByPath = (obj, path) => {
    let result = obj;
    for (let i = 0; i < path.length; i++) {
      result = result[path[i]];
    }
    return result;
  }
  
  // Compares two objects and returns true or false if they are equal
  const objInclude = (arr, item) => {
    let included = false;
    arr.forEach((elem) => {
      if (JSON.stringify(elem) === JSON.stringify(item)) {
        included = true;
      }
    });
    return included;
  }

  const objEmpty = (obj) => {
    return JSON.stringify(obj) === '{}';
  }

  export {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty}