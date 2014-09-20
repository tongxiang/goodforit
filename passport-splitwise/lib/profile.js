/**
 * Parse splitWise object.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */

exports.parse = function(json){

  if('string' == typeof json) json = JSON.parse(json);

  var splitWise = {};

  splitWise.id = json.data.user.id;
  splitWise.username = json.data.user.username;
  splitWise.displayName = json.data.user.display_name;

  if(json.data.balance) splitWise.balance = json.data.balance;
  if(json.data.user.email) splitWise.email = json.data.user.email;
  if(json.data.user.phone) splitWise.phone = json.data.user.phone;

  return splitWise;
};