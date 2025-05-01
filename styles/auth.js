// scripts/auth.js
class Auth {
    static login(username, password, requireAdmin = false) {
        const user = bankDB.login(username, password);
        
        if (!user) {
            throw new Error("بيانات الدخول غير صحيحة");
        }

        if (requireAdmin && !user.isAdmin) {
            throw new Error("صلاحيات المسؤول مطلوبة");
        }

        this.setSession(user);
        return user;
    }

    static setSession(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('lastActivity', Date.now());
    }

    static isAdmin() {
        const user = this.getCurrentUser();
        return user ? user.isAdmin : false;
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    static logout() {
        localStorage.clear();
    }
}
