import sys

with open('src/views/SimpleViews.tsx', 'r') as f:
    content = f.read()

# Replace read-excel-file with xlsx
content = content.replace("import readXlsxFile from 'read-excel-file';", "import * as XLSX from 'xlsx';")

target_import_logic = """    try {
      const rows = await readXlsxFile(file);
      // Skip header row if it exists (assuming first row is headers if it has 'ชื่อ' or 'Name' or just assuming row 0 is header)
      const dataRows = rows.slice(1);"""
      
replacement_import_logic = """    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
      // Skip header row if it exists
      const dataRows = rows.slice(1);"""

content = content.replace(target_import_logic, replacement_import_logic)

with open('src/views/SimpleViews.tsx', 'w') as f:
    f.write(content)
