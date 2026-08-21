import sys
import re

# 1. Update types.ts
with open('src/types.ts', 'r') as f:
    types = f.read()
types = types.replace("| 'download'", "| 'download'\n  | 'other_docs'")
types = types.replace("download?: string;", "download?: string;\n    other_docs?: string;")
types = types.replace("url: string;\n  }[];", "url: string;\n  }[];\n  other_documents?: {\n    id: string;\n    name: string;\n    date: string;\n    endDate?: string;\n    url: string;\n  }[];")
with open('src/types.ts', 'w') as f:
    f.write(types)

# 2. Update HomeView.tsx
with open('src/views/HomeView.tsx', 'r') as f:
    home = f.read()

home = home.replace("import { ViewType, SessionItem, ProjectItem } from '../types';", "import { ViewType, SessionItem, ProjectItem } from '../types';\nimport { Files } from 'lucide-react';")

# Dashboard cards (Quick Access)
ebook_card = "{ icon: BookOpen, label: 'ผังแนวทาง', view: 'ebook' as ViewType, color: 'text-purple-700', bg: 'bg-gradient-to-br from-purple-200 to-fuchsia-300', hover: 'hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1' },"
other_docs_card = "{ icon: Files, label: 'เอกสารอื่น', view: 'other_docs' as ViewType, color: 'text-teal-700', bg: 'bg-gradient-to-br from-teal-200 to-emerald-300', hover: 'hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-1' },"
home = home.replace(ebook_card, ebook_card + "\n    " + other_docs_card)

with open('src/views/HomeView.tsx', 'w') as f:
    f.write(home)

# 3. Update Sidebar.tsx
with open('src/components/Sidebar.tsx', 'r') as f:
    sidebar = f.read()

sidebar = sidebar.replace("import { Home, Calendar, Users, Settings, LogOut, ChevronDown, Check, UserPlus, BookOpen, Download, HelpCircle, MessageSquare, Image as ImageIcon, MessageCircle, FileText, Activity } from 'lucide-react';", "import { Home, Calendar, Users, Settings, LogOut, ChevronDown, Check, UserPlus, BookOpen, Download, HelpCircle, MessageSquare, Image as ImageIcon, MessageCircle, FileText, Activity, Files } from 'lucide-react';")

sidebar = sidebar.replace("isFeatureEnabled('download') || isFeatureEnabled('ebook')", "isFeatureEnabled('download') || isFeatureEnabled('ebook') || isFeatureEnabled('other_docs')")
sidebar = sidebar.replace("{isFeatureEnabled('ebook') && <NavItem icon={BookOpen} label=\"ผังแนวทางดำเนินงาน\" view=\"ebook\" indent />}", "{isFeatureEnabled('ebook') && <NavItem icon={BookOpen} label=\"ผังแนวทางดำเนินงาน\" view=\"ebook\" indent />}\n                {isFeatureEnabled('other_docs') && <NavItem icon={Files} label=\"เอกสารอื่น\" view=\"other_docs\" indent />}")

with open('src/components/Sidebar.tsx', 'w') as f:
    f.write(sidebar)

# 4. Update App.tsx
with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace("import { DownloadView, SmartQAView, GalleryView } from './views/DataViews';", "import { DownloadView, OtherDocsView, SmartQAView, GalleryView } from './views/DataViews';")

ebook_route = "case 'ebook': return <EbookView activeProject={activeProject} />;"
other_docs_route = "case 'other_docs': return <OtherDocsView activeProject={activeProject} />;"
app = app.replace(ebook_route, ebook_route + "\n      " + other_docs_route)

with open('src/App.tsx', 'w') as f:
    f.write(app)

