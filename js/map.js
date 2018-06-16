'use strict';

var OBJECT_NUMBER = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_X = 300;
var MAX_X = 900;

var MIN_Y = 130;
var MAX_Y = 630;


// функция получает рандомное число между min и max
var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


var randomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};


// функция рандомно перемешивает элементы массива, не повторяя их
var randomShuffleArray = function (arr) {
  var m = arr.length;
  var t;
  var i;

  // While there remain elements to shuffle …
  while (m) {
    // Pick a remaining element …
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
};


var avatarArray = [];
var getAvatar = function () {
  for (var i = 1; i <= OBJECT_NUMBER; i++) {
    avatarArray.push('img/avatars/user0' + i + '.png');
  }
  var avatarArrayIndex = randomNumber(0, avatarArray.length);
  return avatarArray[avatarArrayIndex];
};
// console.log('getAvatar:' + getAvatar());


var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var getTitle = function (titleArray) {
  var titleIndex = randomNumber(0, titleArray.length);
  return titleArray[titleIndex];
};
// console.log('getTitle:' + getTitle());


var getAddress = function (x, y) {
  return x + ', ' + y;
};
// console.log('getAddress:' + getAddress(600, 350));


var getPrice = randomNumber(MIN_PRICE, MAX_PRICE);
// console.log('getPrice:' + getPrice);


var typeArray = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};


var getTypeValue = function (type) {
  return typeArray[type];
};


var getType = function () {
  var type = Object.keys(typeArray);
  var typeIndex = randomNumber(0, type.length);
  return type[typeIndex];
};
// console.log('getType:' + getType());


// "rooms": число, случайное количество комнат от 1 до 5
var getRooms = randomNumber(MIN_ROOMS, MAX_ROOMS);
// console.log('getRooms:' + getRooms);


// "guests": число, случайное количество гостей, которое можно разместить
var getGuests = randomNumber(MIN_ROOMS * 2, MAX_ROOMS * 3);
// console.log('getGuests:' + getGuests);


// "checkin": строка с одним из трёх значений: 12:00, 13:00 или 14:00,
var getCheckin = function () {
  return randomItem(['12:00', '13:00', '14:00']);
};
// console.log('getCheckin:' + getCheckin());


// "checkout": строка с одним из трёх значений: 12:00, 13:00 или 14:00
var getCheckout = function () {
  return randomItem(['12:00', '13:00', '14:00']);
};
// console.log('getCheckout:' + getCheckout());


// "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var getFeatures = function () {
  var featuresIndex = randomNumber(1, featuresArray.length);
  var features = [];
  for (var i = 0; i < featuresIndex; i++) {
    features.push(featuresArray[i]);
  }
  return features;
};
// console.log('features:' + getFeatures());


var getDescription = function () {
  return '';
};


var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


var getPhotos = function () {
  return randomShuffleArray(PHOTOS);
};
// console.log('getPhotos: ' + getPhotos());


var getLocationX = function (minx, maxx) {
  return randomNumber(minx, maxx);
};


var getLocationY = function (miny, maxy) {
  return randomNumber(miny, maxy);
};
// console.log('getLocationX:' + getLocationX() + '; getLocationY:' + getLocationY());


// функция генерирует объекты в ходе цикла
var generateObjectList = function (objNumber) {
  var objectsList = [];
  var objectItem = {};

  var locationX = '';
  var locationY = '';

  for (var i = 0; i < objNumber; i++) {

    locationX = getLocationX(MIN_X, MAX_X);
    locationY = getLocationY(MIN_Y, MAX_Y);

    objectItem = {
      'author': {
        'avatar': getAvatar()
      },

      'offer': {
        'title': getTitle(titles),
        'address': getAddress(locationX, locationY),
        'price': getPrice,
        'type': getType(typeArray),
        'rooms': getRooms,
        'guests': getGuests,
        'checkin': getCheckin(),
        'checkout': getCheckout(),
        'features': getFeatures(),
        'description': getDescription(),
        'photos': getPhotos()
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    objectsList.push(objectItem);
  }
  return objectsList;
};
var objectsList = generateObjectList(OBJECT_NUMBER);
// console.log(objectsList);


document.querySelector('.map').classList.remove('map--faded');


// отрисовывает пины и помещает их на карту
var makePin = function (objList) {
  // находит шаблон для отрисовки пина на карте
  var pinTemplate = document.querySelector('.map__pins');
  var similarPin = document.querySelector('template').content.querySelector('.map__pin');
  // создает контейнер для будущих данных
  var fragment = document.createDocumentFragment();

  objList.forEach(function (obj) {
    var pinElement = similarPin.cloneNode(true);
    var img = pinElement.querySelector('img');
    pinElement.style.left = obj.location.x - img.width / 2 + 'px';
    pinElement.style.top = obj.location.y - img.height + 'px';
    img.src = obj.author.avatar;
    img.alt = obj.offer.title;

    fragment.appendChild(pinElement);
    pinTemplate.appendChild(fragment);
    // console.log(pinTemplate);
  });
};

makePin(objectsList);


var renderFeatures = function (features) {
  var featureFragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + features[i]);
    featureFragment.appendChild(newElement);
  }
  return featureFragment;
};
// console.log(renderFeatures(featuresArray));


// фотки
var renderPhotos = function (photos) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photoItem = document.createElement('img');
    // <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
    photoItem.classList.add('popup__photo');
    photoItem.src = photos[i];
    photoItem.style.width = '45px';
    photoItem.style.height = '40px';
    photoItem.alt = 'Фотография жилья';
    photosFragment.appendChild(photoItem);
    // console.log(photosFragment);
  }
  return photosFragment;
};


// отрисовывает квартирные карточки с объявами
var makeAd = function (obj) {
  // находит шаблон для отрисовки квартирной карточки
  var adTemplate = document.querySelector('template').content.querySelector('.map__card');
  var adElement = adTemplate.cloneNode(true);

  adElement.querySelector('.popup__title').textContent = obj.offer.title;
  adElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  adElement.querySelector('.popup__text--price').textContent = obj.offer.price + ' ₽/ночь';
  adElement.querySelector('.popup__type').textContent = getTypeValue(obj.offer.type);
  adElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  adElement.querySelector('.popup__features').textContent = '';
  adElement.querySelector('.popup__features').appendChild(renderFeatures(obj.offer.features));
  adElement.querySelector('.popup__description').textContent = obj.offer.description;
  adElement.querySelector('.popup__photos').textContent = '';
  adElement.querySelector('.popup__photos').appendChild(renderPhotos(obj.offer.photos));
  adElement.querySelector('.popup__avatar').src = obj.author.avatar;

  return adElement;
};

var adFragment = document.createDocumentFragment();
adFragment.appendChild(makeAd(objectsList[0]));
document.querySelector('.map').insertBefore(adFragment, document.querySelector('.map__filters-container'));
