'use strict';
var COUNT = 4;
var NAME_WIZARD_ARR = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAME_WIZARD_ARR = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var EYES_COLOR_ARR = ['black', 'red', 'blue', 'yellow', 'green'];
var COAT_COLOR_ARR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// ищем элементы с классом setup(блок с настройками) и setup-similar(блок с похожими персонажами), и удаляем у них класс hidden
var setup = document.querySelector('.setup');
// setup.classList.remove('hidden');
var similarWizard = document.querySelector('.setup-similar');
similarWizard.classList.remove('hidden');

// показыввем блок на странице
setup.querySelector('.setup-similar').classList.remove('hidden');

// ищем шаблон для копирования волшебников и элемент, в который будем вставлять их
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = setup.querySelector('.setup-similar-list');

// функция рандомного числа в промежутке
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// создаем массив, для хранения копированных элементов
var wizards = [];

// создаем функцию для копирования
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// создаем шаблон элемента и циклом добавляем их в массив
var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < COUNT; i++) {
    wizards.push({
      name: NAME_WIZARD_ARR[getRandomInt(0, NAME_WIZARD_ARR.length - 1)] + ' ' + LAST_NAME_WIZARD_ARR[getRandomInt(0, LAST_NAME_WIZARD_ARR.length - 1)],
      coatColor: COAT_COLOR_ARR[getRandomInt(0, COAT_COLOR_ARR.length - 1)],
      eyesColor: EYES_COLOR_ARR[getRandomInt(0, EYES_COLOR_ARR.length - 1)]
    });
    fragment.appendChild(renderWizard(wizards[i]));
  }

  // добавляем фрагмент в элемент страницы
  similarListElement.appendChild(fragment);
};
renderWizards();

// ищем элементы
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');

// если нажат esc и поле не в фокусе - закрываем окно
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && !setupUserName.matches(':focus')) {
    evt.preventDefault();
    closePopup();
  }
};

// функция смены цвета плаща
var getWizardCoatColor = function () {
  wizardCoat.style.fill = COAT_COLOR_ARR[getRandomInt(0, COAT_COLOR_ARR.length - 1)];
  setup.querySelector('input[name="coat-color"]').value = wizardCoat.style.fill;
};

// функция смены цвета глаз
var getWizardEyesColor = function () {
  wizardEyes.style.fill = EYES_COLOR_ARR[getRandomInt(0, EYES_COLOR_ARR.length - 1)];
  setup.querySelector('input[name="eyes-color"]').value = wizardEyes.style.fill;
};

// функция смены цвета файрбола
var getFireballColor = function () {
  var fireballColor = WIZARD_FIREBALL_COLORS[getRandomInt(0, WIZARD_FIREBALL_COLORS.length - 1)];
  setupFireball.setAttribute('style', 'background-color:' + fireballColor);
  setupFireball.querySelector('input').value = fireballColor;
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  wizardCoat.addEventListener('click', getWizardCoatColor);
  wizardEyes.addEventListener('click', getWizardEyesColor);
  setupFireball.addEventListener('click', getFireballColor);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', getWizardCoatColor);
  wizardEyes.removeEventListener('click', getWizardEyesColor);
  setupFireball.removeEventListener('click', getFireballColor);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupOpenIcon.addEventListener('focus', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

var userNameInput = document.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});
