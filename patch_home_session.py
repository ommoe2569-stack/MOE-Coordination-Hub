import sys

with open('src/views/HomeView.tsx', 'r') as f:
    content = f.read()

target = """          <div className="p-6 border-b border-slate-50 flex items-center justify-between print:hidden">
            <h3 className="font-extrabold text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2 print:text-lg">
              <div className="w-1.5 h-4 bg-blue-500 rounded-full print:bg-black"></div>
              กำหนดการวันนี้
            </h3>
          </div>
          <div className="p-6 print:px-0">
            {activeSessions.length === 0 ? (
              <div className="py-8 text-center text-slate-400 font-medium">ยังไม่มีกำหนดการในขณะนี้</div>
            ) : (
              <div className="flex flex-col pt-2">
                {activeSessions.map((item, index) => {
                  const isBreak = item.tag === 'พัก';
                  const dotLineColor = isBreak ? 'bg-[#1cb0d6]' : 'bg-[#7e3af2]'; // Cyan for break, purple for others
                  const isLast = index === activeSessions.length - 1;
                  
                  return (
                    <div key={item.id} className="relative flex items-stretch min-h-[4.5rem] print:break-inside-avoid">
                      {/* Timeline Column */}
                      <div className="w-10 flex flex-col items-center print:w-8">
                        <div className={`w-3 h-3 rounded-full ${dotLineColor} z-10 shrink-0 mt-1 print:border-2 print:border-black print:bg-slate-100`}></div>
                        {!isLast && (
                          <div className={`w-0.5 grow ${dotLineColor} -mt-1 mb-1 opacity-90 print:bg-slate-300`}></div>
                        )}
                      </div>
                      
                      {/* Content Column */}
                      <div className="flex-1 pb-8 -mt-0.5 pr-4 print:pb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[13px] font-bold text-slate-600 print:text-black print:text-sm">{item.time}</span>
                          <span className={`px-3 py-0.5 bg-purple-100 text-purple-700 text-[10px] rounded-full font-bold print:border print:border-slate-300 print:bg-slate-100 print:text-black print:text-xs ${isBreak ? 'bg-blue-50 text-blue-700' : 'bg-blue-50 text-blue-700'}`}>
                            {item.tag}
                          </span>
                        </div>
                        <h4 className="text-[14px] md:text-[15px] font-extrabold text-slate-800 leading-relaxed print:text-black print:text-base">{item.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>"""

replacement = """          {activeSessions.length === 0 ? (
            <div className="p-6 print:px-0">
              <div className="py-8 text-center text-slate-400 font-medium">ยังไม่มีกำหนดการในขณะนี้</div>
            </div>
          ) : (
            Object.entries(
              activeSessions.reduce((acc, s) => {
                const d = s.date || activeProject?.startDate || 'default';
                if (!acc[d]) acc[d] = [];
                acc[d].push(s);
                return acc;
              }, {} as Record<string, typeof activeSessions>)
            ).sort(([a], [b]) => a.localeCompare(b)).map(([date, sessions], groupIndex) => (
              <div key={date} className="mb-4">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between print:hidden">
                  <h3 className="font-extrabold text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2 print:text-lg">
                    <div className="w-1.5 h-4 bg-blue-500 rounded-full print:bg-black"></div>
                    {date === 'default' ? 'กำหนดการ' : `กำหนดการ ${formatThaiDate(date)}`}
                  </h3>
                </div>
                {/* Print only header for each date if multiple days */}
                <div className="hidden print:block print:px-0 pt-4 pb-2 border-b border-slate-300 mb-4">
                  <h3 className="font-bold text-black text-lg">
                    {date === 'default' ? 'กำหนดการ' : `กำหนดการ ${formatThaiDate(date)}`}
                  </h3>
                </div>
                <div className="p-6 print:px-0 pt-2 pb-0">
                  <div className="flex flex-col pt-2">
                    {sessions.map((item, index) => {
                      const isBreak = item.tag === 'พัก';
                      const dotLineColor = isBreak ? 'bg-[#1cb0d6]' : 'bg-[#7e3af2]'; // Cyan for break, purple for others
                      const isLast = index === sessions.length - 1;
                      
                      return (
                        <div key={item.id} className="relative flex items-stretch min-h-[4.5rem] print:break-inside-avoid">
                          {/* Timeline Column */}
                          <div className="w-10 flex flex-col items-center print:w-8">
                            <div className={`w-3 h-3 rounded-full ${dotLineColor} z-10 shrink-0 mt-1 print:border-2 print:border-black print:bg-slate-100`}></div>
                            {!isLast && (
                              <div className={`w-0.5 grow ${dotLineColor} -mt-1 mb-1 opacity-90 print:bg-slate-300`}></div>
                            )}
                          </div>
                          
                          {/* Content Column */}
                          <div className="flex-1 pb-8 -mt-0.5 pr-4 print:pb-6">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-[13px] font-bold text-slate-600 print:text-black print:text-sm">{item.time}</span>
                              <span className={`px-3 py-0.5 bg-purple-100 text-purple-700 text-[10px] rounded-full font-bold print:border print:border-slate-300 print:bg-slate-100 print:text-black print:text-xs ${isBreak ? 'bg-blue-50 text-blue-700' : 'bg-blue-50 text-blue-700'}`}>
                                {item.tag}
                              </span>
                            </div>
                            <h4 className="text-[14px] md:text-[15px] font-extrabold text-slate-800 leading-relaxed print:text-black print:text-base">{item.title}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}"""

content = content.replace(target, replacement)

with open('src/views/HomeView.tsx', 'w') as f:
    f.write(content)
