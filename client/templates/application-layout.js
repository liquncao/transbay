var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var heartbeatInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionHeartbeatInterval || (3*60*1000); // 3mins
var activityEvents = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionActivityEvents || 'mousemove click keydown';

var CONNECTION_ISSUE_TIMEOUT = 5000;
var NOTIFICATION_TIMEOUT=2000;

Meteor.startup(function () {

  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(function () {
    // Launch screen handle created in lib/router.js
    dataReadyHold.release();

    // Show the connection error box
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);
  
  
  
  //Starting up the sAlart Notification Module
  sAlert.config({
      effect: 'stackslide',
      position: 'top-right',
      timeout: NOTIFICATION_TIMEOUT,
      html: false,
      onRouteClose: true,
      stack: true,
      offset: 50,
      beep: false,
      onClose: _.noop
    });
  
  Meteor.setInterval(function() {
      if (Meteor.userId() && activityDetected) {
          Meteor.call('heartbeat');
          activityDetected = false;
      }
      else
      {
  	    Meteor.logout();
	    Router.go('signin');
      }
  }, heartbeatInterval);
  
  $(document).on(activityEvents, function() {
	    activityDetected = true;
	 });
  
});


Template.applicationLayout.helpers({	
	  connected: function() {
		    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
		    	var CONNECTED = Meteor.status().connected
		      return CONNECTED;
		    } else {
		      return true;
		    }
		  }
});
