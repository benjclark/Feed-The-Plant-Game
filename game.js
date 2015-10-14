// Feed The Plant Game
// Break project down in to functionality goals:
// - a way to track game time and how live to user
// - a way for user to start game
// - a way for user to restart game
// - a way for nutrients to change randomly and update DOM
// - a way for user to feed plant nutrients
// - a way to alert user to game over and show them final game time



// Create game timer
// - function that increments up a variable representing seconds
// - update  game_live_timer <p> in DOM with value of the game timer variable for live game time

// create global variable for game timer
var gameTime = 0;

var gameTimer = function() {	
	// increment variable up
	gameTime = gameTime + 1;
	// update DOM to show live time
  	document.getElementById("game_live_timer").innerHTML = "Timer: " + gameTime + " Secs";
}



// Create function to start game timer
// - startGameTimer is assigned to onclick attribute of the Start Game button element

var startGameTimer = function() {
	// reset timer variable to zero
	gameTime = 0;
	// begin a setInterval running that calls the game timer function each second
    setInterval(gameTimer, 1000);
}



// Create the plant object with nutrient properties that have initial values when page first loaded
// - created in global scope as multiple functions need to access

var plant = {
    nitrogen: 100,
    phosphorous: 100,
    potassium: 100
};



// Create function to reset the game
// The Restart Game button element will call resetGame then startGame

var resetGame = function() {
	// self-calling function that clears all the setIntervals that are running without needing to 
	// know the setInterval ID by iterating through each possible ID
	(function() {
	    for (var i = 1; i < 99999; i++) {
	        window.clearInterval(i);
	    }
	})();
	// reset properties of plant object back to 100
    plant = {
    nitrogen: 100,
    phosphorous: 100,
    potassium: 100
    };
    // update nutrient bar text to show new value
    document.getElementById("nitrogen_value").innerHTML = plant.nitrogen + "%";
    // update nutrient bar style to show green background (green because 100%)
    document.getElementById("nitrogen_bar").style.backgroundColor = "green";
    // update visual height of nutrient bar in accordance with new value
    document.getElementById("nitrogen_bar").style.height = plant.nitrogen + "%";
    document.getElementById("phosphorous_value").innerHTML = plant.phosphorous + "%";
    document.getElementById("phosphorous_bar").style.backgroundColor = "green";
    document.getElementById("phosphorous_bar").style.height = plant.phosphorous + "%";
    document.getElementById("potassium_value").innerHTML = plant.potassium + "%";
    document.getElementById("potassium_bar").style.backgroundColor = "green";
    document.getElementById("potassium_bar").style.height = plant.potassium + "%";
    // reset game timer text back to zero
    document.getElementById("game_live_timer").innerHTML = "Timer: 0 Secs";
}



// Create function to randomly change plant nutrients and update the DOM accordingly
// this will be called repeatedly within a setInterval upon click of the Start Game button element

var randomlyChangePlantNutrients = function() {
	// value of this variable will decide which nutrient
	var whichNutrient = Math.random();
	// assesses value to decide which nutrient
	if (whichNutrient <= 0.33) {
		// uses math.random * 100 to decide the random amount of nutrients to subtract from total
		// multiplies by (max - min) + min to set a random float between min and max
		// math.round10 to nearest whole number but importantly it prevents issues with binary floating point representation when rounding
		plant.nitrogen -= Math.round10(100 * (Math.random() * (0.04 - 0.01) + 0.01),0);
	} else if (whichNutrient >= 0.66) {
		plant.phosphorous -= Math.round10(100 * (Math.random() * (0.04 - 0.01) + 0.01),0);
	} else {
		plant.potassium -= Math.round10(100 * (Math.random() * (0.04 - 0.01) + 0.01),0);
	}
	// what happens if game over situation
	if (plant.nitrogen <= 0) {
		// update nutrient bar text to show 0%
		document.getElementById("nitrogen_value").innerHTML = "0%";
		// alert popup for user summarising final game time score
		alert("Game Over! You managed "+gameTime+" seconds!");
		// reset the game
		resetGame();
	}
	else if (plant.phosphorous <= 0) {
		document.getElementById("nitrogen_value").innerHTML = "0%";
		alert("Game Over! You managed "+gameTime+" seconds!");
		resetGame();
	}
	else if (plant.potassium <= 0) {
		document.getElementById("nitrogen_value").innerHTML = "0%";
		alert("Game Over! You managed "+gameTime+" seconds!");
		resetGame();
	}
	else {}
	// update DOM to show changes to nutrients
    document.getElementById("nitrogen_value").innerHTML = plant.nitrogen + "%";
    document.getElementById("nitrogen_bar").style.height = plant.nitrogen + "%";
    // update nutrient bar style to show appropriate backhround colour in respect of nutrient value
    switch (true) {
        case (plant.nitrogen <= 100 && plant.nitrogen >= 60): document.getElementById("nitrogen_bar").style.backgroundColor = "green";
        break;
        case (plant.nitrogen <= 59 && plant.nitrogen >= 40): document.getElementById("nitrogen_bar").style.backgroundColor = "yellow";
        break;
        case (plant.nitrogen <= 39 && plant.nitrogen >= 20): document.getElementById("nitrogen_bar").style.backgroundColor = "orange";
        break;
        case (plant.nitrogen <= 19 && plant.nitrogen >= 1): document.getElementById("nitrogen_bar").style.backgroundColor = "red";
        break;
        default:;
    }
    document.getElementById("phosphorous_value").innerHTML = plant.phosphorous + "%";
    document.getElementById("phosphorous_bar").style.height = plant.phosphorous + "%";
    switch (true) {
        case (plant.phosphorous <= 100 && plant.phosphorous >= 60): document.getElementById("phosphorous_bar").style.backgroundColor = "green";
        break;
        case (plant.phosphorous <= 59 && plant.phosphorous >= 40): document.getElementById("phosphorous_bar").style.backgroundColor = "yellow";
        break;
        case (plant.phosphorous <= 39 && plant.phosphorous >= 20): document.getElementById("phosphorous_bar").style.backgroundColor = "orange";
        break;
        case (plant.phosphorous <= 19 && plant.phosphorous >= 1): document.getElementById("phosphorous_bar").style.backgroundColor = "red";
        break;
        default:;
    }
    document.getElementById("potassium_value").innerHTML = plant.potassium + "%";
    document.getElementById("potassium_bar").style.height = plant.potassium + "%";
    switch (true) {
        case (plant.potassium <= 100 && plant.potassium >= 60): document.getElementById("potassium_bar").style.backgroundColor = "green";
        break;
        case (plant.potassium <= 59 && plant.potassium >= 40): document.getElementById("potassium_bar").style.backgroundColor = "yellow";
        break;
        case (plant.potassium <= 39 && plant.potassium >= 20): document.getElementById("potassium_bar").style.backgroundColor = "orange";
        break;
        case (plant.potassium <= 19 && plant.potassium >= 1): document.getElementById("potassium_bar").style.backgroundColor = "red";
        break;
        default:;
    }
}



// Create functions allowing user to feed the plant nutrients

// function has parameter that is defined in the onclick attribute of the feed button element:
// Math.floor(Math.random() * (max - min + 1) + min)
// this provides a random integer between the min and max
var feedCoffeeGrounds = function(quantity) {
    // update the value of the plant's nitrogen property to add random amount
    plant.nitrogen += quantity;
    // if greater than 100 then just set to 100 and update DOM
    if (plant.nitrogen >= 100) {
        plant.nitrogen = 100;
        document.getElementById("nitrogen_value").innerHTML = plant.nitrogen + "%";
        document.getElementById("nitrogen_bar").style.height = plant.nitrogen + "%";
    }
    else {
    	// if not greater than 100 then just update DOM
    	document.getElementById("nitrogen_value").innerHTML = plant.nitrogen + "%";
    	document.getElementById("nitrogen_bar").style.height = plant.nitrogen + "%";
    }
};
var feedBoneMeal = function(quantity) {
    plant.phosphorous += quantity;
    if (plant.phosphorous >= 100) {
        plant.phosphorous = 100;
        document.getElementById("phosphorous_value").innerHTML = plant.phosphorous + "%";
        document.getElementById("phosphorous_bar").style.height = plant.phosphorous + "%";
    }
    else {
    	document.getElementById("phosphorous_value").innerHTML = plant.phosphorous + "%";
    	document.getElementById("phosphorous_bar").style.height = plant.phosphorous + "%";
    }
};
var feedBananaPeels = function(quantity) {
    plant.potassium += quantity;
    if (plant.potassium >= 100) {
        plant.potassium = 100;
        document.getElementById("potassium_value").innerHTML = plant.potassium + "%";
        document.getElementById("potassium_bar").style.height = plant.potassium + "%";
    }
    else {
    	document.getElementById("potassium_value").innerHTML = plant.potassium + "%";
    	document.getElementById("potassium_bar").style.height = plant.potassium + "%";
    }
};



// A solution to problems with decimal rounding (issues with binary floating point representation) by Mozilla Developer Network

(function() {
  /* Decimal adjustment of a number.
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value. */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }
  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    }
  }
})();
