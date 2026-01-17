let inventory = JSON.parse(localStorage.getItem('hantu_inventory')) || [];
const dbHantu = [
    { id: 'genderowo', name: 'Genderowo', desc: 'Penghuni pohon besar.' },
    { id: 'pocong', name: 'Pocong', desc: 'Arwah tali kafan.' },
    { id: 'kunti', name: 'Kuntilanak', desc: 'Wanita berbaju putih.' }
];

window.onload = () => {
    let p = 0;
    let t = setInterval(() => {
        p++;
        const fill = document.getElementById('fill');
        if(fill) fill.style.width = p + '%';
        if(p >= 100) { clearInterval(t); showPage('p2'); document.getElementById('sfx_start').play().catch(()=>{}); }
    }, 50);
};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goToHome() {
    document.getElementById('bgm').play();
    showPage('p3');
}

function startRitual() {
    document.getElementById('sfx_ritual').play();
    showPage('p4');
    setTimeout(() => {
        const h = dbHantu[Math.floor(Math.random() * dbHantu.length)];
        const baru = { ...h, lvl: 1, uid: Date.now() };
        inventory.push(baru);
        localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
        showPage('p3');
        alert("Khodam Didapatkan: " + h.name);
    }, 4000);
}

function showKoleksi() {
    const list = document.getElementById('ghost-list');
    list.innerHTML = '';
    inventory.forEach((h, i) => {
        list.innerHTML += `
            <div class="card" onclick="showDetail(${i})">
                <img src="assets/char/${h.id}_1.png" onerror="this.src='assets/char/default.png'">
                <p style="color:gold; font-size:12px; margin-top:5px;">${h.name}</p>
                <small>LVL ${h.lvl}</small>
            </div>`;
    });
    showPage('p5');
}

function showDetail(i) {
    const h = inventory[i];
    const box = document.getElementById('detail-content');
    let statusEvo = h.lvl >= 30 ? "Raja Khodam" : h.lvl >= 20 ? "Panglima Gaib" : h.lvl >= 10 ? "Roh Berenergi" : "Roh Biasa";

    box.innerHTML = `
        <button class="btn-back" onclick="showPage('p5')" style="align-self:flex-start">KEMBALI</button>
        <h2 class="gold-text" style="margin-top:20px">${h.name}</h2>
        <p style="color:red; font-weight:bold">${statusEvo}</p>
        <img src="assets/char/${h.id}_1.png" style="width:70%; margin:20px 0; filter:drop-shadow(0 0 10px red);">
        <div style="border:1px solid gold; padding:15px; width:100%; background:rgba(255,215,0,0.1)">
            <p>LEVEL: ${h.lvl}</p>
            <p style="font-size:12px; margin-top:10px">${h.desc}</p>
        </div>
        <button class="btn-main" style="width:100%; margin-top:20px;" onclick="upgrade(${i})">LATIH</button>
        <button onclick="lepas(${i})" style="color:gray; background:none; border:none; margin-top:15px; text-decoration:underline">Lepas Khodam</button>
    `;
    showPage('p6');
}

function upgrade(i) {
    inventory[i].lvl += 1;
    localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
    showDetail(i);
}

function lepas(i) {
    if(confirm("Lepas?")) { inventory.splice(i, 1); localStorage.setItem('hantu_inventory', JSON.stringify(inventory)); showKoleksi(); }
      }
