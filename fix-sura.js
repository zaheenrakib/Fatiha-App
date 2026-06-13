const fs = require('fs');
const file = 'd:/P Project/Learn/React Native/Fatiha/lib/sura.ts';
let code = fs.readFileSync(file, 'utf8');

const bismillahObj = `{
        ayahNumber: 0,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        banglaUccaron: "বিসমিল্লাহির রাহমানির রাহীম",
        banglaMeaning: "শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।",
      },`;

// We will iterate through each sura block
let newCode = code;

// A regex to match each sura block
const suraRegex = /(id:\s*\d+,[\s\S]*?ayahs:\s*\[)([\s\S]*?)(\n\s*\],?)/g;

let match;
let finalCode = '';
let lastIndex = 0;

while ((match = suraRegex.exec(code)) !== null) {
  let prefix = code.substring(lastIndex, match.index);
  let suraStart = match[1];
  let ayahsBlock = match[2];
  let suraEnd = match[3];
  
  // Check if Bismillah already exists
  if (ayahsBlock.includes('বিসমিল্লাহির রাহমানির রাহীম') || ayahsBlock.includes('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')) {
    // If it exists, find the ayah block that has it and make sure ayahNumber is 0
    // and banglaMeaning is "শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।"
    
    // We can replace the existing Bismillah block
    let replacedAyahsBlock = ayahsBlock.replace(/\{\s*ayahNumber:\s*\d+,\s*arabic:\s*"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"[\s\S]*?banglaMeaning:\s*"[^"]*",?\s*\},?/g, bismillahObj);
    
    // Sometimes it might not match perfectly if formatting varies, let's just use a more relaxed regex
    replacedAyahsBlock = ayahsBlock.replace(/\{\s*ayahNumber:\s*\d+,\s*arabic:\s*"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"[^}]*\},?/g, bismillahObj);
    
    // If it didn't replace because of missing banglaMeaning or something
    if (replacedAyahsBlock === ayahsBlock) {
       replacedAyahsBlock = ayahsBlock.replace(/\{\s*ayahNumber:\s*\d+,\s*arabic:\s*"(?:بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ|بسم الله الرحمن الرحيم)"[\s\S]*?\},?/g, bismillahObj);
    }
    
    finalCode += prefix + suraStart + replacedAyahsBlock + suraEnd;
  } else {
    // It doesn't exist, so prepend it
    finalCode += prefix + suraStart + '\n      ' + bismillahObj + ayahsBlock + suraEnd;
  }
  
  lastIndex = suraRegex.lastIndex;
}
finalCode += code.substring(lastIndex);

fs.writeFileSync('d:/P Project/Learn/React Native/Fatiha/lib/sura.ts', finalCode, 'utf8');
console.log('Modified sura.ts successfully.');
