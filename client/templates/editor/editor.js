// Autosave Timer

var KEYUP_TIMEOUT = 5000;
var AUTOSAVING_MSG = "Auto Saving ...";
var SAVING = 'Save';
var SAVING_MSG = "Saving your latest work...";


var saveTimer = function(){
  var timer;
  this.set = function(saveTranslation) {
    timer = Meteor.setTimeout(function() {
    	saveTranslation();
    }, KEYUP_TIMEOUT);
  };
  this.clear = function() {
    Meteor.clearInterval(timer);
  };
  return this;
}();

//Update ChapterValue
function updateTranslation(){
	var chapterId = Session.get('chapterid');
    var SourceText = $('#editorArea').summernote('code');
    if (!SourceText){
        Meteor.call('updateChapterTranslation', SourceText, chapterId,  function(error, result) {
            if(error){
              console.log(error.reason);
              return;}
     })
    }
}


Template.editor.onRendered(function(){	
	$(document).ready(function() {
		 var chapterId = Session.get('chapterid');
		  $('#editorArea').summernote({
			      height: 300,                 // set editor height
			      minHeight: 100,
			  	  lang: 'zh-CN',				
				  dialogsFade: true, 
				  toolbar: [
				            // [groupName, [list of button]]
				            ['style', ['bold', 'italic', 'underline', 'clear']],
				            ['font', ['strikethrough', 'superscript', 'subscript']],
				            ['fontname', ['fontname']],
				            ['fontsize', ['fontsize']],
				            ['color', ['color']],
				            ['insert', ['link', 'picture']],
				            ['table', ['table']],
				            ['para', ['ul', 'ol', 'paragraph']],
				            ['height', ['height']],
				            ['view', ['fullscreen']]
				          ]
			  });
		  $('#editorArea').summernote('code', Chapters.findOne({_id:chapterId}).translationbody);		  
		});
});


Template.editor.events({		
	 "click #js-update-translation": function(event) {
		event.preventDefault();	  
		updateTranslation();
		Notifications.addNotification(SAVING, SAVING_MSG,{type:Notifications.TYPES.SUCCESS, timeout:3000});
	  },
	
	  "summernote.keyup #editorArea" : function( event){
	      // Save user input after x seconds of not typing
	      saveTimer.clear();
	      saveTimer.set(function() {
	    	  updateTranslation();
	    	  Notifications.addNotification(SAVING, AUTOSAVING_MSG,{type:Notifications.TYPES.SUCCESS, timeout:3000});
	     });
	  },
});

