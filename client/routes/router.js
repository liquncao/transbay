Router.configure({
  layoutTemplate: 'ApplicationLayout',
  loadingTemplate: 'spinner'
});

Router.route('/', function () {
  this.render('navbar', {to:"navbar"});
  this.render('docList', {to:'main'});
});

Router.route('/documents/:_id', function () {
  //updating the session id for the right document the user wants to load.
  Session.set('docid', this.params._id);
  this.render('navbar', {to:"navbar"});
  this.render('docItem', {
    to:'main'});
});
