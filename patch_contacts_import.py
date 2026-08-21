import sys

with open('src/views/SimpleViews.tsx', 'r') as f:
    content = f.read()

# Add imports
content = content.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect, useRef } from 'react';\nimport readXlsxFile from 'read-excel-file';"
)
content = content.replace(
    "Trash2, Edit } from 'lucide-react';",
    "Trash2, Edit, Upload } from 'lucide-react';"
)

# Update state variables in ContactView
target_state = "const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);"
replacement_state = """const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const rows = await readXlsxFile(file);
      // Skip header row if it exists (assuming first row is headers if it has 'ชื่อ' or 'Name' or just assuming row 0 is header)
      const dataRows = rows.slice(1);
      
      const promises = dataRows.map(async (row) => {
        // row: [Name, Position, Phone, Email]
        const name = row[0] ? String(row[0]).trim() : '';
        const position = row[1] ? String(row[1]).trim() : '';
        const phone = row[2] ? String(row[2]).trim() : '';
        const email = row[3] ? String(row[3]).trim() : '';

        if (name) {
          return addDoc(collection(db, 'contacts'), {
            name,
            position,
            phone,
            email,
            projectId: activeProject?.id || null,
            createdAt: new Date().toISOString()
          });
        }
      });

      await Promise.all(promises);
      alert('นำเข้าข้อมูลสำเร็จ');
    } catch (err) {
      console.error("Error importing contacts", err);
      alert('เกิดข้อผิดพลาดในการนำเข้าข้อมูล โปรดตรวจสอบไฟล์ Excel');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };"""

content = content.replace(target_state, replacement_state)

# Update UI to add Import button
target_ui = """        {isAdmin && (
          <button 
            onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: '', position: '', phone: '', email: '' }); }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm"
          >
            <Plus size={18} />
            เพิ่มผู้ติดต่อ
          </button>
        )}"""

replacement_ui = """        {isAdmin && (
          <div className="flex gap-3">
            <input 
              type="file" 
              accept=".xlsx, .xls" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm disabled:opacity-50"
            >
              <Upload size={18} />
              {isImporting ? 'กำลังนำเข้า...' : 'นำเข้า Excel'}
            </button>
            <button 
              onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: '', position: '', phone: '', email: '' }); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm"
            >
              <Plus size={18} />
              เพิ่มผู้ติดต่อ
            </button>
          </div>
        )}"""

content = content.replace(target_ui, replacement_ui)

with open('src/views/SimpleViews.tsx', 'w') as f:
    f.write(content)
