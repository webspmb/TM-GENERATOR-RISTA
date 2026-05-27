import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Plus, Minus, School, User as UserIcon, Briefcase, GraduationCap, Calendar, Clock, BookOpen, Layers, Trash2, FileText } from 'lucide-react';
import { ModulFormData } from '../types';
import { cn } from '../lib/utils';

// Daftar sekolah yang diperbolehkan
const ALLOWED_SCHOOLS = [
  "SD Negeri 1 Ampana Kota",
  "SD NEGERI 1 AMPANA KOTA",
  "SDN 1 AMPANA KOTA"
];

// Daftar nama guru yang diperbolehkan
const ALLOWED_TEACHERS = [
  "Rista Kasaraeng, S.Pd",
  "RISTA KASARAENG, S.Pd",
  "Fidhal" 
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

    return {
      schoolName: savedData?.schoolName || '',
      teacherName: savedData?.teacherName || '',
      teacherNip: savedData?.teacherNip || '',
      position: savedData?.position || 'Guru Kelas',
      principalName: savedData?.principalName || '',
      principalNip: savedData?.principalNip || '',
      level: savedData?.level || 'SD',
      grade: savedData?.grade || '',
      semester: savedData?.semester || 'I / Ganjil',
      subject: savedData?.subject || '',
      cp: savedData?.cp || '',
      tp: savedData?.tp || '',
      meetings: savedData?.meetings || 1,
      duration: savedData?.duration || '',
      pedagogy: savedData?.pedagogy || [],
      dimensi: savedData?.dimensi || []
    };
  });

  useEffect(() => {
    localStorage.setItem('tm_generator_form_data', JSON.stringify(formData));
  }, [formData]);

  const handleClearForm = () => {
    if (confirm("Apakah Anda yakin ingin membersihkan semua draf data yang telah diisi?")) {
      localStorage.removeItem('tm_generator_form_data');
      setFormData({
        schoolName: '', teacherName: '', teacherNip: '', position: 'Guru Kelas',
        principalName: '', principalNip: '', level: 'SD', grade: '',
        semester: 'I / Ganjil', subject: '', cp: '', tp: '',
        meetings: 1, duration: '', pedagogy: [], dimensi: []
      });
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
    setFormData(prev => ({ ...prev, [name]: value }));
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
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Kelas</label>
            <input name="grade" value={formData.grade} onChange={handleChange} className={inputClass} placeholder="Contoh: 1, 7, 10" required />
          </div>
          <div className="space-y-2">
            <label className={labelClass}><Calendar className="w-4 h-4"/> Semester</label>
            <select name="semester" value={formData.semester} onChange={handleChange} className={inputClass}>
              <option value="I / Ganjil">I / Ganjil</option>
              <option value="II / Genap">II / Genap</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className={labelClass}><BookOpen className="w-4 h-4"/> Mata Pelajaran (Mapel)</label>
          <input name="subject" value={formData.subject} onChange={handleChange} className={inputClass} required />
        </div>

        <div className="space-y-2">
          <label className={labelClass}><Layers className="w-4 h-4"/> Capaian Pembelajaran (CP)</label>
          <textarea name="cp" value={formData.cp} onChange={handleChange} className={cn(inputClass, "h-24 resize-none")} required />
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Tujuan Pembelajaran (TP)</label>
          <textarea name="tp" value={formData.tp} onChange={handleChange} className={cn(inputClass, "h-24 resize-none")} required />
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
