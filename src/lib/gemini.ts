/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { ModulFormData, GeneratedModul } from "../types";

// Inisialisasi Klien Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * Membuat prompt terstandardisasi untuk kedua enjin (Gemini dan Groq)
 */
function createPrompt(data: ModulFormData): string {
  return `
    Bertindaklah sebagai Ahli Kurikulum Merdeka dan Senior Instructional Designer.
    Bantu saya menghasilkan "Rencana Pelaksanaan Pembelajaran Mendalam (RPPM)" yang kreatif, terstruktur, dan sesuai standar.
    
    DATA INPUT:
    - Satuan Pendidikan: ${data.schoolName}
    - Mapel: ${data.subject}
    - Jenjang/Kelas/Semester: ${data.level} / ${data.grade} / ${data.semester}
    - Capaian Pembelajaran (CP): ${data.cp}
    - Tujuan Pembelajaran (TP) dari Pengguna: ${data.tp}
    - Jumlah Pertemuan: ${data.meetings}
    - Durasi: ${data.duration}
    - Praktik Pedagogis: ${data.pedagogy.join(", ")}
    - Dimensi Lulusan: ${data.dimensi.join(", ")}

    TUGAS UTAMA & ATURAN YANG SANGAT KETAT:
    1. TUJUAN PEMBELAJARAN (TP) TIDAK BOLEH DIUBAH: Properti "desain.tp" WAJIB diisi persis sama dengan TP input: "${data.tp}". Jangan mengubah, meringkas, atau menyingkatnya sedikit pun!
    2. CAPAIAN PEMBELAJARAN (CP) TIDAK BOLEH DIUBAH: Properti "desain.cp" WAJIB diisi persis sama dengan CP input: "${data.cp}". Jangan mengubah, meringkas, atau menyingkatnya sedikit pun!
    3. MATERI POKOK / MATERI PELAJARAN: Tentukan nama materi pokok secara spesifik untuk diisi dalam "identifikasi.material". Anda WAJIB menganalisis dan menyimpulkan secara mendalam materi pokok ini murni didasarkan pada "Tujuan Pembelajaran (TP)" yang diinput oleh pengguna di atas.
    4. Rancang Pengalaman Belajar Berbasis TP: Seluruh isi kegiatan awal, inti, dan akhir harus terarah demi memfasilitasi pencapaian Tujuan Pembelajaran (TP) yang diisi pengguna itu secara konkret.
    5. Identitas Kelas & Semester: Properti "identitas.classSemester" harus berformat "Kelas ${data.grade} / ${data.semester}" (tanpa embel-embel jenjang).
    6. Menyesuaikan Kedalaman Jenjang Kejuruan/Sekolah:
       - Sesuaikan tingkat kedalaman materi, kompleksitas penjelasan, model aktivitas pemecahan masalah, dan ejaan agar sangat cocok dan ramah dengan tingkat pemahaman murid jenjang ${data.level} Kelas ${data.grade}.
    7. Identifikasi Profil Murid: Deskripsikan karakteristik perilaku/psikologi perkembangan anak sesuai jenjang ${data.level} Kelas ${data.grade}. Gunakan istilah "murid" (JANGAN gunakan "siswa" atau "peserta didik").
    8. Pengalaman Belajar Berbasis Pembelajaran Mendalam (Deep Learning):
       - Setiap bagian pengalaman belajar (memahami, mengaplikasi, merefleksi) HARUS memuat dan menerapkan prinsip pembelajaran mendalam secara eksplisit.
       - Anda WAJIB menggunakan dan menuliskan bahasa prinsip asli ini secara eksplisit dalam deskripsi aktivitas:
         * Memahami (Kegiatan Awal): Wajib mencantumkan secara tertulis prinsip "berkesadaran" di bagian awal ulasan untuk memusatkan perhatian spiritual/fokus pikiran murid, lengkap dengan satu ide ice-breaking kreatif.
         * Mengaplikasi (Kegiatan Inti): Wajib mencantumkan secara tertulis prinsip "menggembirakan" pada deskripsi aktivitas yang interaktif, menantang, serta menjabarkan sintaks konkret sesuai praktik pedagogis "${data.pedagogy.join(", ")}".
         * Merefleksi (Kegiatan Penutup): Wajib mencantumkan secara tertulis prinsip "bermakna" di ulasan kegiatannya agar murid dapat menyerap esensi ilmu baru yang telah dipelajari dalam keseharian.
    9. Pengisian Kolom Desain Pembelajaran (WAJIB diisi lengkap dan detail sesuai standar Kurikulum Merdeka):
       - crossDisciplinary (Lintas Disiplin Ilmu): Wajib diisi lengkap dengan deskripsi konkret integrasi muatan materi dengan bidang ilmu atau mata pelajaran relevan lainnya.
       - partnership (Kemitraan Pembelajaran): Wajib diisi penjelasan terperinci mengenai pelibatan orang tua murid, praktisi industri, warga sekitar, atau pakar dari luar untuk memperkaya materi ajar.
       - environment (Lingkungan Pembelajaran): Wajib diisi gambaran suasana kelas fisik maupun psikologis yang dirancang inklusif, aman, nyaman, dan mendukung fokus belajar murid.
       - digitalUtilization (Pemanfaatan Digital): Wajib diisi jenis pemanfaatan aplikasi interaktif, tayangan video, LMS, software digital, atau gawai penunjang nyata dalam pembelajaran.
    10. Asesmen Pembelajaran: Jabarkan bentuk Asesmen Awal, Asesmen Proses (formatif), dan Asesmen Akhir (sumatif). Gunakan istilah "murid", JANGAN pakat kata "diagnostik", dan JANGAN generate rubrik penilaian.

    OUTPUT HARUS DALAM BAHASA INDONESIA YANG BAIK DAN BENAR (Ejaan yang Disempurnakan).
    Seluruh output wajib menggunakan istilah "murid" dan tidak boleh menggunakan kata "siswa" atau "peserta didik".
    Format output harus valid JSON objek tanpa ada teks tambahan lain sebelum dan sesudah json. Harus bisa diparsing menggunakan JSON.parse() with skema:
    {
      "identitas": {
        "schoolName": "...",
        "subject": "...",
        "classSemester": "...",
        "duration": "..."
      },
      "identifikasi": {
        "students": "...",
        "material": "...",
        "dimensi": "..."
      },
      "desain": {
        "cp": "...",
        "crossDisciplinary": "...",
        "tp": "...",
        "pedagogy": "...",
        "partnership": "...",
        "environment": "...",
        "digitalUtilization": "..."
      },
      "pengalaman": {
        "memahami": "...",
        "mengaplikasi": "...",
        "merefleksi": "..."
      },
      "asesmen": {
        "awal": "...",
        "proses": "...",
        "akhir": "..."
      }
    }
  `;
}

/**
 * Enjin Pertama: Gemini-2.5-Flash
 */
async function generateWithGemini(data: ModulFormData): Promise<GeneratedModul> {
  const prompt = createPrompt(data);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
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
    throw new Error("Respon kosong dari enjin Gemini.");
  }

  return JSON.parse(response.text);
}

/**
 * Enjin Kedua (Penstabil): Groq API dengan model openai/gpt-oss-20b
 */
async function generateWithGroq(data: ModulFormData): Promise<GeneratedModul> {
  const prompt = createPrompt(data);
  const groqApiKey = process.env.GROQ_API_KEY || "";
  
  if (!groqApiKey) {
    throw new Error("GROQ_API_KEY belum terkonfigurasi.");
  }

  // Model yang diminta pengguna. Kami sediakan toleransi fallback jika model spesifik tersebut beralih.
  const modelsToTry = ["openai/gpt-oss-20b", "llama-3.3-70b-versatile", "mixtral-8x7b-32768"];
  let lastErrorMsg = "";

  for (const modelName of modelsToTry) {
    try {
      console.log(`Mencoba memproses Groq dengan model: ${modelName}`);
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqApiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            {
              role: "system",
              content: "Kembalikan respon murni dalam format JSON objek solid sesuai dengan spesifikasi skema yang diminta pengguna."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.3,
          response_format: { type: "json_object" }
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const rawJson = await res.json();
      const contentText = rawJson.choices?.[0]?.message?.content;
      
      if (!contentText) {
        throw new Error("Hasil respon teks dari asisten Groq kosong.");
      }

      return JSON.parse(contentText);
    } catch (e: any) {
      console.warn(`Gagal memproses dengan model ${modelName}:`, e.message || e);
      lastErrorMsg = e.message || String(e);
      // Lanjut ke model berikutnya dalam rantai toleransi kegagalan (fallback chain)
    }
  }

  throw new Error(`Semua pilihan model Groq gagal. Error terakhir: ${lastErrorMsg}`);
}

/**
 * Fungsi Utama: Menghasilkan Modul Ajar RPPM
 * Menggunakan mode dual-enjin kooperatif untuk menghasilkan stabilitas tinggi.
 */
export async function generateModulAjar(data: ModulFormData): Promise<GeneratedModul> {
  const hasGemini = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
  const hasGroq = !!process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "MY_GROQ_API_KEY";

  console.log("Status Konfigurasi Enjin AI:", { hasGemini, hasGroq });

  let parsedResult: GeneratedModul | null = null;
  let lastError: any = null;

  // 1. Prioritas Enjin Utama: Gemini 2.5 Flash
  if (hasGemini) {
    try {
      console.log("Menjalankan Enjin Utama: Gemini 2.5 Flash...");
      parsedResult = await generateWithGemini(data);
    } catch (err: any) {
      console.warn("Enjin utama (Gemini) gagal:", err.message || err);
      lastError = err;
    }
  }

  // 2. Apabila Gemini Gagal/Tidak Tersedia dan Groq sudah terisi API Key, hubungi Groq (openai/gpt-oss-20b)
  if (!parsedResult && hasGroq) {
    try {
      console.log("Menjalankan Enjin Stabilizer: Groq...");
      parsedResult = await generateWithGroq(data);
    } catch (err: any) {
      console.warn("Enjin stabilizer (Groq) gagal:", err.message || err);
      lastError = err;
    }
  }

  // 3. Fallback Terakhir: Coba paksa Gemini apa adanya (berharap load key default dari cloud)
  if (!parsedResult && !hasGemini && !hasGroq) {
    try {
      console.log("Mencoba memproses model default Gemini...");
      parsedResult = await generateWithGemini(data);
    } catch (err: any) {
      lastError = err;
    }
  }

  if (parsedResult) {
    // Ganti semua sebutan "peserta didik" dengan "murid" secara rekursif pada konten generator
    const replaceText = (text: string): string => {
      if (typeof text !== 'string') return text;
      return text
        .replace(/PESERTA DIDIK/g, 'MURID')
        .replace(/Peserta Didik/g, 'Murid')
        .replace(/Peserta didik/g, 'Murid')
        .replace(/peserta Didik/g, 'murid')
        .replace(/peserta didik/g, 'murid');
    };

    const deepReplace = (obj: any): any => {
      if (obj === null || obj === undefined) return obj;
      if (typeof obj === 'string') {
        return replaceText(obj);
      }
      if (Array.isArray(obj)) {
        return obj.map(item => deepReplace(item));
      }
      if (typeof obj === 'object') {
        const res: any = {};
        for (const key of Object.keys(obj)) {
          res[key] = deepReplace(obj[key]);
        }
        return res;
      }
      return obj;
    };

    parsedResult = deepReplace(parsedResult);

    // 🛡️ GARANSI KEAMANAN DATA UTUH: Pastikan CP dan TP tidak diubah atau dipangkas oleh AI
    parsedResult.desain.tp = data.tp;
    parsedResult.desain.cp = data.cp;
    
    // Pastikan nama sekolah dan mapel tetap sinkron sempurna seseuai masukan form
    if (data.schoolName) parsedResult.identitas.schoolName = data.schoolName;
    if (data.subject) parsedResult.identitas.subject = data.subject;
    
    return parsedResult;
  }

  throw new Error(
    lastError?.message || 
    "Gagal menghasilkan rencana pembelajaran dengan enjin kecerdasan buatan. Harap periksa apakah API Key Gemini atau Groq sudah dimasukkan dengan benar."
  );
}
