import sys, re

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

# I want to change bg-slate-300 back to bg-slate-200
# And bg-slate-200 back to bg-slate-100
# And border-slate-400 back to border-slate-300
content = content.replace("bg-slate-300", "TEMP_SLATE_200")
content = content.replace("bg-slate-200", "bg-slate-100")
content = content.replace("TEMP_SLATE_200", "bg-slate-200")
content = content.replace("border-slate-400", "border-slate-300")

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
print("Reverted to medium dark")
