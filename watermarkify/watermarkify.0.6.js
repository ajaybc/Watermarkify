/*
 * Watermarkify - jQuery Plugin
 * A simple animated form field watermarking plugin
 *
 * Examples and documentation at: http://www.ajaybalachandran.com/blog
 *
 * Copyright (c)2011 Ajay Balachandran
 * The CSS file included with this package needs to be linked with the html via a link tag in order for the plugin to work properly.
 *
 */

(function($){
 
    $.fn.extend({
         
        //pass the options variable to the function
        watermarkify: function(options) {
 
 
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                time1: 200,
				time2: 200,
				easing : ""
            }
                 
            var options =  $.extend(defaults, options);
			
			if(!!(window['ActiveXObject'])){
				//alert("MS");
			}
 
            return this.each(function() {
                var o = options;
                var thisObj = $(this);
                
				
				var thisTitle = thisObj.attr("title");
             	
				
				thisObj.wrap("<div class='watermarkify-wrap' />");
				$("<span class='watermarkify-watermark'><span class='watermarkify-watermark-inner'>"+thisTitle+"</span></span>").insertAfter(thisObj);
				
				
							
				// ALIGN THE WATERMARK TO THE VERTICAL CENTER OF THE FIELD
				fieldHeight = thisObj.outerHeight();
				waterMarkHeight = thisObj.next().outerHeight();
				waterMarkTop = (fieldHeight - waterMarkHeight) / 2;
				thisObj.next(".watermarkify-watermark").css({"top":waterMarkTop});
				
				
				// IF ANY DEFAULT VALUE EXISTS IN THE FIELDS HIDE THE WATERMARK
				if(thisObj.val() != ""){
					if($.browser.msie){
						thisObj.parent().find(".watermarkify-watermark-inner").hide();
					}
					else{
						thisObj.parent().find(".watermarkify-watermark-inner").css({"margin-left":"-40px","opacity":"0"});
					}
				}
				
				// BLUR THE WATERMARK WHEN THE FIELD GETS FOCUS
				thisObj.focus(function(event){
					thisObj.parent().find(".watermarkify-watermark").addClass("watermarkify-watermark-blurred");
				});
				
				// HIDE THE WATERMARK WHEN THE USER TYPES
				thisObj.keyup(function(event){
					if($.browser.msie){
						thisObj.parent().find(".watermarkify-watermark-inner").hide();
					}
					else{
						thisObj.parent().find(".watermarkify-watermark-inner").animate({"margin-left":"-40px","opacity":"0"},o.time1,o.easing);
					}
				});
				
				// SHOW THE WATERMARK WHEN THE FIELD IS EMPTY AND IT LOSES FOCUS
				thisObj.blur(function(event){
					if(thisObj.val() == ""){
						thisObj.parent().find(".watermarkify-watermark-blurred").removeClass("watermarkify-watermark-blurred");
						if($.browser.msie){
							thisObj.parent().find(".watermarkify-watermark-inner").show();
						}
						else{
							thisObj.parent().find(".watermarkify-watermark-inner").animate({"margin-left":"0","opacity":"1"},o.time2,o.easing);
						}
					}
				});
				
				// GIVE FOCUS TO THE FIELD IF THE USER CLICKS ON THE WATERMARK INSTEAD OF THE FIELD
				$(".watermarkify-watermark").click(function(){
					$(this).prev().focus();
				});
				
            });
        }
    });
     
})(jQuery);