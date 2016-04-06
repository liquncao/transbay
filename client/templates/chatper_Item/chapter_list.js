
Template.chapterList.helpers({
  isAnyChapters: function() {
	  var documentId = Session.get('docid');
	 if (!Chapters.findOne({docid: documentId})) {
    	console.log("Couldn't find a chapter with docId: "+documentId );
      return false;
    } else {
    	console.log("Found a chapter with docId:" +documentId);
      return true;
    }
  },
  
  chapters: function() {
	  var documentId = Session.get('docid');
    return Chapters.find({docid:documentId});
  },

  createdAtFormatted: function () {
    return moment(this.LastChanged).calendar();
  },
  
  onError: function () {
      return function (error) { alert("BOO!"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("YAY!"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        if (confirm('Really delete "' + doc.name + '"?')) {
          this.remove();
        }
      };
    }
});

Template.chapterList.events({
  "click .js-add-chapter": function(event){
     event.preventDefault();
     if (!Meteor.user()) { //user not logged in
       $('#docList-login-modal-content').text("Please log in to add a new document");
       $('#docList-login-modal').modal('toggle');
     } else {
       // User is logged in. call add Chapter method
       var documentId = Session.get('docid');
       console.log(documentId);
       var id = Meteor.call('addChapter', documentId, function(error, result) {
         if(error){
           console.log(error.reason);
           return;
         }
         // all good - we got an id
         Session.set('chapterid', result);
       });
     }
   },
 });
