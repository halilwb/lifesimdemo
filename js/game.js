// js/game.js — Ana App bileşeni (React) ve UI bileşenleri

// ===================================================
        // 02-helpers.js — StatHeader bileşeni
        // ===================================================
        // UI Header Bileşeni
        const StatHeader = ({ icon, value, type, suffix = "", colorClass }) => {
            const isDanger = (type === 'saglik' && value <= 30) || 
                             (type === 'mutluluk' && value === 0) || 
                             (type === 'para' && value <= -500) ||
                             (type === 'aile' && value <= 30);
            const displayColor = isDanger ? 'text-red-500 animate-pulse' : colorClass;

            return (
                <div className="flex flex-col items-center relative bg-white/50 backdrop-blur-sm px-1.5 sm:px-2.5 py-1 rounded-2xl shadow-sm border border-white/60">
                    <i className={`fas ${icon} text-[10px] sm:text-base mb-0.5 ${displayColor}`}></i>
                    <span className={`text-[9px] sm:text-xs font-black ${displayColor}`}>{value}{suffix}</span>
                </div>
            );
        };

// ===================================================
        // 03-app.js — Ana App bileşeni
        // ===================================================
        
	const ThiefMinigame = ({ onWin, onLose, onClose }) => {
    const [status, setStatus] = useState('playing'); // 'playing', 'won', 'lost'
    const [successCount, setSuccessCount] = useState(0);
    const [strikes, setStrikes] = useState(0);
    const [cursorPos, setCursorPos] = useState(50);
    const [safeZone, setSafeZone] = useState({ start: 30, width: 40 });

    const posRef = useRef(50);
    const dirRef = useRef(1); 
    const speedRef = useRef(2.5); 

    const randomizeZone = (currentSuccess) => {
        const newWidth = Math.max(15, 40 - (currentSuccess * 10)); // Her adımda daralır
        const newStart = Math.random() * (100 - newWidth);
        setSafeZone({ start: newStart, width: newWidth });
        speedRef.current = 2.5 + (currentSuccess * 1.5); // Her adımda hızlanır
    };

    useEffect(() => {
        randomizeZone(0);
    }, []);

    useEffect(() => {
        if (status !== 'playing') return;
        const interval = setInterval(() => {
            posRef.current += dirRef.current * speedRef.current;
            if (posRef.current >= 100) {
                posRef.current = 100;
                dirRef.current = -1;
            } else if (posRef.current <= 0) {
                posRef.current = 0;
                dirRef.current = 1;
            }
            setCursorPos(posRef.current);
        }, 30);
        return () => clearInterval(interval);
    }, [status, successCount]);

    const handlePick = () => {
        if (status !== 'playing') return;
        
        const pos = posRef.current;
        const inZone = pos >= safeZone.start && pos <= (safeZone.start + safeZone.width);

        if (inZone) {
            const newSuccess = successCount + 1;
            setSuccessCount(newSuccess);
            if (newSuccess >= 3) {
                setStatus('won');
                onWin();
            } else {
                randomizeZone(newSuccess);
            }
        } else {
            const newStrikes = strikes + 1;
            setStrikes(newStrikes);
            if (newStrikes >= 3) {
                setStatus('lost');
                onLose();
            }
        }
    };
	
    return (
        <div className="stats-overlay" style={{ zIndex: 50 }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">
                    🕵️ Kilit Kırma
                </h2>
                <button onClick={onClose} className="text-slate-400 text-lg font-black px-2">✕</button>
            </div>

            <div className="flex flex-col items-center gap-4 mt-2">
                <div className="flex gap-2 mb-2">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="text-3xl transition-all">
                            {i < successCount ? '🔓' : '🔒'}
                        </div>
                    ))}
                </div>
                
                <div className="text-xs font-bold text-slate-500 mb-2">
                    Hedefi yeşil alanda yakala! Hata Hakkı: <span className="text-red-500">{3 - strikes}</span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-8 relative overflow-hidden border-2 border-slate-900 shadow-inner">
                    {/* Güvenli Alan (Yeşil) */}
                    <div 
                        className="absolute h-full bg-emerald-500/80 transition-all duration-300"
                        style={{ left: `${safeZone.start}%`, width: `${safeZone.width}%` }}
                    ></div>
                    {/* Hareketli İmleç */}
                    <div 
                        className="absolute h-full w-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10"
                        style={{ left: `${cursorPos}%`, transform: 'translateX(-50%)' }}
                    ></div>
                </div>
                
                {status === 'playing' ? (
                    <button 
                        onPointerDown={handlePick}
                        className="w-full mt-6 bg-slate-700 hover:bg-slate-800 active:scale-95 text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-key"></i> ZORLA
                    </button>
                ) : (
                    <div className="w-full text-center mt-6">
                        <div className={`text-sm font-black p-4 rounded-xl mb-4 ${status === 'won' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            {status === 'won' ? '💰 Kasa açıldı! Paraları cebe indirdin.' : '🚨 ALARM ÇALDI! Polis yolda...'}
                        </div>
                        <button onClick={onClose} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-black py-3 rounded-xl shadow-md active:scale-95">
                            Devam Et
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

	const CheatMinigame = ({ onWin, onLose, onClose }) => {
    const [progress, setProgress] = useState(0);
    const [teacher, setTeacher] = useState('board'); // 'board', 'suspicious', 'watching'
    const [status, setStatus] = useState('playing'); // 'playing', 'won', 'lost'
    
    const isCheating = useRef(false);
    const progressVal = useRef(0);
    const teacherVal = useRef('board');
    const timeoutRefs = useRef([]);

    const startCheating = () => { isCheating.current = true; };
    const stopCheating = () => { isCheating.current = false; };

    useEffect(() => {
        if (status !== 'playing') return;

        const loop = setInterval(() => {
            if (isCheating.current && teacherVal.current === 'watching') {
                setStatus('lost');
                onLose();
            } else if (isCheating.current && teacherVal.current !== 'watching') {
                progressVal.current += 1.5;
                if (progressVal.current >= 100) {
                    progressVal.current = 100;
                    setStatus('won');
                    onWin();
                }
                setProgress(progressVal.current);
            } else if (!isCheating.current && progressVal.current > 0) {
                progressVal.current = Math.max(0, progressVal.current - 0.2);
                setProgress(progressVal.current);
            }
        }, 50);

        const teacherAI = () => {
            if (status !== 'playing') return;
            
            if (teacherVal.current === 'board') {
                teacherVal.current = 'suspicious';
                setTeacher('suspicious');
                timeoutRefs.current.push(setTimeout(teacherAI, 600 + Math.random() * 800));
            } else if (teacherVal.current === 'suspicious') {
                teacherVal.current = 'watching';
                setTeacher('watching');
                timeoutRefs.current.push(setTimeout(teacherAI, 1500 + Math.random() * 1500));
            } else {
                teacherVal.current = 'board';
                setTeacher('board');
                timeoutRefs.current.push(setTimeout(teacherAI, 2000 + Math.random() * 3000));
            }
        };

        timeoutRefs.current.push(setTimeout(teacherAI, 2000));

        return () => {
            clearInterval(loop);
            timeoutRefs.current.forEach(clearTimeout);
        };
    }, [status, onWin, onLose]);

    return (
        <div className="stats-overlay" style={{ zIndex: 50 }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    📝 Kopya Çekme Operasyonu
                </h2>
                <button onClick={onClose} className="text-slate-400 text-lg font-black px-2">✕</button>
            </div>

            <div className="flex flex-col items-center gap-6 mt-4">
                <div className="text-7xl transition-transform">
                    {teacher === 'board' ? '👨‍🏫📝' : teacher === 'suspicious' ? '👨‍🏫👀' : '👨‍🏫😡'}
                </div>
                
                <div className="text-sm font-bold text-slate-600">
                    {teacher === 'board' ? 'Hoca tahtaya yazıyor. Güvendesin.' : 
                     teacher === 'suspicious' ? 'Hoca şüphelendi... Kapat kopyayı!' : 
                     'HOCA BAKIYOR!'}
                </div>

                <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden border border-slate-300">
                    <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-75"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                {status === 'playing' ? (
                    <button 
                        onPointerDown={startCheating}
                        onPointerUp={stopCheating}
                        onPointerLeave={stopCheating}
                        className="w-full h-24 mt-4 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 active:scale-95 text-white font-black rounded-2xl shadow-lg select-none flex flex-col items-center justify-center touch-none"
                    >
                        <span className="text-2xl mb-1">👀</span>
                        <span>BASILI TUT VE KOPYA ÇEK</span>
                    </button>
                ) : (
                    <div className="w-full text-center mt-4">
                        <div className={`text-lg font-black p-4 rounded-xl mb-4 ${status === 'won' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            {status === 'won' ? '🎉 Kopyayı başarıyla çektin, notun kurtuldu!' : '📵 YAKALANDIN! Hoca kağıdını aldı.'}
                        </div>
                        <button onClick={onClose} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-black py-3 rounded-xl shadow-md active:scale-95">
                            Devam Et
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
const DoctorMinigame = ({ onWin, onLose, onClose }) => {
    const [status, setStatus] = useState('playing'); // 'playing', 'won', 'lost'
    const [sliderPos, setSliderPos] = useState(50);
    const [targetZone, setTargetZone] = useState({ start: 35, width: 30 });
    const [stability, setStability] = useState(100);

    const posRef = useRef(50);
    const dirRef = useRef(1);
    const speedRef = useRef(3);

    // Hedef bölgeyi rastgele konumlandır
    const randomizeTarget = () => {
        const newWidth = Math.max(20, 35 - Math.floor(Math.random() * 10));
        const newStart = Math.random() * (100 - newWidth);
        setTargetZone({ start: newStart, width: newWidth });
    };

    useEffect(() => {
        randomizeTarget();
    }, []);

    // Slider hareketi
    useEffect(() => {
        if (status !== 'playing') return;
        const interval = setInterval(() => {
            posRef.current += dirRef.current * speedRef.current;
            if (posRef.current >= 100) {
                posRef.current = 100;
                dirRef.current = -1;
            } else if (posRef.current <= 0) {
                posRef.current = 0;
                dirRef.current = 1;
            }
            setSliderPos(posRef.current);
        }, 25);
        return () => clearInterval(interval);
    }, [status]);

    // Sabitleme tuşuna basıldığında
    const handleStabilize = () => {
        if (status !== 'playing') return;

        const pos = posRef.current;
        const inZone = pos >= targetZone.start && pos <= (targetZone.start + targetZone.width);

        if (inZone) {
            setStatus('won');
            onWin();
        } else {
            const newStability = stability - 35;
            setStability(newStability);
            if (newStability <= 0) {
                setStatus('lost');
                onLose();
            } else {
                randomizeTarget();
                speedRef.current += 1; // Her başarısız denemede biraz daha hızlanır
            }
        }
    };

    return (
        <div className="stats-overlay" style={{ zIndex: 50 }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                    🩺 Sağlık Kontrolü / Muayene
                </h2>
                <button onClick={onClose} className="text-slate-400 text-lg font-black px-2">✕</button>
            </div>

            <div className="flex flex-col items-center gap-5 mt-2">
                <div className="text-6xl mb-1 animate-pulse">
                    {status === 'playing' ? '💓' : status === 'won' ? '✨' : '⚠️'}
                </div>
                
                <div className="text-xs font-bold text-slate-600 text-center">
                    {status === 'playing' ? 'İmleci yeşil alanda durdur ve doktorun tansiyonu ölçmesine yardım et!' : ''}
                </div>

                {/* Kalp Atış / Slider Barı */}
                <div className="w-full bg-slate-200 rounded-full h-8 relative overflow-hidden border-2 border-slate-300 shadow-inner">
                    <div 
                        className="absolute h-full bg-emerald-400/80 transition-all duration-200"
                        style={{ left: `${targetZone.start}%`, width: `${targetZone.width}%` }}
                    ></div>
                    <div 
                        className="absolute h-full w-2 bg-rose-500 shadow-md z-10"
                        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                    ></div>
                </div>

                <div className="text-[11px] font-black text-slate-500">
                    Dayanıklılık: <span className="text-rose-500">{stability}%</span>
                </div>
                
                {status === 'playing' ? (
                    <button 
                        onPointerDown={handleStabilize}
                        className="w-full mt-4 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-hand-holding-medical"></i> SABİTLE / ÖLÇTÜR
                    </button>
                ) : (
                    <div className="w-full text-center mt-4">
                        <div className={`text-sm font-black p-4 rounded-xl mb-4 ${status === 'won' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            {status === 'won' ? '🎉 Muayene harika geçti! Sağlığın tamamen yenilendi.' : '🤒 Doktor durumunu kritik buldu, iğne yedikçe sağlığın azaldı.'}
                        </div>
                        <button onClick={onClose} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-black py-3 rounded-xl shadow-md active:scale-95">
                            Devam Et
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
const GymMinigame = ({ onWin, onLose, onClose }) => {
    const [status, setStatus] = useState('playing'); // 'playing', 'won', 'lost'
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5.0); // 5 saniye süre

    const clicksRef = useRef(0);
    const timeLeftRef = useRef(5.0);
    const timerRef = useRef(null);

    const TARGET_CLICKS = 25; // Kazanmak için gereken tıklama sayısı

    useEffect(() => {
        timerRef.current = setInterval(() => {
            timeLeftRef.current -= 0.1;
            if (timeLeftRef.current <= 0) {
                clearInterval(timerRef.current);
                if (clicksRef.current >= TARGET_CLICKS) {
                    setStatus('won');
                    onWin();
                } else {
                    setStatus('lost');
                    onLose();
                }
                setTimeLeft(0);
            } else {
                setTimeLeft(parseFloat(timeLeftRef.current.toFixed(1)));
            }
        }, 100);

        return () => clearInterval(timerRef.current);
    }, [onWin, onLose]);

    const handleLift = () => {
        if (status !== 'playing') return;
        clicksRef.current += 1;
        setClicks(clicksRef.current);
        
        // Eğer süre bitmeden hedefe ulaşıldıysa hemen kazan
        if (clicksRef.current >= TARGET_CLICKS) {
            clearInterval(timerRef.current);
            setStatus('won');
            onWin();
        }
    };

    const progressPercent = Math.min(100, (clicks / TARGET_CLICKS) * 100);

    return (
        <div className="stats-overlay" style={{ zIndex: 50 }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                    🏋️ Ağırlık Kaldırma Antrenmanı
                </h2>
                <button onClick={onClose} className="text-slate-400 text-lg font-black px-2">✕</button>
            </div>

            <div className="flex flex-col items-center gap-5 mt-2">
                <div className="text-6xl mb-1 transition-transform active:scale-110">
                    {status === 'playing' ? '🏋️‍♂️' : status === 'won' ? '🏆' : '🥵'}
                </div>
                
                <div className="text-xs font-bold text-slate-600 text-center">
                    {status === 'playing' ? 'Barı kaldırmak için butonuna olabildiğince hızlı seri şekilde bas!' : ''}
                </div>

                <div className="text-sm font-black text-slate-700">
                    Süre: <span className="text-orange-500">{timeLeft}s</span> | Tıklama: {clicks}/{TARGET_CLICKS}
                </div>

                {/* Dolum Barı */}
                <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden border border-slate-300 shadow-inner">
                    <div 
                        className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-75"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                
                {status === 'playing' ? (
                    <button 
                        onPointerDown={handleLift}
                        className="w-full mt-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 active:scale-95 text-white font-black py-5 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-1 touch-none select-none"
                    >
                        <span className="text-xl">🔥</span>
                        <span className="text-sm">SERİ BİR ŞEKİLDE BAS!</span>
                    </button>
                ) : (
                    <div className="w-full text-center mt-2">
                        <div className={`text-sm font-black p-4 rounded-xl mb-4 ${status === 'won' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            {status === 'won' ? '💪 Harika set! Kasların gelişti ve gücün arttı.' : '💤 Yeterince hızlı olamadın, ağırlık altında ezildin ve yoruldun.'}
                        </div>
                        <button onClick={onClose} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-black py-3 rounded-xl shadow-md active:scale-95">
                            Devam Et
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
		const App = () => {
			const [doctorGameState, setDoctorGameState] = useState(null);

const handleDoctorWin = () => {
    let next = { ...stats };
    next.saglik = 100; // Sağlığı fulle
    next.mutluluk += 10;
    setStats(clampAll(next));
    showToast('🎉 Doktor kontrolleri temiz çıktı, sağlığın tazelendi!', 'text-emerald-600');
};

const handleDoctorLose = () => {
    let next = { ...stats };
    next.saglik = Math.max(10, next.saglik - 25); // Sağlıktan düşür
    next.mutluluk -= 15;
    setStats(clampAll(next));
    showToast('🤒 Doktor kötü haberler verdi, sağlığın daha da kötüleşti.', 'text-red-500');
};
			const [cheatGameState, setCheatGameState] = useState(null);

const handleCheatWin = () => {
    let next = { ...stats };
    next.okul += 15;
    next.mutluluk -= 2;
    setStats(clampAll(next));
    showToast('✅ Kimse fark etmedi, notun kurtuldu!', 'text-emerald-600');
};

const handleCheatLose = () => {
    let next = { ...stats };
    next.okul -= 20;
    next.mutluluk -= 10;
    next.aileIliski -= 8;
    setStats(clampAll(next));
    showToast('📵 Öğretmen gördü, kağıdın alındı.', 'text-red-500');
};
const [thiefGameState, setThiefGameState] = useState(null);

const handleThiefWin = () => {
    let next = { ...stats };
    next.para += 900;
    next.sans += 1;
    next.mutluluk -= 5;
    setStats(clampAll(next));
    showToast('💰 İşi temiz çevirdin, ganimet cepte!', 'text-emerald-600');
};

const handleThiefLose = () => {
    let next = { ...stats };
    const ceza = 3 + Math.floor(Math.random() * 4); // 3-6 adım hapis
    next.hapisSayaci += ceza;
    next.mutluluk -= 20;
    next.karizma -= 5;
    next.aileIliski -= 15;
    setStats(clampAll(next));
    showToast(`🚔 Polis bastı! ${ceza} adım hapis cezası aldın.`, 'text-red-500');
};
	
	const [gymGameState, setGymGameState] = useState(null);

const handleGymWin = () => {
    let next = { ...stats };
    next.guc += 5;
    next.saglik += 8;
    next.mutluluk += 10;
    setStats(clampAll(next));
    showToast('💪 Süper antrenman! Gücün ve sağlığın arttı.', 'text-emerald-600');
};

const handleGymLose = () => {
    let next = { ...stats };
    next.enerji -= 15;
    next.mutluluk -= 5;
    setStats(clampAll(next));
    showToast('🥵 Antrenmanda tükendin, enerjin düştü.', 'text-red-500');
};
            const [gameState, setGameState] = useState('menu'); // 'menu' veya 'playing'
            const [availablePool, setAvailablePool] = useState([...TURKEY_CITIES]); // Seçilebilir havuz
            const [currentChoicesCities, setCurrentChoicesCities] = useState([]); // Ekranda gösterilen 3 şehir
			
            
            // Kilidi açılmış şehirler ve en yüksek yaş durumları
            const [cityProgress, setCityProgress] = useState({}); 
            const [selectedCity, setSelectedCity] = useState('');
            const [difficulty, setDifficulty] = useState('kolay'); // kolay, orta, zor
            
            const [activeTab, setActiveTab] = useState('game'); // 'game' veya 'stats'

            const [stats, setStats] = useState(INITIAL_STATS);
            const [familyInfo, setFamilyInfo] = useState(generateFamily());
            const [relationships, setRelationships] = useState([]);
            const [inventory, setInventory] = useState([]);
            const [toast, setToast] = useState(null);
            const [isGameOver, setIsGameOver] = useState(false);
            const [isDarkMode, setIsDarkMode] = useState(false);
            
            const [animState, setAnimState] = useState('card-idle');
            const [displayEventId, setDisplayEventId] = useState('age_0_ev_1');

            /* Yeni Sonuç Ekranı Durumları */
            const [showResult, setShowResult] = useState(false);
            const [resultData, setResultData] = useState(null);

            const [dragState, setDragState] = useState({ isDragging: false, index: null, startX: 0, startY: 0, currentX: 0, currentY: 0 });
            const [isHoveringDropZone, setIsHoveringDropZone] = useState(false);
            const dropZoneRef = useRef(null);

            // TÜM OLAYLAR (Hub'lar ve Olaylar)
            const generateMenuCities = () => {
                let pool = [...availablePool];
                let choices = [];
                for(let i=0; i<3; i++) {
                    if(pool.length === 0) break;
                    const r = Math.floor(Math.random() * pool.length);
                    choices.push(pool[r]);
                    pool.splice(r, 1); 
                }
                setCurrentChoicesCities(choices);
            };

            // Menüye dönüldüğünde yeni şehirler belirle
            useEffect(() => {
                if (gameState === 'menu' && currentChoicesCities.length === 0 && availablePool.length > 0) {
                    generateMenuCities();
                }
            }, [gameState]);

            useEffect(() => {
                if (isDarkMode) document.body.classList.add('dark-theme');
                else document.body.classList.remove('dark-theme');
            }, [isDarkMode]);

            // Oyunu Başlat
            const startGameWithCity = (city, isUnlocked = false, selectedDiff = 'kolay') => {
                if (!isUnlocked) {
                    // Havuzdan çıkar
                    setAvailablePool(prev => prev.filter(c => c !== city));
                    setCurrentChoicesCities([]);
                }
                
                // İlk defa oynanıyorsa kaydını oluştur
                if (!cityProgress[city]) {
                    setCityProgress(prev => ({ ...prev, [city]: { maxAge: 0, unlockedDiffs: ['kolay'] } }));
                }

                setSelectedCity(city);
                setDifficulty(selectedDiff);
                
                // Karakter Statlarını Rastgele Belirle (1-10 arası taban, zorluğa göre değişebilir)
                const cityBuff = getCityBuff(city);
                const sb = cityBuff.startBonus || {};
                const newStats = { 
                    ...INITIAL_STATS, 
                    zeka:    Math.floor(Math.random() * 15) + 5 + (sb.zeka    || 0),
                    karizma: Math.floor(Math.random() * 15) + 5 + (sb.karizma || 0),
                    guc:     Math.floor(Math.random() * 15) + 5 + (sb.guc     || 0),
                    sans:    Math.floor(Math.random() * 15) + 5 + (sb.sans    || 0),
                    saglik:  INITIAL_STATS.saglik  + (sb.saglik    || 0),
                    mutluluk:INITIAL_STATS.mutluluk + (sb.mutluluk || 0),
                    okul:    INITIAL_STATS.okul    + (sb.okul      || 0),
                    aileIliski: INITIAL_STATS.aileIliski + (sb.aileIliski || 0),
                };
                const newFamily = generateFamily();
                setStats(newStats);
                setFamilyInfo(newFamily);
                setRelationships(generateRelationships(newFamily));
                setInventory([]);
                setIsGameOver(false);
                setShowResult(false);
                setActiveTab('game');
                
                setGameState('playing');
                setDisplayEventId('age_0_ev_1');
            };

            const triggerEventChange = (nextId) => {
                setAnimState('card-flip-out');
                setTimeout(() => {
                    setDisplayEventId(nextId);
                    setAnimState('card-flip-in');
                    requestAnimationFrame(() => requestAnimationFrame(() => setAnimState('card-idle')));
                }, 300);
            };

            const handlePointerDown = (e, index, isDisabled) => {
                if (isDisabled || animState !== 'card-idle') return;
                e.target.setPointerCapture(e.pointerId);
                setDragState({ isDragging: true, index: index, startX: e.clientX, startY: e.clientY, currentX: e.clientX, currentY: e.clientY });
            };

            const handlePointerMove = (e) => {
                if (!dragState.isDragging) return;
                setDragState(prev => ({ ...prev, currentX: e.clientX, currentY: e.clientY }));
                if (dropZoneRef.current) {
                    const rect = dropZoneRef.current.getBoundingClientRect();
                    const isInside = (e.clientX >= rect.left - 20 && e.clientX <= rect.right + 20 && e.clientY >= rect.top - 20 && e.clientY <= rect.bottom + 40);
                    setIsHoveringDropZone(isInside);
                }
            };

            const handlePointerUp = (e) => {
                if (!dragState.isDragging) return;
                e.target.releasePointerCapture(e.pointerId);
                if (isHoveringDropZone && dropZoneRef.current) {
                    const choice = EVENTS[displayEventId].choices[dragState.index];
                    handleChoice(choice);
                }
                setDragState({ isDragging: false, index: null, startX: 0, startY: 0, currentX: 0, currentY: 0 });
                setIsHoveringDropZone(false);
            };

            const handleChoice = (choice) => {
                if (choice.nextId === 'menu') {
                    setGameState('menu');
                    return;
                }

                let newStats = { ...stats };
                let diffs = { para: 0, mutluluk: 0, saglik: 0, enerji: 0, aileIliski: 0, okul: 0, zeka: 0, karizma: 0, guc: 0, sans: 0, tecrube: 0 };
                let statChanges = []; // Toast yerine sonucu kartta göstermek için toplayacağız
                let isRandomEventTriggered = false;
                let targetId = choice.nextId;
                let choiceMsg = "";
                let nextEventMsg = "";

                const applyEffects = (effectObj) => {
                    if (effectObj.para) { newStats.para += effectObj.para; diffs.para += effectObj.para; }
                    if (effectObj.mutluluk) { newStats.mutluluk += effectObj.mutluluk; diffs.mutluluk += effectObj.mutluluk; }
                    if (effectObj.saglik) { 
                        let sGain = effectObj.saglik;
                        if (sGain > 0 && newStats.saglikCarpani) sGain = Math.round(sGain * newStats.saglikCarpani);
                        newStats.saglik += sGain; diffs.saglik += sGain; 
                    }
                    if (effectObj.enerji !== undefined) { newStats.enerji += effectObj.enerji; diffs.enerji += effectObj.enerji; }
                    if (effectObj.aileIliski) { newStats.aileIliski += effectObj.aileIliski; diffs.aileIliski += effectObj.aileIliski; }
                    if (effectObj.okul) { newStats.okul += effectObj.okul; diffs.okul += effectObj.okul; }
                    if (effectObj.zeka) { newStats.zeka += effectObj.zeka; diffs.zeka += effectObj.zeka; }
                    if (effectObj.karizma) { newStats.karizma += effectObj.karizma; diffs.karizma += effectObj.karizma; }
                    if (effectObj.guc) { newStats.guc += effectObj.guc; diffs.guc += effectObj.guc; }
                    if (effectObj.sans) { newStats.sans += effectObj.sans; diffs.sans += effectObj.sans; }
                    if (effectObj.tecrube) { newStats.tecrube += effectObj.tecrube; diffs.tecrube += effectObj.tecrube; }
                    if (effectObj.barinma) { newStats.barinma = effectObj.barinma; }
                    if (effectObj.saglikCarpani) { newStats.saglikCarpani = effectObj.saglikCarpani; }
                    if (effectObj.yas) { newStats.yas += effectObj.yas; newStats.secimSayaci = 0; }
                };

                // 1. Seçimin Kendi Etkisini Uygula
                if (choice.effect) {
                     let choiceEffect = typeof choice.effect === 'function' ? choice.effect(newStats).effect : choice.effect;
                     applyEffects(choiceEffect);

                     if (typeof choice.effect === 'function') {
                         const res = choice.effect(newStats);
                         if(res.msg) choiceMsg = res.msg;
                     } else if (choiceEffect && choiceEffect.msg) {
                         // Statik effect objesi içine gömülü özel mesaj (ör: { yas: 1, msg: "..." })
                         choiceMsg = choiceEffect.msg;
                     }
                }

                // 2. Adım (Step) ve Zaman İlerleyişi
                if (choice.step > 0) {
                    newStats.secimSayaci += choice.step;
                    if (newStats.hapisSayaci > 0) { newStats.hapisSayaci = Math.max(0, newStats.hapisSayaci - choice.step); }
                    const diffMultiplier = difficulty === 'kolay' ? 1 : difficulty === 'orta' ? 0.7 : 0.4;
                    
                    // Doğal enerji yenilenmesi (Her adımda, eğer hub ise daha çok)
                    if (targetId === 'hub') {
                        newStats.enerji += 10; diffs.enerji += 10;
                    }

                    // Şehir Pasif Buff / Debuff Uygulaması
                    const cityBuff = getCityBuff(selectedCity);
                    const pp = cityBuff.passivePerStep || {};
                    Object.keys(pp).forEach(k => {
                        if (k === 'saglik') {
                            let gain = pp.saglik;
                            if (gain > 0 && newStats.saglikCarpani) gain = Math.round(gain * newStats.saglikCarpani);
                            newStats.saglik += gain; diffs.saglik = (diffs.saglik || 0) + gain;
                        } else if (k === 'okul') {
                            newStats.okul = Math.max(0, Math.min(100, (newStats.okul || 0) + pp[k]));
                        } else if (k === 'aileIliski') {
                            newStats.aileIliski = Math.max(0, Math.min(100, (newStats.aileIliski || 0) + pp[k]));
                        } else {
                            newStats[k] = (newStats[k] || 0) + pp[k];
                        }
                    });

                    // 7-18 Yaş Arası Harçlık
                    if (newStats.yas >= 7 && newStats.yas <= 18 && newStats.barinma === 'aile') {
                         const baseAllowance = 10 * newStats.yas; 
                         const actualAllowance = Math.floor(baseAllowance * familyInfo.wealthMultiplier * diffMultiplier);
                         newStats.para += actualAllowance; diffs.para += actualAllowance;
                    }

                    // Dinamik Yaş Atlama Hızı (8 yaş sonrası otomatik)
                    if (newStats.yas >= 8) {
                        let stepsToAgeUp = newStats.yas <= 18 ? 4 : 5;
                        if (newStats.secimSayaci >= stepsToAgeUp) {
                            newStats.yas += 1; newStats.secimSayaci = 0;
                            
                            // 40 Yaş Kilidi Kontrolü
                            setCityProgress(prev => {
                                const prog = prev[selectedCity] || { maxAge: 0, unlockedDiffs: ['kolay'] };
                                return { ...prev, [selectedCity]: { ...prog, maxAge: Math.max(prog.maxAge, newStats.yas) } };
                            });
                        }
                    }

                    // Etkileşimli Rastgele Olay Tetikleme (%25 İhtimal - Hublardayken)
                    if (targetId === 'hub' && Math.random() < 0.25) {
                        const availableRandoms = INTERACTIVE_RANDOM_EVENTS.filter(e => 
                            newStats.yas >= e.minAge && newStats.yas <= e.maxAge && (!e.condition || e.condition(newStats)) &&
                            (!e.cities || e.cities.includes(selectedCity))
                        );
                        if(availableRandoms.length > 0) {
                            const rndEvent = availableRandoms[Math.floor(Math.random() * availableRandoms.length)];
                            targetId = rndEvent.id;
                            isRandomEventTriggered = true;
                        }
                    }
                }

                // 3. Hub Yönlendirmeleri (Rastgele olay yoksa)
                if (!isRandomEventTriggered && targetId === 'hub') {
                    if (newStats.barinma === 'yurt') {
                        if (newStats.yas >= 18) targetId = 'orphanage_leave'; else targetId = 'hub_orphanage';
                    } else if (newStats.barinma === 'sokak') { targetId = 'hub_street';
                    } else { // 'aile' veya 'kendi_evi'
                        if (newStats.yas <= 14) targetId = 'hub_school';
                        else if (newStats.yas <= 18) targetId = 'hub_teen';
                        else targetId = 'hub_adult';
                    }
                }

                // 4. Hedef Etkinliğin (Next Event) Etkisini Uygula (Eğer varsa)
                let nextEvent = EVENTS[targetId];
                if (nextEvent && nextEvent.effect && !isRandomEventTriggered) { // Random event ilk açılışta etki etmez, seçimi vardır
                    let effectToApply = nextEvent.effect;
                    if (typeof nextEvent.effect === 'function') {
                        const res = nextEvent.effect(newStats);
                        effectToApply = res.effect;
                        if(res.msg) nextEventMsg = res.msg;
                    }
                    applyEffects(effectToApply);
                }

                // --- ÖZEL MEKANİKLER ---
                // Enerji 0'ın altına düşerse Sağlıktan yer
                if (newStats.enerji < 0) {
                    const healthHit = Math.floor(Math.abs(newStats.enerji) / 2);
                    newStats.saglik -= healthHit; diffs.saglik -= healthHit;
                    statChanges.push({ icon: 'fa-battery-empty', text: "Aşırı Yorgunluk! Sağlığın düştü.", color: 'text-red-500' });
                    newStats.enerji = 0; // Enerjiyi sıfırla
                }
                
                // Depresyon Mekaniği
                if (stats.mutluluk <= 0 && diffs.mutluluk <= 0) {
                    newStats.saglik -= 10; diffs.saglik -= 10;
                    statChanges.push({ icon: 'fa-cloud-rain', text: "Ağır Depresyon", color: 'text-slate-500' });
                }

                // Sınırlandırmalar
                newStats.mutluluk = Math.max(0, Math.min(100, newStats.mutluluk));
                newStats.saglik = Math.max(0, Math.min(100, newStats.saglik));
                newStats.enerji = Math.max(0, Math.min(100, newStats.enerji));
                newStats.aileIliski = Math.max(0, Math.min(100, newStats.aileIliski));
                newStats.okul = Math.max(0, Math.min(100, newStats.okul));

                // --- ÖLÜM VE İFLAS KONTROLLERİ ---
                let isDeath = false;
                if (newStats.saglik <= 0) { targetId = 'game_over_health'; isDeath = true; }
                else if (newStats.para <= -1000) { targetId = 'game_over_money'; isDeath = true; }
                else if (newStats.aileIliski <= 0 && newStats.barinma === 'aile') {
                    targetId = newStats.yas < 18 ? 'kicked_out_young' : 'kicked_out_adult';
                }

                // Değişimleri statChanges dizisinde derle (Yazılı Formatta, Toast yerine kartta gösterilecek)
                if (diffs.para !== 0) statChanges.push({ icon: 'fa-coins', label: 'Para', val: diffs.para, color: diffs.para > 0 ? 'text-amber-500' : 'text-red-500' });
                if (diffs.enerji !== 0) statChanges.push({ icon: 'fa-bolt', label: 'Enerji', val: diffs.enerji, color: diffs.enerji > 0 ? 'text-yellow-500' : 'text-orange-500' });
                if (diffs.mutluluk !== 0) statChanges.push({ icon: 'fa-face-smile', label: 'Mutluluk', val: diffs.mutluluk, color: diffs.mutluluk > 0 ? 'text-pink-500' : 'text-red-500' });
                if (diffs.saglik !== 0) statChanges.push({ icon: 'fa-heart', label: 'Sağlık', val: diffs.saglik, color: diffs.saglik > 0 ? 'text-rose-500' : 'text-red-500' });
                if (diffs.aileIliski !== 0) statChanges.push({ icon: 'fa-users', label: 'Aile İlişkisi', val: diffs.aileIliski, color: diffs.aileIliski > 0 ? 'text-violet-500' : 'text-red-500' });
                if (diffs.okul !== 0) statChanges.push({ icon: 'fa-graduation-cap', label: 'Okul Başarısı', val: diffs.okul, color: diffs.okul > 0 ? 'text-indigo-500' : 'text-red-500' });
                if (diffs.zeka !== 0) statChanges.push({ icon: 'fa-brain', label: 'Zeka', val: diffs.zeka, color: diffs.zeka > 0 ? 'text-blue-500' : 'text-red-500' });
                if (diffs.karizma !== 0) statChanges.push({ icon: 'fa-star', label: 'Karizma', val: diffs.karizma, color: diffs.karizma > 0 ? 'text-yellow-500' : 'text-red-500' });
                if (diffs.guc !== 0) statChanges.push({ icon: 'fa-dumbbell', label: 'Güç', val: diffs.guc, color: diffs.guc > 0 ? 'text-orange-500' : 'text-red-500' });
                if (diffs.sans !== 0) statChanges.push({ icon: 'fa-clover', label: 'Şans', val: diffs.sans, color: diffs.sans > 0 ? 'text-emerald-500' : 'text-red-500' });
                if (diffs.tecrube !== 0) statChanges.push({ icon: 'fa-chart-line', label: 'Tecrübe', val: diffs.tecrube, color: diffs.tecrube > 0 ? 'text-cyan-500' : 'text-red-500' });
                
                setStats(newStats);

                // --- SONUÇ KARTI EKRANI ---
                let displayMsg = choiceMsg || nextEventMsg;
                if (isDeath) {
                    displayMsg = "Yaptığın eylemlerin ağırlığına bedenin ve ruhun daha fazla dayanamadı...";
                } else if (!displayMsg) {
                    displayMsg = buildResultText({
                        choice,
                        city: selectedCity,
                        yas: newStats.yas,
                        diffs,
                        isDeath,
                        isRandomEventTriggered
                    });
                }

                // Animasyonlu Kart Çevirme ve Sonucu Ekrana Basma
                setAnimState('card-flip-out');
                setTimeout(() => {
                    setResultData({
                        title: isDeath ? "Acı Son!" : "Sonuç",
                        text: displayMsg,
                        icon: choice.icon,
                        nextId: targetId,
                        isDeath: isDeath,
                        changes: statChanges // Stat değişikliklerini state'e aktarıyoruz
                    });
                    setShowResult(true);
                    setAnimState('card-flip-in');
                    requestAnimationFrame(() => requestAnimationFrame(() => setAnimState('card-idle')));
                }, 300);
            };

            // --- YARDIMCI: Toast Bildirimi ---
            const showToast = (msg, color = 'text-slate-700') => {
                setToast({ msg, color });
                setTimeout(() => setToast(null), 2200);
            };

            // --- KUMARHANE: 21 (Blackjack) Mini Oyunu ---
            const [gamblingState, setGamblingState] = useState(null); // null kapalı, {phase, bet, playerCards, dealerCards, message}

            const drawCard = () => {
                const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
                const suits = ['♠️', '♥️', '♦️', '♣️'];
                const rank = ranks[Math.floor(Math.random() * ranks.length)];
                const suit = suits[Math.floor(Math.random() * suits.length)];
                const value = rank === 'A' ? 11 : (['J', 'Q', 'K'].includes(rank) ? 10 : parseInt(rank, 10));
                return { rank, suit, value, hidden: false };
            };

            const calcScore = (cards) => {
                let total = cards.reduce((sum, c) => sum + (c.hidden ? 0 : c.value), 0);
                let aces = cards.filter(c => !c.hidden && c.rank === 'A').length;
                while (total > 21 && aces > 0) { total -= 10; aces--; }
                return total;
            };

            const openGambling = () => {
                setGamblingState({ phase: 'bet', bet: Math.min(100, stats.para), playerCards: [], dealerCards: [], message: '' });
            };

            const closeGambling = () => setGamblingState(null);

            const startRound = () => {
                setGamblingState((prev) => {
                    if (!prev || prev.bet <= 0 || prev.bet > stats.para) return prev;
                    const playerCards = [drawCard(), drawCard()];
                    const dealerCards = [drawCard(), { ...drawCard(), hidden: true }];
                    setStats((s) => clampAll({ ...s, para: s.para - prev.bet }));
                    const pScore = calcScore(playerCards);
                    if (pScore === 21) {
                        return { ...prev, phase: 'result', playerCards, dealerCards: dealerCards.map(c => ({ ...c, hidden: false })), message: '🎉 21! Doğal Blackjack, kazandın!', outcome: 'blackjack' };
                    }
                    return { ...prev, phase: 'playing', playerCards, dealerCards, message: '' };
                });
            };

            const finishGamblingRound = (playerCards, dealerCardsRevealed, bet) => {
                const pScore = calcScore(playerCards);
                let dCards = [...dealerCardsRevealed];
                let dScore = calcScore(dCards);
                if (pScore <= 21) {
                    while (dScore < 17) { dCards = [...dCards, drawCard()]; dScore = calcScore(dCards); }
                }
                let outcome, message, payout;
                if (pScore > 21) { outcome = 'lose'; message = `💥 21'i geçtin (${pScore}), bahis gitti.`; payout = 0; }
                else if (dScore > 21) { outcome = 'win'; message = `🎉 Kurpiyer battı (${dScore}), sen kazandın!`; payout = bet * 2; }
                else if (pScore > dScore) { outcome = 'win'; message = `🎉 Sen: ${pScore} — Kurpiyer: ${dScore}. Kazandın!`; payout = bet * 2; }
                else if (pScore === dScore) { outcome = 'push'; message = `🤝 Berabere (${pScore}). Bahsin iade edildi.`; payout = bet; }
                else { outcome = 'lose'; message = `😔 Sen: ${pScore} — Kurpiyer: ${dScore}. Kaybettin.`; payout = 0; }

                if (payout > 0) { setStats((s) => clampAll({ ...s, para: s.para + payout })); }
                return { dealerCards: dCards, message, outcome };
            };

            const hitCard = () => {
                setGamblingState((prev) => {
                    if (!prev || prev.phase !== 'playing') return prev;
                    const newPlayerCards = [...prev.playerCards, drawCard()];
                    const score = calcScore(newPlayerCards);
                    if (score > 21) {
                        const revealed = prev.dealerCards.map(c => ({ ...c, hidden: false }));
                        const { dealerCards, message, outcome } = finishGamblingRound(newPlayerCards, revealed, prev.bet);
                        return { ...prev, phase: 'result', playerCards: newPlayerCards, dealerCards, message, outcome };
                    }
                    return { ...prev, playerCards: newPlayerCards };
                });
            };

            const standCard = () => {
                setGamblingState((prev) => {
                    if (!prev || prev.phase !== 'playing') return prev;
                    const revealed = prev.dealerCards.map(c => ({ ...c, hidden: false }));
                    const { dealerCards, message, outcome } = finishGamblingRound(prev.playerCards, revealed, prev.bet);
                    return { ...prev, phase: 'result', dealerCards, message, outcome };
                });
            };

            const playAgainGambling = () => {
                setGamblingState((prev) => ({ phase: 'bet', bet: Math.min(prev?.bet || 100, stats.para), playerCards: [], dealerCards: [], message: '' }));
            };

            // --- EYLEMLER TAB: Serbest Aksiyon Uygula ---
            const handleAction = (action) => {
                if (stats.hapisSayaci > 0) { showToast(`Hapistesin, ${stats.hapisSayaci} adım sonra çıkacaksın.`, 'text-red-500'); return; }
                if (stats.yas < (action.minAge || 0)) { showToast('Bu eylem için yaşın yetersiz.', 'text-red-500'); return; }
                if (action.maxAge !== undefined && stats.yas > action.maxAge) { showToast('Bu eylem için artık yaşın büyük.', 'text-red-500'); return; }
                if (action.cost?.enerji && stats.enerji < action.cost.enerji) { showToast('Yeterli enerjin yok.', 'text-red-500'); return; }
                if (action.cost?.para && stats.para < action.cost.para) { showToast('Yeterli paran yok.', 'text-red-500'); return; }

                if (action.special === 'kumar') {
                    let next = { ...stats };
                    if (action.cost?.enerji) next.enerji -= action.cost.enerji;
                    setStats(clampAll(next));
                    openGambling();
                    return;
                }
				if (action.special === 'kopya') {
    let next = { ...stats };
    if (action.cost?.enerji) next.enerji -= action.cost.enerji;
    setStats(clampAll(next));
    setCheatGameState({ phase: 'playing' });
    return;
}
			if (action.special === 'hirsizlik') {
                    let next = { ...stats };
                    if (action.cost?.enerji) next.enerji -= action.cost.enerji;
                    setStats(clampAll(next));
                    setThiefGameState({ phase: 'playing' });
                    return;
                }
				if (action.special === 'doktor') {
    let next = { ...stats };
    if (action.cost?.para && next.para < action.cost.para) {
        showToast('Yeterli paran yok.', 'text-red-500');
        return;
    
 }

	if (action.special === 'spor') {
    let next = { ...stats };
    if (action.cost?.enerji && next.enerji < action.cost.enerji) {
        showToast('Yeterli enerjin yok.', 'text-red-500');
        return;
    }
    if (action.cost?.enerji) next.enerji -= action.cost.enerji;
    setStats(clampAll(next));
    setGymGameState({ phase: 'playing' });
    return;
}
    if (action.cost?.para) next.para -= action.cost.para;
    setStats(clampAll(next));
    setDoctorGameState({ phase: 'playing' });
    return;
}

                let next = { ...stats };
                if (action.cost?.enerji) next.enerji -= action.cost.enerji;
                if (action.cost?.para) next.para -= action.cost.para;

                let ef = action.effect;
                let resultMsg = null;
                if (typeof action.effect === 'function') {
                    const res = action.effect(next);
                    ef = res.effect;
                    resultMsg = res.msg;
                }
                Object.keys(ef || {}).forEach((k) => {
                    if (k === 'saglik') {
                        let g = ef.saglik;
                        if (g > 0 && next.saglikCarpani) g = Math.round(g * next.saglikCarpani);
                        next.saglik += g;
                    } else if (k === 'saglikCarpani') {
                        next.saglikCarpani = ef.saglikCarpani;
                    } else {
                        next[k] = (next[k] || 0) + ef[k];
                    }
                });
                next = clampAll(next);
                setStats(next);
                showToast(resultMsg || `${action.title} tamamlandı!`, 'text-emerald-600');
            };
			

            // --- İLİŞKİLER TAB: Kişiyle Etkileşim ---
            const handleRelationshipAction = (relId, relAction) => {
                if (relAction.cost?.enerji && stats.enerji < relAction.cost.enerji) { showToast('Yeterli enerjin yok.', 'text-red-500'); return; }
                if (relAction.cost?.para && stats.para < relAction.cost.para) { showToast('Yeterli paran yok.', 'text-red-500'); return; }

                let next = { ...stats };
                if (relAction.cost?.enerji) next.enerji -= relAction.cost.enerji;
                if (relAction.cost?.para) next.para -= relAction.cost.para;
                Object.keys(relAction.statEffect || {}).forEach((k) => { next[k] = (next[k] || 0) + relAction.statEffect[k]; });

                const rel = relationships.find((r) => r.id === relId);
                if (rel && rel.type === 'aile') {
                    next.aileIliski = (next.aileIliski || 0) + Math.round(relAction.levelChange / 3);
                }
                next = clampAll(next);
                setStats(next);

                setRelationships((prev) => prev.map((r) => {
                    if (r.id !== relId) return r;
                    return { ...r, level: Math.max(0, Math.min(100, r.level + relAction.levelChange)) };
                }));

                showToast(`${relAction.label} — ilişki ${relAction.levelChange > 0 ? '+' : ''}${relAction.levelChange}`, relAction.levelChange >= 0 ? 'text-emerald-600' : 'text-red-500');
            };

            // --- MAĞAZA TAB: Ürün Satın Al ---
            const handleBuyItem = (item) => {
                if (item.type === 'permanent' && inventory.includes(item.id)) { showToast('Bu ürüne zaten sahipsin.', 'text-slate-500'); return; }
                if (item.reqBarinma && stats.barinma !== item.reqBarinma) { showToast('Bu ürün için uygun bir evin yok.', 'text-red-500'); return; }
                if (item.minAge && stats.yas < item.minAge) { showToast('Bu ürün için yaşın yetersiz.', 'text-red-500'); return; }
                if (stats.para < item.price) { showToast('Yeterli paran yok.', 'text-red-500'); return; }

                let next = { ...stats, para: stats.para - item.price };
                Object.keys(item.effect || {}).forEach((k) => {
                    if (k === 'saglikCarpaniBonus') next.saglikCarpani = (next.saglikCarpani || 1) + item.effect.saglikCarpaniBonus;
                    else next[k] = (next[k] || 0) + item.effect[k];
                });
                next = clampAll(next);
                setStats(next);

                if (item.type === 'permanent') setInventory((prev) => [...prev, item.id]);
                showToast(`${item.name} satın alındı!`, 'text-emerald-600');
            };

            const handleContinue = () => {
                setAnimState('card-flip-out');
                setTimeout(() => {
                    setShowResult(false);
                    setDisplayEventId(resultData.nextId);
                    
                    if (resultData.isDeath) {
                        setIsGameOver(true);
                        // Ölünce mevcut şehri güncelle (Eğer 40'ı geçtiyse yeni zorlukları aç)
                        setCityProgress(prev => {
                            const prog = prev[selectedCity] || { maxAge: 0, unlockedDiffs: ['kolay'] };
                            const newMax = Math.max(prog.maxAge, stats.yas);
                            let diffs = [...prog.unlockedDiffs];
                            if (newMax >= 40) {
                                if (!diffs.includes('orta')) diffs.push('orta');
                                if (difficulty === 'orta' && !diffs.includes('zor')) diffs.push('zor');
                            }
                            return { ...prev, [selectedCity]: { maxAge: newMax, unlockedDiffs: diffs } };
                        });
                    }

                    setAnimState('card-flip-in');
                    requestAnimationFrame(() => requestAnimationFrame(() => setAnimState('card-idle')));
                }, 300);
            };

            if (gameState === 'menu') {
                return (
                    <div className="app-container">
                        <div className="bg-pattern"></div>
                        <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full">
                            <i className="fas fa-map-location-dot text-6xl text-sky-500 mb-4 filter drop-shadow-md"></i>
                            <h1 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                                Türkiye Yaşam Simülatörü
                            </h1>
                            
                            {/* Yeni Oyun Bölümü (Rastgele 3 Şehir) */}
                            <div className="w-full bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/80 mb-4">
                                <h3 className="text-xs font-black uppercase text-slate-600 mb-3">
                                    <i className="fas fa-dice mr-1 text-sky-500"></i> Yeni Oyuna Başla
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {currentChoicesCities.map(city => {
                                        const cb = getCityBuff(city);
                                        return (
                                            <div key={city} className="bg-white/70 rounded-2xl border border-white/80 shadow-sm overflow-hidden">
                                                {/* Şehir Başlık Bandı */}
                                                <div className="flex items-center justify-between px-3 py-2" style={{ background: `${cb.color}22`, borderBottom: `2px solid ${cb.color}44` }}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl">{cb.emoji}</span>
                                                        <div>
                                                            <div className="font-black text-sm" style={{ color: cb.color }}>{city}</div>
                                                            <div className="text-[9px] text-slate-500 font-semibold">{cb.description}</div>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => startGameWithCity(city)} className="text-white font-black text-[10px] px-3 py-2 rounded-xl shadow active:scale-95 shrink-0" style={{ background: cb.color }}>
                                                        BAŞLA
                                                    </button>
                                                </div>
                                                {/* Buff / Debuff Satırları */}
                                                <div className="px-3 py-2 flex flex-wrap gap-1">
                                                    {cb.buffs.map((b, i) => (
                                                        <span key={i} className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{b}</span>
                                                    ))}
                                                    {cb.debuffs.map((d, i) => (
                                                        <span key={i} className="text-[9px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{d}</span>
                                                    ))}
                                                    {cb.startBonus && Object.keys(cb.startBonus).length > 0 && (
                                                        <span className="text-[9px] font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                                                            ✨ {Object.entries(cb.startBonus).map(([k,v])=>`+${v} ${k}`).join(', ')} (başlangıç)
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button onClick={() => generateMenuCities()} className="mt-3 w-full text-[10px] font-bold text-slate-500 bg-white/50 border border-slate-200 py-1.5 rounded-xl active:scale-95">
                                    <i className="fas fa-rotate-right mr-1"></i> Başka Şehirler Göster
                                </button>
                            </div>

                            {/* Kilidi Açılan Şehirler */}
                            {Object.keys(cityProgress).length > 0 && (
                                <div className="w-full bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/80 max-h-48 overflow-y-auto custom-scrollbar">
                                    <h3 className="text-xs font-black uppercase text-slate-600 mb-2">Kilidi Açılan Şehirler</h3>
                                    <p className="text-[9px] text-slate-500 mb-2">Bir sonraki zorluğu açmak için o şehirde 40 yaşına ulaş.</p>
                                    <div className="flex flex-col gap-2">
                                        {Object.entries(cityProgress).map(([city, data], idx) => {
                                            const cb = getCityBuff(city);
                                            return (
                                            <div key={idx} className="bg-white/50 rounded-xl flex flex-col gap-1 border border-white/50 overflow-hidden">
                                                <div className="flex justify-between items-center px-2 py-1.5" style={{ background: `${cb.color}18` }}>
                                                    <span className="font-bold text-xs flex items-center gap-1">
                                                        <span>{cb.emoji}</span>
                                                        <span style={{ color: cb.color }}>{city}</span>
                                                        <span className="text-[9px] text-slate-400 font-bold">· {data.maxAge} yaş</span>
                                                    </span>
                                                    <div className="flex gap-1">
                                                        {data.unlockedDiffs.map(diff => (
                                                            <button key={diff} onClick={() => startGameWithCity(city, true, diff)} className={`py-0.5 px-2 text-[10px] font-bold rounded-lg shadow-sm active:scale-95 text-white ${diff === 'kolay' ? 'bg-emerald-500' : diff === 'orta' ? 'bg-amber-500' : 'bg-rose-500'}`}>
                                                                {diff.toUpperCase()}
                                                            </button>
                                                        ))}
                                                        {!data.unlockedDiffs.includes('orta') && <span className="py-0.5 px-2 text-[10px] bg-slate-200 text-slate-400 rounded-lg"><i className="fas fa-lock"></i></span>}
                                                        {!data.unlockedDiffs.includes('zor') && <span className="py-0.5 px-2 text-[10px] bg-slate-200 text-slate-400 rounded-lg"><i className="fas fa-lock"></i></span>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-1 px-2 pb-1.5">
                                                    {cb.buffs.slice(0,2).map((b,i)=>(
                                                        <span key={i} className="text-[8px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{b}</span>
                                                    ))}
                                                    {cb.debuffs.slice(0,1).map((d,i)=>(
                                                        <span key={i} className="text-[8px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">{d}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            }

            const currentEvent = EVENTS[displayEventId] || EVENTS['age_0_ev_1'];

            return (
                <div className="app-container">
                    <div className="bg-pattern"></div>

                    {/* Toast Bildirimi */}
                    {toast && (
                        <div className={`absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/80 text-[11px] font-bold whitespace-nowrap ${toast.color}`}>
                            {toast.msg}
                        </div>
                    )}
                    
                    {/* Header Bar with OKUL restored */}
                    <div className="h-20 sm:h-24 bg-white/30 backdrop-blur-md border-b border-white/50 flex items-center justify-between px-1.5 sm:px-3 z-20 shadow-sm relative rounded-b-[1.5rem] gap-0.5 sm:gap-1.5">
                        <StatHeader icon="fa-coins" value={stats.para} type="para" suffix="₺" colorClass="text-amber-500" />
                        <StatHeader icon="fa-bolt" value={stats.enerji} type="enerji" suffix="%" colorClass="text-yellow-500" />
                        <StatHeader icon="fa-face-smile" value={stats.mutluluk} type="mutluluk" suffix="%" colorClass="text-pink-500" />
                        <StatHeader icon="fa-heart" value={stats.saglik} type="saglik" suffix="%" colorClass="text-rose-500" />
                        <StatHeader icon="fa-users" value={stats.aileIliski} type="aile" suffix="%" colorClass="text-violet-500" />
                        <StatHeader icon="fa-graduation-cap" value={stats.okul} type="okul" suffix="%" colorClass="text-indigo-500" />
                        
                        <div className="w-[1px] h-10 bg-gray-300 mx-1 hidden sm:block"></div>
                        
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/70 border border-white/60 shadow-sm flex items-center justify-center active:scale-90 transition-transform shrink-0">
                            <i className={`fas text-[10px] sm:text-sm ${isDarkMode ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-500'}`}></i>
                        </button>
                    </div>

                    {/* Age, City, and Difficulty Pill */}
                    {(() => {
                        const cb = getCityBuff(selectedCity);
                        return (
                            <div className="absolute top-24 sm:top-28 w-full flex flex-col items-center z-10 pointer-events-none mt-2 gap-1.5">
                                <span className="text-[11px] sm:text-[12px] font-black uppercase text-slate-700 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/80 flex items-center gap-2">
                                    <span className="text-pink-500"><i className="fas fa-birthday-cake mr-1"></i> {stats.yas} YAŞ</span>
                                    <span className="text-slate-300">|</span>
                                    <span style={{ color: cb.color }}>
                                        {cb.emoji} {selectedCity}
                                    </span>
                                    <span className="text-slate-300">|</span>
                                    <span>Zorluk: {difficulty}</span>
                                </span>
                                {/* Aktif şehir buff rozetleri */}
                                <div className="flex flex-wrap justify-center gap-1 px-4 max-w-full">
                                    {cb.buffs.slice(0,3).map((b,i) => (
                                        <span key={i} className="text-[8px] font-bold bg-emerald-500/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">{b}</span>
                                    ))}
                                    {cb.debuffs.slice(0,2).map((d,i) => (
                                        <span key={i} className="text-[8px] font-bold bg-red-500/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">{d}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}

                    {/* Main Event Card (Or Result Screen) */}
                    <div className="flex-1 flex flex-col items-center justify-center p-4 z-10 card-perspective w-full h-full relative pb-[110px]">
                        <div ref={!showResult ? dropZoneRef : null} className={`main-card ${animState} ${isHoveringDropZone && !showResult ? 'drop-hover' : ''} z-10`}>
                            {showResult && resultData ? (
                                // --- SONUÇ EKRANI ---
                                <div className="flex flex-col items-center justify-center w-full h-full text-center">
                                    <div className="text-5xl sm:text-6xl mb-2 filter drop-shadow-md cursor-default">
                                        {resultData.icon}
                                    </div>
                                    <h2 className="font-extrabold text-xl sm:text-2xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 uppercase">
                                        {resultData.title}
                                    </h2>
                                    <p className="text-[12px] sm:text-[13px] text-slate-600 leading-snug font-bold mb-4">
                                        {resultData.text}
                                    </p>
                                    
                                    {/* Stat Changes Listing directly on the Result Card */}
                                    <div className="flex flex-wrap justify-center gap-1.5 mb-4 w-full px-2 max-h-24 overflow-y-auto custom-scrollbar">
                                        {resultData.changes && resultData.changes.map((msg, i) => (
                                            <div key={i} className={`flex items-center gap-1 font-black text-[10px] bg-slate-100/50 px-2 py-0.5 rounded shadow-sm border border-slate-200/50 ${msg.color}`}>
                                                <i className={`fas ${msg.icon}`}></i>
                                                {msg.text ? <span>{msg.text}</span> : <span>{msg.label} {msg.val > 0 ? '+' : ''}{msg.val}</span>}
                                            </div>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={handleContinue}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2.5 px-4 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mt-auto text-sm"
                                    >
                                        Devam Et <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            ) : (
                                // --- OLAY EKRANI ---
                                <>
                                    <div className="text-6xl sm:text-7xl mb-4 filter drop-shadow-md transition-transform duration-300 hover:scale-110 cursor-default">
                                        {currentEvent.emoji}
                                    </div>
                                    <h2 className="font-extrabold text-xl sm:text-2xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 uppercase">
                                        {currentEvent.title}
                                    </h2>
                                    <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed font-semibold">
                                        {currentEvent.description}
                                    </p>
                                    
                                    {dragState.isDragging && !isHoveringDropZone && !showResult && (
                                        <div className="absolute inset-0 border-4 border-dashed border-sky-300 rounded-3xl opacity-50 animate-pulse pointer-events-none"></div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Choice Fan (Only show if not in result screen) */}
                    <div className="absolute bottom-[95px] left-0 w-full z-20 flex justify-center pointer-events-none">
                        {!showResult && (
                            <div className="fan-container pointer-events-auto">
                                {currentEvent.choices.map((choice, index) => {
                                    let isDisabled = false;
                                    let reqText = "";
                                    if (choice.req) {
                                        for (const [key, value] of Object.entries(choice.req)) {
                                            if (stats[key] < value) { isDisabled = true; reqText = `(${value}${key==='para'?'₺':''})`; }
                                        }
                                    }

                                    const total = currentEvent.choices.length;
                                    const middle = (total - 1) / 2;
                                    const offset = index - middle;
                                    const isThisCardDragging = dragState.isDragging && dragState.index === index;
                                    const rotation = offset * 12;
                                    const translateY = Math.abs(offset) * 12;
                                    const dragX = isThisCardDragging ? dragState.currentX - dragState.startX : 0;
                                    const dragY = isThisCardDragging ? dragState.currentY - dragState.startY : 0;

                                    return (
                                        <button 
                                            key={index}
                                            disabled={isDisabled}
                                            onPointerDown={(e) => handlePointerDown(e, index, isDisabled)}
                                            onPointerMove={handlePointerMove}
                                            onPointerUp={handlePointerUp}
                                            className={`choice-draggable-card ${isThisCardDragging ? 'dragging' : ''}`}
                                            style={{
                                                transform: isThisCardDragging 
                                                    ? `translate(${dragX}px, ${dragY}px) scale(1.1) rotate(0deg)` 
                                                    : `rotate(${rotation}deg) translateY(${translateY}px) scale(1)`,
                                                zIndex: isThisCardDragging ? 100 : 10 + index,
                                                marginLeft: index === 0 ? '0' : '-30px',
                                                transition: isThisCardDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                            }}
                                        >
                                            <div className="pointer-events-none flex flex-col items-center w-full h-full justify-between">
                                                <span className="text-2xl mt-1">{choice.icon}</span>
                                                <span className="font-bold text-[11px] sm:text-[12px] leading-snug mt-2 text-slate-700">{choice.text}</span>
                                                <div className="h-4 mt-1">
                                                    {isDisabled ? (
                                                        <span className="text-[9px] font-black text-rose-500 bg-rose-100 px-1.5 py-0.5 rounded-full">{reqText}</span>
                                                    ) : (
                                                        <span className={`text-[9px] font-bold text-gray-400 ${animState === 'card-idle' && !dragState.isDragging ? 'animate-pulse' : ''}`}>SÜRÜKLE</span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Stats Under Cards */}
                    <div className="absolute bottom-[60px] left-0 w-full h-[35px] z-10 flex justify-center items-center gap-2 sm:gap-4 px-2 bg-white/30 backdrop-blur-md border-t border-white/40 pointer-events-none">
                        <div className="flex items-center gap-1.5 bg-white/50 px-2 py-1 rounded-lg shadow-sm border border-white/50 text-slate-700">
                            <i className="fas fa-brain text-blue-500 text-[11px]"></i><span className="text-[11px] font-black">{stats.zeka}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/50 px-2 py-1 rounded-lg shadow-sm border border-white/50 text-slate-700">
                            <i className="fas fa-star text-yellow-500 text-[11px]"></i><span className="text-[11px] font-black">{stats.karizma}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/50 px-2 py-1 rounded-lg shadow-sm border border-white/50 text-slate-700">
                            <i className="fas fa-dumbbell text-orange-500 text-[11px]"></i><span className="text-[11px] font-black">{stats.guc}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/50 px-2 py-1 rounded-lg shadow-sm border border-white/50 text-slate-700">
                            <i className="fas fa-clover text-emerald-500 text-[11px]"></i><span className="text-[11px] font-black">{stats.sans}</span>
                        </div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="bottom-nav">
                        <button onClick={() => setActiveTab('game')} className={`nav-btn ${activeTab === 'game' ? 'active' : ''}`}>
                            <i className="fas fa-gamepad"></i> Oyun
                        </button>
                        <button onClick={() => setActiveTab('relationships')} className={`nav-btn ${activeTab === 'relationships' ? 'active' : ''}`}>
                            <i className="fas fa-heart"></i> İlişkiler
                        </button>
                        <button onClick={() => setActiveTab('actions')} className={`nav-btn ${activeTab === 'actions' ? 'active' : ''}`}>
                            <i className="fas fa-bolt"></i> Eylemler
                        </button>
                        <button onClick={() => setActiveTab('store')} className={`nav-btn ${activeTab === 'store' ? 'active' : ''}`}>
                            <i className="fas fa-store"></i> Mağaza
                        </button>
                        <button onClick={() => setActiveTab('stats')} className={`nav-btn ${activeTab === 'stats' ? 'active' : ''}`}>
                            <i className="fas fa-user-astronaut"></i> Karakter
                        </button>
                    </div>

                    {/* İlişkiler Tab Overlay */}
                    {activeTab === 'relationships' && (
                        <div className="stats-overlay">
                            <h2 className="text-2xl font-black mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                                İlişkilerim
                            </h2>
                            <div className="flex flex-col gap-3 pb-4">
                                {relationships.length === 0 && (
                                    <p className="text-center text-xs text-slate-400">Henüz bir ilişkin yok.</p>
                                )}
                                {relationships.map((rel) => (
                                    <div key={rel.id} className="bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white/60 shadow-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="font-bold text-sm flex items-center gap-2">
                                                <span className="text-xl">{rel.emoji}</span>
                                                <span>{rel.name} <span className="text-[10px] text-slate-400 font-semibold">({rel.relation})</span></span>
                                            </div>
                                            <div className="font-black text-xs text-rose-500">{rel.level}/100</div>
                                        </div>
                                        <div className="stat-bar-bg mb-2"><div className="stat-bar-fill bg-rose-400" style={{ width: `${rel.level}%` }}></div></div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {REL_ACTIONS.map((ra) => (
                                                <button key={ra.id} onClick={() => handleRelationshipAction(rel.id, ra)} className="text-[10px] font-bold bg-rose-100 text-rose-600 px-2.5 py-1.5 rounded-lg active:scale-95">
                                                    {ra.icon} {ra.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Eylemler Tab Overlay */}
                    {activeTab === 'actions' && (
                        <div className="stats-overlay">
                            <h2 className="text-2xl font-black mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                                Eylemler
                            </h2>
                            {stats.hapisSayaci > 0 && (
                                <div className="mb-3 bg-red-500/10 border border-red-300 text-red-600 font-bold text-xs text-center py-2 px-3 rounded-xl">
                                    🔒 Hapistesin! {stats.hapisSayaci} adım sonra serbest kalacaksın.
                                </div>
                            )}
                            <div className="flex flex-col gap-2 pb-4">
                                {ACTIONS.map((action) => {
                                    const disabled = stats.hapisSayaci > 0 ||
                                        stats.yas < (action.minAge || 0) ||
                                        (action.maxAge !== undefined && stats.yas > action.maxAge) ||
                                        (action.cost?.enerji && stats.enerji < action.cost.enerji) ||
                                        (action.cost?.para && stats.para < action.cost.para);
                                    return (
                                        <button
                                            key={action.id}
                                            disabled={disabled}
                                            onClick={() => handleAction(action)}
                                            className={`flex items-center gap-3 p-3 rounded-2xl border shadow-sm text-left transition-all active:scale-95 ${disabled ? 'bg-slate-100 border-slate-200 opacity-50' : 'bg-white/50 border-white/60 backdrop-blur-sm'}`}
                                        >
                                            <span className="text-2xl">{action.icon}</span>
                                            <div className="flex-1">
                                                <div className="font-bold text-xs">{action.title}</div>
                                                <div className="text-[10px] text-slate-500">{action.desc}</div>
                                                <div className="text-[9px] text-slate-400 mt-0.5 font-semibold">
                                                    {action.cost?.enerji ? `⚡-${action.cost.enerji} ` : ''}
                                                    {action.cost?.para ? `💰-${action.cost.para} ` : ''}
                                                    {action.minAge ? `· ${action.minAge}+ yaş` : ''}
                                                    {action.maxAge !== undefined ? ` · ${action.maxAge}'e kadar` : ''}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Mağaza Tab Overlay */}
                    {activeTab === 'store' && (
                        <div className="stats-overlay">
                            <h2 className="text-2xl font-black mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                                Mağaza
                            </h2>
                            <div className="flex flex-col gap-2 pb-4">
                                {STORE_ITEMS.map((item) => {
                                    const owned = item.type === 'permanent' && inventory.includes(item.id);
                                    const disabled = owned || stats.para < item.price ||
                                        (item.reqBarinma && stats.barinma !== item.reqBarinma) ||
                                        (item.minAge && stats.yas < item.minAge);
                                    return (
                                        <div key={item.id} className={`flex items-center gap-3 p-3 rounded-2xl border shadow-sm ${owned ? 'bg-emerald-50 border-emerald-200' : 'bg-white/50 border-white/60 backdrop-blur-sm'}`}>
                                            <span className="text-2xl">{item.icon}</span>
                                            <div className="flex-1">
                                                <div className="font-bold text-xs">{item.name}</div>
                                                <div className="text-[10px] text-slate-500">{item.desc}</div>
                                            </div>
                                            <button
                                                disabled={disabled}
                                                onClick={() => handleBuyItem(item)}
                                                className={`text-[10px] font-black px-3 py-2 rounded-xl active:scale-95 shrink-0 ${owned ? 'bg-emerald-500 text-white' : disabled ? 'bg-slate-200 text-slate-400' : 'bg-amber-500 text-white'}`}
                                            >
                                                {owned ? 'ALINDI' : `${item.price}₺`}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Stats Tab Overlay */}
                    {activeTab === 'stats' && (
                        <div className="stats-overlay">
                            <h2 className="text-2xl font-black mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                                Kişisel Özellikler
                            </h2>
                            <div className="flex flex-col gap-6">
                                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/60 shadow-sm">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-bold text-blue-600 flex items-center gap-2"><i className="fas fa-brain"></i> Zeka</div>
                                        <div className="font-black text-sm">{stats.zeka}/100</div>
                                    </div>
                                    <div className="stat-bar-bg"><div className="stat-bar-fill bg-blue-500" style={{ width: `${Math.min(100, stats.zeka)}%` }}></div></div>
                                </div>
                                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/60 shadow-sm">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-bold text-yellow-500 flex items-center gap-2"><i className="fas fa-star"></i> Karizma</div>
                                        <div className="font-black text-sm">{stats.karizma}/100</div>
                                    </div>
                                    <div className="stat-bar-bg"><div className="stat-bar-fill bg-yellow-400" style={{ width: `${Math.min(100, stats.karizma)}%` }}></div></div>
                                </div>
                                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/60 shadow-sm">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-bold text-orange-500 flex items-center gap-2"><i className="fas fa-dumbbell"></i> Güç</div>
                                        <div className="font-black text-sm">{stats.guc}/100</div>
                                    </div>
                                    <div className="stat-bar-bg"><div className="stat-bar-fill bg-orange-500" style={{ width: `${Math.min(100, stats.guc)}%` }}></div></div>
                                </div>
                                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/60 shadow-sm">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-bold text-emerald-500 flex items-center gap-2"><i className="fas fa-clover"></i> Şans</div>
                                        <div className="font-black text-sm">{stats.sans}/100</div>
                                    </div>
                                    <div className="stat-bar-bg"><div className="stat-bar-fill bg-emerald-500" style={{ width: `${Math.min(100, stats.sans)}%` }}></div></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Kumarhane Modal (21 / Blackjack) */}
                    {gamblingState && (
                        <div className="stats-overlay" style={{ zIndex: 45 }}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500">
                                    🎰 21 Masası
                                </h2>
                                <button onClick={closeGambling} className="text-slate-400 text-lg font-black px-2">✕</button>
                            </div>

                            {gamblingState.phase === 'bet' && (
                                <div className="flex flex-col gap-4">
                                    <p className="text-xs text-slate-500 font-semibold text-center">Bahis miktarını seç ve masaya otur.</p>
                                    <div className="text-center font-black text-2xl">{gamblingState.bet}₺</div>
                                    <input
                                        type="range" min="10" max={Math.max(10, stats.para)} step="10"
                                        value={Math.min(gamblingState.bet, Math.max(10, stats.para))}
                                        onChange={(e) => setGamblingState((prev) => ({ ...prev, bet: parseInt(e.target.value, 10) }))}
                                        className="w-full"
                                    />
                                    <div className="flex gap-2 justify-center flex-wrap">
                                        {[50, 100, 250, 500].map((v) => (
                                            <button key={v} onClick={() => setGamblingState((prev) => ({ ...prev, bet: Math.min(v, Math.max(10, stats.para)) }))} className="text-[10px] font-bold bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg active:scale-95">
                                                {v}₺
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-[10px] text-center text-slate-400 font-semibold">Cebinde {stats.para}₺ var.</div>
                                    <button
                                        onClick={startRound}
                                        disabled={stats.para < 10}
                                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-2.5 px-4 rounded-xl shadow-md active:scale-95 transition-all disabled:opacity-40 text-sm"
                                    >
                                        Kartları Dağıt
                                    </button>
                                </div>
                            )}

                            {(gamblingState.phase === 'playing' || gamblingState.phase === 'result') && (
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 mb-1">KURPİYER {gamblingState.phase === 'result' ? `(${calcScore(gamblingState.dealerCards)})` : ''}</div>
                                        <div className="flex gap-1.5 flex-wrap">
                                            {gamblingState.dealerCards.map((c, i) => (
                                                <div key={i} className="w-10 h-14 rounded-lg bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center font-black text-xs">
                                                    {c.hidden ? <span className="text-slate-300">🂠</span> : <><span>{c.rank}</span><span>{c.suit}</span></>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 mb-1">SEN ({calcScore(gamblingState.playerCards)})</div>
                                        <div className="flex gap-1.5 flex-wrap">
                                            {gamblingState.playerCards.map((c, i) => (
                                                <div key={i} className="w-10 h-14 rounded-lg bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center font-black text-xs">
                                                    <span>{c.rank}</span><span>{c.suit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {gamblingState.phase === 'playing' && (
                                        <div className="flex gap-2 mt-2">
                                            <button onClick={hitCard} className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-black py-2.5 rounded-xl shadow-md active:scale-95 text-sm">Kart Çek</button>
                                            <button onClick={standCard} className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-black py-2.5 rounded-xl shadow-md active:scale-95 text-sm">Dur</button>
                                        </div>
                                    )}

                                    {gamblingState.phase === 'result' && (
                                        <div className="flex flex-col gap-3 mt-2">
                                            <div className={`text-center font-bold text-xs p-3 rounded-xl ${gamblingState.outcome === 'lose' ? 'bg-red-50 text-red-600' : gamblingState.outcome === 'push' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                {gamblingState.message}
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={playAgainGambling} disabled={stats.para < 10} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-black py-2.5 rounded-xl shadow-md active:scale-95 text-sm disabled:opacity-40">Tekrar Oyna</button>
                                                <button onClick={closeGambling} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black py-2.5 rounded-xl shadow-md active:scale-95 text-sm">Masadan Kalk</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
					
					{/* Kopya Çekme Minigame Modal */}
                    {cheatGameState && (
                        <CheatMinigame 
                            onWin={handleCheatWin} 
                            onLose={handleCheatLose} 
                            onClose={() => setCheatGameState(null)} 
                        />
                    )}
					{thiefGameState && (
                        <ThiefMinigame 
                            onWin={handleThiefWin} 
                            onLose={handleThiefLose} 
                            onClose={() => setThiefGameState(null)} 
                        />
                    )}
					{doctorGameState && (
    <DoctorMinigame 
        onWin={handleDoctorWin} 
        onLose={handleDoctorLose} 
        onClose={() => setDoctorGameState(null)} 
    />
)}
{gymGameState && (
    <GymMinigame 
        onWin={handleGymWin} 
        onLose={handleGymLose} 
        onClose={() => setGymGameState(null)} 
    />
)}
                </div>
            );
        };
