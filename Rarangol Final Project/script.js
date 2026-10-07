
const AEROX_LOGO = `
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <rect width="64" height="64" rx="16" fill="#6366F1"/>
    <path d="M32 12L14 50H50L32 12Z" fill="white"/>
    <rect x="29" y="34" width="6" height="12" rx="1" fill="#6366F1"/>
    <circle cx="16" cy="22" r="2.5" fill="rgba(255,255,255,0.5)"/>
    <circle cx="48" cy="22" r="2.5" fill="rgba(255,255,255,0.5)"/>
    <circle cx="18" cy="36" r="1.5" fill="rgba(255,255,255,0.3)"/>
    <circle cx="46" cy="36" r="1.5" fill="rgba(255,255,255,0.3)"/>
</svg>`;


const Store = {
    
    KEYS: {
        USERS: 'inventory_users',
        PARTS: 'inventory_parts',
        CURRENT_USER: 'inventory_current_user',
    },

    
    getUsers() {
        const data = localStorage.getItem(this.KEYS.USERS);
        return data ? JSON.parse(data) : [];
    },

    
    saveUsers(users) {
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },

    
    getParts() {
        const data = localStorage.getItem(this.KEYS.PARTS);
        return data ? JSON.parse(data) : [];
    },

    
    saveParts(parts) {
        localStorage.setItem(this.KEYS.PARTS, JSON.stringify(parts));
    },

    
    getCurrentUser() {
        const data = localStorage.getItem(this.KEYS.CURRENT_USER);
        return data ? JSON.parse(data) : null;
    },

    
    setCurrentUser(user) {
        localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
    },

    
    clearCurrentUser() {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
    },
};


const SAMPLE_PARTS = [
    { id: 'PRT-001', name: 'Intel Core i9-13900K', category: 'CPU', brand: 'Intel', model: 'i9-13900K', quantity: 15, price: 589.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-002', name: 'AMD Ryzen 7 7800X3D', category: 'CPU', brand: 'AMD', model: '7800X3D', quantity: 8, price: 449.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-003', name: 'NVIDIA GeForce RTX 4090', category: 'GPU', brand: 'NVIDIA', model: 'RTX 4090', quantity: 3, price: 1799.99, status: 'low-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-004', name: 'AMD Radeon RX 7900 XTX', category: 'GPU', brand: 'AMD', model: 'RX 7900 XTX', quantity: 7, price: 999.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-005', name: 'Corsair Vengeance DDR5 32GB', category: 'RAM', brand: 'Corsair', model: 'CMK32GX5M2B5200C40', quantity: 25, price: 119.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-006', name: 'G.Skill Trident Z5 RGB 64GB', category: 'RAM', brand: 'G.Skill', model: 'F5-6000J3636F16G', quantity: 0, price: 229.99, status: 'out-of-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-007', name: 'ASUS ROG STRIX Z790-E', category: 'Motherboard', brand: 'ASUS', model: 'ROG STRIX Z790-E', quantity: 5, price: 499.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-008', name: 'MSI MAG B650 TOMAHAWK', category: 'Motherboard', brand: 'MSI', model: 'MAG B650 TOMAHAWK', quantity: 12, price: 239.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-009', name: 'Samsung 990 Pro 2TB', category: 'Storage', brand: 'Samsung', model: 'MZ-V9P2T0B/AM', quantity: 20, price: 169.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-010', name: 'WD Black SN850X 1TB', category: 'Storage', brand: 'Western Digital', model: 'WDS100T2X0E', quantity: 2, price: 119.99, status: 'low-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-011', name: 'Corsair RM850x (2023)', category: 'PSU', brand: 'Corsair', model: 'CP-9020200-NA', quantity: 18, price: 139.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-012', name: 'EVGA SuperNOVA 1000 G7', category: 'PSU', brand: 'EVGA', model: '100-G7-1000-X1', quantity: 0, price: 199.99, status: 'out-of-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-013', name: 'Lian Li O11 Dynamic EVO', category: 'Case', brand: 'Lian Li', model: 'O11D EVO', quantity: 10, price: 159.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-014', name: 'NZXT H7 Flow', category: 'Case', brand: 'NZXT', model: 'H7 Flow', quantity: 6, price: 129.99, status: 'in-stock', createdAt: new Date().toISOString() },
    { id: 'PRT-015', name: 'Noctua NH-D15', category: 'Cooling', brand: 'Noctua', model: 'NH-D15', quantity: 14, price: 109.99, status: 'in-stock', createdAt: new Date().toISOString() },
];


let state = {
    currentView: 'dashboard',
    parts: [],
    filteredParts: [],
    searchTerm: '',
    categoryFilter: '',
    sortField: null,
    sortDirection: 'asc',
    editingPart: null,
};


const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);


function init() {
   
    if (!localStorage.getItem(Store.KEYS.PARTS)) {
        Store.saveParts(SAMPLE_PARTS);
    }

    const currentUser = Store.getCurrentUser();
    if (currentUser) {
        showDashboard();
    } else {
        showLogin();
    }
}


function showLogin() {
    document.getElementById('app').innerHTML = `
        <div class="auth-container">
            <div class="auth-box">
                <div class="auth-header">
                    <div class="logo anim-float" style="font-size:0;width:64px;height:64px;">${AEROX_LOGO}</div>
                    <h1 class="anim-fade-in-up">Welcome Back</h1>
                    <p class="anim-fade-in-up delay-1">Sign in to <strong>Aerox</strong> inventory dashboard</p>
                </div>
                <div id="loginAlert" class="alert alert-error"></div>
                <form id="loginForm">
                    <div class="form-group anim-fade-in-up delay-2">
                        <label for="loginEmail">Email Address</label>
                        <input type="email" id="loginEmail" placeholder="you@example.com" required autocomplete="email">
                    </div>
                    <div class="form-group anim-fade-in-up delay-3">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" placeholder="Enter your password" required autocomplete="current-password">
                    </div>
                    <button type="submit" class="btn btn-primary anim-fade-in-up delay-4">Sign In</button>
                </form>
                <div class="auth-footer anim-fade-in-up delay-5">
                    Don't have an account? <a href="#" id="showRegister">Create one</a>
                </div>
            </div>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        showRegister();
    });

   
    const params = new URLSearchParams(window.location.hash.slice(1));
    if (params.get('registered') === 'true') {
        const alert = document.getElementById('loginAlert');
        alert.textContent = 'Account created successfully! Please sign in.';
        alert.className = 'alert alert-success visible';
    }
}

function showRegister() {
    document.getElementById('app').innerHTML = `
        <div class="auth-container">
            <div class="auth-box">
                <div class="auth-header">
                    <div class="logo" style="font-size:0;width:64px;height:64px;">${AEROX_LOGO}</div>
                    <h1>Create Account</h1>
                    <p>Get started with <strong>Aerox</strong> inventory dashboard</p>
                </div>
                <div id="registerAlert" class="alert alert-error"></div>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="regName">Full Name</label>
                        <input type="text" id="regName" placeholder="John Smith" required>
                    </div>
                    <div class="form-group">
                        <label for="regEmail">Email Address</label>
                        <input type="email" id="regEmail" placeholder="you@example.com" required autocomplete="email">
                    </div>
                    <div class="form-group">
                        <label for="regPassword">Password</label>
                        <input type="password" id="regPassword" placeholder="Create a password (min. 6 characters)" required minlength="6" autocomplete="new-password">
                    </div>
                    <div class="form-group">
                        <label for="regConfirm">Confirm Password</label>
                        <input type="password" id="regConfirm" placeholder="Confirm your password" required autocomplete="new-password">
                    </div>
                    <button type="submit" class="btn btn-primary">Create Account</button>
                </form>
                <div class="auth-footer">
                    Already have an account? <a href="#" id="showLogin">Sign in</a>
                </div>
            </div>
        </div>
    `;

    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const alert = document.getElementById('loginAlert');

    const users = Store.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert.textContent = 'Invalid email or password.';
        alert.className = 'alert alert-error visible';
        return;
    }

    Store.setCurrentUser(user);
    showDashboard();
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    const alert = document.getElementById('registerAlert');

    if (password !== confirm) {
        alert.textContent = 'Passwords do not match.';
        alert.className = 'alert alert-error visible';
        return;
    }

    if (password.length < 6) {
        alert.textContent = 'Password must be at least 6 characters.';
        alert.className = 'alert alert-error visible';
        return;
    }

    const users = Store.getUsers();
    if (users.find(u => u.email === email)) {
        alert.textContent = 'An account with this email already exists.';
        alert.className = 'alert alert-error visible';
        return;
    }

    const newUser = {
        id: 'USR-' + Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    Store.saveUsers(users);

    
    Store.setCurrentUser(newUser);
    showDashboard();
}

function handleLogout() {
    Store.clearCurrentUser();
    showLogin();
}


function showDashboard() {
    const user = Store.getCurrentUser();
    if (!user) {
        showLogin();
        return;
    }

    state.parts = Store.getParts();
    state.searchTerm = '';
    state.categoryFilter = '';
    state.sortField = null;
    state.sortDirection = 'asc';
    applyFilters();

    document.getElementById('app').innerHTML = `
        <div class="app-container">
            <!-- Sidebar -->
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <a href="#" class="logo" onclick="showDashboard()">
                        <div class="logo-icon" style="font-size:0;">${AEROX_LOGO}</div>
                        Aerox
                    </a>
                </div>
                <nav class="sidebar-nav">
                    <a class="nav-item active" data-view="dashboard" onclick="showDashboard()">
                        <span class="icon">📊</span> Dashboard
                    </a>
                    <a class="nav-item" data-view="inventory" onclick="switchView('inventory')">
                        <span class="icon">📦</span> Inventory
                    </a>
                    <a class="nav-item" data-view="settings" onclick="openSettings()">
                        <span class="icon">⚙️</span> Settings
                    </a>
                </nav>

                <!-- Team Members Section -->
                <div class="sidebar-team-section">
                    <div class="sidebar-team-header">👥 Team Members</div>
                    <div class="sidebar-team-list">
                        ${Store.getUsers().map(u => `
                            <div class="sidebar-team-item ${u.id === user.id ? 'active' : ''}" onclick="switchToAccount('${u.id}')">
                                <div class="sidebar-team-avatar">${u.name.charAt(0).toUpperCase()}</div>
                                <div class="sidebar-team-info">
                                    <div class="sidebar-team-name">${u.name}</div>
                                    <div class="sidebar-team-email">${u.email}</div>
                                </div>
                                ${u.id === user.id ? '<span class="sidebar-team-badge">Current</span>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="sidebar-footer">
                    <div class="user-info">
                        <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
                        <div class="user-details">
                            <div class="user-name">${user.name}</div>
                            <div class="user-email">${user.email}</div>
                        </div>
                    </div>
                    <button class="btn-add-user" onclick="openAddUserModal()">➕ Add User</button>
                    <button class="btn-logout" onclick="handleLogout()">🚪 Sign Out</button>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="main-content">
                <div class="top-bar">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <button class="btn-toggle-sidebar" onclick="toggleSidebar()">☰</button>
                        <h1 class="page-title">Dashboard <span>Overview</span></h1>
                    </div>
                    <button class="btn btn-primary" onclick="openAddModal()">➕ Add New Part</button>
                </div>
                <div id="dashboardContent">
                    ${renderDashboard()}
                </div>
            </main>
        </div>
    `;

    renderDashboardContent();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function switchView(view) {
    state.currentView = view;
    $$('.nav-item').forEach(el => el.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-view="${view}"]`);
    if (navItem) navItem.classList.add('active');

    if (view === 'inventory') {
        renderInventoryView();
    }
}


function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    const icons = { success: '✅', error: '❌', warning: '⚠️' };
    toast.innerHTML = `<span>${icons[type] || '✅'}</span> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


function renderDashboard() {
    const parts = state.parts;
    const totalParts = parts.length;
    const totalValue = parts.reduce((sum, p) => sum + (p.quantity * p.price), 0);
    const lowStock = parts.filter(p => p.status === 'low-stock' || (p.quantity > 0 && p.quantity <= 5)).length;
    const outOfStock = parts.filter(p => p.status === 'out-of-stock' || p.quantity === 0).length;
    const categories = [...new Set(parts.map(p => p.category))].length;

    
    const recentParts = [...parts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    return `
        <div class="stats-grid">
            <div class="stat-card anim-fade-in-up delay-1">
                <div class="stat-icon blue anim-float">📦</div>
                <div class="stat-info">
                    <div class="stat-label">Total Parts</div>
                    <div class="stat-value">${totalParts}</div>
                    <div class="stat-desc">${categories} categories</div>
                </div>
            </div>
            <div class="stat-card anim-fade-in-up delay-2">
                <div class="stat-icon green anim-float">💰</div>
                <div class="stat-info">
                    <div class="stat-label">Total Inventory Value</div>
                    <div class="stat-value">$${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    <div class="stat-desc">Based on cost × quantity</div>
                </div>
            </div>
            <div class="stat-card anim-fade-in-up delay-3">
                <div class="stat-icon yellow anim-float">⚠️</div>
                <div class="stat-info">
                    <div class="stat-label">Low Stock Items</div>
                    <div class="stat-value">${lowStock}</div>
                    <div class="stat-desc">Items with ≤ 5 units</div>
                </div>
            </div>
            <div class="stat-card anim-fade-in-up delay-4">
                <div class="stat-icon red anim-float">🚫</div>
                <div class="stat-info">
                    <div class="stat-label">Out of Stock</div>
                    <div class="stat-value">${outOfStock}</div>
                    <div class="stat-desc">Items with 0 units</div>
                </div>
            </div>
        </div>

        <div class="content-card anim-fade-in-up delay-5">
            <div class="card-header">
                <h2>Recent Items Added</h2>
                <button class="btn btn-secondary btn-sm" onclick="switchView('inventory')">View All →</button>
            </div>
            <div class="table-container">
                ${recentParts.length === 0 ? `
                    <div class="empty-state anim-fade-in-scale">
                        <div class="empty-icon anim-float">📦</div>
                        <h3>No parts yet</h3>
                        <p>Start by adding your first computer part to the inventory.</p>
                        <button class="btn btn-primary anim-pulse" onclick="openAddModal()">Add First Part</button>
                    </div>
                ` : `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${recentParts.map((p, i) => `
                            <tr class="anim-fade-in-up" style="animation-delay:${0.1 + i * 0.1}s">
                                <td style="font-weight:600;color:#ffffff;">${p.id}</td>
                                <td>${p.name}</td>
                                <td>${p.category}</td>
                                <td>${p.brand}</td>
                                <td>${p.quantity}</td>
                                <td>$${p.price.toFixed(2)}</td>
                                <td><span class="status-badge ${p.status}">${formatStatus(p.status)}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                `}
            </div>
        </div>
    `;
}

function renderDashboardContent() {
    const container = document.getElementById('dashboardContent');
    if (container) {
        container.innerHTML = renderDashboard();
    }
}


function renderInventoryView() {
    state.filteredParts = applyFilters();

    const container = document.getElementById('dashboardContent');
    container.innerHTML = `
        <div class="content-card">
            <div class="card-header">
                <h2>Inventory <span>(${state.filteredParts.length} items)</span></h2>
                <div class="card-toolbar">
                    <div class="search-box">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="searchInput" placeholder="Search parts..." value="${state.searchTerm}" oninput="handleSearch(this.value)">
                    </div>
                    <select class="filter-select" id="categoryFilter" onchange="handleCategoryFilter(this.value)">
                        <option value="">All Categories</option>
                        ${getCategories().map(cat => `
                            <option value="${cat}" ${state.categoryFilter === cat ? 'selected' : ''}>${cat}</option>
                        `).join('')}
                    </select>
                </div>
            </div>
            <div class="table-container" id="inventoryTable">
                ${renderTable()}
            </div>
        </div>
    `;


    $$('.nav-item').forEach(el => el.classList.remove('active'));
    const navItem = document.querySelector('.nav-item[data-view="inventory"]');
    if (navItem) navItem.classList.add('active');
}

function renderTable() {
    const parts = state.filteredParts;

    if (parts.length === 0) {
        return `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No parts found</h3>
                <p>${state.searchTerm || state.categoryFilter ? 'Try adjusting your search or filter.' : 'Your inventory is empty. Start by adding a new part.'}</p>
                <button class="btn btn-primary" onclick="openAddModal()">Add New Part</button>
            </div>
        `;
    }

    return `
        <table>
            <thead>
                <tr>
                    <th onclick="sortParts('id')" class="${state.sortField === 'id' ? 'active' : ''}">
                        ID <span class="sort-arrow">${getSortArrow('id')}</span>
                    </th>
                    <th onclick="sortParts('name')" class="${state.sortField === 'name' ? 'active' : ''}">
                        Name <span class="sort-arrow">${getSortArrow('name')}</span>
                    </th>
                    <th onclick="sortParts('category')" class="${state.sortField === 'category' ? 'active' : ''}">
                        Category <span class="sort-arrow">${getSortArrow('category')}</span>
                    </th>
                    <th onclick="sortParts('brand')" class="${state.sortField === 'brand' ? 'active' : ''}">
                        Brand <span class="sort-arrow">${getSortArrow('brand')}</span>
                    </th>
                    <th>Model</th>
                    <th onclick="sortParts('quantity')" class="${state.sortField === 'quantity' ? 'active' : ''}">
                        Qty <span class="sort-arrow">${getSortArrow('quantity')}</span>
                    </th>
                    <th onclick="sortParts('price')" class="${state.sortField === 'price' ? 'active' : ''}">
                        Price <span class="sort-arrow">${getSortArrow('price')}</span>
                    </th>
                    <th onclick="sortParts('status')" class="${state.sortField === 'status' ? 'active' : ''}">
                        Status <span class="sort-arrow">${getSortArrow('status')}</span>
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${parts.map(p => `
                    <tr>
                        <td style="font-weight:600;color:#ffffff;">${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.category}</td>
                        <td>${p.brand}</td>
                        <td>${p.model}</td>
                        <td>${p.quantity}</td>
                        <td>$${p.price.toFixed(2)}</td>
                        <td><span class="status-badge ${p.status}">${formatStatus(p.status)}</span></td>
                        <td>
                            <div class="actions-cell">
                                <button class="btn-edit" title="Edit" onclick="openEditModal('${p.id}')">✏️</button>
                                <button class="btn-delete" title="Delete" onclick="confirmDelete('${p.id}')">🗑️</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}


function getCategories() {
    return [...new Set(state.parts.map(p => p.category))].sort();
}

function applyFilters() {
    let filtered = [...state.parts];

    if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.model.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.id.toLowerCase().includes(term)
        );
    }

    if (state.categoryFilter) {
        filtered = filtered.filter(p => p.category === state.categoryFilter);
    }

    if (state.sortField) {
        filtered.sort((a, b) => {
            let valA = a[state.sortField];
            let valB = b[state.sortField];
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            if (valA < valB) return state.sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return state.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }

    state.filteredParts = filtered;
    return filtered;
}

function handleSearch(term) {
    state.searchTerm = term;
    applyFilters();
    const table = document.getElementById('inventoryTable');
    if (table) table.innerHTML = renderTable();
}

function handleCategoryFilter(category) {
    state.categoryFilter = category;
    applyFilters();
    const table = document.getElementById('inventoryTable');
    if (table) table.innerHTML = renderTable();
}

function sortParts(field) {
    if (state.sortField === field) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortField = field;
        state.sortDirection = 'asc';
    }
    applyFilters();
    const table = document.getElementById('inventoryTable');
    if (table) table.innerHTML = renderTable();
}

function getSortArrow(field) {
    if (state.sortField !== field) return '⇅';
    return state.sortDirection === 'asc' ? '↑' : '↓';
}

function formatStatus(status) {
    const map = {
        'in-stock': 'In Stock',
        'low-stock': 'Low Stock',
        'out-of-stock': 'Out of Stock',
    };
    return map[status] || status;
}


function closeModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
        overlay.classList.remove('visible');
        setTimeout(() => overlay.remove(), 300);
    }
}

function openAddModal() {
    state.editingPart = null;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay visible';
    overlay.id = 'partModal';
    overlay.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Add New Computer Part</h3>
                <button class="btn-close" onclick="closeModal('partModal')">✕</button>
            </div>
            <div class="modal-body">
                <form id="partForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="partName">Part Name *</label>
                            <input type="text" id="partName" placeholder="e.g. Intel Core i7-13700K" required>
                        </div>
                        <div class="form-group">
                            <label for="partCategory">Category *</label>
                            <select id="partCategory" required>
                                <option value="">Select category</option>
                                <option value="CPU">CPU</option>
                                <option value="GPU">GPU</option>
                                <option value="RAM">RAM</option>
                                <option value="Motherboard">Motherboard</option>
                                <option value="Storage">Storage</option>
                                <option value="PSU">PSU</option>
                                <option value="Case">Case</option>
                                <option value="Cooling">Cooling</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="partBrand">Brand *</label>
                            <input type="text" id="partBrand" placeholder="e.g. Intel, AMD, Corsair" required>
                        </div>
                        <div class="form-group">
                            <label for="partModel">Model *</label>
                            <input type="text" id="partModel" placeholder="e.g. i7-13700K" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="partQuantity">Quantity *</label>
                            <input type="number" id="partQuantity" placeholder="0" min="0" required>
                        </div>
                        <div class="form-group">
                            <label for="partPrice">Price ($) *</label>
                            <input type="number" id="partPrice" placeholder="0.00" min="0" step="0.01" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="partStatus">Status</label>
                        <select id="partStatus">
                            <option value="in-stock">In Stock</option>
                            <option value="low-stock">Low Stock</option>
                            <option value="out-of-stock">Out of Stock</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('partModal')">Cancel</button>
                <button class="btn btn-primary" onclick="savePart()">💾 Save Part</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    
    document.getElementById('partQuantity').addEventListener('input', function() {
        const qty = parseInt(this.value) || 0;
        const statusSelect = document.getElementById('partStatus');
        if (qty === 0) statusSelect.value = 'out-of-stock';
        else if (qty <= 5) statusSelect.value = 'low-stock';
        else statusSelect.value = 'in-stock';
    });
}

function openEditModal(partId) {
    const part = state.parts.find(p => p.id === partId);
    if (!part) return;

    state.editingPart = part;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay visible';
    overlay.id = 'partModal';
    overlay.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Edit Computer Part</h3>
                <button class="btn-close" onclick="closeModal('partModal')">✕</button>
            </div>
            <div class="modal-body">
                <form id="partForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="partName">Part Name *</label>
                            <input type="text" id="partName" placeholder="e.g. Intel Core i7-13700K" value="${part.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="partCategory">Category *</label>
                            <select id="partCategory" required>
                                <option value="">Select category</option>
                                <option value="CPU" ${part.category === 'CPU' ? 'selected' : ''}>CPU</option>
                                <option value="GPU" ${part.category === 'GPU' ? 'selected' : ''}>GPU</option>
                                <option value="RAM" ${part.category === 'RAM' ? 'selected' : ''}>RAM</option>
                                <option value="Motherboard" ${part.category === 'Motherboard' ? 'selected' : ''}>Motherboard</option>
                                <option value="Storage" ${part.category === 'Storage' ? 'selected' : ''}>Storage</option>
                                <option value="PSU" ${part.category === 'PSU' ? 'selected' : ''}>PSU</option>
                                <option value="Case" ${part.category === 'Case' ? 'selected' : ''}>Case</option>
                                <option value="Cooling" ${part.category === 'Cooling' ? 'selected' : ''}>Cooling</option>
                                <option value="Other" ${part.category === 'Other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="partBrand">Brand *</label>
                            <input type="text" id="partBrand" placeholder="e.g. Intel, AMD, Corsair" value="${part.brand}" required>
                        </div>
                        <div class="form-group">
                            <label for="partModel">Model *</label>
                            <input type="text" id="partModel" placeholder="e.g. i7-13700K" value="${part.model}" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="partQuantity">Quantity *</label>
                            <input type="number" id="partQuantity" placeholder="0" min="0" value="${part.quantity}" required>
                        </div>
                        <div class="form-group">
                            <label for="partPrice">Price ($) *</label>
                            <input type="number" id="partPrice" placeholder="0.00" min="0" step="0.01" value="${part.price}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="partStatus">Status</label>
                        <select id="partStatus">
                            <option value="in-stock" ${part.status === 'in-stock' ? 'selected' : ''}>In Stock</option>
                            <option value="low-stock" ${part.status === 'low-stock' ? 'selected' : ''}>Low Stock</option>
                            <option value="out-of-stock" ${part.status === 'out-of-stock' ? 'selected' : ''}>Out of Stock</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('partModal')">Cancel</button>
                <button class="btn btn-primary" onclick="savePart()">💾 Update Part</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    
    document.getElementById('partQuantity').addEventListener('input', function() {
        const qty = parseInt(this.value) || 0;
        const statusSelect = document.getElementById('partStatus');
        if (qty === 0) statusSelect.value = 'out-of-stock';
        else if (qty <= 5) statusSelect.value = 'low-stock';
        else statusSelect.value = 'in-stock';
    });
}

function savePart() {
    const name = document.getElementById('partName').value.trim();
    const category = document.getElementById('partCategory').value;
    const brand = document.getElementById('partBrand').value.trim();
    const model = document.getElementById('partModel').value.trim();
    const quantity = parseInt(document.getElementById('partQuantity').value) || 0;
    const price = parseFloat(document.getElementById('partPrice').value) || 0;
    const status = document.getElementById('partStatus').value;

    if (!name || !category || !brand || !model) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    const parts = Store.getParts();

    if (state.editingPart) {
        
        const index = parts.findIndex(p => p.id === state.editingPart.id);
        if (index !== -1) {
            parts[index] = {
                ...parts[index],
                name,
                category,
                brand,
                model,
                quantity,
                price,
                status,
            };
            Store.saveParts(parts);
            state.parts = parts;
            applyFilters();
            showToast('Part updated successfully!', 'success');
        }
    } else {
        
        const newPart = {
            id: 'PRT-' + String(parts.length + 1).padStart(3, '0'),
            name,
            category,
            brand,
            model,
            quantity,
            price,
            status,
            createdAt: new Date().toISOString(),
        };
        parts.push(newPart);
        Store.saveParts(parts);
        state.parts = parts;
        applyFilters();
        showToast('Part added successfully!', 'success');
    }

    closeModal('partModal');
    renderDashboardContent();

    
    if (state.currentView === 'inventory') {
        renderInventoryView();
    }
}

function confirmDelete(partId) {
    const part = state.parts.find(p => p.id === partId);
    if (!part) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay visible';
    overlay.id = 'confirmModal';
    overlay.innerHTML = `
        <div class="modal" style="max-width:400px;">
            <div class="confirm-dialog">
                <div class="confirm-icon">🗑️</div>
                <h3>Delete Part</h3>
                <p>Are you sure you want to delete <strong>${part.name}</strong>? This action cannot be undone.</p>
                <div class="confirm-actions">
                    <button class="btn btn-secondary" onclick="closeModal('confirmModal')">Cancel</button>
                    <button class="btn btn-danger" onclick="deletePart('${partId}')">Delete</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function deletePart(partId) {
    let parts = Store.getParts();
    parts = parts.filter(p => p.id !== partId);
    Store.saveParts(parts);
    state.parts = parts;
    applyFilters();

    closeModal('confirmModal');
    showToast('Part deleted successfully!', 'success');

    renderDashboardContent();

    
    if (state.currentView === 'inventory') {
        renderInventoryView();
    }
}


function openSettings() {
    const user = Store.getCurrentUser();
    if (!user) return;

    const users = Store.getUsers();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay visible';
    overlay.id = 'settingsModal';
    overlay.innerHTML = `
        <div class="modal" style="max-width:500px;">
            <div class="modal-header">
                <h3>⚙️ Settings</h3>
                <button class="btn-close" onclick="closeModal('settingsModal')">✕</button>
            </div>
            <div class="modal-body">
                <!-- Profile Section -->
                <div class="settings-section">
                    <h4 class="settings-section-title">👤 Profile</h4>
                    <div class="settings-profile">
                        <div class="settings-avatar">${user.name.charAt(0).toUpperCase()}</div>
                        <div class="settings-profile-info">
                            <div class="settings-profile-name">${user.name}</div>
                            <div class="settings-profile-email">${user.email}</div>
                            <div class="settings-profile-id">ID: ${user.id}</div>
                        </div>
                    </div>
                </div>

                <!-- Change Password -->
                <div class="settings-section">
                    <h4 class="settings-section-title">🔑 Change Password</h4>
                    <form id="changePasswordForm">
                        <div id="pwAlert" class="alert alert-error"></div>
                        <div class="form-group">
                            <label for="currentPassword">Current Password</label>
                            <input type="password" id="currentPassword" placeholder="Enter current password" required>
                        </div>
                        <div class="form-group">
                            <label for="newPassword">New Password</label>
                            <input type="password" id="newPassword" placeholder="Enter new password (min. 6 characters)" required minlength="6">
                        </div>
                        <div class="form-group">
                            <label for="confirmNewPassword">Confirm New Password</label>
                            <input type="password" id="confirmNewPassword" placeholder="Confirm new password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width:100%;">Update Password</button>
                    </form>
                </div>

                <!-- App Info -->
                <div class="settings-section" style="border-bottom:none;padding-bottom:0;">
                    <h4 class="settings-section-title">ℹ️ About</h4>
                    <div style="display:flex;flex-direction:column;gap:4px;font-size:13px;color:var(--gray-500);">
                        <span><strong>Aerox</strong> v1.0.0</span>
                        <span>PC Parts Inventory Management System</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('settingsModal')">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    
    document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPw = document.getElementById('currentPassword').value;
        const newPw = document.getElementById('newPassword').value;
        const confirmPw = document.getElementById('confirmNewPassword').value;
        const pwAlert = document.getElementById('pwAlert');

        if (currentPw !== user.password) {
            pwAlert.textContent = 'Current password is incorrect.';
            pwAlert.className = 'alert alert-error visible';
            return;
        }

        if (newPw !== confirmPw) {
            pwAlert.textContent = 'New passwords do not match.';
            pwAlert.className = 'alert alert-error visible';
            return;
        }

        if (newPw.length < 6) {
            pwAlert.textContent = 'New password must be at least 6 characters.';
            pwAlert.className = 'alert alert-error visible';
            return;
        }

        
        const allUsers = Store.getUsers();
        const idx = allUsers.findIndex(u => u.id === user.id);
        if (idx !== -1) {
            allUsers[idx].password = newPw;
            Store.saveUsers(allUsers);
            
            Store.setCurrentUser(allUsers[idx]);
            pwAlert.textContent = 'Password updated successfully!';
            pwAlert.className = 'alert alert-success visible';
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmNewPassword').value = '';
            setTimeout(() => {
                closeModal('settingsModal');
                showToast('Password changed successfully!', 'success');
            }, 1500);
        }
    });
}

function switchToAccount(userId) {
    const users = Store.getUsers();
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    Store.setCurrentUser(targetUser);
    closeModal('settingsModal');
    showToast(`Switched to ${targetUser.name}`, 'success');
    setTimeout(() => showDashboard(), 300);
}


function openAddUserModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay visible';
    overlay.id = 'addUserModal';
    overlay.innerHTML = `
        <div class="modal" style="max-width:450px;">
            <div class="modal-header">
                <h3>➕ Add New User</h3>
                <button class="btn-close" onclick="closeModal('addUserModal')">✕</button>
            </div>
            <div class="modal-body">
                <div id="addUserAlert" class="alert alert-error"></div>
                <form id="addUserForm">
                    <div class="form-group">
                        <label for="addUserName">Full Name</label>
                        <input type="text" id="addUserName" placeholder="John Smith" required>
                    </div>
                    <div class="form-group">
                        <label for="addUserEmail">Email Address</label>
                        <input type="email" id="addUserEmail" placeholder="you@example.com" required autocomplete="email">
                    </div>
                    <div class="form-group">
                        <label for="addUserPassword">Password</label>
                        <input type="password" id="addUserPassword" placeholder="Create a password (min. 6 characters)" required minlength="6" autocomplete="new-password">
                    </div>
                    <div class="form-group">
                        <label for="addUserConfirm">Confirm Password</label>
                        <input type="password" id="addUserConfirm" placeholder="Confirm your password" required autocomplete="new-password">
                    </div>
                    <button type="submit" class="btn btn-primary">👤 Create User</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('addUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('addUserName').value.trim();
        const email = document.getElementById('addUserEmail').value.trim();
        const password = document.getElementById('addUserPassword').value;
        const confirm = document.getElementById('addUserConfirm').value;
        const alert = document.getElementById('addUserAlert');

        if (password !== confirm) {
            alert.textContent = 'Passwords do not match.';
            alert.className = 'alert alert-error visible';
            return;
        }

        if (password.length < 6) {
            alert.textContent = 'Password must be at least 6 characters.';
            alert.className = 'alert alert-error visible';
            return;
        }

        const users = Store.getUsers();
        if (users.find(u => u.email === email)) {
            alert.textContent = 'An account with this email already exists.';
            alert.className = 'alert alert-error visible';
            return;
        }

        const newUser = {
            id: 'USR-' + Date.now(),
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        Store.saveUsers(users);

        closeModal('addUserModal');
        showToast(`User "${name}" created successfully!`, 'success');
    });
}

document.addEventListener('DOMContentLoaded', init);

