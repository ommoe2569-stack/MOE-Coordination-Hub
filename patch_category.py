import sys

with open('src/views/CalendarView.tsx', 'r') as f:
    lines = f.readlines()

out = []
skip = False
for i, line in enumerate(lines):
    if '<p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">หมวดหมู่</p>' in line:
        skip = True
        # also pop the previous line `<div className="flex-1">`
        out.pop()
    if skip and '</div>' in line:
        skip = False
        continue
    if not skip:
        out.append(line)

with open('src/views/CalendarView.tsx', 'w') as f:
    f.writelines(out)
print("Patched category successfully")
