let allSatellites = [];

document.addEventListener("DOMContentLoaded", () => {
    loadSatelliteCatalog();

    document.getElementById("searchInput")
        .addEventListener("input", searchSatellites);

    document.querySelectorAll(".orbit-filter").forEach(btn =>
        btn.addEventListener("click", () => filterOrbit(btn.dataset.orbit))
    );

    document.querySelectorAll(".status-filter").forEach(btn =>
        btn.addEventListener("click", () => filterStatus(btn.dataset.status))
    );

    document.getElementById("exportBtn")
        .addEventListener("click", exportCSV);
});

async function loadSatelliteCatalog() {
    try {
        allSatellites = await getSatellites();
        renderSatelliteTable(allSatellites);
    } catch (err) {
        document.getElementById("satelliteTableBody").innerHTML =
            "<tr><td colspan='7'>Failed to load data</td></tr>";
    }
}

function renderSatelliteTable(list) {
    const tbody = document.getElementById("satelliteTableBody");
    tbody.innerHTML = "";

    if (!list.length) {
        tbody.innerHTML = "<tr><td colspan='7'>No satellites found</td></tr>";
        return;
    }

    list.forEach(s => {
        const statusClass =
            s.status.toLowerCase() === "active"
                ? "status-active"
                : "status-inactive";

        tbody.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.norad_id}</td>
                <td>${s.orbit_type}</td>
                <td><span class="${statusClass}">${s.status}</span></td>
                <td>${s.launch_date.split("T")[0]}</td>
                <td>${s.country}</td>
                <td>
                    <button onclick="location.href='card.html?id=${s.satellite_id}'">
                        View
                    </button>
                </td>
            </tr>
        `;
    });
}

/* SEARCH */
function searchSatellites() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    renderSatelliteTable(
        allSatellites.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.country.toLowerCase().includes(q) ||
            s.orbit_type.toLowerCase().includes(q)
        )
    );
}

/* FILTERS */
function filterOrbit(type) {
    if (type === "ALL") return renderSatelliteTable(allSatellites);
    renderSatelliteTable(allSatellites.filter(s => s.orbit_type === type));
}

function filterStatus(type) {
    if (type === "ALL") return renderSatelliteTable(allSatellites);
    renderSatelliteTable(allSatellites.filter(s => s.status === type));
}

/* EXPORT CSV */
function exportCSV() {
    if (!allSatellites.length) return alert("No data");

    let csv = "Name,NORAD ID,Orbit,Status,Launch Date,Country\n";
    allSatellites.forEach(s => {
        csv += `${s.name},${s.norad_id},${s.orbit_type},${s.status},${s.launch_date.split("T")[0]},${s.country}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "satellites_report.csv";
    a.click();
}
