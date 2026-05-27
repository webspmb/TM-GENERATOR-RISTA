import { Download, ChevronLeft, FileText, Printer } from 'lucide-react';
import { GeneratedModul, ModulFormData } from '../types';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ModulTableProps {
  data: GeneratedModul;
  formInput: ModulFormData;
  onBack: () => void;
}

export default function ModulTable({ data, formInput, onBack }: ModulTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const downloadWord = () => {
    if (!containerRef.current) return;
    const content = containerRef.current.innerHTML;
    const schoolName = data.identitas.schoolName || formInput.schoolName || "DOKUMEN ASLI"; 
    
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>RPPM</title>
      <style>
        @page { size: A4; margin: 2cm; mso-footer: f1; }
        body { font-family: 'Times New Roman', serif; }
        table { border-collapse: collapse; width: 100%; border: 1px solid black; }
        td, th { border: 0.5pt solid black; padding: 8px; font-size: 11pt; vertical-align: top; }
        .text-justify { text-align: justify; text-justify: inter-word; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        .uppercase { text-transform: uppercase; }
        .bg-blue-50 { background-color: #eff6ff !important; }
        .bg-slate-100 { background-color: #f1f5f9 !important; }
        div.Section1 { page: Section1; }
        p.MsoFooter { margin: 0in; font-size: 9pt; }
      </style></head>
      <body>
        <div class="Section1">
          ${content}
          <div style='mso-element:footer' id='f1'>
            <p class="MsoFooter" style="border-top: 1pt solid black; padding-top: 5pt; color: #666666;">
              ${schoolName} — TM Generator App
              <span style='mso-tab-count:2'></span>
              Halaman <span style='mso-field-code: PAGE '></span>
            </p>
          </div>
        </div>
      </body></html>`;

    const cleanedSource = header.replace(/className=/g, 'class=').replace(/bg-blue-50/g, 'bg-blue-50');
    const blob = new Blob(['\ufeff', cleanedSource], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RPPM_${formInput.subject || 'Dokumen'}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    setShowExportOptions(false);
    setTimeout(() => {
      window.print();
    }, 250);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32 px-4 relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .print-watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 5.5rem;
            font-weight: 900;
            color: rgba(220, 220, 220, 0.15) !important;
            z-index: -1;
            pointer-events: none;
            white-space: nowrap;
            display: block !important;
            text-transform: uppercase;
            -webkit-print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          @page { margin: 1.5cm; size: portrait; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .bg-white { 
            width: 100% !important; 
            box-shadow: none !important; 
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
          }
        }
        .print-watermark { display: none; }
        .spreadsheet-table { width: 100%; border-collapse: collapse; margin-top: 4px; table-layout: fixed; }
        .spreadsheet-table td { border: 1px solid #cbd5e1; padding: 8px; word-wrap: break-word; }
        @media screen {
          .bg-white {
            min-height: 29.7cm;
            width: 100%;
            max-width: 21cm;
            margin: 0 auto 2rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); 
            overflow: visible;
          }
        }
      ` }}></style>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-700 font-bold hover:text-blue-900 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Edit Data
        </button>

        <div className="relative">
          <button onClick={() => setShowExportOptions(!showExportOptions)} className="bg-gradient-to-r from-blue-700 to-teal-600 hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all">
            <Download className="w-5 h-5" /> Unduh / Cetak
          </button>
          
          <AnimatePresence>
            {showExportOptions && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                <button onClick={downloadWord} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 border-b border-slate-100 transition-colors">
                  <FileText className="w-5 h-5 text-blue-500" /> Format Word (.doc)
                </button>
                <button onClick={handlePrint} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors">
                  <Printer className="w-5 h-5 text-teal-500" /> Cetak / Print Browser
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full overflow-x-auto no-print-scrollbar">
        <div ref={containerRef} className="bg-white p-6 md:p-12 shadow-sm border border-slate-200 text-slate-900 relative box-border">
          <div className="print-watermark">
            {data.identitas.schoolName || formInput.schoolName || "DOKUMEN ASLI"}
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-xl font-bold uppercase">RENCANA PELAKSANAAN PEMBELAJARAN MENDALAM</h1>
            <p className="text-lg font-bold uppercase mt-1">(RPPM)</p>
          </div>

          <div className="space-y-6">
            {/* Section 1: Identitas */}
            <section>
              <h2 className="text-sm font-bold bg-blue-50 p-2 border border-slate-300 text-blue-900">1. IDENTITAS</h2>
              <table className="spreadsheet-table">
                <tbody>
                  <tr>
                    <td className="w-1/3 font-semibold">Nama Satuan Pendidikan</td>
                    <td>{data.identitas.schoolName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Mata Pelajaran</td>
                    <td>{data.identitas.subject}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Kelas/Semester</td>
                    <td>{data.identitas.classSemester?.replace(/Kelas\s*/i, '').trim()}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Jumlah Pertemuan</td>
                    <td>{formInput.meetings} Pertemuan</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Durasi Pertemuan</td>
                    <td>{formInput.duration}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Section 2: Identifikasi */}
            <section>
              <h2 className="text-sm font-bold bg-blue-50 p-2 border border-slate-300 text-blue-900">2. IDENTIFIKASI</h2>
              <table className="spreadsheet-table">
                <tbody>
                  <tr>
                    <td className="w-1/3 font-semibold">Murid</td>
                    <td className="text-justify leading-relaxed">{data.identifikasi.students}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Materi Pelajaran</td>
                    <td className="text-justify leading-relaxed">{data.identifikasi.material}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Dimensi Profil Lulusan</td>
                    <td className="text-justify leading-relaxed">{data.identifikasi.dimensi}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Section 3: Desain Pembelajaran */}
            <section>
              <h2 className="text-sm font-bold bg-blue-50 p-2 border border-slate-300 text-blue-900">3. DESAIN PEMBELAJARAN</h2>
              <table className="spreadsheet-table">
                <tbody>
                  <tr>
                    <td className="w-1/3 font-semibold">Capaian Pembelajaran</td>
                    <td className="text-justify leading-relaxed">{data.desain.cp}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Lintas Disiplin Ilmu</td>
                    <td className="text-justify leading-relaxed">{data.desain.crossDisciplinary}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Tujuan Pembelajaran</td>
                    <td className="text-justify leading-relaxed">{data.desain.tp}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Praktik Pedagogis</td>
                    <td className="text-justify leading-relaxed">{data.desain.pedagogy}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Kemitraan Pembelajaran</td>
                    <td className="text-justify leading-relaxed">{data.desain.partnership}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Lingkungan Pembelajaran</td>
                    <td className="text-justify leading-relaxed">{data.desain.environment}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Pemanfaatan Digital</td>
                    <td className="text-justify leading-relaxed">{data.desain.digitalUtilization}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Section 4: Pengalaman Belajar */}
            <section>
              <h2 className="text-sm font-bold bg-blue-50 p-2 border border-slate-300 text-blue-900">4. PENGALAMAN BELAJAR</h2>
              <table className="spreadsheet-table">
                <tbody>
                  <tr>
                    <td className="w-1/3 font-semibold">Memahami (Understanding)</td>
                    <td className="text-justify leading-relaxed">{data.pengalaman.memahami}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Mengaplikasi (Applying)</td>
                    <td className="text-justify leading-relaxed">{data.pengalaman.mengaplikasi}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Merefleksi (Reflecting)</td>
                    <td className="text-justify leading-relaxed">{data.pengalaman.merefleksi}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Section 5: Asesmen */}
            <section>
              <h2 className="text-sm font-bold bg-blue-50 p-2 border border-slate-300 text-blue-900">5. ASESMEN PEMBELAJARAN</h2>
              <table className="spreadsheet-table">
                <tbody>
                  <tr>
                    <td className="w-1/3 font-semibold">Asesmen Awal</td>
                    <td className="text-justify leading-relaxed">{data.asesmen.awal}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Asesmen Proses</td>
                    <td className="text-justify leading-relaxed">{data.asesmen.proses}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Asesmen Akhir</td>
                    <td className="text-justify leading-relaxed">{data.asesmen.akhir}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
          
          {/* Signature */}
          <div className="mt-16 w-full">
            <table className="w-full border-none border-collapse">
              <tbody>
                <tr>
                  <td className="w-1/2 text-left align-top p-0 border-none">
                    <p className="mb-1">Mengetahui,</p>
                    <p className="mb-0">Kepala Sekolah</p>
                    <div className="mt-20"> 
                      <p className="font-bold underline mb-0">{formInput.principalName}</p>
                      <p className="text-sm mt-0">NIP. {formInput.principalNip}</p>
                    </div>
                  </td>
                  <td className="w-1/2 text-left align-top p-0 border-none">
                    <p className="mb-1">................., ................... 20....</p>
                    <p className="mb-0">{formInput.position || 'Guru Kelas'}</p>
                    <div className="mt-20">
                      <p className="font-bold underline mb-0">{formInput.teacherName}</p>
                      <p className="text-sm mt-0">NIP. {formInput.teacherNip}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
