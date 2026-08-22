// events/random.js — Rastgele (etkileşimli) olaylar ve sonuç metni motoru
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

        // Sabit efekte, o eyleme özel (tekil ya da havuzdan rastgele seçilen) bir mesaj bağlar.

const withMsg = (effectObj, msgs) => (s) => ({
            effect: effectObj,
            msg: Array.isArray(msgs) ? pickRandom(msgs) : msgs
        });

        // Etkileşimli (Karar gerektiren) Rastgele Olaylar

const INTERACTIVE_RANDOM_EVENTS = [
{
    id: 'rnd_okul_gezisi', minAge: 7, maxAge: 15,
    emoji: '🏫', title: "Okul Gezisi!",
    description: "Okulunda bir gezi planlandı. Arkadaşlarınla beraber şehir dışına gideceksiniz. Ücreti 400 lira.",
    choices: [
        { text: "Cebinden Öde", nextId: 'hub', step: 0, icon: '😆', effect: withMsg({ mutluluk: 45, para: -400 }, "Birikmiş paranla ödeme yap.") },
        { text: "Ailenden iste", nextId: 'hub', step: 0, icon: '👪', effect: withMsg({ mutluluk: -30 }, "Parayı ailenden istedin ailen vermedi. Geziye gidemedin.") }
    ]
},
{
            id: 'rnd_mud_jump', minAge: 4, maxAge: 12,
            emoji: '💦', title: "Kocaman Çamur!",
            description: "Yağmurdan sonra sokakta kocaman bir çamur birikintisi gördün.",
            choices: [
                { text: "İçine Zıpla!", nextId: 'hub', step: 0, icon: '😆', effect: withMsg({ mutluluk: 20, karizma: -10 }, "Her yerin çamur oldu! Annen biraz kızdı ama acayip eğlendin.") },
                { text: "Etrafından Dolaş", nextId: 'hub', step: 0, icon: '🚶', effect: withMsg({ zeka: 5, mutluluk: -5 }, "Üstün temiz kaldı ama aklın o çamurda kaldı.") }
            ]
        },
        {
            id: 'rnd_weird_bug', minAge: 4, maxAge: 12,
            emoji: '🐛', title: "İlginç Bir Böcek",
            description: "Parkta oynarken yerde daha önce hiç görmediğin garip bir böcek buldun.",
            choices: [
                { text: "Eline Al", nextId: 'hub', step: 0, icon: '🖐️', effect: withMsg({ guc: 2, mutluluk: -10 }, "Böcek elini hafifçe ısırdı, korkup ağlayarak uzaklaştın.") },
                { text: "Uzaktan İncele", nextId: 'hub', step: 0, icon: '👀', effect: withMsg({ zeka: 10, mutluluk: 5 }, "Böceğin nasıl yürüdüğünü izlemek çok ilgini çekti.") }
            ]
        },
        {
            id: 'rnd_tooth_fairy', minAge: 5, maxAge: 7,
            emoji: '🦷', title: "Sallanan Diş",
            description: "Günlerdir sallanan ön dişin en sonunda düştü!",
            choices: [
                { text: "Yastığın Altına Koy", nextId: 'hub', step: 0, icon: '🛏️', effect: withMsg({ para: 20, mutluluk: 15 }, "Sabah kalktığında diş perisinin sana harçlık bıraktığını gördün!") },
                { text: "Sakla", nextId: 'hub', step: 0, icon: '📦', effect: withMsg({ zeka: 5 }, "Dişini küçük bir kutuda anı olarak saklamaya karar verdin.") }
            ]
        },
        {
            id: 'rnd_toy_fight', minAge: 4, maxAge: 7,
            emoji: '🧸', title: "Oyuncak Krizi",
            description: "Oyun alanında başka bir çocuk senin en sevdiğin oyuncakla oynamak istiyor.",
            choices: [
                { text: "Paylaş", nextId: 'hub', step: 0, icon: '🤝', effect: withMsg({ karizma: 15, mutluluk: 10 }, "Oyuncaklarını paylaştın ve kendine yeni bir arkadaş edindin.") },
                { text: "Vermem!", nextId: 'hub', step: 0, icon: '😡', effect: withMsg({ guc: 5, karizma: -10 }, "Oyuncağı sıkıca tuttun. Çocuk ağlamaya başladı.") }
            ]
        },
        {
            id: 'rnd_stray_cat_kid', minAge: 4, maxAge: 7,
            emoji: '🐈', title: "Yavru Kedi",
            description: "Sokakta miyavlayan çok tatlı bir yavru kedi gördün.",
            choices: [
                { text: "Sevmeye Çalış", nextId: 'hub', step: 0, icon: '😻', effect: withMsg({ mutluluk: 20, karizma: 5 }, "Kedi sana sürtündü ve mırıldadı. Çok mutlu oldun!") },
                { text: "Korkup Kaç", nextId: 'hub', step: 0, icon: '🏃', effect: withMsg({ mutluluk: -5 }, "Korkup annenin arkasına saklandın.") }
            ]
        },
            { 
                id: 'rnd_wallet', minAge: 7, maxAge: 18, 
                emoji: '👛', title: "Cüzdan Buldun!",
                description: "Okul bahçesinde öğretmenin cüzdanını buldun. İçi para dolu görünüyor.",
                choices: [
                    { text: "Cukkalı", nextId: 'hub', step: 0, icon: '😈', effect: withMsg({ para: 250, okul: -20, mutluluk: -10, aileIliski: -5 }, ["Parayı cebe indirdin, vicdanın seni akşama kadar dürttü ama para paraydı.", "Sessizce parayı aldın, öğretmen fark etmeden sınıfa döndün."]) },
                    { text: "Teslim Et", nextId: 'hub', step: 0, icon: '😇', effect: withMsg({ okul: 15, mutluluk: 15, karizma: 2 }, ["Cüzdanı öğretmene götürdün, gözlerindeki minnet paha biçilmezdi.", "Dürüstlüğünün karşılığını aldın, öğretmen seni sınıfa örnek gösterdi."]) }
                ]
            },
            { 
                id: 'rnd_bully', minAge: 7, maxAge: 14, 
                emoji: '👊', title: "Zorbalık",
                description: "Okulda üst sınıflardan biri senden haraç istedi.",
                choices: [
                    { text: "Karşı Çık", nextId: 'hub', step: 0, icon: '😡', req: { guc: 30 }, effect: withMsg({ guc: 2, karizma: 5, mutluluk: 10, enerji: -15 }, ["Zorbaya dik durdun, o da geri adım attı.", "Sesini yükseltip karşı koydun, koridordaki herkes izledi."]) },
                    { text: "Parayı Ver", nextId: 'hub', step: 0, icon: '😰', effect: withMsg({ para: -20, mutluluk: -15, okul: -5 }, ["Parayı verip kurtuldun ama içinde bir kırgınlık kaldı.", "Cebindeki parayı uzattın, zorba sırıtarak uzaklaştı."]) },
                    { text: "Şansa Bırak", nextId: 'hub', step: 0, icon: '🍀', req: { sans: 30 }, effect: withMsg({ mutluluk: 10, sans: 2 }, ["Şans yüzüne güldü, zorba başka bir kurban bulup gitti.", "Tam köşeye sıkışmışken bir öğretmen çıkageldi, kurtuldun."]) }
                ]
            },
            { 
                id: 'rnd_sickness', minAge: 0, maxAge: 99, 
                emoji: '🤧', title: "Salgın",
                description: "Ortalıkta kötü bir grip salgını var. Ateşin çok yüksek.",
                choices: [
                    { text: "Dinlen", nextId: 'hub', step: 0, icon: '🛏️', effect: withMsg({ saglik: 5, enerji: 30, mutluluk: -5 }, ["Yatağa uzanıp uzun süre dinlendin, ateş yavaş yavaş düştü.", "Battaniyeye sarılıp uyudun, vücudun kendini toparladı."]) },
                    { text: "İlaç Al", nextId: 'hub', step: 0, icon: '💊', req: { para: 30 }, effect: withMsg({ para: -30, saglik: 15, enerji: 10 }, ["Eczaneden aldığın ilaç işe yaradı, birkaç saatte kendine geldin.", "İlacı içer içmez ateşin düşmeye başladı."]) },
                    { text: "Şansa Bırak", nextId: 'hub', step: 0, icon: '🍀', req: { sans: 30 }, effect: withMsg({ saglik: 10, sans: 2 }, ["Hiçbir şey yapmadan bekledin, şansına vücudun kendi kendine iyileşti.", "Bir mucize eseri, hastalık kendiliğinden geçti."]) }
                ]
            },

            // --- ŞEHRE ÖZEL RASTGELE OLAYLAR ---
            // "cities" alanı olan olaylar SADECE o şehir/şehirlerde seçilebilir havuza girer.
            // "cities" alanı olmayan olaylar (yukarıdakiler gibi) her şehirde geçerlidir.
            {
                id: 'rnd_istanbul_kira', minAge: 18, maxAge: 99, cities: ['İstanbul'],
                emoji: '🏢', title: "Kira Zammı",
                description: "Ev sahibin kapına dayandı: 'Kirayı piyasaya göre güncellemem lazım' dedi.",
                choices: [
                    { text: "Zammı Kabul Et", nextId: 'hub', step: 0, icon: '😩', effect: withMsg({ para: -40, mutluluk: -10 }, ["Zammı kabul ettin, cüzdanın biraz daha inceldi ama en azından ev senin.", "İtiraz etmeden imzaladın, İstanbul'da ev bulmak zaten kabus."]) },
                    { text: "Pazarlık Yap", nextId: 'hub', step: 0, icon: '🗣️', req: { karizma: 40 }, effect: withMsg({ para: -15, karizma: 3, mutluluk: 5 }, ["Ustaca pazarlık ettin, zammı yarı yarıya indirdin.", "Konuşma yeteneğin sayesinde ev sahibi biraz taviz verdi."]) },
                    { text: "Ev Değiştir", nextId: 'hub', step: 0, icon: '📦', effect: withMsg({ para: -60, enerji: -20, mutluluk: -5 }, ["Eşyalarını toplayıp şehrin öbür ucunda daha ucuz bir ev buldun, taşınmak yordu.", "Aylardır oturduğun evden ayrıldın, İstanbul'da yeni bir sayfa açtın."]) }
                ]
            },
            {
                id: 'rnd_istanbul_trafik', minAge: 16, maxAge: 99, cities: ['İstanbul'],
                emoji: '🚗', title: "Trafik Kilitlendi",
                description: "Köprüye çıkan yol tıka basa dolu, önemli bir randevuna yetişmen gerekiyor.",
                choices: [
                    { text: "Metroya Koş", nextId: 'hub', step: 0, icon: '🚇', effect: withMsg({ enerji: -10, zeka: 1 }, ["Arabayı bırakıp metroya koştun, tam vaktinde yetiştin.", "Kalabalık metroda sıkışsan da randevuna zamanında ulaştın."]) },
                    { text: "Sabırla Bekle", nextId: 'hub', step: 0, icon: '😤', effect: withMsg({ mutluluk: -15, enerji: -5 }, ["Saatlerce trafikte bekledin, sinirlerin bozuldu.", "Klaksonlar arasında sıkışıp kaldın, geç kaldın."]) }
                ]
            },
            {
                id: 'rnd_erzurum_kis', minAge: 0, maxAge: 99, cities: ['Erzurum'],
                emoji: '❄️', title: "Kar Fırtınası",
                description: "Erzurum'da eksi yirmi derece ve şehir beyaza bürünmüş, yollar kapanmak üzere.",
                choices: [
                    { text: "Evde Kal", nextId: 'hub', step: 0, icon: '🏠', effect: withMsg({ enerji: 10, saglik: 5, para: -5 }, ["Sobanın başında kar fırtınasının geçmesini bekledin, sıcacık kaldın.", "Dışarı çıkmadın, evde çayını yudumlayarak kışın tadını çıkardın."]) },
                    { text: "Kar Küreme Yardımı", nextId: 'hub', step: 0, icon: '🧤', req: { guc: 30 }, effect: withMsg({ guc: 3, para: 25, mutluluk: 10, enerji: -20 }, ["Komşularla birlikte sokağın karını küredin, hem para kazandın hem de mahalleyle kaynaştın.", "Kürek elinde saatlerce çalıştın, yorgun ama gururlu döndün eve."]) },
                    { text: "İşe Zorla Git", nextId: 'hub', step: 0, icon: '🥶', effect: withMsg({ saglik: -15, enerji: -25, para: 15 }, ["Buz gibi yollarda ilerleyip işe yetiştin, üşümekten dişlerin takırdadı.", "Kar fırtınasına rağmen işe gittin, patronun takdirini kazandın ama üşüttün."]) }
                ]
            },
            {
                id: 'rnd_izmir_deprem', minAge: 0, maxAge: 99, cities: ['İzmir'],
                emoji: '🏗️', title: "Hafif Sarsıntı",
                description: "Yerin altından kısa bir gümbürtü geldi, birkaç saniye sallandı ve durdu. Herkes tedirgin.",
                choices: [
                    { text: "Deprem Çantasını Kontrol Et", nextId: 'hub', step: 0, icon: '🎒', effect: withMsg({ mutluluk: 5, zeka: 2 }, ["Deprem çantanı gözden geçirip eksikleri tamamladın, için biraz rahatladı.", "Hazırlıklı olmanın verdiği güvenle derin bir nefes aldın."]) },
                    { text: "Sakin Kal, Günlük Hayata Dön", nextId: 'hub', step: 0, icon: '😌', effect: withMsg({ mutluluk: 2 }, ["Panik yapmadan günlük işlerine devam ettin.", "Sarsıntı geçtikten sonra hayat kaldığı yerden akmaya devam etti."]) },
                    { text: "Endişelen", nextId: 'hub', step: 0, icon: '😟', effect: withMsg({ mutluluk: -10, enerji: -10 }, ["Sarsıntının etkisiyle akşama kadar tedirgin dolaştın.", "Aklından çıkmadı, gece de rahat uyuyamadın."]) }
                ]
            },
            {
                id: 'rnd_ankara_devlet', minAge: 18, maxAge: 99, cities: ['Ankara'],
                emoji: '🏛️', title: "Devlet Dairesi Sırası",
                description: "Bir evrak işi için gittiğin kurumda sıra kilometrelerce uzun, numaranı aldın: 247. Sıradaki: 89.",
                choices: [
                    { text: "Sabırla Bekle", nextId: 'hub', step: 0, icon: '⏳', effect: withMsg({ enerji: -20, mutluluk: -10, okul: 2 }, ["Saatlerce bekleyip işini hallettin, sabrın taçlandı.", "Sonunda numaran geldi, evrakların onaylandı."]) },
                    { text: "e-Devlet'ten Hallet", nextId: 'hub', step: 0, icon: '💻', req: { zeka: 30 }, effect: withMsg({ zeka: 3, mutluluk: 10, enerji: -2 }, ["Aslında işlemin e-Devlet'ten yapılabildiğini fark ettin, beş dakikada bitirdin.", "Sıraya hiç girmeden telefonundan işini hallettin, herkes şaşkın baktı."]) }
                ]
            },
            {
                id: 'rnd_antalya_turizm', minAge: 15, maxAge: 99, cities: ['Antalya'],
                emoji: '🏖️', title: "Yaz Sezonu Fırsatı",
                description: "Sahildeki bir otel yaz sezonu için acil personel arıyor, iyi bahşiş de veriyorlarmış.",
                choices: [
                    { text: "Sezonluk İşe Gir", nextId: 'hub', step: 0, icon: '🍹', effect: withMsg({ para: 45, enerji: -15, karizma: 2 }, ["Yaz boyunca turistlere hizmet verdin, cebine bahşişler de girdi.", "Yoğun sezon seni yordu ama kazancın fena değildi."]) },
                    { text: "Sahilde Dinlenmeyi Tercih Et", nextId: 'hub', step: 0, icon: '🏄', effect: withMsg({ mutluluk: 15, enerji: 10, para: -10 }, ["Fırsatı geri çevirip denize girdin, tadını çıkardın.", "Çalışmak yerine güneşlendin, ruh halin bir tık düzeldi."]) }
                ]
            },
            {
                id: 'rnd_kocaeli_sanayi', minAge: 18, maxAge: 99, cities: ['Kocaeli'],
                emoji: '🏭', title: "Fabrika Vardiyası",
                description: "Sanayi bölgesindeki bir fabrikada ek mesai için gönüllü arıyorlar, fazla mesai ücreti iyi.",
                choices: [
                    { text: "Fazla Mesaiye Kal", nextId: 'hub', step: 0, icon: '🔧', effect: withMsg({ para: 35, enerji: -25, saglik: -5 }, ["Uzun vardiyanın sonunda yorgun ama cepte fazladan parayla eve döndün.", "Makinelerin sesi kulağında çınlarken vardiyayı bitirdin."]) },
                    { text: "Eve Erken Dön", nextId: 'hub', step: 0, icon: '🏡', effect: withMsg({ mutluluk: 10, enerji: 10, para: -5 }, ["Fazla mesaiyi reddedip ailenle vakit geçirmeyi tercih ettin.", "Erken çıkıp dinlendin, yorgunluğun üzerinden atmaya çalıştın."]) }
                ]
            }
        ];

        // ==========================================================
        // --- HİKAYELEŞTİRME MOTORU (Sonuç Kartı Metinleri) ---
        // ==========================================================

        // Her ilin bağlı olduğu bölge (Part 2/3'te buff ve event filtrelemesi için de kullanılacak)

const computeMood = (diffs) => {
            const score = (diffs.mutluluk || 0) * 1.2 + (diffs.saglik || 0) * 1.0 + (diffs.para || 0) * 0.015 +
                (diffs.aileIliski || 0) * 0.6 + (diffs.okul || 0) * 0.4 + (diffs.zeka || 0) + (diffs.karizma || 0) +
                (diffs.guc || 0) + (diffs.sans || 0) + (diffs.tecrube || 0) * 0.3 + (diffs.enerji || 0) * 0.1;
            if (score >= 3) return 'pozitif';
            if (score <= -3) return 'negatif';
            return 'notr';
        };

        // Yaş bandı + ruh haline göre şablon havuzu. {choice} = seçilen metin, {city} = şehir

const RESULT_TEXT_POOLS = {
            bebek: {
                pozitif: [
                    "\"{choice}\" — küçük bir kahkaha atıyorsun, dünyan şu an bu kadar küçük ve bu kadar güvenli.",
                    "\"{choice}\" derken gözlerin parlıyor. Henüz hiçbir şeyin farkında değilsin ama iyi hissediyorsun.",
                    "Etraf senin için hâlâ bir oyuncak; \"{choice}\" tepkinle günü kapatıyorsun."
                ],
                negatif: [
                    "\"{choice}\" — hıçkırarak ağlıyorsun, kimse tam olarak neden olduğunu anlamıyor.",
                    "Huzursuzsun. \"{choice}\" tepkin, günün geri kalanına da sirayet ediyor.",
                    "Bir şeyler seni rahatsız etti; \"{choice}\" ile bunu herkese duyuruyorsun."
                ],
                notr: [
                    "\"{choice}\" — gün, senin için anlaşılmaz küçük anların art arda dizilmesinden ibaret.",
                    "Farkında bile değilsin ama zaman ilerliyor; \"{choice}\" bugünün özeti oluyor.",
                    "Etrafındakiler senin \"{choice}\" tepkine gülümsüyor, sen ise sadece anı yaşıyorsun."
                ]
            },
            cocuk_kucuk: {
                pozitif: [
                    "\"{choice}\" dedin ve gülüşün evin her köşesine yayıldı.",
                    "\"{choice}\" — o an senin için koca bir zaferdi, küçük dünyanda büyük bir gündü.",
                    "Gözlerin ışıl ışıl; \"{choice}\" kararınla günü kazanmış gibisin."
                ],
                negatif: [
                    "\"{choice}\" dedin ama içinde bir sıkıntı büyüdü, o gece erken uyudun.",
                    "\"{choice}\" kararın canını sıktı; dudakların büzüldü, gözlerin doldu.",
                    "Küçük omuzların bu sefer biraz ağır bir yük taşıdı — \"{choice}\"."
                ],
                notr: [
                    "\"{choice}\" dedin, sonra da başka bir şeye takıldı aklın, çocuklar öyledir.",
                    "Gün, \"{choice}\" ile sessizce geçip gitti.",
                    "\"{choice}\" — ne büyük bir sevinç ne de büyük bir üzüntü, sıradan bir gündü bu."
                ]
            },
            cocuk: {
                pozitif: [
                    "\"{choice}\" dedin ve okul çıkışı arkadaşlarına anlatacak bir hikayen oldu.",
                    "\"{choice}\" kararın seni gururlandırdı; o akşam aynada kendine gülümsedin.",
                    "\"{choice}\" — küçük bir zafer kazandın, defterinin arkasına bile not düştün."
                ],
                negatif: [
                    "\"{choice}\" dedin ama pişmanlık, akşam yemeğine kadar peşini bırakmadı.",
                    "\"{choice}\" kararın canını yaktı; yastığına sarılıp biraz ağladın.",
                    "\"{choice}\" — o gece uykuya dalarken hâlâ o anı düşünüyordun."
                ],
                notr: [
                    "\"{choice}\" dedin, çantanı omzuna attın ve hayat kaldığı yerden devam etti.",
                    "\"{choice}\" — bugün de diğer günler gibi geçti, yarın yeni bir gün.",
                    "\"{choice}\" kararınla günü kapattın, aklında kalan pek bir şey olmadı."
                ]
            },
            ergen: {
                pozitif: [
                    "\"{choice}\" dedin ve içinden \"işte bu\" diye geçirdin.",
                    "\"{choice}\" — kendine güvenin bir tık daha arttı, adımların hafifledi.",
                    "\"{choice}\" kararınla arkadaş grubunda biraz daha kendinden emin hissettin."
                ],
                negatif: [
                    "\"{choice}\" dedin ama sosyal medyada bile içine kapanmak istedin.",
                    "\"{choice}\" — o an doğru gelmişti ama sonrası pişmanlık dolu geçti.",
                    "\"{choice}\" kararın içini kemirdi, odanın kapısını kapatıp müziği açtın."
                ],
                notr: [
                    "\"{choice}\" dedin, omuz silktin, hayat zaten böyle karmaşık.",
                    "\"{choice}\" — ergenliğin binbir telaşı arasında bu da bir detay olarak kaldı.",
                    "\"{choice}\" kararınla gün bitti, yarın yine aynı telaş başlayacak."
                ]
            },
            genc: {
                pozitif: [
                    "\"{choice}\" dedin ve hayatın kontrolü elindeymiş gibi hissettin.",
                    "\"{choice}\" — genç bir kararlılıkla attığın bu adım, seni bir adım öne taşıdı.",
                    "\"{choice}\" kararınla geleceğe dair umudun tazelendi."
                ],
                negatif: [
                    "\"{choice}\" dedin ama sonrasında kendine \"keşke\" diye sordun.",
                    "\"{choice}\" — yetişkinliğin ağırlığını ilk kez böyle hissettin.",
                    "\"{choice}\" kararın, gecenin geç saatlerine kadar seni düşündürdü."
                ],
                notr: [
                    "\"{choice}\" dedin, hayat akışına devam etti, sen de onunla birlikte.",
                    "\"{choice}\" — büyük bir şey değildi ama küçük adımlar böyle birikiyor.",
                    "\"{choice}\" kararınla gün, alışıldık telaşıyla geçti."
                ]
            },
            yetiskin: {
                pozitif: [
                    "\"{choice}\" dedin ve emeğinin karşılığını aldığını hissettin.",
                    "\"{choice}\" — sorumluluklarının arasında küçük ama tatlı bir başarıydı bu.",
                    "\"{choice}\" kararınla o akşam huzurla uyuyabildin."
                ],
                negatif: [
                    "\"{choice}\" dedin ama faturalar ve sorumluluklar zihnini bir türlü bırakmadı.",
                    "\"{choice}\" — yetişkinliğin yorgunluğu bu kez sırtına biraz daha bindi.",
                    "\"{choice}\" kararın, içinde uzun süre bir ağırlık olarak kaldı."
                ],
                notr: [
                    "\"{choice}\" dedin, günlük rutinin bir parçası olarak kaydına geçti bu.",
                    "\"{choice}\" — hayat, büyük ve küçük kararların toplamından ibaret, bu da onlardan biri.",
                    "\"{choice}\" kararınla gün, sıradan bir yetişkin günü olarak kapandı."
                ]
            },
            orta_yas: {
                pozitif: [
                    "\"{choice}\" dedin ve yıllar içinde biriktirdiğin tecrübenin işe yaradığını gördün.",
                    "\"{choice}\" — bu yaşta bile hâlâ öğrenecek ve kazanacak şeyler olduğunu fark ettin.",
                    "\"{choice}\" kararınla geçmişe dönüp baktığında gurur duydun."
                ],
                negatif: [
                    "\"{choice}\" dedin ama zamanın nasıl geçtiğini düşünmeden edemedin.",
                    "\"{choice}\" — bu yaşta bu tür şeyler eskisi kadar kolay geçmiyor artık.",
                    "\"{choice}\" kararın, geçmişle bugünü kıyaslamana neden oldu."
                ],
                notr: [
                    "\"{choice}\" dedin, hayatın bu döneminde artık pek çok şeye alışmışsın.",
                    "\"{choice}\" — sakin bir kabullenişle günü geçirdin.",
                    "\"{choice}\" kararınla gün, deneyimli bir sükunetle sona erdi."
                ]
            },
            yasli: {
                pozitif: [
                    "\"{choice}\" dedin ve bir ömrün getirdiği huzuru hissettin.",
                    "\"{choice}\" — geriye dönüp baktığında bu kararın seni gülümsettiğini fark ettin.",
                    "\"{choice}\" kararınla, yaşanmış bir ömrün tatlı bir anını daha biriktirdin."
                ],
                negatif: [
                    "\"{choice}\" dedin ama bu yaşta her şey daha çok yoruyor artık.",
                    "\"{choice}\" — bedenin eskisi gibi cevap vermiyor, bunu bir kez daha hissettin.",
                    "\"{choice}\" kararının ardından uzun uzun düşüncelere daldın."
                ],
                notr: [
                    "\"{choice}\" dedin, yıllar sana bu tür anları sakince karşılamayı öğretmiş.",
                    "\"{choice}\" — sakin, tecrübeli bir kabullenişle gün geçti.",
                    "\"{choice}\" kararınla, bir ömrün sıradan ama değerli bir günü daha tamamlandı."
                ]
            }
        };

        // Beklenmedik (rastgele) olay tetiklendiğinde kullanılan giriş cümleleri

const RANDOM_EVENT_INTROS = [
            "Hiç beklemediğin bir şey oldu.",
            "Aklından geçmeyen bir gelişme kapını çaldı.",
            "Gündelik akış birden bozuldu.",
            "Hayat, sürpriz yapmayı hiç bırakmıyor.",
            "İşler planladığın gibi gitmedi."
        ];

        // Ana hikayeleştirme fonksiyonu

const buildResultText = ({ choice, city, yas, diffs, isDeath, isRandomEventTriggered }) => {
            if (isDeath) return null; // Ölüm mesajı ayrı ele alınıyor

            const bracket = ageBracket(yas);
            const mood = computeMood(diffs);
            const pool = (RESULT_TEXT_POOLS[bracket] && RESULT_TEXT_POOLS[bracket][mood]) || RESULT_TEXT_POOLS.yetiskin.notr;
            let sentence = pickRandom(pool).replace(/\{choice\}/g, choice.text || "");

            if (isRandomEventTriggered) {
                sentence = `${pickRandom(RANDOM_EVENT_INTROS)} ${sentence}`;
            }

            // %35 ihtimalle bölgesel atmosfer cümlesi ekle
            const region = CITY_REGIONS[city];
            if (region && REGION_FLAVOR[region] && Math.random() < 0.35) {
                sentence = `${sentence} ${pickRandom(REGION_FLAVOR[region])}`;
            }

            return sentence;
        };
