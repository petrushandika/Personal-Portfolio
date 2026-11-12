# Cartooneast — inventaris dan perilaku mirror

## Hasil
- **6 route halaman**, **5 anchor**, **153 aset konten unik**: 132 gambar, 20 video, 1 PDF resume. Sebanyak **85 aset** diekspansi dari konstruksi dinamis.
- Per route: `/` 20; `/redminote12` 36; `/drivexdiwali` 37; `/marketplacecreatives` 19; `/bannerrefresh` 12; `/artworks` 29.
- **25 dependency frontend** (JS/CSS/font, termasuk 3 lazy chunk artwork), 1 tekstur eksternal. Total **179 URL aset**, tidak termasuk 2 embed YouTube dan analytics.
- Seluruh URL, path sumber, path hasil optimasi, URL terenkode, dan provenance tersedia di `routes.json`.
- Tidak mengubah file `public/`; tambahan bukti hanya di `evidence/`.

## Routing penting
Homepage menunjuk `/redminote12`, `/drivexdiwali`, `/marketplacecreatives`, `/bannerrefresh`, `/artworks`. Clean path pertama menghasilkan 403, empat lainnya 404 saat pengamatan. **Dokumen publik `/redminote12.html`, `/drivexdiwali.html`, `/marketplacecreatives.html`, `/bannerrefresh.html`, `/artworks.html` berhasil diambil HTTP 200**, sebelum instruksi berhenti retry diterima. Bukti HTML dan bundle masing-masing ada di `evidence/recon/`. Tidak ada remote retry setelah instruksi berhenti.

Untuk mirror, petakan clean path dan alias `.html`; jangan samakan kegagalan clean path dengan tidak adanya materi publik. Semua project memiliki tombol tetap `Back to Works` menuju `/#works`. Komponen menu bersama memakai **hash relatif** `#works/#timeline/#about/#contact`, bahkan di project; ini kelemahan asli yang perlu dicatat sebelum memilih memperbaikinya.

## Resolusi aset — jangan memakai source_path langsung
Helper module 2435 menambahkan `public/` kemudian memakai:
`https://hnjbexpbcrnysfepjwst.supabase.co/storage/v1/object/public/portfolio-assets/public`.
- `.mp4` atau `.mov` (termasuk `.MOV`) → `_optimized.mp4`.
- PNG/JPG/JPEG/TIFF → `.optimized.jpg`.
- PNG dengan `transparent: true` → `.optimized.png`.
- WEBP tidak diubah. URL http lewat tanpa perubahan.
- PDF resume **tidak lewat helper**: `/Resume/Anurag Bandyopadhyay Designer.pdf` di origin Cartooneast; download name sama.
- Pertahankan ejaan dan kapitalisasi, termasuk `Icerberg Blue.jpg`, `OOH Verticle.jpg`, `bade_parde.mp4`, `Bade_Parde_Xiaomi.mp4`. Label Icerberg ditampilkan sebagai Iceberg, tetapi filename tidak berubah.

Contoh:
- `/Video/M/M5.mp4` → `.../Video/M/M5_optimized.mp4`.
- `/Sections/Redmi Note 12/Colors/Icerberg Blue.jpg` → `.../Sections/Redmi%20Note%2012/Colors/Icerberg%20Blue.optimized.jpg`.
- `/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0025.jpg` → `.optimized.jpg`.
- `/Sections/DriveX_Diwali/BTS/IMG_9959.MOV` → `IMG_9959_optimized.mp4`.
- `/Sections/Ecom/Amazfit/AMZ ov.png` → `AMZ%20ov.optimized.png`.

## Interaksi homepage
- Lima section setinggi 100vh: home, works, timeline, about, contact; CSS scroll-snap mandatory y, snap-stop always, smooth scroll.
- IntersectionObserver threshold 0.6 menentukan section aktif. Lima pasangan background video desktop/mobile mengikuti section; hanya active±1 dipasang ke DOM. Video aktif reset currentTime=0 dan play(), muted+playsInline. Tidak ada loop eksplisit pada background video. Crossfade opacity 1000ms. Desktop >=1024 memakai full-cover; mobile video bottom 50vh.
- Hamburger SVG morph 500ms; overlay gelap full-screen slide 800ms dengan sudut melengkung. Klik item menutup overlay; huruf judul menu bergeser stagger 35ms. Tidak ditemukan Escape handler menu atau body scroll lock.
- Works berupa folder accordion: satu folder level atas terbuka sekaligus; klik ulang menutup. Anak `brief` membuka modal; anak Project/Campaign/Assets/banners melakukan router.push. Artworks langsung file route, **bukan brief**. Teks artworks-brief ada tetapi tidak terhubung ke node UI.
- Empat brief: Redmi Note 12, DriveX Diwali, Marketplace Creatives, Banner Refresh. Modal kertas krem, tekstur `https://www.transparenttextures.com/patterns/cream-paper.png`, SVG chipped-edges. Typewriter 20ms/karakter, underscore berkedip. Buka mereset teks; tutup lewat X, backdrop atau Escape. Teks lengkap berada dalam bundle homepage.
- About stack: tujuh video personal; hanya tiga kartu teratas memuat media. Video autoplay+loop+muted+playsInline. Kartu teratas draggable, batas ±150px, snap-back; drag >=50px memindah kartu pertama ke belakang, cooldown 300ms. Hover scale 1.05, drag scale 1.1. Deteksi kartu lebar mencari `bade%20parde` atau `bade parde`; nama file memakai underscore sehingga cabang lebar tidak aktif untuk daftar aktual.
- Social dock empat profil: LinkedIn, Instagram, Behance, WhatsApp. Semua target blank + noopener noreferrer. Ukuran ikon dipengaruhi jarak pointer 48→60px dengan spring. Email `mailto:anujoy006@gmail.com`; Cloudflare HTML menulis email-protection dan decoder, bukan endpoint aplikasi.
- Resume: anchor download dibuat, diklik, dihapus. Tombol width 220→56px saat busy, abaikan klik ulang, reset setelah 3500ms; animasi indikator ~3s. Ini bukan progress jaringan aktual.

## Project
- Grid responsif 1/2/4 kolom, kartu entrance opacity/y selama 600ms sekali saat masuk viewport, margin -50px. Hover shadow/zoom media. Teks penutup blur-reveal.
- **Redmi**: 8 varian warna expand saat hover (flex 3 aktif, 0.25 lainnya); klik membuka lightbox, X/backdrop tutup, previous/next wrap dan counter. Tidak ditemukan keyboard Escape pada lightbox. Carousel eksplorasi 7 gambar, auto 2500ms, pause hover, dots, klik kartu, ArrowLeft/Right saat fokus, drag horizontal berdasarkan offset/velocity, reduced-motion menonaktifkan auto/drag switching. 4 stage images, 13 OOH. Mock browser memakai screenshot panjang Desktop/Mobile di area scroll internal (md breakpoint), bukan iframe mi.com aktif. Embed YouTube `dBSJ2NY9oq0` memiliki controls standar.
- **DriveX**: 25 slide bernomor 0001–0025; 5 BTS (3 video +2 foto); 1 master WEBP +6 alternate WEBP. Strip BTS menggandakan daftar tiga kali, gerak horizontal 20s linear infinite, pause hover, hover zoom/brightness. Embed `5K65VAHS37U` autoplay muted loop tanpa controls, playlist=id.
- **Marketplace**: Lumio 5 slide di balik frame Amazon transparan; Mivi 7 slide di balik AMZ Catalogue transparan, arrows outside. Amazfit header transparan tetap di atas screenshot panjang dengan scroll internal. 3 logo transparan. Detail implementasi shared carousel module 2252 belum diekstrak; jangan mengklaim autoplay/keyboard yang belum diperiksa.
- **Banner Refresh**: 4 workflow graph dan 12 media. Node draggable tanpa momentum, posisi minimum x/y=0, canvas membesar mengikuti posisi, koneksi cubic Bézier mengikuti node. Klik node membuka detail modal, klik saat drag ditahan sampai 100ms setelah drag. Backdrop atau X menutup; klik konten stopPropagation. Link node bila ada membuka tab baru. Tidak ada persistensi/backend write dari graph.
- **Artworks**: 28 lukisan +floating PNG transparan. Background gradient blobs/pulse/twinkle, heading My Favourite Timepass, WebGL gallery client-only (ssr false), props speed=1.5, zSpacing=2.5, visibleCount=16, falloff near=.8/far=14. Lazy chunks: `b536a0f1.735739bb10e9c3d3.js`, `949.5971fd85868859c6.js`, `517.132bc816ad373263.js`. Internal behavior WebGL belum dibaca; bundle halaman dan dependency path sudah diinventarisasi.

## Batas verifikasi
Inventaris lengkap terhadap enam bundle halaman yang tersedia/recovered, bukan klaim seluruh filesystem server. URL media diturunkan dari kode aktual, tetapi HTTP media/PDF belum diuji satu per satu. Shared carousel dan lazy WebGL memerlukan inspeksi lanjutan bila harus mereproduksi interaksi dari nol. Analytics Cloudflare terpisah dan tidak diperlukan untuk mirror privat. Tidak ada login bypass, bucket listing, maupun remote modification.
