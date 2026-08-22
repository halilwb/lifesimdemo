// systems/stats.js — Başlangıç istatistikleri, aile/ilişki üretimi, genel eylemler, sınır (clamp) mantığı
const INITIAL_STATS = { 
            para: 0, 
            mutluluk: 70, 
            saglik: 100, 
            enerji: 100,
            tecrube: 0, 
            yas: 0, 
            secimSayaci: 0, 
            aileIliski: 80,
            okul: 50,
            zeka: 0,
            karizma: 0,
            guc: 0,
            sans: 0,
            barinma: 'aile',
            saglikCarpani: 1.0,
            hapisSayaci: 0,
			
			randomEventHistory: []
        };

const generateFamily = () => {
            const count = Math.floor(Math.random() * 4); 
            const types = ["Abi", "Abla", "Küçük Erkek Kardeş", "Küçük Kız Kardeş"];
            let siblings = [];
            for(let i=0; i<count; i++) siblings.push(types[Math.floor(Math.random()*types.length)]);
            const wealthMultiplier = 1 - (count * 0.15); 
            return { siblings, wealthMultiplier, count };
        };

        // --- İLİŞKİ SİSTEMİ ---

const generateRelationships = (family) => {
            const rels = [];
            rels.push({ id: 'anne', name: randomName(true), relation: 'Anne', type: 'aile', level: 70 + Math.floor(Math.random() * 20), emoji: '👩' });
            rels.push({ id: 'baba', name: randomName(false), relation: 'Baba', type: 'aile', level: 70 + Math.floor(Math.random() * 20), emoji: '👨' });
            family.siblings.forEach((sType, idx) => {
                const isFemale = sType.includes('Kız');
                rels.push({ id: `sibling_${idx}`, name: randomName(isFemale), relation: sType, type: 'aile', level: 50 + Math.floor(Math.random() * 30), emoji: isFemale ? '👧' : '👦' });
            });
            const friendIsFemale = Math.random() < 0.5;
            rels.push({ id: 'arkadas_1', name: randomName(friendIsFemale), relation: 'En Yakın Arkadaş', type: 'arkadas', level: 60 + Math.floor(Math.random() * 20), emoji: friendIsFemale ? '👩‍🦰' : '🧑' });
            return rels;
        };

        // İlişki Ekranındaki Eylemler

const ACTIONS = [
            { id: 'act_spor', icon: '🏋️', title: 'Spor Salonu', desc: 'Vücut geliştir, sağlığını iyileştir.', cost: { enerji: 30 }, effect: { guc: 3, saglik: 5 }, minAge: 10 },
            { id: 'act_kitap', icon: '📚', title: 'Kitap Oku', desc: 'Bilgi ve zeka kazan.', cost: { enerji: 15 }, effect: { zeka: 3, okul: 2 }, minAge: 6 },
            { id: 'act_uyu', icon: '😴', title: 'Uzun Uyku Çek', desc: 'Enerjini ve sağlığını tazele.', cost: {}, effect: { enerji: 40, saglik: 5 }, minAge: 0 },
            { id: 'act_parti', icon: '🎉', title: 'Partiye Git', desc: 'Eğlen, insanlarla tanış ama sağlığın etkilenebilir.', cost: { enerji: 25, para: 100 }, effect: { mutluluk: 15, karizma: 2, saglik: -5 }, minAge: 16 },
            { id: 'act_doktor', icon: '🩺', title: 'Doktora Git', desc: 'Check-up yaptır, sağlığını düzelt.', cost: { para: 250 }, effect: { saglik: 20 }, minAge: 0 },
            { id: 'act_ekstra_is', icon: '💼', title: 'Ekstra Mesai', desc: 'Fazladan çalışıp para kazan.', cost: { enerji: 40 }, effect: { para: 400, tecrube: 5 }, minAge: 18 },
            {
                id: 'act_kumar', icon: '🎰', title: 'Kumarhaneye Git', desc: '21 oyna, şansını dene.', cost: { enerji: 10 }, minAge: 18,
                special: 'kumar'
            },
            { id: 'act_kavga', icon: '🥊', title: 'Kavgaya Gir', desc: 'Sokakta biriyle kapıştın.', cost: { enerji: 20 }, effect: { guc: 2, saglik: -10, karizma: 1 }, minAge: 14 },
            { id: 'act_meditasyon', icon: '🧘', title: 'Meditasyon Yap', desc: 'Zihnini dinlendir.', cost: { enerji: 10 }, effect: { mutluluk: 10, saglik: 2 }, minAge: 12 },

            // --- SUÇ SİSTEMİ (Kademeli: 12-17 hafif, 18+ ağır) ---
            {
                id: 'crime_magaza', icon: '🛍️', title: 'Mağazadan Çakma', desc: 'Küçük bir eşyayı cebe atmayı dene. Yakalanma riski var.',
                cost: { enerji: 15 }, minAge: 12, maxAge: 17,
                effect: (s) => {
                    const catchChance = 0.35 - (s.sans / 400) - (s.karizma / 500);
                    const caught = Math.random() < Math.max(0.05, catchChance);
                    if (caught) {
                        return { effect: { hapisSayaci: 1, aileIliski: -10, mutluluk: -10 }, msg: '😨 Güvenlik yakaladı! Ailene haber verildi, 1 adım gözetim altındasın.' };
                    }
                    return { effect: { para: 60, sans: 1, aileIliski: -1 }, msg: '😏 Kimse fark etmedi, ceplerin biraz doldu.' };
                }
            },
            {
                id: 'crime_kopya', icon: '📝', title: 'Sınavda Kopya Çek', desc: 'Riskli ama okul notunu kurtarabilir.',
                cost: { enerji: 10 }, minAge: 12, maxAge: 17,
				special: 'kopya'
			
			},
            {
                id: 'crime_hirsizlik', icon: '🕵️', title: 'Hırsızlık Yap', desc: 'Ağır suç. Yakalanırsan hapis riski yüksek.',
                cost: { enerji: 40 }, minAge: 1,
                special: 'hirsizlik'
				
            },
            {
                id: 'crime_dolandiricilik', icon: '🎭', title: 'Dolandırıcılık Yap', desc: 'Ağır suç. Karizma yüksekse risk azalır.',
                cost: { enerji: 25 }, minAge: 18,
                effect: (s) => {
                    const catchChance = 0.4 - (s.karizma / 300) - (s.zeka / 500);
                    const caught = Math.random() < Math.max(0.08, catchChance);
                    if (caught) {
                        const ceza = 2 + Math.floor(Math.random() * 3); // 2-4 adım
                        return { effect: { hapisSayaci: ceza, mutluluk: -15, karizma: -8 }, msg: `🚔 Kurbanın seni şikayet etti, ${ceza} adım hapis yattın.` };
                    }
                    return { effect: { para: 500, karizma: 2 }, msg: '🤝 İnandırıcıydın, para hesaba geçti.' };
                }
            },
        ];

        // --- MAĞAZA SİSTEMİ ---

// Tüm istatistikleri 0-100 aralığına (veya kuralına) sabitler
const clampAll = (s) => {
    s.mutluluk = Math.max(0, Math.min(100, s.mutluluk));
    s.saglik = Math.max(0, Math.min(100, s.saglik));
    s.enerji = Math.max(0, Math.min(100, s.enerji));
    s.aileIliski = Math.max(0, Math.min(100, s.aileIliski));
    s.okul = Math.max(0, Math.min(100, s.okul));
    s.hapisSayaci = Math.max(0, s.hapisSayaci || 0);
    return s;
};
