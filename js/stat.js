'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SPACE = 10;
var FONT_SPACE = 15;
var BAR_WIDTH = 40;
var SPACE_COLUMN = 50;
var TEXT_X = 130;
var TEXT_Y = 40;
var FONT_F = '16px PT Mono';
var barHeight = 150;

// универсальная функция для рисования прямоугольника
var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color || '#fff';
  ctx.fillRect(x, y, width, height);
};

// универсальная функция для рисования текста
var renderText = function (ctx, text, x, y, font, color) {
  ctx.fillStyle = color || '#000';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SPACE, CLOUD_Y + SPACE, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');
  renderText(ctx, 'Ура вы победили!', TEXT_X, TEXT_Y, FONT_F, '#000');
  renderText(ctx, 'Список результатов:', TEXT_X, TEXT_Y + FONT_SPACE, FONT_F, '#000');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, 100%,' + Math.random() * 100 + '%)';

    var cloudSummX = CLOUD_X + SPACE_COLUMN + (SPACE_COLUMN + BAR_WIDTH) * i;

    // вызываем функцию для графиков
    renderCloud(ctx, cloudSummX, CLOUD_HEIGHT - (barHeight * times[i]) / maxTime - 30, BAR_WIDTH, (barHeight * times[i]) / maxTime, ctx.fillStyle);
    // вызываем функцию для имен игроков
    renderText(ctx, players[i], cloudSummX, CLOUD_HEIGHT - FONT_SPACE, FONT_F, '#000');
    // вызываем функцию для результата игрока
    renderText(ctx, Math.floor(times[i]), cloudSummX, CLOUD_HEIGHT - (barHeight * times[i]) / maxTime - 35, FONT_F, '#000');
  }
};
