import {useState} from "haunted";
import sources from './sources.js';

const files = sources.map(s => s.file);

const players = files.map(f => new Audio(f));

export const usePause = () => () => {
  players.forEach(p => p.pause());
};

export const usePlay = (index = 0) => () => {
  // reset other players
  for (let i = 0; i < players.length; i += 1) {
    if (i !== index) {
      players[i].currentTime = 0;
      players[i].pause();
    }
  }
  players[index].play();
};

export const usePaused = index => {
  const player = players[index];
  const [paused, setPaused] = useState(player.paused);
  player.addEventListener('pause', () => {
    setPaused(true)
  });
  player.addEventListener('play', () => {
    setPaused(false)
  });
  return paused;
};

export const useToggle = index => {
  const paused = usePaused(index);
  const play = usePlay(index);
  const pause = usePause();
  return () => {
    if (paused) {
      play();
    } else {
      pause();
    }
  }
};
