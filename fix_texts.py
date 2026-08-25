import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalize to base "ผังแนวทาง" temporarily if needed, or use regex
    # Replace "ผังแนวทางดำเนินงาน" with "ผังแนวทางการดำเนินงาน"
    # Replace "ผังแนวทาง" (not followed by "การดำเนินงาน" or "ดำเนินงาน") with "ผังแนวทางการดำเนินงาน"
    
    # First, let's just make everything "ผังแนวทางการดำเนินงาน"
    # To do this safely:
    # 1. Replace "ผังแนวทางการดำเนินงาน" with a placeholder "___PLACEHOLDER___"
    content = content.replace("ผังแนวทางการดำเนินงาน", "___PLACEHOLDER___")
    # 2. Replace "ผังแนวทางดำเนินงาน" with "___PLACEHOLDER___"
    content = content.replace("ผังแนวทางดำเนินงาน", "___PLACEHOLDER___")
    # 3. Replace "ผังแนวทาง" with "___PLACEHOLDER___"
    content = content.replace("ผังแนวทาง", "___PLACEHOLDER___")
    
    # 4. Replace placeholder back
    content = content.replace("___PLACEHOLDER___", "ผังแนวทางการดำเนินงาน")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done")
