let inventory = JSON.parse(localStorage.getItem('hantu_inventory')) || [];
const dbHantu = [
    { id: 'genderowo', name: 'Genderowo', desc: 'Penghuni pohon besar.' },
    { id: 'pocong', name: 'Pocong', desc: 'Arwah tali kafan.' },
    { id: 'kunti', name: 'Kuntilanak', desc: 'Wanita berbaju putih.' },
    { id: 'tuyul', name: 'Tuyul Sakti', desc: 'Pencari harta lincah.' }
];

// 1. STARTING 5 DETIK (Bar di Bawah + SFX)
window.onload = () => {
    const sfx = document.getElementById('sfx_start');
    const fill = document.getElementById('fill');
    const status = document.getElementById('status-text');
    
    sfx.play().catch(() => console.log("Click to play sound"));

    let p = 0;
    let t = setInterval(() => {
        p++;
        fill.style.width = p + '%';
        if(p == 30) status.innerText = "Membakar Menyan...";
        if(p == 70) status.innerText = "Memanggil Arwah...";
        if(p >= 100) { clearInterval(t); showPage('p2'); }
    }, 50);
};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goToHome() {
    playSfx('sfx_click');
    document.getElementById('bgm').play();
    showPage('p3');
}

// 4. RITUAL 4 DETIK (Komat Kamit + SFX)
function startRitual() {
    playSfx('sfx_ritual');
    showPage('p4');
    setTimeout(() => {
        const h = dbHantu[Math.floor(Math.random() * dbHantu.length)];
        const baru = { ...h, lvl: 1, uid: Date.now() };
        inventory.push(baru);
        localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
        alert("Khodam Muncul: " + h.name);
        showPage('p3');
    }, 4000); // 4 DETIK
}

// 5. KOLEKSI
function showKoleksi() {
    playSfx('sfx_click');
    const list = document.getElementById('ghost-list');
    list.innerHTML = '';
    inventory.forEach((h, i) => {
        list.innerHTML += `
            <div class="card" onclick="showDetail(${i})">
                <img src="assets/char/${h.id}_1.png" onerror="this.src='assets/char/default.png'">
                <p style="color:gold; margin-top:5px">${h.name}</p>
                <small>LVL ${h.lvl}</small>
            </div>`;
    });
    showPage('p5');
}

// 6. DETAIL & EVOLUSI (PRINSIP LVL 10, 20, 30)
function showDetail(i) {
    playSfx('sfx_click');
    const h = inventory[i];
    const box = document.getElementById('detail-content');
    
    // Tentukan Judul Evolusi
    let statusEvo = "Roh Biasa";
    if(h.lvl >= 10) statusEvo = "Roh Berenergi";
    if(h.lvl >= 20) statusEvo = "Panglima Gaib";
    if(h.lvl >= 30) statusEvo = "Raja Khodam";

    box.innerHTML = `
        <button class="btn-back" onclick="showPage('p5')">KEMBALI</button>
        <h2 class="gold-text" style="margin-top:20px">${h.name}</h2>
        <p style="color:red; font-weight:bold">${statusEvo}</p>
        <img src="assets/char/${h.id}_1.png" class="img-detail">
        <div style="border:1px solid gold; padding:15px; background:rgba(255,215,0,0.1)">
            <p>LEVEL: ${h.lvl}</p>
            <p>DESKRIPSI: ${h.desc}</p>
        </div>
        <button class="btn-evolve" onclick="upgrade(${i})">LATIH (NAIK LEVEL)</button>
        <button class="btn-game" style="background:#222; width:80%" onclick="lepas(${i})">LEPAS</button>
    `;
    showPage('p6');
}

function upgrade(i) {
    playSfx('sfx_ritual');
    inventory[i].lvl += 1;
    localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
    
    // Alert spesial setiap kelipatan 10
    if(inventory[i].lvl % 10 === 0) {
        alert("LUAR BIASA! Khodam kamu berevolusi ke tahap baru!");
    } else {
        alert("Level Naik ke " + inventory[i].lvl);
    }
    showDetail(i);
}

function lepas(i) {
    if(confirm("Lepas khodam ini?")) {
        inventory.splice(i, 1);
        localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
        showKoleksi();
    }
}

function playSfx(id) { const s = document.getElementById(id); s.currentTime = 0; s.play(); }
