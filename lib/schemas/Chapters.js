//Chapters Schema 
chaptersSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    max: 200
  },
  originalbody: {
    type: String,
    label: 'Original'
  },
  translationbody: {
	    type: String,
	    label: 'Translated'
  },
  docid: {
    type: String,
  },
  contributor: {
    type: String,
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
