# 📦 SIPMBG APP
Dashboard untuk sistem informasi presensi makan bergizi gratis

## ✨ Features  
- API
    - Authentication
    - Home
    - School (Create, Read, Update, Delete)
    - Student (Create, Read, Update, Delete)
    - Attendance (Create, Read, Update, Delete)

## ⚙️ Installation & 🚀 Usage 
##### Clone Project
```
git clone https://github.com/ASNProject/sipmbg-app.git
```
##### Run Project
- Install Dependency
```
npm install
```

- Run Project
```
npm run dev
```

- Web Access
```
127.0.0.1:5173
```

## Note:
.htaccess
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
