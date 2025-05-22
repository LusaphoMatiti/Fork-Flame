# Fork & Flame

**Fork & Flame** is a fullstack restaurant web app that allows users to browse a beautifully crafted menu and book a table online. The we app combines clean UI design with robust backend using Supabase and Express.

---

## Live Demo

- [Frontend](https://fork-and-flame.vercel.app)
- [Backend API](https://fork-and-flame-backend.onrender.com/api)

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Express
- Supabase (PostgreSQL)

## 📂 Folder Structure

fork-and-flame/
│
├── client/
│ ├── components/ Navbar, Footer, MenuCard, LoadSpinner
│ ├── pages/ Menu, BookingForm, Contact, Experience, Hero
│ ├── api/ api.js
| ├── firebase.js
│ ├── App.jsx
| ├── index.html
| ├── main.jsx
│ └── vite.config.js
|
|
│
├── server/
│ ├── routes/ bookingRoutes, categoryRoutes, menuRoutes
│ ├── lib/ supaClient
│ ├── db.js
| ├── server.js
| ├── .gitignore
│ └── .env
│
└── README.md

## Why This Project Matters

- **Modern fullstack setup** combining Vite, React, Express, and Supabase.
- **Clean UX/UI** inspired by real-world restaurant design principles.
- **Scalable structure** that's easy to extend or adapt.
- **Real-world features**: Live menu, booking form, category filters.

## Future Improvements

- Admin dashboard
