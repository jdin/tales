import { component, useCallback, useState } from 'haunted';
import { html } from 'lit-html';
import sources from '../player/sources.js';
import './TpTale.js';

const TpApp = () => {
  const [containerCls, setContainerCls] = useState('');
  const [myHostCls, setMyHostCls] = useState('');
  const onTaleClick = useCallback(() => {
    setContainerCls('four');
    setMyHostCls('modal-active');
  }, [setContainerCls, setMyHostCls]);

  const onContainerClick = useCallback(() => {
    setContainerCls('four out');
    setMyHostCls('');
  }, [setContainerCls, setMyHostCls]);

  const tales = sources.map(
    (source, index) =>
      html`
        <tp-tale .index=${index} .source=${source} @click=${onTaleClick}></tp-tale>
      `,
  );

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
      /*#modal-container .modal-background .modal h2 {*/
      /*  font-size: 25px;*/
      /*  line-height: 25px;*/
      /*  margin-bottom: 15px;*/
      /*}*/
      /*#modal-container .modal-background .modal p {*/
      /*  font-size: 18px;*/
      /*  line-height: 22px;*/
      /*}*/
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
    </style>
    <div id="myhost" class=${myHostCls}>
      <div id="modal-container" class=${containerCls} @click=${onContainerClick}>
        <div class="modal-background">
          <div class="modal">
            <h2>I'm a Modal</h2>
            <p>Hear me roar.</p>
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
        ${tales}
      </div>
    </div>
  `;
};

window.customElements.define('tp-app', component(TpApp));
