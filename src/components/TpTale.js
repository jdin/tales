import { html } from 'lit-html';
import { component, useCallback } from 'haunted';
import {useToggle, usePaused} from '../player/player.js';

const TpTale = ({ index, source }) => {
  const { image, name } = source;
  const toggle = useToggle(index);
  const paused = usePaused(index);
  const onClick = useCallback(() => toggle(), [toggle]);
  return html`
    <img src=${image} alt=${name} />
    <button @click=${onClick}>${paused ? 'Play' : 'Pause'}</button>
  `;
};

const observedAttributes = ['index', 'source'];
window.customElements.define('tp-tale', component(TpTale, { observedAttributes }));
