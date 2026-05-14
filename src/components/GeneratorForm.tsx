import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Plus, Minus, School, User as UserIcon, Briefcase, GraduationCap, Calendar, Clock, BookOpen, Layers } from 'lucide-react';
import { ModulFormData } from '../types';
import { cn } from '../lib/utils';

// Daftar sekolah yang diperbolehkan
const ALLOWED_SCHOOLS = [
  "SD NEGERI 1 AMPANA KOTA",
  "SMP TM GENERATOR APP",
  "SD Negeri 1 Ampana Kota"
];

interface GeneratorFormProps {
  onSubmit: (data: ModulFormData) => void;
  isLoading: boolean;
}

const DIMENSI_LULUSAN = [
  'Keimanan & Ketakwaan',
  'Kewargaan',
  'Penalaran Kritis',
  'Kreativitas',
  'Kolaborasi',
  'Kemandirian',
  'Kesehatan',
  'Komunikasi'
];

const PEDAGOGY_OPTIONS = [
  'Inkuiri-Discovery',
  'PjBL',
  'Problem Solving',
  'Game Based Learning',
  'Station Learning'
];

export default function GeneratorForm({ onSubmit, isLoading }: GeneratorFormProps) {
  const [formData, setFormData] = useState<ModulFormData>({
    schoolName: '',
    teacherName: '',
    teacherNip: '',
    position: 'Guru Kelas',
    principalName: '',
    principalNip: '',
    level: 'SD',
    grade: '',
    semester: 'I / Ganjil',
    subject: '',
    cp: '',
    tp: '',
    material: '',
    meetings: 1,
    duration: '',
    pedagogy: [],
    dimensi: []
  });
  
  // Fungsi pengecekan (Utility)
  const isSchoolAllowed = ALLOWED_SCHOOLS.includes(formData.schoolName.toUpperCase());

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
    if (!isSchoolAllowed) {
      alert(`Maaf, Satuan Pendidikan "${formData.schoolName}" belum terdaftar.`);
      return;
    }
    onSubmit(formData);
  };

  const sectionClass = "glass p-6 md:p-8 rounded-[1.5rem] space-y-6";
  const labelClass = "text-sm font-bold text-mint-800 flex items-center gap-2";
  const inputClass = "w-full bg-white/50 border border-mint-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-mint-500 focus:border-transparent outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header Info */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-mint-100 text-mint-600">
            <School className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-mint-900">Identitas Satuan Pendidikan</h2>
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

      {/* Curriculum Details */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-mint-100 text-mint-600">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-mint-900">Informasi Pembelajaran</h2>
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

        <div className="space-y-2">
          <label className={labelClass}>Materi Pelajaran</label>
          <input name="material" value={formData.material} onChange={handleChange} className={inputClass} required />
        </div>
      </div>

      {/* Logistics & Pedagogy */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-mint-100 text-mint-600">
            <Clock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-mint-900">Metode & Durasi</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className={labelClass}>Jumlah Pertemuan</label>
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={() => updateMeetings(-1)} 
                className="w-12 h-12 rounded-xl border-2 border-mint-200 flex items-center justify-center hover:bg-mint-50 transition-colors"
              >
                <Minus className="w-5 h-5 text-mint-600"/>
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
                className="w-20 h-12 text-center text-xl font-bold bg-white/50 border-2 border-mint-200 rounded-xl focus:ring-2 focus:ring-mint-500 outline-none transition-all"
                min="1"
              />

              <button 
                type="button" 
                onClick={() => updateMeetings(1)} 
                className="w-12 h-12 rounded-xl border-2 border-mint-200 flex items-center justify-center hover:bg-mint-50 transition-colors"
              >
                <Plus className="w-5 h-5 text-mint-600"/>
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
              <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 bg-white/30 p-4 rounded-xl border border-mint-100">
                <span className="text-sm font-bold text-mint-600 shrink-0">Pertemuan {idx + 1}:</span>
                <div className="flex flex-wrap gap-2">
                  {PEDAGOGY_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handlePedagogyChange(idx, opt)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                        formData.pedagogy[idx] === opt 
                          ? "bg-mint-500 border-mint-500 text-white shadow-sm shadow-mint-500/30" 
                          : "bg-white border-mint-200 text-mint-700 hover:border-mint-400"
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
          <div className="p-2 rounded-lg bg-mint-100 text-mint-600">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-mint-900">Dimensi Lulusan</h2>
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
                  ? "bg-mint-600 border-mint-600 text-white shadow-md shadow-mint-600/20"
                  : "bg-white border-mint-200 text-mint-700 hover:border-mint-400"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        {formData.dimensi.length === 0 && (
          <p className="text-xs text-mint-500 italic">Pilih minimal satu dimensi lulusan.</p>
        )}
      </div>

      {/* 3. PERINGATAN VISUAL */}
      {formData.schoolName && !isSchoolAllowed && (
        <div className="mx-4 p-4 bg-orange-50 border border-orange-200 rounded-xl animate-pulse">
          <p className="text-sm text-orange-700 font-medium">
            ⚠️ Lisensi Anda Tidak Terdaftar, Hubungi Developer TM Generator APP (Fidhal Touna AI).
          </p>
        </div>
      )}

      {/* 4. SUBMIT BUTTON */}
      <motion.button
        whileHover={!isLoading && formData.dimensi.length > 0 && isSchoolAllowed ? { scale: 1.01 } : {}}
        whileTap={!isLoading && formData.dimensi.length > 0 && isSchoolAllowed ? { scale: 0.99 } : {}}
        type="submit"
        disabled={isLoading || formData.dimensi.length === 0 || !isSchoolAllowed}
        className={cn(
          "w-full gradient-mint text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all",
          (isLoading || formData.dimensi.length === 0 || !isSchoolAllowed) 
            ? "opacity-40 cursor-not-allowed grayscale" 
            : "opacity-100 shadow-mint-500/20"
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
