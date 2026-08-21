import { db } from "./src/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

async function seed() {
  const projectsRef = collection(db, 'projects');
  const snap = await getDocs(projectsRef);
  if (snap.empty) {
    console.log("Seeding data...");
    const p1 = doc(projectsRef, '1');
    await setDoc(p1, { 
      name: 'การประชุมเชิงปฏิบัติการ เรื่อง การเสริมสร้างประสิทธิภาพและพัฒนาเครือข่ายการประสานงานภารกิจการเมือง', 
      startDate: '2026-08-17', 
      startTime: '08:00', 
      location: 'ห้องประชุมพินิตประชานาถ', 
      isActive: true,
      documents: [
        { id: 'd1', name: 'กำหนดการประชุมเชิงปฏิบัติการฯ สร.สัมพันธ์ ครั้งที่ 3', date: '13/8/2569', url: '#' },
        { id: 'd2', name: 'ผังที่นั่ง', date: '13/8/2569', url: '#' },
        { id: 'd3', name: 'เอกสารบรรยาย เรื่อง แนวทางการเสนอร่างกฎหมายฯ', date: '14/8/2569', url: '#' },
        { id: 'd4', name: 'เอกสารบรรยาย เรื่อง การประสานงานในภารกิจที่เกี่ยวกับกิจการรัฐสภา', date: '14/8/2569', url: '#' }
      ]
    });

    const sessions = [
      { id: '1', time: '8:00 - 8:30', title: 'แบบแจ้งรายชื่อ ผู้เข้าร่วมการประชุมฯ', tag: 'แบบแจ้งรายชื่อ', tagColor: 'bg-pink-100 text-pink-700', room: 'ห้องพินิตประชานาถ', isActive: true, projectId: '1' },
      { id: '2', time: '8:30 - 9:00', title: 'ประธานพิธีเปิดการประชุมฯ เดินทางถึงห้องพินิตประชานาถ', tag: 'พิธีการ', tagColor: 'bg-blue-100 text-blue-700', room: 'ห้องพินิตประชานาถ', isActive: true, projectId: '1' },
      { id: '3', time: '9:00 - 10:30', title: 'การบรรยายในหัวข้อ "แนวทางการเสนอร่างกฎหมายตาม พ.ร.บ.ว่าด้วย การเสนอเรื่องและการประชุม ครม. พ.ศ. 2548"', tag: 'บรรยาย', tagColor: 'bg-blue-100 text-blue-700', room: 'ห้องพินิตประชานาถ', isActive: true, projectId: '1' },
      { id: '4', time: '10:30 - 10:45', title: 'พักรับประทานอาหารว่าง', tag: 'พัก', tagColor: 'bg-pink-100 text-pink-700', room: 'ห้องพินิตประชานาถ', isActive: true, projectId: '1' },
      { id: '5', time: '10:45 - 12:00', title: 'การบรรยาย "แนวทางการเสนอเรื่องการแต่งตั้งให้เป็นไปตาม พ.ร.บ.ว่าด้วยการเสนอเรื่องและการประชุม ครม. พ.ศ. 2548"', tag: 'บรรยาย', tagColor: 'bg-blue-100 text-blue-700', room: 'ห้องพินิตประชานาถ', isActive: true, projectId: '1' },
      { id: '6', time: '12:00 - 13:00', title: 'พักรับประทานอาหารกลางวัน', tag: 'พัก', tagColor: 'bg-pink-100 text-pink-700', room: 'ห้องอาหาร', isActive: true, projectId: '1' },
      { id: '7', time: '13:00 - 14:30', title: 'การบรรยายในหัวข้อ "การประสานงานในภารกิจที่เกี่ยวกับกิจการรัฐสภา"', tag: 'บรรยาย', tagColor: 'bg-blue-100 text-blue-700', room: 'ห้องพินิตประชานาถ', isActive: true, projectId: '1' },
    ];
    for(const s of sessions) {
      await setDoc(doc(collection(db, 'sessions'), s.id), s);
    }

    const qa = [
      { id: 1, q: 'ดาวน์โหลดแผนผังที่นั่งไม่ได้ค่ะ', time: '14 ส.ค. 69 • 08:47', isAnswered: true, answer: 'ทดลองใช้งานผ่านเบราว์เซอร์ Chrome ได้เลยค่ะ', projectId: '1' },
      { id: 2, q: 'มีข้อสงสัย ต้องการสอบถามวิทยากร สามารถพิมพ์ในช่องทางนี้ได้เลยค่ะ', time: '13 ส.ค. 69 • 20:02', isAnswered: false, projectId: '1' }
    ];
    for(const q of qa) {
      await setDoc(doc(collection(db, 'qa_questions'), String(q.id)), q);
    }

    const events = [
      {
        id: 'e1',
        name: 'การประชุมเชิงปฏิบัติการ เรื่อง การเสริมสร้างประสิทธิภาพและพัฒนาเครือข่ายการประสานงานภารกิจการเมือง',
        date: '2026-08-14',
        startTime: '08:00',
        location: 'ห้องประชุมพินิตประชานาถ',
        description: 'กิจกรรมโครงการ การประชุมเชิงปฏิบัติการ เรื่อง การเสริมสร้างประสิทธิภาพและพัฒนาเครือข่ายการประสานงานภารกิจการเมือง จัดขึ้นเพื่อให้บุคลากรได้เข้าร่วมแลกเปลี่ยนความรู้และพัฒนาศักยภาพตามกำหนดการ',
        category: 'training',
        projectId: '1'
      }
    ];
    for(const e of events) {
      await setDoc(doc(collection(db, 'calendar_events'), e.id), e);
    }

    const users = [
      { id: 1, name: 'สมชาย ใจดี', email: 'somchai@agency.go.th', role: 'Admin', status: 'Active', projectId: '1' },
      { id: 2, name: 'สมหญิง งามตา', email: 'somying@agency.go.th', role: 'Staff', status: 'Active', projectId: '1' },
      { id: 3, name: 'ประสิทธิ์ มั่นคง', email: 'prasit@agency.go.th', role: 'User', status: 'Inactive', projectId: '1' },
    ];
    for(const u of users) {
      await setDoc(doc(collection(db, 'users_management'), String(u.id)), u);
    }
    
    console.log("Seeding complete.");
  } else {
    console.log("Data already seeded.");
  }
}
seed().catch(console.error);
