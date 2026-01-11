// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
});

async function loadDashboardData() {
    try {
        const satellites = await getSatellites();  // fetch from backend

        const totalSatellites = satellites.length;
        const activeSatellites = satellites.filter(s => s.status === "Active").length;

        document.getElementById("totalSatellites").textContent = totalSatellites;
        document.getElementById("activeSatellites").textContent = activeSatellites;

    } catch (error) {
        console.error("Error loading dashboard data:", error);
    }
}
