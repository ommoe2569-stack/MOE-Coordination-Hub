import sys

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

# Replace formData initialization
content = content.replace("const [formData, setFormData] = useState({ title: '', time: '', room: '', projectId: '' });", "const [formData, setFormData] = useState({ title: '', date: '', time: '', room: '', projectId: '' });")

# Replace handleEdit
content = content.replace("setFormData({ title: s.title, time: s.time, room: s.room, projectId: s.projectId || selectedProjectId });", "setFormData({ title: s.title, date: s.date || '', time: s.time, room: s.room, projectId: s.projectId || selectedProjectId });")

# Replace handleAddClick
content = content.replace("setFormData({ title: '', time: '', room: '', projectId: selectedProjectId });", "setFormData({ title: '', date: projects.find(p => p.id === selectedProjectId)?.startDate || '', time: '', room: '', projectId: selectedProjectId });")

# Add date to new session
new_session_target = """      const newSession: SessionItem = {
        id: `s-${Date.now()}`,
        tag: 'ทั่วไป',
        tagColor: 'blue',
        title: formData.title,
        time: formData.time,
        room: formData.room,
        isActive: false,
        projectId: formData.projectId
      };"""
new_session_replacement = """      const newSession: SessionItem = {
        id: `s-${Date.now()}`,
        tag: 'ทั่วไป',
        tagColor: 'blue',
        title: formData.title,
        date: formData.date,
        time: formData.time,
        room: formData.room,
        isActive: false,
        projectId: formData.projectId
      };"""
content = content.replace(new_session_target, new_session_replacement)

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
