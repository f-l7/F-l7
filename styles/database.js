// تهيئة البيانات إذا لم تكن موجودة
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

// دالة مساعدة للحصول على البيانات
function getBankData() {
    return JSON.parse(localStorage.getItem('bankData'));
}

// دالة مساعدة لحفظ البيانات
function saveBankData(data) {
    localStorage.setItem('bankData', JSON.stringify(data));
}

// تصدير الدوال إذا لزم الأمر
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getBankData, saveBankData };
}
