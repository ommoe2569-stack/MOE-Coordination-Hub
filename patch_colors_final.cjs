const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// remove old @theme if it exists
css = css.replace(/@theme\s*{[\s\S]*?}/, '').trim();

const themeStr = `
@theme {
  --color-blue-50: #E8F0FE;
  --color-blue-100: #D2E3FC;
  --color-blue-200: #AECBFA;
  --color-blue-300: #8AB4F8;
  --color-blue-400: #669DF6;
  --color-blue-500: #4285F4;
  --color-blue-600: #1A73E8;
  --color-blue-700: #1967D2;
  --color-blue-800: #185ABC;
  --color-blue-900: #174EA6;
  --color-blue-950: #0D3C81;
}
`;

css = `@import "tailwindcss";\n${themeStr}\n` + css.replace('@import "tailwindcss";', '').trim();
fs.writeFileSync('src/index.css', css);
