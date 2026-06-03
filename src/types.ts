export interface ModulFormData {
  schoolName: string;
  teacherName: string;
  teacherNip: string;
  position: string;
  principalName: string;
  principalNip: string;
  signaturePlace: string;
  level: 'SD' | 'SMP' | 'SMA' | 'SMK';
  grade: string;
  semester: string;
  subject: string;
  cp: string;
  tp: string;
  material: string;
  meetings: number;
  duration: string;
  pedagogy: string[]; // Pedagogical practice per meeting
  dimensi: string[]; // Multi-select Dimensi Lulusan
}

export interface GeneratedModul {
  identitas: {
    schoolName: string;
    subject: string;
    classSemester: string;
    duration: string;
  };
  identifikasi: {
    students: string;
    material: string;
    dimensi: string;
  };
  desain: {
    cp: string;
    crossDisciplinary: string;
    tp: string;
    topic: string;
    pedagogy: string;
    partnership: string;
    environment: string;
    digitalUtilization: string;
    adaptasiLokal: string;
  };
  pengalaman: {
    memahami: string;
    mengaplikasi: string;
    merefleksi: string;
  };
  asesmen: {
    awal: string;
    proses: string;
    akhir: string;
  };
}
