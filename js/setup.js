'use strict';
var COUNT = 4;
var NAME_WIZARD_ARR = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAME_WIZARD_ARR = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR_ARR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR_ARR = ['black', 'red', 'blue', 'yellow', 'green'];

// ищем элементы с классом setup(блок с настройками) и setup-similar(блок с похожими персонажами), и удаляем у них класс hidden
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarWizard = document.querySelector('.setup-similar');
similarWizard.classList.remove('hidden');

// показыввем блок на странице
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// ищем шаблон для копирования волшебников и элемент, в который будем вставлять их
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');

// функция рандомного числа в промежутке
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// создаем массив, для хранения копированных элементов
var wizards = [];

// создаем функцию для копирования
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// создаем шаблон элемента и циклом добавляем их в массив
var fragment = document.createDocumentFragment();
for (var i = 0; i < COUNT; i++) {
  wizards.push({
    name: NAME_WIZARD_ARR[getRandomInt(0, NAME_WIZARD_ARR.length - 1)],
    lastName: LAST_NAME_WIZARD_ARR[getRandomInt(0, LAST_NAME_WIZARD_ARR.length - 1)],
    coatColor: COAT_COLOR_ARR[getRandomInt(0, COAT_COLOR_ARR.length - 1)],
    eyesColor: EYES_COLOR_ARR[getRandomInt(0, EYES_COLOR_ARR.length - 1)]
  });
  fragment.appendChild(renderWizard(wizards[i]));
}

// добавляем фрагмент в элемент страницы
similarListElement.appendChild(fragment);
