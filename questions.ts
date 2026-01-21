
import { Question } from './types';

export const DEFAULT_EXAM_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Seorang teknisi bengkel UPJA mencatat data jam operasional traktor di sel C5. Ketika rumus disalin ke bawah, alamat C5 berubah menjadi C6, C7, dan seterusnya. Namun, jika ditulis sebagai $C$5, alamat tersebut tidak akan berubah meskipun rumus disalin. Konsep ini dalam Excel disebut...",
    options: [
      { key: 'A', text: "Alamat Relatif dan Alamat Absolut" },
      { key: 'B', text: "Format Cell dan Data Validation" },
      { key: 'C', text: "Cell Reference dan Range Name" },
      { key: 'D', text: "Formula Bar dan Name Box" },
      { key: 'E', text: "Worksheet dan Workbook" }
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    text: "Seorang operator penggilingan padi ingin menghitung total berat gabah kering dari 50 karung yang datanya tersimpan di sel B2 sampai B51. Rumus yang paling tepat digunakan adalah...",
    options: [
      { key: 'A', text: "=TOTAL(B2:B51)" },
      { key: 'B', text: "=SUM(B2:B51)" },
      { key: 'C', text: "=ADD(B2:B51)" },
      { key: 'D', text: "=SUMIF(B2:B51)" },
      { key: 'E', text: "=COUNT(B2:B51)" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 3,
    text: "Data produktivitas lahan jagung (dalam ton/ha) selama 6 bulan tercatat sebagai berikut: 7.2; 8.1; 7.5; 8.3; 7.8; 8.0. Jika menggunakan fungsi =AVERAGE(A1:A6), hasil yang diperoleh adalah...",
    options: [
      { key: 'A', text: "7.65 ton/ha" },
      { key: 'B', text: "7.82 ton/ha" },
      { key: 'C', text: "7.90 ton/ha" },
      { key: 'D', text: "8.00 ton/ha" },
      { key: 'E', text: "8.15 ton/ha" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 4,
    text: "Seorang supervisor bengkel memiliki data konsumsi solar 8 unit traktor. Untuk mengetahui unit traktor mana yang paling boros, fungsi Excel yang tepat adalah...",
    options: [
      { key: 'A', text: "=MIN(range_data)" },
      { key: 'B', text: "=MAX(range_data)" },
      { key: 'C', text: "=AVERAGE(range_data)" },
      { key: 'D', text: "=SUM(range_data)" },
      { key: 'E', text: "=COUNT(range_data)" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 5,
    text: "Seorang analis data ingin menghitung berapa banyak petani yang telah melaporkan data hasil panen (sel berisi angka) dari daftar di kolom D2:D50. Fungsi yang paling sesuai adalah...",
    options: [
      { key: 'A', text: "=SUM(D2:D50)" },
      { key: 'B', text: "=AVERAGE(D2:D50)" },
      { key: 'C', text: "=COUNT(D2:D50)" },
      { key: 'D', text: "=COUNTA(D2:D50)" },
      { key: 'E', text: "=MAX(D2:D50)" }
    ],
    correctAnswer: 'C'
  },
  {
    id: 6,
    text: "Sebuah koperasi unit desa (KUD) memberikan bonus kepada petani jika hasil panen padi mereka >= 5 ton. Jika hasil panen tercatat di sel E5, rumus yang tepat adalah...",
    options: [
      { key: 'A', text: "=IF(E5>=5;\"Dapat Bonus\";\"Tidak Dapat\")" },
      { key: 'B', text: "=IF(E5>5;\"Dapat Bonus\";\"Tidak Dapat\")" },
      { key: 'C', text: "=SUM(E5>=5;\"Dapat Bonus\";\"Tidak Dapat\")" },
      { key: 'D', text: "=VLOOKUP(E5>=5;\"Dapat Bonus\";\"Tidak Dapat\")" },
      { key: 'E', text: "=COUNT(E5>=5;\"Dapat Bonus\";\"Tidak Dapat\")" }
    ],
    correctAnswer: 'A'
  },
  {
    id: 7,
    text: "Kriteria mutu gabah: Kadar air <=14% = \"Grade A\", 14% < Kadar air <=16% = \"Grade B\", Kadar air >16% = \"Grade C\". Jika kadar air di F3, rumus IF bertingkat yang benar adalah...",
    options: [
      { key: 'A', text: "=IF(F3<=14;\"Grade A\";IF(F3<=16;\"Grade B\";\"Grade C\"))" },
      { key: 'B', text: "=IF(F3<14;\"Grade A\";IF(F3<16;\"Grade B\";\"Grade C\"))" },
      { key: 'C', text: "=IF(F3>=14;\"Grade A\";IF(F3>=16;\"Grade B\";\"Grade C\"))" },
      { key: 'D', text: "=IF(F3=14;\"Grade A\";IF(F3=16;\"Grade B\";\"Grade C\"))" },
      { key: 'E', text: "=IF(F3>14;\"Grade B\";IF(F3>16;\"Grade C\";\"Grade A\"))" }
    ],
    correctAnswer: 'A'
  },
  {
    id: 8,
    text: "Klasifikasi HMU: >=2000 \"Overhaul Total\", 1000-1999 \"Servis Berat\", 500-999 \"Servis Ringan\", <500 \"Operasional Normal\". Data di G4. Rumus nested IF yang BENAR adalah...",
    options: [
      { key: 'A', text: "=IF(G4<500;\"Normal\";IF(G4<1000;\"Ringan\";IF(G4<2000;\"Berat\";\"Overhaul\")))" },
      { key: 'B', text: "=IF(G4>=2000;\"Overhaul Total\";IF(G4>=1000;\"Servis Berat\";IF(G4>=500;\"Servis Ringan\";\"Operasional Normal\")))" },
      { key: 'C', text: "=IF(G4<=500;\"Normal\";IF(G4<=1000;\"Ringan\";IF(G4<=2000;\"Berat\";\"Overhaul\")))" },
      { key: 'D', text: "=IF(G4>500;\"Ringan\";IF(G4>1000;\"Berat\";IF(G4>2000;\"Overhaul\";\"Normal\")))" },
      { key: 'E', text: "=IF(G4=2000;\"Overhaul\";IF(G4=1000;\"Berat\";IF(G4=500;\"Ringan\";\"Normal\")))" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 9,
    text: "Operator layak bonus JIKA produktivitas >=5 ton/jam DAN kehilangan hasil <=3%. Produktivitas di H5, kehilangan di I5. Rumus yang tepat adalah...",
    options: [
      { key: 'A', text: "=IF(AND(H5>=5;I5<=3);\"Dapat Bonus\";\"Tidak Dapat\")" },
      { key: 'B', text: "=IF(OR(H5>=5;I5<=3);\"Dapat Bonus\";\"Tidak Dapat\")" },
      { key: 'C', text: "=IF(H5>=5;I5<=3;\"Dapat Bonus\";\"Tidak Dapat\")" },
      { key: 'D', text: "=AND(IF(H5>=5;I5<=3;\"Dapat Bonus\";\"Tidak Dapat\"))" },
      { key: 'E', text: "=IF(AND(H5>5;I5<3);\"Dapat Bonus\";\"Tidak Dapat\")" }
    ],
    correctAnswer: 'A'
  },
  {
    id: 10,
    text: "Unit mesin \"URGENT\" servis jika kondisi oli = \"Hitam\" ATAU jam operasi melebihi 250 jam. Oli di J3, jam di K3. Rumus logika yang benar adalah...",
    options: [
      { key: 'A', text: "=IF(AND(J3=\"Hitam\";K3>250);\"URGENT\";\"Normal\")" },
      { key: 'B', text: "=IF(OR(J3=\"Hitam\";K3>250);\"URGENT\";\"Normal\")" },
      { key: 'C', text: "=IF(J3=\"Hitam\";K3>250;\"URGENT\";\"Normal\")" },
      { key: 'D', text: "=OR(IF(J3=\"Hitam\";K3>250;\"URGENT\";\"Normal\"))" },
      { key: 'E', text: "=IF(AND(J3<>\"Hitam\";K3<=250);\"URGENT\";\"Normal\")" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 11,
    text: "Subsidi pupuk: (Luas lahan >=2 ha DAN Status = \"Anggota Aktif\") ATAU Total Transaksi >= Rp 10.000.000. Lahan di L4, Status di M4, Transaksi di N4. Fungsi logika yang tepat adalah...",
    options: [
      { key: 'A', text: "=IF(OR(AND(L4>=2;M4=\"Anggota Aktif\"); N4>=10000000);\"Dapat Subsidi\";\"Tidak Dapat\")" },
      { key: 'B', text: "=IF(AND(OR(L4>=2;M4=\"Anggota Aktif\");N4>=10000000);\"Dapat Subsidi\";\"Tidak Dapat\")" },
      { key: 'C', text: "=IF(AND(L4>=2;M4=\"Anggota Aktif\";N4>=10000000);\"Dapat Subsidi\";\"Tidak Dapat\")" },
      { key: 'D', text: "=IF(OR(L4>=2;M4=\"Anggota Aktif\";N4>=10000000);\"Dapat Subsidi\";\"Tidak Dapat\")" },
      { key: 'E', text: "=IF(L4>=2;AND(M4=\"Anggota Aktif\";N4>=10000000);\"Dapat Subsidi\";\"Tidak Dapat\")" }
    ],
    correctAnswer: 'A'
  },
  {
    id: 12,
    text: "Parameter col_index_num dalam fungsi VLOOKUP berfungsi untuk...",
    options: [
      { key: 'A', text: "Menentukan nilai yang akan dicari dalam tabel" },
      { key: 'B', text: "Menentukan lokasi tabel referensi yang digunakan" },
      { key: 'C', text: "Menentukan nomor kolom dari tabel yang datanya akan diambil" },
      { key: 'D', text: "Menentukan apakah pencarian harus persis atau tidak" },
      { key: 'E', text: "Menentukan jumlah baris data dalam tabel referensi" }
    ],
    correctAnswer: 'C'
  },
  {
    id: 13,
    text: "Sheet Master sel A1:C50 (Kode, Nama, Harga). Di Sheet Transaksi, ambil harga berdasarkan kode di B5. Rumus VLOOKUP yang benar agar tabel referensi tidak bergeser adalah...",
    options: [
      { key: 'A', text: "=VLOOKUP(B5;Master!A1:C50;3;FALSE)" },
      { key: 'B', text: "=VLOOKUP(B5;Master!$A$1:$C$50;3;FALSE)" },
      { key: 'C', text: "=VLOOKUP($B$5;Master!A1:C50;3;FALSE)" },
      { key: 'D', text: "=VLOOKUP(B5;Master!A:C;3;FALSE)" },
      { key: 'E', text: "=VLOOKUP(B5;Master!$A:$C;3;0)" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 14,
    text: "Error #N/A muncul pada VLOOKUP padahal kode ada di tabel. Setelah dicek ada spasi ekstra. Penyebab error #N/A yang paling tepat adalah...",
    options: [
      { key: 'A', text: "Tabel referensi tidak diurutkan secara ascending" },
      { key: 'B', text: "Kode unit yang dicari tidak identik persis (perbedaan karakter/spasi)" },
      { key: 'C', text: "Penulisan sintaks VLOOKUP salah" },
      { key: 'D', text: "Col_index_num melebihi jumlah kolom tabel" },
      { key: 'E', text: "Range_lookup harus diisi TRUE bukan FALSE" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 15,
    text: "Untuk mengatasi error #N/A agar menampilkan \"Data Tidak Ditemukan\", rumus yang paling efisien adalah...",
    options: [
      { key: 'A', text: "=IF(VLOOKUP(...)=#N/A;\"Tidak Ditemukan\";VLOOKUP(...))" },
      { key: 'B', text: "=IFERROR(VLOOKUP(...);\"Data Tidak Ditemukan\")" },
      { key: 'C', text: "=ERROR(VLOOKUP(...);\"Data Tidak Ditemukan\")" },
      { key: 'D', text: "=VLOOKUP(IFERROR(...);\"Data Tidak Ditemukan\")" },
      { key: 'E', text: "=IF(ISERROR(VLOOKUP(...));\"Data Tidak Ditemukan\";VLOOKUP(...))" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 16,
    text: "Menampilkan perbandingan hasil panen jagung dari 5 blok lahan berbeda dalam satu musim. Jenis grafik yang paling sesuai adalah...",
    options: [
      { key: 'A', text: "Line Chart (Grafik Garis)" },
      { key: 'B', text: "Column Chart (Grafik Batang)" },
      { key: 'C', text: "Pie Chart (Grafik Lingkaran)" },
      { key: 'D', text: "Scatter Plot (Grafik Sebar)" },
      { key: 'E', text: "Area Chart (Grafik Area)" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 17,
    text: "Kasus A: Tren penurunan produktivitas Jan-Jun. Kasus B: Perbandingan total produksi 6 jenis tanaman. Jenis grafik yang tepat adalah...",
    options: [
      { key: 'A', text: "Kasus A = Pie Chart; Kasus B = Line Chart" },
      { key: 'B', text: "Kasus A = Line Chart; Kasus B = Column Chart" },
      { key: 'C', text: "Kasus A = Column Chart; Kasus B = Line Chart" },
      { key: 'D', text: "Kasus A = Bar Chart; Kasus B = Pie Chart" },
      { key: 'E', text: "Kasus A = Scatter Plot; Kasus B = Area Chart" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 18,
    text: "Mengomunikasikan proporsi (persentase) kategori cacat kopi (Biji Utuh 70%, Pecah 20%, Hitam 7%, Kotoran 3%). Grafik yang paling efektif adalah...",
    options: [
      { key: 'A', text: "Column Chart, karena dapat menampilkan nilai absolut" },
      { key: 'B', text: "Line Chart, karena dapat menunjukkan tren" },
      { key: 'C', text: "Pie Chart, karena menunjukkan proporsi dari total" },
      { key: 'D', text: "Bar Chart, memudahkan perbandingan horizontal" },
      { key: 'E', text: "Scatter Plot, menunjukkan hubungan antar variabel" }
    ],
    correctAnswer: 'C'
  },
  {
    id: 19,
    text: "Elemen penting yang WAJIB ada dalam grafik laporan profesional adalah...",
    options: [
      { key: 'A', text: "Chart Title, Data Labels, Gridlines, Legend" },
      { key: 'B', text: "Chart Title, Axis Title, Legend, Data Labels" },
      { key: 'C', text: "Gridlines, Trendline, Data Table, Legend" },
      { key: 'D', text: "Axis Title, Chart Area Color, 3D Effect" },
      { key: 'E', text: "Data Labels, Background Image, Border" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 20,
    text: "Tren konsumsi pupuk urea (Jan-Des) menurun dari 250 ke 175 kg/ha. Interpretasi yang PALING TEPAT adalah...",
    options: [
      { key: 'A', text: "Konsumsi pupuk urea stabil sepanjang tahun" },
      { key: 'B', text: "Konsumsi pupuk urea mengalami kenaikan signifikan" },
      { key: 'C', text: "Konsumsi pupuk urea menurun konsisten" },
      { key: 'D', text: "Tidak ada pola yang jelas" },
      { key: 'E', text: "Konsumsi pupuk urea meningkat drastis" }
    ],
    correctAnswer: 'C'
  },
  {
    id: 21,
    text: "Macro dalam Microsoft Excel dapat didefinisikan sebagai...",
    options: [
      { key: 'A', text: "Perintah VBA yang ditulis manual" },
      { key: 'B', text: "Rekaman otomatis serangkaian tindakan pengguna untuk otomasi" },
      { key: 'C', text: "Template dokumen yang digunakan berulang kali" },
      { key: 'D', text: "Fungsi built-in untuk analisis statistik" },
      { key: 'E', text: "Add-in eksternal dari Microsoft Store" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 22,
    text: "Langkah-langkah yang benar untuk mulai merekam macro pemformatan tabel adalah...",
    options: [
      { key: 'A', text: "File -> Options -> Customize Ribbon -> Centang Developer -> Record Macro" },
      { key: 'B', text: "Tab Developer -> Record Macro -> Nama Macro -> OK -> Mulai aksi" },
      { key: 'C', text: "Tab Review -> Record Macro -> Mulai aksi -> Stop Recording" },
      { key: 'D', text: "Tab View -> Macros -> Record -> Shortcut key -> Mulai aksi" },
      { key: 'E', text: "Tab Insert -> Macro -> Create New -> Ketik kode" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 23,
    text: "Cara yang benar untuk menjalankan macro yang sudah direkam bernama \"FormatLaporan\" adalah...",
    options: [
      { key: 'A', text: "Tab Home -> Run Macro -> Pilih -> Execute" },
      { key: 'B', text: "Tab Developer -> Macros -> Pilih \"FormatLaporan\" -> Run" },
      { key: 'C', text: "Tab Insert -> Execute Macro -> Pilih" },
      { key: 'D', text: "Tab Data -> Macro Tools -> Select -> Start" },
      { key: 'E', text: "Tekan Ctrl+M lalu ketik nama macro" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 24,
    text: "Agar macro tidak hilang saat file dibuka kembali, format file Excel yang harus digunakan adalah...",
    options: [
      { key: 'A', text: ".xlsx (Excel Workbook)" },
      { key: 'B', text: ".xlsm (Excel Macro-Enabled Workbook)" },
      { key: 'C', text: ".xls (Excel 97-2003 Workbook)" },
      { key: 'D', text: ".csv (Comma Separated Values)" },
      { key: 'E', text: ".pdf (Portable Document Format)" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 25,
    text: "Langkah paling efisien untuk mengurutkan data hasil panen dari tertinggi ke terendah adalah...",
    options: [
      { key: 'A', text: "Home -> Sort & Filter -> Custom Sort -> Largest to Smallest -> OK" },
      { key: 'B', text: "Data -> Sort -> Pilih kolom -> Order: Largest to Smallest -> OK" },
      { key: 'C', text: "Review -> Sort Descending -> Apply" },
      { key: 'D', text: "Insert -> Sort Tool -> Descending Order" },
      { key: 'E', text: "Klik kanan header kolom -> Sort Z to A" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 26,
    text: "Keuntungan utama menggunakan fitur \"Format as Table\" adalah...",
    options: [
      { key: 'A', text: "Tampilan lebih berwarna secara visual" },
      { key: 'B', text: "Filter otomatis, formula terstruktur, dan auto-expand data" },
      { key: 'C', text: "Ukuran file menjadi lebih kecil" },
      { key: 'D', text: "Dapat dicetak dalam resolusi tinggi" },
      { key: 'E', text: "Data terlindungi dan tidak bisa diedit" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 27,
    text: "Rumus =AVERAGE(B2:B20) menghasilkan #DIV/0! karena ada sel berisi \"#N/A\". Solusi yang tepat adalah...",
    options: [
      { key: 'A', text: "Ganti dengan =AVG(B2:B20)" },
      { key: 'B', text: "Gunakan AVERAGEIF atau bersihkan data error terlebih dahulu" },
      { key: 'C', text: "Kurangi range menjadi B2:B10" },
      { key: 'D', text: "Harus menggunakan SUM dibagi COUNT" },
      { key: 'E', text: "Semua data konversi ke format number" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 28,
    text: "Rumus =IF(M5>=1000;\"Servis Berat\";IF(M5>=500;\"Servis Ringan\";\"Normal\")). Nilai 1200 jam justru muncul \"Servis Ringan\". Analisis kesalahan yang tepat adalah...",
    options: [
      { key: 'A', text: "Urutan kondisi IF salah, harus terkecil dulu" },
      { key: 'B', text: "Urutan sudah benar tapi perlu AND" },
      { key: 'C', text: "Data M5 kemungkinan teks bukan angka" },
      { key: 'D', text: "Harus nested 4 tingkat" },
      { key: 'E', text: "Data M5 terformat sebagai text" }
    ],
    correctAnswer: 'C'
  },
  {
    id: 29,
    text: "VLOOKUP(E5; $A$1:$C$50; 3; FALSE). Tabel: A=Nama, B=Kode, C=Harga. Cari harga berdasarkan kode (E5). Hasil error #N/A. Penyebabnya adalah...",
    options: [
      { key: 'A', text: "Tabel tidak diurutkan ascending" },
      { key: 'B', text: "Kolom pencarian (Kode) bukan kolom paling kiri" },
      { key: 'C', text: "Col_index_num salah (angka 3)" },
      { key: 'D', text: "Range_lookup harus TRUE" },
      { key: 'E', text: "Format data E5 berbeda" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 30,
    text: "Prinsip desain dashboard yang PALING TEPAT untuk direksi adalah...",
    options: [
      { key: 'A', text: "Gunakan sebanyak mungkin warna berbeda" },
      { key: 'B', text: "Letakkan semua grafik secara vertikal" },
      { key: 'C', text: "Letakkan KPI utama di atas kiri/tengah, grafik analisis di tengah, tabel di bawah" },
      { key: 'D', text: "Gunakan efek 3D pada semua grafik" },
      { key: 'E', text: "Isi seluruh halaman tanpa ruang kosong" }
    ],
    correctAnswer: 'C'
  }
];
