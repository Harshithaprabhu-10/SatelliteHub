document.addEventListener("DOMContentLoaded", loadSatelliteDetails);

async function loadSatelliteDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const satellite = await fetch(`${API_URL}/satellite/${id}`).then(res => res.json());
    const functionalities = await fetch(`${API_URL}/functionality/${id}`).then(res => res.json());

    renderCard(satellite, functionalities, id);
}

function renderCard(s, funcs, id) {
    const container = document.getElementById("detailsContainer");

    const formattedDate = new Date(s.launch_date).toLocaleDateString("en-GB");

    container.innerHTML = `
        <button class="back-btn" onclick="location.href='satellites.html'">← Back</button>

        <div class="title">${s.name}</div>

        <div class="info-row"><span class="label">NORAD ID:</span> ${s.norad_id}</div>
        <div class="info-row"><span class="label">Country:</span> ${s.country}</div>
        <div class="info-row"><span class="label">Orbit Type:</span> ${s.orbit_type}</div>
        <div class="info-row"><span class="label">Launch Date:</span> ${formattedDate}</div>
        <div class="info-row"><span class="label">Status:</span> ${s.status}</div>

        <div class="func-section-title">Functionalities</div>
        ${
            funcs.length > 0
                ? funcs.map(f => `
                    <div class="func-item">
                        <div class="func-title">${f.function_name}</div>
                        <div>${f.description}</div>
                    </div>
                `).join("")
                : `<p style="margin-top:10px;font-size:18px;"><i>No functionalities assigned yet</i></p>`
        }

        <div class="button-row">
            <button class="edit-btn" onclick="location.href='edit.html?id=${id}'">Edit Satellite</button>
            <button class="delete-btn" onclick="deleteSatellite(${id})">Delete Satellite</button>
        </div>
    `;
}

async function deleteSatellite(id) {
    if (!confirm("Are you sure you want to delete this satellite?")) return;

    await fetch(`${API_URL}/satellite/${id}`, { method: "DELETE" });
    window.location.href = "satellites.html";
}
