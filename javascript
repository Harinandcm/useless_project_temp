document.addEventListener('DOMContentLoaded', () => {
    const kadiRoasts = [
        {
            minScore: 0,
            maxScore: 20,
            title: "Chai Sludge / RIP",
            desc: "Bro ask your mom before you drink that... or grab a spoon. Your biscuit is currently forming sedimentary layers at the bottom.",
            footer: "CRITICAL FAILURE: 0% structural cohesion left.",
            badgeText: "Sedimentary Rock",
            badgeClass: "badge roast-badge"
        },
        {
            minScore: 21,
            maxScore: 45,
            title: "High Risk Dunk",
            desc: "That biscuit has a 1.2-second lifespan before it surrenders to gravity. Dunk at your own psychological peril.",
            footer: "Soggy crumb warning active.",
            badgeText: "Dunk Hazard",
            badgeClass: "badge roast-badge"
        },
        {
            minScore: 46,
            maxScore: 75,
            title: "Mid-Tier Chai Setup",
            desc: "Passable tea color, average biscuit resistance. Not a catastrophe, but definitely not worthy of bragging.",
            footer: "Standard 2-second dunk limit recommended.",
            badgeText: "Average Dunk",
            badgeClass: "badge"
        },
        {
            minScore: 76,
            maxScore: 100,
            title: "Master Dunker Status",
            desc: "Optimal biscuit tension and chai temperature. Proceed with a confident 3-second submersion.",
            footer: "High crumb resilience certified.",
            badgeText: "Dunk Ready",
            badgeClass: "badge"
        }
    ];

    // Tab Buttons
    const btnTholi = document.getElementById('btn-tholi');
    const btnKadi = document.getElementById('btn-kadi');

    btnTholi.addEventListener('click', () => switchTab('tholi'));
    btnKadi.addEventListener('click', () => switchTab('kadi'));

    // Upload Zones
    document.getElementById('tholi-upload-zone').addEventListener('click', () => document.getElementById('tholi-input').click());
    document.getElementById('kadi-upload-zone').addEventListener('click', () => document.getElementById('kadi-input').click());

    document.getElementById('tholi-input').addEventListener('change', (e) => handleFileSelect(e.target, 'tholi'));
    document.getElementById('kadi-input').addEventListener('change', (e) => handleFileSelect(e.target, 'kadi'));

    // Resets
    document.getElementById('tholi-reset').addEventListener('click', () => resetApp('tholi'));
    document.getElementById('kadi-reset').addEventListener('click', () => resetApp('kadi'));

    function switchTab(tab) {
        btnTholi.classList.remove('active');
        btnKadi.classList.remove('active');
        document.getElementById('tholi-tab').classList.remove('active');
        document.getElementById('kadi-tab').classList.remove('active');

        if (tab === 'tholi') {
            btnTholi.classList.add('active');
            document.getElementById('tholi-tab').classList.add('active');
            document.getElementById('app-title').innerHTML = 'Is it ripe, or is it <span>lying?</span>';
            document.getElementById('app-subtitle').innerText = "Upload a photo and let peel science deliver your banana's moment of truth.";
        } else {
            btnKadi.classList.add('active');
            document.getElementById('kadi-tab').classList.add('active');
            document.getElementById('app-title').innerHTML = 'Will it hold, or will it <span>drown?</span>';
            document.getElementById('app-subtitle').innerText = "Upload your biscuit setup to calculate dunk structural integrity.";
        }
    }

    function triggerTextAnimation(type) {
        const vTitle = document.getElementById(`${type}-verdict`);
        const vDesc = document.getElementById(`${type}-desc`);
        vTitle.classList.remove('animated-text');
        vDesc.classList.remove('animated-text');
        void vTitle.offsetWidth; // Trigger reflow
        vTitle.classList.add('animated-text');
        vDesc.classList.add('animated-text');
    }

    function handleFileSelect(input, type) {
        const file = input.files[0];
        if (!file) return;

        const preview = document.getElementById(`${type}-img-preview`);
        const placeholder = document.getElementById(`${type}-placeholder`);

        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            placeholder.style.display = 'none';

            analyzeImage(file.name, type);
        };
        reader.readAsDataURL(file);
    }

    function analyzeImage(fileName, type) {
        const lowerName = fileName.toLowerCase();

        if (type === 'tholi') {
            const scoreEl = document.getElementById('tholi-score');
            const bar = document.getElementById('tholi-bar');
            const badge = document.getElementById('tholi-badge');

            if (lowerName.includes('black') || lowerName.includes('dark') || lowerName.includes('overripe') || lowerName.includes('old')) {
                scoreEl.innerText = "98";
                bar.style.width = "98%";
                bar.style.backgroundColor = "var(--accent-black)";
                badge.className = "badge roast-badge";
                badge.innerText = "Biohazard";

                document.getElementById('tholi-verdict').innerText = "Biohazard / Fossil";
                document.getElementById('tholi-desc').innerText = "Bro ask your mom before you have that... or call a museum. This isn't food anymore, it's compost with a soul.";
                document.getElementById('tholi-footer').innerText = "Critical dark mass detected.";
            } else if (lowerName.includes('green') || lowerName.includes('unripe') || lowerName.includes('raw')) {
                const greenScore = Math.floor(Math.random() * 10) + 5;
                scoreEl.innerText = greenScore;
                bar.style.width = greenScore + "%";
                bar.style.backgroundColor = "var(--accent-green)";
                badge.className = "badge";
                badge.innerText = "Uncooked Fruit";

                document.getElementById('tholi-verdict').innerText = "Solid Tree Branch";
                document.getElementById('tholi-desc').innerText = "Are you a parrot? Why are you trying to eat a neon-green stick? Give it 5 business days or use it as a weapon.";
                document.getElementById('tholi-footer').innerText = "High chlorophyll count detected.";
            } else {
                const yellowScore = Math.floor(Math.random() * 15) + 75;
                scoreEl.innerText = yellowScore;
                bar.style.width = yellowScore + "%";
                bar.style.backgroundColor = "var(--accent-yellow)";
                badge.className = "badge";
                badge.innerText = "Peak Perfection";

                document.getElementById('tholi-verdict').innerText = "Prime Snack Era";
                document.getElementById('tholi-desc').innerText = "Peak structural stability and sweetness. Consume within the next 14 minutes.";
                document.getElementById('tholi-footer').innerText = "Optimal yellow balance certified.";
            }
            triggerTextAnimation('tholi');
        } else {
            const scoreEl = document.getElementById('kadi-score');
            const bar = document.getElementById('kadi-bar');
            const badge = document.getElementById('kadi-badge');

            let randomScore;
            if (lowerName.includes('wet') || lowerName.includes('drown') || lowerName.includes('soggy') || lowerName.includes('broke') || lowerName.includes('black')) {
                randomScore = Math.floor(Math.random() * 20);
            } else {
                randomScore = Math.floor(Math.random() * 80) + 20;
            }

            const matchedRoast = kadiRoasts.find(r => randomScore >= r.minScore && randomScore <= r.maxScore);

            scoreEl.innerText = randomScore;
            bar.style.width = randomScore + "%";
            bar.style.backgroundColor = randomScore < 46 ? "var(--accent-red)" : "var(--accent-tea)";
            badge.className = matchedRoast.badgeClass;
            badge.innerText = matchedRoast.badgeText;

            document.getElementById('kadi-verdict').innerText = matchedRoast.title;
            document.getElementById('kadi-desc').innerText = matchedRoast.desc;
            document.getElementById('kadi-footer').innerText = matchedRoast.footer;

            triggerTextAnimation('kadi');
        }
    }

    function resetApp(type) {
        document.getElementById(`${type}-placeholder`).style.display = 'block';
        document.getElementById(`${type}-img-preview`).style.display = 'none';
        document.getElementById(`${type}-img-preview`).src = '';
        document.getElementById(`${type}-input`).value = '';
        document.getElementById(`${type}-score`).innerText = '--';
        document.getElementById(`${type}-bar`).style.width = '0%';

        const badge = document.getElementById(`${type}-badge`);
        badge.className = "badge";

        if (type === 'tholi') {
            badge.innerText = "Verdict";
            document.getElementById('tholi-verdict').innerText = "Your verdict will appear here";
            document.getElementById('tholi-desc').innerText = "Upload a photo to run diagnostics.";
            document.getElementById('tholi-footer').innerText = "Waiting for image input...";
        } else {
            badge.innerText = "Structural Integrity";
            document.getElementById('kadi-verdict').innerText = "Your dunk status will appear here";
            document.getElementById('kadi-desc').innerText = "Upload a photo of your setup to calculate failure risk.";
            document.getElementById('kadi-footer').innerText = "Waiting for image input...";
        }
    }
});
