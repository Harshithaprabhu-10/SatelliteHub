## 🛰️ SatelliteHub

SatelliteHub is a full-stack satellite management system built using **MySQL, Node.js, and JavaScript**.  
It allows users to store, manage, and view satellite information through a simple and responsive web interface.

The project follows a **database-first approach**, where the database schema, triggers, and events are created first and then connected to the backend and frontend.

---

## ✨ Features

- Add, view, edit, and manage satellites  
- Track satellite orbits and launch details  
- Display satellite status (Active / Inactive)  
- Automatic logging of satellite insert and update actions using triggers  
- Scheduled database event to update old satellites automatically  
- Search, filter, and export satellite data  
- Simple and responsive user interface  

---

## 🗄️ Database Overview

The database contains the following main tables:

- **Satellite** – stores core satellite details  
- **Orbit** – stores orbit information (LEO, MEO, GEO, HEO)  
- **Launch** – stores launch mission details  
- **Functionality** – defines satellite functions  
- **Satellite_Functionality** – maps satellites to their functions  
- **Satellite_Log** – automatically stores insert/update history using triggers  

### Triggers & Events

- Triggers automatically insert records into `Satellite_Log` when satellites are inserted or updated  
- A scheduled event runs daily to mark very old satellites as inactive  

---

## 🎨 Frontend

The frontend is built using **HTML, CSS, and JavaScript** and provides:

- Dashboard overview of satellite data  
- Satellite catalog with search and filters  
- Forms to add and edit satellite information  
- Reports and charts for data visualization  
- 3D globe view for satellite visualization  
- Responsive design for different screen sizes  

---

## 🚀 How to Run the Project

### Backend

```bash
cd backend
npm install
node server/index.js
```
### Frontend

Open `frontend/index.html` in a browser  


---

## 🛠️ Technologies Used

- **Database:** MySQL  
- **Backend:** Node.js, Express  
- **Frontend:** HTML, CSS, JavaScript  
- **Visualization:** Chart.js, Three.js  
- **Tools:** VS Code, MySQL Workbench, GitHub  

