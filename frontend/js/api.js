const API_URL = "http://localhost:5000/api";

async function getSatellites() {
    return fetch(`${API_URL}/satellite`).then(res => res.json());
}

async function getOrbits() {
    return fetch(`${API_URL}/orbit`).then(res => res.json());
}

async function getLaunches() {
    return fetch(`${API_URL}/launch`).then(res => res.json());
}

async function getFunctionalities() {
    return fetch(`${API_URL}/functionality`).then(res => res.json());
}
