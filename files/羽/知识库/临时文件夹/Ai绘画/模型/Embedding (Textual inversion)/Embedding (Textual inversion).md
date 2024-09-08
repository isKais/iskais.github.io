# Embedding (Textual inversion) Overview
 
```ccard
type: folder_brief_live
```
 
俗称的 embedding 模型。常见格式为 pt、png图片、webp图片。大小一般在 KB 级别。

常见的是一些 EasyNegative、bad_image 这些负面 embedding，放在负面提示词内使用。

![](https://i0.hdslb.com/bfs/article/b335086775fece4f517af24940806cc5c712e33e.png@!web-article-pic.webp)

使用方法：

放在这个文件夹里面，生成图片的时候需要带上 文件名 作为 tag。

例如，上面这张图里面的 shiratama_at_2-3000.pt 这个模型，使用的时候就需要带上这个tag：shiratama_at_2-3000
![[678ffa79b8657e88156b3229a2a8cccf497bfece.png@!web-article-pic.webp]]
