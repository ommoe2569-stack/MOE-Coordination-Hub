import sys

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

content = content.replace('ทดสอบลิงก์', 'ลิงค์เอกสาร')

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)

print("Replaced all occurrences")
