/*
  1. page loads
  2. Show Step 1
    2a. Highlight Step 1 bubble
    2b. Show Step 1 Content
  3. User Clicks Next
    3a. Increment Step
    3b. Remove Hightlight from previous step bubble
    3c. Hide previous step content
    3d. Highlight next step bubble;
    3e. Display next step content;
  4. User Clicks previous
    4a. Remove Hightlight from current step bubble
    4b. Hide current step content
    4c. Decrement Step
    4d. Highlight previous step bubble;
    4e. Display previous step content;
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

function colorCurrentBubble() {
  var stepIndicator = document.querySelector(".steps").children;
  stepIndicator[currentStep].style.background = "#916a70";
  stepIndicator[currentStep].children[0].style.color = "#fff";
}



function resetContentSections() {
  var allContent = document.querySelectorAll('.step-section');
  [].forEach.call(allContent, function(section){
    if (section.classList.contains('isActive')){
      section.classList.toggle('isActive');
    }
  });
}


function showCurrentSection() {
  var currentSection = document.querySelector( '#step' + currentStep );
  currentSection.classList.add('isActive');
}


function getInputs() {
  var formInputs = document.querySelector('form');
  [].forEach.call(formInputs, function(input) {
    if( input.type === 'checkbox' ) {
      if(!currentUser.hasOwnProperty(input.name)) {
        currentUser[input.name] = [];
      }
      if (input.checked) {
        currentUser[input.name].push(input.value);
      }
    } else {
      currentUser[input.name] = input.value;
    }
  });
}


function displayInputs() {
  for (var key in currentUser) {
    if (currentUser[key] != "") {
      var userInputs = document.createElement('p');
      var titleSpan = document.createElement('span');
      titleSpan.classList.add('entryTitle');
      var inputTitle = document.createTextNode(key + ": ");
      var inputValue =  document.createTextNode(currentUser[key]);
      titleSpan.appendChild(inputTitle);
      userInputs.appendChild(titleSpan);
      userInputs.appendChild(inputValue);
      document.querySelector('#step3').appendChild(userInputs);
    }
  }
}



function nextStep() {
  currentStep++;

  if ( currentStep === lastStep ) {
    document.querySelector('.alert').innerHTML = '<h2>All Done!</h2>';
    document.querySelector(".isActive").classList.add('complete');
    return;
  }

  resetContentSections();
  showCurrentSection();

  if ( currentStep < lastStep ) {
    resetBubbleColors();
    colorCurrentBubble();
  }

  if (currentStep === lastStep - 1) {
    //change button from next to submit and hide previous button
    var advanceBtns = document.querySelector(".step-ctrl").children;
    [].forEach.call(advanceBtns, function(btn) {
      if (btn.innerHTML === 'prev' ) {
        btn.style.display = 'none';
      } else if (btn.innerHTML === 'next' ) {
        btn.innerHTML = "Submit";
      }
    });

    getInputs();
    displayInputs();
  }
}



function prevStep() {
  var stepIndicator = document.querySelector(".steps").children;
  if (currentStep > 0) {
    resetBubbleColors();
    currentStep--;
    resetContentSections();
    showCurrentSection();
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
