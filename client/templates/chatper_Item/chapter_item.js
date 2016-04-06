//Autosave Timer

var KEYUP_TIMEOUT = 5000;

var AUTOSAVING_MSG = "Auto Saving ...";
var SAVING = 'Save';
var MODE = 'WORK MODE';
var MODE_EXIT_MSG = 'Exited Working Mode...';
var SAVING_MSG = "Saving your latest work...";
var NOTIFICATION_TIMEOUT=2000;


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

//Update Original Body of the chapter
function updateTranslation(){
	var chapterId = Session.get('chapterid');
	console.log("The current Chapter ID:" + chapterId);
    var EditorText = $('#editorArea').summernote('code');
    if (EditorText){
    	console.log("Calling updateChapterTranslation method");	
        Meteor.call('updateChapterTranslation', EditorText, chapterId,  function(error, result) {
            if(error){
              console.log(error.reason);
              return;}
     })
    }
}


//Update Original Body of the chapter
function updateOrig(){
	var chapterId = Session.get('chapterid');
	console.log("The current Chapter ID:" + chapterId);
    var SourceText = $('#viewerArea').summernote('code');
    console.log("SourceText:" + SourceText);
    if (SourceText){
    	console.log("Calling updateChapterOriginal method");	
        Meteor.call('updateChapterOriginal', SourceText, chapterId,  function(error, result) {
            if(error){
              console.log(error.reason);
              return;}
     })
    }
}

Template.chapterItem.onRendered(function(){	
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

		  		  
		  $('#viewerArea').summernote({
	  	  	  lang: 'zh-CN',
			  dialogsFade: true, 
		      height: 300,                 // set editor height
		      minHeight: 100,
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

		  $('#viewerArea').summernote('code', Chapters.findOne({_id:chapterId}).originalbody);
		  $('.dropdown-toggle').dropdown();
		});
});


Template.chapterItem.events({		
	
	
	 "click #js-workingmode": function(event) {
			$('#editorArea').summernote("RSplitscreen.toggle");
			$('#viewerArea').summernote("Splitscreen.toggle");
			Session.set('workingmode', true);
		  },

	 "click #js-update-translation": function(event) {
		event.preventDefault();	  
		updateTranslation();
		updateOrig();
		//Notifications.addNotification(SAVING, SAVING_MSG,{type:Notifications.TYPES.SUCCESS, timeout:NOTIFICATION_TIMEOUT});
		sAlert.info(SAVING_MSG);
	  },
	
	  "summernote.keyup #editorArea" : function(event){
	      // Save user input after x seconds of not typing
		  event.preventDefault();	  
	      saveTimer.clear();
	      saveTimer.set(function() {
	    	  updateTranslation();
	    	  //Notifications.addNotification(SAVING, AUTOSAVING_MSG,{type:Notifications.TYPES.SUCCESS, timeout:NOTIFICATION_TIMEOUT});
	    	  sAlert.info(AUTOSAVING_MSG);
	    	  
	     });
	  },
	  
	  "summernote.keyup #viewerArea" : function(event){
	      // Save user input after x seconds of not typing
		 event.preventDefault();	  
	      saveTimer.clear();
	      saveTimer.set(function() {
	    	  updateOrig();
	    	  //Notifications.addNotification(SAVING, AUTOSAVING_MSG,{type:Notifications.TYPES.SUCCESS, timeout:NOTIFICATION_TIMEOUT});
	    	  sAlert.info(AUTOSAVING_MSG);
	     });
	  },
	  
	  'keyup' : function(event){
		  event.preventDefault();
		  if (event.keyCode == 27){
				$('#editorArea').summernote("RSplitscreen.toggle");
				$('#viewerArea').summernote("Splitscreen.toggle");
				var workingmode = Session.get('workingmode');
				console.log("working mode:" + workingmode);
				if (workingmode === true)
				{
					//Notifications.addNotification(MODE, MODE_EXIT_MSG,{type:Notifications.TYPES.INFO, timeout:NOTIFICATION_TIMEOUT});
					sAlert.info(MODE_EXIT_MSG);
					Session.set('workingmode', false);
				}
				else
				{
					Session.set('workingmode', true);
				}
		  }		
	  }
});

