/**
 * Project: jQuery FieldFocus
 * Description: Small plugin for handling defaulttexts in inputfields
 * Author: Daniel Köntös :: MilkmanMedia - Your WebApp Innovator - www.MilkmanMedia.de
 * License: MIT, GPL
 * 
 * Params: 
 * @debug: turn on/off debugging (true/false)
 * 
 * usage:
 *
 * HTML markup (Plugin uses attribute 'rel' for maximum allowed characters):
 * <input type="text" name="myTextfield" class="CharCounter" rel="100">
 *                   
 * JavaScript init:     
 * $('.CharCounter').CharCounter(); // inits CharCounter on all elements with class 'CharCounter'
 *  
 * or
 *
 * $('.CharCounter').CharCounter({
 *   debug: true
 * }); // inits CharCounter on all elements with class 'CharCounter' and turn on debugging (only in FireBug console)
 *  
 * generated markup:
 * <div class="wrap-CharCounter">
 *   <input type="text" rel="100" class="CharCounter" name="myTextfield">
 *   <code style="display: block; opacity: 0.5;">100</code>
 * </div>              
 */

(function($){
  $.fn.extend({
    CharCounter:function(params){
      var conf = {
        debug: false
      };

      $.extend(conf, params);
      return $(this).each(function(){            
        var textArea = $(this).wrap('<div class="wrap-CharCounter" />');
        var counter = $('<code/>').css({
          display: 'block',
          opacity: 0.5
        }).insertAfter(textArea);
      
        if(conf.debug){
          console.log(counter);
          console.log(textArea);
        }

        counter.text((parseInt(textArea.attr('rel'))-textArea.val().length));
        textArea.keyup(function(){          
          if($(this).val().length <= parseInt($(this).attr('rel'))){
           counter.text((parseInt($(this).attr('rel'))-$(this).val().length));
          }
          if($(this).val().length > parseInt($(this).attr('rel'))){
            $(this).val($(this).val().slice(0, $(this).attr('rel')));
          }    
          if(conf.debug){      
            console.log('chars in ' + $(this).index(this) + ': ' + $(this).val().length);
            console.log('box height: '+ $(this).height());
          }
        });
      });
    }
  });
})(jQuery);
