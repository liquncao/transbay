Template.insertCommentForm.helpers({
  // find current doc id
  docid: function() {
    return Session.get('docid');
  }
});

SimpleSchema.debug = true;
