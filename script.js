class Hantu {
    constructor(id, jenis, level = 1) {
        this.id = id;
        this.jenis = jenis;
        this.level = level;
    }
    getImg() {
        let evo = 1;
        if(this.level >= 30) evo = 3;
        else if(this.level >= 10) evo = 2;
        return `assets/char/${this.jenis}_${evo}.png`;
    }
}

let database = JSON.parse(localStorage.getItem('hantu_kopet_db')) || [];
let koleksi = database.map(h => new Hantu(h.id, h.jenis, h.level));
let hantuAktif = null;

// ALUR: STARTING -> LOADING -> MULAI
window.onload = () => {
    let bar = document.getElementById('bar-inner');
    let progress = 0;
    let loadingInterval = setInterval(() => {
        progress += 2;
        bar.style.width = progress + "%";
        if(progress >= 100) {
            clearInterval(loadingInterval);
            document.getElementById('sfx_start').play();
            pindahHalaman('page-mulai');
        }
    }, 70);
};

function pindahHalaman(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function masukBeranda() {
    document.getElementById('sfx_click').play();
    document.getElementById('bgm').play();
    pindahHalaman('page-home');
}

function mulaiPanggil() {
    document.getElementById('sfx_click').play();
    pindahHalaman('page-ritual');
    document.getElementById('sfx_mantra').play();
    setTimeout(() => {
        const daftar = ['pocong','kunti','tuyul','genderowo','iblis','zombie','suster','nenek'];
        const jenis = daftar[Math.floor(Math.random() * daftar.length)];
        const baru = new Hantu(Date.now(), jenis);
        koleksi.push(baru);
        simpan();
        alert("Berhasil memanggil " + jenis.toUpperCase() + "!");
        pindahHalaman('page-home');
    }, 3000);
}

function bukaKoleksi() {
    document.getElementById('sfx_click').play();
    const container = document.getElementById('list-container');
    container.innerHTML = '';
    koleksi.forEach(h => {
        const item = document.createElement('div');
        item.className = 'ghost-item';
        item.innerHTML = `<img src="${h.getImg()}"><p class="gold-text">LV.${h.level} ${h.jenis.toUpperCase()}</p>`;
        item.onclick = () => bukaDetail(h);
        container.appendChild(item);
    });
    pindahHalaman('page-koleksi');
}

function bukaDetail(h) {
    hantuAktif = h;
    document.getElementById('img-detail').src = h.getImg();
    document.getElementById('nama-detail').innerText = h.jenis.toUpperCase();
    document.getElementById('lv-detail').innerText = "Level saat ini: " + h.level;
    document.getElementById('modal-detail').style.display = 'flex';
}

function latihKhodam() {
    if(hantuAktif.level < 30) {
        hantuAktif.level++;
        const sfx = document.getElementById('sfx_evo');
        sfx.volume = 1.0;
        if(hantuAktif.level == 10 || hantuAktif.level == 30) sfx.play();
        else document.getElementById('sfx_click').play();
        simpan();
        bukaDetail(hantuAktif);
    } else { alert("Sudah mencapai batas gaib!"); }
}

function lepasKhodam() {
    if(confirm("Lepas khodam ini?")) {
        koleksi = koleksi.filter(x => x.id !== hantuAktif.id);
        simpan(); tutupModal(); bukaKoleksi();
    }
}

function simpan() { localStorage.setItem('hantu_kopet_db', JSON.stringify(koleksi)); }
function tutupModal() { document.getElementById('modal-detail').style.display = 'none'; }
function keBeranda() { pindahHalaman('page-home'); }