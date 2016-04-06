
Router.configure({
  layoutTemplate: 'ApplicationLayout',
  loadingTemplate: 'spinner'
});


dataReadyHold = null;

if (Meteor.isClient) {
	  // Keep showing the launch screen on mobile devices until we have loaded
	  // the app's data
	  dataReadyHold = LaunchScreen.hold();

	  // Show the loading screen on desktop
	  Router.onBeforeAction('loading', {except: ['join', 'signin']});
	  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.route('/signin', function () {
	  this.render('navbar', {to:"navbar"});
	  this.render('signin', {to:'main'});
	});

Router.route('/join', function () {
	  this.render('navbar', {to:"navbar"});
	  this.render('join', {to:'main'});
	});


Router.route('/docList', function () {
	if (this.ready()) {
	    // Handle for launch screen defined in app-body.js
	    dataReadyHold.release();
	  }
  this.render('navbar', {to:"navbar"});
  this.render('docList', {to:'main'});
});

Router.route('/documents/:_id', function () {
  //updating the session id for the right document the user wants to load.
	
  Session.set('docid', this.params._id);
  this.render('navbar', {to:"navbar"});	
  this.render('sidebar', {to:"sidebar"});	
  this.render('chapterList', {to:'main'});
});

Router.route('/chapters/:_id', function () {
	  //updating the session id for the right document the user wants to load.
	  Session.set('chapterid', this.params._id);
	  this.render('navbar', {to:"navbar"});
	  this.render('chapterItem', {to:'main'});
});

Router.route('/', function () {
	  this.render('navbar', {to:"navbar"});
	  this.render('docList', {to:'main'});
	});