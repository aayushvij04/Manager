// Content Creator dashboard functionality
function loadCreatorDashboard() {
    // Update dashboard title
    document.getElementById('dashboard-title').textContent = 'Content Creator Dashboard';
    
    // Build sidebar menu for Content Creator
    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.innerHTML = `
        <li class="nav-item">
            <a class="nav-link active" href="#" id="creator-overview">
                <i class="bi bi-house"></i> Overview
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="creator-posts">
                <i class="bi bi-file-text"></i> Posts
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="creator-brands">
                <i class="bi bi-briefcase"></i> Brand Affiliations
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="creator-products">
                <i class="bi bi-box"></i> Sponsored Products
            </a>
        </li>
    `;
    
    // Add event listeners for sidebar menu items
    document.getElementById('creator-overview').addEventListener('click', function(e) {
        e.preventDefault();
        loadCreatorOverview();
        updateActiveMenu(this);
    });
    
    document.getElementById('creator-posts').addEventListener('click', function(e) {
        e.preventDefault();
        loadCreatorPosts();
        updateActiveMenu(this);
    });
    
    document.getElementById('creator-brands').addEventListener('click', function(e) {
        e.preventDefault();
        loadCreatorBrands();
        updateActiveMenu(this);
    });
    
    document.getElementById('creator-products').addEventListener('click', function(e) {
        e.preventDefault();
        loadCreatorProducts();
        updateActiveMenu(this);
    });
    
    // Load overview by default
    loadCreatorOverview();
}

// Load Content Creator Overview page
function loadCreatorOverview() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    
    // Get stats from user data
    const instagramStats = userData.profiles.instagram;
    const xStats = userData.profiles.x;
    const brandAffiliations = userData.brandAffiliations || [];
    const sponsoredProducts = userData.productSponsored || [];
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h3>Welcome, ${currentUser}</h3>
                <p class="text-muted">Here's an overview of your content creator accounts.</p>
            </div>
            <div class="col-md-6 text-md-end">
                <button class="btn btn-primary" onclick="showPostModal()">
                    <i class="bi bi-plus-circle"></i> New Post
                </button>
            </div>
        </div>
        
        <div class="row">
            <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div class="card dashboard-card bg-white border-0">
                    <div class="card-body stats-card text-primary">
                        <i class="bi bi-instagram stats-icon"></i>
                        <div class="stats-value">${instagramStats.followers}</div>
                        <div class="stats-label">Instagram Followers</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div class="card dashboard-card bg-white border-0">
                    <div class="card-body stats-card text-primary">
                        <i class="bi bi-instagram stats-icon"></i>
                        <div class="stats-value">${instagramStats.following}</div>
                        <div class="stats-label">Instagram Following</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div class="card dashboard-card bg-white border-0">
                    <div class="card-body stats-card text-info">
                        <i class="bi bi-twitter stats-icon"></i>
                        <div class="stats-value">${xStats.followers}</div>
                        <div class="stats-label">X Followers</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div class="card dashboard-card bg-white border-0">
                    <div class="card-body stats-card text-info">
                        <i class="bi bi-twitter stats-icon"></i>
                        <div class="stats-value">${xStats.following}</div>
                        <div class="stats-label">X Following</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-primary text-white">Recent Instagram Posts</div>
                    <div class="card-body">
                        ${renderPosts(instagramStats.posts, 'Instagram')}
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-info text-white">Recent X Posts</div>
                    <div class="card-body">
                        ${renderPosts(xStats.posts, 'X')}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-success text-white">Brand Affiliations</div>
                    <div class="card-body">
                        <p class="mb-2">You are affiliated with ${brandAffiliations.length} brand(s).</p>
                        <ul class="list-group">
                            ${renderBrandList(brandAffiliations)}
                        </ul>
                        <button class="btn btn-outline-success mt-3" onclick="showBrandModal()">
                            <i class="bi bi-plus-circle"></i> Update Brands
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-warning text-dark">Sponsored Products</div>
                    <div class="card-body">
                        <p class="mb-2">You are sponsoring ${sponsoredProducts.length} product(s).</p>
                        <ul class="list-group">
                            ${renderProductList(sponsoredProducts)}
                        </ul>
                        <button class="btn btn-outline-warning mt-3" onclick="showProductModal()">
                            <i class="bi bi-plus-circle"></i> Update Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load Content Creator Posts page
function loadCreatorPosts() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    
    // Get posts from user data
    const instagramPosts = userData.profiles.instagram.posts;
    const xPosts = userData.profiles.x.posts;
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h3>Manage Posts</h3>
                <p class="text-muted">View or create social media posts.</p>
            </div>
            <div class="col-md-6 text-md-end">
                <button class="btn btn-primary" onclick="showPostModal()">
                    <i class="bi bi-plus-circle"></i> New Post
                </button>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-primary text-white">Instagram Posts</div>
                    <div class="card-body">
                        ${renderPosts(instagramPosts, 'Instagram')}
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-info text-white">X Posts</div>
                    <div class="card-body">
                        ${renderPosts(xPosts, 'X')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load Content Creator Brand Affiliations page
function loadCreatorBrands() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    const brandAffiliations = userData.brandAffiliations || [];
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h3>Brand Affiliations</h3>
                <p class="text-muted">Manage your brand affiliations.</p>
            </div>
            <div class="col-md-6 text-md-end">
                <button class="btn btn-success" onclick="showBrandModal()">
                    <i class="bi bi-plus-circle"></i> Update Brands
                </button>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-12">
                <div class="card dashboard-card">
                    <div class="card-header bg-success text-white">Your Brand Affiliations</div>
                    <div class="card-body">
                        <p class="mb-3">You are currently affiliated with ${brandAffiliations.length} brand(s).</p>
                        <ul class="list-group mb-3">
                            ${renderBrandList(brandAffiliations)}
                        </ul>
                        <p class="text-muted">These are the brands you collaborate with for content creation.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load Content Creator Sponsored Products page
function loadCreatorProducts() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    const sponsoredProducts = userData.productSponsored || [];
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h3>Sponsored Products</h3>
                <p class="text-muted">Manage your sponsored products.</p>
            </div>
            <div class="col-md-6 text-md-end">
                <button class="btn btn-warning" onclick="showProductModal()">
                    <i class="bi bi-plus-circle"></i> Update Products
                </button>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-12">
                <div class="card dashboard-card">
                    <div class="card-header bg-warning text-dark">Your Sponsored Products</div>
                    <div class="card-body">
                        <p class="mb-3">You are currently sponsoring ${sponsoredProducts.length} product(s).</p>
                        <ul class="list-group mb-3">
                            ${renderProductList(sponsoredProducts)}
                        </ul>
                        <p class="text-muted">These are the products you promote through your content.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render brand list
function renderBrandList(brands) {
    if (!brands || brands.length === 0) {
        return `<li class="list-group-item text-muted">No brand affiliations yet.</li>`;
    }
    
    let html = '';
    brands.forEach(brand => {
        html += `<li class="list-group-item">${brand}</li>`;
    });
    return html;
}

// Render product list
function renderProductList(products) {
    if (!products || products.length === 0) {
        return `<li class="list-group-item text-muted">No sponsored products yet.</li>`;
    }
    
    let html = '';
    products.forEach(product => {
        html += `<li class="list-group-item">${product}</li>`;
    });
    return html;
}

// Show modal for updating brand affiliations
function showBrandModal() {
    const userData = getUserData();
    const currentBrands = userData.brandAffiliations || [];
    
    const modalContent = `
        <form id="brands-form">
            <div class="mb-3">
                <label for="brands-list" class="form-label">Brand Affiliations (comma separated)</label>
                <textarea class="form-control" id="brands-list" rows="3">${currentBrands.join(', ')}</textarea>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-success">Update Brands</button>
            </div>
        </form>
    `;
    
    showModal('Update Brand Affiliations', modalContent);
    
    // Add event listener for form submission
    document.getElementById('brands-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateBrands();
    });
}

// Update brand affiliations
function updateBrands() {
    const brandsText = document.getElementById('brands-list').value;
    let newBrands = [];
    
    if (brandsText.trim() !== '') {
        newBrands = brandsText.split(',').map(brand => brand.trim()).filter(brand => brand !== '');
    }
    
    // Get user data
    const userData = getUserData();
    userData.brandAffiliations = newBrands;
    
    // Save updated user data
    saveUserData(userData);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('actionModal'));
    modal.hide();
    
    showAlert('Brand affiliations updated successfully', 'success');
    
    // Refresh dashboard
    if (document.querySelector('#sidebar-menu .active').id === 'creator-brands') {
        loadCreatorBrands();
    } else {
        loadCreatorOverview();
    }
}

// Show modal for updating sponsored products
function showProductModal() {
    const userData = getUserData();
    const currentProducts = userData.productSponsored || [];
    
    const modalContent = `
        <form id="products-form">
            <div class="mb-3">
                <label for="products-list" class="form-label">Sponsored Products (comma separated)</label>
                <textarea class="form-control" id="products-list" rows="3">${currentProducts.join(', ')}</textarea>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-warning">Update Products</button>
            </div>
        </form>
    `;
    
    showModal('Update Sponsored Products', modalContent);
    
    // Add event listener for form submission
    document.getElementById('products-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateProducts();
    });
}

// Update sponsored products
function updateProducts() {
    const productsText = document.getElementById('products-list').value;
    let newProducts = [];
    
    if (productsText.trim() !== '') {
        newProducts = productsText.split(',').map(product => product.trim()).filter(product => product !== '');
    }
    
    // Get user data
    const userData = getUserData();
    userData.productSponsored = newProducts;
    
    // Save updated user data
    saveUserData(userData);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('actionModal'));
    modal.hide();
    
    showAlert('Sponsored products updated successfully', 'success');
    
    // Refresh dashboard
    if (document.querySelector('#sidebar-menu .active').id === 'creator-products') {
        loadCreatorProducts();
    } else {
        loadCreatorOverview();
    }
}
