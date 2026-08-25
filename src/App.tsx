import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HomeView from './views/HomeView';
import { RegisterView, EbookView, ContactView, EvaluationView } from './views/SimpleViews';
import { DownloadView, OtherDocsView, SmartQAView, GalleryView, VideoView } from './views/DataViews';
import AdminView from './views/AdminView';
import CalendarView from './views/CalendarView';
import { ViewType, SessionItem, ProjectItem, UserItem, CalendarEvent, UserRole, QAQuestion } from './types';
import { db } from './lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { initialProjects, initialSessions, initialQA, initialEvents, initialUsers } from './lib/seedData';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  
  const [qaQuestions, setQaQuestions] = useState<QAQuestion[]>([]);
  const pendingQaCount = qaQuestions.filter(q => !q.isAnswered).length;
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Initialize and listen to Firestore
  useEffect(() => {
    let isMounted = true;

    async function checkAndSeed() {
      try {
        const projectsSnap = await getDocs(collection(db, 'projects'));
        if (projectsSnap.empty && isMounted) {
          console.log("Seeding initial data to Firestore...");
          // Seed projects
          for (const p of initialProjects) {
            await setDoc(doc(db, 'projects', p.id), p);
          }
          // Seed sessions
          for (const s of initialSessions) {
            await setDoc(doc(db, 'sessions', s.id), s);
          }
          // Seed Q&A
          for (const q of initialQA) {
            await setDoc(doc(db, 'qa_questions', String(q.id)), q);
          }
          // Seed Events
          for (const e of initialEvents) {
            await setDoc(doc(db, 'calendar_events', e.id), e);
          }
          // Seed Users
          for (const u of initialUsers) {
            await setDoc(doc(db, 'users_management', String(u.id)), u);
          }
        }
      } catch (err) {
        console.error("Error checking or seeding Firestore:", err);
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    }

    checkAndSeed();

    const unsubProjects = onSnapshot(collection(db, 'projects'), (snap) => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as ProjectItem));
      setProjects(list);
      setIsInitializing(false);
    }, (err) => {
      console.error("Projects snapshot error:", err);
      setIsInitializing(false);
    });

    const unsubSessions = onSnapshot(collection(db, 'sessions'), (snap) => {
      setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() } as SessionItem)));
    });

    const unsubQA = onSnapshot(collection(db, 'qa_questions'), (snap) => {
      const qas = snap.docs.map(d => ({ ...d.data(), id: Number(d.id) } as QAQuestion));
      setQaQuestions(qas.sort((a,b) => b.id - a.id));
    });

    const unsubEvents = onSnapshot(collection(db, 'calendar_events'), (snap) => {
      setCalendarEvents(snap.docs.map(d => ({ id: d.id, ...d.data() } as CalendarEvent)));
    });

    const unsubUsers = onSnapshot(collection(db, 'users_management'), (snap) => {
      setUsers(snap.docs.map(d => ({ ...d.data(), id: Number(d.id) } as UserItem)));
    });

    return () => {
      isMounted = false;
      unsubProjects();
      unsubSessions();
      unsubQA();
      unsubEvents();
      unsubUsers();
    };
  }, []);

  // Sync wrappers
  const makeFirebaseSetter = (collectionName: string, localState: any[]) => {
    return (action: any) => {
      const newState = typeof action === 'function' ? action(localState) : action;
      
      // Calculate diffs
      const oldMap = new Map<string, any>(localState.map(item => [String(item.id), item]));
      const newMap = new Map<string, any>(newState.map((item: any) => [String(item.id), item]));
      
      // Deleted
      oldMap.forEach((_, id: string) => {
        if (!newMap.has(id)) {
          console.log(`Deleting ${id} from ${collectionName}`);
          deleteDoc(doc(db, collectionName, id)).catch(err => console.error("Delete failed", err));
        }
      });
      
      // Added or Updated
      newMap.forEach((item: any, id: string) => {
        const oldItem = oldMap.get(id);
        if (!oldItem || JSON.stringify(oldItem) !== JSON.stringify(item)) {
          setDoc(doc(db, collectionName, id), item);
        }
      });
    };
  };

  const activeProject = projects.find(p => p.isActive) || projects[0];

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView events={calendarEvents} setEvents={makeFirebaseSetter('calendar_events', calendarEvents)} projects={projects} sessions={sessions} setProjects={makeFirebaseSetter('projects', projects)} setSessions={makeFirebaseSetter('sessions', sessions)} />;
      case 'home': return <HomeView setCurrentView={setCurrentView} sessions={sessions} projects={projects} />;
      case 'register': return <RegisterView activeProject={activeProject} />;
      case 'download': return <DownloadView activeProject={activeProject} />;
      case 'ebook': return <EbookView activeProject={activeProject} />;
      case 'other_docs': return <OtherDocsView activeProject={activeProject} />;
      case 'gallery': return <GalleryView activeProject={activeProject} isAdmin={userRole === 'admin' || userRole === 'staff'} />;
      case 'video': return <VideoView activeProject={activeProject} isAdmin={userRole === 'admin' || userRole === 'staff'} />;
      case 'contact': return <ContactView activeProject={activeProject} isAdmin={userRole === 'admin' || userRole === 'staff'} />;
      case 'qa': return <SmartQAView activeProject={activeProject} isAdmin={userRole === 'admin'} questions={qaQuestions} setQuestions={setQaQuestions} />;
      case 'evaluation': return <EvaluationView activeProject={activeProject} />;
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

  if (isInitializing && projects.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-900 text-white gap-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-500/30 animate-pulse">
          M
        </div>
        <div className="text-center">
          <h2 className="font-bold text-lg text-slate-100">MOE Coordination Hub</h2>
          <p className="text-sm text-slate-400 mt-1">กำลังเชื่อมต่อฐานข้อมูล Firebase Firestore...</p>
        </div>
        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mt-2"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen print:h-auto bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans text-slate-800 dark:text-slate-100 overflow-hidden print:overflow-visible print:bg-white selection:bg-blue-200 dark:selection:bg-blue-800">
      <div className="print:hidden">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} activeProject={activeProject} pendingQaCount={userRole === 'admin' ? pendingQaCount : 0} />
      </div>
      
      <main className={`flex-1 overflow-y-auto print:overflow-visible p-4 md:p-8 print:p-0 w-full flex flex-col ${currentView !== "admin" ? "bg-white dark:bg-slate-950" : ""}`}>
        {/* Mobile Header */}
        <div className="md:hidden print:hidden flex items-center gap-4 mb-6 bg-slate-100 p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            M
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-blue-900 text-sm sm:text-base tracking-tight truncate">MOE Coordination Hub</h1>
            <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium truncate">สำนักงานรัฐมนตรี ศธ.</p>
          </div>
        </div>

        <div className="flex-1 max-w-6xl mx-auto w-full print:max-w-none print:w-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
