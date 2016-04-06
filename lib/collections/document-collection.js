 // stores all the documents
//added 'this' to document in order to let share.js access it better
this.Documents = new Mongo.Collection("documents");

commentsSchema = new SimpleSchema({
	  title: {
	    type: String,
	    label: 'Title',
	    max: 200
	  },
	  body: {
	    type: String,
	    label: 'Comment',
	    max: 1000
	  },
	  docid: {
	    type: String,
	  },
	  owner: {
	    type: String,
	  },
	  createdOn: {
	    type: Date,
	        label: "Created On",
	        autoValue: function() {
	            if (!this.isSet) {
	                return new Date();
	            }
	            else {
	              this.unset();
	            }},
	        autoform: { omit: true }
	  }
	});

// store the comments
Comments = new Mongo.Collection("comments");
//Comments Schema 
Comments.attachSchema(commentsSchema);

//Chapters Schema 
chaptersSchema = new SimpleSchema({
  title: {
    type: String,
    max: 200
  },
  originalbody: {
    type: String,
    optional: true,
  },
  translationbody: {
    type: String,
    optional: true,
  },
  docid: {
    type: String,
  },
  contributor: {
    type: String,
    optional: true,
  },
  LastChanged: {
    type: Date,
    autoValue: function() {
        if (!this.isSet) {
            return new Date();
        }
        else {
          this.unset();
        }},
    autoform: { omit: true }
  }
});

Chapters = new Mongo.Collection("chapters");
Chapters.attachSchema(chaptersSchema);


//stores sets of users that are editing documents
EditingUsers = new Mongo.Collection("editingUsers");