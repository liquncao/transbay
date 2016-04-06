var staleSessionPurgeInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionPurgeInterval || (1*60*1000); // 1min
var inactivityTimeout = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionInactivityTimeout || (30*60*1000); // 30mins


Meteor.setInterval(function() {
    var now = new Date(), overdueTimestamp = new Date(now-inactivityTimeout);
    Meteor.users.update({heartbeat: {$lt: overdueTimestamp}},
                        {$set: {'services.resume.loginTokens': []},
                         $unset: {heartbeat:1}},
                        {multi: true});
}, staleSessionPurgeInterval);