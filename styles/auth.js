// التحقق من تسجيل الدخول
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
    return true;
}

// تصدير الدوال إذا لزم الأمر
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkAuth, logout };
}
