import sys

with open('src/views/DataViews.tsx', 'r') as f:
    content = f.read()

# Make sure we add 'Files' import if not already there
if 'Files' not in content:
    content = content.replace("import { Download, Plus, FileText,", "import { Download, Plus, FileText, Files,")

# We will copy DownloadView, rename it to OtherDocsView, and replace properties
# To do this safely, we can extract the code of DownloadView and replace the text.
start = content.find('export function DownloadView')
end = content.find('export function SmartQAView')

if start != -1 and end != -1:
    download_view_code = content[start:end]
    other_docs_code = download_view_code.replace('DownloadView', 'OtherDocsView')
    other_docs_code = other_docs_code.replace('activeProject?.documents', 'activeProject?.other_documents')
    other_docs_code = other_docs_code.replace('ผังที่นั่ง-รายชื่อ', 'เอกสารอื่น')
    other_docs_code = other_docs_code.replace('<FileText', '<Files')
    
    # Insert it right before SmartQAView
    new_content = content[:end] + other_docs_code + content[end:]
    
    with open('src/views/DataViews.tsx', 'w') as f:
        f.write(new_content)
else:
    print("Could not find DownloadView or SmartQAView")
