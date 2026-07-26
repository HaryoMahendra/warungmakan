export const WA_NUMBER = "6281234567890";
export const waLink = (pesan = "") =>
  `https://wa.me/${WA_NUMBER}${pesan ? `?text=${encodeURIComponent(pesan)}` : ""}`;

export const menuUtama = [
  {
    id: 1,
    nama: "Soto Ayam Kampung Khas Pacitan",
    deskripsi: "Kuah bening dengan perpaduan ayam kampung dan bumbu khas Pacitan.",
    deskripsiLengkap: "Soto Ayam Kampung khas Pacitan hadir dengan kuah bening yang gurih yang menggunakan ayam kampung dan dimasak bersama bumbu asli Pacitan, daun jeruk, lengkuas, dan kunyit yang menghasilkan kaldu yang gurih alami. Disajikan dengan tauge segar, bihun, daun bawang, dan bawang goreng.",
    harga: "Rp 10.000",
    img: "/assets/menu/sotoayam.jpeg",
    andalan: true, rating: "5.0", porsi: "1 Porsi", kategori: "Makanan",
  },
  {
    id: 2,
    nama: "Rawon Daging",
    deskripsi: "Kuah hitam pekat dari kluwek, daging sapi empuk, tauge, telur asin, dan sambal yang segar.",
    deskripsiLengkap: "Rawon daging sapi yang dimasak dengan bumbu kluwek asli menghasilkan kuah hitam pekat yang kaya rasa dan aroma. Daging sapi dimasak hingga empuk dan menyerap bumbu sempurna lalu disajikan dengan tauge pendek, telur asin, sambal dan bawang goreng.",
    harga: "Rp 12.000",
    img: "/assets/menu/rawondaging.jpg",
    andalan: true, rating: "5.0", porsi: "1 Porsi", kategori: "Makanan",
  },
];

export const pelengkap = [
  { nama: "Menu Lainnya", harga: "Melayani Pemesanan Makanan", img: "/assets/menu/menulainnya.jpg", deskripsiLengkap: "Tersedia Makanan lain sesuai dengan permintaan pelanggan.", kategori: "Makanan", rating: "5.0", porsi: "Custom" },
  { nama: "Perkedel", harga: "Rp 2.000", img: "/assets/menu/perkedel.jpeg", deskripsiLengkap: "Berbahan kentang goreng renyah di luar, lembut di dalam, dibumbui daun bawang dan merica.", kategori: "Lauk", rating: "4.9" },
  { nama: "Telur Asin", harga: "Rp 3.000", img: "/assets/menu/telorasin.jpg", deskripsiLengkap: "Telur bebek asin terbaik dengan kuning telur yang gurih dan nikmat.", kategori: "Lauk", rating: "4.8" },
  { nama: "Tahu dan Tempe Goreng", harga: "Rp 2.000", img: "/assets/menu/gorengan.jpg", deskripsiLengkap: "Tahun dan Tempe goreng crispy dengan bumbu yang gurih dan renyah.", kategori: "Lauk", rating: "4.9" },
  { nama: "Kerupuk", harga: "Rp 2.000", img: "/assets/menu/kerupuk.jpg", deskripsiLengkap: "Aneka macam kerupuk ada kerupuk udang, kerupuk bandung, dan kerupuk kulit yang cocok sebagai lauk pelengkap makanan.", kategori: "Lauk", rating: "4.7" },
  { nama: "Keripik Usus", harga: "Rp 2.000", img: "/assets/menu/keripikusus.jpg", deskripsiLengkap: "Usus ayam yang digoreng sampai kering dan renyah, cocok sebagai camilan atau lauk.", kategori: "Lauk", rating: "4.9" },
  { nama: "Kacang Goreng", harga: "Rp 2.000", img: "/assets/menu/kacanggoreng.jpg", deskripsiLengkap: "Kacang goreng dengan sedikit garam, renyah dan gurih sebagai pelengkap sempurna.", kategori: "Lauk", rating: "4.8" },
  { nama: "Teh", harga: "Rp 3.000", img: "/assets/menu/esteh.jpg", deskripsiLengkap: "Terdapat pilihan es teh manis dan es teh tawar yang menyegarkan.", kategori: "Minuman", rating: "4.9" },
  { nama: "Jeruk Peras", harga: "Rp 3.000", img: "/assets/menu/esjerukperas.jpg", deskripsiLengkap: "Terdapat pilihan es jeruk manis dan es jeruk tawar yang menyegarkan.", kategori: "Minuman", rating: "4.9" },
];

export const filterChips = ["Semua", "Makanan", "Lauk", "Minuman"];

export const filterMap = {
  Semua: null,
  Makanan: ["Menu Lainnya"],
  Lauk: ["Perkedel", "Telur Asin", "Tempe Goreng", "Kerupuk", "Keripik Usus", "Kacang Goreng"],
  Minuman: ["Teh", "Jeruk Peras"],
};

export const navLabels = {
  home: "Beranda",
  tentang: "Tentang",
  menu: "Menu",
  kontak: "Kontak",
};