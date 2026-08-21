import sys

with open('src/views/SimpleViews.tsx', 'r') as f:
    content = f.read()

target_icon = 'className="w-[52px] h-[52px] bg-[#fdf4ff] text-[#c026d3] rounded-2xl flex items-center justify-center shrink-0"'
replacement_icon = 'className="w-[52px] h-[52px] bg-[#eef4ff] text-[#2563eb] rounded-2xl flex items-center justify-center shrink-0"'
content = content.replace(target_icon, replacement_icon)

target_btn = 'className="bg-[#c026d3] hover:bg-fuchsia-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shrink-0 w-full sm:w-auto"'
replacement_btn = 'className="bg-[#1c5df9] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shrink-0 w-full sm:w-auto"'
content = content.replace(target_btn, replacement_btn)

with open('src/views/SimpleViews.tsx', 'w') as f:
    f.write(content)
