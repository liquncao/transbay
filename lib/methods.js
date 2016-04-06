// methods that provide write access to the data
Meteor.methods({

	
 heartbeat: function(options) {
        if (!this.userId) { return; }
        var user = Meteor.users.findOne(this.userId);
        if (user) {
            Meteor.users.update(user._id, {$set: {heartbeat: new Date()}});
        }
    },
	
  addDoc: function(){
    var doc;
    if (!this.userId) { return;} //no logged in user - give up
    // user is logged in let's insert a doc
    doc = {
          owner: this.userId,
          createdOn: new Date(),
          title: 'New document',
          isPrivate: false,
        };
    // get back an id of the doc we've inserted
    var id = Documents.insert(doc);
    return id;
  },
  

  updateChapterTranslation: function(chapterTranslation, chapId) {
	  // updateing document privacy setting - has to have the id the user sent
	  // and to be owned by the current user
	    var OrigChapter = Chapters.findOne({_id: chapId, contributor: this.userId});
	    if (OrigChapter) { 
	    	Chapters.update(OrigChapter, {$set: {translationbody:chapterTranslation}});
	    }
	  },
  

  updateChapterOriginal: function(chapterOrig, chapId) {
	  // updateing document privacy setting - has to have the id the user sent
	  // and to be owned by the current user
	    var OrigChapter = Chapters.findOne({_id: chapId, contributor: this.userId});
	    if (OrigChapter) { 
	    	Chapters.update(OrigChapter, {$set: {originalbody:chapterOrig}});
	    }
	  },

  updateDocPrivacy: function(doc) {
  // updateing document privacy setting - has to have the id the user sent
  // and to be owned by the current user
    var realDoc = Documents.findOne({_id: doc._id, owner: this.userId});
    if (realDoc) { // got a document update the private field and store it back to the db
      realDoc.isPrivate = doc.isPrivate;
      Documents.update({_id: doc._id}, realDoc);
    }
  },

  // allows changes to the editing users collection
  addEditingUser: function(docid){
    // get access to the user and a document
    var doc, user, eusers; //eusers - editing users
    doc = Documents.findOne({_id: docid});
    //check if doc exists and user is logged in
    if (!doc) {return;} //no doc - give up
    if (!this.userId) { return;} //no logged in user - give up
    // we have a doc and a userId
    user = Meteor.user().profile;
    eusers = EditingUsers.findOne({docid: doc._id});
    if (!eusers) {
      eusers = {
        docid: doc._id,
        users: {},
      };
    }
    user.lastEdit = new Date(); // remember when the users last edited the doc
    eusers.users[this.userId] = user;
    // check if eusers already exists with the doc._id and replace it
    // otherwise insert one
    EditingUsers.upsert({_id: eusers._id}, eusers);
  },

  // add a comment to comment collection
  addComment:function(comment){
    if (this.userId){// we have a user
      comment.owner = this.userId;
      return Comments.insert(comment);
    }
    return;
  },
  
  addChapter: function(docid){
	    var chapter;
	    if (!this.userId) { return;} //no logged in user - give up
	    doc = Documents.findOne({_id: docid});
	    //check if doc exists and user is logged in
	    if (!this.userId) { return;} //no logged in user - give up
	    if (!doc) {return;} //no doc - give up
	    // user is logged in let's insert a chapter
	    chapter = {
	    	  contributor: this.userId,
	          title: 'New chapter',
	          docid: docid
	        };
	    // get back an id of the doc we've inserted
	    var id = Chapters.insert(chapter);
	    console.log("Chapter added with DocID:" + docid + "And ID" + id);
	    return id;
	  },
});
