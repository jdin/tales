import { html } from 'lit-html';
import { component, useCallback } from 'haunted';
import { useToggle } from '../player/player.js';

const SIZE = 235;

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
    <img src=${image} alt=${name} @click=${onClick} width=${SIZE} height=${SIZE} />
  `;
}

const observedAttributes = ['index', 'source'];
window.customElements.define('tp-tale', component(TpTale, { observedAttributes }));
