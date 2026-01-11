// report.js

document.addEventListener("DOMContentLoaded", loadReportData);

async function loadReportData() {
    const satellites = await getSatellites();   // fetch all satellites

    renderLaunchTimeline(satellites);
    renderOrbitTypeChart(satellites);
}

// -------- BAR CHART: Satellites per Year ----------
function renderLaunchTimeline(satellites) {
    const yearCounts = {};

    satellites.forEach(s => {
        const year = new Date(s.launch_date).getFullYear();
        yearCounts[year] = (yearCounts[year] || 0) + 1;
    });

    const labels = Object.keys(yearCounts);
    const data = Object.values(yearCounts);

    new Chart(document.getElementById("launchTimelineChart"), {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Satellites Launched",
                data,
                backgroundColor: "rgba(0,200,255,0.6)"
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// -------- PIE CHART: Orbit Type Distribution ----------
function renderOrbitTypeChart(satellites) {
    const orbitCounts = {};

    satellites.forEach(s => {
        orbitCounts[s.orbit_type] = (orbitCounts[s.orbit_type] || 0) + 1;
    });

    new Chart(document.getElementById("orbitTypeChart"), {
        type: "pie",
        data: {
            labels: Object.keys(orbitCounts),
            datasets: [{
                data: Object.values(orbitCounts),
                backgroundColor: [
                    "#00c9ff", "#ffcd56", "#ff6b6b", "#4bc0c0", "#9966ff"
                ]
            }]
        }
    });
}
