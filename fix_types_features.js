import fs from 'fs';
let content = fs.readFileSync('src/types.ts', 'utf8');

if (!content.includes('features?:')) {
  content = content.replace(
    /links\?: \{[^}]*\};/s,
    match => match + '\n  features?: Record<string, boolean>;'
  );
  fs.writeFileSync('src/types.ts', content);
}
