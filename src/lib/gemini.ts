import { GoogleGenAI, Type } from "@google/genai";
import { ModulFormData, GeneratedModul } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateModulAjar(data: ModulFormData): Promise<GeneratedModul> {
  const prompt = `
    Bertindaklah sebagai Ahli Kurikulum Merdeka dan Senior Instructional Designer.
    Bantu saya menghasilkan "Rencana Pelaksanaan Pembelajaran Mendalam (RPPM)" yang kreatif, terstruktur, dan sesuai standar.
    
    DATA INPUT:
    - Satuan Pendidikan: ${data.schoolName}
    - Mapel: ${data.subject}
    - Jenjang/Kelas/Semester: ${data.level} / ${data.grade} / ${data.semester}
    - CP: ${data.cp}
    - TP: ${data.tp}
    - Jumlah Pertemuan: ${data.meetings}
    - Durasi: ${data.duration}
    - Praktik Pedagogis: ${data.pedagogy.join(", ")}
    - Dimensi Lulusan: ${data.dimensi.join(", ")}

    TUGAS & ATURAN FORMAT:
    1. Identitas: classSemester harus berformat "Kelas ${data.grade} / ${data.semester}" (HANYA berisi informasi kelas dan semester dari input, tanpa embel-embel jenjang).
    2. Materi Pelajaran & Kesesuaian Jenjang (SANGAT PENTING): 
       - Analisis "Tujuan Pembelajaran (TP)" yang diberikan, lalu tentukan dan simpulkan nama materi pokok yang tepat untuk diisi ke dalam properti "identifikasi.material".
       - Anda WAJIB menyesuaikan kedalaman materi, kompleksitas bahasa, gaya belajar, serta pemilihan kegiatan berdasarkan Jenjang dan Kelas yang diinput (${data.level} / Kelas ${data.grade}). Pastikan tingkat kesulitan materi tidak terlalu tinggi/rendah untuk kelas tersebut.
    3. Identifikasi Murid: Deskripsi profil murid yang relevan dengan karakteristik psikologi perkembangan usia murid di jenjang ${data.level} Kelas ${data.grade}. Gunakan istilah "murid" (JANGAN gunakan "siswa" atau "peserta didik").
    4. Pengalaman Belajar:
       - Memahami (Kegiatan Awal): Wajib pilih salah satu prinsip (berkesadaran/bermakna/menggembirakan) dan sebutkan di awal. Selipkan satu ide "Ice Breaking" kreatif yang ramah anak dan relevan dengan usia kelas tersebut.
       - Mengaplikasi (Kegiatan Inti): Wajib pilih salah satu prinsip (berkesadaran/bermakna/menggembirakan). Sesuaikan langkahnya dengan sintaks ${data.pedagogy.join(", ")} serta sesuaikan dengan kapasitas kognitif murid kelas ${data.grade}.
       - Merefleksi (Kegiatan Penutup): Wajib pilih salah satu prinsip (berkesadaran/bermakna/menggembirakan).
    5. Asesmen: Generate Asesmen Awal, Proses (formatif), dan Akhir (sumatif) yang sesuai dengan instrumen penilaian tingkat perkembangan jenjang ${data.level} Kelas ${data.grade} (JANGAN gunakan kata 'diagnostik' dan JANGAN generate rubrik penilaian).
       
    OUTPUT HARUS DALAM BAHASA INDONESIA YANG BAIK DAN BENAR (Ejaan yang Disempurnakan).
    Seluruh output wajib menggunakan istilah "murid" dan tidak boleh menggunakan kata "siswa" atau "peserta didik".
    Format output: JSON objek sesuai skema GeneratedModul.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["identitas", "identifikasi", "desain", "pengalaman", "asesmen"],
          properties: {
            identitas: {
              type: Type.OBJECT,
              required: ["schoolName", "subject", "classSemester", "duration"],
              properties: {
                schoolName: { type: Type.STRING },
                subject: { type: Type.STRING },
                classSemester: { type: Type.STRING },
                duration: { type: Type.STRING }
              }
            },
            identifikasi: {
              type: Type.OBJECT,
              required: ["students", "material", "dimensi"],
              properties: {
                students: { type: Type.STRING },
                material: { type: Type.STRING },
                dimensi: { type: Type.STRING }
              }
            },
            desain: {
              type: Type.OBJECT,
              required: ["cp", "crossDisciplinary", "tp", "pedagogy", "partnership", "environment", "digitalUtilization"],
              properties: {
                cp: { type: Type.STRING },
                crossDisciplinary: { type: Type.STRING },
                tp: { type: Type.STRING },
                pedagogy: { type: Type.STRING },
                partnership: { type: Type.STRING },
                environment: { type: Type.STRING },
                digitalUtilization: { type: Type.STRING }
              }
            },
            pengalaman: {
              type: Type.OBJECT,
              required: ["memahami", "mengaplikasi", "merefleksi"],
              properties: {
                memahami: { type: Type.STRING },
                mengaplikasi: { type: Type.STRING },
                merefleksi: { type: Type.STRING }
              }
            },
            asesmen: {
              type: Type.OBJECT,
              required: ["awal", "proses", "akhir"],
              properties: {
                awal: { type: Type.STRING },
                proses: { type: Type.STRING },
                akhir: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    if (!response.text) {
      throw new Error("Gagal mendapatkan respon dari AI.");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}
