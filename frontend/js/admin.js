// Admin dashboard functionality
function loadAdminDashboard() {
    // Update dashboard title
    document.getElementById('dashboard-title').textContent = 'Admin Dashboard';
    
    // Build sidebar menu for Admin
    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.innerHTML = `
        <li class="nav-item">
            <a class="nav-link active" href="#" id="admin-overview">
                <i class="bi bi-house"></i> Overview
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="admin-posts">
                <i class="bi bi-file-text"></i> Posts
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" id="admin-follow">
                <i class="bi bi-person-plus"></i> Follow/Unfollow
            </a>
        </li>
    `;
    
    // Add event listeners for sidebar menu items
    document.getElementById('admin-overview').addEventListener('click', function(e) {
        e.preventDefault();
        loadAdminOverview();
        updateActiveMenu(this);
    });
    
    document.getElementById('admin-posts').addEventListener('click', function(e) {
        e.preventDefault();
        loadAdminPosts();
        updateActiveMenu(this);
    });
    
    document.getElementById('admin-follow').addEventListener('click', function(e) {
        e.preventDefault();
        loadAdminFollow();
        updateActiveMenu(this);
    });
    
    // Load overview by default
    loadAdminOverview();
}

// Update active menu item
function updateActiveMenu(clickedElement) {
    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('#sidebar-menu .nav-link');
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked menu item
    clickedElement.classList.add('active');
}

// Load Admin Overview page
function loadAdminOverview() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    
    // Get stats from user data
    const instagramStats = userData.profiles.instagram;
    const xStats = userData.profiles.x;
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h3>Welcome, ${currentUser}</h3>
                <p class="text-muted">Here's an overview of your social media accounts.</p>
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
    `;
}

// Load Admin Posts page
function loadAdminPosts() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    
    // Get posts from user data
    const instagramPosts = userData.profiles.instagram.posts;
    const xPosts = userData.profiles.x.posts;
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h3>Manage Posts</h3>
                <p class="text-muted">View, edit, or delete your social media posts.</p>
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

// Load Admin Follow/Unfollow page
function loadAdminFollow() {
    const dashboardContent = document.getElementById('dashboard-content');
    const userData = getUserData();
    
    // Get stats from user data
    const instagramStats = userData.profiles.instagram;
    const xStats = userData.profiles.x;
    
    dashboardContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h3>Manage Connections</h3>
                <p class="text-muted">Follow or unfollow users on social media platforms.</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-primary text-white">Instagram Connections</div>
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col-6">
                                <div class="stats-card text-primary">
                                    <i class="bi bi-person-plus stats-icon"></i>
                                    <div class="stats-value">${instagramStats.following}</div>
                                    <div class="stats-label">Following</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stats-card text-primary">
                                    <i class="bi bi-people stats-icon"></i>
                                    <div class="stats-value">${instagramStats.followers}</div>
                                    <div class="stats-label">Followers</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary" onclick="showFollowModal('Instagram')">
                                <i class="bi bi-person-plus"></i> Follow User
                            </button>
                            <button class="btn btn-outline-danger" onclick="showUnfollowModal('Instagram')">
                                <i class="bi bi-person-dash"></i> Unfollow User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card dashboard-card">
                    <div class="card-header bg-info text-white">X Connections</div>
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col-6">
                                <div class="stats-card text-info">
                                    <i class="bi bi-person-plus stats-icon"></i>
                                    <div class="stats-value">${xStats.following}</div>
                                    <div class="stats-label">Following</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stats-card text-info">
                                    <i class="bi bi-people stats-icon"></i>
                                    <div class="stats-value">${xStats.followers}</div>
                                    <div class="stats-label">Followers</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary" onclick="showFollowModal('X')">
                                <i class="bi bi-person-plus"></i> Follow User
                            </button>
                            <button class="btn btn-outline-danger" onclick="showUnfollowModal('X')">
                                <i class="bi bi-person-dash"></i> Unfollow User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render posts for display
function renderPosts(posts, platform) {
    if (!posts || posts.length === 0) {
        return `<p class="text-muted">No posts yet. Click "New Post" to create one.</p>`;
    }
    
    let html = '';
    posts.forEach((post, index) => {
        html += `
            <div class="card post-card mb-3">
                <div class="card-header">
                    <span class="platform-badge badge ${platform === 'Instagram' ? 'bg-primary' : 'bg-info'}">
                        ${platform}
                    </span>
                    <div class="post-actions">
                        <button class="btn btn-sm btn-outline-danger" onclick="deletePost(${index}, '${platform}')">
                            <i class="bi bi-trash"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-primary" onclick="showCommentModal(${index}, '${platform}')">
                            <i class="bi bi-chat"></i>
                        </button>
                    </div>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-stats">
                    <span class="post-stat"><i class="bi bi-heart"></i> ${post.likes}</span>
                    <span class="post-stat"><i class="bi bi-chat"></i> ${post.comments.length}</span>
                </div>
            </div>
        `;
    });
    
    return html;
}

// Show modal for creating new post
function showPostModal() {
    const modalContent = `
        <form id="new-post-form">
            <div class="mb-3">
                <label for="post-content" class="form-label">Post Content</label>
                <textarea class="form-control" id="post-content" rows="3" required></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Post to:</label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="post-instagram" checked>
                    <label class="form-check-label" for="post-instagram">Instagram</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="post-x" checked>
                    <label class="form-check-label" for="post-x">X</label>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Post</button>
            </div>
        </form>
    `;
    
    showModal('Create New Post', modalContent);
    
    // Add event listener for form submission
    document.getElementById('new-post-form').addEventListener('submit', function(e) {
        e.preventDefault();
        createNewPost();
    });
}

// Create new post
function createNewPost() {
    const content = document.getElementById('post-content').value;
    const postToInstagram = document.getElementById('post-instagram').checked;
    const postToX = document.getElementById('post-x').checked;
    
    if (!content) {
        showAlert('Please enter content for your post', 'danger');
        return;
    }
    
    if (!postToInstagram && !postToX) {
        showAlert('Please select at least one platform to post to', 'danger');
        return;
    }
    
    // Get user data
    const userData = getUserData();
    
    // Create new post object
    const newPost = {
        content: content,
        likes: 0,
        comments: [],
        hashtags: extractHashtags(content)
    };
    
    // Add post to selected platforms
    if (postToInstagram && userData.profiles.instagram.posts.length < 5) {
        userData.profiles.instagram.posts.unshift(newPost);
        showAlert('Post added to Instagram', 'success');
    } else if (postToInstagram) {
        showAlert('Instagram has reached the maximum limit of 5 posts. Please delete a post first.', 'warning');
    }
    
    if (postToX && userData.profiles.x.posts.length < 5) {
        userData.profiles.x.posts.unshift(newPost);
        showAlert('Post added to X', 'success');
    } else if (postToX) {
        showAlert('X has reached the maximum limit of 5 posts. Please delete a post first.', 'warning');
    }
    
    // Save updated user data
    saveUserData(userData);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('actionModal'));
    modal.hide();
    
    // Refresh dashboard
    loadAdminPosts();
}

// Extract hashtags from content
function extractHashtags(content) {
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex) || [];
    return matches.map(tag => tag);
}

// Delete a post
function deletePost(index, platform) {
    // Get user data
    const userData = getUserData();
    
    // Remove post from specified platform
    if (platform === 'Instagram' && userData.profiles.instagram.posts[index]) {
        userData.profiles.instagram.posts.splice(index, 1);
        showAlert('Post deleted from Instagram', 'success');
    } else if (platform === 'X' && userData.profiles.x.posts[index]) {
        userData.profiles.x.posts.splice(index, 1);
        showAlert('Post deleted from X', 'success');
    }
    
    // Save updated user data
    saveUserData(userData);
    
    // Refresh dashboard
    loadAdminPosts();
}

// Show modal for adding comment to a post
function showCommentModal(index, platform) {
    const userData = getUserData();
    const post = platform === 'Instagram' ? 
        userData.profiles.instagram.posts[index] : 
        userData.profiles.x.posts[index];
    
    if (!post) {
        showAlert('Post not found', 'danger');
        return;
    }
    
    const modalContent = `
        <div class="mb-3">
            <h6>Post Content:</h6>
            <p class="border p-2 rounded">${post.content}</p>
        </div>
        <form id="comment-form">
            <input type="hidden" id="comment-post-index" value="${index}">
            <input type="hidden" id="comment-platform" value="${platform}">
            <div class="mb-3">
                <label for="comment-text" class="form-label">Add Comment</label>
                <textarea class="form-control" id="comment-text" rows="2" required></textarea>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Add Comment</button>
            </div>
        </form>
        <div class="mt-3">
            <h6>Comments:</h6>
            ${renderComments(post.comments)}
        </div>
    `;
    
    showModal('Add Comment', modalContent);
    
    // Add event listener for form submission
    document.getElementById('comment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addComment();
    });
}

// Render comments for display
function renderComments(comments) {
    if (!comments || comments.length === 0) {
        return `<p class="text-muted">No comments yet.</p>`;
    }
    
    let html = '<ul class="list-group">';
    comments.forEach(comment => {
        html += `
            <li class="list-group-item">${comment}</li>
        `;
    });
    html += '</ul>';
    
    return html;
}

// Add comment to a post
function addComment() {
    const index = parseInt(document.getElementById('comment-post-index').value);
    const platform = document.getElementById('comment-platform').value;
    const commentText = document.getElementById('comment-text').value;
    
    if (!commentText) {
        showAlert('Please enter a comment', 'danger');
        return;
    }
    
    // Get user data
    const userData = getUserData();
    
    // Add comment to specified post
    if (platform === 'Instagram' && userData.profiles.instagram.posts[index]) {
        userData.profiles.instagram.posts[index].comments.push(commentText);
        showAlert('Comment added to Instagram post', 'success');
    } else if (platform === 'X' && userData.profiles.x.posts[index]) {
        userData.profiles.x.posts[index].comments.push(commentText);
        showAlert('Comment added to X post', 'success');
    }
    
    // Save updated user data
    saveUserData(userData);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('actionModal'));
    modal.hide();
    
    // Refresh dashboard
    loadAdminPosts();
}

// Show modal for following a user
function showFollowModal(platform) {
    const modalContent = `
        <form id="follow-form">
            <input type="hidden" id="follow-platform" value="${platform}">
            <div class="mb-3">
                <label for="follow-username" class="form-label">Username to Follow</label>
                <input type="text" class="form-control" id="follow-username" required>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Follow</button>
            </div>
        </form>
    `;
    
    showModal(`Follow on ${platform}`, modalContent);
    
    // Add event listener for form submission
    document.getElementById('follow-form').addEventListener('submit', function(e) {
        e.preventDefault();
        followUser();
    });
}

// Follow a user
function followUser() {
    const platform = document.getElementById('follow-platform').value;
    const username = document.getElementById('follow-username').value;
    
    if (!username) {
        showAlert('Please enter a username to follow', 'danger');
        return;
    }
    
    // Get user data
    const userData = getUserData();
    
    // Increase following count
    if (platform === 'Instagram') {
        userData.profiles.instagram.following += 1;
        showAlert(`You are now following ${username} on Instagram`, 'success');
    } else if (platform === 'X') {
        userData.profiles.x.following += 1;
        showAlert(`You are now following ${username} on X`, 'success');
    }
    
    // Save updated user data
    saveUserData(userData);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('actionModal'));
    modal.hide();
    
    // Refresh dashboard
    loadAdminFollow();
}

// Show modal for unfollowing a user
function showUnfollowModal(platform) {
    const modalContent = `
        <form id="unfollow-form">
            <input type="hidden" id="unfollow-platform" value="${platform}">
            <div class="mb-3">
                <label for="unfollow-username" class="form-label">Username to Unfollow</label>
                <input type="text" class="form-control" id="unfollow-username" required>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-danger">Unfollow</button>
            </div>
        </form>
    `;
    
    showModal(`Unfollow on ${platform}`, modalContent);
    
    // Add event listener for form submission
    document.getElementById('unfollow-form').addEventListener('submit', function(e) {
        e.preventDefault();
        unfollowUser();
    });
}

// Unfollow a user
function unfollowUser() {
    const platform = document.getElementById('unfollow-platform').value;
    const username = document.getElementById('unfollow-username').value;
    
    if (!username) {
        showAlert('Please enter a username to unfollow', 'danger');
        return;
    }
    
    // Get user data
    const userData = getUserData();
    
    // Decrease following count (ensure it doesn't go below 0)
    if (platform === 'Instagram') {
        userData.profiles.instagram.following = Math.max(0, userData.profiles.instagram.following - 1);
        showAlert(`You have unfollowed ${username} on Instagram`, 'success');
    } else if (platform === 'X') {
        userData.profiles.x.following = Math.max(0, userData.profiles.x.following - 1);
        showAlert(`You have unfollowed ${username} on X`, 'success');
    }
    
    // Save updated user data
    saveUserData(userData);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('actionModal'));
    modal.hide();
    
    // Refresh dashboard
    loadAdminFollow();
}
