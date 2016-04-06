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