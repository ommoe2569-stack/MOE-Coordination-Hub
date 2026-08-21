const sessions = [
  { id: '1', date: '2026-08-17', time: '09:00' },
  { id: '2', date: '2026-08-17', time: '10:00' },
  { id: '3', date: '2026-08-18', time: '09:00' },
  { id: '4', date: '', time: '08:00' },
];

const grouped = sessions.reduce((acc, s) => {
  const d = s.date || 'default';
  if(!acc[d]) acc[d] = [];
  acc[d].push(s);
  return acc;
}, {});

console.log(grouped);
