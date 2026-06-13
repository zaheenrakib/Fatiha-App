const fs = require('fs');
const file = 'd:/P Project/Learn/React Native/Fatiha/lib/sura.ts';
let code = fs.readFileSync(file, 'utf8');

// Use typescript compiler to read it or just regex
const blockRegex = /id:\s*(\d+),[\s\S]*?nameBangla:\s*"([^"]+)"[\s\S]*?ayahs:\s*\[([\s\S]*?)\]/g;
let match;
while ((match = blockRegex.exec(code)) !== null) {
  let id = match[1];
  let nameBangla = match[2];
  let ayahsBlock = match[3];
  
  let firstAyahs = [...ayahsBlock.matchAll(/ayahNumber:\s*(\d+)[\s\S]*?arabic:\s*"([^"]+)"/g)].slice(0, 2);
  console.log(`ID: ${id}, ${nameBangla}`);
  firstAyahs.forEach(a => console.log(`  Ayah ${a[1]}: ${a[2].substring(0, 40)}`));
}
