// stores all the documents
//added 'this' to document in order to let share.js access it better
this.Documents = new Mongo.Collection("documents");

// stores sets of users that are editing documents
EditingUsers = new Mongo.Collection("editingUsers");

// store the comments
Comments = new Mongo.Collection("comments");

//Comments Schema
Comments.attachSchema(new SimpleSchema({
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
}));
