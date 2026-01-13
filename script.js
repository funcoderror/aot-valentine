const trigger = document.getElementById('trigger');
const body = document.body;
const flash = document.getElementById('flash');
const bolt = document.getElementById('bolt');
const titanScene = document.getElementById('titan-scene');
const sign = document.getElementById('sign');
const btnGroup = document.getElementById('btnGroup');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const pathsDim = document.getElementById('paths-dimension');
const scarfPath = document.getElementById('scarfPath');
const finalText = document.getElementById('finalText');
const specialBtn = document.getElementById('specialBtn');
const scene4 = document.getElementById('scene-4');

// --- STAGE 1: LIGHTNING ---
trigger.addEventListener('click', () => {
    trigger.style.pointerEvents = 'none';
    body.classList.add('shake-screen');
    flash.animate([{ opacity: 0 }, { opacity: 1, background: '#fff' }, { opacity: 0 }], { duration: 1500, easing: 'ease-out' });
    bolt.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0, offset: 0.3 }, { opacity: 1, offset: 0.4 }, { opacity: 0 }], { duration: 1200, easing: 'linear' });
    trigger.style.opacity = '0';
    setTimeout(() => {
        trigger.classList.add('hidden');
        titanScene.classList.remove('hidden');
        setTimeout(() => {
            titanScene.classList.add('fade-in', 'active-bg');
            spawnEmbers();
        }, 50);
    }, 400);
    setTimeout(() => sign.classList.add('popped'), 1200);
    setTimeout(() => btnGroup.classList.add('fade-in'), 1800);
});

// --- STAGE 2: TITAN SCENE ---
function spawnEmbers() {
    if(titanScene.classList.contains('hidden')) return;
    const ember = document.createElement('div');
    ember.classList.add('ember');
    ember.style.left = Math.random() * 100 + '%';
    ember.style.animationDuration = (Math.random() * 2 + 2) + 's';
    ember.style.opacity = Math.random();
    titanScene.appendChild(ember);
    setTimeout(() => ember.remove(), 4000);
    if(!titanScene.classList.contains('hidden')) {
        setTimeout(spawnEmbers, 100);
    }
}

const moveButton = () => {
    const rect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - 20;
    const maxY = window.innerHeight - rect.height - 20;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.max(10, Math.random() * maxX) + 'px';
    noBtn.style.top = Math.max(10, Math.random() * maxY) + 'px';
};
noBtn.addEventListener('mouseenter', moveButton);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });

// --- STAGE 3: PATHS ---
yesBtn.addEventListener('click', () => {
    noBtn.style.display = 'none'; 
    titanScene.style.opacity = '0';
    setTimeout(() => {
        titanScene.classList.add('hidden');
        pathsDim.style.display = 'block';
        startParticles();
        setTimeout(() => { scarfPath.style.strokeDashoffset = '0'; }, 1000);
        setTimeout(() => { finalText.style.opacity = '1'; }, 2500);
        
        // SHOW NEW CRYSTAL BUTTON AFTER TEXT
        setTimeout(() => {
            specialBtn.style.opacity = '1';
            specialBtn.style.pointerEvents = 'auto';
        }, 4000); 

    }, 1000); 
});

function startParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.speed = Math.random() * 2 + 0.5;
            this.size = Math.random() * 2;
            this.opacity = Math.random();
        }
        update() {
            this.y -= this.speed;
            if (this.y < 0) this.y = canvas.height + 10;
        }
        draw() {
            ctx.fillStyle = `rgba(200, 230, 255, ${this.opacity})`;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
    }
    for (let i = 0; i < 150; i++) particles.push(new Particle());
    function animate() {
        if(scene4.style.display === 'flex') return; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// --- STAGE 4: THE FINALE ---
specialBtn.addEventListener('click', () => {
    pathsDim.style.opacity = '0';
    setTimeout(() => {
        pathsDim.style.display = 'none';
        scene4.style.display = 'flex';
        setTimeout(() => {
            scene4.style.opacity = '1';
            startFeathers();
        }, 100);
    }, 1000);
});

function startFeathers() {
    const createFeather = () => {
        const f = document.createElement('div');
        f.classList.add('feather');
        f.style.left = Math.random() * 100 + '%';
        f.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
        f.style.opacity = Math.random() * 0.5 + 0.3;
        scene4.appendChild(f);
        setTimeout(() => f.remove(), 5000);
        if(scene4.style.display === 'flex') setTimeout(createFeather, 200);
    };
    createFeather();
}