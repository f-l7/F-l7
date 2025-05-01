// تهيئة البيانات الأولية
if (!localStorage.getItem('bankData')) {
    const initialData = {
        users: [
            {
                id: 1,
                username: "admin",
                password: "admin123",
                fullName: "مدير النظام",
                balance: 0,
                cards: [],
                isAdmin: true
            }
        ],
        transactions: []
    };
    localStorage.setItem('bankData', JSON.stringify(initialData));
}

// دوال إدارة البيانات
const bankDB = {
    getData() {
        return JSON.parse(localStorage.getItem('bankData'));
    },

    saveData(data) {
        localStorage.setItem('bankData', JSON.stringify(data));
    },

    // إنشاء حساب جديد برصيد 0
    register(userData) {
        const data = this.getData();
        const newUser = {
            id: Date.now(),
            ...userData,
            balance: 0,
            cards: [],
            isAdmin: false
        };
        data.users.push(newUser);
        this.saveData(data);
        return newUser;
    },

    // تسجيل الدخول
    login(username, password) {
        const data = this.getData();
        return data.users.find(user => 
            user.username === username && 
            user.password === password
        );
    },

    // التحويل مع خصم 2%
    transfer(senderId, receiverId, amount) {
        const data = this.getData();
        const sender = data.users.find(u => u.id === senderId);
        const receiver = data.users.find(u => u.id === receiverId);
        const admin = data.users.find(u => u.isAdmin);
        
        if (!sender || !receiver || !admin) return false;
        
        amount = parseFloat(amount);
        const fee = amount * 0.02;
        const total = amount + fee;
        
        if (sender.balance < total) return false;
        
        sender.balance -= total;
        receiver.balance += amount;
        admin.balance += fee;
        
        const transaction = {
            id: Date.now(),
            senderId,
            receiverId,
            amount,
            fee,
            date: new Date().toISOString()
        };
        
        data.transactions.push(transaction);
        this.saveData(data);
        return transaction;
    },

    // إضافة رصيد
    addFunds(userId, amount) {
        const data = this.getData();
        const user = data.users.find(u => u.id === userId);
        if (!user) return false;
        
        user.balance += parseFloat(amount);
        this.saveData(data);
        return user;
    },

    // إنشاء بطاقة
    createCard(userId, cardName) {
        const data = this.getData();
        const user = data.users.find(u => u.id === userId);
        if (!user) return null;
        
        const newCard = {
            id: Date.now(),
            name: cardName,
            number: Array.from({length: 16}, () => Math.floor(Math.random() * 10)).join(''),
            expiry: `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${(new Date().getFullYear() + 3).toString().slice(2)}`,
            cvv: Math.floor(Math.random() * 900) + 100
        };
        
        user.cards.push(newCard);
        this.saveData(data);
        return newCard;
    },

    // حذف حساب
    deleteUser(userId) {
        const data = this.getData();
        const initialLength = data.users.length;
        data.users = data.users.filter(user => user.id !== userId);
        this.saveData(data);
        return data.users.length !== initialLength;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = bankDB;
}
