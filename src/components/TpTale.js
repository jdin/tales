import { html } from 'lit-html';
import { component, useCallback } from 'haunted';
import { useToggle } from '../player/player.js';

const SIZE = 200;

function TpTale({ index, source }) {
  const { image, name } = source;
  const toggle = useToggle(index);
  // const paused = usePaused(index);
  const onClick = useCallback(() => {
    toggle();
    this.dispatchEvent(new CustomEvent('select', { detail: { index, source } }));
  }, [toggle]);
  // const progress = useProgress(index);
  return html`
    <style>
        :host {
          display: block;
        }
        img {
          cursor: pointer;
          border-radius: 7%;
          border: 1px rgba(0, 0, 0, 0.2) solid;
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19);
        }
    </style>
    <img src=${image} alt=${name} @click=${onClick} width=${SIZE} height=${SIZE} />
  `;
}

const observedAttributes = ['index', 'source'];
window.customElements.define('tp-tale', component(TpTale, { observedAttributes }));
