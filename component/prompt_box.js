// 该组件用于网页弹出一个弹窗
// 使用方法
// < !--更新框 -->
// <script type="module" src="./component/prompt_box.js"></script>
// <prompt-box note='更新了'>
//     <center>
//         <p class="sketchy">计时器!!!</p>
//     </center>
//     <p style="color: gray;font-size:15px;">tip: 涂色的地方可以点击吼~</p>
// </prompt-box>
// <script type="module">
//     const sketchy = document.querySelector("prompt-box .sketchy");
//     sketchy.addEventListener("click", () => {
//         window.open('./files/Easy Cat Timer/index.html');
//     });
// </script>


class UpdateModal extends HTMLElement {
    constructor() {
        super();
        // 创建 Shadow DOM，封装样式和结构 mode:open给予外部修改的权限(f12)
        const shadow = this.attachShadow({ mode: "open" });

        // 引入组件 CSS
        const link = document.createElement('link');          // 1. 创建 <link> 元素
        link.setAttribute('rel', 'stylesheet');              // 2. 设置链接类型为样式表
        link.setAttribute('href', './component/prompt_box.css');       // 3. 指定外部CSS文件路径
        shadow.appendChild(link);                            // 4. 将<link>插入Shadow DOM

        // HTML 模板
        /*&times;用于显示x符号*/
        shadow.innerHTML += /*html*/`
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <div class="update-note"></div>
            <slot></slot>
        </div>
      </div>
    `;

        // 关闭按钮事件
        shadow.querySelector('.modal-close').addEventListener('click', () => {
            this.hide();
        });
    }

    // 当组件插入页面时触发
    connectedCallback() {
        this.renderContent();
        this.hide();
    }

    // 显示组件
    show() {
        this.style.display = 'block';
    }

    // 隐藏组件
    hide() {
        this.style.display = 'none';
    }

    // 渲染动态内容
    renderContent() {
        const shadow = this.shadowRoot;
        shadow.querySelector('.update-note').textContent = this.getAttribute('note');
    }
}

// 注册组件
customElements.define('prompt-box', UpdateModal);
