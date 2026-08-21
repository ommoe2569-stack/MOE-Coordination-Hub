import sys, re

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

# Make it even darker
content = content.replace("bg-slate-200", "bg-slate-300")
content = content.replace("bg-slate-100", "bg-slate-200")
content = content.replace("border-slate-300", "border-slate-400")

# Fix any double replacements or errors (e.g., if there were originally bg-slate-200 that got bumped twice, that's fine, they become 400 or something, but we need to check invalid ones)
content = content.replace("bg-slate-3000", "bg-slate-300")
content = content.replace("bg-slate-2000", "bg-slate-200")

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
print("Patched colors darker")
