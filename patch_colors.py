import sys, re

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

# For a 40% darker feel in the admin section:
# Replace bg-slate-100 with bg-slate-200
# Replace bg-slate-50 with bg-slate-100
# Replace border-slate-200 with border-slate-300

content = content.replace("bg-slate-100", "bg-slate-200")
content = content.replace("bg-slate-50", "bg-slate-100")
content = content.replace("border-slate-200", "border-slate-300")

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
print("Patched colors")
