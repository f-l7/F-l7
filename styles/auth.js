// scripts/auth.js
class Auth {
    static login(username, password, isAdminPage = false) {
        const user = bankDB.login(username, password);
        
        if (!user) {
            throw new Error("بيانات الدخول غير صحيحة");
        }

        if (isAdminPage && !user.isAdmin) {
            throw new Error("لا تملك صلاحيات الدخول كمسؤول");
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    static logout() {
        localStorage.removeItem('currentUser');
    }

    static isAuthenticated() {
        return localStorage.getItem('currentUser') !== null;
    }

    static isAdmin() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return user ? user.isAdmin : false;
    }
}
