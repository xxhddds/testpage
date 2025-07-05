// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
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

// 项目卡片交互
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

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