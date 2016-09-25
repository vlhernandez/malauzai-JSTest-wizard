/*
  1. page loads
  2. Show Step 1
    2a. Highlight Step 1 bubble;
  3. User Clicks Next
    3a. Capture and save all inputs
    3b. Hide step 1 box
    3c. Display next step box
    3d. Highlight next step bubble;
*/

var currentUser = {};
var currentStep = 0;  //indexing steps from 0
var lastStep = 4;


function resetBubbleColors() {
  var stepBubbles = document.querySelector('.steps').children;
  [].forEach.call(stepBubbles, function(bubble) {
    bubble.style.background = 'none';
    bubble.children[0].style.color = '#503b3e';
  });
}


function resetContentSections() {
  var contentSections = document.querySelectorAll('.step-section');
  [].forEach.call(contentSections, function( step ) {
    step.classList.remove = 'isActive';
  });
}

function showCurrentSection() {
  var currentSection = document.querySelector('#step' + currentStep );
  currentSection.classList.add('isActive');
}

function colorStepBubble() {
  var stepIndicator = document.querySelector(".steps").children;
  stepIndicator[currentStep].style.background = "#916a70";
  stepIndicator[currentStep].children[0].style.color = "#fff";
}

function getInputs() {
  var formInputs = document.querySelector('form');
  [].forEach.call(formInputs, function(input) {
    currentUser[input.name] = input.value;
  });
  console.log('currentUser...', currentUser);
}


function displayInputs() {
  var textNode = "";
  for (var key in currentUser) {
    if (currentUser[key] != "") {
      textNode = textNode + '<p>' + key + ': ' + currentUser[key] + '</p>';
    }
  }
  document.querySelector('#step4').innerHTML =  textNode;
}


/* NEXT STEP CONTROLLER */

function nextStep() {
  // resetContentSections();
  // showCurrentSection();
  var allContent = document.querySelectorAll('.step-section');
  [].forEach.call(allContent, function(section){
    if (section.classList.contains('isActive')){
      section.classList.toggle('isActive');
    }
  });

  var step = currentStep+1
  var content = document.querySelector('#step' + step );
  content.classList.toggle('isActive');

  currentStep++;
  if ( currentStep === lastStep ) {
    document.querySelector('.alert').innerHTML = '<h2>All Done!</h2>';
    document.querySelector(".step-ctrl").style.display = "none";
    displayInputs();
    return;
  }

  if ( currentStep < lastStep ) {
    resetBubbleColors();
    colorStepBubble();
    getInputs();
  }

  if (currentStep === lastStep - 1) {
    var advanceBtns = document.querySelector(".step-ctrl").children;
    [].forEach.call(advanceBtns, function(btn) {
      if (btn.innerHTML === 'prev' ) {
        btn.style.display = 'none';
      } else if (btn.innerHTML === 'next' ) {
        btn.innerHTML = "Submit";
      }
    });
  }
}

function prevStep() {
  var stepIndicator = document.querySelector(".steps").children;
  if (currentStep > 0) {
    resetSteps();
    currentStep--;
    stepIndicator[currentStep].style.background = "#916a70";
    stepIndicator[currentStep].children[0].style.color= "#fff";
  }

}


/* Add Listeners */
var advanceBtns = document.querySelector(".step-ctrl").children;
[].forEach.call(advanceBtns, function(btn) {
  if (btn.innerHTML === 'next' ) {
    btn.addEventListener('click', nextStep, false)
  } else if (btn.innerHTML === 'prev' ) {
    btn.addEventListener('click', prevStep, false)
  }
});

/* Initalize wizard */
showCurrentSection();
