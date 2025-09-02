class ToggleSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // :host 每个Shadow DOM内部的根样式
    // Shadow DOM是默认隔离的
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host {
          display: block;
          margin: 0.5em 0;
        }
        .toggle-header {
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
        .toggle-content {
          display: none;
          margin-left: 1.5em;
        }
        :host([open]) .toggle-content {
          display: block;
        }
        :host([open]) .toggle-btn {
          transform: rotate(90deg);
        }
      </style>
      <div class="toggle-header">
        <span class="toggle-btn">▶</span>
        <slot name="title"></slot>
      </div>
      <div class="toggle-content">
        <slot name="content"></slot>
      </div>
    `;
  }

  connectedCallback() {
    const header = this.shadowRoot.querySelector(".toggle-header");
    header.addEventListener("click", () => {
      this.toggleAttribute("open");
    });

    // 因为外面为了方便, 没有分配插槽, 所以需要重新分配插槽
    // 自动把 slotted 的第一个标题元素当标题，后面当内容
    const slot = this.querySelector("h1,h2,h3,h4,h5,h6");
    const rest = [...this.childNodes].filter(
      n => n !== slot && !(n.nodeType === 3 && !n.textContent.trim())
    );
    // [...this.childNodes]所有子节点的数组
    // 排除slot标题节点以及空文本节点

    if (slot) slot.setAttribute("slot", "title");
    rest.forEach(n => n.setAttribute?.("slot", "content"));
  }
}
customElements.define("toggle-section", ToggleSection);