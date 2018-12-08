/*  Snowfall jquery plugin 
	version 1.2, Dec 20 2009
	Developed by Jason Brown for any bugs or questions email me at loktar69@hotmail
	info on the plugin is located on Somethinghitme.com
	
	values for snow options are
	
	flakeCount,
	flakeColor,
	flakeIndex,
	minSize,
	maxSize,
	minSpeed,
	maxSpeed
	
	Example Usage :
	$(document).snowfall({flakeCount : 100, maxSpeed : 10});
	
	-or-
	
	$('#element').snowfall({flakeCount : 800, maxSpeed : 5, maxSize : 5});
	
	-or with defaults-
	
	$(document).snowfall();
*/

(function($){
	$.fn.snowfall = function(options){
		
		var element = this;
		
		// random fuction for generating random vals
		random = function random(min, max){
			return Math.round(min + Math.random()*(max-min)); 
		}
		
		
		// Randam Array Tree-Web custom 2011/10/29
		function randArray(_str){
  		 var i = _str.length;
   		while (i) {
     		 var y = Math.floor(Math.random()*i);
     		 var t = _str[--i];
      		_str[i] = _str[y];
      		_str[y] = t;
   		}
   		return _str;
		}
		
		
		// snow flake class
		function Flake(_x, _y, _size, _speed, _angle)
		{
			// Flake properties
			this.id = flakeId; 
			this.x  = _x;
			this.y  = _y;
			this.angle = _angle;
			this.size = _size;
			this.speed = _speed;
			this.step = 0,
			this.stepSize = random(1,10) / 100;
			
			//original
			//var flakeMarkup = "<div id='flake-" + this.id + "' style='width: " + this.size + "px; height: " + this.size + "px; background: " + options.flakeColor + "; position: absolute; top: " + this.y + "px; left:" + this.x + "px; font-size: 0px; z-index: " + options.flakeIndex + ";'></div>";
			//var angle = Math.round(Math.random()*360);
			var flakeMarkup = "<img src='"+ randArray(options.image)[0] +"' id='flake-" + this.id;
			flakeMarkup += "' style='width: " + this.size + "px; height: " + this.size + "px;";
			flakeMarkup += "; position: absolute; top: " + this.y + "px; left:" + this.x + "px; font-size: 0px; z-index: " + options.flakeIndex;

			// CSS 3
			flakeMarkup += "; -moz-transform:rotate(" + this.angle + "deg);";
			flakeMarkup += "-webkit-transform:rotate(" + this.angle + "deg);";
			flakeMarkup += "transform:rotate(" + this.angle + "deg);";
			flakeMarkup += "' />";

			if($(element).get(0).tagName === $(document).get(0).tagName){
				$('body').append(flakeMarkup);
			}else{
				$(element).append(flakeMarkup);
			}
			
			this.element = document.getElementById('flake-' + this.id);
			
			// Update function, used to update the snow flakes, and checks current snowflake against bounds
			this.update = function(){
				this.y += this.speed;
				this.angle += Math.round(Math.random()*this.speed);
				
				if(this.y > (elHeight) -20){
					this.reset();
				}
				
				this.element.style.top = this.y + 'px';
				this.element.style.left = this.x + 'px';
				this.element.style.transform = "rotate(" + this.angle + "deg)";
				
				this.step += this.stepSize;
				this.x += Math.cos(this.step);
				
				if(this.x > (elWidth) - 22 || this.x < 22){
					this.reset();
				}
			}
			
			// Resets the snowflake once it reaches one of the bounds set
			this.reset = function(){
				this.y = 0;
				this.x = random(0, elWidth);
				this.stepSize = random(1,10) / 100;
				this.size = random((options.minSize * 100), (options.maxSize * 100)) / 100;
				this.speed = random(options.minSpeed, options.maxSpeed);
				this.angle = Math.round(Math.random()*360);
			}
		}
	
		// plugin vars
		var flakes = [],
			flakeId = 0,
			i = 0,
			elHeight = $(element).height(),
			elWidth = $(element).width(),
			defaults = {
				flakeCount : 35,
				flakeColor : '#ffffff',
				flakeIndex: 999999,
				minSize : 1,
				maxSize : 3,
				minSpeed : 2,
				maxSpeed : 3,
            image:'image.png'
				},
			options = $.extend(defaults, options);
		
		// Bind the window resize event so we can get the innerHeight again
		$(window).bind("resize", function(){  
			elHeight = $(element).height();
			elWidth = $(element).width();
		}); 
		

		// initialize the flakes
		for(i = 0; i < options.flakeCount; i+=1){
			flakeId = i;
			flakes[i] = new Flake(random(0,elWidth), random(0, elHeight), random((options.minSize * 100), (options.maxSize * 100)) / 100, random(options.minSpeed, options.maxSpeed), Math.round(Math.random()*360));
		}
	
		// this controls flow of the updating snow
		function snow(){
			for( i = 0; i < options.flakeCount; i += 1){
				flakes[i].update();
			}
			
			setTimeout(function(){snow()}, 30);
		}
		
		snow();
	};
})(jQuery);

function initMaple() {
	jQuery(function($) {
		$(document).snowfall({
			flakeCount : 30,
			flakeIndex : "65",
			minSize : 20,
			maxSize : 35,
			minSpeed : 1,
			maxSpeed : 4,
			shadow : false,
			image : [
			  'images/leaf1.png',
			  'images/leaf2.png',
			  'images/leaf3.png',
			  'images/leaf4.png',
			  'images/leaf5.png',
		   ]
		});
	});
}
