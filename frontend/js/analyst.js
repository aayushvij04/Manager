// Market Analyst dashboard functionality
function loadAnalystDashboard() {
    // Update dashboard title
    document.getElementById('dashboard-title').textContent = 'Market Analyst Dashboard';
    
    // Build sidebar menu for Market Analyst
    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.innerHTML = `
        <li class="nav-item">
            <a class="nav-link active" href="#" id="analyst-overview">
                <i class="bi bi-house"></i> Overview
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="analyst-instagram">
                <i class="bi bi-instagram"></i> Instagram Analytics
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="analyst-x">
                <i class="bi bi-twitter"></i> X Analytics
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="analyst-trends">
                <i class="bi bi-graph-up"></i> Follower Trends
            </a>
        </li>
    `;
    
    // Add event listeners for sidebar menu items
    document.getElementById('analyst-overview').addEventListener('click', function(e) {
        e.preventDefault();
        loadAnalystOverview();
        updateActiveMenu(this);
    });
    
    document.getElementById('analyst-instagram').addEventListener('click', function(e) {
        e.preventDefault();
        loadInstagramAnalytics();
        updateActiveMenu(this);
    });
    
    document.getElementById('analyst-x').addEventListener('click', function(e) {
        e.preventDefault();
        loadXAnalytics();
        updateActiveMenu(this);
    });
    
    document.getElementById('analyst-trends').addEventListener('click', function(e) {
        e.preventDefault();
        loadFollowerTrends();
        updateActiveMenu(this);
    });
    
    // Load overview by default
    loadAnalystOverview();
}

// Load Market Analyst Overview page
function loadAnalystOverview() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    
    // Get stats from user data
    const instagramStats = userData.profiles.instagram;
    const xStats = userData.profiles.x;
    
    // Simulate analytics data
    const instagramGrowth = simulateGrowth(instagramStats.followers);
    const instagramEngagement = simulateEngagement(instagramStats.posts);
    const instagramHashtags = simulateHashtagTrends(instagramStats.posts);
    
    const xGrowth = simulateGrowth(xStats.followers);
    const xEngagement = simulateEngagement(xStats.posts);
    const xHashtags = simulateHashtagTrends(xStats.posts);
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-12">
                <h3>Welcome, ${currentUser}</h3>
                <p class="text-muted">Here's an overview of social media analytics.</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-primary text-white">Instagram Overview</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-primary">
                                        <i class="bi bi-people stats-icon"></i>
                                        <div class="stats-value">${instagramStats.followers}</div>
                                        <div class="stats-label">Followers</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-primary">
                                        <i class="bi bi-person-plus stats-icon"></i>
                                        <div class="stats-value">${instagramStats.following}</div>
                                        <div class="stats-label">Following</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-primary">
                                        <i class="bi bi-file-text stats-icon"></i>
                                        <div class="stats-value">${instagramStats.posts.length}</div>
                                        <div class="stats-label">Posts</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-success">
                                        <i class="bi bi-arrow-up-right stats-icon"></i>
                                        <div class="stats-value">${instagramGrowth}</div>
                                        <div class="stats-label">Follower Growth</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-info">
                                        <i class="bi bi-heart stats-icon"></i>
                                        <div class="stats-value">${instagramEngagement}</div>
                                        <div class="stats-label">Engagement</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-warning">
                                        <i class="bi bi-hash stats-icon"></i>
                                        <div class="stats-value">${instagramHashtags}</div>
                                        <div class="stats-label">Hashtag Usage</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary" onclick="loadInstagramAnalytics()">
                                <i class="bi bi-bar-chart"></i> Detailed Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-info text-white">X Overview</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-info">
                                        <i class="bi bi-people stats-icon"></i>
                                        <div class="stats-value">${xStats.followers}</div>
                                        <div class="stats-label">Followers</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-info">
                                        <i class="bi bi-person-plus stats-icon"></i>
                                        <div class="stats-value">${xStats.following}</div>
                                        <div class="stats-label">Following</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-info">
                                        <i class="bi bi-file-text stats-icon"></i>
                                        <div class="stats-value">${xStats.posts.length}</div>
                                        <div class="stats-label">Posts</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-success">
                                        <i class="bi bi-arrow-up-right stats-icon"></i>
                                        <div class="stats-value">${xGrowth}</div>
                                        <div class="stats-label">Follower Growth</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-primary">
                                        <i class="bi bi-heart stats-icon"></i>
                                        <div class="stats-value">${xEngagement}</div>
                                        <div class="stats-label">Engagement</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                                <div class="card analytics-card bg-white border-0">
                                    <div class="card-body stats-card text-warning">
                                        <i class="bi bi-hash stats-icon"></i>
                                        <div class="stats-value">${xHashtags}</div>
                                        <div class="stats-label">Hashtag Usage</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-info" onclick="loadXAnalytics()">
                                <i class="bi bi-bar-chart"></i> Detailed Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card dashboard-card">
                    <div class="card-header bg-dark text-white">Follower Trends</div>
                    <div class="card-body text-center">
                        <div class="chart-container">
                            <canvas id="combined-trends-chart"></canvas>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-dark" onclick="loadFollowerTrends()">
                                <i class="bi bi-graph-up"></i> Detailed Trends Analysis
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Draw combined trends chart
    setTimeout(() => drawCombinedTrendsChart(instagramStats.followers, xStats.followers), 100);
}

// Load Instagram Analytics page
function loadInstagramAnalytics() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    
    // Get stats from user data
    const instagramStats = userData.profiles.instagram;
    
    // Simulate analytics data
    const growth = simulateGrowth(instagramStats.followers);
    const engagement = simulateEngagement(instagramStats.posts);
    const hashtags = simulateHashtagTrends(instagramStats.posts);
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-12">
                <h3>Instagram Analytics</h3>
                <p class="text-muted">Detailed analysis of your Instagram account performance.</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-primary">
                        <i class="bi bi-people stats-icon"></i>
                        <div class="stats-value">${instagramStats.followers}</div>
                        <div class="stats-label">Followers</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-primary">
                        <i class="bi bi-person-plus stats-icon"></i>
                        <div class="stats-value">${instagramStats.following}</div>
                        <div class="stats-label">Following</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-primary">
                        <i class="bi bi-file-text stats-icon"></i>
                        <div class="stats-value">${instagramStats.posts.length}</div>
                        <div class="stats-label">Posts</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-success">
                        <i class="bi bi-arrow-up-right stats-icon"></i>
                        <div class="stats-value">${growth}</div>
                        <div class="stats-label">Follower Growth</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-info">
                        <i class="bi bi-heart stats-icon"></i>
                        <div class="stats-value">${engagement}</div>
                        <div class="stats-label">Engagement</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-warning">
                        <i class="bi bi-hash stats-icon"></i>
                        <div class="stats-value">${hashtags}</div>
                        <div class="stats-label">Hashtag Usage</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-primary text-white">Follower Growth Trend</div>
                    <div class="card-body text-center">
                        <div class="chart-container">
                            <canvas id="instagram-growth-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-primary text-white">Engagement Analysis</div>
                    <div class="card-body text-center">
                        <div class="chart-container">
                            <canvas id="instagram-engagement-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card dashboard-card">
                    <div class="card-header bg-primary text-white">Recent Posts</div>
                    <div class="card-body">
                        ${renderPosts(instagramStats.posts, 'Instagram')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Draw charts
    setTimeout(() => {
        drawGrowthChart('instagram-growth-chart', instagramStats.followers, 'Instagram');
        drawEngagementChart('instagram-engagement-chart', instagramStats.posts, 'Instagram');
    }, 100);
}

// Load X Analytics page
function loadXAnalytics() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    
    // Get stats from user data
    const xStats = userData.profiles.x;
    
    // Simulate analytics data
    const growth = simulateGrowth(xStats.followers);
    const engagement = simulateEngagement(xStats.posts);
    const hashtags = simulateHashtagTrends(xStats.posts);
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-12">
                <h3>X Analytics</h3>
                <p class="text-muted">Detailed analysis of your X account performance.</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-info">
                        <i class="bi bi-people stats-icon"></i>
                        <div class="stats-value">${xStats.followers}</div>
                        <div class="stats-label">Followers</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-info">
                        <i class="bi bi-person-plus stats-icon"></i>
                        <div class="stats-value">${xStats.following}</div>
                        <div class="stats-label">Following</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-info">
                        <i class="bi bi-file-text stats-icon"></i>
                        <div class="stats-value">${xStats.posts.length}</div>
                        <div class="stats-label">Posts</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-success">
                        <i class="bi bi-arrow-up-right stats-icon"></i>
                        <div class="stats-value">${growth}</div>
                        <div class="stats-label">Follower Growth</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-primary">
                        <i class="bi bi-heart stats-icon"></i>
                        <div class="stats-value">${engagement}</div>
                        <div class="stats-label">Engagement</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 mb-4">
                <div class="card analytics-card bg-white border-0">
                    <div class="card-body stats-card text-warning">
                        <i class="bi bi-hash stats-icon"></i>
                        <div class="stats-value">${hashtags}</div>
                        <div class="stats-label">Hashtag Usage</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-info text-white">Follower Growth Trend</div>
                    <div class="card-body text-center">
                        <div class="chart-container">
                            <canvas id="x-growth-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-info text-white">Engagement Analysis</div>
                    <div class="card-body text-center">
                        <div class="chart-container">
                            <canvas id="x-engagement-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card dashboard-card">
                    <div class="card-header bg-info text-white">Recent Posts</div>
                    <div class="card-body">
                        ${renderPosts(xStats.posts, 'X')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Draw charts
    setTimeout(() => {
        drawGrowthChart('x-growth-chart', xStats.followers, 'X');
        drawEngagementChart('x-engagement-chart', xStats.posts, 'X');
    }, 100);
}

// Load Follower Trends page
function loadFollowerTrends() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    
    // Get stats from user data
    const instagramStats = userData.profiles.instagram;
    const xStats = userData.profiles.x;
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-12">
                <h3>Follower Trends Analysis</h3>
                <p class="text-muted">Track follower growth trends across platforms.</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-primary text-white">Instagram Follower Trend</div>
                    <div class="card-body text-center">
                        <div class="chart-container">
                            <canvas id="instagram-trend-chart"></canvas>
                        </div>
                        <div class="mt-3">
                            <p>Current Followers: <strong>${instagramStats.followers}</strong></p>
                            <p>Projected Growth: <strong>${simulateGrowth(instagramStats.followers)}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-info text-white">X Follower Trend</div>
                    <div class="card-body text-center">
                        <div class="chart-container">
                            <canvas id="x-trend-chart"></canvas>
                        </div>
                        <div class="mt-3">
                            <p>Current Followers: <strong>${xStats.followers}</strong></p>
                            <p>Projected Growth: <strong>${simulateGrowth(xStats.followers)}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card dashboard-card">
                    <div class="card-header bg-dark text-white">Combined Follower Trends</div>
                    <div class="card-body text-center">
                        <div class="chart-container">
                            <canvas id="combined-trends-chart-full"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Draw charts
    setTimeout(() => {
        drawGrowthChart('instagram-trend-chart', instagramStats.followers, 'Instagram', 10);
        drawGrowthChart('x-trend-chart', xStats.followers, 'X', 10);
        drawCombinedTrendsChartFull(instagramStats.followers, xStats.followers);
    }, 100);
}

// Simulate growth for analytics
function simulateGrowth(base) {
    return base + Math.floor(Math.random() * 21) - 10; // Random between -10 and +10
}

// Simulate engagement for analytics
function simulateEngagement(posts) {
    if (!posts || posts.length === 0) return 0;
    return posts.reduce((sum, post) => sum + post.likes + post.comments.length, 0);
}

// Simulate hashtag trends for analytics
function simulateHashtagTrends(posts) {
    if (!posts || posts.length === 0) return 0;
    return posts.reduce((count, post) => count + (post.hashtags ? post.hashtags.length : 0), 0);
}

// Draw growth chart
function drawGrowthChart(chartId, initialFollowers, platform, weeks = 5) {
    const ctx = document.getElementById(chartId).getContext('2d');
    let currentFollowers = initialFollowers;
    const labels = Array.from({ length: weeks + 1 }, (_, i) => `Week ${i}`);
    const data = [];
    
    for (let week = 0; week <= weeks; week++) {
        data.push(currentFollowers);
        if (week < weeks) {
            const change = currentFollowers <= 250 ? 
                Math.floor(Math.random() * 251) : 
                Math.floor(Math.random() * 501) - 250;
            currentFollowers += change;
            if (currentFollowers < 1) currentFollowers = 1;
        }
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${platform} Followers`,
                data: data,
                borderColor: platform === 'Instagram' ? '#007bff' : '#17a2b8',
                backgroundColor: platform === 'Instagram' ? 'rgba(0, 123, 255, 0.1)' : 'rgba(23, 162, 184, 0.1)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Draw engagement chart
function drawEngagementChart(chartId, posts, platform) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const labels = posts.length > 0 ? 
        posts.map((_, i) => `Post ${i + 1}`) : 
        ['No Data'];
    const likesData = posts.map(post => post.likes);
    const commentsData = posts.map(post => post.comments.length);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Likes',
                data: likesData.length > 0 ? likesData : [0],
                backgroundColor: platform === 'Instagram' ? 'rgba(0, 123, 255, 0.6)' : 'rgba(23, 162, 184, 0.6)',
            }, {
                label: 'Comments',
                data: commentsData.length > 0 ? commentsData : [0],
                backgroundColor: platform === 'Instagram' ? 'rgba(0, 123, 255, 0.3)' : 'rgba(23, 162, 184, 0.3)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${platform} Engagement per Post`
                }
            }
        }
    });
}

// Draw combined trends chart
function drawCombinedTrendsChart(instagramFollowers, xFollowers) {
    const ctx = document.getElementById('combined-trends-chart').getContext('2d');
    const weeks = 5;
    const labels = Array.from({ length: weeks + 1 }, (_, i) => `Week ${i}`);
    
    // Simulate Instagram data
    let currentInstagram = instagramFollowers;
    const instagramData = [];
    for (let week = 0; week <= weeks; week++) {
        instagramData.push(currentInstagram);
        if (week < weeks) {
            const change = currentInstagram <= 250 ? 
                Math.floor(Math.random() * 251) : 
                Math.floor(Math.random() * 501) - 250;
            currentInstagram += change;
            if (currentInstagram < 1) currentInstagram = 1;
        }
    }
    
    // Simulate X data
    let currentX = xFollowers;
    const xData = [];
    for (let week = 0; week <= weeks; week++) {
        xData.push(currentX);
        if (week < weeks) {
            const change = currentX <= 250 ? 
                Math.floor(Math.random() * 251) : 
                Math.floor(Math.random() * 501) - 250;
            currentX += change;
            if (currentX < 1) currentX = 1;
        }
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Instagram Followers',
                data: instagramData,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                tension: 0.1
            }, {
                label: 'X Followers',
                data: xData,
                borderColor: '#17a2b8',
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Combined Follower Trends'
                }
            }
        }
    });
}

// Draw full combined trends chart
function drawCombinedTrendsChartFull(instagramFollowers, xFollowers) {
    const ctx = document.getElementById('combined-trends-chart-full').getContext('2d');
    const weeks = 10;
    const labels = Array.from({ length: weeks + 1 }, (_, i) => `Week ${i}`);
    
    // Simulate Instagram data
    let currentInstagram = instagramFollowers;
    const instagramData = [];
    for (let week = 0; week <= weeks; week++) {
        instagramData.push(currentInstagram);
        if (week < weeks) {
            const change = currentInstagram <= 250 ? 
                Math.floor(Math.random() * 251) : 
                Math.floor(Math.random() * 501) - 250;
            currentInstagram += change;
            if (currentInstagram < 1) currentInstagram = 1;
        }
    }
    
    // Simulate X data
    let currentX = xFollowers;
    const xData = [];
    for (let week = 0; week <= weeks; week++) {
        xData.push(currentX);
        if (week < weeks) {
            const change = currentX <= 250 ? 
                Math.floor(Math.random() * 251) : 
                Math.floor(Math.random() * 501) - 250;
            currentX += change;
            if (currentX < 1) currentX = 1;
        }
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Instagram Followers',
                data: instagramData,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                tension: 0.1
            }, {
                label: 'X Followers',
                data: xData,
                borderColor: '#17a2b8',
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Combined Follower Trends (10 Weeks)'
                }
            }
        }
    });
}
