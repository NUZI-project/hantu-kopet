let inventory = JSON.parse(localStorage.getItem('hantu_inventory')) || [];
const dbHantu = [
    { id: 'genderowo', name: 'Genderowo', desc: 'Raja jin penghuni pohon tua yang angker.' },
    { id: 'pocong', name: 'Pocong', desc: 'Arwah penasaran yang terikat tali kafan.' },
    { id: 'kunti', name: 'Kuntilanak', desc: 'Wanita berbaju putih dengan tawa melengking.' },
    { id: 'tuyul', name: 'Tuyul Sakti', desc: 'Makhluk kecil lincah pencari kepingan emas.' }
];

// 1. LOADING & SFX STARTING (5 DETIK)
window.onload = () => {
    const fill = document.getElementById('fill');
    const status = document.getElementById('status-text');
    const sfx = document.getElementById('sfx_start');
    
    sfx.play().catch(() => console.log("User interaction needed"));

    let p = 0;
    let t = setInterval(() => {
        p++;
        fill.style.width = p + '%';
        if(p == 40) status.innerText = "Membakar Kemenyan...";
        if(p == 80) status.innerText = "Membuka Gerbang Gaib...";
        if(p >= 100) {
            clearInterval(t);
            showPage('p2');
        }
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

// 4. RITUAL 5 DETIK
function startRitual() {
    playSfx('sfx_ritual');
    showPage('p4');
    setTimeout(() => {
        const h = dbHantu[Math.floor(Math.random() * dbHantu.length)];
        const baru = { ...h, lvl: 1, uid: Date.now() };
        inventory.push(baru);
        localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
        alert("Kamu mendapatkan: " + h.name);
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
                <p style="color:#d4af37; font-weight:bold;">${h.name}</p>
                <small>LEVEL ${h.lvl}</small>
            </div>`;
    });
    showPage('p5');
}

// 6. DETAIL, EVOLUSI & LEPAS
function showDetail(i) {
    playSfx('sfx_click');
    const h = inventory[i];
    const d = document.getElementById('detail-content');
    d.innerHTML = `
        <button class="btn-small" onclick="showPage('p5')">BALIK</button>
        <h2 class="gold-text" style="margin-top:15px;">${h.name}</h2>
        <img src="assets/char/${h.id}_1.png" class="img-detail">
        <p style="color:#bbb; padding:0 20px;">${h.desc}</p>
        <div style="margin:20px; border:1px solid #d4af37; padding:10px;">
            <p>STATUS: KHODAM LEVEL ${h.lvl}</p>
            <p>KEKUATAN: ${h.lvl * 100} POINT</p>
        </div>
        <button class="btn-main" onclick="naikLevel(${i})">NAIK LEVEL (EVOLUSI)</button>
        <button class="btn-main" style="background:#333" onclick="lepas(${i})">LEPAS KHODAM</button>
    `;
    showPage('p6');
}

function naikLevel(i) {
    playSfx('sfx_ritual');
    inventory[i].lvl += 1;
    save();
    alert("Evolusi Berhasil! Level Naik!");
    showDetail(i);
}

function lepas(i) {
    if(confirm("Lepas khodam ini ke alamnya?")) {
        inventory.splice(i, 1);
        save();
        showKoleksi();
    }
}

function save() { localStorage.setItem('hantu_inventory', JSON.stringify(inventory)); }
function playSfx(id) { const s = document.getElementById(id); s.currentTime = 0; s.play(); }
