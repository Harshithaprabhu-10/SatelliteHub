// globe.js

let scene, camera, renderer, raycaster, mouse, satellitesGroup;

init();
loadSatellitesAndBuild();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0,9); // closer camera

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 🌍 Earth (smaller size)
    const earthGeo = new THREE.SphereGeometry(1.3, 64, 64);
    const earthTex = new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/earth_atmos_2048.jpg"
    );
    const earthMat = new THREE.MeshPhongMaterial({ map: earthTex });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    satellitesGroup = new THREE.Group();
    scene.add(satellitesGroup);

    // Raycasting
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousedown", onMouseClick);

    animate();
}

async function loadSatellitesAndBuild() {
    const satellites = await getSatellites();

    const grouped = { LEO: [], MEO: [], GEO: [], HEO: [] };
    satellites.forEach(s => grouped[s.orbit_type]?.push(s));

   const orbitConfig = {
    LEO: { radius: 1.8, inclination: 45, color: 0x22c55e },
    MEO: { radius: 2.2, inclination: 30, color: 0xeab308 },
    GEO: { radius: 2.6, inclination: 5,  color: 0x3b82f6 },
    HEO: { radius: 3.0, inclination: 63, color: 0xf97316 }
};

    Object.keys(grouped).forEach(type => {
        const sats = grouped[type];
        if (!sats.length) return;

        const cfg = orbitConfig[type];
        const ring = buildOrbitRing(cfg.radius, cfg.inclination, cfg.color);
        scene.add(ring);

        placeSatellitesOnRing(sats, cfg.radius, cfg.inclination, cfg.color);
    });
}

function buildOrbitRing(radius, inclination, color) {
    const points = [];
    for (let i = 0; i <= 150; i++) {
        const angle = (i / 150) * Math.PI * 2;
        points.push(new THREE.Vector3(
            radius * Math.cos(angle), 0, radius * Math.sin(angle)
        ));
    }

    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 });
    const ring = new THREE.LineLoop(geom, mat);

    ring.rotation.x = THREE.MathUtils.degToRad(inclination);
    return ring;
}

function placeSatellitesOnRing(sats, radius, inclination, color) {
    const incRad = THREE.MathUtils.degToRad(inclination);

    sats.forEach((s, i) => {
        const angle = (i / sats.length) * Math.PI * 2;

        let x = radius * Math.cos(angle);
        let y = 0;
        let z = radius * Math.sin(angle);

        const y2 = y * Math.cos(incRad) - z * Math.sin(incRad);
        const z2 = y * Math.sin(incRad) + z * Math.cos(incRad);
        y = y2; z = z2;

        const satMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.09, 16, 16),
            new THREE.MeshBasicMaterial({ color, emissive: color, emissiveIntensity: 1 })
        );

        satMesh.position.set(x, y, z);
        satMesh.userData.id = s.satellite_id; // store ID
        satellitesGroup.add(satMesh);
    });
}

// ========= CLICK HANDLER =========
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(satellitesGroup.children);
    if (hits.length > 0) {
        const id = hits[0].object.userData.id;
        window.location.href = `card.html?id=${id}`;
    }
}

function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.002;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
