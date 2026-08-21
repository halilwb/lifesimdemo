// build.js
// js/ altındaki modülleri doğru sırayla okuyup index.html içindeki
// <script type="text/babel"> bloğuna gömer ve oynanabilir hale getirir.
//
// NEDEN GEREKLİ? index.html'i çift tıklayıp (file://) açtığında, tarayıcı
// güvenlik kısıtlaması (CORS) yüzünden Babel'in ayrı .js dosyalarını
// yükleyemiyor. Bu yüzden js/ klasöründeki dosyalar gerçek ve düzenlenebilir,
// ama oyunu açmadan ÖNCE bu script ile tek dosyada birleştirilmeleri gerekiyor.
//
// KULLANIM:
//   1) js/... altındaki herhangi bir dosyada değişiklik yap
//   2) bu klasörde:  node build.js
//   3) index.html'i tarayıcıda aç / yenile
//
// index.html'i KENDİN elle değiştirme — build.js her çalıştığında
// <script type="text/babel"> içeriğini tamamen yeniden üretir.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf-8').replace(/\n+$/, '');

// Yükleme sırası önemli: data -> systems -> events -> game -> main
// (events/events.js, events/random.js'teki INTERACTIVE_RANDOM_EVENTS'e ihtiyaç duyar,
//  bu yüzden random.js ondan önce gelmeli)
const MODULES = [
  'js/data/names.js',
  'js/data/items.js',
  'js/data/countries.js',
  'js/data/jobs.js',

  'js/systems/money.js',
  'js/systems/stats.js',
  'js/systems/age.js',
  'js/systems/health.js',
  'js/systems/education.js',
  'js/systems/career.js',

  'js/events/random.js',
  'js/events/events.js',
  'js/events/childhood.js',
  'js/events/education.js',
  'js/events/career.js',

  'js/game.js',
  'js/main.js',
];

const body = MODULES.map(read).join('\n\n');

const template = fs.readFileSync(path.join(ROOT, 'index.template.html'), 'utf-8');

if (!template.includes('__BODY__')) {
  console.error('❌ index.template.html içinde __BODY__ yer tutucusu bulunamadı.');
  process.exit(1);
}

const output = template.replace('__BODY__', () => body);

fs.writeFileSync(path.join(ROOT, 'index.html'), output, 'utf-8');

console.log('✅ Derleme tamam: index.html üretildi/güncellendi. Tarayıcıda aç / yenile.');
