// add.js

document.addEventListener("DOMContentLoaded", async () => {
    // loadLaunchDropdown();  // Only launch is coming from DB
  
    const form = document.getElementById("addSatelliteForm");
    form.addEventListener("submit", handleFormSubmit);

    const params = new URLSearchParams(window.location.search);
    const editId = params.get("id");
    if (editId) loadSatelliteForEdit(editId);
});


async function handleFormSubmit(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById("satelliteName").value,
        norad_id: document.getElementById("noradID").value,
        country: document.getElementById("country").value,
        orbit_id: document.getElementById("orbitSelect").value,  // selected id
        launch_date: document.getElementById("launchDate").value,
        status: document.querySelector('input[name="status"]:checked').value
    };

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/satellite/${id}` : `${API_URL}/satellite`;

    await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    window.location.href = "satellites.html";
}

// Load existing values on edit
async function loadSatelliteForEdit(id) {
    const sat = await fetch(`${API_URL}/satellite/${id}`).then(res => res.json());

    document.getElementById("satelliteName").value = sat.name;
    document.getElementById("noradID").value = sat.norad_id;
    document.getElementById("country").value = sat.country;
    document.getElementById("orbitSelect").value = sat.orbit_id;
    document.getElementById("launchDate").value = sat.launch_id;
    document.querySelector(`input[name="status"][value="${sat.status}"]`).checked = true;

    document.getElementById("formTitle").innerText = "Edit Satellite";
}
