document.addEventListener("DOMContentLoaded", loadEditData);

async function loadEditData() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const satellite = await fetch(`${API_URL}/satellite/${id}`).then(res => res.json());

    document.getElementById("satelliteName").value = satellite.name;
    document.getElementById("noradID").value = satellite.norad_id;
    document.getElementById("country").value = satellite.country;
    document.getElementById("orbitSelect").value = satellite.orbit_id;
    document.getElementById("launchDate").value = satellite.launch_date.split("T")[0];
    document.getElementById("status").value = satellite.status;

    document.getElementById("editForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedData = {
            name: satellite.name,
            norad_id: satellite.norad_id,
            country: document.getElementById("country").value,
            orbit_id: document.getElementById("orbitSelect").value,
            launch_date: document.getElementById("launchDate").value,
            status: document.getElementById("status").value,
        };

        await fetch(`${API_URL}/satellite/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        const funcName = document.getElementById("functionName").value.trim();
        const desc = document.getElementById("description").value.trim();

        if (funcName) {
            const addFuncRes = await fetch(`${API_URL}/functionality`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        satellite_id: id,
        function_name: funcName,
        description: desc
    })
});

            const result = await addFuncRes.json();
            const function_id = result.insertId;

            await fetch(`${API_URL}/sat_functionality`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ satellite_id: id, function_id })
            });
        }

        window.location.href = `card.html?id=${id}`;
    });
}
