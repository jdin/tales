import { component } from 'haunted';
import { html } from 'lit-html';
import sources from '../player/sources.js';
import './TpTale.js';

const TpApp = () => {
  const tales = sources.map(
    (source, index) =>
      html`
        <tp-tale .index=${index} .source=${source}></tp-tale>
      `,
  );
  return html`
    <style>
      :host {
        display: block;
        margin: 1em;
      }
    </style>
    ${tales}
  `;
};

window.customElements.define('tp-app', component(TpApp));
