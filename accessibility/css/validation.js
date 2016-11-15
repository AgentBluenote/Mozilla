var inputs = document.querySelectorAll('input');
var labels = document.querySelectorAll('label');
var form = document.querySelector('form');

var formItems = [];

var errorField = document.querySelector('.errors');

errorField.style.visibility = 'hidden';

for(var i = 0; i < inputs.length-1; i++) {
  var obj = {};
  obj.label = labels[i];
  obj.input = inputs[i];
  formItems.push(obj);
}

form.onsubmit = validate;

function validate(e) {
  errorField.innerHTML = '';
  errorField.style.visibility = 'hidden';
  for(var i = 0; i < formItems.length; i++) {
    var testItem = formItems[i];
    if(testItem.input.value === '') {
      createLink(testItem);
    }
  }

  if(errorField.innerHTML !== '') {
    e.preventDefault();
    errorField.style.visibility = 'visible';
  }
}

function createLink(testItem) {
  var anchor = document.createElement('a');
  anchor.textContent = testItem.input.name + ' field is empty: fill in your ' + testItem.input.name + '.';
  anchor.href = '#' + testItem.input.name;
  anchor.onclick = function() {
    testItem.input.focus();
  };
  errorField.appendChild(anchor);
}
