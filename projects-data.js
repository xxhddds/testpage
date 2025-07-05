// 项目数据配置
const projectsData = [
    {
        id: 'github-portfolio',
        title: 'GitHub项目展示',
        icon: 'fab fa-github',
        description: '一个现代化的项目展示网站，使用HTML、CSS和JavaScript构建。',
        tags: ['HTML', 'CSS', 'JavaScript'],
        demoUrl: 'https://github.com/wedsfew/testpage',
        sourceUrl: 'https://github.com/wedsfew/testpage',
        featured: true,
        category: 'web'
    },
    {
        id: 'web-app',
        title: 'Web应用项目',
        icon: 'fas fa-globe',
        description: '一个功能丰富的Web应用，包含用户认证、数据管理等功能。',
        tags: ['React', 'Node.js', 'MongoDB'],
        demoUrl: '#',
        sourceUrl: '#',
        featured: true,
        category: 'fullstack'
    },
    {
        id: 'mobile-app',
        title: '移动应用',
        icon: 'fas fa-mobile-alt',
        description: '跨平台移动应用，提供良好的用户体验和流畅的交互。',
        tags: ['React Native', 'TypeScript', 'Firebase'],
        demoUrl: '#',
        sourceUrl: '#',
        featured: false,
        category: 'mobile'
    },
    {
        id: 'ai-tool',
        title: 'AI工具项目',
        icon: 'fas fa-robot',
        description: '集成人工智能的工具应用，提供智能化的解决方案。',
        tags: ['Python', 'FastAPI', 'OpenAI'],
        demoUrl: '#',
        sourceUrl: '#',
        featured: true,
        category: 'ai'
    },
    {
        id: 'data-visualization',
        title: '数据可视化',
        icon: 'fas fa-database',
        description: '交互式数据可视化平台，帮助用户更好地理解数据。',
        tags: ['Vue.js', 'D3.js', 'Python'],
        demoUrl: '#',
        sourceUrl: '#',
        featured: false,
        category: 'data'
    },
    {
        id: 'ecommerce',
        title: '电商平台',
        icon: 'fas fa-shopping-cart',
        description: '全栈电商解决方案，包含商品管理、订单处理、支付集成等功能。',
        tags: ['Next.js', 'PostgreSQL', 'Stripe'],
        demoUrl: '#',
        sourceUrl: '#',
        featured: true,
        category: 'ecommerce'
    },
    {
        id: 'ecommerce',
        title: '1',
        icon: 'fas fa-shopping-cart',
        description: '11111',
        tags: ['Next.js', 'PostgreSQL', 'Stripe'],
        demoUrl: '#',
        sourceUrl: '#',
        featured: true,
        category: 'ecommerce'
    }
];

// 项目分类配置
const projectCategories = {
    all: { name: '全部', icon: 'fas fa-th' },
    web: { name: '前端', icon: 'fas fa-code' },
    fullstack: { name: '全栈', icon: 'fas fa-server' },
    mobile: { name: '移动端', icon: 'fas fa-mobile-alt' },
    ai: { name: 'AI/ML', icon: 'fas fa-robot' },
    data: { name: '数据', icon: 'fas fa-chart-bar' },
    ecommerce: { name: '电商', icon: 'fas fa-shopping-cart' }
};

// 技能栈颜色配置
const tagColors = {
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'JavaScript': '#f7df1e',
    'React': '#61dafb',
    'Vue.js': '#4fc08d',
    'Node.js': '#339933',
    'Python': '#3776ab',
    'TypeScript': '#3178c6',
    'MongoDB': '#47a248',
    'PostgreSQL': '#336791',
    'Firebase': '#ffca28',
    'FastAPI': '#009688',
    'OpenAI': '#412991',
    'D3.js': '#f68e56',
    'Next.js': '#000000',
    'React Native': '#61dafb',
    'Stripe': '#635bff'
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectsData, projectCategories, tagColors };
} 