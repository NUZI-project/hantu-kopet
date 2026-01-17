let inventory = JSON.parse(localStorage.getItem('hantu_inventory')) || [];
const hantuList = ['genderowo', 'pocong', 'kunti', 'tuyul', 'iblis'];

// 1. LOADING 5 DETIK
window.onload = () => {
    const fill = document.getElementById('fill');
    const status = document.getElementById('status-text');
    let p = 0;
    let t = setInterval(() => {
        p++;
        fill.style.width = p + '%';
        if(p === 40) status.innerText = "Mempersiapkan Ritual...";
        if(p === 80) status.innerText = "Menjemput Khodam...";
        if(p >= 100) {
            clearInterval(t);
            document.getElementById('sfx_start').play();
            showPage('p2');
        }
    }, 50); 
};

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'p5') document.getElementById('p5').style.display = 'block';
    else document.getElementById('p5').style.display = 'none';
}

function goToHome() {
    playSfx('sfx_click');
    document.getElementById('bgm').play();
    showPage('p3');
}

// 2. RITUAL PANGGIL 5 DETIK
function startRitual() {
    playSfx('sfx_ritual');
    showPage('p4');
    setTimeout(() => {
        const hantu = hantuList[Math.floor(Math.random()*hantuList.length)];
        inventory.push({ name: hantu, date: new Date().toLocaleDateString() });
        localStorage.setItem('hantu_inventory', JSON.stringify(inventory));
        alert("Kamu Mendapatkan: " + hantu.toUpperCase());
        showPage('p3');
    }, 5000);
}

function showKoleksi() {
    playSfx('sfx_click');
    const list = document.getElementById('ghost-list');
    list.innerHTML = '';
    inventory.forEach(item => {
        list.innerHTML += `
            <div class="ghost-card">
                <img src="assets/char/${item.name}_1.png">
                <p style="color:#d4af37; font-weight:bold;">${item.name.toUpperCase()}</p>
            </div>`;
    });
    showPage('p5');
}

function goBack() { playSfx('sfx_click'); showPage('p3'); }
function playSfx(id) { const s = document.getElementById(id); s.currentTime = 0; s.play(); }
