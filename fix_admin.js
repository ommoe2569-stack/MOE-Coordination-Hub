import fs from 'fs';
let content = fs.readFileSync('src/views/AdminView.tsx', 'utf8');

// Inside SystemManagement, add handleFeatureToggle
content = content.replace(
  'const linkConfigs = [',
  `const handleFeatureToggle = (key: string, checked: boolean) => {
    if (!selectedProjectId) return;
    setProjects(projects.map(p => {
      if (p.id === selectedProjectId) {
        return {
          ...p,
          features: {
            ...(p.features || {}),
            [key]: checked
          }
        };
      }
      return p;
    }));
  };

  const featureConfigs = [
    { key: 'register', label: 'แบบแจ้งรายชื่อ' },
    { key: 'download', label: 'เอกสาร' },
    { key: 'ebook', label: 'E-Book' },
    { key: 'social', label: 'Social Wall' },
    { key: 'qa', label: 'Q&A' },
    { key: 'gallery', label: 'แกลเลอรี่' },
    { key: 'evaluation', label: 'ประเมินผล' },
    { key: 'manual', label: 'คู่มือ' },
  ];

  const linkConfigs = [`
);

const featureHtml = `
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4">การแสดงผลเมนูหลัก (สำหรับผู้ใช้งาน)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {featureConfigs.map(config => {
                const isEnabled = selectedProject.features?.[config.key] !== false; // Default true
                return (
                  <label key={config.key} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-bold text-slate-700">{config.label}</span>
                    <div className="relative inline-block w-10 h-6 shrink-0 transition-colors duration-200 ease-in-out">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={isEnabled}
                        onChange={(e) => handleFeatureToggle(config.key, e.target.checked)}
                      />
                      <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:bg-indigo-500 transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm"></div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>`;

content = content.replace(
  '</div>\n        </div>\n      )}\n    </div>\n  );\n}',
  `</div>\n${featureHtml}\n        </div>\n      )}\n    </div>\n  );\n}`
);

fs.writeFileSync('src/views/AdminView.tsx', content);
