// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initProjectComponents();
});

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 平滑滚动到目标区域
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 添加活动状态
                navLinks.forEach(nl => nl.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// 滚动效果
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // 头部透明度效果
        if (scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
        
        // 视差效果
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// 动画效果
function initAnimations() {
    // 创建Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 观察所有卡片元素
    const cards = document.querySelectorAll('.project-card, .skill-item, .contact-item');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // 数字动画效果
    const statNumbers = document.querySelectorAll('.stat-number');
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        numberObserver.observe(stat);
    });
}

// 数字动画函数
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * target);
        element.textContent = current + '+';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 联系表单处理
function initContactForm() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                // 添加点击效果
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
}

// 项目卡片交互已移至组件内部处理

// 按钮点击效果
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // 创建涟漪效果
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 添加涟漪效果的CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// 性能优化：懒加载图片（如果有的话）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 响应式导航菜单（移动端）
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            this.classList.toggle('active');
        });
    }
}

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    // 隐藏加载动画（如果有的话）
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // 初始化懒加载
    lazyLoadImages();
    
    // 初始化移动端菜单
    initMobileMenu();
    
    // 添加页面加载完成的类
    document.body.classList.add('loaded');
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript错误:', e.error);
});

// 导出函数供其他脚本使用
window.portfolioUtils = {
    animateNumber,
    initAnimations,
    initScrollEffects
};

// =============================================================================
// 项目组件系统
// =============================================================================

class ProjectComponent {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            itemsPerPage: 6,
            enableFilter: true,
            enableLoadMore: true,
            animationDelay: 100,
            ...options
        };
        
        this.projects = window.projectsData?.projects || [];
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.filteredProjects = [];
        this.displayedProjects = [];
        
        this.init();
    }
    
    init() {
        this.setupFilter();
        this.filterProjects();
        this.render();
        this.bindEvents();
    }
    
    setupFilter() {
        if (!this.options.enableFilter) return;
        
        const filterContainer = document.getElementById('filterButtons');
        if (!filterContainer) return;
        
        const categories = window.projectsData?.categories || [];
        const filterButtons = categories.map(category => {
            const activeClass = category.id === this.currentFilter ? 'active' : '';
            return `
                <button class="filter-btn ${activeClass}" data-filter="${category.id}">
                    <i class="${category.icon}"></i>
                    <span>${category.name}</span>
                </button>
            `;
        }).join('');
        
        filterContainer.innerHTML = filterButtons;
    }
    
    filterProjects() {
        if (this.currentFilter === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.category === this.currentFilter
            );
        }
        
        // 重置页面
        this.currentPage = 1;
        this.updateDisplayedProjects();
    }
    
    updateDisplayedProjects() {
        const startIndex = 0;
        const endIndex = this.currentPage * this.options.itemsPerPage;
        this.displayedProjects = this.filteredProjects.slice(startIndex, endIndex);
        
        // 更新加载更多按钮的显示状态
        this.updateLoadMoreButton();
    }
    
    updateLoadMoreButton() {
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        if (!loadMoreContainer || !this.options.enableLoadMore) return;
        
        const hasMore = this.displayedProjects.length < this.filteredProjects.length;
        loadMoreContainer.style.display = hasMore ? 'block' : 'none';
    }
    
    render() {
        const projectsHTML = this.displayedProjects.map((project, index) => {
            return this.createProjectCard(project, index);
        }).join('');
        
        this.container.innerHTML = projectsHTML;
        
        // 重新绑定事件
        this.bindProjectEvents();
        
        // 触发动画
        this.triggerAnimations();
    }
    
    createProjectCard(project, index) {
        const tagColors = window.projectsData?.tagColors || {};
        const tags = project.tags.map(tag => {
            const color = tagColors[tag] || '#667eea';
            return `<span class="tag" style="--tag-color: ${color}">${tag}</span>`;
        }).join('');
        
        const demoButton = project.demoUrl && project.demoUrl !== '#' ? 
            `<a href="${project.demoUrl}" class="btn btn-primary" target="_blank">
                <i class="fas fa-external-link-alt"></i>
                查看项目
            </a>` : '';
        
        const sourceButton = project.githubUrl && project.githubUrl !== '#' ? 
            `<a href="${project.githubUrl}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-github"></i>
                源码
            </a>` : '';
        
        const featuredClass = project.featured ? 'project-card-featured' : '';
        
        return `
            <div class="project-card ${featuredClass}" data-project-id="${project.id}" data-category="${project.category}" style="animation-delay: ${index * this.options.animationDelay}ms">
                <div class="project-header">
                    <i class="${project.icon} project-icon"></i>
                    <h3 class="project-title">${project.title}</h3>
                    ${project.featured ? '<span class="featured-badge">精选</span>' : ''}
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${tags}
                </div>
                <div class="project-links">
                    ${demoButton}
                    ${sourceButton}
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        // 过滤按钮事件
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.dataset.filter;
                this.setFilter(filter);
                
                // 更新按钮状态
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
        
        // 加载更多按钮事件
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMore();
            });
        }
    }
    
    bindProjectEvents() {
        // 按钮点击效果（保留涟漪效果）
        const buttons = document.querySelectorAll('.project-card .btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // 创建涟漪效果
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    triggerAnimations() {
        // 为新添加的卡片触发动画
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            // 使用CSS类而不是内联样式
            card.classList.add('project-card-loading');
            
            setTimeout(() => {
                card.classList.remove('project-card-loading');
                card.classList.add('project-card-loaded');
            }, index * this.options.animationDelay);
        });
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        this.filterProjects();
        this.render();
    }
    
    loadMore() {
        this.currentPage++;
        this.updateDisplayedProjects();
        
        // 只渲染新的项目
        const newProjects = this.filteredProjects.slice(
            (this.currentPage - 1) * this.options.itemsPerPage,
            this.currentPage * this.options.itemsPerPage
        );
        
        const newProjectsHTML = newProjects.map((project, index) => {
            return this.createProjectCard(project, this.displayedProjects.length - newProjects.length + index);
        }).join('');
        
        this.container.insertAdjacentHTML('beforeend', newProjectsHTML);
        
        // 重新绑定事件
        this.bindProjectEvents();
        
        // 触发新项目的动画
        const newCards = this.container.querySelectorAll('.project-card:nth-last-child(-n+' + newProjects.length + ')');
        newCards.forEach((card, index) => {
            // 使用CSS类而不是内联样式
            card.classList.add('project-card-loading');
            
            setTimeout(() => {
                card.classList.remove('project-card-loading');
                card.classList.add('project-card-loaded');
            }, index * this.options.animationDelay);
        });
        
        this.updateLoadMoreButton();
    }
    
    // 公共方法：添加新项目
    addProject(project) {
        this.projects.push(project);
        this.filterProjects();
        this.render();
    }
    
    // 公共方法：更新项目
    updateProject(projectId, updatedProject) {
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updatedProject };
            this.filterProjects();
            this.render();
        }
    }
    
    // 公共方法：删除项目
    removeProject(projectId) {
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.filterProjects();
        this.render();
    }
}

// 项目管理工具函数
const ProjectManager = {
    instance: null,
    
    // 初始化项目组件
    init() {
        const container = document.getElementById('projectsGrid');
        if (container) {
            this.instance = new ProjectComponent(container);
        }
    },
    
    // 添加新项目的便捷方法
    addProject(projectData) {
        if (this.instance) {
            this.instance.addProject(projectData);
        }
    },
    
    // 更新项目的便捷方法
    updateProject(projectId, updatedData) {
        if (this.instance) {
            this.instance.updateProject(projectId, updatedData);
        }
    },
    
    // 删除项目的便捷方法
    removeProject(projectId) {
        if (this.instance) {
            this.instance.removeProject(projectId);
        }
    }
};

// 初始化项目组件
function initProjectComponents() {
    ProjectManager.init();
}

// 导出项目管理器供全局使用
window.ProjectManager = ProjectManager; 