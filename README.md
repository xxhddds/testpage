# 🚀 我的项目展示网站

一个现代化的项目展示网站，专为在 Cloudflare Pages 上部署而设计。

## ✨ 特色功能

- 🎨 现代化设计，使用渐变色和动画效果
- 📱 完全响应式，适配所有设备
- ⚡ 高性能，优化的加载速度
- 🔒 安全配置，包含 CSP 和安全头
- 🌐 支持多种项目类型展示
- 💫 流畅的交互动画

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **字体**: Google Fonts (Inter)
- **图标**: Font Awesome
- **部署**: Cloudflare Pages
- **版本控制**: Git

## 📁 项目结构

```
testpage/
├── index.html              # 主页面
├── project-manager.html    # 项目管理页面
├── styles.css              # 样式文件
├── script.js               # 主页面JavaScript功能
├── project-manager.js      # 项目管理系统JavaScript
├── projects-data.js        # 项目数据配置（支持localStorage）
├── test-hover.html         # 悬浮效果测试页面
├── example-add-project.html # 添加项目示例页面
├── README-components.md    # 组件使用指南
├── _headers               # Cloudflare Pages 配置
├── .gitignore             # Git 忽略文件
├── LICENSE                # MIT许可证
├── test.txt               # 测试报告
└── README.md              # 项目说明
```

## 🚀 部署到 Cloudflare Pages

### 方法一：通过 Git 连接 (推荐)

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Add project portfolio website"
   git push origin main
   ```

2. **连接到 Cloudflare Pages**
   - 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 选择您的 GitHub 仓库 `testpage`
   - 配置构建设置：
     - 构建命令: (留空)
     - 构建输出目录: (留空，使用根目录)
   - 点击 "Save and Deploy"

### 方法二：直接上传

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 点击 "Create a project"
3. 选择 "Upload assets"
4. 上传所有项目文件
5. 设置项目名称并部署

## 🔧 本地开发

由于这是一个纯静态网站，您可以直接在浏览器中打开 `index.html` 文件进行预览。

或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 📝 自定义配置

### 更新项目信息

1. 编辑 `index.html` 中的项目信息
2. 修改项目链接 URL
3. 更新联系信息
4. 调整技能栈信息

### 样式自定义

在 `styles.css` 中的 `:root` 部分修改颜色变量：

```css
:root {
    --primary-color: #667eea;      /* 主色调 */
    --secondary-color: #764ba2;    /* 辅助色 */
    --accent-color: #f093fb;       /* 强调色 */
    /* ... 其他变量 */
}
```

### 功能扩展

- 添加新的项目卡片
- 集成联系表单
- 添加博客功能
- 集成 Google Analytics

## 🔐 安全配置

项目包含以下安全措施：

- **CSP (Content Security Policy)**: 防止 XSS 攻击
- **安全头**: 包含 X-Frame-Options, X-Content-Type-Options 等
- **HTTPS**: Cloudflare Pages 默认提供 HTTPS
- **缓存策略**: 优化资源加载

## 🎯 性能优化

- 压缩的 CSS 和 JavaScript
- 优化的图片加载
- 懒加载支持
- 缓存策略配置
- CDN 加速 (通过 Cloudflare)

## 📈 更新记录

### 2024-12-19 - 项目管理系统
- **新增功能**: 
  - 完整的项目管理系统，支持添加、编辑、删除项目
  - 数据持久化功能，使用localStorage保存项目数据
  - 数据导出/导入功能，支持.js和.json文件格式
  - 可视化项目管理界面，包含表单验证和实时预览
  - 主页面管理入口，方便用户访问项目管理功能
- **文件新增**: 
  - `project-manager.html`: 项目管理页面
  - `project-manager.js`: 项目管理系统JavaScript
- **文件修改**: 
  - `projects-data.js`: 支持localStorage数据持久化
  - `script.js`: 更新数据结构兼容性
  - `index.html`: 添加管理入口链接
  - `styles.css`: 添加管理链接样式

### 2024-12-19 - 增强项目卡片悬浮效果
- **新增功能**: 
  - 增强项目卡片悬浮效果，向上移动距离从5px增加到12px + 3%缩放
  - 添加双重阴影效果（普通阴影 + 紫色光晕）
  - 添加渐变背景色变化效果
  - 改善过渡动画，使用更平滑的cubic-bezier曲线，持续时间0.4s
- **文件修改**: 
  - `styles.css`: 增强`.project-card:hover`样式
  - `test-hover.html`: 更新测试页面说明文字

## 🐛 问题排查

### 常见问题

1. **样式未加载**: 检查 CSS 文件路径
2. **JavaScript 错误**: 检查浏览器控制台
3. **部署失败**: 检查 Cloudflare Pages 构建日志
4. **字体未显示**: 检查网络连接和 Google Fonts

### 支持的浏览器

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 📄 许可证

此项目使用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Pull Request 和 Issue！

## 📞 联系方式

- GitHub: [@wedsfew](https://github.com/wedsfew)
- 邮箱: your-email@example.com

---

⭐ 如果这个项目对您有帮助，请给个 Star！
