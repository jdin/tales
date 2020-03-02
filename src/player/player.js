import sources from './sources.js';

const files = sources.map(s => s.file);

const players = files.map(f => new Audio(f));

const pause = () => {
  players.forEach(p => p.pause());
};

const play = (index = 0) => {
  pause();
  for (let i = 0; i < players.length; i += 1) {
    console.log(i, index)
    if (i !== index) {
      players[i].currentTime = 0;
    }
  }
  players[index].play();
};

const paused = index => players[index].paused;

export default {
  play,
  pause,
  paused,
};
