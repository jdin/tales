import { html } from 'lit-html';
import { component, useCallback } from 'haunted';
import player from '../player/player.js';

const TpTale = ({ index, source }) => {
  const { image, name } = source;
  const onClick = useCallback(() => {
    if (player.paused(index)) {
      player.play(index);
    } else {
      player.pause();
    }
  }, [index]);
  return html`
    <img src=${image} alt=${name} />
    <button @click=${onClick}>${player.paused(index) ? 'Play' : 'Pause'}</button>
  `;
};

const observedAttributes = ['index', 'source'];
window.customElements.define('tp-tale', component(TpTale, { observedAttributes }));
