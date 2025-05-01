// scripts/auth.js
class Auth {
    static currentUser = null;

    static init() {
        const storedUser = localStorage.getItem('bankCurrentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
        }
    }

    static login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = Database.findUser(username);
                
                if (!user) {
                    reject('اسم المستخدم غير موجود');
                    return;
                }

                if (user.password !== password) {
                    reject('كلمة المرور غير صحيحة');
                    return;
                }

                // تحديث وقت آخر دخول
                Database.updateUser(username, { lastLogin: new Date() });

                this.currentUser = user;
                localStorage.setItem('bankCurrentUser', JSON.stringify(user));
                resolve(user);
            }, 300);
        });
    }

    static logout() {
        localStorage.removeItem('bankCurrentUser');
        this.currentUser = null;
    }

    static isAuthenticated() {
        return this.currentUser !== null;
    }

    static isAdmin() {
        return this.isAuthenticated() && this.currentUser.role === 'admin';
    }

    static checkAdminAccess() {
        if (!this.isAdmin()) {
            throw new Error('الوصول مرفوض: صلاحيات مسؤول مطلوبة');
        }
    }
}

// تهيئة النظام عند التحميل
Auth.init();
