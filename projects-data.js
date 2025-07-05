// 项目数据配置文件
// 支持localStorage数据持久化 - 优先使用localStorage数据

// 默认项目数据
const defaultProjectsData = [
    {
        id: 'github-portfolio',
        title: 'GitHub项目展示',
        icon: 'fab fa-github',
        description: '一个现代化的项目展示网站，使用HTML、CSS和JavaScript构建。',
        tags: ['HTML', 'CSS', 'JavaScript'],
        demoUrl: 'https://github.com/wedsfew/testpage',
        githubUrl: 'https://github.com/wedsfew/testpage',
        featured: true,
        category: 'frontend',
        status: 'completed'
    },
    {
        id: 'web-app',
        title: 'Web应用项目',
        icon: 'fas fa-globe',
        description: '一个功能丰富的Web应用，包含用户认证、数据管理等功能。',
        tags: ['React', 'Node.js', 'MongoDB'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true,
        category: 'fullstack',
        status: 'completed'
    },
    {
        id: 'mobile-app',
        title: '移动应用',
        icon: 'fas fa-mobile-alt',
        description: '跨平台移动应用，提供良好的用户体验和流畅的交互。',
        tags: ['React Native', 'TypeScript', 'Firebase'],
        demoUrl: '#',
        githubUrl: '#',
        featured: false,
        category: 'mobile',
        status: 'completed'
    },
    {
        id: 'ai-tool',
        title: 'AI工具项目',
        icon: 'fas fa-robot',
        description: '集成人工智能的工具应用，提供智能化的解决方案。',
        tags: ['Python', 'FastAPI', 'OpenAI'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true,
        category: 'ai',
        status: 'completed'
    },
    {
        id: 'data-visualization',
        title: '数据可视化',
        icon: 'fas fa-database',
        description: '交互式数据可视化平台，帮助用户更好地理解数据。',
        tags: ['Vue.js', 'D3.js', 'Python'],
        demoUrl: '#',
        githubUrl: '#',
        featured: false,
        category: 'data',
        status: 'completed'
    },
    {
        id: 'ecommerce-platform',
        title: '电商平台',
        icon: 'fas fa-shopping-cart',
        description: '全栈电商解决方案，包含商品管理、订单处理、支付集成等功能。',
        tags: ['Next.js', 'PostgreSQL', 'Stripe'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true,
        category: 'ecommerce',
        status: 'completed'
    }
];

// 项目分类配置
const projectCategories = [
    { id: 'all', name: '全部', icon: 'fas fa-th' },
    { id: 'frontend', name: '前端', icon: 'fas fa-code' },
    { id: 'fullstack', name: '全栈', icon: 'fas fa-server' },
    { id: 'mobile', name: '移动端', icon: 'fas fa-mobile-alt' },
    { id: 'ai', name: 'AI/ML', icon: 'fas fa-robot' },
    { id: 'data', name: '数据', icon: 'fas fa-chart-bar' },
    { id: 'ecommerce', name: '电商', icon: 'fas fa-shopping-cart' }
];

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

// 数据加载函数 - 优先从localStorage加载
function loadProjectsData() {
    try {
        const localData = localStorage.getItem('projectsData');
        if (localData) {
            const parsed = JSON.parse(localData);
            return parsed.projects || defaultProjectsData;
        }
    } catch (error) {
        console.warn('加载localStorage数据失败，使用默认数据:', error);
    }
    return defaultProjectsData;
}

// 全局数据对象
window.projectsData = {
    projects: loadProjectsData(),
    categories: projectCategories,
    tagColors: tagColors
};

// 兼容性导出 - 支持旧版本的引用方式
window.projectsData.projectsData = window.projectsData.projects;
window.projectsData.projectCategories = projectCategories;

// Node.js 模块导出（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        projects: window.projectsData.projects,
        categories: projectCategories,
        tagColors: tagColors
    };
} 