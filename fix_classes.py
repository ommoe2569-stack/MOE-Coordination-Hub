import sys, re

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

content = content.replace("bg-slate-1000", "bg-slate-500")
content = content.replace("border-slate-300/60", "border-slate-200/60") # keep some things right

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
print("Fixed invalid classes")
