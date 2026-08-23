const EVENTS = {
                // --- 0-15 YAŞ LİNER HİKAYE ZİNCİRİ ---
                // Yaş 0
                age_0_ev_1: {
                    id: 'age_0_ev_1', emoji: '👶', title: "0 Yaş",
                    description: "Dünyaya geldin, hâlâ ne olduğunu anlamıyorsun.",
                    choices: [
                        { text: "Ağla", nextId: 'age_1_ev_1', step: 1, icon: '🍼', effect: { yas: 1, mutluluk: -5, msg: "Ağlayarak ihtiyaçlarını belirttin, annen seni buldu." } },
                        { text: "Gülümse", nextId: 'age_1_ev_1', step: 1, icon: '😊', effect: { yas: 1, mutluluk: 5, msg: "Hafif bir gülümsemeyle annenin güveni kazandın." } }
                    ]
                },

                // Yaş 1
                age_1_ev_1: {
                    id: 'age_1_ev_1', emoji: '🚶', title: "1 Yaş",
                    description: "İlk adımlarını attınız, eve dolaşmaya başlıyorsunuz.",
                    choices: [
                        { text: "Yürümeyi Öğren", nextId: 'age_2_ev_1', step: 1, icon: '👣', effect: { yas: 1, guc: 2, mutluluk: 10, msg: "Ayaklarınızı sıcak tuttunuz, artık ev içinde rahatça dolaşabiliyorsunuz." } },
                        { text: "Söylemeyi Deneme", nextId: 'age_2_ev_1', step: 1, icon: '💬', effect: { yas: 1, zeka: 2, mutluluk: 5, msg: "İlk kelimenizi \"anna\" gibi basit seslerle ifade etmeye çalıştınız." } }
                    ]
                },

                // Yaş 2
                age_2_ev_1: {
                    id: 'age_2_ev_1', emoji: '🧒', title: "2 Yaş",
                    description: "Sözlüğünüz gelişmeye başlıyor, çevrinizi keşfetmeyi seviyorsunuz.",
                    choices: [
                        { text: "Bloklarla Oyna", nextId: 'age_3_ev_1', step: 1, icon: '🧱', effect: { yas: 1, zeka: 3, mutluluk: 15, msg: "Bloklarla kule yaparak uzaysal düşüncenizi geliştirdiniz." } },
                        { text: "Topla At", nextId: 'age_3_ev_1', step: 1, icon: '⚽', effect: { yas: 1, guc: 3, mutluluk: 10, msg: "Topla oynayarak koordinasyonunuz ve refleksleriniz gelişti." } }
                    ]
                },

                // Yaş 3
                age_3_ev_1: {
                    id: 'age_3_ev_1', emoji: '🎒', title: "3 Yaş",
                    description: "İlk kez anaokuluna gittiğiniz gün, yeni arkadaşlar edinmeyi umutla bekliyorsunuz.",
                    choices: [
                        { text: "Anaokuluna Git", nextId: 'age_4_ev_1', step: 1, icon: '👧', effect: { yas: 1, okul: 5, mutluluk: 10, msg: "Öğretmeniniz hoş karşıladı, yeni arkadaşlarınızla oyuncağla oynadınız." } },
                        { text: "Evde Kal", nextId: 'age_4_ev_1', step: 1, icon: '🏠', effect: { yas: 1, mutluluk: 5, okul: -5, msg: "Anne-babanızla evde zaman geçirdiniz, fakat arkadaşlık yapma fırsatını kaçırdınız." } }
                    ]
                },

                // Yaş 4
                age_4_ev_1: {
                    id: 'age_4_ev_1', emoji: '🤝', title: "4 Yaş",
                    description: "Paylaşmayı ve başkalarına saygı göstermeyi öğrenmeye başlıyorsunuz.",
                    choices: [
                        { text: "Oyuncağını Paylaş", nextId: 'age_5_ev_1', step: 1, icon: '🧸', effect: { yas: 1, karizma: 3, mutluluk: 10, aileIliski: 5, msg: "Arkadaşınızla oyuncağınızı paylaştınız, beraber bir kaset inşa ettiniz." } },
                        { text: "Kendine Davet Et", nextId: 'age_5_ev_1', step: 1, icon: '🙅‍♂️', effect: { yas: 1, mutluluk: -5, karizma: -2, msg: "Oyuncağınızı tek başınıza tuttunuz, fakat biraz kendi dünyanızda kaldınız." } }
                    ]
                },

                // Yaş 5
                age_5_ev_1: {
                    id: 'age_5_ev_1', emoji: '🚲', title: "5 Yaş",
                    description: "İlk kez iki tekerlekli bisiklete binmeye karar veriyorsunuz.",
                    choices: [
                        { text: "Bisikleti Deneme", nextId: 'age_6_ev_1', step: 1, icon: '🚴‍♂️', effect: { yas: 1, guc: 4, mutluluk: 15, msg: "Birkaç kez düştünüz fakat sonunda dengeyi buldunuz, ailesiniz gururla İzledi." } },
                        { text: "Üç Tekerlekliye Bağlı Kal", nextId: 'age_6_ev_1', step: 1, icon: '🚲', effect: { yas: 1, guc: 2, mutluluk: 5, msg: "Güvenli olan üç tekerlekli bisikletinizle yardımcı olsansız, hâlâ ikiliye geçmeye hazır değilsiniz." } }
                    ]
                },

                // Yaş 6
                age_6_ev_1: {
                    id: 'age_6_ev_1', emoji: '📚', title: "6 Yaş",
                    description: "İlkokulünüzün ilk günü, tembel kağıt ve yeni bir başlangıç."
                    ,
                    choices: [
                        { text: "İlkokula Kayıt Ol", nextId: 'age_7_ev_1', step: 1, icon: '🏫', effect: { yas: 1, okul: 10, mutluluk: 10, msg: "Öğretmeniniz adınızı okudu, sınıfınızla tanıştınız, ilk dersiniz güzel geçti." } },
                        { text: "Henüz Okul Değil", nextId: 'age_7_ev_1', step: 1, icon: '⏳', effect: { yas: 1, okul: -5, mutluluk: 5, msg: "Aileniz sizi bir yıl daha evde tutmaya karar verdi, fakat okula olan merakınız hâlâ var." } }
                    ]
                },

                // Yaş 7
                age_7_ev_1: {
                    id: 'age_7_ev_1', emoji: '🔠', title: "7 Yaş",
                    description: "Okuma ve yazma becerilerinizi geliştirmeye başlıyorsunuz."
                    ,
                    choices: [
                        { text: "Harfleri Öğren", nextId: 'age_8_ev_1', step: 1, icon: '🔤', effect: { yas: 1, zeka: 8, okul: 5, mutluluk: 10, msg: "Harfleri birleştirecek şekilde okurken, ilk cümlelerinizi kurmaya başladınız." } },
                        { text: "Resimle Anlat", nextId: 'age_8_ev_1', step: 1, icon: '🎨', effect: { yas: 1, mutluluk: 8, okul: 3, msg: "Henüz yazmak zorunda hissetmediğiniz için, duygularınızı boya kağıdına dökmeye karar verdiniz." } }
                    ]
                },

                // Yaş 8
                age_8_ev_1: {
                    id: 'age_8_ev_1', emoji: '⚽', title: "8 Yaş",
                    description: "Okul kulüplerinden birine katılmak için deneyorsunuz."
                    ,
                    choices: [
                        { text: "Spor Kulübü", nextId: 'age_9_ev_1', step: 1, icon: '🏃‍♀️', effect: { yas: 1, guc: 5, saglik: 5, mutluluk: 10, msg: "Futbol takımı seçtiniz, antrenmanlarda takım çalışması ve disiplin öğrendiniz." } },
                        { text: "Sanat Kulübü", nextId: 'age_9_ev_1', step: 1, icon: '🎭', effect: { yas: 1, mutluluk: 8, karizma: 5, okul: 3, msg: "Resim ve Drama kulübüne katıldınız, yaratıcı enerjinizi serbest bırakmaya başladınız." } }
                    ]
                },

                // Yaş 9
                age_9_ev_1: {
                    id: 'age_9_ev_1', emoji: '🔬', title: "9 Yaş",
                    description: "Fen fuarı için bir proje hazırlamanız gerekiyor."
                    ,
                    choices: [
                        { text: "Su Dönüşü Maquette", nextId: 'age_10_ev_1', step: 1, icon: '💧', effect: { yas: 1, zeka: 7, okul: 10, mutluluk: 12, msg: "Su döngüsü maquettenizi öğretmen beğendi, sınıf önünde sergilendi." } },
                        { text: "Uzay Sistemleri Poster", nextId: 'age_10_ev_1', step: 1, icon: '🪐', effect: { yas: 1, zeka: 5, okul: 8, mutluluk: 8, msg: "Güneş sistemini anlatan renkli posterinizi hazırladınız, arkadaşlarınızla birlikte sundunuz." } }
                    ]
                },

                // Yaş 10
                age_10_ev_1: {
                    id: 'age_10_ev_1', emoji: '🎓', title: "10 Yaş",
                    description: "İlkokulünüzün son yılı, ortaokula geçiş için hazırlık yapıyorsunuz."
                    ,
                    choices: [
                        { text: "Ders Çalışma Programı", nextId: 'age_11_ev_1', step: 1, icon: '📖', effect: { yas: 1, okul: 12, zeka: 8, tecrube: 5, mutluluk: 5, msg: "Her gün bir saat ekstra çalışarak temel konuları pekiştirdiniz, güvendiniz." } },
                        { text: "Arkadaşla Proje", nextId: 'age_11_ev_1', step: 1, icon: '👥', effect: { yas: 1, okul: 10, zeka: 5, mutluluk: 10, tecrube: 3, msg: "Arkadaşınızla birlikte bir fen projesi yaptınız, iş birliği ve paydaşlık öğrendiniz." } }
                    ]
                },

                // Yaş 11
                age_11_ev_1: {
                    id: 'age_11_ev_1', emoji: '🏫', title: "11 Yaş",
                    description: "Ortaokulunuzun ilk günü, yeni bir bölüm ve yeni öğretmenler."
                    ,
                    choices: [
                        { text: "Ortaokula Kayıt Ol", nextId: 'age_12_ev_1', step: 1, icon: '🚪', effect: { yas: 1, okul: 10, mutluluk: 10, msg: "Yeni sınıf arkadaşlarınızla tanıştınız, dersler ilginç ve zorlayıcı başladı." } },
                        { text: "Henüz Hazır Değil", nextId: 'age_12_ev_1', step: 1, icon: '⏳', effect: { yas: 1, okul: -5, mutluluk: 5, msg: "Ortaokul sistemine hâlâ alışamadınız fakat öğretmenlerin desteği sayesinde lentelerle geçiş yapıyorsunuz." } }
                    ]
                },

                // Yaş 12
                age_12_ev_1: {
                    id: 'age_12_ev_1', emoji: '🌱', title: "12 Yaş",
                    description: "Erken puberte belirtileriyle başbaşa kalıyorsunuz, bedeniniz ve duygualarınız değişiyor."
                    ,
                    choices: [
                        { text: "Ailele Konuş", nextId: 'age_13_ev_1', step: 1, icon: '💬', effect: { yas: 1, aileIliski: 8, mutluluk: 5, msg: "Ailenizle duygualarınızı paylaştınız, anlayış ve destek hissettiniz." } },
                        { text: "Bir Notebook Tut", nextId: 'age_13_ev_1', step: 1, icon: '📓', effect: { yas: 1, zeka: 3, mutluluk: -5, tecrube: 2, msg: "Duygularınızı bir deftere not alarak izlemeye başladınız, bu da kendinizi daha iyi anlamanıza yardımcı oldu." } }
                    ]
                },

                // Yaş 13
                age_13_ev_1: {
                    id: 'age_13_ev_1', emoji: '💘', title: "13 Yaş",
                    description: "İlk çocukluğa ilişkin bir çarpışma veya zaukal hissetmeye başlıyorsunuz."
                    ,
                    choices: [
                        { text: "Sınıf Arkadaşına Yaklaş", nextId: 'age_14_ev_1', step: 1, icon: '👦', effect: { yas: 1, karizma: 6, mutluluk: 10, aileIliski: -3, msg: "Sınıf arkadaşınızla kısa bir sohbet ettiniz, bir birinizi daha iyi anlama çabasını gösterdiniz." } },
                        { text: "Odada Zaman Geçir", nextId: 'age_14_ev_1', step: 1, icon: '🚪', effect: { yas: 1, mutluluk: -5, karizma: -3, msg: "Kendinizi biraz izole ettiniz, duygusal dengeyi bulmak için kendiyle zaman geçirdiniz." } }
                    ]
                },

                // Yaş 14
                age_14_ev_1: {
                    id: 'age_14_ev_1', emoji: '📚', title: "14 Yaş",
                    description: "Liseye hazırlık sınavları (LGS) için yoğun bir çalışma dönemine giriyorsunuz."
                    ,
                    choices: [
                        { text: "Yoğun Çalışma", nextId: 'age_15_ev_1', step: 1, icon: '⏰', effect: { yas: 1, okul: 15, zeka: 12, tecrube: 8, mutluluk: -10, msg: "Her gün iki saat ekstra çalışarak matematik ve Türkçe konularını pekiştirdiniz, endişeniz azaldı." } },
                        { text: "Dinlenme ve Sosyalleşme", nextId: 'age_15_ev_1', step: 1, icon: '🌿', effect: { yas: 1, mutluluk: 8, tecrube: 3, okul: 5, msg: "Aile ve arkadaşlarınızla zaman geçirerek stresinizi azaldınız, hâlâ ilerleme kaydettiniz." } }
                    ]
                },

                // Yaş 15
                age_15_ev_1: {
                    id: 'age_15_ev_1', emoji: '🎒', title: "15 Yaş",
                    description: "Ortaokulunuzun son yılı, liseye yönelik bir karar vermeniz gerekiyor.",
                    choices: [
                        { text: "Fen Lisesi Seç", nextId: 'age_16_ev_1', step: 1, icon: '🔬', effect: { yas: 1, okul: 10, zeka: 15, tecrube: 5, mutluluk: 5, msg: "Fen ve matematik yoğun olan liseyi seçtiniz, bilim kariyerinizi şekillendirecek bir temel kazandınız." } },
                        { text: "Sosyal Lisesi Seç", nextId: 'age_16_ev_1', step: 1, icon: '👥', effect: { yas: 1, okul: 8, zeka: 8, tecrube: 4, mutluluk: 8, msg: "İnsan ilişkileri ve sanat odaklı liseyi tercih ettiniz, insanlar ve toplum hakkında derinlemesine bilgi sahibi oldunuz." } }
                    ]
                },

                // Yaş 16
                age_16_ev_1: {
                    id: 'age_16_ev_1', emoji: '🏫', title: "16 Yaş",
                    description: "Lisenizin ilk yılında yeni ortamaya uyum sağlıyorsunuz.",
                    choices: [
                        { text: "Kulüp Katıl", nextId: 'age_17_ev_1', step: 1, icon: '🏃‍♀️', effect: { yas: 1, karizma: 5, mutluluk: 10, enerji: -5, msg: "Basketbol kulübüne katıldınız, yeni arkadaşlar edindiniz ve takım çalışmanızı geliştirdiniz." } },
                        { text: "Derslere Odaklan", nextId: 'age_17_ev_1', step: 1, icon: '📖', effect: { yas: 1, okul: 10, zeka: 5, mutluluk: -5, msg: "Derslere ekstra zaman ayırarak zorlandığınız konuları pekiştirdiniz, ders başarılarınızı artırdınız." } }
                    ]
                },

                // Yaş 17
                age_17_ev_1: {
                    id: 'age_17_ev_1', emoji: '📚', title: "17 Yaş",
                    description: "Lisenizin ikinci yılında universitaireye hazırlık başlıyor.",
                    choices: [
                        { text: "Özel Ders Al", nextId: 'age_18_ev_1', step: 1, icon: '👓', effect: { yas: 1, okul: 15, zeka: 10, para: -50, mutluluk: -10, msg: "Matematik ve Fizik için özel ders alarak zorlu konuları anlamaya başladınız, ücret ödediniz." } },
                        { text: "Arkadaşlarla Çıktı", nextId: 'age_18_ev_1', step: 1, icon: '🍕', effect: { yas: 1, mutluluk: 15, karizma: 5, okul: -5, enerji: -10, msg: "Hafta sonu arkadaşlarınızla kafede zaman geçirdiğiniz için stresiniz azaldı ama ders çalışmanız etkisiz kaldı." } }
                    ]
                },

                // Yaş 18
                age_18_ev_1: {
                    id: 'age_18_ev_1', emoji: '🎓', title: "18 Yaş",
                    description: "Lisenizin son yılı, universitelerine sınav sonuçları bekleniyor.",
                    choices: [
                        { text: "Üniversite Hazırlığı", nextId: 'age_19_ev_1', step: 1, icon: '⏰', effect: { yas: 1, okul: 20, zeka: 15, tecrube: 5, mutluluk: -15, enerji: -20, msg: "YKS hazırlıkları için yoğun bir programa girdiniz, her gün birden fazla test çözdünüz." } },
                        { text: "Sosyal Aktiviteler", nextId: 'age_19_ev_1', step: 1, icon: '🎉', effect: { yas: 1, mutluluk: 20, karizma: 10, tecrube: 3, okul: -10, msg: "Okul düzenlediği konserde ve etkinliklerde aktif rol oynadınız, arkadaş ağınız genişledi." } }
                    ]
                },

                // Yaş 19
                age_19_ev_1: {
                    id: 'age_19_ev_1', emoji: '🏢', title: "19 Yaş",
                    description: "Üniversitenizin ilk yılında yeni bir şehirde yaşıyor olabilirsiniz.",
                    choices: [
                        { text: "Yurt Hayatı", nextId: 'age_20_ev_1', step: 1, icon: '🏫', effect: { yas: 1, mutluluk: 10, aileIliski: -5, para: -300, tecrube: 5, msg: "Üniversite yurtunda odada arkadaşınızla paylaştınız, yeni kültürlerle tanıştınız." } },
                        { text: "Evde Kal", nextId: 'age_20_ev_1', step: 1, icon: '🏠', effect: { yas: 1, aileIliski: 10, mutluluk: 5, para: 200, okul: 5, msg: "Ailenizin evinde kalarak aile ile daha fazla zaman geçirdiniz, hem ders çalışmanızı yaptınız hem de ev işlerine katkı sağladınız." } }
                    ]
                },

                // Yaş 20
                age_20_ev_1: {
                    id: 'age_20_ev_1', emoji: '💼', title: "20 Yaş",
                    description: "Üniversitenizin ikinci yılında, mesleki hedefleriniz daha netleşiyor.",
                    choices: [
                        { text: "Staj Başvuru", nextId: 'hub_adult', step: 1, icon: '📄', effect: { yas: 1, tecrube: 15, okul: 10, zeka: 5, mutluluk: 5, para: -20, msg: "İlgili alanınızda staj pozisyonu için başvuru yaptınız, bazı firmalardan olumlu yanıt bekliyorsunuz." } },
                        { text: "Yarı Zamanlı İş", nextId: 'hub_adult', step: 1, icon: '💰', effect: { yas: 1, para: 300, tecrube: 10, enerji: -20, mutluluk: -5, okul: -5, msg: "Üniversite yanınızda bir kafe'de yarı zamanlı çalıştınız, ekstra kazancınız sayesinde bazı ihtiyaçlarınızı karşılayabildiniz." } }
                    ]
                },

                // --- OKUL ÇAĞI (15+ YAŞ HUB) ---
                hub_school: {
                    id: 'hub_school', emoji: '🎒', title: "Lise",
                    description: `Lise yılları. Derinlemesine öğrenme ve kariyer planlaması.`,
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
                        { text: "Uyu": nextId: 'hub', step: 1, icon: '💤', effect: withMsg({ enerji: 50, saglik: 10 }, ["Telefonu bırakıp erkenden yattın, ertesi gün taze uyandın.", "Uzun bir gece uykusuyla enerjini topladın.", "Battaniyeye sarılıp kendini dünyadan soyutladın."]) }
                    ]
                },
                // --- YETİŞKİNLİK ---
                hub_adult: {
                    id: 'hub_adult', emoji: '🏢', title: "Yetişkinlik",
                    description: `Hayat mücadelesi. İş, güç, sorumluluk.`,
                    choices: [
                        { text: "Çalış (Mesai)", nextId: 'adult_work', step: 1, icon: '💼' },
                        { text: "Spora Git": nextId: 'hub', step: 1, icon: '🏃', effect: withMsg({ guc: 5, saglik: 10, enerji: -40 }, ["İşten çıkar çıkmaz spor salonuna koştun, terin damla damla aktı.", "Koşu bandında kilometreler yaktın, stres de yanında gitti.", "Ağırlıkları kaldırdın, aynadan memnun ayrıldın."]) },
                        { text: "Gelişim": nextId: 'hub', step: 1, icon: '📈', effect: withMsg({ zeka: 3, tecrube: 20, enerji: -25 }, ["Bir kurs kaydı yaptırıp yeni bir şey öğrendin.", "Alanınla ilgili bir kitap bitirdin, kafan yeni fikirlerle doldu.", "Bir sertifika programına başladın, kariyerine yatırım yaptın."]) },
                        { text: "Dinlen": nextId: 'hub', step: 1, icon: '☕', effect: withMsg({ enerji: 60, saglik: 10, mutluluk: 5 }, ["Kanepeye uzanıp bir kahve eşliğinde günü kapattın.", "Telefonu bırakıp sessizce dinlendin, omuzların gevşedi.", "Uzun bir sıcak duş aldın, yorgunluk üzerinden akıp gitti."]) }
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
                    effect: withMsg({ barinma: 'yurt', okul: -10, mutluluk: -50 }, "Ailenle aranız iyice bozuldu, sosyal hizmetler seni yetiştirme yurdu'na teslim etti."),
                    choices: [{ text: "Kabullen", nextId: 'hub', step: 0, icon: '😔' }]
                },
                hub_orphanage: {
                    id: 'hub_orphanage', emoji: '🏢', title: "Yetiştirme Yurdu",
                    description: `Kurallara uymak zorundasın.`,
                    choices: [
                        { text: "Ders Çalış", nextId: 'hub', step: 1, icon: '📚', effect: withMsg({ okul: 15, enerji: -20, tecrube: 5 }, ["Yurdun küçük kütüphanesine kapanıp çalıştın.", "Ödevlerini bitirip nöbetçi bakıcıdan takdir aldın.", "Sessiz köşende kitaplara gömüldün."]) },
                        { text: "Kavga Et": nextId: 'hub', step: 1, icon: '🥊', effect: withMsg({ saglik: -15, guc: 2, okul: -10, enerji: -30 }, ["Koğuştaki bir çocukla kapıştın, ikinizde nöbetçiden azar işittiniz.", "Ufak bir tartışma büyüdü, yumruklar havada uçuştu.", "Kavga bitince ikinizde yerde oturup nefes nefese kaldınız."]) },
                        { text: "Gizlice Uyu": nextId: 'hub', step: 1, icon: '🛌', effect: withMsg({ enerji: 40, saglik: 5 }, ["Battaniyenin altına saklanıp nöbetçiden gizlice uyudun.", "Işıklar sönmeden gözlerini kapattın, kimse fark etmedi.", "Yorganın altında saklanıp uyumaya çalıştın."]) }
                    ]
                },
                orphanage_leave: {
                    id: 'orphanage_leave', emoji: '🎒', title: "Yurttan Ayrılış",
                    description: "18 yaşına bastın. Devlet yurdundan ayrılma vakti geldi. Sokaklardasın.",
                    effect: withMsg({ barinma: 'sokak', para: 500 }, "Devlet sana biraz harçlık verdi ve kapıyı gösterdi. Artık kendi başınasın."),
                    choices: [{ text: "Hayata Atıl": nextId: 'hub', step: 0, icon: '🚶' }]
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
                        { text: "Günlük İş": nextId: 'hub', step: 1, icon: '🧱', effect: withMsg({ para: 150, saglik: -10, enerji: -50 }, ["İnşaatta günlük işçi olarak çalıştın, sırtın kırıldı ama cebin doldu.", "Ağır yükler taşıdın, akşam bitkin düştün ama para kazandın.", "Bir esnafa yardım ettin, karşılığında biraz para aldın."]) },
                        { text: "Uyu": nextId: 'hub', step: 1, icon: '💤', effect: withMsg({ enerji: 30, saglik: -5 }, ["Bir köprü altında, gazete kağıtlarına sarılıp uyumaya çalıştın.", "Soğuk kaldırımda gözlerini kapattın, sabah üşüyerek uyandın.", "Bulduğun bir kutuya sığınıp gözlerini yumdun."]) },
                        { text: "Ev Tut": nextId: 'rent_house', step: 1, icon: '🏠', req: { para: 2000 } }
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