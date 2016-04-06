
Template.docList.helpers({
  isAnyDocument: function() {
    if (!Documents.findOne()) {
      return false;
    } else {
      return true;
    }
  },
  
  documents: function() {
    return Documents.find({});
  },

  createdAtFormatted: function () {
    return moment(this.createdOn).calendar();
  },
});

Template.docList.events({
  "click .js-add-doc": function(event){
     event.preventDefault();
     if (!Meteor.user()) { //user not logged in
       $('#docList-login-modal-content').text("Please log in to add a new document");
       $('#docList-login-modal').modal('toggle');
     } else {
       // User is logged in. Call a method to insert a doc
       var id = Meteor.call("addDoc", function(error, result) {
         if(error){
           console.log(error.reason);
           return;
         }
         // all good - we got an id
         Session.set('docid', result);
       });
     }
   },
 });
