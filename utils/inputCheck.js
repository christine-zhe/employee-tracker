// utility to check if an object has the required properties
// e.g., inputCheck(object, 'prop1', 'prop2', 'etc')

module.exports = function(obj, ...props) {
   const errors = [];
  // const errors = inputCheck(req.body, 'party_id');

  // if (errors) {
  //   res.status(400).json({ error: errors });
  //   return;
  // }
  props.forEach((prop) => {
    // if property is blank or doesn't exist, add to errors array
    if (obj[prop] === undefined || obj[prop] === '') {
      errors.push(`No ${prop} specified.`);
    }
  });

  if (errors.length) {
    return {
      error: errors.join(' ')
    };
  }
  
  return null;
};

// INSERT INTO candidates (first_name, last_name, industry_connected)
// VALUES ('Ronald', 'Firbank', 1);