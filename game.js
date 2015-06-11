// Create the plant object with default nutrient properties
var plant = {
  nitrogen: 100,
  phosphorous: 100,
  potassium: 100
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
    };
  }
})();

/* A function that will be used to randomly change plant nutrients and update the DOM accordingly. The use of Math.round10 was
 the only way I found to prevent issues with binary floating point representation when trying to round decimals */
var randomlyChangePlantNutrients = function() {
  var whichNutrient = Math.random();
  if (whichNutrient <= 0.33) {
    plant.nitrogen -= Math.round10(100 * (Math.random() * (0.04 - 0.01) + 0.01),0);
  } else if (whichNutrient >= 0.66) {
    plant.phosphorous -= Math.round10(100 * (Math.random() * (0.04 - 0.01) + 0.01),0);
  } else {
    plant.potassium -= Math.round10(100 * (Math.random() * (0.04 - 0.01) + 0.01),0);
  };

  if (plant.nitrogen <= 0) {
    document.getElementById("nitrogen_value").innerHTML = "0%";
    alert("Game Over! You managed "+gameTime+" seconds!");
    clearAllIntervals();
    restartGame();
  }
  else if (plant.phosphorous <= 0) {
    document.getElementById("nitrogen_value").innerHTML = "0%";
    alert("Game Over! You managed "+gameTime+" seconds!");
    clearAllIntervals();
    restartGame();
  }
  else if (plant.potassium <= 0) {
    document.getElementById("nitrogen_value").innerHTML = "0%";
    alert("Game Over! You managed "+gameTime+" seconds!");
    clearAllIntervals();
    restartGame();
  }
  else {};

  document.getElementById("nitrogen_value").innerHTML = plant.nitrogen + "%";
  document.getElementById("nitrogen_bar").style.height = plant.nitrogen + "%";
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
};

// Functions that allow the player to feed the plant nutrients
var feedCoffeeGrounds = function(quantity) {
  plant.nitrogen += quantity;
  if (plant.nitrogen >= 100) {
    plant.nitrogen = 100;
    document.getElementById("nitrogen_value").innerHTML = plant.nitrogen + "%";}
  else {document.getElementById("nitrogen_value").innerHTML = plant.nitrogen + "%"}
};
var feedBoneMeal = function(quantity) {
  plant.phosphorous += quantity;
  if (plant.phosphorous >= 100) {
    plant.phosphorous = 100;
    document.getElementById("phosphorous_value").innerHTML = plant.phosphorous + "%";}
  else {document.getElementById("phosphorous_value").innerHTML = plant.phosphorous + "%"}
};
var feedBananaPeels = function(quantity) {
  plant.potassium += quantity;
  if (plant.potassium >= 100) {
    plant.potassium = 100;
    document.getElementById("potassium_value").innerHTML = plant.potassium + "%"}
  else {document.getElementById("potassium_value").innerHTML = plant.potassium + "%"}
};

// Function to restart game
var restartGame = function() {
  plant = {
  nitrogen: 100,
  phosphorous: 100,
  potassium: 100
  };
  document.getElementById("nitrogen_value").innerHTML = plant.nitrogen + "%";
  document.getElementById("nitrogen_bar").style.backgroundColor = "green";
  document.getElementById("nitrogen_bar").style.height = plant.nitrogen + "%";
  document.getElementById("phosphorous_value").innerHTML = plant.phosphorous + "%";
  document.getElementById("phosphorous_bar").style.backgroundColor = "green";
  document.getElementById("phosphorous_bar").style.height = plant.phosphorous + "%";
  document.getElementById("potassium_value").innerHTML = plant.potassium + "%";
  document.getElementById("potassium_bar").style.backgroundColor = "green";
  document.getElementById("potassium_bar").style.height = plant.potassium + "%";
  document.getElementById("game_live_timer").innerHTML = "Timer: 0 Secs";
};

// A way to manage a timer that records the length of a game in seconds
var gameTime = 0;

var gameTimer = function() {
  gameTime = gameTime + 1;
  document.getElementById("game_live_timer").innerHTML = "Timer: " + gameTime + " Secs";
};

var startGameTimer = function() {
  gameTime = 0;
  setInterval(gameTimer, 1000);
};



// Clears all the setIntervals that are running without needing to know the setInterval ID
var clearAllIntervals = function() {
    for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
};




