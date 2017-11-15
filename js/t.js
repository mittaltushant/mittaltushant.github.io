// Selecting the container element
var el = document.querySelector('.t');

// All the possible options (these are the default values)
// Remember that every option (except individualDelays) can be defined as single value or array
var options = {
    size: 150,         // Font size, defined by the height of the letters (pixels)
    weight: 10,         // Font weight (pixels)
    rounded: false,    // Rounded letter endings
    color: '#F22939',  // Font color
    duration: 2,       // Duration of the animation of each letter (seconds)
    delay: [0, 0.05],  // Delay animation among letters (seconds)
    fade: 0.5,         // Fade effect duration (seconds)
    easing: d3_ease.easeCubicInOut.ease,   // Easing function
    individualDelays: false,               // If false (default), every letter delay increase gradually, showing letters from left to right always. If you want to show letters in a disorderly way, set it to true, and define different delays for the desired letters.
};

// Initializing the text (Letters parameters: container-element, options)
var myText = new Letters(el, options);
// Show letters with the default options defined
myText.show();

// Hide letters with the default options defined
myText.hide();

// Toggle letters with the default options defined
myText.toggle();

// An example with all the possible options for triggers
// Parameters (JSON): duration, delay, fade, easing, individualDelays, callback
var newOptions = {
    duration: 1.5,
    delay: 0.2,
    fade: 1,
    easing: d3_ease.easeCircleInOut.ease,
    individualDelays: false,
    callback: function(){
      }
};
// These new options will override the options defined in the initialization
myText.show(newOptions);

