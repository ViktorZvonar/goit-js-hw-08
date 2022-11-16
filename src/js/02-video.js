import throttle from 'lodash.throttle';

import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const options = {
  duration: 61.857,
  percent: 0.049,
  seconds: 3.034,
};
const player = new Player(iframe, options);

const onTimeUpdate = function ({ seconds }) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(seconds));
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));

const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);

const parsedTime = JSON.parse(savedTime);

player
  .setCurrentTime(parsedTime)
  .then(function (time) {
    if (parsedTime) {
      time = parsedTime;
    }
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
