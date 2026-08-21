import sys

with open('src/views/HomeView.tsx', 'r') as f:
    content = f.read()

new_btn = "    { icon: Phone, label: 'ทำเนียบผู้ติดต่อ', view: 'contact' as ViewType, color: 'text-indigo-800', bg: 'bg-gradient-to-br from-indigo-200 to-blue-300', hover: 'hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1' },\n"
if "icon: Phone, label: 'ทำเนียบผู้ติดต่อ'" not in content:
    # insert before HelpCircle
    content = content.replace("    { icon: HelpCircle, label: 'Q&A',", new_btn + "    { icon: HelpCircle, label: 'Q&A',")

# also import Phone
if "Phone" not in content[:content.find("from 'lucide-react'")]:
    content = content.replace("Image as ImageIcon, ClipboardList", "Image as ImageIcon, ClipboardList, Phone")

with open('src/views/HomeView.tsx', 'w') as f:
    f.write(content)
