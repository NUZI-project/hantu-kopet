let inventory = JSON.parse(localStorage.getItem('hantu_inventory')) || [];
const dbHantu = [
    { id: 'genderowo', name: 'Genderowo', desc: 'Penghuni pohon besar yang sangat kuat.' },
    { id: 'pocong', name: 'Pocong', desc: 'Hantu yang melompat mencari keadilan.' },
    { id: 'kunti', name: 'Kuntilanak', desc: 'Hantu wanita dengan tawa yang mengerikan.' },
    { id: 'tuyul', name: 'Tuyul Sakti', desc: 'Kecil-kecil jago mencari kekayaan.' }
];

// 1. STARTING 5 DETIK
window.onload = () => {
    const sfxStart = document.getElementById('sfx_start');
    const fill = document.getElementById('fill');
    const statusText = document.getElementById('status-text');
    
    // Play SFX Starting
    sfxStart.play().catch(() => console.log("Interaksi dibutuhkan untuk suara"));

    let progress = 0;
    let timer = setInterval(() => {
        progress++;
        fill.style.width = progress + '%';
        if(progress == 30) statusText.innerText = "Membakar Menyan...";
        if(progress == 70) statusText.innerText = "Memanggil Arwah...";
        if(progress >= 100) {
            clearInterval(timer);
            showPage('p2');
        }
    }, 50); // 50ms * 100 = 5 detik
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

// 4. RITUAL 5 DETIK
function startRitual() {
    playSfx('sfx_ritual');
    showPage('p4');
    setTimeout(() => {
        const hantuAsli = dbHantu[Math.floor(Math.random() * dbHantu.length)];
        const hantuBaru = { ...hantuAsli, lvl: 1, xp: 0, uid: Date.now() };
        inventory.push(hantuBaru);
        localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
        alert("Khodam Muncul: " + hantuBaru.name);
        showPage('p3');
    }, 5000);
}

// 5. KOLEKSI
function showKoleksi() {
    playSfx('sfx_click');
    const list = document.getElementById('ghost-list');
    list.innerHTML = '';
    inventory.forEach((h, i) => {
        list.innerHTML += `
            <div class="ghost-item" onclick="showDetail(${i})">
                <img src="assets/char/${h.id}_1.png" onerror="this.src='assets/char/default.png'">
                <p style="color:#d4af37; margin-top:5px;">${h.name}</p>
                <small>LVL ${h.lvl}</small>
            </div>`;
    });
    showPage('p5');
}

// 6. DETAIL (NAIK LEVEL & LEPAS)
function showDetail(i) {
    playSfx('sfx_click');
    const h = inventory[i];
    const detail = document.getElementById('detail-content');
    detail.innerHTML = `
        <button class="btn-main" style="width:100px; padding:5px" onclick="showPage('p5')">KEMBALI</button>
        <h2 class="gold-text">${h.name}</h2>
        <img src="assets/char/${h.id}_1.png" class="img-detail">
        <p style="color:#ccc; font-style:italic;">"${h.desc}"</p>
        <div style="margin:20px; padding:10px; border:1px dashed #d4af37">
            <p>LEVEL: ${h.lvl}</p>
            <p>POWER: ${h.lvl * 25}</p>
        </div>
        <button class="btn-main" onclick="naikLevel(${i})">NAIK LEVEL (EVOLUSI)</button>
        <button class="btn-main" style="background:linear-gradient(#555, #222)" onclick="lepasHantu(${i})">LEPAS KHODAM</button>
    `;
    showPage('p6');
}

function naikLevel(i) {
    playSfx('sfx_ritual');
    inventory[i].lvl += 1;
    saveData();
    alert("Level Up! Sekarang Level " + inventory[i].lvl);
    showDetail(i);
}

function lepasHantu(i) {
    if(confirm("Apakah kamu yakin ingin melepas khodam ini?")) {
        inventory.splice(i, 1);
        saveData();
        showKoleksi();
    }
}

function saveData() { localStorage.setItem('hantu_inventory', JSON.stringify(inventory)); }
function playSfx(id) { const s = document.getElementById(id); s.currentTime = 0; s.play(); }
