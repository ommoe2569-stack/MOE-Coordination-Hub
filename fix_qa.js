import fs from 'fs';
let content = fs.readFileSync('src/views/DataViews.tsx', 'utf8');

// Remove session state
content = content.replace("const [session, setSession] = React.useState('');\n", "");
content = content.replace("setSession('');\n", "");

// Replace the select element and update flex layout
const oldFlexContainer = `<div className="flex flex-col md:flex-row gap-4">
            <select 
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-xl border border-emerald-200 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-emerald-400 transition-all bg-white text-sm font-medium text-slate-700 shadow-sm"
            >
              <option value="">เลือก Session (ไม่บังคับ)</option>
              <option value="s1">Session 1</option>
              <option value="s2">Session 2</option>
            </select>
            
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-sm shadow-emerald-200 flex items-center justify-center gap-2 text-sm whitespace-nowrap">
              ส่งคำถาม 
            </button>
          </div>`;

const newFlexContainer = `<div className="flex justify-end mt-2">
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-sm shadow-emerald-200 flex items-center justify-center gap-2 text-sm whitespace-nowrap">
              ส่งคำถาม 
            </button>
          </div>`;

content = content.replace(oldFlexContainer, newFlexContainer);

fs.writeFileSync('src/views/DataViews.tsx', content);
