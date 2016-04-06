
Template.docMeta.helpers({
  document: function() {
    return Documents.findOne({_id: Session.get('docid')});
  },

  canEdit: function() {
    var doc = Documents.findOne({_id: Session.get('docid')});
    if (doc && doc.owner === Meteor.userId()) {
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

Template.docMeta.events({
  "click .js-toggle-private": function(event) {
    var doc = {
                _id: Session.get('docid'), //currently edited document
                isPrivate: event.target.checked, //true or false
              };
    Meteor.call('updateDocPrivacy' , doc);
  },
});
