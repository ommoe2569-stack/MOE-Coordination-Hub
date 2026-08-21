import sys

with open('src/views/AdminView.tsx', 'r') as f:
    lines = f.readlines()

start_idx = -1
for i, line in enumerate(lines):
    if line.startswith('function DocumentManagement'):
        start_idx = i
        break

end_idx = -1
if start_idx != -1:
    count = 0
    for i in range(start_idx, len(lines)):
        count += lines[i].count('{')
        count -= lines[i].count('}')
        if count == 0 and lines[i].strip() == '}':
            end_idx = i
            break

if start_idx != -1 and end_idx != -1:
    doc_mgmt_lines = lines[start_idx:end_idx+1]
    
    # We need to remove the broken OtherDocumentManagement at the end
    # It seems to be right at the bottom
    other_start_idx = -1
    for i in range(len(lines)):
        if lines[i].startswith('function OtherDocumentManagement'):
            other_start_idx = i
            break
            
    if other_start_idx != -1:
        lines = lines[:other_start_idx] # remove the broken one
        
    doc_code = "".join(doc_mgmt_lines)
    other_code = doc_code.replace("DocumentManagement", "OtherDocumentManagement")
    other_code = other_code.replace(".documents", ".other_documents")
    other_code = other_code.replace("documents:", "other_documents:")
    other_code = other_code.replace("const documents =", "const other_documents =")
    other_code = other_code.replace("documents.length", "other_documents.length")
    other_code = other_code.replace("documents.map", "other_documents.map")
    other_code = other_code.replace("ผังที่นั่ง-รายชื่อ", "เอกสารอื่น")
    other_code = other_code.replace("<FileText", "<Files")

    lines.append("\n\n" + other_code)
    
    with open('src/views/AdminView.tsx', 'w') as f:
        f.writelines(lines)
else:
    print(f"Could not find DocumentManagement boundaries. {start_idx}, {end_idx}")

