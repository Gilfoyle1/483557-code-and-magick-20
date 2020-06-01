'use stict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SPACE = 10;
var FONT_SPACE = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var SPACE_COLUMN = 50;

var barHeight = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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
  renderCloud(ctx, CLOUD_X + SPACE, CLOUD_Y + SPACE, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 56);


  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, 100%,' + Math.random() * 100 + '%)';
    };
    ctx.fillRect(CLOUD_X + SPACE_COLUMN + (SPACE_COLUMN + BAR_WIDTH) * i, CLOUD_HEIGHT - (barHeight * times[i]) / maxTime - 30, BAR_WIDTH, (barHeight * times[i]) / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + SPACE_COLUMN + (SPACE_COLUMN + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_SPACE);

    ctx.fillText(Math.floor(times[i]), CLOUD_X + SPACE_COLUMN + (SPACE_COLUMN + BAR_WIDTH) * i, CLOUD_HEIGHT - (barHeight * times[i]) / maxTime - 35);
  };
};
