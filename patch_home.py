with open('src/views/HomeView.tsx', 'r') as f:
    content = f.read()

target1 = "<span>{activeProject?.startDate ? formatThaiDate(activeProject.startDate) : '17 สิงหาคม 2569'}</span>"
replacement1 = """<span>
                {activeProject?.startDate && activeProject?.endDate && activeProject.startDate !== activeProject.endDate
                  ? `${formatThaiDate(activeProject.startDate)} - ${formatThaiDate(activeProject.endDate)}`
                  : activeProject?.startDate 
                    ? formatThaiDate(activeProject.startDate) 
                    : '17 สิงหาคม 2569'}
              </span>"""

content = content.replace(target1, replacement1)

with open('src/views/HomeView.tsx', 'w') as f:
    f.write(content)
