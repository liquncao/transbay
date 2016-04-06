
Template.navbar.helpers({
  documents: function() {
    return Documents.find({});
  }
});

Template.navbar.events({
  "click .js-add-doc": function(event){
     event.preventDefault();
     if (!Meteor.user()) { //user not logged in
       $('#login-modal-content').text("Please log in to add a new document");
       $('#login-modal').modal('toggle');
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

  //  "click .js-load-doc": function(event){ //don't need it anymore - loading is done via routing
  //    event.preventDefault();
   //
  //    if (!Meteor.user()) { //user not logged in
  //      $('#login-modal-content').text("Please log in to load a document");
  //      $('#login-modal').modal('toggle');
  //    } else {
  //      // User is logged in. load a doc
  //     Session.set('docid', this._id);
  //    }
  //  }

});
