  let inventory = JSON.parse(localStorage.getItem('hantu_inventory')) || [];
const dbHantu = [
    { id: 'genderowo', name: 'Genderowo', desc: 'Penghuni pohon besar yang angker.' },
    { id: 'pocong', name: 'Pocong', desc: 'Arwah penasaran tali kafan.' },
    { id: 'kunti', name: 'Kuntilanak', desc: 'Wanita berbaju putih.' },
    { id: 'tuyul', name: 'Tuyul Sakti', desc: 'Makhluk kecil pencari harta.' }
];

window.onload = () => {
    const sfx = document.getElementById('sfx_start');
    const fill = document.getElementById('fill');
    sfx.play().catch(() => {});

    let p = 0;
    let t = setInterval(() => {
        p++;
        if(fill) fill.style.width = p + '%';
        if(p >= 100) { clearInterval(t); showPage('p2'); }
    }, 50);
};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
}

function goToHome() {
    document.getElementById('bgm').play();
    showPage('p3');
}

function startRitual() {
    document.getElementById('sfx_ritual').play();
    showPage('p4'); // Halaman Komat Kamit
    setTimeout(() => {
        const h = dbHantu[Math.floor(Math.random() * dbHantu.length)];
        const baru = { ...h, lvl: 1, uid: Date.now() };
        inventory.push(baru);
        localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
        showPage('p3');
        alert("Khodam Muncul: " + h.name);
    }, 4000); // 4 DETIK Sesuai Permintaan
}

function showKoleksi() {
    const list = document.getElementById('ghost-list');
    list.innerHTML = '';
    inventory.forEach((h, i) => {
        list.innerHTML += `
            <div class="card" onclick="showDetail(${i})">
                <img src="assets/char/${h.id}_1.png" onerror="this.src='assets/char/default.png'">
                <p style="color:gold; font-size:12px">${h.name}</p>
                <small>LVL ${h.lvl}</small>
            </div>`;
    });
    showPage('p5');
}

function showDetail(i) {
    const h = inventory[i];
    const box = document.getElementById('detail-content');
    
    // Logika Tingkatan Evolusi
    let statusEvo = "Roh Biasa";
    if(h.lvl >= 10) statusEvo = "Roh Berenergi";
    if(h.lvl >= 20) statusEvo = "Panglima Gaib";
    if(h.lvl >= 30) statusEvo = "Raja Khodam";

    box.innerHTML = `
        <button onclick="showPage('p5')" style="align-self:flex-start; background:none; color:gold; border:1px solid gold; padding:5px 10px;">KEMBALI</button>
        
        <h2 class="gold-text" style="margin-top:10px">${h.name}</h2>
        <p style="color:red; font-size:14px; font-weight:bold">${statusEvo}</p>
        
        <div class="img-detail-container">
            <img src="assets/char/${h.id}_1.png" class="img-detail">
        </div>

        <div class="info-frame">
            <p>LEVEL: ${h.lvl}</p>
            <p style="font-size:12px; color:#ccc; margin-top:5px">${h.desc}</p>
        </div>

        <button class="btn-gate" style="width:100%; margin-bottom:10px" onclick="upgrade(${i})">LATIH (NAIK LEVEL)</button>
        <button onclick="lepas(${i})" style="background:none; color:#666; border:none; text-decoration:underline">Lepas Khodam</button>
    `;
    showPage('p6');
}

function upgrade(i) {
    document.getElementById('sfx_ritual').play();
    inventory[i].lvl += 1;
    localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
    
    if(inventory[i].lvl === 10 || inventory[i].lvl === 20 || inventory[i].lvl === 30) {
        alert("KHODAM KAMU BEREVOLUSI!");
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
