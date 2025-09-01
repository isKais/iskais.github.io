class ToggleSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host {
          display: block;
          margin: 0.5em 0;
        }
        .header {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }
        .toggle-btn {
          margin-right: 0.5em;
          font-size: 0.9em;
          transition: transform 0.2s;
        }
        .content {
          display: none;
          margin-left: 1.5em;
        }
        :host([open]) .content {
          display: block;
        }
        :host([open]) .toggle-btn {
          transform: rotate(90deg);
        }
      </style>
      <div class="header">
        <span class="toggle-btn">▶</span>
        <slot name="title"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    `;
    }

    connectedCallback() {
        const header = this.shadowRoot.querySelector(".header");
        header.addEventListener("click", () => {
            this.toggleAttribute("open");
        });

        // 自动把 slotted 的第一个元素当标题，后面当内容
        const slot = this.querySelector("h1,h2,h3,h4,h5,h6");
        const rest = [...this.childNodes].filter(
            n => n !== slot && !(n.nodeType === 3 && !n.textContent.trim())
        );

        if (slot) slot.setAttribute("slot", "title");
        rest.forEach(n => n.setAttribute?.("slot", "content"));
    }
}
customElements.define("toggle-section", ToggleSection);