// scripts/database.js
const bankDB = {
    // قاعدة بيانات المستخدمين
    users: [
        {
            id: 1,
            username: "admin",
            password: "admin123", // كلمة مرور افتراضية
            fullName: "مدير النظام",
            isAdmin: true,
            lastLogin: null
        },
        {
            id: 2,
            username: "user1",
            password: "user123",
            fullName: "موظف عادي",
            isAdmin: false
        }
    ],

    // دالة تسجيل الدخول
    login: function(username, password) {
        const user = this.users.find(u => u.username === username);
        
        if (!user) {
            console.error("المستخدم غير موجود");
            return null;
        }
        
        // في تطبيق حقيقي استخدم: password_verify()
        if (user.password === password) {
            user.lastLogin = new Date();
            return user;
        }
        
        return null;
    },

    // دالة التحقق من وجود مسؤولين
    hasAdmins: function() {
        return this.users.some(user => user.isAdmin);
    }
};

// إنشاء مسؤول افتراضي إذا لم يوجد
if (!bankDB.hasAdmins()) {
    bankDB.users.push({
        id: 99,
        username: "superadmin",
        password: "superadmin123",
        isAdmin: true
    });
    console.warn("تم إنشاء مسؤول افتراضي!");
}
