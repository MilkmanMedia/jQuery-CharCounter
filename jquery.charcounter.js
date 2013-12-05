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
 * HTML markup (Plugin uses attribute 'maxlength' for maximum allowed characters):
 * <input type="text" name="myTextfield" class="CharCounter" maxlength="100">
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
 *   <input type="text" maxlength="100" class="CharCounter" name="myTextfield">
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
        var el = this,
            $el = $(this),
            textArea = $el.wrap('<div class="wrap-CharCounter" />'),
            counter = $('<code/>').css({
              display: 'block',
              opacity: 0.5
            }).insertAfter(textArea),
            charLength = (parseInt(textArea.attr('maxlength')));
      
        if(conf.debug){
          console.log(counter);
          console.log(textArea);
        }
        
        
        counter.text(charLength-textArea.val().length);
        textArea.keyup(function(){
          var value = $(this).val(),
              valueLength = value.length;          
          if(valueLength <= charLength){
           counter.text(charLength-valueLength);
          }
          if(valueLength > charLength){
            $(this).val(value.slice(0, charLength));
          }    
          if(conf.debug){      
            console.log('chars in ' + $(this).index(this) + ': ' + valueLength);
            console.log('box height: '+ $(this).height());
          }
        });
      });
    }
  });
})(jQuery);
