// events/events.js — Yaş bazlı olay ağacı (EVENTS) — çocukluk/gençlik/yetişkinlik zincirleri
const EVENTS = {
                // --- 0-7 YAŞ LİNEER HİKAYE ZİNCİRİ ---
                // Yaş 0
                age_0_ev_1: {
                    id: 'age_0_ev_1', emoji: '👶', title: "0 Yaş",
                    description: "Ne yaptığını hatırlamıyorsun.",
                    choices: [
                        { text: "Irrgh", nextId: 'age_1_ev_1', step: 1, icon: '🍼', effect: { yas: 1, msg: "Öyle böyle derken 1 sene geçti." } },
                        { text: "Hımmm", nextId: 'age_1_ev_1', step: 1, icon: '🤔', effect: { yas: 1, msg: "Öyle böyle derken 1 sene geçti." } }
                    ]
                },
                
                // Yaş 1
                age_1_ev_1: {
                    id: 'age_1_ev_1', emoji: '💉', title: "Aşı Vakti",
                    description: "Annen seni sağlık ocağına götürüyor. Aşıların yapılacak.",
                    choices: [
                        { text: "Kabullen", nextId: 'age_2_ev_1', step: 1, icon: '😇', effect: { yas: 1, saglikCarpani: 1.10, msg: "Aşıları oldun. Sağlık kazanımların kalıcı olarak %10 arttı!" } },
                        { text: "Reddet", nextId: 'age_2_ev_1', step: 1, icon: '😡', effect: { yas: 1, karizma: 1, enerji: -10, msg: "Ortalığı birbirine kattın. Karizman arttı ama aşı da olmadın." } }
                    ]
                },

                // Yaş 2
                age_2_ev_1: {
                    id: 'age_2_ev_1', emoji: '🤹', title: "Uçan Bebek",
                    description: "Baban seni havaya atıp tutarak seninle oyun oynuyor.",
                    choices: [
                        { text: "Ağla", nextId: 'age_2_ev_2', step: 1, icon: '😭', effect: { mutluluk: -10, msg: "Annen geldi ve seni babanın elinden aldı." } },
                        { text: "Eğlen", nextId: 'age_2_ev_2', step: 1, icon: '😆', effect: (s) => {
                            if(Math.random() < 0.03) return { effect: { saglik: -100 }, msg: "Baban eğlencenin dozunu kaçırdı. Seni kafa üstü yere düşürdü..." };
                            return { effect: { zeka: -3, mutluluk: 10, enerji: -10 }, msg: "Kafan biraz sarsıldı ama çok eğlenceliydi!" };
                        } }
                    ]
                },
                age_2_ev_2: {
                    id: 'age_2_ev_2', emoji: '👵', title: "Altın Günü",
                    description: "Eve akrabalar doluştu. Yabancı teyzeler ve amcalar etrafını sardı.",
                    choices: [
                        { text: "Gülücük Saç", nextId: 'age_3_ev_1', step: 1, icon: '😊', effect: { yas: 1, karizma: 2, mutluluk: -5, enerji: -10, msg: "Teyzeler \"aaa ne tatlı\" diye üstüne üşüştü, yanaklarını sıkı sıkı çimdiklediler." } },
                        { text: "Ağla", nextId: 'age_3_ev_1', step: 1, icon: '😭', effect: { yas: 1, sans: 1, aileIliski: -5, msg: "Bağıra bağıra ağladın, bir teyze \"nazar değmiş\" deyip cebine para sıkıştırdı." } }
                    ]
                },

                // Yaş 3
                age_3_ev_1: {
                    id: 'age_3_ev_1', emoji: '💬', title: "İlk Kelimeler",
                    description: "Konuşmaya başladın. Ne diyeceksin?",
                    choices: [
                        { text: "Anne/Baba", nextId: 'age_3_ev_2', step: 1, icon: '❤️', effect: { aileIliski: 10, msg: "İlk kelimen bu oldu, annen gözyaşlarını tutamadı." } },
                        { text: "Süt!", nextId: 'age_3_ev_2', step: 1, icon: '🥛', effect: { guc: 2, msg: "Herkes \"anne\" ya da \"baba\" beklerken sen önceliklerini net koydun: süt." } },
                        { text: "Küfür Et", nextId: 'age_3_ev_2', step: 1, icon: '🤬', effect: { karizma: 5, aileIliski: -20, msg: "İlk kelimen bir küfür oldu. Salon donup kaldı, dayın kahvesini burnundan içti." } }
                    ]
                },
                age_3_ev_2: {
                    id: 'age_3_ev_2', emoji: '🍼', title: "Kayıp Biberon",
                    description: "Biberonunu saklamışlar. Hiçbir yerde yok.",
                    choices: [
                        { text: "Ağla", nextId: 'age_3_ev_3', step: 1, icon: '😭', effect: { enerji: -10, msg: "Ağlamanın hiçbir faydası olmadı." } },
                        { text: "Aramaya Başla", nextId: 'age_3_ev_3', step: 1, icon: '🕵️', effect: { zeka: 3, enerji: -15, msg: "Bulamadın ama artık evin içinde tek başına gezebiliyorsun." } },
                        { text: "İhtiyacım Yok", nextId: 'age_3_ev_3', step: 1, icon: '😎', effect: { karizma: 2, msg: "Karizman arttı. Ama hala bir bebeksin..." } }
                    ]
                },
                age_3_ev_3: {
                    id: 'age_3_ev_3', emoji: '🧸', title: "AVM Krizi",
                    description: "Oyuncak mağazasında inanılmaz bir oyuncak gördün.",
                    choices: [
                        { text: "Kriz Çıkar", nextId: 'age_4_ev_1', step: 1, icon: '😱', effect: { yas: 1, aileIliski: -10, karizma: -2, mutluluk: -5, enerji: -20, msg: "Yerlere yattın, tekme attın; mağazadaki herkes seni izledi, annen kucaklayıp dışarı çıkardı." } },
                        { text: "İçe Çekil", nextId: 'age_4_ev_1', step: 1, icon: '🥺', effect: { yas: 1, zeka: 2, mutluluk: -5, msg: "Oyuncağa uzun uzun baktın, içini çektin ve sessizce yürüyüp gittin." } },
                        { text: "Sevimli Bak", nextId: 'age_4_ev_1', step: 1, icon: '😻', req: { karizma: 30 }, effect: { yas: 1, karizma: 3, mutluluk: 10, msg: "Gözlerini kocaman açıp öyle bir baktın ki annen dayanamayıp oyuncağı aldı." } }
                    ]
                },

                // Yaş 4
                age_4_ev_1: {
                    id: 'age_4_ev_1', emoji: '🚂', title: "Kuzen Terörü",
                    description: "Akraba oturmasında kuzenin en sevdiğin oyuncağı elinden aldı.",
                    choices: [
                        { text: "Pes Et, Ağla", nextId: 'age_4_ev_2', step: 1, icon: '😭', effect: { mutluluk: -10, guc: -2, msg: "Oyuncağını kaptırdın, hıçkıra hıçkıra ağladın, kuzenin umursamadı bile." } },
                        { text: "Geri Çek", nextId: 'age_4_ev_2', step: 1, icon: '😠', effect: { guc: 2, aileIliski: -5, enerji: -10, msg: "Oyuncağı geri çektin, kısa bir çekişme yaşandı, büyükler araya girmek zorunda kaldı." } },
                        { text: "Takas Et", nextId: 'age_4_ev_2', step: 1, icon: '🤝', req: { zeka: 40 }, effect: { zeka: 3, karizma: 2, mutluluk: 10, msg: "Kafanı çalıştırıp kuzeninle akıllıca bir takas yaptın, ikiniz de kazançlı çıktınız." } }
                    ]
                },
                age_4_ev_2: {
                    id: 'age_4_ev_2', emoji: '🏫', title: "Kreş Zamanı",
                    description: "Anne-baban seni bir yere göndermek istiyor.",
                    choices: [
                        { text: "Kabul Et", nextId: 'age_4_ev_3', step: 1, icon: '👍', effect: { okul: 10, aileIliski: 5, msg: "Kreşe gitmeyi kabul ettin, ilk gün ağladın ama sonra yeni arkadaşlar edindin." } },
                        { text: "Evde Kalıcam", nextId: 'age_4_ev_3', step: 1, icon: '🏠', effect: { aileIliski: 15, okul: -5, karizma: -2, msg: "Ayak dirediğinle kaldın, anneannenin yanında evde takılmaya devam ettin." } },
                        { text: "Burs Kazan", nextId: 'age_4_ev_3', step: 1, icon: '🎓', req: { sans: 40 }, effect: { zeka: 5, okul: 25, karizma: 3, msg: "Yaptığın küçük testte gösterdiğin performansla seni özel bir programa aldılar." } }
                    ]
                },
                age_4_ev_3: {
                    id: 'age_4_ev_3', emoji: '🥦', title: "Halilişkonun Rüyası",
                    description: "Masada brokoli var ama sen fast-food istiyorsun.",
                    choices: [
                        { text: "Ağla & İste", nextId: 'age_5_ev_1', step: 1, icon: '🍟', effect: { yas: 1, guc: -3, mutluluk: 15, saglik: -5, msg: "Masayı ayağa kaldırdın, sonunda dönerci arandı; akşam yine fast-food kazandın." } },
                        { text: "Bitir", nextId: 'age_5_ev_1', step: 1, icon: '🍽️', effect: { yas: 1, guc: 3, saglik: 10, mutluluk: -10, msg: "Dişini sıkıp brokolileri bitirdin, annen gururla başını okşadı." } }
                    ]
                },

                // Yaş 5
                age_5_ev_1: {
                    id: 'age_5_ev_1', emoji: '📱', title: "Dijital Emzik",
                    description: "Çizgi film izlemen için sana ekran uzatıldı.",
                    choices: [
                        { text: "Video İzle", nextId: 'age_5_ev_2', step: 1, icon: '👀', effect: { zeka: -3, saglik: -10, mutluluk: 10, enerji: 10, msg: "Saatlerce ekrana kilitlendin, gözlerin yandı ama içerik harikaydı." } },
                        { text: "Sokağa Çık", nextId: 'age_5_ev_2', step: 1, icon: '🏃', effect: { guc: 3, karizma: 3, saglik: 10, enerji: -25, msg: "Ekranı bırakıp sokakta koşturdun, akşam bacakların ağrıyordu ama mutluydun." } }
                    ]
                },
                age_5_ev_2: {
                    id: 'age_5_ev_2', emoji: '🐑', title: "Kurban Bayramı",
                    description: "Eve bir sürü akraba doluştu. Harçlık avı başlasın!",
                    choices: [
                        { text: "Odana Kaç", nextId: 'age_5_ev_3', step: 1, icon: '🚪', effect: { guc: -2, mutluluk: -10, msg: "Kalabalıktan kaçıp odana saklandın, akrabalar \"ne çekingen çocuk\" dedi." } },
                        { text: "Yardım Et", nextId: 'age_5_ev_3', step: 1, icon: '☕', effect: { aileIliski: 10, karizma: 2, guc: 1, enerji: -15, msg: "Çay tepsisini taşıdın, herkes \"aferin sana\" dedi, annen seninle gurur duydu." } },
                        { text: "El Öp (Tur)", nextId: 'age_5_ev_3', step: 1, icon: '💰', req: { karizma: 50 }, effect: { para: 1000, karizma: 3, mutluluk: 15, enerji: -10, msg: "Elden ele dolaşıp herkesin elini öptün, cepler bayram harçlığıyla şişti." } }
                    ]
                },
                age_5_ev_3: {
                    id: 'age_5_ev_3', emoji: '🏖️', title: "Kum Havuzu Mafyası",
                    description: "Parktaki kum havuzunda diğer çocuklar kaleni yıkmak istiyor.",
                    choices: [
                        { text: "Savaş", nextId: 'age_6_ev_1', step: 1, icon: '⚔️', effect: { yas: 1, guc: 2, saglik: -5, mutluluk: -5, enerji: -20, msg: "Kumdan kaleni son ana kadar savundun, üstün başın kum içinde kaldı ama kale ayaktaydı." } },
                        { text: "Kaç", nextId: 'age_6_ev_1', step: 1, icon: '🏃', effect: { yas: 1, karizma: -2, mutluluk: -10, enerji: -5, msg: "Kaleyi bırakıp koşarak uzaklaştın, arkandan kahkahalar duydun." } },
                        { text: "Lider Ol", nextId: 'age_6_ev_1', step: 1, icon: '👑', req: { guc: 30 }, effect: { yas: 1, karizma: 5, mutluluk: 15, msg: "Diğer çocukları ikna edip yanına çektin, kum havuzunun yeni kralı sensin." } }
                    ]
                },

                // Yaş 6
                age_6_ev_1: {
                    id: 'age_6_ev_1', emoji: '🎒', title: "1. Sınıf Sezonu",
                    description: "Okulun ilk günü! Sıranı ve öğretmenini seçeceksin.",
                    choices: [
                        { text: "Arka Sıra", nextId: 'age_6_ev_2', step: 1, icon: '🪑', effect: { okul: 5, karizma: -1, msg: "Arka sırayı kaptın, öğretmen seni pek fark etmedi ama sen de kimseyi rahatsız etmedin." } },
                        { text: "Öğretmenin Gözdesi", nextId: 'age_6_ev_2', step: 1, icon: '🍎', req: { zeka: 40 }, effect: { okul: 15, karizma: 5, zeka: 2, msg: "Ön sırada elini kaldırıp durdun, öğretmen seni sınıfın yıldızı ilan etti." } }
                    ]
                },
                age_6_ev_2: {
                    id: 'age_6_ev_2', emoji: '✏️', title: "Kaybolan Silgi",
                    description: "En sevdiğin kokulu silgini kaybettin.",
                    choices: [
                        { text: "Ağla", nextId: 'age_6_ev_3', step: 1, icon: '😭', effect: { mutluluk: -10, karizma: -1, msg: "Sıranın başına düşüp ağladın, kokulu silgin bir daha çıkmadı." } },
                        { text: "Çal", nextId: 'age_6_ev_3', step: 1, icon: '🥷', effect: { okul: -5, aileIliski: -5, sans: -2, msg: "Yan sıradaki arkadaşınınkini aşırdın, vicdanın seni bütün gün rahatsız etti." } },
                        { text: "Hocadan İste", nextId: 'age_6_ev_3', step: 1, icon: '🙋', req: { karizma: 30 }, effect: { karizma: 2, okul: 2, msg: "Öğretmenden yedek silgi istedin, sana fazladan bir tane daha verdi." } }
                    ]
                },
                age_6_ev_3: {
                    id: 'age_6_ev_3', emoji: '🐕', title: "Köpek Sorunu",
                    description: "Okul yolunda karşına 3 tane başıboş köpek çıktı.",
                    choices: [
                        { text: "Çığlık At, Kaç", nextId: 'age_6_ev_4', step: 1, icon: '😱', effect: { guc: -2, saglik: -10, enerji: -30, msg: "Çığlık atarak koşmaya başladın, köpekler de peşinden koştu, dizin sıyrıldı." } },
                        { text: "Sakin Geç", nextId: 'age_6_ev_4', step: 1, icon: '🚶', effect: { zeka: 2, sans: 1, msg: "Yavaş adımlarla, göz teması kurmadan yanlarından geçtin, köpekler seni umursamadı." } },
                        { text: "Üstlerine Yürü", nextId: 'age_6_ev_4', step: 1, icon: '🦁', req: { guc: 30 }, effect: { guc: 4, karizma: 3, mutluluk: 10, msg: "Korkusuzca üstlerine yürüdün, köpekler şaşırıp geri çekildi." } }
                    ]
                },
                age_6_ev_4: {
                    id: 'age_6_ev_4', emoji: '👻', title: "Tuvalet Canavarı",
                    description: "Okul tuvaletinde canavar olduğu söylentisi var. Çişin geldi.",
                    choices: [
                        { text: "Altına Yap", nextId: 'age_7_ev_1', step: 1, icon: '💦', effect: { yas: 1, karizma: -10, mutluluk: -15, okul: -5, msg: "Dayanamadın, sınıfın ortasında büyük bir olay yaşandı. Lakabın haftalarca peşini bırakmadı." } },
                        { text: "Cesurca Git", nextId: 'age_7_ev_1', step: 1, icon: '🦸', effect: { yas: 1, guc: 3, karizma: 2, msg: "Korkuyu yenip tuvalete gittin, canavar falan yoktu, sadece bozuk bir musluk vardı." } },
                        { text: "Mantıklı Düşün", nextId: 'age_7_ev_1', step: 1, icon: '🧠', req: { zeka: 30 }, effect: { yas: 1, zeka: 3, sans: 2, msg: "Söylentinin mantıksız olduğunu çözüp rahatça işini hallettin." } }
                    ]
                },

                // Yaş 7
                age_7_ev_1: {
                    id: 'age_7_ev_1', emoji: '💵', title: "Şeytandan Şeytan",
                    description: "Bakkal amca yanlışlıkla 100 TL fazla verdi.",
                    choices: [
                        { text: "Cebe At", nextId: 'age_7_ev_2', step: 1, icon: '🤫', effect: { para: 100, sans: -3, msg: "Parayı sessizce cebine attın, bakkal amca fark etmedi ama içinde bir sızı kaldı." } },
                        { text: "İade Et", nextId: 'age_7_ev_2', step: 1, icon: '😇', effect: { karizma: 2, aileIliski: 5, msg: "Parayı geri verdin, bakkal amca gülümseyip sana bedava çikolata uzattı." } },
                        { text: "Hakkını İste", nextId: 'age_7_ev_2', step: 1, icon: '⚖️', req: { zeka: 40 }, effect: { zeka: 3, karizma: 2, para: 50, msg: "Durumu bakkal amcaya net anlattın; hem doğru olanı yaptın hem küçük bir bahşiş kazandın." } }
                    ]
                },
                age_7_ev_2: {
                    id: 'age_7_ev_2', emoji: '👊', title: "Zorba Sınıf Arkadaşı",
                    description: "Arka sıradaki zorba çocuk senden tost paranı istiyor.",
                    choices: [
                        { text: "Parayı Ver", nextId: 'age_7_ev_3', step: 1, icon: '💸', effect: { para: -20, mutluluk: -5, guc: -1, msg: "Tost paranı zorbaya verdin, o gün aç kaldın ama sorun çıkmadı." } },
                        { text: "Karşı Koy", nextId: 'age_7_ev_3', step: 1, icon: '🥊', req: { guc: 30 }, effect: { guc: 3, karizma: 5, saglik: -5, enerji: -20, msg: "Zorbaya karşı durdun, ufak bir itişme oldu ama bir daha seni rahatsız etmedi." } },
                        { text: "Sessizce Hallet", nextId: 'age_7_ev_3', step: 1, icon: '🕵️', req: { zeka: 40 }, effect: { zeka: 2, okul: 5, msg: "Durumu öğretmene akıllıca sızdırdın, zorba fark ettirmeden hizaya geldi." } }
                    ]
                },
                age_7_ev_3: {
                    id: 'age_7_ev_3', emoji: '🎨', title: "Resim Dersi",
                    description: "Öğretmen serbest çalışma verdi.",
                    choices: [
                        { text: "Çöp Adam Çiz", nextId: 'age_7_ev_4', step: 1, icon: '🖍️', effect: { okul: -2, zeka: -1, msg: "Beş dakikada bir çöp adam karaladın, öğretmen \"bu kadar mı\" dedi." } },
                        { text: "Boyama Yap", nextId: 'age_7_ev_4', step: 1, icon: '🖼️', effect: { okul: 3, mutluluk: 5, msg: "Özenle boyadın, resmin sınıf panosunu süsledi." } },
                        { text: "Soyut Sanat", nextId: 'age_7_ev_4', step: 1, icon: '🧑‍🎨', req: { zeka: 40 }, effect: { zeka: 3, okul: 10, karizma: 2, msg: "Kimsenin anlamadığı ama herkesin \"derin\" bulduğu bir eser çıkardın ortaya." } }
                    ]
                },
                age_7_ev_4: {
                    id: 'age_7_ev_4', emoji: '⚽', title: "Hafta Sonu Kursu",
                    description: "Bir kulübe kaydolman gerekiyor.",
                    choices: [
                        { text: "Futbol", nextId: 'age_8_ev_1', step: 1, icon: '🥅', effect: { yas: 1, guc: 5, saglik: 10, enerji: -30, msg: "Sahaya çıktın, top peşinde koştukça koştun, formanda ismin bile yazılı artık." } },
                        { text: "Satranç", nextId: 'age_8_ev_1', step: 1, icon: '♟️', effect: { yas: 1, zeka: 5, okul: 10, enerji: -15, msg: "Tahtanın başına oturdun, taşları hesaplaya hesaplaya kafan gelişti." } },
                        { text: "İkisi Birden", nextId: 'age_8_ev_1', step: 1, icon: '🏆', req: { karizma: 40 }, effect: { yas: 1, zeka: 3, guc: 3, karizma: 3, aileIliski: -5, enerji: -40, msg: "Hem sahaya hem tahtaya koştun, eve bitkin ama gururla döndün." } }
                    ]
                },

                // Yaş 8
                age_8_ev_1: {
                    id: 'age_8_ev_1', emoji: '📚', title: "Kitap Fuarı",
                    description: "Okulda kitap fuarı düzenlenmiş. Yeni bir macera kitabı gördün ve hemen okumak istiyorsun.",
                    choices: [
                        { text: "Kitabı Al", nextId: 'age_8_ev_2', step: 1, icon: '📖', effect: { yas: 1, okul: 10, zeka: 5, mutluluk: 15, msg: "Kitabı aldın ve hemen okumaya başladın. Macera dolu sayfalarla uyku gelmedi!" } },
                        { text: "Kitabı İnade Et", nextId: 'age_8_ev_2', step: 1, icon: '🚫', effect: { yas: 1, karizma: 5, mutluluk: -10, msg: "Kitabı almadan geri kaldın. Arkadaşların \"okumadan ne olacak\" diye gülümsedi." } }
                    ]
                },
                age_8_ev_2: {
                    id: 'age_8_ev_2', emoji: '🔬', title: "Fen Laboratuvarı",
                    description: "Fen dersiyle mikroskop kullandığını gördükten sonra meraklandın.",
                    choices: [
                        { text: "Deney Yap", nextId: 'age_8_ev_3', step: 1, icon: '⚗️', effect: { yas: 1, zeka: 10, okul: 5, mutluluk: 10, msg: "Mikroskopla hücreleri inceledin. Küçük küçük canlılar gördüğün için hayret ettin!" } },
                        { text: "Sınıfı Temizle", nextId: 'age_8_ev_3', step: 1, icon: '🧹', effect: { yas: 1, mutluluk: 5, okul: -5, msg: "Laboratuvar temizliği yaptın. Öğretmen \"temiz bir zeka temiz bir çalışma\" dedi." } }
                    ]
                },
                age_8_ev_3: {
                    id: 'age_8_ev_3', emoji: '🎵', title: "Müzik Kursu",
                    description: "Müzik öğretmeni sınıflara flute kursu açtığını duyurdu.",
                    choices: [
                        { text: "Flute Çal", nextId: 'age_9_ev_1', step: 1, icon: '🎶', effect: { yas: 1, mutluluk: 15, karizma: 10, msg: "Flute çalmayı öğrendin. İlk konserin annen izledi ve gururla övdü." } },
                        { text: "Piyano Denemek", nextId: 'age_9_ev_1', step: 1, icon: '🎹', effect: { yas: 1, mutluluk: 10, zeka: 5, msg: "Piyano tuşlarını denedin. Sesler hoşuma gitti ama flute daha eğlenceli geliyor." } }
                    ]
                },

                // Yaş 9
                age_9_ev_1: {
                    id: 'age_9_ev_1', emoji: '⚽', title: "Okul Takımı Seçimleri",
                    description: "Futbol takımı için试训 yapılıyor. Kandın donuyor ama katılmak istiyorsun.",
                    choices: [
                        { text: "Takımı Deneme", nextId: 'age_9_ev_2', step: 1, icon: '💪', effect: { yas: 1, guc: 10, saglik: 5, mutluluk: 10, enerji: -15, msg: "Kabul ettin! İlk maçın annen tribünden izledi ve haykırdı." } },
                        { text: "Hakem Olmak", nextId: 'age_9_ev_2', step: 1, icon: '🤚', effect: { yas: 1, okul: 5, zeka: 5, mutluluk: 5, msg: "Hakemlik kursuna kaydoldun. Şimdi saat sayarken whistle çalmayı öğreniyorsun." } }
                    ]
                },
                age_9_ev_2: {
                    id: 'age_9_ev_2', emoji: '💻', title: "Bilgisayar Laboratuvarı",
                    description: "Bilgisayar dersiyle ilk kez kod yazmaya başladın.",
                    choices: [
                        { text: "İlk Kodum", nextId: 'age_9_ev_3', step: 1, icon: '</>', effect: { yas: 1, zeka: 15, okul: 10, mutluluk: 20, msg: "\"Merhaba Dünya\" yazdın. Ekrandaki yazılar gördüğün için bağırdın!" } },
                        { text: "Oyun Yapalım", nextId: 'age_9_ev_3', step: 1, icon: '🎮', effect: { yas: 1, mutluluk: 15, zeka: 5, okul: 5, msg: "Basit bir hareket oyunu yaptın. Arkadaşlarınla turno alırken oynadık." } }
                    ]
                },
                age_9_ev_3: {
                    id: 'age_9_ev_3', emoji: '🧪', title: "Fen Fuarı Projesi",
                    description: "Fen fuarı için grup projeleri verildi. Su döngüsü hakkında bir maquett yapacaksın.",
                    choices: [
                        { text: "Maquette Yap", nextId: 'age_10_ev_1', step: 1, icon: '🌊', effect: { yas: 1, zeka: 10, okul: 15, mutluluk: 10, msg: "Su döngüsü maquettin harika oldu. Öğretmen sınıfın önünde sergiledi." } },
                        { text: "Poster Hazırla", nextId: 'age_10_ev_1', step: 1, icon: '📋', effect: { yas: 1, okul: 10, zeka: 5, mutluluk: 5, msg: "Su döngüsü hakkında poster hazırladın. Grup arkadaşlarınla birlikte sundun." } }
                    ]
                },

                // Yaş 10
                age_10_ev_1: {
                    id: 'age_10_ev_1', emoji: '🎒', title: " Ortaokula Hazırlık",
                    description: "5. sınıf son sınavları yaklaşıyor. Ortaokula geçiş için hazırlık yapıyorsun.",
                    choices: [
                        { text: "Sınav Çalış", nextId: 'age_10_ev_2', step: 1, icon: '📝', effect: { yas: 1, okul: 20, zeka: 10, tecrube: 5, msg: "Her gün iki saat ekstra çalıştın. Konular pekiştirildi ve güvendin." } },
                        { text: "Arkadaşla Çalış", nextId: 'age_10_ev_2', step: 1, icon: '👥', effect: { yas: 1, okul: 15, zeka: 5, mutluluk: 15, msg: "Arkadaşının evine giderek grup çalışması yaptın. Konuları birlikte anlattın." } }
                    ]
                },
                age_10_ev_2: {
                    id: 'age_10_ev_2', emoji: '🏆', title: "Başarı Töreni",
                    description: "5. sınıf başarı töreni yapılıyor. Ödüller dağıtılacak.",
                    choices: [
                        { text: "Ödülleri Al", nextId: 'age_10_ev_3', step: 1, icon: '🎖️', effect: { yas: 1, okul: 10, zeka: 5, mutluluk: 20, tecrube: 10, msg: "İlk üç qualifié oldun! Ailen törene geldi ve gururla Fotoğraf çekti." } },
                        { text: "Katılımcı Ol", nextId: 'age_10_ev_3', step: 1, icon: '🙋', effect: { yas: 1, okul: 5, mutluluk: 10, tecrube: 5, msg: "Katılım belgesi aldınız. Ailenle partito yaptınız ve güzel bir gün geçirdiniz." } }
                    ]
                },
                age_10_ev_3: {
                    id: 'age_10_ev_3', emoji: '🎒', title: " Ortaokul Başlangıcı",
                    description: "6. sınıfya geçtik. Yeni öğretmenler, yeni arkadaşlar ve yeni derslerle karşılaştın.",
                    choices: [
                        { text: "Sınıfa Gir", nextId: 'hub_school', step: 1, icon: '🚪', effect: { yas: 1, mutluluk: 15, zeka: 5, okul: 10, msg: "İlk günün harika geçti! Yeni sınıf arkadaşlarınla tanıştın ve derslerine başladın." } },
                        { text: "Henüz Hazır Değil", nextId: 'hub_school', step: 1, icon: '⏳', effect: { yas: 1, mutluluk: 5, zeka: 0, okul: -5, msg: "Henüz yeni sisteme alışamadın ama öğretmen destek oldu ve lentemente geçiyorsun." } }
                    ]
                },

                // --- OKUL ÇAĞI (8+ YAŞ HUB) ---

                // --- OKUL ÇAĞI (8+ YAŞ HUB) ---
                hub_school: {
                    id: 'hub_school', emoji: '🎒', title: "İlköğretim",
                    description: `Okul yılları. Dersler ve oyun arasında denge kur.`,
                    choices: [
                        { text: "Ders Çalış", nextId: 'hub', step: 1, icon: '📚', effect: withMsg({ okul: 15, zeka: 2, enerji: -20, tecrube: 5 }, ["Kitapların başına çöktün, gözlerin sulanana kadar çalıştın.", "Ödevleri bitirdin, defterlerin tertemiz oldu.", "Konuyu tekrar tekrar okudun, sonunda kafana oturdu."]) },
                        { text: "Spor Yap", nextId: 'hub', step: 1, icon: '⚽', effect: withMsg({ guc: 5, saglik: 5, enerji: -30, mutluluk: 15 }, ["Teneffüste top koşturdun, forman terden değişti.", "Beden dersinde herkesten çok koştun, nefes nefese kaldın.", "Sahada kendini kanıtladın, arkadaşların takım kaptanı seçti."]) },
                        { text: "Oyun Oyna", nextId: 'hub', step: 1, icon: '🎮', effect: withMsg({ mutluluk: 15, okul: -5, enerji: -10 }, ["Teneffüste saklambaç oynadın, saatler nasıl geçti anlamadın.", "Bilgisayar oyununa daldın, ödevleri unuttun.", "Arkadaşlarınla oyun oynayıp doyasıya güldün."]) },
                        { text: "Dinlen", nextId: 'hub', step: 1, icon: '🛌', effect: withMsg({ enerji: 40, saglik: 5 }, ["Ders arasında kafanı sıraya koyup şekerleme yaptın.", "Bahçede bankta oturup biraz nefes aldın.", "Eve gider gitmez yatağa uzanıp dinlendin."]) }
                    ]
                },
                // --- ERGENLİK ---
                hub_teen: {
                    id: 'hub_teen', emoji: '🎧', title: "Ergenlik",
                    description: `Sınav stresi, hormonlar ve asilik...`,
                    choices: [
                        { text: "Sınava Kas", nextId: 'hub', step: 1, icon: '📖', effect: withMsg({ okul: 20, zeka: 3, enerji: -30, tecrube: 15 }, ["Gece geç saate kadar test çözdün, gözlerin kan çanağına döndü.", "Ders kitaplarını kurcaladın, kahve fincanların bitmek bilmedi.", "Konuları özetleyip tekrar tekrar çalıştın, kafan artık dolu."]) },
                        { text: "Sosyalleş", nextId: 'hub', step: 1, icon: '🍕', req: { para: 50 }, effect: withMsg({ para: -50, karizma: 2, mutluluk: 20, enerji: -15 }, ["Arkadaşlarla dışarı çıktın, hesap gelince herkes cebini karıştırdı.", "Kafede saatlerce sohbet edip gündemi kapattınız.", "Grup dışarı çıktı, sen de tabii ki hazırdın."]) },
                        { text: "Spor Yap", nextId: 'hub', step: 1, icon: '🏋️', effect: withMsg({ guc: 5, saglik: 10, enerji: -40 }, ["Salona gidip ter attın, aynadaki değişimi fark etmeye başladın.", "Koşuya çıktın, kulağındaki müzikle kilometreler geride kaldı.", "Antrenman sonrası kaslar ağrıyor ama için rahat."]) },
                        { text: "Uyu", nextId: 'hub', step: 1, icon: '💤', effect: withMsg({ enerji: 50, saglik: 10 }, ["Telefonu bırakıp erkenden yattın, ertesi gün taze uyandın.", "Uzun bir gece uykusuyla enerjini topladın.", "Battaniyeye sarılıp kendini dünyadan soyutladın."]) }
                    ]
                },
                // --- YETİŞKİNLİK ---
                hub_adult: {
                    id: 'hub_adult', emoji: '🏢', title: "Yetişkinlik",
                    description: `Hayat mücadelesi. İş, güç, sorumluluk.`,
                    choices: [
                        { text: "Çalış (Mesai)", nextId: 'adult_work', step: 1, icon: '💼' },
                        { text: "Spora Git", nextId: 'hub', step: 1, icon: '🏃', effect: withMsg({ guc: 5, saglik: 10, enerji: -40 }, ["İşten çıkar çıkmaz spor salonuna koştun, terin damla damla aktı.", "Koşu bandında kilometreler yaktın, stres de yanında gitti.", "Ağırlıkları kaldırdın, aynadan memnun ayrıldın."]) },
                        { text: "Gelişim", nextId: 'hub', step: 1, icon: '📈', effect: withMsg({ zeka: 3, tecrube: 20, enerji: -25 }, ["Bir kurs kaydı yaptırıp yeni bir şey öğrendin.", "Alanınla ilgili bir kitap bitirdin, kafan yeni fikirlerle doldu.", "Bir sertifika programına başladın, kariyerine yatırım yaptın."]) },
                        { text: "Dinlen", nextId: 'hub', step: 1, icon: '☕', effect: withMsg({ enerji: 60, saglik: 10, mutluluk: 5 }, ["Kanepeye uzanıp bir kahve eşliğinde günü kapattın.", "Telefonu bırakıp sessizce dinlendin, omuzların gevşedi.", "Uzun bir sıcak duş aldın, yorgunluk üzerinden akıp gitti."]) }
                    ]
                },
                adult_work: {
                    id: 'adult_work', emoji: '💵', title: "Maaş Günü",
                    description: "Bütün ay çalıştın ve yoruldun.",
                    effect: (s) => {
                        const maas = calculateSalary(s);
                        return { effect: { para: maas, enerji: -60, tecrube: 10 }, msg: `${maas}₺ kazandın.` };
                    },
                    choices: [{ text: "Devam", nextId: 'hub', step: 0, icon: '👍' }]
                },

                // --- YETİŞTİRME YURDU (Barınma: Yurt) ---
                kicked_out_young: {
                    id: 'kicked_out_young', emoji: '🚪', title: "Evden Atıldın!",
                    description: "Ailenle ipler koptu! Yaşın küçük olduğu için Yetiştirme Yurdu'na alındın.",
                    effect: withMsg({ barinma: 'yurt', okul: -10, mutluluk: -50 }, "Ailenle aranız iyice bozuldu, sosyal hizmetler seni yetiştirme yurduna teslim etti."),
                    choices: [{ text: "Kabullen", nextId: 'hub', step: 0, icon: '😔' }]
                },
                hub_orphanage: {
                    id: 'hub_orphanage', emoji: '🏢', title: "Yetiştirme Yurdu",
                    description: `Kurallara uymak zorundasın.`,
                    choices: [
                        { text: "Ders Çalış", nextId: 'hub', step: 1, icon: '📚', effect: withMsg({ okul: 15, enerji: -20, tecrube: 5 }, ["Yurdun küçük kütüphanesine kapanıp çalıştın.", "Ödevlerini bitirip nöbetçi bakıcıdan takdir aldın.", "Sessiz köşende kitaplara gömüldün."]) },
                        { text: "Kavga Et", nextId: 'hub', step: 1, icon: '🥊', effect: withMsg({ saglik: -15, guc: 2, okul: -10, enerji: -30 }, ["Koğuştaki bir çocukla kapıştın, ikiniz de nöbetçiden azar işittiniz.", "Ufak bir tartışma büyüdü, yumruklar havada uçuştu.", "Kavga bitince ikiniz de yerde oturup nefes nefese kaldınız."]) },
                        { text: "Gizlice Uyu", nextId: 'hub', step: 1, icon: '🛌', effect: withMsg({ enerji: 40, saglik: 5 }, ["Battaniyenin altına saklanıp nöbetçiden gizlice uyudun.", "Işıklar sönmeden gözlerini kapattın, kimse fark etmedi.", "Yorganın altında saklanıp uyumaya çalıştın."]) }
                    ]
                },
                orphanage_leave: {
                    id: 'orphanage_leave', emoji: '🎒', title: "Yurttan Ayrılış",
                    description: "18 yaşına bastın. Devlet yurdundan ayrılma vakti geldi. Sokaklardasın.",
                    effect: withMsg({ barinma: 'sokak', para: 500 }, "Devlet sana biraz harçlık verdi ve kapıyı gösterdi. Artık kendi başınasın."),
                    choices: [{ text: "Hayata Atıl", nextId: 'hub', step: 0, icon: '🚶' }]
                },

                // --- SOKAK / EVSİZ (Barınma: Sokak) ---
                kicked_out_adult: {
                    id: 'kicked_out_adult', emoji: '🏚️', title: "Kapı Dışarı!",
                    description: "Ailen seni evden kovdu. Artık sokaktasın.",
                    effect: withMsg({ barinma: 'sokak', mutluluk: -50 }, "Eşyalarını topla dediler, kapı suratına kapandı. Artık sokaktasın."),
                    choices: [{ text: "Tamam", nextId: 'hub', step: 0, icon: '🌧️' }]
                },
                hub_street: {
                    id: 'hub_street', emoji: '🗑️', title: "Sokak Hayatı",
                    description: `Sokakta yaşamak çok yıpratıcı.`,
                    choices: [
                        { text: "Dilencilik", nextId: 'hub', step: 1, icon: '🤲', effect: withMsg({ para: 50, mutluluk: -15, enerji: -20 }, ["Kaldırımda oturup geçenlerden yardım istedin, cebine biraz bozukluk düştü.", "Bir köşeye çöküp bekledin, birkaç kişi acıyıp para bıraktı.", "Sokakta uzun saatler geçirdin, akşam eline az da olsa para geçti."]) },
                        { text: "Günlük İş", nextId: 'hub', step: 1, icon: '🧱', effect: withMsg({ para: 150, saglik: -10, enerji: -50 }, ["İnşaatta günlük işçi olarak çalıştın, sırtın kırıldı ama cebin doldu.", "Ağır yükler taşıdın, akşam bitkin düştün ama para kazandın.", "Bir esnafa yardım ettin, karşılığında biraz para aldın."]) },
                        { text: "Uyu", nextId: 'hub', step: 1, icon: '💤', effect: withMsg({ enerji: 30, saglik: -5 }, ["Bir köprü altında, gazete kağıtlarına sarılıp uyumaya çalıştın.", "Soğuk kaldırımda gözlerini kapattın, sabah üşüyerek uyandın.", "Bulduğun bir kutuya sığınıp gözlerini yumdun."]) },
                        { text: "Ev Tut", nextId: 'rent_house', step: 1, icon: '🏠', req: { para: 2000 } }
                    ]
                },
                rent_house: {
                    id: 'rent_house', emoji: '🔑', title: "Yeni Bir Ev",
                    description: "Sonunda yeterince para biriktirdin ve kendine ait küçük bir ev kiraladın! Artık sokakta değilsin.",
                    effect: withMsg({ para: -2000, barinma: 'kendi_evi', mutluluk: 50, saglik: 20 }, "Anahtarı eline aldığında içindeki gurur duygusunu hiç unutmayacaksın."),
                    choices: [{ text: "Harika!", nextId: 'hub', step: 0, icon: '🎉' }]
                },

                // --- GAME OVER EKRANLARI ---
                game_over_money: {
                    id: 'game_over_money', emoji: '💸', title: "İFLAS",
                    description: "Borç batağına saplandın. Tutunamadın...",
                    isGameOver: true, choices: [{ text: "Menüye Dön", nextId: 'menu', icon: '🏠' }]
                },
                game_over_health: {
                    id: 'game_over_health', emoji: '🚑', title: "ÖLDÜN",
                    description: "Vücudun iflas etti.",
                    isGameOver: true, choices: [{ text: "Menüye Dön", nextId: 'menu', icon: '🏠' }]
                }
            };

            // Etkileşimli rastgele olayları EVENTS objesine ekle
            INTERACTIVE_RANDOM_EVENTS.forEach(ev => { EVENTS[ev.id] = ev; });

            // Menü Şehir Seçimi Havuzu Oluşturma
