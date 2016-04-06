Meteor.publish("documents", function(){
  return Documents.find({
    $or: [
      {isPrivate:{$ne: true}}, // startup default doc has no isPrivate. comes as undefined
      {owner:this.userId}
      ]
    });
});

// users editing the docs
Meteor.publish("editingUsers", function(){
  return EditingUsers.find();
});

// comments on docs
Meteor.publish("comments", function(){
  return Comments.find();
});
