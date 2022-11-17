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
console.log(player);

const onTimeUpdate = function ({ seconds }) {
  localStorage.setItem(LOCALSTORAGE_KEY, seconds);
};

const currentTime = localStorage.getItem(LOCALSTORAGE_KEY)
  ? localStorage.getItem(LOCALSTORAGE_KEY)
  : 0;

player.on('timeupdate', throttle(onTimeUpdate, 1000));

player.setCurrentTime(currentTime);