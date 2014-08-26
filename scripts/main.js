$(document).ready(function() {
    
    // Sliding panel menu
	$('.openNav').bigSlide({
		menu: '#mainNav',
		menuWidth: '320px',
		side: 'right'
	});

	// Text Resizer
	// Set Cookie
	if($.cookie('HCR_TextSize')) {
		$('#contentWrapper').addClass($.cookie('HCR_TextSize'));
		var cookieTextSize = $.cookie("HCR_TextSize");	
		if(cookieTextSize == "small"){
				$(".resizer .small").addClass("current");
			}
			if(cookieTextSize == "medium"){
				$(".resizer .medium").addClass("current");
			}
			if(cookieTextSize == "large"){
				$(".resizer .large").addClass("current");
			}
	}
	//Button Function
	$(".resizer a").click(function() {
		var textSize = $(this).parent().attr("class");
		$("body").removeClass("small medium large").addClass(textSize);
		$(".resizer li").removeClass("current");
			if(textSize == "small"){
				$(".resizer .small").addClass("current");
			}
			if(textSize == "medium"){
				$(".resizer .medium").addClass("current");
			}
			if(textSize == "large"){
				$(".resizer .large").addClass("current");
			}
		$.cookie("HCR_TextSize",textSize, { path: "/", expires: 10000 });
		return false;
	});

	
});


$(document).ready(function(){

	//Scrollbars
	$("#equipmentNav ul").customScrollbar({updateOnWindowResize:true});       
	// click to scroll (wire up later)
	$("#scroll-button2").click(function () {
            $("#horizontal-scrollbar-demo").customScrollbar("scrollTo", $("#horizontal-scrollbar-demo #no-lena"));
    });

    // Active nav for equipment icons
    $("#equipmentNav li a").click(function() {
      // remove classes from all
      $("#equipmentNav li a").removeClass("active");
      // add class to the one we clicked
      $(this).addClass("active");
   });
	

			//Slider 
			var anispeed = 800; // miliseconds.
			var ease = 'swing';
			var totalSlides = "1";
			var slide = "1";

			$('.blackLeft, .blackRight').fadeTo(0,0.8);
			runOnImagesLoaded($("#slider img"), true, function () {
				$("#loading").fadeTo(400,0,function () {
					
					$(this).remove();
				});
			});
			var sudoSlider = $("#slider").sudoSlider({ 
				prevNext: false,
				continuous: true,
				autowidth: false,
				autoheight: false,
				clickableAni: false,
				ease: ease,
				speed: anispeed,
				customLink:'a.sliderNav',
				beforeAnimation: function(t) { 
					var width = $(this).width();
					var parentWidth = $("#slider").parent().width();
					var marginleft = (parentWidth - width) / 2;
					$("#slider").stop().animate({marginLeft:marginleft},{duration:anispeed,easing:ease});
					$('.blackLeft, .blackRight').stop().animate({width:marginleft+0.5},{duration:anispeed,easing:ease});
				},
				afterAnimation: function(slide){
					//$('div.slideNumber').text(slide + "/" + totalSlides);
					console.log(slide);
					if ((slide < 3) && (slide >= 1)){
					   $('.adlbathroom a').addClass("active");
					}
				},
				initcallback: function() {
					adjust();
					slide = this.getValue("currentSlide");
					totalSlides = this.getValue("totalSlides");
					//console.log(totalSlides);
					//$('div.slideNumber').text(slide + "/" + totalSlides);
				}
			});
            $(window).on("resize focus", adjust);
            function adjust() {
				var width = sudoSlider.getSlide(sudoSlider.getValue("currentSlide")).width();
				var parentWidth = $("#slider").parent().width();
				var marginleft = (parentWidth - width) / 2;
				$("#slider").stop().animate({marginLeft:marginleft},{duration:0});
				$('.blackLeft, .blackRight').stop().animate({width:marginleft+0.5},{duration:0});
            }
			$('.blackRight, #slider, .next').click(function(){
				sudoSlider.goToSlide('next');
			});
			$('.blackLeft, .prev').click(function(){
				sudoSlider.goToSlide('prev');
			});

			$("#slider").swipe({
				swipeStatus:swipeStatus,
				threshold:0,
				allowPageScroll:"vertical"
			});	
			var starttime;
			var slideWidth;
			var lasttime;
			var lastDistance;

			function moveSlides(procent) {
				$("#slider ul").css("marginLeft",(ulMarginLeft + procent*slideWidth) + "px");
			}
			var N = 20;
			var positionsBuffer = new Array(N);;
			var timeBuffer = [];
            var gotUlPosition = false;
			function swipeStatus(event, phase, direction, distance)
			{
				if (sudoSlider.getValue('clickable'))
				{
					if (phase == "move" && (direction == "left" || direction == "right"))
					{
						if (!gotUlPosition) {
                            gotUlPosition = true;
                            ulMarginLeft = $("#slider ul").css("marginLeft");
                            ulMarginLeft = parseInt(ulMarginLeft, 10);
                        }
						positionsBuffer = positionsBuffer.slice(1, N);
						timeBuffer = timeBuffer.slice(1, N);
						positionsBuffer.push(Math.abs(lastDistance - Number(distance)));
						timeBuffer.push((new Date() - 0) - lasttime);
						
						lasttime = new Date() - 0;
						slideWidth = $(event.currentTarget).find("li").eq(0).width();
						lastDistance = Number(distance);
						if (direction == "left")
							moveSlides(-lastDistance/slideWidth);
						else
							moveSlides(lastDistance/slideWidth);
							
					}
					else if (phase == "start")
					{
						for (var i = 0; i < N; i++) {
							positionsBuffer[i] = 0;
							timeBuffer[i] = 0;
						}
						lastDistance = 0;
						lasttime = new Date() - 0;
						starttime = new Date();
					}
					else if (phase == "end" || phase == "cancel")
					{
                        gotUlPosition = false;
						var maxSpeed = 5;
						var time = 0; 
						var distance = 0;
						for (var i = 0; i < N; i++) {
							distance += positionsBuffer[i];
							time += timeBuffer[i];
						}
						// This is in pixels pr. ms. 
						var speed = Math.min(distance / time, maxSpeed);
					
					
						var duration = ((new Date() - starttime)/(lastDistance*speed)) * (slideWidth - lastDistance);
						duration = duration > 1000 ? 1000 : duration;
						
						// TODO: Find direction. 
						
						power = Math.sqrt(((maxSpeed - speed) / maxSpeed)) * 1.3 + 0.2
						sudoSlider.goToSlide((direction == "left") ? 'next' : 'prev', duration);
					}
				}
			}

 	// End Slider
	});
// doc ready
// ghosted slideControls
// This function is a direct copy of a function inside SudoSlider.
		function runOnImagesLoaded (target, allSlides, callback) {
            var elems = target.add(target.find('img')).filter('img');
            var len = elems.length;
            if (!len)
            {
                callback();
                // No need to do anything else.
                return this;
            }
            function loadFunction(that)
            {
                $(that).unbind('load').unbind('error');
                // Webkit/Chrome (not sure) fix.
                if (that.naturalHeight && !that.clientHeight)
                {
                    $(that).height(that.naturalHeight).width(that.naturalWidth);
                }
                if (allSlides)
                {
                    len--;
                    if (len == 0)
                    {
                        callback();
                    }
                }
                else
                {
                    callback();
                }
            }
            elems.each(function(){
                var that = this;
                $(that).load(function () {
                    loadFunction(that);
                }).error(function () {
                    loadFunction(that);
                });
                /*
                 * Start ugly working IE fix.
                 */
                if (that.readyState == "complete")
                {
                    $(that).trigger("load");
                }
                else if (that.readyState)
                {
                    // Sometimes IE doesn't fire the readystatechange, even though the readystate has been changed to complete. AARRGHH!! I HATE IE, I HATE IT, I HATE IE!
                    that.src = that.src; // Do not ask me why this works, ask the IE team!
                }
                /*
                 * End ugly working IE fix.
                 */
                else if (that.complete)
                {
                    $(that).trigger("load");
                }
                else if (that.complete === undefined)
                {
                    var src = that.src;
                    // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                    // data uri bypasses webkit log warning (thx doug jones)
                    that.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; // This is about the smallest image you can make.
                    that.src = src;
                }
            });
        }