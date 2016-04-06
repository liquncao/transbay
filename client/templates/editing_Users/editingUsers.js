
Template.editingUsers.helpers({
  // retrieve a set of users that are editing this document
  users: function() {
    var doc, eusers;
    var users = [];
    doc = Documents.findOne({_id: Session.get('docid')});
    if (!doc){return;}// give up
    eusers = EditingUsers.findOne({docid: doc._id});
    if (!eusers) {return;} //give up
    // iterate over the eusers object keys and turn it into an array.
    var i = 0; //counter
    for (var user_id in eusers.users){
      users[i] = fixObjectKeys(eusers.users[user_id]); // store each user object into an array
      i++;
    }
    return users;
  }
});

//renames object keys by removing hyphens to make the compatible
// with spacebars.
function fixObjectKeys(obj) {
  var newObj = {};
  for (var key in obj){
    var key2 = key.replace("-", "");
    newObj[key2] = obj[key];
  }
  return newObj;
}
