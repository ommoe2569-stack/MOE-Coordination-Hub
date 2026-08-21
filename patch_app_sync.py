import sys

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """
  // Sync wrappers
  const makeFirebaseSetter = (collectionName: string, localState: any[]) => {
    return (action: any) => {
      const newState = typeof action === 'function' ? action(localState) : action;
      
      // Calculate diffs
      const oldMap = new Map(localState.map(item => [String(item.id), item]));
      const newMap = new Map(newState.map((item: any) => [String(item.id), item]));
      
      // Deleted
      oldMap.forEach((_, id) => {
        if (!newMap.has(id)) deleteDoc(doc(db, collectionName, id));
      });
      
      // Added or Updated
      newMap.forEach((item, id) => {
        const oldItem = oldMap.get(id);
        if (!oldItem || JSON.stringify(oldItem) !== JSON.stringify(item)) {
          setDoc(doc(db, collectionName, id), item);
        }
      });
    };
  };

  const activeProject = projects.find(p => p.isActive);

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView events={calendarEvents} setEvents={makeFirebaseSetter('calendar_events', calendarEvents)} />;
      case 'home': return <HomeView setCurrentView={setCurrentView} sessions={sessions} projects={projects} />;
      case 'register': return <RegisterView activeProject={activeProject} />;
      case 'download': return <DownloadView activeProject={activeProject} />;
      case 'ebook': return <EbookView activeProject={activeProject} />;
      case 'social': return <SocialWallView activeProject={activeProject} isAdmin={userRole === 'admin'} />;
      case 'gallery': return <GalleryView activeProject={activeProject} />;
      case 'contact': return <ContactView activeProject={activeProject} />;
      case 'qa': return <SmartQAView activeProject={activeProject} isAdmin={userRole === 'admin'} questions={qaQuestions} setQuestions={setQaQuestions} />;
      case 'evaluation': return <EvaluationView activeProject={activeProject} />;
      case 'manual': return <ManualView activeProject={activeProject} />;
      case 'admin': return <AdminView 
        userRole={userRole} 
        setUserRole={setUserRole} 
        sessions={sessions} 
        setSessions={makeFirebaseSetter('sessions', sessions)} 
        projects={projects} 
        setProjects={makeFirebaseSetter('projects', projects)} 
        users={users} 
        setUsers={makeFirebaseSetter('users_management', users)} 
      />;
      default: return <HomeView setCurrentView={setCurrentView} sessions={sessions} projects={projects} />;
    }
  };
"""

start_idx = content.find("  // Sync wrappers")
end_idx = content.find("  if(projects.length === 0) {")

content = content[:start_idx] + replacement + content[end_idx:]

with open('src/App.tsx', 'w') as f:
    f.write(content)
