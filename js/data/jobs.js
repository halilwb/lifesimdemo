// data/jobs.js — Maaş / kariyer hesaplama
// NOT: Oyunda henüz ayrı bir "iş ilanları" listesi yok; maaş inline bir formülle
// hesaplanıyordu (EVENTS.adult_work içinde). Yeniden kullanılabilir olması için
// buraya taşındı. Gelecekte gerçek bir iş/meslek listesi burada tutulabilir.
const calculateSalary = (s) => {
    let maas = 500;
    if (s.zeka > 60) maas += 300;
    if (s.okul > 70) maas += 200;
    if (s.karizma > 50) maas += 100;
    return maas;
};
