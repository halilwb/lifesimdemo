// systems/money.js — Para sistemi
// NOT: Para değişiklikleri şu an handleChoice / handleAction (game.js) içinde
// doğrudan effect objeleri ({ para: ... }) üzerinden uygulanıyor; ayrı bir para
// motoru yok. Ortak kullanılabilecek küçük bir yardımcı burada tutuluyor.

const formatMoney = (para) => `${Math.round(para)}₺`;
