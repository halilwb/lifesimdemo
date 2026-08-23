// systems/age.js — Yaş aralığı / dönem belirleme
const ageBracket = (yas) => {
            if (yas <= 2) return 'bebek';
            if (yas <= 6) return 'cocuk_kucuk';
            if (yas <= 12) return 'cocuk';
            if (yas <= 18) return 'ergen';
            if (yas <= 25) return 'genc';
            if (yas <= 40) return 'yetiskin';
            if (yas <= 60) return 'orta_yas';
            return 'yasli';
        };

        // Ruh hali: statChanges toplamından kabaca pozitif/negatif/nötr çıkarımı
