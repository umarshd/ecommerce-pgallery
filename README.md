# ecommerce-pgallery

Ecommerce-pgallery adalah aplikasi e-commerce berbasis **Next.js** yang digunakan untuk menampilkan dan menambahkan produk ke keranjang belanja secara online.

## 🚀 Fitur

1. **Fetch and Display Products**:  
   Mengambil produk dari Fake Store API dan menampilkan gambar, judul, harga, dan rating.

2. **Product Filtering**:  
   Memfilter produk berdasarkan kategori (misalnya: elektronik, pakaian, dll.).

3. **Product Sorting**:  
   Mengurutkan produk berdasarkan harga (rendah-tinggi/tinggi-rendah) dan rating.

4. **Responsive Design**:  
   Tampilan grid di desktop dan bertumpuk di perangkat mobile.

5. **Product Details Modal**:  
   Menampilkan detail produk (deskripsi, gambar penuh, harga, rating) dalam modal.

6. **Add to Cart**:  
   Menambahkan produk ke keranjang dan menyimpan item di local storage.

7. **Lazy Loading**:  
   Mengoptimalkan performa dengan lazy loading untuk gambar produk.

## 📌 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js**
- **npm** atau **yarn**

## 🔧 Instalasi

1. Clone repository ini:
   ```sh
   git clone https://github.com/umarshd/ecommerce-pgallery.git
   cd ecommerce-pgallery
   ```
2. Instal dependensi:
   ```sh
   npm install
   # atau
   yarn install
   ```
3. Jalankan aplikasi dalam mode pengembangan:
   ```sh
   npm run dev
   # atau
   yarn dev
   ```
4. Buka di browser: **http://localhost:3000**

## 💡 Asumsi & Trade-offs

- Menggunakan **Axios** untuk melakukan permintaan HTTP ke **FakeStoreAPI** untuk manajemen produk tanpa backend custom.
- **Font Awesome** digunakan untuk menambahkan ikon-ikon pada UI.
- **Tailwind CSS** digunakan untuk styling dan desain responsif.
- **Optimasi gambar** menggunakan fitur Image dari Next.js.

**File:** `README.md`
