// scripts/database.js
const Database = {
    users: [
        {
            id: 1,
            username: "admin",
            password: "admin123", // كلمة سر افتراضية
            fullName: "مدير النظام",
            role: "admin",
            lastLogin: null,
            permissions: ["dashboard", "accounts", "transactions"]
        },
        {
            id: 2,
            username: "user1",
            password: "user123",
            fullName: "موظف عادي",
            role: "user",
            lastLogin: null
        }
    ],

    findUser: function(username) {
        return this.users.find(user => user.username === username);
    },

    updateUser: function(username, newData) {
        const userIndex = this.users.findIndex(u => u.username === username);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...newData };
            return true;
        }
        return false;
    }
};
