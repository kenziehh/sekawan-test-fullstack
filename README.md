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


