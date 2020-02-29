import {component} from "haunted";
import {html} from "lit-html";

const TpApp = () =>
  html`
    <h1>Hi!</h1>
  `;

window.customElements.define('tp-app', component(TpApp));
