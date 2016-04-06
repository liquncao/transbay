(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(window.jQuery);
    }
}(function ($) {
	
$.extend($.summernote.plugins, {	
	
  'Splitscreen' : function (context) {
    var $editor = context.layoutInfo.editor;
    var $toolbar = context.layoutInfo.toolbar;
    var $editable = context.layoutInfo.editable;
    var $codable = context.layoutInfo.codable;

    var $window = $(window);
    var $scrollbar = $('html, body');

    /**
     * toggle Left splitScreen
     */
    this.toggle = function () 
    {
      var resize = function (size) {
        $editable.css('height', size.h);
        $codable.css('height', size.h);
        if ($codable.data('cmeditor')) {
          $codable.data('cmeditor').setsize(size.h);
        }
      };
      $editor.toggleClass('splitscreen');
      
      if (this.isSplitscreen()) {
        $editable.data('orgHeight', $editable.css('height'));
        

        $window.on('resize', function () {
          resize({
            h: $window.height() - $toolbar.outerHeight(),
          });
        }).trigger('resize');

        $scrollbar.css('overflow', 'hidden');
        $('.note-toolbar .note-view').hide();
      } else {
        $window.off('resize');
        resize({
          h: $editable.data('orgHeight')
        });
        $scrollbar.css('overflow', 'visible');
        $('.note-toolbar .note-view').show();
      }
    };

    this.isSplitscreen = function () {
      return $editor.hasClass('splitscreen');
    };
  }
    
	});
}));