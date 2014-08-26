$.fn.fontResize = function(settings)
{
    return this.each(function()
    {
        var elem = $(this);

        // declare a few constants:
 
	     var SMALL = "small"; //small font size in pixels
	     var MEDIUM = "medium";
	     var LARGE = "large"; //larger size in pixels
	     var COOKIE_NAME = "Simple-Fontresizer"; //Maybe give this the name of your site.

	     //make it small by default
	     var fontsize = SMALL; 
	     
	     
	     // Only show text resizing links if JS is enabled
	     $(".fontresize").show();

	     // if cookie exists set font size to saved value, otherwise create cookie
	     /*
if($.cookie(COOKIE_NAME)) {
		     fontsize = $.cookie(COOKIE_NAME);
		     //set initial font size for this page view:
		     $("body").addClass("large");
		     //set up appropriate class on font resize link:
		     if(fontsize == SMALL) { $("#small_fontresize").addClass("current"); }
		     if(fontsize == MEDIUM) { $("#medium").addClass("current"); }
		     else { $("#large").addClass("current"); }
	     } else {
		     $("#small").addClass("current");
		     $.cookie(COOKIE_NAME, fontsize);
	     }
*/

	     // small font-size link:
	     $("#small_fontresize").bind("click", function() {
			     if(fontsize == LARGE) {
			     fontsize = SMALL;
			     $("body").addClass("small");
			     //$("#large").toggleClass("current");
			     //$("#medium").toggleClass("current");
			     $("#small").toggleClass("current");
			     $.cookie(COOKIE_NAME, fontsize);
			     }
			     if(fontsize == MEDIUM) {
			     fontsize = SMALL;
			     $("body").addClass("small");
			     //$("#large").toggleClass("current");
			     //$("#medium").toggleClass("current");
			     $("#medium").toggleClass("current");
			     $.cookie(COOKIE_NAME, fontsize);
			     }
			     return false;	
			     });
		 // medium font-size link:
	     $("#medium_fontresize").bind("click", function() {
			     if(fontsize == LARGE) {
			     fontsize = MEDIUM;
			     $("body").addClass("medium");
			     //$("#large").toggleClass("current");
			     $("#medium").toggleClass("current");
			     //$("#small").toggleClass("current");
			     $.cookie(COOKIE_NAME, fontsize);
			     }
			     if(fontsize == SMALL) {
			     fontsize = MEDIUM;
			     $("body").addClass("medium");
			    // $("#large").toggleClass("current");
			     $("#medium").toggleClass("current");
			     //$("#small").toggleClass("current");
			     $.cookie(COOKIE_NAME, fontsize);
			     }
			     return false;	
			     });
			     
		// large font-size link:
		$("#large_fontresize").bind("click", function() {
			if(fontsize == SMALL){
				alert("pass" + fontsize)
			}
			else {
				alert("fail" + fontsize);
			}
		});

    });
}


		