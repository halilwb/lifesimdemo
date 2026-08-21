// data/items.js — Mağaza eşyaları ve ilişki eylemleri
const STORE_ITEMS = [
            { id: 'item_phone', icon: '📱', name: 'Yeni Telefon', desc: 'Sosyal statünü artırır.', price: 3000, type: 'permanent', effect: { karizma: 5 } },
            { id: 'item_car', icon: '🚗', name: 'İkinci El Araba', desc: 'Hayatını kolaylaştırır, mutluluk verir.', price: 25000, type: 'permanent', effect: { mutluluk: 15, karizma: 5 }, minAge: 18 },
            { id: 'item_gym', icon: '🏋️', name: 'Spor Salonu Üyeliği', desc: 'Sağlık kazanımların kalıcı olarak artar.', price: 2000, type: 'permanent', effect: { saglikCarpaniBonus: 0.15 } },
            { id: 'item_books', icon: '📚', name: 'Özel Ders Paketi', desc: 'Zeka ve okul başarını artırır.', price: 1500, type: 'permanent', effect: { zeka: 10, okul: 15 } },
            { id: 'item_vitamin', icon: '💊', name: 'Vitamin Kürü', desc: 'Anında sağlık kazandırır.', price: 500, type: 'consumable', effect: { saglik: 20 } },
            { id: 'item_clothes', icon: '👕', name: 'Kıyafet Yenileme', desc: 'Karizmanı artırır.', price: 800, type: 'consumable', effect: { karizma: 8 } },
            { id: 'item_house', icon: '🏠', name: 'Ev Eşyası Yenileme', desc: 'Evini yeniler, mutluluk verir.', price: 5000, type: 'permanent', effect: { mutluluk: 10 }, reqBarinma: 'kendi_evi' },
        ];

const REL_ACTIONS = [
            { id: 'sohbet', label: 'Sohbet Et', icon: '💬', cost: { enerji: 10 }, levelChange: 5, statEffect: { mutluluk: 3 } },
            { id: 'bulus', label: 'Buluş / Çık', icon: '☕', cost: { enerji: 25, para: 100 }, levelChange: 10, statEffect: { mutluluk: 8 } },
            { id: 'hediye', label: 'Hediye Ver', icon: '🎁', cost: { para: 300 }, levelChange: 15, statEffect: { mutluluk: 2 } },
            { id: 'tartis', label: 'Tartış', icon: '😠', cost: { enerji: 15 }, levelChange: -15, statEffect: { mutluluk: -5 } },
        ];

        // --- EYLEMLER SİSTEMİ (Her an yapılabilen aksiyonlar) ---
