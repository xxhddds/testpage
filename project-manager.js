/**
 * 项目管理系统 - JavaScript 功能
 * 包含添加、编辑、删除项目，以及数据导出导入功能
 */

// 项目管理器类
class ProjectManagerSystem {
    constructor() {
        this.projects = [];
        this.currentEditingProject = null;
        this.currentTags = [];
        this.init();
    }
    
    /**
     * 初始化系统
     */
    init() {
        this.loadProjects();
        this.renderProjectsList();
        this.setupEventListeners();
    }
    
    /**
     * 加载项目数据
     * 优先从localStorage加载，如果没有则使用默认数据
     */
    loadProjects() {
        try {
            const localData = localStorage.getItem('projectsData');
            if (localData) {
                const parsed = JSON.parse(localData);
                this.projects = parsed.projects || [];
                this.showMessage('已加载本地保存的项目数据', 'success');
            } else {
                // 使用默认数据
                this.projects = window.projectsData?.projects || [];
                this.showMessage('已加载默认项目数据', 'success');
            }
        } catch (error) {
            console.error('加载项目数据失败:', error);
            this.projects = window.projectsData?.projects || [];
            this.showMessage('加载项目数据失败，使用默认数据', 'error');
        }
    }
    
    /**
     * 保存项目数据到localStorage
     */
    saveProjects() {
        try {
            const dataToSave = {
                projects: this.projects,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem('projectsData', JSON.stringify(dataToSave));
            this.showMessage('项目数据已保存', 'success');
        } catch (error) {
            console.error('保存项目数据失败:', error);
            this.showMessage('保存项目数据失败', 'error');
        }
    }
    
    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 表单提交
        document.getElementById('projectEditForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
        
        // 标签输入
        document.getElementById('projectTags').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addTag();
            }
        });
        
        // 项目ID输入验证
        document.getElementById('projectId').addEventListener('input', (e) => {
            this.validateProjectId(e.target.value);
        });
    }
    
    /**
     * 验证项目ID
     */
    validateProjectId(id) {
        const input = document.getElementById('projectId');
        const isValid = /^[a-zA-Z0-9-_]+$/.test(id);
        const isUnique = this.currentEditingProject?.id === id || 
                        !this.projects.some(p => p.id === id);
        
        if (!isValid) {
            input.setCustomValidity('只能包含字母、数字、连字符和下划线');
        } else if (!isUnique) {
            input.setCustomValidity('项目ID已存在');
        } else {
            input.setCustomValidity('');
        }
    }
    
    /**
     * 渲染项目列表
     */
    renderProjectsList() {
        const container = document.getElementById('projectsList');
        const countElement = document.getElementById('projectCount');
        
        countElement.textContent = this.projects.length;
        
        if (this.projects.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                    <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>暂无项目，点击"添加新项目"开始创建</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.projects.map(project => {
            const tagsHtml = project.tags.map(tag => 
                `<span class="tag" style="background-color: ${this.getTagColor(tag)}">${tag}</span>`
            ).join('');
            
            const statusIcon = this.getStatusIcon(project.status);
            const featuredBadge = project.featured ? 
                '<span class="tag" style="background-color: #ffd700; color: #000;">精选</span>' : '';
            
            return `
                <div class="project-item">
                    <div class="project-info">
                        <h3>
                            <i class="${project.icon || 'fas fa-code'}"></i>
                            ${project.title}
                            ${featuredBadge}
                        </h3>
                        <p><strong>ID:</strong> ${project.id}</p>
                        <p><strong>分类:</strong> ${this.getCategoryName(project.category)}</p>
                        <p><strong>状态:</strong> ${statusIcon} ${this.getStatusName(project.status)}</p>
                        <p>${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
                        <div class="project-tags">${tagsHtml}</div>
                    </div>
                    <div class="project-actions">
                        <button class="edit-btn" onclick="projectManager.editProject('${project.id}')">
                            <i class="fas fa-edit"></i>
                            编辑
                        </button>
                        <button class="delete-btn" onclick="projectManager.deleteProject('${project.id}')">
                            <i class="fas fa-trash"></i>
                            删除
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    /**
     * 获取标签颜色
     */
    getTagColor(tag) {
        const colors = window.projectsData?.tagColors || {};
        return colors[tag] || '#667eea';
    }
    
    /**
     * 获取分类名称
     */
    getCategoryName(category) {
        const names = {
            'frontend': '前端',
            'fullstack': '全栈',
            'mobile': '移动端',
            'ai': 'AI/ML',
            'data': '数据',
            'ecommerce': '电商'
        };
        return names[category] || category;
    }
    
    /**
     * 获取状态名称
     */
    getStatusName(status) {
        const names = {
            'completed': '已完成',
            'in-progress': '进行中',
            'maintenance': '维护中'
        };
        return names[status] || status;
    }
    
    /**
     * 获取状态图标
     */
    getStatusIcon(status) {
        const icons = {
            'completed': '<i class="fas fa-check-circle" style="color: #28a745;"></i>',
            'in-progress': '<i class="fas fa-clock" style="color: #ffc107;"></i>',
            'maintenance': '<i class="fas fa-tools" style="color: #17a2b8;"></i>'
        };
        return icons[status] || '<i class="fas fa-question-circle"></i>';
    }
    
    /**
     * 显示状态消息
     */
    showMessage(message, type = 'success') {
        const messageElement = document.getElementById('statusMessage');
        messageElement.textContent = message;
        messageElement.className = `status-message status-${type}`;
        messageElement.classList.remove('hidden');
        
        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 3000);
    }
    
    /**
     * 显示添加项目表单
     */
    showAddForm() {
        this.currentEditingProject = null;
        this.currentTags = [];
        document.getElementById('formTitle').textContent = '添加新项目';
        document.getElementById('submitButtonText').textContent = '保存项目';
        document.getElementById('projectEditForm').reset();
        document.getElementById('projectId').disabled = false;
        document.getElementById('tagPreview').innerHTML = '';
        document.getElementById('projectForm').classList.remove('hidden');
        document.getElementById('projectId').focus();
    }
    
    /**
     * 隐藏添加项目表单
     */
    hideAddForm() {
        document.getElementById('projectForm').classList.add('hidden');
        this.currentEditingProject = null;
        this.currentTags = [];
    }
    
    /**
     * 编辑项目
     */
    editProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) {
            this.showMessage('项目不存在', 'error');
            return;
        }
        
        this.currentEditingProject = project;
        this.currentTags = [...project.tags];
        
        // 填充表单
        document.getElementById('formTitle').textContent = '编辑项目';
        document.getElementById('submitButtonText').textContent = '更新项目';
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectId').disabled = true;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectCategory').value = project.category;
        document.getElementById('projectIcon').value = project.icon || '';
        document.getElementById('projectDemoUrl').value = project.demoUrl || '';
        document.getElementById('projectGithubUrl').value = project.githubUrl || '';
        document.getElementById('projectFeatured').value = project.featured ? 'true' : 'false';
        document.getElementById('projectStatus').value = project.status || 'completed';
        
        this.renderTagPreview();
        document.getElementById('projectForm').classList.remove('hidden');
    }
    
    /**
     * 删除项目
     */
    deleteProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) {
            this.showMessage('项目不存在', 'error');
            return;
        }
        
        document.getElementById('deleteProjectTitle').textContent = project.title;
        document.getElementById('deleteModal').style.display = 'block';
        this.projectToDelete = projectId;
    }
    
    /**
     * 确认删除项目
     */
    confirmDelete() {
        if (!this.projectToDelete) return;
        
        const index = this.projects.findIndex(p => p.id === this.projectToDelete);
        if (index !== -1) {
            this.projects.splice(index, 1);
            this.saveProjects();
            this.renderProjectsList();
            this.showMessage('项目已删除', 'success');
        }
        
        this.closeDeleteModal();
    }
    
    /**
     * 关闭删除确认模态框
     */
    closeDeleteModal() {
        document.getElementById('deleteModal').style.display = 'none';
        this.projectToDelete = null;
    }
    
    /**
     * 添加标签
     */
    addTag() {
        const input = document.getElementById('projectTags');
        const tag = input.value.trim();
        
        if (tag && !this.currentTags.includes(tag)) {
            this.currentTags.push(tag);
            input.value = '';
            this.renderTagPreview();
        }
    }
    
    /**
     * 删除标签
     */
    removeTag(tag) {
        const index = this.currentTags.indexOf(tag);
        if (index !== -1) {
            this.currentTags.splice(index, 1);
            this.renderTagPreview();
        }
    }
    
    /**
     * 渲染标签预览
     */
    renderTagPreview() {
        const container = document.getElementById('tagPreview');
        container.innerHTML = this.currentTags.map(tag => 
            `<span class="tag" onclick="projectManager.removeTag('${tag}')" title="点击删除">${tag}</span>`
        ).join('');
    }
    
    /**
     * 处理表单提交
     */
    handleFormSubmit() {
        const formData = new FormData(document.getElementById('projectEditForm'));
        const projectData = {
            id: formData.get('id'),
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            icon: formData.get('icon') || 'fas fa-code',
            tags: [...this.currentTags],
            demoUrl: formData.get('demoUrl') || '',
            githubUrl: formData.get('githubUrl') || '',
            featured: formData.get('featured') === 'true',
            status: formData.get('status') || 'completed'
        };
        
        // 验证数据
        if (!this.validateProjectData(projectData)) {
            return;
        }
        
        if (this.currentEditingProject) {
            // 更新项目
            const index = this.projects.findIndex(p => p.id === this.currentEditingProject.id);
            if (index !== -1) {
                this.projects[index] = projectData;
                this.showMessage('项目已更新', 'success');
            }
        } else {
            // 添加新项目
            this.projects.push(projectData);
            this.showMessage('项目已添加', 'success');
        }
        
        this.saveProjects();
        this.renderProjectsList();
        this.hideAddForm();
    }
    
    /**
     * 验证项目数据
     */
    validateProjectData(data) {
        if (!data.id || !data.title || !data.description || !data.category) {
            this.showMessage('请填写所有必填字段', 'error');
            return false;
        }
        
        if (!/^[a-zA-Z0-9-_]+$/.test(data.id)) {
            this.showMessage('项目ID只能包含字母、数字、连字符和下划线', 'error');
            return false;
        }
        
        if (!this.currentEditingProject && this.projects.some(p => p.id === data.id)) {
            this.showMessage('项目ID已存在', 'error');
            return false;
        }
        
        return true;
    }
    
    /**
     * 导出数据
     */
    exportData() {
        try {
            const dataToExport = {
                projects: this.projects,
                categories: window.projectsData?.categories || [],
                tagColors: window.projectsData?.tagColors || {},
                exportedAt: new Date().toISOString()
            };
            
            const blob = new Blob([
                '// 项目数据配置文件\n' +
                '// 导出时间: ' + new Date().toLocaleString() + '\n\n' +
                'window.projectsData = ' + JSON.stringify(dataToExport, null, 2) + ';\n'
            ], { type: 'application/javascript' });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'projects-data.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('数据导出成功', 'success');
        } catch (error) {
            console.error('导出数据失败:', error);
            this.showMessage('导出数据失败', 'error');
        }
    }
    
    /**
     * 导入数据
     */
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                let content = e.target.result;
                
                // 如果是JS文件，提取JSON数据
                if (file.name.endsWith('.js')) {
                    const match = content.match(/window\.projectsData\s*=\s*({[\s\S]*?});/);
                    if (match) {
                        content = match[1];
                    }
                }
                
                const importedData = JSON.parse(content);
                
                if (importedData.projects && Array.isArray(importedData.projects)) {
                    this.projects = importedData.projects;
                    this.saveProjects();
                    this.renderProjectsList();
                    this.showMessage(`成功导入 ${this.projects.length} 个项目`, 'success');
                } else {
                    this.showMessage('导入文件格式不正确', 'error');
                }
            } catch (error) {
                console.error('导入数据失败:', error);
                this.showMessage('导入数据失败：文件格式不正确', 'error');
            }
        };
        
        reader.readAsText(file);
        event.target.value = ''; // 清空文件输入
    }
    
    /**
     * 重置为默认数据
     */
    resetData() {
        if (confirm('确定要重置为默认数据吗？这将删除所有自定义项目！')) {
            localStorage.removeItem('projectsData');
            this.projects = window.projectsData?.projects || [];
            this.renderProjectsList();
            this.showMessage('已重置为默认数据', 'success');
        }
    }
}

// 全局函数（供HTML调用）
let projectManager;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    projectManager = new ProjectManagerSystem();
});

// 全局函数
function showAddForm() {
    projectManager.showAddForm();
}

function hideAddForm() {
    projectManager.hideAddForm();
}

function addTag() {
    projectManager.addTag();
}

function exportData() {
    projectManager.exportData();
}

function importData(event) {
    projectManager.importData(event);
}

function resetData() {
    projectManager.resetData();
}

function confirmDelete() {
    projectManager.confirmDelete();
}

function closeDeleteModal() {
    projectManager.closeDeleteModal();
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('deleteModal');
    if (event.target === modal) {
        closeDeleteModal();
    }
} 