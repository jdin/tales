import { html } from 'lit-html';
import { component, useCallback } from 'haunted';
import {usePlay, usePause, usePaused} from '../player/player.js';

const TpTale = ({ index, source }) => {
  const { image, name } = source;
  const pause = usePause();
  const play = usePlay(index);
  const paused = usePaused(index);
  const onClick = useCallback(() => {
    if (paused) {
      play();
    } else {
      pause();
    }
  }, [pause, play, paused]);
  return html`
    <img src=${image} alt=${name} />
    <button @click=${onClick}>${paused ? 'Play' : 'Pause'}</button>
  `;
};

const observedAttributes = ['index', 'source'];
window.customElements.define('tp-tale', component(TpTale, { observedAttributes }));
