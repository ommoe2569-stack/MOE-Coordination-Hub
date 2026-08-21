with open('src/types.ts', 'r') as f:
    content = f.read()

content = content.replace("export interface SessionItem {\n  id: string;\n  time: string;", "export interface SessionItem {\n  id: string;\n  date?: string;\n  time: string;")

with open('src/types.ts', 'w') as f:
    f.write(content)
