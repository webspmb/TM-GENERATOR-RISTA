import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Plus, Minus, School, User as UserIcon, Briefcase, GraduationCap, Calendar, Clock, BookOpen, Layers, Trash2, FileText, RefreshCw } from 'lucide-react';
import { ModulFormData } from '../types';
import { cn } from '../lib/utils';
import { getCPList } from '../data/cp_data';
import { syncGoogleSheetsCP } from '../lib/sheets';

// Daftar sekolah yang diperbolehkan
const ALLOWED_SCHOOLS = [
  "SD Negeri 1 Ampana Kota",
  "SD NEGERI 1 AMPANA KOTA",
  "SDN 1 AMPANA KOTA",
  "SMP Negeri 1 Merdeka",
  "SMP NEGERI 1 MERDEKA",
  "SMPN 1 MERDEKA",
  "SMA Negeri 1 Merdeka",
  "SMA NEGERI 1 MERDEKA",
  "SMAN 1 MERDEKA",
  "SMK Negeri 1 Merdeka",
  "SMK NEGERI 1 MERDEKA",
  "SMKN 1 MERDEKA"
];

// Daftar nama guru yang diperbolehkan
const ALLOWED_TEACHERS = [
  "Rista Kasaraeng, S.Pd",
  "RISTA KASARAENG, S.Pd",
  "FIDHAL, S.Pd" 
];

interface GeneratorFormProps {
  onSubmit: (data: ModulFormData) => void;
  isLoading: boolean;
  savedData?: ModulFormData | null; 
  onViewPrevious?: () => void; 
}

const DIMENSI_LULUSAN = [
  'Keimanan & Ketakwaan', 'Kewargaan', 'Penalaran Kritis', 'Kreativitas', 
  'Kolaborasi', 'Kemandirian', 'Kesehatan', 'Komunikasi'
];

const PEDAGOGY_OPTIONS = [
  'Inkuiri-Discovery', 'PjBL', 'Problem Solving', 'Game Based Learning', 'Station Learning'
];

const GRADES_BY_LEVEL: Record<'SD' | 'SMP' | 'SMA' | 'SMK', string[]> = {
  SD: ['1', '2', '3', '4', '5', '6'],
  SMP: ['7', '8', '9'],
  SMA: ['10', '11', '12'],
  SMK: ['10', '11', '12']
};

const SUBJECTS_BY_LEVEL: Record<'SD' | 'SMP' | 'SMA' | 'SMK', string[]> = {
  SD: [
    "Bahasa Indonesia",
    "Matematika",
    "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
    "Pendidikan Pancasila",
    "Pendidikan Agama Islam",
    "Pendidikan Agama Kristen",
    "Pendidikan Agama Katolik",
    "Pendidikan Agama Hindu",
    "Pendidikan Agama Buddha",
    "Pendidikan Agama Khonghucu",
    "Seni Rupa",
    "Seni Musik",
    "Seni Tari",
    "Seni Teater",
    "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
    "Bahasa Inggris",
    "Muatan Lokal"
  ],
  SMP: [
    "Pendidikan Pancasila",
    "Bahasa Indonesia",
    "Matematika",
    "Ilmu Pengetahuan Alam (IPA)",
    "Ilmu Pengetahuan Sosial (IPS)",
    "Bahasa Inggris",
    "Pendidikan Agama Islam",
    "Pendidikan Agama Kristen",
    "Pendidikan Agama Katolik",
    "Pendidikan Agama Hindu",
    "Pendidikan Agama Buddha",
    "Pendidikan Agama Khonghucu",
    "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
    "Informatika",
    "Seni Rupa",
    "Seni Musik",
    "Seni Tari",
    "Seni Teater",
    "Prakarya Kerajinan",
    "Prakarya Rekayasa",
    "Prakarya Pengolahan",
    "Prakarya Budidaya",
    "Muatan Lokal"
  ],
  SMA: [
    "Pendidikan Pancasila",
    "Bahasa Indonesia",
    "Matematika",
    "Bahasa Inggris",
    "Pendidikan Agama Islam",
    "Pendidikan Agama Kristen",
    "Pendidikan Agama Katolik",
    "Pendidikan Agama Hindu",
    "Pendidikan Agama Buddha",
    "Pendidikan Agama Khonghucu",
    "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
    "Sejarah",
    "Seni Rupa",
    "Seni Musik",
    "Seni Tari",
    "Seni Teater",
    "Fisika",
    "Kimia",
    "Biologi",
    "Sosiologi",
    "Ekonomi",
    "Geografi",
    "Antropologi",
    "Informatika"
  ],
  SMK: [
    "Pendidikan Pancasila",
    "Bahasa Indonesia",
    "Matematika",
    "Bahasa Inggris",
    "Pendidikan Agama Islam",
    "Pendidikan Agama Kristen",
    "Pendidikan Agama Katolik",
    "Pendidikan Agama Hindu",
    "Pendidikan Agama Buddha",
    "Pendidikan Agama Khonghucu",
    "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
    "Sejarah",
    "Informatika",
    "Projek Ilmu Pengetahuan Alam dan Sosial (IPAS)",
    "Seni Rupa",
    "Seni Musik",
    "Seni Tari",
    "Seni Teater",
    "Dasar-Dasar Program Keahlian",
    "Konsentrasi Keahlian",
    "Projek Kreatif dan Kewirausahaan (PKK)",
    "Praktik Kerja Lapangan (PKL)"
  ]
};

export default function GeneratorForm({ onSubmit, isLoading, savedData, onViewPrevious }: GeneratorFormProps) {
  const [formData, setFormData] = useState<ModulFormData>(() => {
    try {
      const localData = localStorage.getItem('tm_generator_form_data');
      if (localData) {
        return JSON.parse(localData);
      }
    } catch (e) {
      console.error("Gagal memuat data dari localStorage", e);
    }

    const initialLevel = savedData?.level || 'SD';
    return {
      schoolName: savedData?.schoolName || '',
      teacherName: savedData?.teacherName || '',
      teacherNip: savedData?.teacherNip || '',
      position: savedData?.position || 'Guru Kelas',
      principalName: savedData?.principalName || '',
      principalNip: savedData?.principalNip || '',
      signaturePlace: savedData?.signaturePlace || '',
      level: initialLevel,
      grade: savedData?.grade || GRADES_BY_LEVEL[initialLevel][0],
      semester: savedData?.semester || 'I / Ganjil',
      subject: savedData?.subject || SUBJECTS_BY_LEVEL[initialLevel][0],
      cp: savedData?.cp || '',
      tp: savedData?.tp || '',
      material: savedData?.material || '',
      meetings: savedData?.meetings || 1,
      duration: savedData?.duration || '',
      pedagogy: savedData?.pedagogy || [],
      dimensi: savedData?.dimensi || []
    };
  });

  const [isCustomSubject, setIsCustomSubject] = useState(() => {
    const levelVal = formData.level || 'SD';
    const currentSubjects = SUBJECTS_BY_LEVEL[levelVal] || [];
    return formData.subject ? !currentSubjects.includes(formData.subject) : false;
  });

  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncErrorMessage, setSyncErrorMessage] = useState<string>("");
  const [syncTrigger, setSyncTrigger] = useState<number>(0);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>(() => {
    return localStorage.getItem('cp_sheet_last_synced') || "";
  });

  useEffect(() => {
    const performSyncOnMount = async () => {
      setSyncStatus('syncing');
      const res = await syncGoogleSheetsCP();
      if (res.success) {
        setSyncStatus('success');
        setLastSyncedTime(localStorage.getItem('cp_sheet_last_synced') || "");
      } else {
        setSyncStatus('error');
        setSyncErrorMessage(res.error || "");
      }
    };
    
    performSyncOnMount();

    const handleSyncedEvent = () => {
      setSyncTrigger(prev => prev + 1);
      setLastSyncedTime(localStorage.getItem('cp_sheet_last_synced') || "");
    };

    window.addEventListener('cp_database_synced', handleSyncedEvent);
    return () => window.removeEventListener('cp_database_synced', handleSyncedEvent);
  }, []);

  useEffect(() => {
    localStorage.setItem('tm_generator_form_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const levelVal = formData.level || 'SD';
    const currentSubjects = SUBJECTS_BY_LEVEL[levelVal] || [];
    if (formData.subject && !currentSubjects.includes(formData.subject)) {
      setIsCustomSubject(true);
    } else if (formData.subject === "") {
      // Keep custom subject input active while user types
    } else {
      setIsCustomSubject(false);
    }
  }, [formData.level, formData.subject]);

  const prevParamsRef = useRef<string>("");

  useEffect(() => {
    const currentParams = `${formData.level}-${formData.grade}-${formData.subject}-${syncTrigger}`;
    const isFirstRender = prevParamsRef.current === "" || !prevParamsRef.current.includes(`${formData.level}-${formData.grade}-${formData.subject}`);
    
    if (prevParamsRef.current !== currentParams) {
      prevParamsRef.current = currentParams;
      
      const levelVal = formData.level as 'SD' | 'SMP' | 'SMA' | 'SMK';
      const cpOptions = getCPList(levelVal, formData.grade, formData.subject);
      
      if (cpOptions.length > 0) {
        if (!isFirstRender || !formData.cp) {
          setFormData(prev => ({ ...prev, cp: cpOptions[0] }));
        }
      }
    }
  }, [formData.level, formData.grade, formData.subject, syncTrigger]);

  const handleClearForm = () => {
    if (confirm("Apakah Anda yakin ingin membersihkan semua draf data yang telah diisi?")) {
      localStorage.removeItem('tm_generator_form_data');
      setFormData({
        schoolName: '', teacherName: '', teacherNip: '', position: 'Guru Kelas',
        principalName: '', principalNip: '', signaturePlace: '', level: 'SD', grade: '1',
        semester: 'I / Ganjil', subject: 'Bahasa Indonesia', cp: '', tp: '', material: '',
        meetings: 1, duration: '', pedagogy: [], dimensi: []
      });
      setIsCustomSubject(false);
    }
  };

  const handleLoadPreviousDocument = () => {
    if (savedData) {
      setFormData(savedData);
      if (onViewPrevious) {
        onViewPrevious();
      } else {
        onSubmit(savedData);
      }
    }
  };
  
  const isSchoolAllowed = ALLOWED_SCHOOLS.some(
    school => school.toUpperCase().trim() === formData.schoolName.toUpperCase().trim()
  );

  const isTeacherAllowed = ALLOWED_TEACHERS.some(
    teacher => teacher.toUpperCase().trim() === formData.teacherName.toUpperCase().trim()
  );
  
  const isAccessAllowed = isSchoolAllowed && isTeacherAllowed;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'level') {
      const selectedLevel = value as 'SD' | 'SMP' | 'SMA' | 'SMK';
      setFormData(prev => ({
        ...prev,
        level: selectedLevel,
        grade: GRADES_BY_LEVEL[selectedLevel][0],
        subject: SUBJECTS_BY_LEVEL[selectedLevel][0]
      }));
      setIsCustomSubject(false);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubjectSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "__custom__") {
      setIsCustomSubject(true);
      setFormData(prev => ({ ...prev, subject: "" }));
    } else {
      setIsCustomSubject(false);
      setFormData(prev => ({ ...prev, subject: val }));
    }
  };

  const handleDimensiToggle = (item: string) => {
    setFormData(prev => ({
      ...prev,
      dimensi: prev.dimensi.includes(item)
        ? prev.dimensi.filter(i => i !== item)
        : [...prev.dimensi, item]
    }));
  };

  const handlePedagogyChange = (index: number, value: string) => {
    const newPedagogy = [...formData.pedagogy];
    newPedagogy[index] = value;
    setFormData(prev => ({ ...prev, pedagogy: newPedagogy }));
  };

  const updateMeetings = (val: number) => {
    const newCount = Math.max(1, formData.meetings + val);
    const newPedagogy = [...formData.pedagogy];
    if (val > 0) {
      newPedagogy.push('Inkuiri-Discovery');
    } else if (newCount < formData.meetings) {
      newPedagogy.pop();
    }
    setFormData(prev => ({ ...prev, meetings: newCount, pedagogy: newPedagogy }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAccessAllowed) {
      alert(`Maaf, kombinasi Satuan Pendidikan dan Nama Guru belum terdaftar dalam sistem.`);
      return;
    }
    onSubmit(formData);
  };

  const cpOptions = getCPList(
    formData.level as 'SD' | 'SMP' | 'SMA' | 'SMK',
    formData.grade,
    formData.subject
  );

  const sectionClass = "glass p-6 md:p-8 rounded-[1.5rem] space-y-6";
  const labelClass = "text-sm font-bold text-blue-800 flex items-center gap-2";
  const inputClass = "w-full bg-white/50 border border-blue-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";

  const showWarning = (formData.schoolName || formData.teacherName) && !isAccessAllowed;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Tombol Aksi di Bagian Atas */}
      <div className="flex justify-end gap-3 px-2">
        {savedData && (
          <button
            type="button"
            onClick={handleLoadPreviousDocument}
            className="flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-all shadow-sm border border-blue-100"
          >
            <FileText className="w-3.5 h-3.5" /> Lihat Hasil Sebelumnya
          </button>
        )}
        <button
          type="button"
          onClick={handleClearForm}
          className="flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-all shadow-sm border border-red-100"
        >
          <Trash2 className="w-3.5 h-3.5" /> Bersihkan Draf Form
        </button>
      </div>

      {/* Identitas Satuan Pendidikan */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <School className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-blue-900">Identitas Satuan Pendidikan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={labelClass}><School className="w-4 h-4"/> Nama Satuan Pendidikan</label>
            <input name="schoolName" value={formData.schoolName} onChange={handleChange} required className={inputClass} placeholder="Contoh: SD Negeri 1 Merdeka" />
          </div>
          <div className="space-y-2">
            <label className={labelClass}><UserIcon className="w-4 h-4"/> Nama Guru</label>
            <input name="teacherName" value={formData.teacherName} onChange={handleChange} required className={inputClass} placeholder="Nama Lengkap" />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>NIP Guru</label>
            <input name="teacherNip" value={formData.teacherNip} onChange={handleChange} required className={inputClass} placeholder="NIP" />
          </div>
          <div className="space-y-2">
            <label className={labelClass}><Briefcase className="w-4 h-4"/> Jabatan</label>
            <select name="position" value={formData.position} onChange={handleChange} className={inputClass}>
              <option value="Guru Kelas">Guru Kelas</option>
              <option value="Guru Mata Pelajaran">Guru Mata Pelajaran</option>
              <option value="Wali Kelas">Wali Kelas</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClass}><UserIcon className="w-4 h-4"/> Nama Kepala Sekolah</label>
            <input name="principalName" value={formData.principalName} onChange={handleChange} required className={inputClass} />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>NIP Kepala Sekolah</label>
            <input name="principalNip" value={formData.principalNip} onChange={handleChange} required className={inputClass} />
          </div>
          <div className="space-y-2">
            <label className={labelClass}><Briefcase className="w-4 h-4"/> Tempat Penandatanganan</label>
            <input name="signaturePlace" value={formData.signaturePlace} onChange={handleChange} required className={inputClass} placeholder="Contoh: Merdeka, Jakarta, Barru, dll" />
          </div>
        </div>
      </div>

      {/* Informasi Pembelajaran */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-blue-900">Informasi Pembelajaran</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className={labelClass}>Jenjang Pendidikan</label>
            <select name="level" value={formData.level} onChange={handleChange} className={inputClass}>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SMK">SMK</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Kelas</label>
            <select name="grade" value={formData.grade} onChange={handleChange} className={inputClass} required>
              {(GRADES_BY_LEVEL[formData.level as 'SD' | 'SMP' | 'SMA' | 'SMK'] || []).map((classVal) => (
                <option key={classVal} value={classVal}>Kelas {classVal}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClass}><Calendar className="w-4 h-4"/> Semester</label>
            <select name="semester" value={formData.semester} onChange={handleChange} className={inputClass}>
              <option value="I / Ganjil">I / Ganjil</option>
              <option value="II / Genap">II / Genap</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className={labelClass}><BookOpen className="w-4 h-4"/> Mata Pelajaran (Mapel)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select 
              value={isCustomSubject ? "__custom__" : (formData.subject || "")} 
              onChange={handleSubjectSelectChange} 
              className={inputClass}
            >
              <option value="">-- Pilih Mata Pelajaran --</option>
              {(SUBJECTS_BY_LEVEL[formData.level as 'SD' | 'SMP' | 'SMA' | 'SMK'] || []).map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
              <option value="__custom__">✍️ Kustom / Tulis Sendiri...</option>
            </select>

            {isCustomSubject && (
              <input 
                type="text"
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                className={inputClass} 
                placeholder="Masukkan Nama Mata Pelajaran Kustom"
                required 
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <label className={labelClass}>
              <Layers className="w-4 h-4"/> Capaian Pembelajaran (CP) - Keputusan Kepala BSKAP No. 046/H/KR/2025
            </label>
            <span className="text-xs text-teal-800 font-bold bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg">
              Fase {formData.level === 'SD' ? (['1','2'].includes(formData.grade) ? 'A' : (['3','4'].includes(formData.grade) ? 'B' : 'C')) : (formData.level === 'SMP' ? 'D' : (formData.grade === '10' ? 'E' : 'F'))}
            </span>
          </div>

          {/* Indikator Sinkronisasi Google Sheets */}
          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-blue-950">
              {syncStatus === 'syncing' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  <span className="font-medium">Sinkronisasi CP dari spreadsheet Cloud...</span>
                </>
              ) : syncStatus === 'success' ? (
                <>
                  <span className="text-emerald-500 font-bold">●</span>
                  <span>
                    <strong className="text-emerald-950">CP cloud sinkron otomatis</strong>{" "}
                    {lastSyncedTime && (
                      <span className="text-slate-500 font-mono text-[10px]">
                        (Selesai: {new Date(lastSyncedTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })})
                      </span>
                    )}
                  </span>
                </>
              ) : syncStatus === 'error' ? (
                <>
                  <span className="text-amber-500 font-bold">●</span>
                  <span className="text-slate-600">
                    Gagal sinkron ({syncErrorMessage || "Koneksi terputus"}). Menggunakan data cadangan lokal.
                  </span>
                </>
              ) : (
                <>
                  <span className="text-slate-400 font-bold">●</span>
                  <span>Tekan tombol sinkron untuk memuat dari Spreadsheet.</span>
                </>
              )}
            </div>
            
            <button
              type="button"
              onClick={async () => {
                setSyncStatus('syncing');
                const res = await syncGoogleSheetsCP();
                if (res.success) {
                  setSyncStatus('success');
                } else {
                  setSyncStatus('error');
                  setSyncErrorMessage(res.error || "");
                }
              }}
              disabled={syncStatus === 'syncing'}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-50 text-blue-800 border border-blue-200 transition-all font-semibold select-none disabled:opacity-50 text-xs shadow-sm cursor-pointer"
              title="Sinkronkan data terupdate dari Google Spreadsheet"
            >
              <RefreshCw className={cn("w-3 h-3 text-blue-600", syncStatus === 'syncing' && "animate-spin")} />
              <span>Sinkron</span>
            </button>
          </div>

          <div className="space-y-3">
            <select
              value={cpOptions.includes(formData.cp) ? formData.cp : "__custom__"}
              onChange={(e) => {
                const val = e.target.value;
                if (val !== "__custom__") {
                  setFormData(prev => ({ ...prev, cp: val }));
                }
              }}
              className={inputClass}
            >
              {cpOptions.map((cpOpt, oIdx) => (
                <option key={oIdx} value={cpOpt}>
                  Pilihan {oIdx + 1}: {cpOpt.substring(0, 80)}...
                </option>
              ))}
              <option value="__custom__">✍️ Kustom / Edit atau Tulis Sendiri...</option>
            </select>

            <textarea
              name="cp"
              value={formData.cp}
              onChange={handleChange}
              className={cn(inputClass, "h-32 resize-none text-justify leading-relaxed")}
              placeholder="Pilih opsi di atas atau tulis Capaian Pembelajaran secara manual di sini..."
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Tujuan Pembelajaran (TP)</label>
          <textarea 
            name="tp" 
            value={formData.tp} 
            onChange={handleChange} 
            className={cn(inputClass, "h-28 resize-none text-justify leading-relaxed")} 
            placeholder="Ketik Tujuan Pembelajaran spesifik di sini..."
            required 
          />
          <p className="text-xs text-blue-800 font-bold mt-1 bg-blue-50/60 p-2.5 rounded-xl border border-blue-100 flex items-start gap-2">
            <span>💡</span>
            <span>Materi pokok / materi pelajaran akan dianalisis secara mendalam dan murni bersumber dari Tujuan Pembelajaran (TP) ini. Enjin AI tidak akan mengubah rumusan asli TP yang Anda ketik demi menjaga orisinalitas administrasi pembelajaran Anda.</span>
          </p>
        </div>
      </div>

      {/* Metode & Durasi */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <Clock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-blue-900">Metode & Durasi</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className={labelClass}>Jumlah Pertemuan</label>
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={() => updateMeetings(-1)} 
                className="w-12 h-12 rounded-xl border-2 border-blue-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <Minus className="w-5 h-5 text-blue-600"/>
              </button>

              <input
                type="number"
                name="meetings"
                value={formData.meetings}
                onChange={(e) => {
                  const val = Math.max(1, parseInt(e.target.value) || 1);
                  const diff = val - formData.meetings;
                  updateMeetings(diff);
                }}
                className="w-20 h-12 text-center text-xl font-bold bg-white/50 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                min="1"
              />

              <button 
                type="button" 
                onClick={() => updateMeetings(1)} 
                className="w-12 h-12 rounded-xl border-2 border-blue-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-5 h-5 text-blue-600"/>
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <label className={labelClass}><Clock className="w-4 h-4"/> Durasi Per Pertemuan</label>
            <input name="duration" value={formData.duration} onChange={handleChange} className={inputClass} placeholder="Contoh: 2 x 35 menit" required />
          </div>
        </div>

        <div className="space-y-4">
          <label className={labelClass}>Praktik Pedagogis Per Pertemuan</label>
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: formData.meetings }).map((_, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 bg-white/30 p-4 rounded-xl border border-blue-100">
                <span className="text-sm font-bold text-teal-700 shrink-0">Pertemuan {idx + 1}:</span>
                <div className="flex flex-wrap gap-2">
                  {PEDAGOGY_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handlePedagogyChange(idx, opt)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                        formData.pedagogy[idx] === opt 
                          ? "bg-teal-600 border-teal-600 text-white shadow-sm shadow-teal-600/30" 
                          : "bg-white border-blue-200 text-blue-700 hover:border-blue-400"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dimensi Lulusan */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-blue-900">Dimensi Lulusan</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {DIMENSI_LULUSAN.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => handleDimensiToggle(item)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold border transition-all",
                formData.dimensi.includes(item)
                  ? "bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/20"
                  : "bg-white border-blue-200 text-blue-700 hover:border-blue-400"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        {formData.dimensi.length === 0 && (
          <p className="text-xs text-amber-600 italic font-medium">Pilih minimal satu dimensi lulusan.</p>
        )}
      </div>

      {/* PERINGATAN VISUAL */}
      {showWarning && (
        <div className="mx-4 p-4 bg-orange-50 border border-orange-200 rounded-xl animate-pulse">
          <p className="text-sm text-orange-700 font-medium">
            ⚠️ Lisensi Anda Tidak Terdaftar, Hubungi Developer TM Generator APP (Fidhal Touna AI).
          </p>
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <motion.button
        whileHover={!isLoading && formData.dimensi.length > 0 && isAccessAllowed ? { scale: 1.01 } : {}}
        whileTap={!isLoading && formData.dimensi.length > 0 && isAccessAllowed ? { scale: 0.99 } : {}}
        type="submit"
        disabled={isLoading || formData.dimensi.length === 0 || !isAccessAllowed}
        className={cn(
          "w-full bg-gradient-to-r from-blue-700 to-teal-600 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all",
          (isLoading || formData.dimensi.length === 0 || !isAccessAllowed) 
            ? "opacity-40 cursor-not-allowed grayscale" 
            : "opacity-100 shadow-blue-500/20"
        )}
      >
        {isLoading ? (
          <>
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating Modul Ajar...
          </>
        ) : (
          <>
            <Send className="w-6 h-6" />
            Generate RPPM
          </>
        )}
      </motion.button>
    </form>
  );
}
