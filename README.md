# Sekawan Media Technical Test Fullstack

Ini adalah proyek fullstack yang dibangun menggunakan Laravel, Breeze, Inertia.js, React, TypeScript, dan Tailwind CSS. 

# Prasyarat

Pastikan Anda memiliki hal berikut sebelum memulai:

- [PHP 8.2+](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/download/)
- [Node.js](https://nodejs.org/) dan [npm](https://www.npmjs.com/get-npm) 
- [Database](https://www.mysql.com/) MySQL
- [Laravel](https://laravel.com/docs/11.x) untuk server back-end

# Langkah-langkah untuk Menjalankan Proyek

## 1. Kloning Repositori

### Klon repositori ke komputer Anda:

```bash
git clone https://github.com/kenziehh/sekawan-test-fullstack.git
cd sekawan-test-fullstack

```


## 2. Menyiapkan Backend (Laravel)
### Instal Dependensi Backend
Di dalam folder proyek, jalankan perintah berikut untuk menginstal dependensi PHP menggunakan Composer:

```bash
composer install
```

### Konfigurasi .env
Salin file .env.example menjadi .env dan sesuaikan dengan pengaturan lokal Anda, termasuk pengaturan database:
```bash
cp .env.example .env
```

### Generate Key Aplikasi
Generate aplikasi key untuk Laravel dengan menjalankan:
```bash
php artisan key:generate
```
### Migrasi Database dan Jalankan Seeder
Jalankan migrasi untuk membuat tabel yang diperlukan di database:

```bash
php artisan migrate --seed
```
## 3. Menyiapkan Frontend (React & Inertia.js)

### Instal Dependensi Frontend
```bash
npm install
```
### Menjalankan Development Server
Untuk menjalankan server pengembangan React, Inertia.js, dan Vite, gunakan perintah berikut:
```bash
npm run dev
```
Server React dan Vite akan berjalan pada http://localhost:5173
### 4. Menjalankan Server Laravel
Jalankan server Laravel dengan perintah:
```bash
php artisan serve
```
# Login Sebagai Admin dan Approver

#### Admin
- **Admin One**:  
  - Email: `admin1@gmail.com`  
  - Password: `admin123`  
  - Role: `admin`
  
- **Admin Two**:  
  - Email: `admin2@gmail.com`  
  - Password: `admin123`  
  - Role: `admin`

#### Approver
- **Approver 1**:  
  - Email: `approver1@gmail.com`  
  - Password: `approver123`  
  - Role: `approver`
  
- **Approver 2**:  
  - Email: `approver2@gmail.com`  
  - Password: `approver123`  
  - Role: `approver`

- **Approver 3**:  
  - Email: `approver3@gmail.com`  
  - Password: `approver123`  
  - Role: `approver`

- **Approver 4**:  
  - Email: `approver4@gmail.com`  
  - Password: `approver123`  
  - Role: `approver`

- **Approver 5**:  
  - Email: `approver5@gmail.com`  
  - Password: `approver123`  
  - Role: `approver`

# Screenshoots

## Login

![image](https://github.com/user-attachments/assets/4d0a609e-7204-4914-8804-60a7d5afc607)

## Dashboard Admin Main

![image](https://github.com/user-attachments/assets/e4f9106a-a5a8-4e19-a038-85c5879fdaab)
![image](https://github.com/user-attachments/assets/b5c6a7c1-a04a-4019-96a4-162e9665a7a8)

## Dashboard Admin List Permintaan Kendaraan

![image](https://github.com/user-attachments/assets/974d5b73-0663-45ee-87cb-bed5be131102)

## Dashboard Admin Form Permintaan Kendaraan
![image](https://github.com/user-attachments/assets/5c376ad5-de91-478c-b889-02a5fc2fa3bd)

## Dashboard Admin Daftar Kendaraan

![image](https://github.com/user-attachments/assets/3d59a9e6-f6da-42bf-ba81-56815f619584)

## Dashboard Admin Daftar Pengemudi

![image](https://github.com/user-attachments/assets/853980e0-0f74-4f41-987f-2bc8aa0f9af8)

## Dashboard Admin Laporan dan Export Excel

![image](https://github.com/user-attachments/assets/9ee4711d-2171-4972-8e76-486f742b75c0)

## Dashboard Admin Log Aktivitas

![image](https://github.com/user-attachments/assets/0274ec9b-7aee-4ce7-b57a-0d33b4a0ec10)

## Dashboard Approver List Permintaan Persetujuan

![image](https://github.com/user-attachments/assets/d78592a6-aea0-4094-8670-d8bd077d358a)

## Dashboard Approver List Permintaan Yang Ditolak

![image](https://github.com/user-attachments/assets/e23d53b5-8d05-46a1-b79f-f20f790d21bb)

## Dashboard Approver List Permintaan Yang Sudah Selesai

![image](https://github.com/user-attachments/assets/43467227-604b-4cb8-9e8d-b002dff59aa8)










