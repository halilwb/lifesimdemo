// systems/education.js — Eğitim sistemi
// NOT: "okul" istatistiği ACTIONS (systems/stats.js) ve EVENTS (events/events.js)
// içindeki effect objeleri üzerinden değişiyor; ayrı bir eğitim motoru henüz yok.
// Bu dosya ileride eğitim aşamaları/notlar gibi mantık eklemek için ayrılmıştır.

const isSchoolSuccessful = (okul) => okul >= 70;
