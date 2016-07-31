window.onload = function() {

  // localStorage.clear();

  // hide the transtition page for now
  document.getElementById("transition_page").style.display = "none";

  // load the space_stuff canvas
  var c = document.getElementById("main");
  window.ctx = c.getContext("2d"); // Dealing with a global context is easier
  c.style.display = "none";
  // load the blackhole canvas
  var blackhole_c = document.getElementById("blackhole");
  blackhole_ctx = blackhole_c.getContext("2d"); 
  blackhole_c.style.display = "none";

  // keep track of the users score
  window.user_score = 200;

  // initially store 0 as the high score unless there is another score
  storeScore();

  // panel stuff setup
  // main div container
  var container = document.createElement("div");
  container.setAttribute("id", "panel");
  document.getElementById("body").appendChild(container);
  // hide it for now
  container.style.display = "none";
	
  // children of the div container i.e elements of the panel
  var time_p = document.createElement("p");
  var score_p = document.createElement("p");
  var pause_b = document.createElement("button");
  var level_p = document.createElement("p");
	
  time_p.setAttribute("id", "time_display");
  score_p.setAttribute("id", "score_display");
  pause_b.setAttribute("id", "pause_button");
  level_p.setAttribute("id", "level_display");
	
  document.getElementById("panel").appendChild(time_p);
  document.getElementById("panel").appendChild(score_p);
  document.getElementById("panel").appendChild(pause_b);
  document.getElementById("panel").appendChild(level_p);


  var display_timer = document.querySelector("#time_display");
  var display_score = document.querySelector("#score_display");
  var pause_button = document.querySelector("#pause_button");
  var display_level = document.querySelector("#level_display");

  window.display_timer = time_p;
  var display_score = score_p;
  score_count = display_score;
  level_count = display_level;
  display_level.textContent = "Level: " + level;
  display_score.textContent = "Score : " + user_score;
  pause_button.textContent = "Pause";
  document.getElementById("pause_button").onclick = function() {
    pauseGame();
  };

  // set up high_score display on start screen
  var high_score = localStorage.getItem("high_score");
  // console.log(high_score);
  document.getElementById("high_score").textContent = "High Score : " + high_score;

  // when user clicks the start button on start screen
  document.getElementById("start_button").onclick = function() {
    // hide start page
    document.getElementById("start_page").style.display = "none";
    // display game
    c.style.display = "block";
    blackhole_c.style.display = "block";
    // display panel
    container.style.display = "block";

    // begin game
    set_stage();
  };

    
}; // window.onload


// abstract class called Space_Stuff.. can be made into a ship, astrod or planet
var Space_Stuff = function() {
      if (this.constructor === Space_Stuff) {
        throw new Error("Can't instantiate abstract class!");
      }
};
Space_Stuff.prototype.init = function() {
  this.x = 0 ;
  this.y = 0 ;
  this.width = 50 ;
  this.height = 50 ;
  this.direction = "" ;
  this.rotation = 0 ;
  this.toPlayerX = 0 ;
  this.toPlayerY = 0 ;
};
// each sub-object will have a custom draw function 
Space_Stuff.prototype.draw = function() {
  throw new Error("Abstract method!");
};
// ship object definition
var Ship = function() {
  this.init();
};
Ship.prototype = Object.create(Space_Stuff.prototype);
Ship.prototype.constructor = Ship;
Ship.prototype.draw = function(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    //save initial white image/backgroud
    oldBack = ctx.getImageData(0, 0, 50, 50);

    /*ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 50, 50);*/
    // draw bottom  saucer
    ctx.beginPath();
    ctx.moveTo(28.4, 16.9);
    ctx.bezierCurveTo(28.4, 19.7, 22.9, 22.0, 16.0, 22.0);
    ctx.bezierCurveTo(9.1, 22.0, 3.6, 19.7, 3.6, 16.9);
    ctx.bezierCurveTo(3.6, 14.1, 9.1, 11.8, 16.0, 11.8);
    ctx.bezierCurveTo(22.9, 11.8, 28.4, 14.1, 28.4, 16.9);
    ctx.closePath();
    ctx.fillStyle = "#ff33ff";
    ctx.fill();
    // draw top  saucer
    ctx.beginPath();
    ctx.moveTo(22.3, 12.0);
    ctx.bezierCurveTo(22.3, 13.3, 19.4, 14.3, 15.9, 14.3);
    ctx.bezierCurveTo(12.4, 14.3, 9.6, 13.3, 9.6, 12.0);
    ctx.bezierCurveTo(9.6, 10.8, 12.4, 9.7, 15.9, 9.7);
    ctx.bezierCurveTo(19.4, 9.7, 22.3, 10.8, 22.3, 12.0);
    ctx.closePath();
    ctx.fillStyle = "#660066";
    ctx.fill();

    //save ship drawing into an image
    ship_img = ctx.getImageData(0,0,50,50);

    // remove ship drawing
    ctx.putImageData(oldBack, 0, 0);
};
// astroid object definition 
var Astroid = function() {
  this.init();
};
Astroid.prototype = Object.create(Space_Stuff.prototype);
Astroid.prototype.constructor = Astroid;
Astroid.prototype.draw = function(ctx) {


  ctx.fillStyle = '#666699';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(25, 5);
  ctx.lineTo(30, 25);
  ctx.lineTo(12, 25);
  ctx.closePath();
  ctx.fill();

  astroid_img = ctx.getImageData(0,0,50,50);
  ctx.putImageData(oldBack, 0, 0);
};
// planet object definition
var Planet = function() {
  this.init();
};
Planet.prototype = Object.create(Space_Stuff.prototype);
Planet.prototype.constructor = Planet;
Planet.prototype.draw = function(ctx) {

  ctx.beginPath();
  ctx.ellipse(18, 18, 8, 15, 45 * Math.PI/180, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  ctx.strokeStyle= "#006600";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(18 , 18, 10, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#e6e600";
  ctx.fill();

  planet_img = ctx.getImageData(0,0,50,50);
  ctx.putImageData(oldBack, 0, 0);
};

// timer count 
var count = 59;

// this array contain all floating objects
// includign ships, asteroids, moons etc.
var space_stuff_array = [];

// this array contains all blackholes
var all_blackholes = [];

// vars for timeOut/setInterval
var game;
var blackhole_gen;
var absorb_loop;
var timer_loop;

// vars for image storage
var oldBack = new Image();
var ship_img = new Image();
var astroid_img = new Image();
var blackhole_img = new Image();
var planet_img = new Image();

var score_count;
var level_count;
var absorb = false;
var level = 1;
var end_timer = false;
var gamePaused = false;


/*
  creates all the objects in all layers. Initiates timer and animation 
*/
function set_stage() {
  
  // generate the blackholes
  generateBlackholes();

  // make the specified objects
  make_spaceStuff("Ship", 5);
  make_spaceStuff("Astroid", 2);
  make_spaceStuff("Planet", 3);


  // make the blakhole canvas clickable to detect mouse clicks
  var blackhole_c = document.getElementById("blackhole");
  blackhole_c.onclick = function(event) {
          
      // adjust mouse position to be relative to canvas
      var rect = blackhole_c.getBoundingClientRect(),
          x = event.clientX - rect.left,
          y = event.clientY - rect.top;

      // grab a pixel
      // console.log("mouse x: " + x + " y: " + y);
      var data = blackhole_ctx.getImageData(x, y ,1, 1).data;

      if (data[3] > 0 && !gamePaused) {
          // remove the blackhole
          find_clearRegion(x,y+50, blackhole);

          // if there was somehting in the horizon.. let it continue
          absorb = false;
      }
  };
    
  // initiate the countdown timer
  timer_loop = setInterval( function () {
    startTimer();
  }, 1000); 
  
  // animate all the objects
  animate(space_stuff_array);
}

/*
  Params: space_stuff - string regarding the type of space object
          amount      - the amounr of space object to generate

  The function initializes the space object with required values
*/
function make_spaceStuff(space_stuff, amount) {
  for (var i = 0; i < amount; i++) {

    if (space_stuff == "Ship") {
      var thing = new Ship();
    } else if (space_stuff == "Astroid") {
      var thing = new Astroid();
    } else if (space_stuff == "Moon") {
      var thing = new Moon();
    } else if (space_stuff == "Planet") {
      var thing = new Planet();
    }
    
    thing.draw(ctx);
    setRandPosition(thing);
    setRandDirection(thing);
    space_stuff_array.push(thing); 

  }
}

/*
  Checks if the localstorage contains a high_score, if not, then sets
  it to 0. Other wise checks if the stored high_score is > current user 
  score. If it is, then saves that as the new high_score
*/
function storeScore(){
  // for (var i = 0; i < localStorage.length; i++) {
  if (localStorage.length == 0) {
    var high_score = 0;
    localStorage.setItem("high_score", high_score);
  } else {
    var high_score = localStorage.getItem("high_score");
    if (high_score < user_score) {
      high_score = user_score;
      localStorage.setItem("high_score", high_score);
    }
  }
    
  document.getElementById("high_score").textContent = "High Score : " + high_score;
}


/*
  Initiates end of game senarios.
*/
function checkGameState() {

    if (end_timer && space_stuff_array.length > 0) {

      if (level == 1) {
        endLevel(1);
      } else if (level == 2) {
        endLevel(2);
      } 
    } 
    // case where the timer is running but no more space objects remain
    else if (!end_timer && space_stuff_array.length == 0) {
        endLevel(2);
    }
}


/*
  Handles screen switing on level end and all the tasks that are associated with 
  level ending.
*/
function endLevel(num) {

  // stop the game
  game = clearTimeout(game);
  blackhole_gen = clearTimeout(blackhole_gen);
  timer_loop = clearInterval(timer_loop);
  end_timer = true;

  // clear the all the object storage
  while(all_blackholes.length > 0) {
    all_blackholes.pop();
  }
  while(space_stuff_array.length > 0) {
    space_stuff_array.pop();
  }

  // clear the two canvases
  ctx.clearRect(0, 0, 1000, 640);
  blackhole_ctx.clearRect(0, 0, 1000, 640);

  // hide the game screen
  document.getElementById("main").style.display = "none";
  document.getElementById("blackhole").style.display = "none";
  document.getElementById("panel").style.display = "none";

  // display transitional page
  document.getElementById("transition_page").style.display = "block";
  // update score display
  document.getElementById("score").textContent = "Score : " + user_score + " points";
  
  // if the user was in level 2 ...
  if (num == 2) {
    // save the final score if its a high_score
    storeScore();

    // change the button to show finish instead of start
    document.getElementById("start_level_2").textContent = "Finish";
  }

  // when the user clicks the button on the transitional page
  document.getElementById("start_level_2").onclick = function() {

    // reset the variables to game's start values unless user is going TO level 2
    if (num == 1) {
      level = 2;
    } 
    else if (num == 2) {
      level = 1;
      user_score = 200;
    }
    count = 59;
    index = 0;
    end_timer = false;
    
    // hide the transitional page
    document.getElementById("transition_page").style.display = "none";

    // game end...
    if (num == 2) {
      // show the game's start page
      document.getElementById("start_page").style.display = "block";  
    } 
    // go to level 2...
    else if (num == 1) {
        // show canvas stuff i.e game screen
        document.getElementById("main").style.display = "block";
        document.getElementById("blackhole").style.display = "block";
        document.getElementById("panel").style.display = "block";

        // update level
        document.getElementById("level_display").textContent = "Level: " + level;

        // start level 2
        set_stage();
    }
  };
}

/*
  Pauses all the movement of the space objects as well well as the timer
*/
function pauseGame() {
  if (!gamePaused) {
    game = clearTimeout(game);
    blackhole_gen = clearTimeout(blackhole_gen);
    timer_loop = clearInterval(timer_loop);
    // absorb_loop =  clearTimeout(absorb_loop);

    gamePaused = true;
  } else if (gamePaused) {

    game = setTimeout( function () {
      animate(space_stuff_array);
    }, 33);

    blackhole_gen = setTimeout( function () { 
      generateBlackholes();
    }, 1000);

    timer_loop = setInterval( function () {
      startTimer();
    }, 1000); 


    // NOT WOKRING bc params are undefined here 
    // absorb_loop = setTimeout( function () { 
    //   absorb_stuff(x, y, blackhole, space_stuff);
    // }, 33);

    gamePaused = false;
  }
}


/*
  Params: space_stuff - any space object such as spaceship, astroid and planet etc.

  Sets the position of any space object to a random number within boundaries of 
  canvas.
*/
function setRandPosition(space_stuff) {
  var rand_pos_x_1 = Math.floor((Math.random() * 950) + 3);
  var rand_pos_y_1 = Math.floor((Math.random() * 590) + 3);
  space_stuff.x = rand_pos_x_1;
  space_stuff.y = rand_pos_y_1;
}

/*
  Params: space_stuff - any space object such as spaceship, astroid and planet etc.

  Sets the direction of any space object to either up or down or left or right.
*/
function setRandDirection(space_stuff) {

  // get a random value between 1 and 4  
  var rand_dir_1 = Math.floor((Math.random() * 4) + 1);
  switch(rand_dir_1) {
  case 1:
      space_stuff.direction = "left";
      break;
  case 2:
      space_stuff.direction = "right"
      break;
  case 3:
      space_stuff.direction = "up";
      break;
  case 4:
      space_stuff.direction = "down";
      break;
  default:
      space_stuff.direction = "down";
  }
}

/*
  Params: blackhole_obj - a blakhole object
          x             - the x coordinate of where to place the blackhole
          y             - the y coordinate of where to place the blackhole
          type          - string containing the type (blue, black or purple) of blackhole

  Places the blackhole image at the provided coordinates 
*/
function makeBlackhole (blackhole_obj, x,y,type) {

  blackhole_img = new Image();
  
  // add class
  blackhole_img.class = 'blackhole_class';

  //the line below makes the click work on chrome
  blackhole_img.crossOrigin = 'anonymous';

  // get the image src based on the type of blackhole being created
  if (type == "blue") {
    blackhole_img.src = "https://dl.dropboxusercontent.com/s/u45g5kmi89o2mz4/blackhole_blue.png?dl=0";
  } else if (type == "purple") {
  	blackhole_img.src = "https://dl.dropboxusercontent.com/s/fr8vr7k8y5awirj/blackhole_purple.png?dl=0";
  } else if (type == "black") {
    blackhole_img.src = "https://dl.dropboxusercontent.com/s/84e8uyb98aasaue/black.png?dl=0";
  }


  blackhole_img.onload = function(){

    // paint a circle around the blackhole that humans cant see
    blackhole_ctx.beginPath();
    // create a 25px radius so that user can have some margin of error while clicking
    blackhole_ctx.arc(x+25, y+25, 50, 0, 2*Math.PI);
    blackhole_ctx.fillStyle = "rgba(255,255,255,0.01)";
    // blackhole_ctx.fillStyle = 'yellow';
    blackhole_ctx.fill();

    // now draw the image on top the 'invisible' circle
    blackhole_ctx.drawImage(blackhole_img, x, y, 50, 50);
  };
}


/*
  Params: space_stuff - any space object such as spaceship, astroid and planet etc.
  
  Draws the provided object to draw into the context
*/
function draw(space_stuff) {

    if (space_stuff instanceof Ship) {
      ctx.putImageData(ship_img, space_stuff.x, space_stuff.y);  
    } else if (space_stuff instanceof Astroid) {
      ctx.putImageData(astroid_img, space_stuff.x, space_stuff.y);        
    } else if (space_stuff instanceof Planet) {
      ctx.putImageData(planet_img, space_stuff.x, space_stuff.y);
    }
}


var detected = false;
/*
  Handles all clearing, drawing , and collision detection for the duration of the game.
*/
function animate () {
  // clear the drawing canvas
  ctx.clearRect(0, 0, 1000, 640);

  // check if any blackholes have eaten enough objects to disappear
  for (var i = 0; i < all_blackholes.length; i++) {
    
    if (all_blackholes[i].eaten == 3 && all_blackholes[i].type == "blue") {
      find_clearRegion(all_blackholes[i].x, all_blackholes[i].y+50, all_blackholes[i]);
    } else if (all_blackholes[i].eaten == 2 && all_blackholes[i].type == "purple") {
      find_clearRegion(all_blackholes[i].x, all_blackholes[i].y+50, all_blackholes[i]);
    } else if (all_blackholes[i].eaten == 1 && all_blackholes[i].type == "black") {
      find_clearRegion(all_blackholes[i].x, all_blackholes[i].y+50, all_blackholes[i]);
    }
  }

  /*draw everything in the space_stuff_array and update thier position
  if any object has collided with a blackhole then clear it*/
  for (var i = 0; i < space_stuff_array.length; i++) {

    draw(space_stuff_array[i]);
    
    if (space_stuff_array[i].x >= 950) {
      // set motion to opposite of current direction
      space_stuff_array[i].direction = "left";
    } else if (space_stuff_array[i].x <= 0) {
      // set motion to opposite of current direction
      space_stuff_array[i].direction = "right";
    } else if (space_stuff_array[i].y <= 0) {
      space_stuff_array[i].direction = "down";
    } else if (space_stuff_array[i].y >= 550) { // bottom border
      space_stuff_array[i].direction = "up";
    }

    // move the object by appropriate values
    if (space_stuff_array[i].direction == "right") {
      space_stuff_array[i].x += 5;
    } else if (space_stuff_array[i].direction == "left") {
      space_stuff_array[i].x -= 5;
    } else if (space_stuff_array[i].direction == "up") {
      space_stuff_array[i].y -= 3;
    } else if (space_stuff_array[i].direction == "down") { //move down
      space_stuff_array[i].y += 3;
    } 

    // check for collosion with blackhole
    find_clearRegion(space_stuff_array[i].x, space_stuff_array[i].y+70 , space_stuff_array[i]);
  }

  // if theres is time left but no space objects left, signal end of game
  checkGameState();

  // 
  if (detected == true) {
    clearTimeout(game);
    detected = false;
    // break;
  }

  // call this function every 33 ms
  game = setTimeout( function () {
    animate(space_stuff_array);
  }, 33);
}


var index = 0;
/*
  Produces blackholes on the canvas as long as the game is running.
  Handles what type of blackhole to produce and all its other properties.
*/
function generateBlackholes() {

  index += 1;

  // definition of a blackhole
	var blackhole = {
	  x: 0,
	  y: 0,
	  width: 50,
	  height: 50,
	  direction: "",
	  active: 1,
    type: "",
    speed: 1, 
    eaten: 0, 
	  draw: function(blackhole_obj, type) {
	    makeBlackhole(blackhole_obj, this.x, this.y, type);
	  }
	};

	// generate random postion of blackholes after checking previous ones
	var randArr = getRand();
	var rand_pos_x_2 = randArr[0];
	var rand_pos_y_2 = randArr[1];
	blackhole.x = rand_pos_x_2;
	blackhole.y = rand_pos_y_2;

  
  // make timer to count x secs then draw a type of blackhole
  // adjust the counting based on which level is currently being played.
      // purple will be generated every (multiple of 3) seconds or 17 secs if level 1
      // black will be generated every (multiple of 17) seconds or 33 secs if level 1
      // blue will be generated every second or 2 secs if level 1
      // first blackhole is always blue
  // store this blackhole in a list

  if (level == 2) {
    if (index % 3 == 0) {
      blackhole.type = "purple";
      blackhole.speed = 1;
      blackhole.draw(blackhole, blackhole.type);
      all_blackholes.push(blackhole);     
    } else if (index % 17 == 0) {
      blackhole.type = "black";
      blackhole.speed = 3;
      blackhole.draw(blackhole, blackhole.type);
      all_blackholes.push(blackhole); 
    } else if (index % 1 == 0) {
      blackhole.type = "blue";
      blackhole.speed = 0.5;
      blackhole.draw(blackhole, blackhole.type);
      all_blackholes.push(blackhole);
    } else if (index == 0) {
      blackhole.type = "blue";
      blackhole.speed = 0.5;
      blackhole.draw(blackhole, blackhole.type);
      all_blackholes.push(blackhole);
    } 
  }
  else if (level == 1) {
    if (index % 17 == 0) {
      blackhole.type = "purple";
      blackhole.speed = 1;
      blackhole.draw(blackhole, blackhole.type);
      all_blackholes.push(blackhole);     
    } else if (index % 33 == 0) {
      blackhole.type = "black";
      blackhole.speed = 3;
      blackhole.draw(blackhole, blackhole.type);
      all_blackholes.push(blackhole); 
    } else if (index % 2 == 0) {
      blackhole.type = "blue";
      blackhole.speed = 0.5;
      blackhole.draw(blackhole, blackhole.type);
      all_blackholes.push(blackhole);
    } else if (index == 0) {
      blackhole.type = "blue";
      blackhole.speed = 0.5;
      blackhole.draw(blackhole, blackhole.type);
      all_blackholes.push(blackhole);
    }   
  }

  // call this function every second
	blackhole_gen = setTimeout( function () { 
		generateBlackholes();
	}, 1000);
}

/*
  Return: [x , y] - array containing the x and y coordinates of a blackhole. 

  Finds an empty location in the canvas to place a blackhole in.
  All blackhole can only be place at least 100px of another blackhole.
  This is to ensure non over-lapping event horizons
*/
function getRand() {

	var found_pos = false;
	var rand_pos_x_2;
	var rand_pos_y_2;
	// generate random postion of blackholes after checking previous ones
	while (!found_pos) {
		
		rand_pos_x_2 = Math.floor((Math.random() * 950) + 3);
		rand_pos_y_2 = Math.floor((Math.random() * 550) + 3);

		if (all_blackholes.length != 0) {

			for (var b = 0 ; b < all_blackholes.length; b++) {

				if (all_blackholes[b].active == 1) {
					// bad random number. 
					if (rand_pos_x_2 <= all_blackholes[b].x + 100 && 
						rand_pos_x_2 >= all_blackholes[b].x - 100 && 
						rand_pos_y_2 <= all_blackholes[b].y + 100 &&
						rand_pos_y_2 >= all_blackholes[b].y - 100 ) {
						//alert("if");
						found_pos = false;
						break;
					}
					else {
						found_pos = true;
					}
				}
			}
		} else {
			break;
		}

		if (found_pos == true) {
			break;
		}

	}

	return [rand_pos_x_2, rand_pos_y_2];
}

/*
  Countdown timer. Update the html timer display each second.
*/
function startTimer() {
  count = count - 1;
  display_timer.textContent = count + " seconds";

  // if the timer is done
  if (count <= 0) {
    end_timer = true;
    // signal end of game senario
    checkGameState();
    clearInterval(timer_loop);
    return;
  }
}

/*
  Params: x           - an x coordinate of the canvas (mouse pointer x or blackhole x)
          y           - a y coordinate of the canvas  (mouse pointer y, or blackhole y)
          space_stuff - any space object such as spaceship, astroid and planet etc.

  Find AND clears blackhole if it fall with clicable region + Margin of error 25px.
*/
function find_clearRegion(x,y, space_stuff) {

	for (var i = 0; i < all_blackholes.length; i++) {
		
		// get the blackhole.x - 25 and blackhole.y - 25 to get main box (50x50)
		var main_box_x = all_blackholes[i].x - 25;
    // y is offset due to panel
		var main_box_y = (all_blackholes[i].y + 50) - 25;

    // check if space object falls in the event horizon OR
    // if a blackhole is nearby
		// for each row
		for (var j = main_box_x; j < main_box_x+100 ; j++) {
			// for each column 
			for (var k = main_box_y; k < main_box_y+100; k++) {
				// check if (i,j) = (x,y)
				if (j == x &&  k== y) {

          if (space_stuff instanceof Ship || space_stuff instanceof Astroid || 
              space_stuff instanceof Planet) {

            detected = true;
            absorb = true;
            // call the function to make ship move diagonally
            absorb_stuff(main_box_x+50, main_box_y+50, all_blackholes[i], space_stuff);
            return;
          } else  { // a blackhole click
            // erase the blackhole
            blackhole_ctx.clearRect(main_box_x, main_box_y-50, 100, 100);
            // adjust the user score accordingly
            if (all_blackholes[i].type == "blue") {
              user_score += 5;
              // display_score.textContent = user_score;
            } else if (all_blackholes[i].type == "purple") {
              user_score += 10;
            } else if (all_blackholes[i].type == "black") {
              user_score += 20;
            }
            // update score display
            score_count.textContent = "Score : " + user_score;
            // remove blackhole from the list
            all_blackholes.splice(i,1);
            return;            
          }
				}			 	
			 }
    } 
	}		
}


// x, y are the center of the blackhole
/*
  Params: x           - x coordinate for the center of blackhole
          y           - y coordinate for the center of blackhole
          blackhole   - a blackhole object
          space_stuff - any space object such as spaceship, astroid and planet etc.

  Implements the angular motion of a space_stuff toward the center of the blackhole.
  Once the blackhole image is reached, the space_stuff is removed. User loses points.
*/
function absorb_stuff(x , y, blackhole, space_stuff) {
  draw(space_stuff);

  absorb_loop = 0;
  // Calculate direction towards player
  space_stuff.direction = "custom";
  space_stuff.toPlayerX = x - space_stuff.x;
  space_stuff.toPlayerY = y - (space_stuff.y+50) ;

  // Normalize
  var toPlayerLength = Math.sqrt(space_stuff.toPlayerX * space_stuff.toPlayerX + space_stuff.toPlayerY * space_stuff.toPlayerY);
  space_stuff.toPlayerX = space_stuff.toPlayerX / toPlayerLength;
  space_stuff.toPlayerY = space_stuff.toPlayerY / toPlayerLength;


  var main_box_x = blackhole.x;
  var main_box_y = blackhole.y+40;

  // similar to find_clearRegion implementation 

  // for each row
  for (var j = main_box_y ; j <  main_box_y+50 ; j++) {
    // for each column 
    for (var k = main_box_x ; k < main_box_x+50; k++) {
      // check if (i,j) = (x,y)
      if (j == Math.round(space_stuff.y+50) &&  k == Math.round(space_stuff.x) && absorb == true) {
        
        var index = space_stuff_array.indexOf(space_stuff);
        space_stuff_array.splice(index , 1);
        blackhole.eaten += 1;
        // decrement the users score
        user_score -= 50;
        score_count.textContent = "Score : " + user_score;
        // display_score.textContent = "Score is : " + user_score;
        clearTimeout(absorb_loop);
        return;            
      }
    }       
  }   

  // Move space_stuff towards the blackhole using the blackhole's pull speed
  space_stuff.x += space_stuff.toPlayerX * blackhole.speed;
  space_stuff.y += (space_stuff.toPlayerY * blackhole.speed);
  

  // if (gamePaused) {
  //   clearTimeout(absorb_loop);
  // }    

  // set timeout to call absrb_ship
  absorb_loop = setTimeout( function () { 
    absorb_stuff(x, y, blackhole, space_stuff);
  }, 33);
}
