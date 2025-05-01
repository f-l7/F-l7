function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

function checkAdmin() {
    const user = checkAuth();
    if (!user?.isAdmin) {
        window.location.href = 'account.html';
        return null;
    }
    return user;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkAuth, checkAdmin, logout };
}
