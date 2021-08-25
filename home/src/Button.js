import React from "react";
import ReactDOM from "react-dom";

import styles from './styles.module.css'

export const Button = ({ caption = "React Button" }) => <button className={styles.button + ' externalButton'}>{caption}</button>;

export default () => {
  customElements.define('custom-button',
    class extends HTMLElement {

      static get observedAttributes() {
        return ['styles'];
      } 

      constructor() {
        super();
        let globalStyles = ''
        const styles = document.getElementsByTagName('style')
        for(let item of styles) {
          globalStyles += item.innerHTML
        }
        this.globalStyleContainer = document.createElement('style')
        this.styleContainer = document.createElement('style')
        this.globalStyleContainer.innerText = globalStyles

        this.shadowRootStore = this.attachShadow({mode: 'open'});
      }

      renderApp() {
        this.styleContainer.innerText = this.getAttribute('styles');
        ReactDOM.render(<Button />, this.shadowRootStore);

        this.shadowRootStore.appendChild(this.globalStyleContainer);
        this.shadowRootStore.appendChild(this.styleContainer);
      }

      connectedCallback() {
        this.renderApp()
      }

      attributeChangedCallback() {
        this.renderApp()
      }
    }
  );
}