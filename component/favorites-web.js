class FavoritesWeb extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // :host 每个Shadow DOM内部的根样式
        // Shadow DOM是默认隔离的
        // 元素实例化的时候插入 DOM 
        // 无法访问元素的属性（因为属性可能尚未设置）
        // this.shadowRoot.innerHTML = /*html*/``;
    }

    // 自定义元素首次被插入文档 DOM 时触发
    // 这时候可以访问元素的属性
    connectedCallback() {
        // 使用更为简单的this.getAttribute获取值, 而不是slot
        const domain = this.getAttribute("domain");
        const iconPath = `./resource/icon/${domain}.png`;
        const url = `https://${domain}`;

        this.shadowRoot.innerHTML = `
          <a href="${url}" target="_blank">
            <img src="${iconPath}" alt="${domain} width="32" height="32"">
            <span>${domain}</span>
          </a>
        `;
    }
}

// 注册组件
// 注册自定义元素必须包含连字符, 且全小写
customElements.define("favorites-web", FavoritesWeb);