/*
  Link to task: https://www.codewars.com/kata/5286d92ec6b5a9045c000087/train/javascript

  In this kata, we want to convert a URL query string into a nested object. The query string will contain 
  parameters that may or may not have embedded dots ('.'), and these dots will be used to break up the properties 
  into the nested object.

  You will receive a string input that looks something like this:
  user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue

  Your method should return an object hash-map that looks like this:

  {
    'user': {
      'name': {
        'firstname': 'Bob',
        'lastname': 'Smith'
      },
      'favoritecolor': 'Light Blue'
    }
  }
  * You can expect valid input. You won't see input like:
    // This will NOT happen
    foo=1&foo.bar=2
  * All properties and values will be strings — and the values should be left as strings to pass the tests.
  * Make sure you decode the URI components correctly
*/

// The first solution:
// Converts a URL Query String into an object map
function convertQueryToMap(query) {
  if (!query) {
    return {};
  }
  const map = {};
  const parts = query.split('&');
  for(let i = 0; i < parts.length; i++) {
    let [key, value] = parts[i].split('=');
    setValue(key.split('.'), map, value);
  }
  return map;
  function setValue(keys, obj, val) {
    if (keys.length === 1) {
      obj[keys[0]] = decodeURIComponent(val);
    } else {
      obj[keys[0]] = obj[keys[0]] ? obj[keys[0]] : {};
      let nextObj = obj[keys[0]];
      keys.shift();
      setValue(keys, nextObj, val);
    }
  }
}
