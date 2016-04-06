
Template.chaptermeta.helpers({
	chapter: function() {
	return Chapters.findOne({_id: Session.get('chapterid')});
  },

  canEdit: function() {
    var chapter = Chapters.findOne({_id: Session.get('chapterid')});
    var doc = Documents.findOne({_id: Session.get('docid')});

    if (chapter && doc.owner === Meteor.userId()) {
      return true;
    } else {
      return false;
    }
  },

  checked: function() {
		if (this.isPrivate) {
			return 'checked';
		} else {
			return '';
		}
	},
});

Template.chaptermeta.events({
  "click .js-toggle-private": function(event) {
    var doc = {
                _id: Session.get('chapterid'), //currently edited document
                isPrivate: event.target.checked, //true or false
              };
    Meteor.call('updateDocPrivacy' , doc);
  },
});
