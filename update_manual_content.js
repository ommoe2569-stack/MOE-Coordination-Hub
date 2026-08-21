import fs from 'fs';
let content = fs.readFileSync('src/views/ManualView.tsx', 'utf8');

// I will just override the entire tabContent object.
const replacementTabContent = `  const tabContent = {
    'reg': {
      title: 'ลงทะเบียน (แจ้งรายชื่อ)',
      subtitle: 'Registration Process',
      icon: UserPlus,
      bgAccent: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
      hoverNumberBg: 'group-hover:bg-emerald-500 group-hover:border-emerald-500',
      tipColor: 'text-emerald-900',
      steps: [
        'สแกน QR Code ณ จุดลงทะเบียน (แจ้งรายชื่อ)',
        'ตรวจสอบข้อมูลชื่อ-นามสกุล',
        'รับป้ายชื่อและเอกสารประกอบการประชุม',
        'เข้าสู่ห้องประชุมตามผังที่นั่ง'
      ],
      tip: 'กรุณาเตรียมบัตรประชาชนหรือบัตรข้าราชการเพื่อความรวดเร็วในการตรวจสอบข้อมูล'
    },
    'social': {
      title: 'Social Wall',
      subtitle: 'Interactive Display',
      icon: MessageSquare,
      bgAccent: 'bg-fuchsia-50',
      textColor: 'text-fuchsia-600',
      borderColor: 'border-fuchsia-100',
      hoverNumberBg: 'group-hover:bg-fuchsia-500 group-hover:border-fuchsia-500',
      tipColor: 'text-fuchsia-900',
      steps: [
        'สแกน QR Code เพื่อเข้าสู่ระบบ Social Wall',
        'พิมพ์ข้อความ หรือ แนบรูปภาพที่ต้องการแชร์',
        'กดปุ่มส่งข้อความ',
        'ข้อความและรูปภาพจะไปปรากฏบนหน้าจอกลาง'
      ],
      tip: 'มาร่วมแบ่งปันความประทับใจผ่านภาพถ่ายภายในงานด้วยกันนะคะ'
    },
    'qa': {
      title: 'Smart Q&A',
      subtitle: 'Question & Answer',
      icon: HelpCircle,
      bgAccent: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-100',
      hoverNumberBg: 'group-hover:bg-amber-500 group-hover:border-amber-500',
      tipColor: 'text-amber-900',
      steps: [
        'เข้าสู่หน้า Smart Q&A ผ่านเมนูในระบบ',
        'พิมพ์คำถามที่ต้องการสอบถามวิทยากร',
        'กดปุ่ม ส่งคำถาม',
        'คุณสามารถกดโหวต (Upvote) คำถามของท่านอื่นที่น่าสนใจได้'
      ],
      tip: 'คำถามที่ได้รับการโหวตสูงสุด จะถูกวิทยากรนำมาตอบในช่วงท้ายของการบรรยาย'
    },
    'contact': {
      title: 'Contact Directory',
      subtitle: 'Important Contacts',
      icon: Phone,
      bgAccent: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100',
      hoverNumberBg: 'group-hover:bg-blue-500 group-hover:border-blue-500',
      tipColor: 'text-blue-900',
      steps: [
        'เข้าสู่เมนู ทำเนียบผู้ติดต่อ',
        'ค้นหาชื่อหน่วยงาน หรือ ชื่อบุคคลที่ต้องการ',
        'ดูข้อมูลเบอร์โทรศัพท์และอีเมลสำหรับการประสานงาน',
        'กดที่เบอร์โทรศัพท์เพื่อโทรออกได้ทันที'
      ],
      tip: 'สามารถบันทึกผู้ติดต่อที่ใช้งานบ่อย เพื่อความรวดเร็วในการติดต่อครั้งถัดไป'
    },
    'eval': {
      title: 'ประเมินผล',
      subtitle: 'Evaluation Form',
      icon: ClipboardList,
      bgAccent: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-100',
      hoverNumberBg: 'group-hover:bg-indigo-500 group-hover:border-indigo-500',
      tipColor: 'text-indigo-900',
      steps: [
        'เข้าเมนู ประเมินการจัดงาน จาก Sidebar',
        'กดปุ่ม เปิดแบบประเมิน',
        'ระบบเปิด Google Form ในหน้าต่างใหม่',
        'ประเมินความพึงพอใจในด้านต่างๆ',
        'กด Submit — ใช้เวลาเพียง 3-5 นาที'
      ],
      tip: 'คำตอบของท่านช่วยพัฒนาการจัดงานในครั้งต่อไป ขอขอบคุณที่ให้ความร่วมมือค่ะ'
    }
  };`;

content = content.replace(/const tabContent = \{[\s\S]*?\}  \};/g, replacementTabContent);

fs.writeFileSync('src/views/ManualView.tsx', content);
