// systems/health.js — Sağlık sistemi
// NOT: Sağlık mantığının büyük kısmı (saglikCarpani, item/action efektleri)
// halen data/items.js, systems/stats.js ve game.js içindeki effect objelerinde.
// Bu dosya, sağlıkla ilgili yardımcı fonksiyonlar büyüdükçe genişletilmek üzere
// ayrılmış bir yer tutucudur.

const isHealthCritical = (saglik) => saglik <= 30;
