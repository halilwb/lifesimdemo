// data/countries.js — Şehir, bölge ve bölgesel buff verileri
// NOT: Oyun ülke değil şehir bazlı olduğu için bu dosya şehir/bölge verilerini tutar.
const TURKEY_CITIES = [
            "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
        ];

        // Başlangıç değerleri

const CITY_REGIONS = {
            "İstanbul": "marmara", "Kocaeli": "marmara", "Bursa": "marmara", "Tekirdağ": "marmara", "Balıkesir": "marmara",
            "Çanakkale": "marmara", "Edirne": "marmara", "Kırklareli": "marmara", "Sakarya": "marmara", "Yalova": "marmara", "Bilecik": "marmara",
            "İzmir": "ege", "Aydın": "ege", "Manisa": "ege", "Muğla": "ege", "Denizli": "ege", "Uşak": "ege", "Afyonkarahisar": "ege", "Kütahya": "ege",
            "Antalya": "akdeniz", "Adana": "akdeniz", "Mersin": "akdeniz", "Hatay": "akdeniz", "Isparta": "akdeniz", "Burdur": "akdeniz", "Kahramanmaraş": "akdeniz", "Osmaniye": "akdeniz",
            "Ankara": "ic_anadolu", "Konya": "ic_anadolu", "Kayseri": "ic_anadolu", "Sivas": "ic_anadolu", "Eskişehir": "ic_anadolu", "Çorum": "ic_anadolu",
            "Yozgat": "ic_anadolu", "Kırşehir": "ic_anadolu", "Nevşehir": "ic_anadolu", "Niğde": "ic_anadolu", "Aksaray": "ic_anadolu", "Kırıkkale": "ic_anadolu", "Karaman": "ic_anadolu",
            "Trabzon": "karadeniz", "Samsun": "karadeniz", "Rize": "karadeniz", "Ordu": "karadeniz", "Giresun": "karadeniz", "Gümüşhane": "karadeniz",
            "Artvin": "karadeniz", "Zonguldak": "karadeniz", "Bolu": "karadeniz", "Çankırı": "karadeniz", "Amasya": "karadeniz", "Tokat": "karadeniz",
            "Sinop": "karadeniz", "Kastamonu": "karadeniz", "Bartın": "karadeniz", "Karabük": "karadeniz", "Bayburt": "karadeniz", "Düzce": "karadeniz",
            "Erzurum": "dogu_anadolu", "Erzincan": "dogu_anadolu", "Van": "dogu_anadolu", "Kars": "dogu_anadolu", "Ağrı": "dogu_anadolu", "Muş": "dogu_anadolu",
            "Bitlis": "dogu_anadolu", "Bingöl": "dogu_anadolu", "Tunceli": "dogu_anadolu", "Elazığ": "dogu_anadolu", "Malatya": "dogu_anadolu",
            "Hakkari": "dogu_anadolu", "Iğdır": "dogu_anadolu", "Ardahan": "dogu_anadolu",
            "Gaziantep": "guneydogu", "Diyarbakır": "guneydogu", "Şanlıurfa": "guneydogu", "Mardin": "guneydogu", "Siirt": "guneydogu",
            "Şırnak": "guneydogu", "Batman": "guneydogu", "Adıyaman": "guneydogu", "Kilis": "guneydogu"
        };

        // ==========================================================
        // --- ŞEHİR BUFF / DEBUFF SİSTEMİ ---
        // ==========================================================
        // Her şehrin pasif etkileri. Her "step > 0" olan seçimde uygulanır.
        // passivePerStep: Her adımda eklenen / çıkarılan değerler.
        // startBonus: Oyun başlarken bir kereliğine verilen bonus statlar.
        // description: Menüde gösterilen kısa açıklama.
        // buffs / debuffs: Menüde ikon olarak sıralanan etiketler.

const REGION_BUFFS = {
            marmara:     { passivePerStep: { para: 15, enerji: -2, mutluluk: -1 },  startBonus: { karizma: 5 } },
            ege:         { passivePerStep: { saglik: 1, mutluluk: 1 },               startBonus: { sans: 3 } },
            akdeniz:     { passivePerStep: { saglik: 1, enerji: -1 },                startBonus: { guc: 3 } },
            ic_anadolu:  { passivePerStep: { okul: 1 },                              startBonus: { zeka: 3 } },
            karadeniz:   { passivePerStep: { saglik: 2, enerji: -1 },                startBonus: { guc: 5 } },
            dogu_anadolu:{ passivePerStep: { para: -5, guc: 1, enerji: -2 },        startBonus: { guc: 8 } },
            guneydogu:   { passivePerStep: { karizma: 1, para: -3 },                startBonus: { karizma: 5 } },
        };

const CITY_BUFFS = {
            // --- MARMARA BÖLGESİ ---
            "İstanbul": {
                emoji: "🌉", color: "#3b82f6",
                description: "Türkiye'nin kalbi — fırsat çok, stres daha çok.",
                buffs: ["💰 Para +25/adım", "🎭 Karizma +1"],
                debuffs: ["⚡ Enerji -4/adım", "😊 Mutluluk -2/adım"],
                passivePerStep: { para: 25, enerji: -4, mutluluk: -2, karizma: 1 },
                startBonus: { karizma: 10, zeka: 5 }
            },
            "Bursa": {
                emoji: "🏔️", color: "#10b981",
                description: "Sanayinin gücü, Uludağ'ın serinliği.",
                buffs: ["💰 Para +18/adım", "💪 Güç +1"],
                debuffs: ["😊 Mutluluk -1/adım"],
                passivePerStep: { para: 18, guc: 1, mutluluk: -1 },
                startBonus: { guc: 5, karizma: 3 }
            },
            "Kocaeli": {
                emoji: "🏭", color: "#6366f1",
                description: "Sanayi kenti — iş bol, hava ağır.",
                buffs: ["💰 Para +20/adım", "📚 Tecrübe +2"],
                debuffs: ["❤️ Sağlık -1/adım"],
                passivePerStep: { para: 20, tecrube: 2, saglik: -1 },
                startBonus: { zeka: 4 }
            },
            "Tekirdağ": {
                emoji: "🍷", color: "#8b5cf6",
                description: "Rakı ve çiroz kültürü — sakin ama bereketli.",
                buffs: ["😊 Mutluluk +1/adım", "💰 Para +10/adım"],
                debuffs: [],
                passivePerStep: { mutluluk: 1, para: 10 },
                startBonus: { sans: 5 }
            },
            "Edirne": {
                emoji: "🕌", color: "#f59e0b",
                description: "Tarihin izleri, pehlivanların şehri.",
                buffs: ["💪 Güç +2", "🍀 Şans +1"],
                debuffs: ["💰 Para -3/adım"],
                passivePerStep: { guc: 2, sans: 1, para: -3 },
                startBonus: { guc: 8 }
            },
            "Sakarya": {
                emoji: "🌲", color: "#059669",
                description: "Doğanın ortasında huzurlu bir yaşam.",
                buffs: ["😊 Mutluluk +1/adım", "❤️ Sağlık +1/adım"],
                debuffs: ["💰 Para -2/adım"],
                passivePerStep: { mutluluk: 1, saglik: 1, para: -2 },
                startBonus: { saglik: 10 }
            },
            "Yalova": {
                emoji: "♨️", color: "#14b8a6",
                description: "Kaplıcalar ve huzur — sağlık şehri.",
                buffs: ["❤️ Sağlık +2/adım", "😊 Mutluluk +1/adım"],
                debuffs: ["💰 Para -5/adım"],
                passivePerStep: { saglik: 2, mutluluk: 1, para: -5 },
                startBonus: { saglik: 15 }
            },

            // --- EGE BÖLGESİ ---
            "İzmir": {
                emoji: "🌊", color: "#0ea5e9",
                description: "Ege'nin incisi — özgür, modern, keyifli.",
                buffs: ["😊 Mutluluk +2/adım", "🎭 Karizma +1", "❤️ Sağlık +1/adım"],
                debuffs: ["💰 Para -5/adım"],
                passivePerStep: { mutluluk: 2, karizma: 1, saglik: 1, para: -5 },
                startBonus: { karizma: 8, sans: 5 }
            },
            "Muğla": {
                emoji: "⛵", color: "#06b6d4",
                description: "Tatil cenneti — sezon gelir, sezon geçer.",
                buffs: ["😊 Mutluluk +3/adım", "🍀 Şans +1"],
                debuffs: ["💰 Para -8/adım (sezon dışı)"],
                passivePerStep: { mutluluk: 3, sans: 1, para: -8 },
                startBonus: { karizma: 6, sans: 8 }
            },
            "Aydın": {
                emoji: "🫒", color: "#84cc16",
                description: "İncir ve zeytinin başkenti — bereketli toprak.",
                buffs: ["❤️ Sağlık +2/adım", "💪 Güç +1"],
                debuffs: [],
                passivePerStep: { saglik: 2, guc: 1 },
                startBonus: { saglik: 10, guc: 5 }
            },
            "Denizli": {
                emoji: "🐓", color: "#f97316",
                description: "Tekstilin kalbi — çalışkan ve üretken.",
                buffs: ["💰 Para +12/adım", "💼 Tecrübe +1"],
                debuffs: ["⚡ Enerji -1/adım"],
                passivePerStep: { para: 12, tecrube: 1, enerji: -1 },
                startBonus: { zeka: 5 }
            },

            // --- AKDENİZ BÖLGESİ ---
            "Antalya": {
                emoji: "🏖️", color: "#f59e0b",
                description: "Turizmin başkenti — güneş, deniz, para.",
                buffs: ["💰 Para +20/adım (sezon)", "😊 Mutluluk +2/adım"],
                debuffs: ["⚡ Enerji -2/adım"],
                passivePerStep: { para: 20, mutluluk: 2, enerji: -2 },
                startBonus: { karizma: 8, sans: 5 }
            },
            "Adana": {
                emoji: "🌶️", color: "#ef4444",
                description: "Kebabın kalbi — sıcak, canlı, meydan okuyan.",
                buffs: ["💪 Güç +2", "🎭 Karizma +1", "💰 Para +8/adım"],
                debuffs: ["❤️ Sağlık -1/adım (sıcak)"],
                passivePerStep: { guc: 2, karizma: 1, para: 8, saglik: -1 },
                startBonus: { guc: 8, karizma: 5 }
            },
            "Mersin": {
                emoji: "⚓", color: "#0284c7",
                description: "Limanın şehri — ticaret ve denizcilik.",
                buffs: ["💰 Para +15/adım", "💼 Tecrübe +2"],
                debuffs: ["😊 Mutluluk -1/adım"],
                passivePerStep: { para: 15, tecrube: 2, mutluluk: -1 },
                startBonus: { zeka: 5, karizma: 3 }
            },
            "Hatay": {
                emoji: "🫕", color: "#a855f7",
                description: "Medeniyetlerin kavşağı — kültür ve lezzet.",
                buffs: ["🎭 Karizma +2", "😊 Mutluluk +1/adım"],
                debuffs: ["💰 Para -3/adım"],
                passivePerStep: { karizma: 2, mutluluk: 1, para: -3 },
                startBonus: { karizma: 10, sans: 5 }
            },

            // --- İÇ ANADOLU BÖLGESİ ---
            "Ankara": {
                emoji: "🏛️", color: "#6366f1",
                description: "Başkentin avantajı — devlet kapısı açık.",
                buffs: ["🧠 Zeka +1/adım", "📚 Okul +2/adım", "💰 Para +12/adım"],
                debuffs: ["😊 Mutluluk -2/adım", "⚡ Enerji -1/adım"],
                passivePerStep: { zeka: 1, okul: 2, para: 12, mutluluk: -2, enerji: -1 },
                startBonus: { zeka: 10, okul: 15 }
            },
            "Konya": {
                emoji: "🕌", color: "#78716c",
                description: "Mevlana'nın şehri — manevi huzur, sakin yaşam.",
                buffs: ["😊 Mutluluk +2/adım", "👨‍👩‍👧 Aile +1/adım"],
                debuffs: ["💰 Para -3/adım", "🎭 Karizma -1"],
                passivePerStep: { mutluluk: 2, aileIliski: 1, para: -3, karizma: -1 },
                startBonus: { mutluluk: 10, aileIliski: 10 }
            },
            "Kayseri": {
                emoji: "🥩", color: "#dc2626",
                description: "Ticaretin ustası — pastırma ve iş zekası.",
                buffs: ["💰 Para +18/adım", "🧠 Zeka +1"],
                debuffs: [],
                passivePerStep: { para: 18, zeka: 1 },
                startBonus: { zeka: 8, karizma: 5 }
            },
            "Eskişehir": {
                emoji: "🎓", color: "#8b5cf6",
                description: "Üniversite kenti — genç, dinamik, özgür.",
                buffs: ["🧠 Zeka +2/adım", "📚 Okul +3/adım", "🎭 Karizma +1"],
                debuffs: ["💰 Para -8/adım"],
                passivePerStep: { zeka: 2, okul: 3, karizma: 1, para: -8 },
                startBonus: { zeka: 12, okul: 20 }
            },
            "Sivas": {
                emoji: "🐏", color: "#92400e",
                description: "Dört mevsim dört ayrı yüz — zorlu ama dürüst.",
                buffs: ["💪 Güç +1/adım", "🍀 Şans +1"],
                debuffs: ["💰 Para -5/adım", "⚡ Enerji -1/adım"],
                passivePerStep: { guc: 1, sans: 1, para: -5, enerji: -1 },
                startBonus: { guc: 8, sans: 5 }
            },
            "Nevşehir": {
                emoji: "🪨", color: "#a78bfa",
                description: "Peri bacaları — turizm ve sakin yaşam.",
                buffs: ["😊 Mutluluk +2/adım", "🍀 Şans +2"],
                debuffs: ["💰 Para -5/adım"],
                passivePerStep: { mutluluk: 2, sans: 2, para: -5 },
                startBonus: { sans: 10, mutluluk: 8 }
            },

            // --- KARADENİZ BÖLGESİ ---
            "Trabzon": {
                emoji: "⚽", color: "#1d4ed8",
                description: "Fırtınanın gözü — sağlam karakterler yetişir.",
                buffs: ["❤️ Sağlık +3/adım", "💪 Güç +2", "👨‍👩‍👧 Aile +1/adım"],
                debuffs: ["💰 Para -8/adım", "🎭 Karizma -1"],
                passivePerStep: { saglik: 3, guc: 2, aileIliski: 1, para: -8, karizma: -1 },
                startBonus: { saglik: 15, guc: 10 }
            },
            "Rize": {
                emoji: "🍵", color: "#15803d",
                description: "Çayın anavatanı — yağmurlu ama huzurlu.",
                buffs: ["❤️ Sağlık +3/adım", "😊 Mutluluk +1/adım"],
                debuffs: ["💰 Para -10/adım"],
                passivePerStep: { saglik: 3, mutluluk: 1, para: -10 },
                startBonus: { saglik: 20 }
            },
            "Samsun": {
                emoji: "🌿", color: "#16a34a",
                description: "Karadeniz'in kapısı — ticaret ve tütün.",
                buffs: ["💰 Para +10/adım", "💼 Tecrübe +1"],
                debuffs: ["❤️ Sağlık -1/adım"],
                passivePerStep: { para: 10, tecrube: 1, saglik: -1 },
                startBonus: { karizma: 5, zeka: 3 }
            },
            "Ordu": {
                emoji: "🌰", color: "#92400e",
                description: "Fındığın başkenti — doğal zenginlik.",
                buffs: ["❤️ Sağlık +2/adım", "💪 Güç +1"],
                debuffs: ["💰 Para -5/adım"],
                passivePerStep: { saglik: 2, guc: 1, para: -5 },
                startBonus: { saglik: 12, guc: 5 }
            },
            "Giresun": {
                emoji: "🍒", color: "#be123c",
                description: "Kirazın anavatanı — rengarenk ve canlı.",
                buffs: ["😊 Mutluluk +2/adım", "❤️ Sağlık +1/adım"],
                debuffs: ["💰 Para -6/adım"],
                passivePerStep: { mutluluk: 2, saglik: 1, para: -6 },
                startBonus: { sans: 8, mutluluk: 10 }
            },
            "Kastamonu": {
                emoji: "🏰", color: "#78716c",
                description: "Tarihin sesi — köklü ve geleneksel.",
                buffs: ["👨‍👩‍👧 Aile +2/adım", "🧠 Zeka +1"],
                debuffs: ["💰 Para -8/adım", "⚡ Enerji -1/adım"],
                passivePerStep: { aileIliski: 2, zeka: 1, para: -8, enerji: -1 },
                startBonus: { aileIliski: 15, zeka: 5 }
            },

            // --- DOĞU ANADOLU BÖLGESİ ---
            "Erzurum": {
                emoji: "⛷️", color: "#1e40af",
                description: "Kışın kalbi — soğuk iklim güçlü insanlar yetiştirir.",
                buffs: ["💪 Güç +3/adım", "👨‍👩‍👧 Aile +1/adım"],
                debuffs: ["💰 Para -10/adım", "⚡ Enerji -2/adım", "😊 Mutluluk -1/adım"],
                passivePerStep: { guc: 3, aileIliski: 1, para: -10, enerji: -2, mutluluk: -1 },
                startBonus: { guc: 15, aileIliski: 10 }
            },
            "Van": {
                emoji: "🐈", color: "#0369a1",
                description: "Gölün incisi — özgün kültür ve sert doğa.",
                buffs: ["💪 Güç +2/adım", "🍀 Şans +1"],
                debuffs: ["💰 Para -12/adım", "😊 Mutluluk -2/adım"],
                passivePerStep: { guc: 2, sans: 1, para: -12, mutluluk: -2 },
                startBonus: { guc: 12, sans: 8 }
            },
            "Malatya": {
                emoji: "🍑", color: "#f59e0b",
                description: "Kaynağın şehri — meyve ve sıcaklık.",
                buffs: ["😊 Mutluluk +1/adım", "❤️ Sağlık +1/adım"],
                debuffs: ["💰 Para -5/adım"],
                passivePerStep: { mutluluk: 1, saglik: 1, para: -5 },
                startBonus: { saglik: 8, mutluluk: 8 }
            },
            "Elazığ": {
                emoji: "🍇", color: "#7c3aed",
                description: "Harput'un mirası — bağ ve bahçe.",
                buffs: ["❤️ Sağlık +1/adım", "👨‍👩‍👧 Aile +1/adım"],
                debuffs: ["💰 Para -5/adım"],
                passivePerStep: { saglik: 1, aileIliski: 1, para: -5 },
                startBonus: { aileIliski: 10, saglik: 5 }
            },
            "Kars": {
                emoji: "🧀", color: "#374151",
                description: "Soğuğun ötesi — kaz ve peynir diyarı.",
                buffs: ["💪 Güç +2/adım", "🍀 Şans +2"],
                debuffs: ["💰 Para -12/adım", "⚡ Enerji -3/adım"],
                passivePerStep: { guc: 2, sans: 2, para: -12, enerji: -3 },
                startBonus: { guc: 15, sans: 10 }
            },

            // --- GÜNEYDOĞU ANADOLU BÖLGESİ ---
            "Gaziantep": {
                emoji: "🥜", color: "#d97706",
                description: "Baklavanın şehri — ticaret ve lezzet.",
                buffs: ["💰 Para +15/adım", "🎭 Karizma +1", "🍀 Şans +1"],
                debuffs: ["⚡ Enerji -1/adım"],
                passivePerStep: { para: 15, karizma: 1, sans: 1, enerji: -1 },
                startBonus: { karizma: 8, zeka: 5 }
            },
            "Diyarbakır": {
                emoji: "🏯", color: "#1c1917",
                description: "Kara surların ardı — derin kültür, güçlü topluluk.",
                buffs: ["💪 Güç +2/adım", "🎭 Karizma +1", "👨‍👩‍👧 Aile +2/adım"],
                debuffs: ["💰 Para -8/adım"],
                passivePerStep: { guc: 2, karizma: 1, aileIliski: 2, para: -8 },
                startBonus: { guc: 10, aileIliski: 15 }
            },
            "Şanlıurfa": {
                emoji: "🐟", color: "#92400e",
                description: "Peygamberlerin şehri — inanç ve gelenek.",
                buffs: ["👨‍👩‍👧 Aile +3/adım", "🍀 Şans +2"],
                debuffs: ["💰 Para -8/adım", "⚡ Enerji -2/adım"],
                passivePerStep: { aileIliski: 3, sans: 2, para: -8, enerji: -2 },
                startBonus: { aileIliski: 20, sans: 10 }
            },
            "Mardin": {
                emoji: "🏛️", color: "#a16207",
                description: "Taş evler ve mozaik kültür — eşsiz bir atmosfer.",
                buffs: ["🎭 Karizma +2/adım", "🍀 Şans +1", "😊 Mutluluk +1/adım"],
                debuffs: ["💰 Para -6/adım"],
                passivePerStep: { karizma: 2, sans: 1, mutluluk: 1, para: -6 },
                startBonus: { karizma: 12, sans: 8 }
            },
        };

        // Tanımlanmamış şehirler için bölge varsayılanını al

const getCityBuff = (city) => {
            if (CITY_BUFFS[city]) return CITY_BUFFS[city];
            const region = CITY_REGIONS[city];
            if (region && REGION_BUFFS[region]) {
                const rb = REGION_BUFFS[region];
                return {
                    emoji: "📍", color: "#64748b",
                    description: "Küçük ama özgün bir Anadolu şehri.",
                    buffs: Object.entries(rb.passivePerStep).filter(([,v])=>v>0).map(([k,v])=>`+${v} ${k}/adım`),
                    debuffs: Object.entries(rb.passivePerStep).filter(([,v])=>v<0).map(([k,v])=>`${v} ${k}/adım`),
                    passivePerStep: rb.passivePerStep,
                    startBonus: rb.startBonus || {}
                };
            }
            return { emoji: "📍", color: "#64748b", description: "Sıradan bir Anadolu şehri.", buffs: [], debuffs: [], passivePerStep: {}, startBonus: {} };
        };

        // Bölgelere göre atmosferik "renk" cümlecikleri — sonuç metinlerine düşük ihtimalle serpiştirilir

const REGION_FLAVOR = {
            marmara: ["Dışarıda trafiğin uğultusu hiç dinmiyor.", "Vapur düdükleri uzaktan uzağa duyuluyor.", "Kalabalık, her zamanki gibi seni de içine çekiyor."],
            ege: ["Zeytin ağaçlarının arasından esen rüzgar içini ferahlatıyor.", "Denizden gelen tuzlu koku burnuna doluyor.", "Güneş her zamanki gibi cömert bugün."],
            akdeniz: ["Sıcak, bunaltıcı bir öğle vakti bu.", "Portakal bahçelerinin kokusu havada asılı kalmış.", "Deniz ışıltısı gözünü alıyor."],
            ic_anadolu: ["Bozkırın kuru rüzgarı yüzünü yalıyor.", "Ova upuzun, ufuk bir türlü bitmiyor.", "Toz toprak arasında hayat sessizce akıyor."],
            karadeniz: ["Yamaçlardan inen sis her yeri kaplamış.", "Yağmur bugün de eksik olmuyor, toprak çamur kokuyor.", "Dere şırıltısı ve mısır tarlaları arasında geçiyor günler."],
            dogu_anadolu: ["Soğuk, keskin bir rüzgar tepelerden iniyor.", "Dağların gölgesi erkenden çöküyor üstüne.", "Kar henüz erimemiş, hava bıçak gibi."],
            guneydogu: ["Kavurucu bir güneş tepende asılı duruyor.", "Baharat ve taze fırın ekmeği kokusu sokakları sarmış.", "Toz bulutu ufukta savruluyor."]
        };
