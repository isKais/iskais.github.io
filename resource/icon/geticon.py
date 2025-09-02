import os
import requests

def fetch_favicon(domain: str, size: int = 128):
    """
    从 Google API 获取指定域名的 favicon
    """
    url = f"https://www.google.com/s2/favicons?sz={size}&domain={domain}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers, timeout=2)
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
        output_path = os.path.join(base_dir, f"{domain}.png")
        
        # 检查文件是否已存在
        if os.path.exists(output_path):
            print(f"[跳过] {domain}.png 已存在")
            continue
            
        favicon = fetch_favicon(domain)
        if favicon:
            with open(output_path, "wb") as f:
                f.write(favicon)
            print(f"[成功] 已保存 {domain}.png")


if __name__ == "__main__":
    main()