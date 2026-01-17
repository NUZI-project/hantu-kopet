let myKhodam = JSON.parse(localStorage.getItem('khodam_data')) || [];
const db = [
    { id: 'genderowo', name: 'Genderowo', desc: 'Penghuni pohon besar angker.' },
    { id: 'pocong', name: 'Pocong', desc: 'Arwah yang melompat mencari keadilan.' },
    { id: 'kunti', name: 'Kuntilanak', desc: 'Wanita berbaju putih dengan tawa melengking.' },
    { id: 'tuyul', name: 'Tuyul Sakti', desc: 'Makhluk kecil pencari kepingan emas.' }
];

// 1. LOADING 5 DETIK
window.onload = () => {
    let p = 0;
    let t = setInterval(() => {
        p++;
        const fill = document.getElementById('fill');
        if(fill) fill.style.width = p + '%';
        if(p >= 100) {
            clearInterval(t);
            gantiLayar('p2');
            document.getElementById('sfx_start').play().catch(()=>{});
        }
    }, 50);
};

function gantiLayar(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function mulaiRitual() {
    document.getElementById('bgm').play();
    gantiLayar('p3');
}

// 4. RITUAL 4 DETIK
function prosesPanggil() {
    document.getElementById('sfx_ritual').play();
    gantiLayar('p4');
    setTimeout(() => {
        const acak = db[Math.floor(Math.random() * db.length)];
        const baru = { ...acak, lvl: 1, uid: Date.now() };
        myKhodam.push(baru);
        localStorage.setItem('khodam_data', JSON.stringify(myKhodam));
        alert("Khodam Muncul: " + acak.name);
        gantiLayar('p3');
    }, 4000);
}

// 5. KOLEKSI
function bukaKoleksi() {
    const wadah = document.getElementById('list-khodam');
    wadah.innerHTML = '';
    myKhodam.forEach((h, i) => {
        wadah.innerHTML += `
            <div class="card-khodam" onclick="bukaDetail(${i})">
                <img src="assets/char/${h.id}_1.png" onerror="this.src='assets/char/default.png'">
                <p style="margin-top:10px; font-weight:bold;">${h.name}</p>
                <small>LVL ${h.lvl}</small>
            </div>`;
    });
    gantiLayar('p5');
}

// 6. DETAIL & EVOLUSI (LVL 10, 20, 30)
function bukaDetail(i) {
    const h = myKhodam[i];
    const box = document.getElementById('detail-box');
    
    // Logika Evolusi
    let kasta = "Roh Biasa";
    if(h.lvl >= 30) kasta = "RAJA KHODAM";
    else if(h.lvl >= 20) kasta = "PANGLIMA GAIB";
    else if(h.lvl >= 10) kasta = "ROH BERENERGI";

    box.innerHTML = `
        <button class="btn-back" onclick="gantiLayar('p5')" style="align-self:flex-start">KEMBALI</button>
        <h2 class="gold-text" style="margin-top:20px; font-size:2rem;">${h.name}</h2>
        <p style="color:red; font-weight:bold; letter-spacing:2px;">${kasta}</p>
        <img src="assets/char/${h.id}_1.png" style="width:75%; margin:30px 0; filter:drop-shadow(0 0 15px red);">
        <div style="border:1px solid gold; padding:20px; width:100%; background:rgba(255,215,0,0.05); margin-bottom:20px;">
            <p style="font-size:1.2rem;">LEVEL: ${h.lvl}</p>
            <p style="font-size:0.9rem; color:#ccc; margin-top:10px;">${h.desc}</p>
        </div>
        <button class="btn-main-merah" style="width:100%;" onclick="naikLevel(${i})">LATIH (EVOLUSI)</button>
        <button onclick="lepas(${i})" style="color:gray; background:none; border:none; margin-top:20px; text-decoration:underline;">Lepas Khodam</button>
    `;
    gantiLayar('p6');
}

function naikLevel(i) {
    document.getElementById('sfx_ritual').play();
    myKhodam[i].lvl += 1;
    localStorage.setItem('khodam_data', JSON.stringify(myKhodam));
    bukaDetail(i);
}

function lepas(i) {
    if(confirm("Lepas khodam ini ke alam gaib?")) {
        myKhodam.splice(i, 1);
        localStorage.setItem('khodam_data', JSON.stringify(myKhodam));
        bukaKoleksi();
    }
}
