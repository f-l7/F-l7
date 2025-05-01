// scripts/database.js
const bankDB = {
    users: [
        {
            id: 1,
            username: "admin",
            password: "admin123", // كلمة السر الافتراضية
            fullName: "مدير النظام",
            isAdmin: true, // تأكد من وجود هذه الخاصية
            permissions: ["dashboard", "accounts", "transactions"]
        },
        {
            id: 2,
            username: "user1",
            password: "user123",
            fullName: "مستخدم عادي",
            isAdmin: false
        }
    ],

    login: function(username, password) {
        return this.users.find(user => 
            user.username === username && 
            user.password === password
        );
    },

    // دالة مساعدة للتحقق من وجود المسؤولين
    hasAdminAccounts: function() {
        return this.users.some(user => user.isAdmin);
    }
};

// التحقق من إنشاء حسابات المسؤولين تلقائيًا إذا لم تكن موجودة
if (!bankDB.hasAdminAccounts()) {
    bankDB.users.push({
        id: 99,
        username: "superadmin",
        password: "superadmin123",
        isAdmin: true
    });
}
