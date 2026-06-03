/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CapaianPembelajaranItem {
  id: string;
  text: string;
}

/**
 * Pemetaan CP Kurikulum Merdeka - Keputusan Kepala BSKAP Nomor 046/H/KR/2025
 */
export const CP_DATABASE: Record<string, Record<string, Record<string, string[]>>> = {
  SD: {
    "1": {
      "Bahasa Indonesia": [
        "Murid mampu bersikap menjadi penyimak yang baik dan penuh perhatian. Murid mampu memahami informasi dari bacaan dan tayangan yang didengar dengan bantuan gambar/ilustrasi konkret.",
        "Murid mampu memahami kata-kata yang sering ditemui sehari-hari, membaca kata-kata baru dengan pola KV (Konsonan-Vokal) secara fasih, serta membaca nyaring dengan intonasi tepat.",
        "Murid mampu berbicara dengan sopan, menceritakan kembali suatu informasi atau pengalaman pribadi menggunakan kalimat sederhana yang mudah dipahami.",
        "Murid mampu menulis kata-kata sederhana, meniru huruf cetak dan tegak bersambung, serta menuliskan teks narasi pendek berdasarkan pengalaman konkret."
      ],
      "Matematika": [
        "Murid dapat membilang, membaca, menuliskan, serta mengurutkan lambang bilangan cacah sampai dengan 20 menggunakan benda konkret.",
        "Murid dapat melakukan operasi penjumlahan dan pengurangan bilangan cacah sampai dengan 20 menggunakan obyek visual dan jari tangan secara konkret.",
        "Murid dapat mengidentifikasi, mendeskripsikan, dan menyusun kembali pola ubinan bangun datar sederhana (segitiga, segi empat) secara visual.",
        "Murid dapat membandingkan panjang, berat, dan durasi waktu menggunakan alat ukur tidak baku (jengkal, langkah kaki, depa, dll)."
      ],
      "Pendidikan Pancasila": [
        "Murid mampu menyebutkan identitas diri sesuai dengan jenis kelamin, hobi, dan minat, serta menerima keunikan diri sebagai anugerah Tuhan Yang Maha Esa.",
        "Murid mampu mengidentifikasi simbol-simbol sila Pancasila dalam lambang negara Garuda Pancasila dan menceritakan hubungan simbol dengan maknanya.",
        "Murid dapat menceritakan contoh perilaku menaati aturan di rumah dan di sekolah secara lisan maupun tindakan nyata."
      ],
      "Pendidikan Agama Islam": [
        "Murid mampu mengenal rukun Islam, rukun iman, dan lafal bersuci (wudu) dengan baik dan benar sesuai ketentuan syariat.",
        "Murid mampu melafalkan, membaca, dan menghafalkan surah-surah pendek pilihan (Al-Fatihah, An-Nas, Al-Falaq) secara tartil.",
        "Murid mampu menampilkan perilaku jujur, hormat, menyayangi keluarga dan guru, serta menjaga kebersihan sebagai implementasi akhlak mulia."
      ],
      "Seni Rupa": [
        "Murid mampu mengamati, mengenal, dan menggunakan elemen dasar rupa (garis, bentuk, warna) untuk mengekspresikan diri atau menggambar kejadian sehari-hari.",
        "Murid mampu mendeskripsikan karya rupa miliknya sendiri atau milik teman dengan menggunakan bahasa yang santun dan sederhana."
      ]
    },
    "2": {
      "Bahasa Indonesia": [
        "Murid mampu menyimak dengan konsentrasi tinggi, memahami instruksi lisan dari guru, serta menceritakan kembali isi teks dengar secara berurutan.",
        "Murid mampu membaca kata-kata dengan suku kata kompleks (KV-KVK, KVK-KV) secara lancar, dan memahami informasi tersurat pada teks cerita bergambar.",
        "Murid mampu berpartisipasi aktif dalam diskusi kelas ilmiah sederhana, mengemukakan pertanyaan, serta menjawab dengan kalimat runut.",
        "Murid mampu menulis ejaan kata dengan benar menggunakan huruf besar di awal kalimat dan tanda baca titik (.), serta menyusun kalimat runtut."
      ],
      "Matematika": [
        "Murid dapat membilang, menunjukkan, dan menuliskan nilai tempat bilangan cacah sampai dengan 100 dengan bantuan media nilai tempat (puluhan dan satuan).",
        "Murid dapat menyelesaikan masalah operasi penjumlahan dan pengurangan yang melibatkan bilangan cacah hingga 100 dalam kehidupan sehari-hari.",
        "Murid dapat mengidentifikasi bentuk-bentuk bangun datar (lingkaran, segitiga, persegi, persegi panjang) dan menyebutkan jumlah sudut serta sisinya.",
        "Murid dapat mengukur panjang dan berat menggunakan alat ukur standar (penggaris, timbangan dapur) dengan ketelitian sentimeter dan gram."
      ],
      "Pendidikan Pancasila": [
        "Murid mampu mempraktikkan sikap kerja sama dan gotong royong dalam menjaga kebersihan lingkungan rumah maupun kelas.",
        "Murid mampu mengidentifikasi keberagaman di lingkungan keluarga dan sekolah (suku, agama, fisik, hobi) serta menunjukkan sikap toleransi.",
        "Murid dapat menjelaskan arti hak dan kewajiban sebagai anggota keluarga dan warga sekolah dengan bahasa yang sederhana."
      ]
    },
    "3": {
      "Bahasa Indonesia": [
        "Murid mampu menyimak paparan laporan hasil observasi terstruktur, mengidentifikasi ide pokok dan ide pendukung yang disampaikan secara lisan.",
        "Murid mampu membaca dengan pemahaman (comprehension), menemukan makna kata baru menggunakan kamus sederhana, serta memahami alur narasi teks fiksi.",
        "Murid mampu mempresentasikan informasi dengan intonasi menarik, volume yang cukup, serta menjaga kontak mata dengan pemirsa secara percaya diri.",
        "Murid mampu menulis rangkuman informasi sederhana dengan menyusun paragraf yang koheren memakai kata hubung (konjungsi) yang tepat."
      ],
      "Matematika": [
        "Murid dapat membaca, menulis, dan mengurutkan bilangan cacah sampai dengan 1.000 serta memahami pemecahan nilai tempat ribuan, ratusan, puluhan.",
        "Murid dapat memahami konsep perkalian dan pembagian sebagai penjumlahan/pengurangan berulang serta menerapkan dalam operasi aritmatika bernomor.",
        "Murid dapat mengenal pecahan sederhana (setengah, sepertiga, seperempat) menggunakan model konkret berupa gambar potongan benda.",
        "Murid dapat memperkirakan dan mengukur keliling lingkaran dan persegi panjang dengan menjumlahkan seluruh panjang sisi-sisi luarnya."
      ],
      "Ilmu Pengetahuan Alam dan Sosial (IPAS)": [
        "Murid menganalisis hubungan antara bentuk serta fungsi bagian tubuh pada manusia (mata, telinga, kulit, dll) dan tumbuhan (akar, batang, daun).",
        "Murid mampu mendeskripsikan siklus hidup/metamorfosis pada beberapa hewan di sekitar rumah dan menganalisis peran pentingnya dalam ekosistem.",
        "Murid memahami konsep gaya (gaya otot, gesek, magnet, gravitasi) serta membuktikan pengaruhnya terhadap gerak arah benda secara langsung.",
        "Murid mengidentifikasi berbagai wujud zat (padat, cair, gas) serta mengamati proses perubahan wujud zat (mencair, membeku, menguap, mengembun)."
      ],
      "Pendidikan Pancasila": [
        "Murid dapat mengidentifikasi tradisi, adat-istiadat, dan budaya lokal di daerah tempat tinggalnya serta mempromosikan kebanggaan daerah milik bersama.",
        "Murid mampu memahami pentingnya musyawarah untuk mencapai tujuan mufakat dalam menyelesaikan masalah bersama di kelas.",
        "Murid menunjukkan perilaku cinta tanah air dengan menghargai produk-produk kerajinan lokal daerah tempat tinggal."
      ]
    },
    "4": {
      "Bahasa Indonesia": [
        "Murid mampu mengevaluasi isi informasi teks instruksi yang kompleks, membedakan fakta dan opini dalam teks cerita fiksi maupun non-fiksi.",
        "Murid mampu membaca cepat dengan akurasi tinggi, meramalkan kelanjutan alur cerita berdasarkan korelasi ilustrasi gambar dan teks tertulis.",
        "Murid mampu menyampaikan pendapat pribadi secara logis, menggunakan kosakata baru, serta berekspresi secara teatrikal saat berdrama.",
        "Murid mampu menuangkan ide imajinasi kreatif ke dalam bentuk puisi atau naskah deklarasi pendek menggunakan rima bahasa yang indah."
      ],
      "Matematika": [
        "Murid dapat mengurutkan, membandingkan, serta melakukan estimasi nilai angka pecahan senilai menggunakan gambar diagram matematika.",
        "Murid dapat menyelesaikan permasalahan matematika yang kompleks mengenai kelipatan persekutuan terkecil (KPK) dan faktor persekutuan terbesar (FPB).",
        "Murid dapat mendeskripsikan jenis-jenis sudut (lancip, siku-siku, tumpul) serta mengukur besaran derajatnya menggunakan busur derajat.",
        "Murid dapat menghitung luas daerah persegi panjang dan luas segitiga siku-siku menggunakan rumus matematika yang relevan."
      ],
      "Ilmu Pengetahuan Alam dan Sosial (IPAS)": [
        "Murid mengidentifikasi keragaman bentang alam (dataran tinggi, pantai, sungai) serta mengaitkan potensi sumber daya alam dengan mata pencaharian penduduk.",
        "Murid menganalisis siklus air (evaporasi, kondensasi, presipitasi) serta menyimpulkan pentingnya pelestarian sumber air bersih bagi kehidupan bumi.",
        "Murid memahami jenis-jenis energi (potensial, kinetik, panas, bunyi, cahaya) dan menjelaskan contoh perubahan energi di peralatan rumah tangga.",
        "Murid mempelajari keunikan sejarah Kerajaan Hindu, Buddha, dan Islam di wilayah regional tempat tinggalnya."
      ]
    },
    "5": {
      "Bahasa Indonesia": [
        "Murid mampu menganalisis unsur intrinsik karya fiksi (tokoh, latar, alur, amanat) serta merangkum teks eksplanasi ilmiah secara komprehensif.",
        "Murid mampu membaca kritis, memisahkan fakta ilmiah dari rumor sosial dalam bacaan jurnalistik ramah anak.",
        "Murid mampu melakukan pidato singkat, memimpin diskusi kelompok pemecahan masalah dengan bahasa persuasif dan diplomatis.",
        "Murid mampu menulis surat resmi, naskah narasi eksposisi ilmiah, serta teks tanggapan deskriptif mengenai estetika karya seni daerah."
      ],
      "Matematika": [
        "Murid dapat memahami konsep penjumlahan, pengurangan, perkalian, pecahan desimal, serta persentase dalam perhitungan keuangan sederhana.",
        "Murid dapat menghitung konsep skala, jarak pada peta, dan perbandingan senilai untuk menganalisis dimensi model denah tata letak ruang.",
        "Murid menyajikan data dalam bentuk tabel frekuensi, diagram batang, garis, serta menyelesaikan rata-rata hitung (mean) dan modus.",
        "Murid dapat mengidentifikasi jaring-jaring bangun ruang kubus dan balok serta menghitung kapasitas volume keduanya."
      ],
      "Ilmu Pengetahuan Alam dan Sosial (IPAS)": [
        "Murid menganalisis cara kerja sistem organ pernapasan, pencernaan, dan peredaran darah pada manusia serta upaya menjaga kesehatannya.",
        "Murid mampu menganalisis hubungan rantai makanan dan jaring-jaring makanan dalam ekosistem darat maupun perairan dalam konsep transfer energi.",
        "Murid memahami sifat-sifat cahaya (merambat lurus, dipantulkan, dibiaskan) serta mengaplikasikannya dalam pembuatan periskop atau kamera obskura.",
        "Murid menganalisis magnet bumi, gravitasi kosmis, serta konsep geografi astronomis tata surya."
      ]
    },
    "6": {
      "Bahasa Indonesia": [
        "Murid mampu mengevaluasi kredibilitas argumen teks opini, merangkum karya ilmiah pendek, dan menuliskan kesimpulan logis bernalar kritis.",
        "Murid membaca cepat teks ilmiah populer dari berbagai sumber digital, mengonfirmasi data pustaka rujukan dengan saksama.",
        "Murid mampu melakukan wawancara formal dengan narasumber profesional, menyunting rekaman tanya jawab secara tertulis.",
        "Murid mampu menghasilkan tulisan fiksi (cerpen) orisinal yang memiliki kedalaman alur plot narasi, pesan moral, dan karakter yang kuat."
      ],
      "Matematika": [
        "Murid dapat menyelesaikan perhitungan campuran bilangan bulat negatif dan positif dalam pemecahan urutan pengerjaan operasi matematika.",
        "Murid dapat mengidentifikasi variabel lingkaran (jari-jari, diameter, busur, tembereng) serta menghitung luas lingkaran dan keliling lingkaran.",
        "Murid memahami analisis probabilitas peluang dari lemparan dadu atau pengambilan kartu secara acak logis statistika.",
        "Unruk bangun ruang tabung, kerucut, dan bola, murid sanggup mencari luas permukaan gabungan serta volume geometrinya secara tepat."
      ],
      "Ilmu Pengetahuan Alam dan Sosial (IPAS)": [
        "Murid menganalisis dinamika rotasi dan revolusi bumi serta revolusi bulan, serta akibatnya terhadap pergantian musim, gerhana, dan penanggalan.",
        "Murid mendeskripsikan sifat-sifat kelistrikan (rangkaian seri dan paralel) serta mendesain prototipe bel listrik atau lampu lalin mini.",
        "Murid menganalisis benua-benua di dunia, letak astronomis Indonesia di garis khatulistiwa, serta hubungan diplomasi kawasan ASEAN.",
        "Murid merancang kampanye pelestarian alam bertema ramah energi terbarukan global."
      ]
    }
  },
  SMP: {
    "7": {
      "Bahasa Indonesia": [
        "Murid memahami, menganalisis, dan mengevaluasi informasi teks deskripsi, teks narasi (cerita fantasi), dan novel remaja sasaran usia transisi.",
        "Murid mampu menulis teks prosedur yang akurat, menyusun ejaan baku Bahasa Indonesia, serta menyajikan tanggapan kritis berupa resensi buku.",
        "Murid mampu berbicara dalam diskusi panel formal, menyajikan materi presentasi ilmiah menggunakan bahasa akademis santun."
      ],
      "Matematika": [
        "Murid dapat membaca, menulis, membandingkan bilangan bulat positif dan negatif, serta mengurutkannya dalam garis bilangan.",
        "Murid dapat merumuskan ekspresi aljabar linear satu variabel, menentukan koefisien, konstanta, variabel, dan menyelesaikannya.",
        "Murid dapat menerapkan perbandingan senilai dan berbalik nilai untuk memecahkan proporsi masalah skala peta dan waktu pekerjaan."
      ],
      "Ilmu Pengetahuan Alam (IPA)": [
        "Murid memahami hakikat sains, metode ilmiah penyelidikan, sifat kelarutan zat, kerapatan massa, dan pengukuran besaran fisis.",
        "Murid memahami tentang energi potensial, energi kinetik, hukum kekekalan energi, suhu, termometer, kalor, serta pemuaian zat fisis.",
        "Murid mengidentifikasi klasifikasi makhluk hidup binominal nomenklatur, dinamika interaksi produsen, konsumen, pengurai dalam ekosistem."
      ],
      "Ilmu Pengetahuan Sosial (IPS)": [
        "Murid menganalisis pembentukan permukaan bumi dan masa praaksara serta asalnya mula nenek moyang bangsa Indonesia.",
        "Murid menganalisis interaksi sosial, proses sosialisasi anak, pembentukan jati diri suku bangsa, dan pemenuhan kebutuhan ekonomi keluarga."
      ]
    },
    "8": {
      "Bahasa Indonesia": [
        "Murid mengevaluasi argumen teks eksposisi, menganalisis akurasi data poster iklan layanan masyarakat, serta struktur naskah drama panggung.",
        "Murid terampil menulis teks eksplanasi fenomena alam, menyusun teks ulasan lagu tradisional yang kaya makna kultural.",
        "Murid mampu mendeklamasikan pidato persuasif di depan forum kepemudaan menggunakan intonasi bertenaga, vokal yang mantap."
      ],
      "Matematika": [
        "Murid memahami kedudukan relasi dan fungsi linear, merepresentasikan relasi fungsi dalam diagram kartesius dan grafik garis lurus.",
        "Murid mampu menyelesaikan persamaan linear dua variabel (SPLDV) dengan metode eliminasi, substitusi, serta grafik visual matematika.",
        "Murid membuktikan teorema Pythagoras secara deduktif dan menerapkannya dalam mencari hipotenusa panjang sisi miring segitiga."
      ],
      "Ilmu Pengetahuan Alam (IPA)": [
        "Murid memahami anatomi struktur rangka, otot, serta sistem pencernaan, peredaran darah, pernapasan, dan ekskresi pada manusia.",
        "Murid menganalisis fenomena fisika getaran, gelombang suara, resonansi, sifat pemantulan alat optik cermin, serta pembiasan lensa.",
        "Murid memahami unsur, senyawa, campuran kimiawi, serta mendeteksi aditif makanan berbahaya komersial."
      ]
    },
    "9": {
      "Bahasa Indonesia": [
        "Murid mengevaluasi keabsahan data teks laporan percobaan ilmiah, merangkum pidato kebangsaan, serta mengulas esai sastra klasik.",
        "Murid mampu menulis teks diskusi berimbang (pro dan kontra), menyusun cerita pendek berkarakter mendalam yang bermakna budi pekerti.",
        "Murid piawai membawakan acara formal protokoler secara berwibawa, menjawab pertanyaan pers persidangan ilmiah."
      ],
      "Matematika": [
        "Murid memahami sifat-sifat perpangkatan bilangan eksponen bulat negatif/positif, eksponen akar, serta merasionalkan pecahan penyebut akar.",
        "Murid dapat menganalisis fungsi kuadrat f(x)=ax²+bx+c, mencari titik puncak grafik parabola, serta menentukan sumbu simetri.",
        "Murid menguasai konsep transformasi geometri (translasi, refleksi, rotasi, dilatasi) dalam koordinat kartesius matematis."
      ],
      "Ilmu Pengetahuan Alam (IPA)": [
        "Murid mendeskripsikan biologi sistem reproduksi manusia, pembelahan sel mitosis/meiosis, serta teknologi kesehatan pencegahan penyakit reproduktif.",
        "Murid memahami konsep pewarisan sifat makhluk hidup, dominansi gen, persilangan monohibrid/dihibrid Gregor Mendel.",
        "Murid memahami fisika listrik statis, muatan Coulomb, hukum Ohm pada listrik dinamis, kemagnetan elektron, elektromagnetik transformator."
      ]
    }
  },
  SMA: {
    "10": {
      "Bahasa Indonesia": [
        "Murid mengevaluasi secara kritis informasi gagasan teks laporan hasil observasi, teks anekdot kritik sosial, serta cerita hikayat melayu kelas tinggi.",
        "Murid mampu menegosiasikan pemecahan sengketa secara damai melalui struktur teks negosiasi tertulis, menyusun debat argumen logis terpercaya.",
        "Murid mengasah kemampuan menulis teks biografi inspiratif tokoh bangsa, menyajikan laporan ekspositoris visual multimedia."
      ],
      "Matematika": [
        "Murid dapat menggunakan sifat eksponen pangkat rasional dan logaritma kalkulatif dalam simulasi pertumbuhan koloni bakteri dan peluruhan radioaktif.",
        "Murid menguasai metode grafik barisan aritmatika geometris untuk memproyeksikan deret tabungan finansial masa depan.",
        "Murid mengenali trigonometri dasar perbandingan sinus, kosinus, tangen segitiga siku-siku serta aplikasinya mencari tinggi menara.",
        "Murid memahami statistika deskriptif ukuran pemusatan kelompok (mean, median, modus kelompok) menggunakan jangkauan kuartil."
      ]
    },
    "11": {
      "Bahasa Indonesia": [
        "Murid menyusun esai kritis argumentatif topik isu sains lingkungan hidup, serta menulis teks proposal kegiatan sekolah secara terstruktur.",
        "Murid mampu menganalisis struktur karya ilmiah orisinal, mereview kelayakan hipotesis makalah akademik kawan sebaya.",
        "Murid mahir membaca puisi modern dengan pemaknaan mendalam (deklamasi), menulis naskah drama teater realis bertema patriotisme."
      ],
      "Matematika": [
        "Murid menguasai konsep komposisi fungsi f(g(x)) beserta fungsi inversnya f⁻¹(x) untuk menyederhanakan rantai operasi industri pabrik.",
        "Murid mendalami geometri lingkaran, mencari persamaan lingkaran pusat (0,0) dam (a,b), serta melukis persamaan garis singgung lingkaran."
      ]
    },
    "12": {
      "Bahasa Indonesia": [
        "Murid mengevaluasi objektivitas teks editorial surat kabar nasional, menyintesis opini pribadi ke dalam artikel opini jurnalistik berimbang.",
        "Murid terampil menulis surat lamaran pekerjaan formal yang menarik perhatian, menyusun kurikulum vitae akademis komersial.",
        "Murid mampu melakukan tinjauan sastra kritik esai teks novel Indonesia modern secara filosofis mendalam."
      ],
      "Matematika": [
        "Murid dapat memecahkan konsep geometri dimensi tiga (jarak antar titik, jarak titik ke garis, jarak titik ke bidang) pada kubus tiga dimensi.",
        "Murid memahami perhitungan peluang kejadian majemuk saling lepas, saling bebas, serta peluang bersyarat dalam teori statistika."
      ]
    }
  },
  SMK: {
    "10": {
      "Bahasa Indonesia": [
        "Murid mengevaluasi secara kritis gagasan laporan kerja lapangan, manual prosedur keselamatan mesin industri, dan rangkuman hikayat.",
        "Murid mampu menyusun naskah negosiasi kemitraan bisnis komersial mikro, menyajikan debat regulasi ekonomi secara objektif.",
        "Murid mampu menulis instruksi kerja teknis yang presisi menggunakan terminologi kejuruan yang tepat berstandar industri."
      ],
      "Matematika": [
        "Murid menggunakan sifat eksponen untuk mengalisis grafik pertumbuhan produksi manufaktur dan perhitungan penyusutan alat berat bengkel.",
        "Murid menguasai barisan aritmatika geometris untuk memperkirakan progres pemasukan anggaran omzet tahunan unit usaha produk keatasan.",
        "Murid menerapkan trigonometri sudut elevasi penampang mesin bubut untuk menentukan dimensi sudut tajam kemiringan pemotongan pipa besi."
      ],
      "Informatika": [
        "Murid memahami berpikir komputasional, algoritma pencarian (searching), pengurutan (sorting), struktur data tumpukan (stack) dan antrean (queue).",
        "Murid mampu memanfaatkan fitur aplikasi perkantoran terintegrasi (word processor, spreadsheet, presentasi) untuk produktivitas dokumen niaga.",
        "Murid memahami prinsip sistem komputer, jaringan lokal/internet, keamanan siber dasar, serta dampak sosial kemasyarakatan digital baru."
      ],
      "Projek Ilmu Pengetahuan Alam dan Sosial (IPAS)": [
        "Murid menganalisis gejala alam lingkungan sekitar secara saintifik, mendeteksi sumber polusi limbah industri, serta mencari mitigasi ekologi hijau.",
        "Murid merancang prototipe produk kearifan lokal berbasis ilmu teknik dasar yang ramah lingkungan dan ekonomis tinggi."
      ]
    },
    "11": {
      "Bahasa Indonesia": [
        "Murid mampu menulis manual perawatan mesin, merumuskan proposal start-up digital, serta menulis laporan kemajuan proyek berstadium tinggi.",
        "Murid mampu menganalisis artikel riset rekatasi industri kejuruan, menyusun ringkasan tinjauan jurnalistik pasar dagang.",
        "Murid lancar melakukan presentasi bisnis (pitching) proposal produk kreatif di hadapan dewan modal ventura / investor komersial."
      ],
      "Matematika": [
        "Murid menerapkan fungsi komposisi invers serta matriks transformasi geometri linear dalam pembuatan grafik koordinat CAD grafis digital.",
        "Murid menganalisis persamaan lingkaran koordinat CNC pelat baja potong berakurasi milimeter presisi pabrikasi manufaktur."
      ],
      "Projek Kreatif dan Kewirausahaan (PKK)": [
        "Murid mendesain perencanaan usaha, melakukan riset pasar target pembeli, membuat rencana anggaran biaya (RAB) modal produk barang/jasa.",
        "Murid membuat prototipe sediaan barang/jasa, melakukan uji kelayakan fisik fungsi produk, serta menyusun materi promosi penjualan digital."
      ]
    },
    "12": {
      "Bahasa Indonesia": [
        "Murid mengevaluasi kelayakan dokumen Standard Operating Procedure (SOP) industri, merangkum regulasi undang-undang ketenagakerjaan daerah.",
        "Murid menyusun portofolio karir komprehensif, surat lamaran magang multinasional, serta rancangan kontrak kerja sama formal niaga.",
        "Murid mampu menyajikan esai refleksi pengalaman selama melakoni Praktik Kerja Lapangan (PKL) secara analitis profesional."
      ],
      "Matematika": [
        "Murid menerapkan statistika industri (analisis kualitas kontrol Six Sigma, diagram Pareto defect, mean simpangan baku kerusakan produk).",
        "Murid menganalisis hitungan probabilitas kelaikan mesin industri lolos verifikasi standar keamanan ISO."
      ],
      "Praktik Kerja Lapangan (PKL)": [
        "Murid memahami aturan sop keselamatan kerja industri (K3), bersosialisasi secara profesional lintas departemen di perusahaan magang.",
        "Murid mempraktikkan keterampilan kejuruan khusus berstandar industri secara langsung dengan penyelia ahli penanggung jawab magang."
      ]
    }
  }
};

/**
 * Database CP dinamis dari Google Spreadsheet. Diinisialisasi dari localStorage jika ada cache.
 */
let cachedSheetDb: any = null;
try {
  // Hanya berjalan di lingkungan browser
  if (typeof window !== 'undefined') {
    const jsonStr = localStorage.getItem('cp_sheet_cache');
    if (jsonStr) {
      cachedSheetDb = JSON.parse(jsonStr);
    }
  }
} catch (e) {
  console.error("Gagal membaca cp_sheet_cache:", e);
}

export const SHEET_CP_DATABASE: Record<string, Record<string, Record<string, string[]>>> = cachedSheetDb || {};

function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findNormalizedKey(obj: Record<string, any>, targetKey: string): any {
  if (!obj || !targetKey) return null;
  const normTarget = normalizeKey(targetKey);
  
  // 1. Pencocokan persis (tidak sensitif terhadap spasi)
  const exactMatchKey = Object.keys(obj).find(k => normalizeKey(k) === normTarget);
  if (exactMatchKey) return obj[exactMatchKey];
  
  // 2. Pencocokan kemiripan parsial (target mengandung kunci atau sebaliknya)
  const partialMatchKey = Object.keys(obj).find(k => {
    const normK = normalizeKey(k);
    return normK.includes(normTarget) || normTarget.includes(normK);
  });
  if (partialMatchKey) return obj[partialMatchKey];
  
  return null;
}

/**
 * Mendapatkan daftar CP berdasarkan level, grade, dan subject.
 * Jika tidak ditemukan data khusus pelaku, akan dikembalikan template CP generik.
 */
export function getCPList(level: 'SD' | 'SMP' | 'SMA' | 'SMK', grade: string, subject: string): string[] {
  const normalizedLevel = level || 'SD';

  // 1. Prioritas Utama: Ambil dari database dinamis Google Spreadsheet
  const sheetLevelData = SHEET_CP_DATABASE[normalizedLevel];
  if (sheetLevelData) {
    const gradeKey = grade.trim();
    const gradeData = sheetLevelData[gradeKey] || findNormalizedKey(sheetLevelData, gradeKey);
    if (gradeData) {
      const subjectKey = subject.trim();
      const subjectCps = gradeData[subjectKey] || findNormalizedKey(gradeData, subjectKey);
      if (subjectCps && subjectCps.length > 0) {
        return subjectCps;
      }
    }
  }

  // 2. Fallback Kedua: Ambil dari database statis bawaan aplikasi
  const levelData = CP_DATABASE[normalizedLevel];
  if (levelData) {
    const gradeData = levelData[grade];
    if (gradeData) {
      const subjectCps = gradeData[subject];
      if (subjectCps && subjectCps.length > 0) {
        return subjectCps;
      }
    }
  }

  // 3. Fallback Ketiga: Jika benar-benar kosong, buatkan alternatif CP generik berkualitas berdasarkan regulasi BSKAP 046/H/KR/2025
  const phaseLabel = level === 'SD' 
    ? (['1','2'].includes(grade) ? 'Fase A' : (['3','4'].includes(grade) ? 'Fase B' : 'Fase C'))
    : (level === 'SMP' ? 'Fase D' : (grade === '10' ? 'Fase E' : 'Fase F'));

  return [
    `Murid mampu memahami konsep utama pembelajaran ${subject} pada jenjang ${level} ${phaseLabel} (Kelas ${grade}) secara komprehensif, kritis, serta mampu merefleksikan penerapannya dalam kehidupan nyata.`,
    `Murid menganalisis, mengulas, serta mendesain projek penyelesaian permasalahan kontekstual mata pelajaran ${subject} ${phaseLabel} sesuai kapasitas perkembangan kognitif usia murid Kelas ${grade}.`,
    `Murid menunjukkan penguasaan kompetensi dasar teori pelajaran ${subject} ${phaseLabel} dan mengembangkan kolaborasi bernalar kritis sesuai Profil Pelajar Pancasila.`
  ];
}

