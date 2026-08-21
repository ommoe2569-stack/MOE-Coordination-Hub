import sys

def replace_in_file(filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()
    
    for target, repl in replacements:
        content = content.replace(target, repl)
        
    with open(filepath, 'w') as f:
        f.write(content)

# 1. DataViews.tsx replacements
data_views_repl = [
    ('<h2 className="text-2xl font-extrabold text-slate-800 mb-6">Photo Gallery</h2>', '<h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6">Photo Gallery</h2>'),
    ('<h3 className="font-extrabold text-slate-800 mb-5 text-sm uppercase tracking-wider px-1">', '<h3 className="font-extrabold text-slate-800 dark:text-white mb-5 text-sm uppercase tracking-wider px-1">'),
    ('เอกสารอื่น', 'เอกสารที่เกี่ยวข้อง')
]
replace_in_file('src/views/DataViews.tsx', data_views_repl)

# 2. AdminView.tsx replacements
admin_views_repl = [
    ('เอกสารอื่น', 'เอกสารที่เกี่ยวข้อง'),
    ("key: 'other_docs', label: 'เอกสารที่เกี่ยวข้อง'", "key: 'other_docs', label: 'เอกสารที่เกี่ยวข้อง'"), # Ensure the key didn't get messed up if I used it, but I just replace all "เอกสารอื่น"
]
replace_in_file('src/views/AdminView.tsx', admin_views_repl)

# 3. HomeView.tsx replacements
home_views_repl = [
    ('เอกสารอื่น', 'เอกสารที่เกี่ยวข้อง')
]
replace_in_file('src/views/HomeView.tsx', home_views_repl)

# 4. Sidebar.tsx replacements
sidebar_views_repl = [
    ('เอกสารอื่น', 'เอกสารที่เกี่ยวข้อง')
]
replace_in_file('src/components/Sidebar.tsx', sidebar_views_repl)

print("Done")
