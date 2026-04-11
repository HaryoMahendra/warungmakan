export const WA_NUMBER = "6281234567890";
export const waLink = (pesan = "") =>
  `https://wa.me/${WA_NUMBER}${pesan ? `?text=${encodeURIComponent(pesan)}` : ""}`;

export const menuUtama = [
  {
    id: 1,
    nama: "Soto Ayam Khas Pacitan",
    deskripsi: "Kuah bening gurih dengan ayam kampung pilihan, tauge segar, telur, dan perpaduan rempah khas Pacitan.",
    deskripsiLengkap: "Soto Ayam khas Pacitan hadir dengan kuah bening yang jernih namun kaya rasa. Menggunakan ayam kampung pilihan yang dimasak perlahan bersama rempah asli Pacitan — serai, daun jeruk, lengkuas, dan kunyit — menghasilkan kaldu yang gurih alami. Disajikan dengan tauge segar, telur rebus, soun, daun bawang, dan bawang goreng renyah.",
    harga: "Rp 10.000",
    img: "/assets/menu/sotoayam.jpeg",
    andalan: true, rating: "5.0", porsi: "1 Porsi", kategori: "Makanan Utama",
  },
  {
    id: 2,
    nama: "Rawon Daging",
    deskripsi: "Kuah hitam pekat dari kluwek pilihan, daging sapi empuk, tauge, telur asin, dan sambal rempah Jawa Timur.",
    deskripsiLengkap: "Rawon daging sapi yang dimasak dengan bumbu kluwek asli pilihan, menghasilkan kuah hitam pekat yang kaya rasa dan aroma. Daging sapi dimasak hingga empuk dan menyerap bumbu sempurna. Disajikan dengan tauge pendek, telur asin, sambal rawit, kerupuk udang, dan nasi putih pulen.",
    harga: "Rp 12.000",
    img: "/assets/menu/rawondaging.jpg",
    andalan: true, rating: "5.0", porsi: "1 Porsi", kategori: "Makanan Utama",
  },
];

export const pelengkap = [
  { nama: "Perkedel", harga: "Rp 2.000", img: "/assets/menu/perkedel.jpeg", deskripsiLengkap: "Perkedel kentang goreng renyah di luar, lembut di dalam, dibumbui daun bawang dan merica.", kategori: "Lauk", rating: "4.9" },
  { nama: "Telur Asin", harga: "Rp 3.000", img: "/assets/menu/telorasin.jpg", deskripsiLengkap: "Telur bebek asin pilihan dengan kuning telur berminyak dan berpasir, gurih dan nikmat.", kategori: "Lauk", rating: "4.8" },
  { nama: "Tempe Goreng", harga: "Rp 2.000", img: "/assets/menu/tempegoreng.jpg", deskripsiLengkap: "Tempe segar yang digoreng crispy dengan bumbu kunyit dan ketumbar, gurih dan renyah.", kategori: "Lauk", rating: "4.9" },
  { nama: "Kerupuk", harga: "Rp 2.000", img: "/assets/menu/kerupuk.jpg", deskripsiLengkap: "Kerupuk udang dan kerupuk putih renyah, pelengkap wajib setiap mangkuk.", kategori: "Lauk", rating: "4.7" },
  { nama: "Keripik Usus", harga: "Rp 2.000", img: "/assets/menu/keripikusus.jpg", deskripsiLengkap: "Usus ayam yang digoreng hingga super kering dan renyah, cocok sebagai camilan atau lauk.", kategori: "Lauk", rating: "4.9" },
  { nama: "Kacang Goreng", harga: "Rp 2.000", img: "/assets/menu/kacanggoreng.jpg", deskripsiLengkap: "Kacang tanah goreng dengan sedikit garam, renyah dan gurih sebagai pelengkap sempurna.", kategori: "Lauk", rating: "4.8" },
  { nama: "Es Teh Manis", harga: "Rp 3.000", img: "/assets/menu/esteh.jpg", deskripsiLengkap: "Teh manis segar seduh langsung dengan es batu, menyegarkan menemani santap siang.", kategori: "Minuman", rating: "4.9" },
  { nama: "Es Jeruk Peras", harga: "Rp 3.000", img: "/assets/menu/esjerukperas.jpg", deskripsiLengkap: "Jeruk peras segar dicampur sirup gula dan es batu, asam manis menyegarkan.", kategori: "Minuman", rating: "4.9" },
];

export const filterChips = ["Semua", "Makanan", "Lauk", "Minuman"];

export const filterMap = {
  Semua: null,
  Makanan: ["Soto Ayam Khas Pacitan", "Rawon Daging"],
  Lauk: ["Perkedel", "Telur Asin", "Tempe Goreng", "Kerupuk", "Keripik Usus", "Kacang Goreng"],
  Minuman: ["Es Teh Manis", "Es Jeruk Peras"],
};

export const navLabels = {
  home: "Beranda",
  tentang: "Tentang",
  menu: "Menu",
  kontak: "Kontak",
};