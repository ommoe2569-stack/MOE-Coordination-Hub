const fs = require('fs');
const path = './src/views/DataViews.tsx';
let content = fs.readFileSync(path, 'utf8');

// The add button should be available to everyone if we want users to add
content = content.replace(/{isAdmin && !isAdding && \(/, '{!isAdding && (');

// Keep isAdmin for deleting
// The delete button currently looks like {isAdmin && (...)}

fs.writeFileSync(path, content);
