const fs = require('fs');
let code = fs.readFileSync('src/views/CalendarView.tsx', 'utf8');

const oldPrintRegex = /const handlePrint = useReactToPrint\(\{[\s\S]*?onAfterPrint: \(\) => \{[\s\S]*?\}\s*\}\);\s*/;

code = code.replace(oldPrintRegex, 'const handlePrint = () => {\n    window.print();\n  };\n\n  ');

code = code.replace("import { useReactToPrint } from 'react-to-print';\n", "");

fs.writeFileSync('src/views/CalendarView.tsx', code);
