import { component, useCallback, useState } from 'haunted';
import { html } from 'lit-html';
import sources from '../player/sources.js';
import './TpTale.js';
import { usePause } from '../player/player.js';
import {iterateIn} from "../utils/iterate.js";

const TpApp = () => {
  const [containerCls, setContainerCls] = useState('');
  const [myHostCls, setMyHostCls] = useState('');
  const [selected, setSelected] = useState(-1);
  const pause = usePause();
  const onTaleClick = useCallback(
    ({ detail: { index } }) => {
      setSelected(index);
      setContainerCls('four');
      setMyHostCls('modal-active');
    },
    [setContainerCls, setMyHostCls, setSelected],
  );

  const onContainerClick = useCallback(() => {
    setContainerCls('four out');
    setMyHostCls('');
    pause();
  }, [setContainerCls, setMyHostCls, pause]);

  const tales = sources.map(
    (src, index) =>
      html`
        <tp-tale .index=${index} .source=${src} @select=${onTaleClick} class="grid-item"></tp-tale>
      `,
  );
  const rows = Array.from(iterateIn(tales, 4));

  return html`
    <style>
      :host {
        overflow: hidden;
      }
      :host,
      #myhost {
        display: block;
        min-height: 100%;
        height: 100%;
      }

      * {
        box-sizing: border-box;
      }

      .modal-active {
        overflow: hidden;
      }

      #modal-container {
        position: fixed;
        display: table;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        transform: scale(0);
        z-index: 1;
      }

      #modal-container.four {
        z-index: 0;
        transform: scale(1);
      }
      #modal-container.four .modal-background {
        background: rgba(0, 0, 0, 0.7);
      }
      #modal-container.four .modal-background .modal {
        animation: blowUpModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
      #modal-container.four + .content {
        z-index: 1;
        animation: blowUpContent 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
      #modal-container.four.out .modal-background .modal {
        animation: blowUpModalTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
      #modal-container.four.out + .content {
        animation: blowUpContentTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }

      #modal-container .modal-background {
        display: table-cell;
        background: rgba(0, 0, 0, 0.8);
        text-align: center;
        vertical-align: middle;
      }
      #modal-container .modal-background .modal {
        background: white;
        padding: 50px;
        display: inline-block;
        border-radius: 3px;
        font-weight: 300;
        position: relative;
      }
      #modal-container .modal-background .modal .modal-svg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 3px;
      }
      #modal-container .modal-background .modal .modal-svg rect {
        stroke: #fff;
        stroke-width: 2px;
        stroke-dasharray: 778;
        stroke-dashoffset: 778;
      }

      .content {
        min-height: 100%;
        height: 100%;
        background: white;
        position: relative;
        z-index: 0;
      }

      @keyframes blowUpContent {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        99.9% {
          transform: scale(2);
          opacity: 0;
        }
        100% {
          transform: scale(0);
        }
      }

      @keyframes blowUpContentTwo {
        0% {
          transform: scale(2);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes blowUpModal {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes blowUpModalTwo {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(0);
          opacity: 0;
        }
      }

      .content {
        max-width: 1335px;
        margin: 0 auto;
      }
      .grid-row {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
      }
      .grid-item {
        /*height: 200px;*/
        flex-basis: 20%;
        -ms-flex: auto;
        /*width: 200px;*/
        position: relative;
        padding: 10px;
        box-sizing: border-box;
      }
    </style>
    <div id="myhost" class=${myHostCls}>
      <div id="modal-container" class=${containerCls} @click=${onContainerClick}>
        <div class="modal-background">
          <div class="modal">
            ${tales[selected]}
            <svg
              class="modal-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
            </svg>
          </div>
        </div>
      </div>
      <div class="content">
        ${rows.map(row => html`
            <div class="grid-row">${row}</div>
        `)}
      </div>
    </div>
  `;
};

window.customElements.define('tp-app', component(TpApp));
