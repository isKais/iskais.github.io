import os
import requests

def fetch_favicon(domain: str, size: int = 128):
    """
    从 Google API 获取指定域名的 favicon
    """
    url = f"https://{domain}/favicon.ico"
    try:
        response = requests.get(url, timeout=2)
        response.raise_for_status() # 请求失败会抛出异常
        return response.content
    except Exception as e:
        print(f"[失败] 无法获取 {domain} 的图标: {e}")
        return None


def main():
    print("开始脚本")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(base_dir, "iconlist.txt")

    if not os.path.exists(input_file):
        print("未找到 iconlist.txt 文件，请在脚本目录下创建。")
        return

    with open(input_file, "r", encoding="utf-8") as f:
        domains = [line.strip() for line in f if line.strip()]

    for domain in domains:
        favicon = fetch_favicon(domain)
        if favicon:
            output_path = os.path.join(base_dir, f"{domain}.png")
            with open(output_path, "wb") as f:
                f.write(favicon)
            print(f"[成功] 已保存 {domain}.png")


if __name__ == "__main__":
    main()
