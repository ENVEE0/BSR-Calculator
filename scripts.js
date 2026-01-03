// Toggle edit mode for a dashboard tile
function toggleTileEdit(btn) {
    const tile = btn.closest('.tile');
    const inputs = tile.querySelectorAll('input[type="number"], input[type="text"], input[type="checkbox"], input[type="radio"], textarea');
    const isDisabled = inputs.length > 0 && inputs[0].disabled;
    inputs.forEach(input => input.disabled = !isDisabled);
    btn.textContent = isDisabled ? 'Lock' : 'Edit';
    btn.classList.toggle('editing', isDisabled);
    tile.classList.toggle('disabled', !isDisabled);
}
// Farming rewards data - All difficulty levels
const farmingRewardsByLevel = {
    essence: {
        1: { green: 6, blue: 0, purple: 0, yellow: 0, stamina: 20 },
        2: { green: 2, blue: 2, purple: 0, yellow: 0, stamina: 20 },
        3: { green: 1, blue: 3, purple: 0, yellow: 0, stamina: 20 },
        4: { green: 0, blue: 4, purple: 0, yellow: 0, stamina: 20 },
        5: { green: 2, blue: 4, purple: 0, yellow: 0, stamina: 20 },
        6: { green: 0, blue: 2, purple: 1, yellow: 0, stamina: 20 }
    },
    art: {
        1: { green: 6, blue: 0, purple: 0, yellow: 0, stamina: 20 },
        2: { green: 9, blue: 0, purple: 0, yellow: 0, stamina: 20 },
        3: { green: 6, blue: 2, purple: 0, yellow: 0, stamina: 20 },
        4: { green: 6, blue: 3, purple: 0, yellow: 0, stamina: 20 },
        5: { green: 3, blue: 2, purple: 1, yellow: 0, stamina: 20 },
        6: { green: 4, blue: 3, purple: 1, yellow: 0, stamina: 20 }
    },
    hammer: {
        1: { green: 8, blue: 0, purple: 0, yellow: 0, stamina: 20 },
        2: { green: 4, blue: 2, purple: 0, yellow: 0, stamina: 20 },
        3: { green: 3, blue: 3, purple: 0, yellow: 0, stamina: 20 },
        4: { green: 2, blue: 4, purple: 0, yellow: 0, stamina: 20 },
        5: { green: 0, blue: 2, purple: 1, yellow: 0, stamina: 20 },
        6: { green: 0, blue: 0, purple: 2, yellow: 0, stamina: 20 }
    },
    book: {
        1: { green: 10, blue: 0, purple: 0, yellow: 0, stamina: 20 },
        2: { green: 12, blue: 1, purple: 0, yellow: 0, stamina: 20 },
        3: { green: 4, blue: 0, purple: 3, yellow: 0, stamina: 20 },
        4: { green: 6, blue: 0, purple: 3, yellow: 0, stamina: 20 },
        5: { green: 5, blue: 0, purple: 2, yellow: 1, stamina: 20 },
        6: { green: 4, blue: 0, purple: 3, yellow: 1, stamina: 20 }
    },
    tamahagane: {
        1: { green: 12, blue: 0, purple: 0, yellow: 0, stamina: 20 },
        2: { green: 13, blue: 6, purple: 0, yellow: 0, stamina: 20 },
        3: { green: 0, blue: 4, purple: 5, yellow: 5, stamina: 20 },
        4: { green: 0, blue: 5, purple: 6, yellow: 6, stamina: 20 },
        5: { green: 0, blue: 2, purple: 2, yellow: 2, stamina: 20 },
        6: { green: 0, blue: 2, purple: 3, yellow: 3, stamina: 20 }
    },
    omamori: {
        1: { green: 0, blue: 0, purple: 0, yellow: 5, yellowMin: 5, yellowMax: 5, stamina: 40 },
        2: { green: 0, blue: 0, purple: 0, yellow: 5, yellowMin: 5, yellowMax: 5, stamina: 40 },
        3: { green: 0, blue: 0, purple: 0, yellow: 5, yellowMin: 5, yellowMax: 6, stamina: 40 },
        4: { green: 0, blue: 0, purple: 0, yellow: 6, yellowMin: 6, yellowMax: 6, stamina: 40 },
        5: { green: 0, blue: 0, purple: 0, yellow: 7, yellowMin: 7, yellowMax: 7, stamina: 40 },
        6: { green: 0, blue: 0, purple: 0, yellow: 8, yellowMin: 8, yellowMax: 8, stamina: 40 }
    }
};

// Real data from Excel file - EXP required to go from level X to level Y
// This is a matrix structure where expData[fromLevel][toLevel] gives the required EXP
const expData = {
    1: {
        20: 35792, 30: 99276, 40: 216908, 50: 421035, 60: 752613, 70: 1256584,
        80: 1973318, 90: 2930463, 100: 4101463
    },
    20: {
        30: 63484, 40: 181116, 50: 382761, 60: 697868, 70: 1160996, 80: 1812596,
        90: 2698156, 100: 3869156
    },
    30: {
        40: 117632, 50: 319277, 60: 634384, 70: 1097512, 80: 1749112, 90: 2634672,
        100: 3805672
    },
    40: {
        50: 204127, 60: 516752, 70: 979880, 80: 1631480, 90: 2517040, 100: 3688040
    },
    50: {
        60: 331578, 70: 778235, 80: 1429835, 90: 2315395, 100: 3486395
    },
    60: {
        70: 503971, 80: 1114728, 90: 2000288, 100: 3171288
    },
    70: {
        80: 716734, 90: 1537160, 100: 2708160
    },
    80: {
        90: 957145, 100: 2056560
    },
    90: {
        100: 1171000
    }
};

// Hammer costs per bracket (green, blue, purple). Fractions allowed.
// Provided values (single-color per bracket):
// 20-30: 6 blue | 30-40: 12 blue | 40-50: 6 green | 50-60: 10 green
// 60-70: 14 green | 70-80: 6 purple | 80-90: 7 purple | 90-100: 8 purple
const hammerCosts = [
    { from: 1, to: 20, green: 0, blue: 0, purple: 0 },
    { from: 20, to: 30, green: 0, blue: 6.0, purple: 0 },
    { from: 30, to: 40, green: 0, blue: 12.0, purple: 0 },
    { from: 40, to: 50, green: 6.0, blue: 0, purple: 0 },
    { from: 50, to: 60, green: 10.0, blue: 0, purple: 0 },
    { from: 60, to: 70, green: 14.0, blue: 0, purple: 0 },
    { from: 70, to: 80, green: 0, blue: 0, purple: 6.0 },
    { from: 80, to: 90, green: 0, blue: 0, purple: 7.0 },
    { from: 90, to: 100, green: 0, blue: 0, purple: 8.0 }
];

// Gold cost per bracket (20-100); fallback uses material-based gold if no bracket matches.
const weaponGoldBrackets = [
    { from: 20, to: 30, gold: 1500 },
    { from: 30, to: 40, gold: 3000 },
    { from: 40, to: 50, gold: 6000 },
    { from: 50, to: 60, gold: 9000 },
    { from: 60, to: 70, gold: 12000 },
    { from: 70, to: 80, gold: 18000 },
    { from: 80, to: 90, gold: 24000 },
    { from: 90, to: 100, gold: 30000 }
];

const defaultSettings = {
    farmingRewards: structuredClone(farmingRewardsByLevel),
    books: { green: 500, blue: 3000, purple: 10000, yellow: 20000 },
    essences: {
        '20-30': { green: 0, blue: 6, purple: 0 },
        '30-40': { green: 0, blue: 12, purple: 0 },
        '40-50': { green: 6, blue: 0, purple: 0 },
        '50-60': { green: 10, blue: 0, purple: 0 },
        '60-70': { green: 14, blue: 0, purple: 0 },
        '70-80': { green: 0, blue: 0, purple: 6 },
        '80-90': { green: 0, blue: 0, purple: 7 },
        '90-100': { green: 0, blue: 0, purple: 8 }
    },
    character: {
        kans: {
            '1-20': 7500,
            '20-30': 12900,
            '30-40': 23800,
            '40-50': 41200,
            '50-60': 66700,
            '60-70': 101300,
            '70-80': 145100,
            '80-90': 193300,
            '90-100': 239000
        },
        ascensionKans: {
            '1-20': 0,
            '20-30': 2500,
            '30-40': 5000,
            '40-50': 10000,
            '50-60': 15000,
            '60-70': 20000,
            '70-80': 30000,
            '80-90': 40000,
            '90-100': 50000
        }
    },
    weapon: {
        tamahaganeExp: { green: 100, blue: 600, purple: 2000, yellow: 4000 },
        tamahaganeXpCosts: {
            '1-20': 19120,
            '20-30': 33876,
            '30-40': 62756,
            '40-50': 108888,
            '50-60': 176864,
            '60-70': 268808,
            '70-80': 382280,
            '80-90': 510496,
            '90-100': 636384
        },
        hammers: {
            '20-30': { green: 0, blue: 6, purple: 0 },
            '30-40': { green: 0, blue: 12, purple: 0 },
            '40-50': { green: 6, blue: 0, purple: 0 },
            '50-60': { green: 10, blue: 0, purple: 0 },
            '60-70': { green: 14, blue: 0, purple: 0 },
            '70-80': { green: 0, blue: 0, purple: 6 },
            '80-90': { green: 0, blue: 0, purple: 7 },
            '90-100': { green: 0, blue: 0, purple: 8 }
        },
        gold: {
            '20-30': 1500,
            '30-40': 3000,
            '40-50': 6000,
            '50-60': 9000,
            '60-70': 12000,
            '70-80': 18000,
            '80-90': 24000,
            '90-100': 30000
        },
        ascensionKans: {
            '20-30': 500,
            '30-40': 1000,
            '40-50': 2000,
            '50-60': 3000,
            '60-70': 4000,
            '70-80': 6000,
            '80-90': 8000,
            '90-100': 10000
        }
    },
    skill: { 
        base: 30, 
        multipliers: { active: 1, passive: 0.8, ultimate: 1.8 },
        artCosts: {
            1: { greenArt: 0, blueArt: 0, purpleArt: 0, kans: 0 },
            2: { greenArt: 2.00, blueArt: 0, purpleArt: 0, kans: 2500 },
            3: { greenArt: 4.00, blueArt: 0, purpleArt: 0, kans: 5000 },
            4: { greenArt: 8.00, blueArt: 0, purpleArt: 0, kans: 10000 },
            5: { greenArt: 0, blueArt: 4.00, purpleArt: 0, kans: 15000 },
            6: { greenArt: 0, blueArt: 7.00, purpleArt: 0, kans: 20000 },
            7: { greenArt: 0, blueArt: 0, purpleArt: 6.00, kans: 30000 },
            8: { greenArt: 0, blueArt: 0, purpleArt: 7.00, kans: 40000 },
            9: { greenArt: 0, blueArt: 0, purpleArt: 10.00, kans: 50000 }
        }
    },
    passives: {
        passive1: {
            1: { omamori: 2, kans: 6000 },
            2: { omamori: 8, kans: 19000 },
            3: { omamori: 14, kans: 70000 }
        },
        passive2: {
            1: { omamori: 4, kans: 10500 },
            2: { omamori: 10, kans: 27000 },
            3: { omamori: 16, kans: 100000 }
        },
        passive3: {
            1: { omamori: 6, kans: 16500 },
            2: { omamori: 12, kans: 43500 },
            3: { omamori: 18, kans: 150000 }
        }
    }
};

function mergeFarmingRewards(parsedRewards) {
    const merged = structuredClone(farmingRewardsByLevel);
    if (!parsedRewards) return merged;
    Object.keys(merged).forEach(mat => {
        for (let level = 1; level <= 6; level++) {
            const source = parsedRewards?.[mat]?.[level];
            if (source) {
                merged[mat][level] = { ...merged[mat][level], ...source };
            }
            if (mat === 'omamori') {
                if (merged[mat][level].yellowMin === undefined) {
                    merged[mat][level].yellowMin = merged[mat][level].yellow;
                }
                if (merged[mat][level].yellowMax === undefined) {
                    merged[mat][level].yellowMax = merged[mat][level].yellow;
                }
            }
        }
    });
    return merged;
}

function setFarmingRewardInputs(farmingRewards, setVal) {
    const materials = ['essence', 'art', 'hammer', 'book', 'tamahagane', 'omamori'];
    materials.forEach(mat => {
        for (let level = 1; level <= 6; level++) {
            const drops = farmingRewards?.[mat]?.[level] || {};
            if (mat === 'omamori') {
                setVal(`dash-${mat}-drop-${level}-yellow-min`, drops.yellowMin ?? drops.yellow ?? 0);
                setVal(`dash-${mat}-drop-${level}-yellow-max`, drops.yellowMax ?? drops.yellow ?? 0);
            } else {
                setVal(`dash-${mat}-drop-${level}-green`, drops.green || 0);
                setVal(`dash-${mat}-drop-${level}-blue`, drops.blue || 0);
                setVal(`dash-${mat}-drop-${level}-purple`, drops.purple || 0);
                if (document.getElementById(`dash-${mat}-drop-${level}-yellow`)) {
                    setVal(`dash-${mat}-drop-${level}-yellow`, drops.yellow || 0);
                }
            }
            setVal(`dash-${mat}-drop-${level}-stamina`, drops.stamina || 20);
        }
    });
}

function readFarmingRewardsFromInputs(currentRewards, readNum) {
    const materials = ['essence', 'art', 'hammer', 'book', 'tamahagane', 'omamori'];
    const result = mergeFarmingRewards(currentRewards);
    materials.forEach(mat => {
        for (let level = 1; level <= 6; level++) {
            const base = result?.[mat]?.[level] || {};
            if (mat === 'omamori') {
                const yellowMin = readNum(`dash-${mat}-drop-${level}-yellow-min`, base.yellow);
                const yellowMax = readNum(`dash-${mat}-drop-${level}-yellow-max`, base.yellowMax ?? base.yellow);
                const yellowAvg = (yellowMin + yellowMax) / 2;
                result[mat][level] = {
                    green: 0,
                    blue: 0,
                    purple: 0,
                    yellowMin,
                    yellow: yellowAvg,
                    yellowMax,
                    stamina: readNum(`dash-${mat}-drop-${level}-stamina`, base.stamina || 20)
                };
            } else {
                const hasYellowInput = !!document.getElementById(`dash-${mat}-drop-${level}-yellow`);
                result[mat][level] = {
                    green: readNum(`dash-${mat}-drop-${level}-green`, base.green || 0),
                    blue: readNum(`dash-${mat}-drop-${level}-blue`, base.blue || 0),
                    purple: readNum(`dash-${mat}-drop-${level}-purple`, base.purple || 0),
                    yellow: hasYellowInput ? readNum(`dash-${mat}-drop-${level}-yellow`, base.yellow || 0) : (base.yellow || 0),
                    stamina: readNum(`dash-${mat}-drop-${level}-stamina`, base.stamina || 20)
                };
            }
        }
    });
    return result;
}

// Skill requirements data - reads from settings
function getSkillRequirements() {
    return settings.skill.artCosts;
}

// Passive requirements data - reads from settings
function getPassiveRequirements(passiveNum) {
    return settings.passives[`passive${passiveNum}`];
}

function loadSettings() {
    try {
        const raw = localStorage.getItem('bsrSettings');
        if (!raw) return structuredClone(defaultSettings);
        const parsed = JSON.parse(raw);
        const settings = {
            farmingRewards: mergeFarmingRewards(parsed.farmingRewards),
            books: { ...defaultSettings.books, ...(parsed.books || {}) },
            essences: { ...defaultSettings.essences, ...(parsed.essences || {}) },
            character: {
                kans: { ...defaultSettings.character.kans, ...(parsed.character?.kans || {}) },
                ascensionKans: { ...defaultSettings.character.ascensionKans, ...(parsed.character?.ascensionKans || {}) }
            },
            weapon: {
                tamahaganeExp: { ...defaultSettings.weapon.tamahaganeExp, ...(parsed.weapon?.tamahaganeExp || {}) },
                tamahaganeXpCosts: { ...defaultSettings.weapon.tamahaganeXpCosts, ...(parsed.weapon?.tamahaganeXpCosts || {}) },
                hammers: { ...defaultSettings.weapon.hammers, ...(parsed.weapon?.hammers || {}) },
                gold: { ...defaultSettings.weapon.gold, ...(parsed.weapon?.gold || {}) },
                ascensionKans: { ...defaultSettings.weapon.ascensionKans, ...(parsed.weapon?.ascensionKans || {}) }
            },
            skill: {
                base: parsed.skill?.base ?? defaultSettings.skill.base,
                multipliers: { ...defaultSettings.skill.multipliers, ...(parsed.skill?.multipliers || {}) },
                artCosts: parsed.skill?.artCosts ? { ...defaultSettings.skill.artCosts, ...parsed.skill.artCosts } : { ...defaultSettings.skill.artCosts }
            },
            passives: {
                passive1: { ...defaultSettings.passives.passive1, ...(parsed.passives?.passive1 || {}) },
                passive2: { ...defaultSettings.passives.passive2, ...(parsed.passives?.passive2 || {}) },
                passive3: { ...defaultSettings.passives.passive3, ...(parsed.passives?.passive3 || {}) }
            }
        };

        // Migration: correct outdated level 5 art costs if previously saved (blue 2, purple 1 -> blue 4, purple 0)
        const art5 = settings.skill?.artCosts?.[5];
        if (art5 && art5.blueArt === 2 && art5.purpleArt === 1) {
            art5.blueArt = 4;
            art5.purpleArt = 0;
        }

        return settings;
    } catch (e) {
        return structuredClone(defaultSettings);
    }
}

function saveSettings(settings) {
    localStorage.setItem('bsrSettings', JSON.stringify(settings));
}

let settings = loadSettings();

function getKanAscRequired(fromLevel, toLevel) {
    const milestones = [1, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    let totalKan = 0;
    let currentLevel = fromLevel;
    
    while (currentLevel < toLevel) {
        let nextMilestone = milestones.find(m => m > currentLevel);
        if (!nextMilestone || nextMilestone > toLevel) {
            nextMilestone = toLevel;
        }
        let baseLevel = milestones.filter(m => m <= currentLevel).pop() || 1;
        if (kanAscData[baseLevel] && kanAscData[baseLevel][nextMilestone]) {
            totalKan += kanAscData[baseLevel][nextMilestone];
        } else {
            // Similar estimation if needed
            totalKan += 0;
        }
        currentLevel = nextMilestone;
    }
    return Math.round(totalKan);
}

function getKanExpRequired(fromLevel, toLevel) {
    const milestones = [1, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    let totalKan = 0;
    let currentLevel = fromLevel;
    
    while (currentLevel < toLevel) {
        let nextMilestone = milestones.find(m => m > currentLevel);
        if (!nextMilestone || nextMilestone > toLevel) {
            nextMilestone = toLevel;
        }
        let baseLevel = milestones.filter(m => m <= currentLevel).pop() || 1;
        if (kanExpData[baseLevel] && kanExpData[baseLevel][nextMilestone]) {
            totalKan += kanExpData[baseLevel][nextMilestone];
        } else {
            totalKan += 0;
        }
        currentLevel = nextMilestone;
    }
    return Math.round(totalKan);
}

async function loadTabContent(tabName) {
    const container = document.getElementById(tabName);
    if (!container) return;
    if (container.getAttribute('data-loaded') === 'true') {
        // Even if already loaded, apply translations in case language changed
        if (typeof applyTranslations === 'function') {
            applyTranslations();
        }
        return;
    }
    try {
        const res = await fetch(`tabs/${tabName}.html`);
        if (!res.ok) throw new Error('Failed to load ' + tabName);
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const bodyContent = doc.body ? doc.body.innerHTML.trim() : '';
        container.innerHTML = bodyContent || html;
        container.setAttribute('data-loaded', 'true');
        if (tabName === 'dashboard') {
            initDashboardUI();
        } else if (tabName === 'skills') {
            initSkillsUI();
        } else if (tabName === 'character') {
            initCharacterUI();
        } else if (tabName === 'weapon') {
            initWeaponUI();
        }
        // Apply translations after loading content
        if (typeof applyTranslations === 'function') {
            applyTranslations();
        }
    } catch (err) {
        container.innerHTML = '<div class="error show">Could not load tab content.</div>';
    }
}

function showLoginModal() {
    let modal = document.getElementById('loginModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'loginModal';
        modal.innerHTML = `
            <div class="login-modal-content">
                <h2>Dashboard Access</h2>
                <p>This dashboard is restricted to authorized users only.</p>
                <div class="input-group">
                    <label>Password:</label>
                    <input type="password" id="loginPassword" placeholder="Enter password" autofocus>
                </div>
                <div class="login-buttons">
                    <button onclick="attemptLogin()">Login</button>
                    <button onclick="closeLoginModal()" class="secondary-btn">Cancel</button>
                </div>
                <div id="loginError" class="login-error"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
    document.getElementById('loginPassword').focus();
    document.getElementById('loginPassword').onkeypress = (e) => {
        if (e.key === 'Enter') attemptLogin();
    };
}

async function attemptLogin() {
    const password = document.getElementById('loginPassword').value;
    
    if (!password) {
        document.getElementById('loginError').textContent = 'Please enter a password';
        return;
    }
    
    const loginBtn = document.querySelector('.login-buttons button:first-child');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;
    
    try {
        const isLocal = location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(location.hostname);
        if (isLocal) {
            sessionStorage.setItem('bsrAdminAuth', 'true');
            closeLoginModal();
            toggleDashboardTabVisibility();
            const dashboardTab = document.querySelector('.tab:nth-child(4)');
            if (dashboardTab) {
                switchTab({ currentTarget: dashboardTab }, 'dashboard');
            }
            return;
        }

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            sessionStorage.setItem('bsrAdminAuth', 'true');
            closeLoginModal();
            toggleDashboardTabVisibility();
            const dashboardTab = document.querySelector('.tab:nth-child(4)');
            if (dashboardTab) {
                switchTab({ currentTarget: dashboardTab }, 'dashboard');
            }
        } else {
            document.getElementById('loginError').textContent = data.message || 'Incorrect password';
            document.getElementById('loginPassword').value = '';
            document.getElementById('loginPassword').focus();
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('loginError').textContent = 'Connection error. Please try again.';
    } finally {
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.style.display = 'none';
}

function toggleDashboardTabVisibility() {
    const dashboardTab = document.querySelector('.tabs .tab:nth-child(4)');
    if (dashboardTab) {
        dashboardTab.style.display = dashboardTab.style.display === 'none' ? '' : 'none';
    }
}

function initDashboardUI() {
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
    };

    setVal('dash-book-green', settings.books.green);
    setVal('dash-book-blue', settings.books.blue);
    setVal('dash-book-purple', settings.books.purple);
    setVal('dash-book-yellow', settings.books.yellow);

    setVal('dash-essence-20-30-green', settings.essences['20-30'].green);
    setVal('dash-essence-20-30-blue', settings.essences['20-30'].blue);
    setVal('dash-essence-20-30-purple', settings.essences['20-30'].purple);
    setVal('dash-essence-30-40-green', settings.essences['30-40'].green);
    setVal('dash-essence-30-40-blue', settings.essences['30-40'].blue);
    setVal('dash-essence-30-40-purple', settings.essences['30-40'].purple);
    setVal('dash-essence-40-50-green', settings.essences['40-50'].green);
    setVal('dash-essence-40-50-blue', settings.essences['40-50'].blue);
    setVal('dash-essence-40-50-purple', settings.essences['40-50'].purple);
    setVal('dash-essence-50-60-green', settings.essences['50-60'].green);
    setVal('dash-essence-50-60-blue', settings.essences['50-60'].blue);
    setVal('dash-essence-50-60-purple', settings.essences['50-60'].purple);
    setVal('dash-essence-60-70-green', settings.essences['60-70'].green);
    setVal('dash-essence-60-70-blue', settings.essences['60-70'].blue);
    setVal('dash-essence-60-70-purple', settings.essences['60-70'].purple);
    setVal('dash-essence-70-80-green', settings.essences['70-80'].green);
    setVal('dash-essence-70-80-blue', settings.essences['70-80'].blue);
    setVal('dash-essence-70-80-purple', settings.essences['70-80'].purple);
    setVal('dash-essence-80-90-green', settings.essences['80-90'].green);
    setVal('dash-essence-80-90-blue', settings.essences['80-90'].blue);
    setVal('dash-essence-80-90-purple', settings.essences['80-90'].purple);
    setVal('dash-essence-90-100-green', settings.essences['90-100'].green);
    setVal('dash-essence-90-100-blue', settings.essences['90-100'].blue);
    setVal('dash-essence-90-100-purple', settings.essences['90-100'].purple);

    // Character kans
    setVal('dash-char-kans-1-20', settings.character.kans['1-20']);
    setVal('dash-char-kans-20-30', settings.character.kans['20-30']);
    setVal('dash-char-kans-30-40', settings.character.kans['30-40']);
    setVal('dash-char-kans-40-50', settings.character.kans['40-50']);
    setVal('dash-char-kans-50-60', settings.character.kans['50-60']);
    setVal('dash-char-kans-60-70', settings.character.kans['60-70']);
    setVal('dash-char-kans-70-80', settings.character.kans['70-80']);
    setVal('dash-char-kans-80-90', settings.character.kans['80-90']);
    setVal('dash-char-kans-90-100', settings.character.kans['90-100']);

    // Character ascension kans
    setVal('dash-char-asc-kans-1-20', settings.character.ascensionKans['1-20']);
    setVal('dash-char-asc-kans-20-30', settings.character.ascensionKans['20-30']);
    setVal('dash-char-asc-kans-30-40', settings.character.ascensionKans['30-40']);
    setVal('dash-char-asc-kans-40-50', settings.character.ascensionKans['40-50']);
    setVal('dash-char-asc-kans-50-60', settings.character.ascensionKans['50-60']);
    setVal('dash-char-asc-kans-60-70', settings.character.ascensionKans['60-70']);
    setVal('dash-char-asc-kans-70-80', settings.character.ascensionKans['70-80']);
    setVal('dash-char-asc-kans-80-90', settings.character.ascensionKans['80-90']);
    setVal('dash-char-asc-kans-90-100', settings.character.ascensionKans['90-100']);

    // Weapon tamahagane EXP
    setVal('dash-tamahagane-exp-green', settings.weapon.tamahaganeExp.green);
    setVal('dash-tamahagane-exp-blue', settings.weapon.tamahaganeExp.blue);
    setVal('dash-tamahagane-exp-purple', settings.weapon.tamahaganeExp.purple);
    setVal('dash-tamahagane-exp-yellow', settings.weapon.tamahaganeExp.yellow);

    // Weapon hammers
    setVal('dash-hammer-20-30-green', settings.weapon.hammers['20-30'].green);
    setVal('dash-hammer-20-30-blue', settings.weapon.hammers['20-30'].blue);
    setVal('dash-hammer-20-30-purple', settings.weapon.hammers['20-30'].purple);
    setVal('dash-hammer-30-40-green', settings.weapon.hammers['30-40'].green);
    setVal('dash-hammer-30-40-blue', settings.weapon.hammers['30-40'].blue);
    setVal('dash-hammer-30-40-purple', settings.weapon.hammers['30-40'].purple);
    setVal('dash-hammer-40-50-green', settings.weapon.hammers['40-50'].green);
    setVal('dash-hammer-40-50-blue', settings.weapon.hammers['40-50'].blue);
    setVal('dash-hammer-40-50-purple', settings.weapon.hammers['40-50'].purple);
    setVal('dash-hammer-50-60-green', settings.weapon.hammers['50-60'].green);
    setVal('dash-hammer-50-60-blue', settings.weapon.hammers['50-60'].blue);
    setVal('dash-hammer-50-60-purple', settings.weapon.hammers['50-60'].purple);
    setVal('dash-hammer-60-70-green', settings.weapon.hammers['60-70'].green);
    setVal('dash-hammer-60-70-blue', settings.weapon.hammers['60-70'].blue);
    setVal('dash-hammer-60-70-purple', settings.weapon.hammers['60-70'].purple);
    setVal('dash-hammer-70-80-green', settings.weapon.hammers['70-80'].green);
    setVal('dash-hammer-70-80-blue', settings.weapon.hammers['70-80'].blue);
    setVal('dash-hammer-70-80-purple', settings.weapon.hammers['70-80'].purple);
    setVal('dash-hammer-80-90-green', settings.weapon.hammers['80-90'].green);
    setVal('dash-hammer-80-90-blue', settings.weapon.hammers['80-90'].blue);
    setVal('dash-hammer-80-90-purple', settings.weapon.hammers['80-90'].purple);
    setVal('dash-hammer-90-100-green', settings.weapon.hammers['90-100'].green);
    setVal('dash-hammer-90-100-blue', settings.weapon.hammers['90-100'].blue);
    setVal('dash-hammer-90-100-purple', settings.weapon.hammers['90-100'].purple);

    // Weapon gold
    setVal('dash-gold-20-30', settings.weapon.gold['20-30']);
    setVal('dash-gold-30-40', settings.weapon.gold['30-40']);
    setVal('dash-gold-40-50', settings.weapon.gold['40-50']);
    setVal('dash-gold-50-60', settings.weapon.gold['50-60']);
    setVal('dash-gold-60-70', settings.weapon.gold['60-70']);
    setVal('dash-gold-70-80', settings.weapon.gold['70-80']);
    setVal('dash-gold-80-90', settings.weapon.gold['80-90']);
    setVal('dash-gold-90-100', settings.weapon.gold['90-100']);

    // Weapon ascension kans
    setVal('dash-weapon-asc-kans-20-30', settings.weapon.ascensionKans['20-30']);
    setVal('dash-weapon-asc-kans-30-40', settings.weapon.ascensionKans['30-40']);
    setVal('dash-weapon-asc-kans-40-50', settings.weapon.ascensionKans['40-50']);
    setVal('dash-weapon-asc-kans-50-60', settings.weapon.ascensionKans['50-60']);
    setVal('dash-weapon-asc-kans-60-70', settings.weapon.ascensionKans['60-70']);
    setVal('dash-weapon-asc-kans-70-80', settings.weapon.ascensionKans['70-80']);
    setVal('dash-weapon-asc-kans-80-90', settings.weapon.ascensionKans['80-90']);
    setVal('dash-weapon-asc-kans-90-100', settings.weapon.ascensionKans['90-100']);

    // Weapon tamahagane XP costs
    setVal('dash-tamahagane-xp-1-20', settings.weapon.tamahaganeXpCosts['1-20']);
    setVal('dash-tamahagane-xp-20-30', settings.weapon.tamahaganeXpCosts['20-30']);
    setVal('dash-tamahagane-xp-30-40', settings.weapon.tamahaganeXpCosts['30-40']);
    setVal('dash-tamahagane-xp-40-50', settings.weapon.tamahaganeXpCosts['40-50']);
    setVal('dash-tamahagane-xp-50-60', settings.weapon.tamahaganeXpCosts['50-60']);
    setVal('dash-tamahagane-xp-60-70', settings.weapon.tamahaganeXpCosts['60-70']);
    setVal('dash-tamahagane-xp-70-80', settings.weapon.tamahaganeXpCosts['70-80']);
    setVal('dash-tamahagane-xp-80-90', settings.weapon.tamahaganeXpCosts['80-90']);
    setVal('dash-tamahagane-xp-90-100', settings.weapon.tamahaganeXpCosts['90-100']);

    setVal('dash-skill-base', settings.skill.base);
    setVal('dash-skill-active', settings.skill.multipliers.active);
    setVal('dash-skill-passive', settings.skill.multipliers.passive);
    setVal('dash-skill-ultimate', settings.skill.multipliers.ultimate);

    // Art costs
    for (let i = 1; i <= 9; i++) {
        const art = settings.skill.artCosts[i];
        setVal(`dash-art-${i}-green`, art.greenArt);
        setVal(`dash-art-${i}-blue`, art.blueArt);
        setVal(`dash-art-${i}-purple`, art.purpleArt);
    }
    // Art kans costs
    for (let i = 1; i <= 9; i++) {
        const art = settings.skill.artCosts[i];
        setVal(`dash-art-kans-${i}`, art.kans);
    }

    // Passive costs
    for (let p = 1; p <= 3; p++) {
        for (let i = 1; i <= 3; i++) {
            const passive = settings.passives[`passive${p}`][i];
            setVal(`dash-passive${p}-${i}-omamori`, passive.omamori);
            setVal(`dash-passive${p}-${i}-kans`, passive.kans);
        }
    }

    setFarmingRewardInputs(settings.farmingRewards, setVal);

    const saveBtn = document.getElementById('dash-save-settings');
    const status = document.getElementById('dash-save-status');
    if (saveBtn) {
        saveBtn.onclick = () => {
            const readNum = (id, fallback) => {
                const el = document.getElementById(id);
                const v = el ? parseFloat(el.value) : NaN;
                return Number.isFinite(v) ? v : fallback;
            };

            const newSettings = {
                books: {
                    green: readNum('dash-book-green', settings.books.green),
                    blue: readNum('dash-book-blue', settings.books.blue),
                    purple: readNum('dash-book-purple', settings.books.purple),
                    yellow: readNum('dash-book-yellow', settings.books.yellow)
                },
                essences: {
                    '20-30': {
                        green: readNum('dash-essence-20-30-green', settings.essences['20-30'].green),
                        blue: readNum('dash-essence-20-30-blue', settings.essences['20-30'].blue),
                        purple: readNum('dash-essence-20-30-purple', settings.essences['20-30'].purple)
                    },
                    '30-40': {
                        green: readNum('dash-essence-30-40-green', settings.essences['30-40'].green),
                        blue: readNum('dash-essence-30-40-blue', settings.essences['30-40'].blue),
                        purple: readNum('dash-essence-30-40-purple', settings.essences['30-40'].purple)
                    },
                    '40-50': {
                        green: readNum('dash-essence-40-50-green', settings.essences['40-50'].green),
                        blue: readNum('dash-essence-40-50-blue', settings.essences['40-50'].blue),
                        purple: readNum('dash-essence-40-50-purple', settings.essences['40-50'].purple)
                    },
                    '50-60': {
                        green: readNum('dash-essence-50-60-green', settings.essences['50-60'].green),
                        blue: readNum('dash-essence-50-60-blue', settings.essences['50-60'].blue),
                        purple: readNum('dash-essence-50-60-purple', settings.essences['50-60'].purple)
                    },
                    '60-70': {
                        green: readNum('dash-essence-60-70-green', settings.essences['60-70'].green),
                        blue: readNum('dash-essence-60-70-blue', settings.essences['60-70'].blue),
                        purple: readNum('dash-essence-60-70-purple', settings.essences['60-70'].purple)
                    },
                    '70-80': {
                        green: readNum('dash-essence-70-80-green', settings.essences['70-80'].green),
                        blue: readNum('dash-essence-70-80-blue', settings.essences['70-80'].blue),
                        purple: readNum('dash-essence-70-80-purple', settings.essences['70-80'].purple)
                    },
                    '80-90': {
                        green: readNum('dash-essence-80-90-green', settings.essences['80-90'].green),
                        blue: readNum('dash-essence-80-90-blue', settings.essences['80-90'].blue),
                        purple: readNum('dash-essence-80-90-purple', settings.essences['80-90'].purple)
                    },
                    '90-100': {
                        green: readNum('dash-essence-90-100-green', settings.essences['90-100'].green),
                        blue: readNum('dash-essence-90-100-blue', settings.essences['90-100'].blue),
                        purple: readNum('dash-essence-90-100-purple', settings.essences['90-100'].purple)
                    }
                },
                character: {
                    kans: {
                        '1-20': readNum('dash-char-kans-1-20', settings.character.kans['1-20']),
                        '20-30': readNum('dash-char-kans-20-30', settings.character.kans['20-30']),
                        '30-40': readNum('dash-char-kans-30-40', settings.character.kans['30-40']),
                        '40-50': readNum('dash-char-kans-40-50', settings.character.kans['40-50']),
                        '50-60': readNum('dash-char-kans-50-60', settings.character.kans['50-60']),
                        '60-70': readNum('dash-char-kans-60-70', settings.character.kans['60-70']),
                        '70-80': readNum('dash-char-kans-70-80', settings.character.kans['70-80']),
                        '80-90': readNum('dash-char-kans-80-90', settings.character.kans['80-90']),
                        '90-100': readNum('dash-char-kans-90-100', settings.character.kans['90-100'])
                    },
                    ascensionKans: {
                        '1-20': readNum('dash-char-asc-kans-1-20', settings.character.ascensionKans['1-20']),
                        '20-30': readNum('dash-char-asc-kans-20-30', settings.character.ascensionKans['20-30']),
                        '30-40': readNum('dash-char-asc-kans-30-40', settings.character.ascensionKans['30-40']),
                        '40-50': readNum('dash-char-asc-kans-40-50', settings.character.ascensionKans['40-50']),
                        '50-60': readNum('dash-char-asc-kans-50-60', settings.character.ascensionKans['50-60']),
                        '60-70': readNum('dash-char-asc-kans-60-70', settings.character.ascensionKans['60-70']),
                        '70-80': readNum('dash-char-asc-kans-70-80', settings.character.ascensionKans['70-80']),
                        '80-90': readNum('dash-char-asc-kans-80-90', settings.character.ascensionKans['80-90']),
                        '90-100': readNum('dash-char-asc-kans-90-100', settings.character.ascensionKans['90-100'])
                    }
                },
                weapon: {
                    tamahaganeExp: {
                        green: readNum('dash-tamahagane-exp-green', settings.weapon.tamahaganeExp.green),
                        blue: readNum('dash-tamahagane-exp-blue', settings.weapon.tamahaganeExp.blue),
                        purple: readNum('dash-tamahagane-exp-purple', settings.weapon.tamahaganeExp.purple),
                        yellow: readNum('dash-tamahagane-exp-yellow', settings.weapon.tamahaganeExp.yellow)
                    },
                    hammers: {
                        '20-30': {
                            green: readNum('dash-hammer-20-30-green', settings.weapon.hammers['20-30'].green),
                            blue: readNum('dash-hammer-20-30-blue', settings.weapon.hammers['20-30'].blue),
                            purple: readNum('dash-hammer-20-30-purple', settings.weapon.hammers['20-30'].purple)
                        },
                        '30-40': {
                            green: readNum('dash-hammer-30-40-green', settings.weapon.hammers['30-40'].green),
                            blue: readNum('dash-hammer-30-40-blue', settings.weapon.hammers['30-40'].blue),
                            purple: readNum('dash-hammer-30-40-purple', settings.weapon.hammers['30-40'].purple)
                        },
                        '40-50': {
                            green: readNum('dash-hammer-40-50-green', settings.weapon.hammers['40-50'].green),
                            blue: readNum('dash-hammer-40-50-blue', settings.weapon.hammers['40-50'].blue),
                            purple: readNum('dash-hammer-40-50-purple', settings.weapon.hammers['40-50'].purple)
                        },
                        '50-60': {
                            green: readNum('dash-hammer-50-60-green', settings.weapon.hammers['50-60'].green),
                            blue: readNum('dash-hammer-50-60-blue', settings.weapon.hammers['50-60'].blue),
                            purple: readNum('dash-hammer-50-60-purple', settings.weapon.hammers['50-60'].purple)
                        },
                        '60-70': {
                            green: readNum('dash-hammer-60-70-green', settings.weapon.hammers['60-70'].green),
                            blue: readNum('dash-hammer-60-70-blue', settings.weapon.hammers['60-70'].blue),
                            purple: readNum('dash-hammer-60-70-purple', settings.weapon.hammers['60-70'].purple)
                        },
                        '70-80': {
                            green: readNum('dash-hammer-70-80-green', settings.weapon.hammers['70-80'].green),
                            blue: readNum('dash-hammer-70-80-blue', settings.weapon.hammers['70-80'].blue),
                            purple: readNum('dash-hammer-70-80-purple', settings.weapon.hammers['70-80'].purple)
                        },
                        '80-90': {
                            green: readNum('dash-hammer-80-90-green', settings.weapon.hammers['80-90'].green),
                            blue: readNum('dash-hammer-80-90-blue', settings.weapon.hammers['80-90'].blue),
                            purple: readNum('dash-hammer-80-90-purple', settings.weapon.hammers['80-90'].purple)
                        },
                        '90-100': {
                            green: readNum('dash-hammer-90-100-green', settings.weapon.hammers['90-100'].green),
                            blue: readNum('dash-hammer-90-100-blue', settings.weapon.hammers['90-100'].blue),
                            purple: readNum('dash-hammer-90-100-purple', settings.weapon.hammers['90-100'].purple)
                        }
                    },
                    gold: {
                        '20-30': readNum('dash-gold-20-30', settings.weapon.gold['20-30']),
                        '30-40': readNum('dash-gold-30-40', settings.weapon.gold['30-40']),
                        '40-50': readNum('dash-gold-40-50', settings.weapon.gold['40-50']),
                        '50-60': readNum('dash-gold-50-60', settings.weapon.gold['50-60']),
                        '60-70': readNum('dash-gold-60-70', settings.weapon.gold['60-70']),
                        '70-80': readNum('dash-gold-70-80', settings.weapon.gold['70-80']),
                        '80-90': readNum('dash-gold-80-90', settings.weapon.gold['80-90']),
                        '90-100': readNum('dash-gold-90-100', settings.weapon.gold['90-100'])
                    },
                    ascensionKans: {
                        '20-30': readNum('dash-weapon-asc-kans-20-30', settings.weapon.ascensionKans['20-30']),
                        '30-40': readNum('dash-weapon-asc-kans-30-40', settings.weapon.ascensionKans['30-40']),
                        '40-50': readNum('dash-weapon-asc-kans-40-50', settings.weapon.ascensionKans['40-50']),
                        '50-60': readNum('dash-weapon-asc-kans-50-60', settings.weapon.ascensionKans['50-60']),
                        '60-70': readNum('dash-weapon-asc-kans-60-70', settings.weapon.ascensionKans['60-70']),
                        '70-80': readNum('dash-weapon-asc-kans-70-80', settings.weapon.ascensionKans['70-80']),
                        '80-90': readNum('dash-weapon-asc-kans-80-90', settings.weapon.ascensionKans['80-90']),
                        '90-100': readNum('dash-weapon-asc-kans-90-100', settings.weapon.ascensionKans['90-100'])
                    },
                    tamahaganeXpCosts: {
                        '1-20': readNum('dash-tamahagane-xp-1-20', settings.weapon.tamahaganeXpCosts['1-20']),
                        '20-30': readNum('dash-tamahagane-xp-20-30', settings.weapon.tamahaganeXpCosts['20-30']),
                        '30-40': readNum('dash-tamahagane-xp-30-40', settings.weapon.tamahaganeXpCosts['30-40']),
                        '40-50': readNum('dash-tamahagane-xp-40-50', settings.weapon.tamahaganeXpCosts['40-50']),
                        '50-60': readNum('dash-tamahagane-xp-50-60', settings.weapon.tamahaganeXpCosts['50-60']),
                        '60-70': readNum('dash-tamahagane-xp-60-70', settings.weapon.tamahaganeXpCosts['60-70']),
                        '70-80': readNum('dash-tamahagane-xp-70-80', settings.weapon.tamahaganeXpCosts['70-80']),
                        '80-90': readNum('dash-tamahagane-xp-80-90', settings.weapon.tamahaganeXpCosts['80-90']),
                        '90-100': readNum('dash-tamahagane-xp-90-100', settings.weapon.tamahaganeXpCosts['90-100'])
                    }
                },
                skill: {
                    base: readNum('dash-skill-base', settings.skill.base),
                    multipliers: {
                        active: readNum('dash-skill-active', settings.skill.multipliers.active),
                        passive: readNum('dash-skill-passive', settings.skill.multipliers.passive),
                        ultimate: readNum('dash-skill-ultimate', settings.skill.multipliers.ultimate)
                    },
                    artCosts: {
                        1: {
                            greenArt: readNum('dash-art-1-green', settings.skill.artCosts[1].greenArt),
                            blueArt: readNum('dash-art-1-blue', settings.skill.artCosts[1].blueArt),
                            purpleArt: readNum('dash-art-1-purple', settings.skill.artCosts[1].purpleArt),
                            kans: readNum('dash-art-kans-1', settings.skill.artCosts[1].kans)
                        },
                        2: {
                            greenArt: readNum('dash-art-2-green', settings.skill.artCosts[2].greenArt),
                            blueArt: readNum('dash-art-2-blue', settings.skill.artCosts[2].blueArt),
                            purpleArt: readNum('dash-art-2-purple', settings.skill.artCosts[2].purpleArt),
                            kans: readNum('dash-art-kans-2', settings.skill.artCosts[2].kans)
                        },
                        3: {
                            greenArt: readNum('dash-art-3-green', settings.skill.artCosts[3].greenArt),
                            blueArt: readNum('dash-art-3-blue', settings.skill.artCosts[3].blueArt),
                            purpleArt: readNum('dash-art-3-purple', settings.skill.artCosts[3].purpleArt),
                            kans: readNum('dash-art-kans-3', settings.skill.artCosts[3].kans)
                        },
                        4: {
                            greenArt: readNum('dash-art-4-green', settings.skill.artCosts[4].greenArt),
                            blueArt: readNum('dash-art-4-blue', settings.skill.artCosts[4].blueArt),
                            purpleArt: readNum('dash-art-4-purple', settings.skill.artCosts[4].purpleArt),
                            kans: readNum('dash-art-kans-4', settings.skill.artCosts[4].kans)
                        },
                        5: {
                            greenArt: readNum('dash-art-5-green', settings.skill.artCosts[5].greenArt),
                            blueArt: readNum('dash-art-5-blue', settings.skill.artCosts[5].blueArt),
                            purpleArt: readNum('dash-art-5-purple', settings.skill.artCosts[5].purpleArt),
                            kans: readNum('dash-art-kans-5', settings.skill.artCosts[5].kans)
                        },
                        6: {
                            greenArt: readNum('dash-art-6-green', settings.skill.artCosts[6].greenArt),
                            blueArt: readNum('dash-art-6-blue', settings.skill.artCosts[6].blueArt),
                            purpleArt: readNum('dash-art-6-purple', settings.skill.artCosts[6].purpleArt),
                            kans: readNum('dash-art-kans-6', settings.skill.artCosts[6].kans)
                        },
                        7: {
                            greenArt: readNum('dash-art-7-green', settings.skill.artCosts[7].greenArt),
                            blueArt: readNum('dash-art-7-blue', settings.skill.artCosts[7].blueArt),
                            purpleArt: readNum('dash-art-7-purple', settings.skill.artCosts[7].purpleArt),
                            kans: readNum('dash-art-kans-7', settings.skill.artCosts[7].kans)
                        },
                        8: {
                            greenArt: readNum('dash-art-8-green', settings.skill.artCosts[8].greenArt),
                            blueArt: readNum('dash-art-8-blue', settings.skill.artCosts[8].blueArt),
                            purpleArt: readNum('dash-art-8-purple', settings.skill.artCosts[8].purpleArt),
                            kans: readNum('dash-art-kans-8', settings.skill.artCosts[8].kans)
                        },
                        9: {
                            greenArt: readNum('dash-art-9-green', settings.skill.artCosts[9].greenArt),
                            blueArt: readNum('dash-art-9-blue', settings.skill.artCosts[9].blueArt),
                            purpleArt: readNum('dash-art-9-purple', settings.skill.artCosts[9].purpleArt),
                            kans: readNum('dash-art-kans-9', settings.skill.artCosts[9].kans)
                        }
                    }
                },
                passives: {
                    passive1: {
                        1: {
                            omamori: readNum('dash-passive1-1-omamori', settings.passives.passive1[1].omamori),
                            kans: readNum('dash-passive1-1-kans', settings.passives.passive1[1].kans)
                        },
                        2: {
                            omamori: readNum('dash-passive1-2-omamori', settings.passives.passive1[2].omamori),
                            kans: readNum('dash-passive1-2-kans', settings.passives.passive1[2].kans)
                        },
                        3: {
                            omamori: readNum('dash-passive1-3-omamori', settings.passives.passive1[3].omamori),
                            kans: readNum('dash-passive1-3-kans', settings.passives.passive1[3].kans)
                        }
                    },
                    passive2: {
                        1: {
                            omamori: readNum('dash-passive2-1-omamori', settings.passives.passive2[1].omamori),
                            kans: readNum('dash-passive2-1-kans', settings.passives.passive2[1].kans)
                        },
                        2: {
                            omamori: readNum('dash-passive2-2-omamori', settings.passives.passive2[2].omamori),
                            kans: readNum('dash-passive2-2-kans', settings.passives.passive2[2].kans)
                        },
                        3: {
                            omamori: readNum('dash-passive2-3-omamori', settings.passives.passive2[3].omamori),
                            kans: readNum('dash-passive2-3-kans', settings.passives.passive2[3].kans)
                        }
                    },
                    passive3: {
                        1: {
                            omamori: readNum('dash-passive3-1-omamori', settings.passives.passive3[1].omamori),
                            kans: readNum('dash-passive3-1-kans', settings.passives.passive3[1].kans)
                        },
                        2: {
                            omamori: readNum('dash-passive3-2-omamori', settings.passives.passive3[2].omamori),
                            kans: readNum('dash-passive3-2-kans', settings.passives.passive3[2].kans)
                        },
                        3: {
                            omamori: readNum('dash-passive3-3-omamori', settings.passives.passive3[3].omamori),
                            kans: readNum('dash-passive3-3-kans', settings.passives.passive3[3].kans)
                        }
                    }
                },
                farmingRewards: {
                    essence: {},
                    art: {},
                    hammer: {},
                    book: {},
                    tamahagane: {},
                    omamori: {}
                }
            };

            newSettings.farmingRewards = readFarmingRewardsFromInputs(settings.farmingRewards, readNum);

            settings = newSettings;
            saveSettings(settings);
            if (status) {
                status.style.display = 'block';
                status.textContent = 'Settings saved! Click Calculate on other tabs to apply changes.';
                setTimeout(() => { status.style.display = 'none'; }, 3000);
            }
        };
    }
}

async function switchTab(e, tabName) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    if (tabName === 'dashboard') {
        if (sessionStorage.getItem('bsrAdminAuth') !== 'true') {
            showLoginModal();
            return;
        }
    }
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    e.currentTarget.classList.add('active');
    const target = document.getElementById(tabName);
    target.classList.add('active');
    await loadTabContent(tabName);
}

function switchDashSubTab(event, subTabName) {
    const subTabs = document.querySelectorAll('.sub-tab');
    const subContents = document.querySelectorAll('.sub-tab-content');
    
    subTabs.forEach(tab => tab.classList.remove('active'));
    subContents.forEach(content => content.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
    document.getElementById('dash-' + subTabName).classList.add('active');
}

// ============================================
// CONSTANTS
// ============================================

const LEVEL_BRACKETS = [
    { from: 20, to: 30, key: '20-30' },
    { from: 30, to: 40, key: '30-40' },
    { from: 40, to: 50, key: '40-50' },
    { from: 50, to: 60, key: '50-60' },
    { from: 60, to: 70, key: '60-70' },
    { from: 70, to: 80, key: '70-80' },
    { from: 80, to: 90, key: '80-90' },
    { from: 90, to: 100, key: '90-100' }
];

const TAMAHAGANE_BRACKETS = [
    { from: 1, to: 20, key: '1-20' },
    { from: 20, to: 30, key: '20-30' },
    { from: 30, to: 40, key: '30-40' },
    { from: 40, to: 50, key: '40-50' },
    { from: 50, to: 60, key: '50-60' },
    { from: 60, to: 70, key: '60-70' },
    { from: 70, to: 80, key: '70-80' },
    { from: 80, to: 90, key: '80-90' },
    { from: 90, to: 100, key: '90-100' }
];

// ============================================
// HELPER UTILITIES
// ============================================

// DOM helper functions (reduce repetition in calculations)
const DOMHelpers = {
    setText: (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    },
    setHTML: (id, html) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    },
    show: (id) => {
        const el = document.getElementById(id);
        if (el) el.style.display = '';
    },
    hide: (id) => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    },
    addClass: (id, className) => {
        const el = document.getElementById(id);
        if (el) el.classList.add(className);
    },
    removeClass: (id, className) => {
        const el = document.getElementById(id);
        if (el) el.classList.remove(className);
    },
    formatNum: (n) => Number(n).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
};

// ============================================
// CALCULATION FUNCTIONS
// ============================================

function getExpRequired(fromLevel, toLevel) {
    const milestones = [1, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    let totalExp = 0;
    let currentLevel = fromLevel;
    
    while (currentLevel < toLevel) {
        let nextMilestone = milestones.find(m => m > currentLevel);
        if (!nextMilestone || nextMilestone > toLevel) {
            nextMilestone = toLevel;
        }
        let baseLevel = milestones.filter(m => m <= currentLevel).pop() || 1;
        if (expData[baseLevel] && expData[baseLevel][nextMilestone]) {
            totalExp += expData[baseLevel][nextMilestone];
        } else {
            let estimatedExp = 0;
            if (expData[baseLevel]) {
                const availableLevels = Object.keys(expData[baseLevel]).map(Number).sort((a, b) => a - b);
                const closestLevel = availableLevels.find(l => l >= nextMilestone) || availableLevels[availableLevels.length - 1];
                estimatedExp = expData[baseLevel][closestLevel] * (nextMilestone - currentLevel) / (closestLevel - baseLevel);
            }
            totalExp += estimatedExp;
        }
        currentLevel = nextMilestone;
    }
    return Math.round(totalExp);
}

function calculateCharacter() {
    const currentLevel = parseInt(document.getElementById('char-current-level').value);
    const targetLevel = parseInt(document.getElementById('char-target-level').value);
    const greenBooks = parseInt(document.getElementById('char-green-books').value) || 0;
    const blueBooks = parseInt(document.getElementById('char-blue-books').value) || 0;
    const purpleBooks = parseInt(document.getElementById('char-purple-books').value) || 0;
    const yellowBooks = parseInt(document.getElementById('char-yellow-books').value) || 0;
    const greenEssences = parseInt(document.getElementById('char-green-essences').value) || 0;
    const blueEssences = parseInt(document.getElementById('char-blue-essences').value) || 0;
    const purpleEssences = parseInt(document.getElementById('char-purple-essences').value) || 0;

    const bookExp = settings.books;
    const availableExp =
        greenBooks * bookExp.green +
        blueBooks * bookExp.blue +
        purpleBooks * bookExp.purple +
        yellowBooks * bookExp.yellow;
    
    const errorDiv = document.getElementById('char-error');
    const results = document.getElementById('char-results');
    
    if (errorDiv) errorDiv.classList.remove('show');
    if (results) results.classList.remove('show');

    if (targetLevel <= currentLevel) {
        if (errorDiv) {
            errorDiv.textContent = typeof t === 'function' ? t('character.error') : 'Target level must be higher than current level';
            errorDiv.classList.add('show');
        }
        return;
    }

    if (targetLevel > 100 || currentLevel < 1) {
        if (errorDiv) {
            errorDiv.textContent = 'Levels must be between 1 and 100';
            errorDiv.classList.add('show');
        }
        return;
    }

    let totalExp = getExpRequired(currentLevel, targetLevel);
    const missingExp = Math.max(0, totalExp - (availableExp || 0));

    const greenBooksNeeded = Math.ceil(missingExp / bookExp.green);
    const blueBooksNeeded = Math.ceil(missingExp / bookExp.blue);
    const purpleBooksNeeded = Math.ceil(missingExp / bookExp.purple);
    const yellowBooksNeeded = Math.ceil(missingExp / bookExp.yellow);

    // Calculate essence requirements based on brackets
    let essencesNeeded = { green: 0, blue: 0, purple: 0 };
    LEVEL_BRACKETS.forEach(seg => {
        if (currentLevel < seg.to && targetLevel > seg.from) {
            const costs = settings.essences[seg.key];
            essencesNeeded.green += costs.green;
            essencesNeeded.blue += costs.blue;
            essencesNeeded.purple += costs.purple;
        }
    });

    const essencesMissing = {
        green: Math.max(0, essencesNeeded.green - greenEssences),
        blue: Math.max(0, essencesNeeded.blue - blueEssences),
        purple: Math.max(0, essencesNeeded.purple - purpleEssences)
    };

    // Display essences status
    const totalEssencesOwned = greenEssences + blueEssences + purpleEssences;
    const totalEssencesNeeded = essencesNeeded.green + essencesNeeded.blue + essencesNeeded.purple;
    if (totalEssencesOwned >= totalEssencesNeeded) {
        const essencesMsg = typeof t === 'function' ? t('character.enoughEssences') : '✓ You have enough Essences!';
        DOMHelpers.setText('char-essences-status', essencesMsg);
        document.getElementById('char-essences-status').style.color = '#10b981';
        DOMHelpers.show('char-essences-status-container');
    } else {
        DOMHelpers.hide('char-essences-status-container');
    }

    DOMHelpers.setText('char-total-exp-books', availableExp.toLocaleString());
    DOMHelpers.setText('char-total-exp', totalExp.toLocaleString());
    DOMHelpers.setText('char-missing-exp', missingExp.toLocaleString());

    // Display books status
    if (availableExp >= totalExp) {
        const booksMsg = typeof t === 'function' ? t('character.enoughBooks') : '✓ You have enough Books!';
        DOMHelpers.setText('char-books-status', booksMsg);
        document.getElementById('char-books-status').style.color = '#10b981';
        DOMHelpers.show('char-books-status-container');
    } else {
        DOMHelpers.hide('char-books-status-container');
    }

    // Calculate character kans costs based on brackets
    let characterKansNeeded = 0;
    let characterAscensionKansNeeded = 0;
    LEVEL_BRACKETS.forEach(seg => {
        if (currentLevel < seg.to && targetLevel > seg.from) {
            characterKansNeeded += settings.character.kans[seg.key];
            characterAscensionKansNeeded += settings.character.ascensionKans[seg.key];
        }
    });
    DOMHelpers.setText('char-kans-needed', characterKansNeeded.toLocaleString());
    DOMHelpers.setText('char-asc-kans-needed', characterAscensionKansNeeded.toLocaleString());

    DOMHelpers.setHTML('char-books-green', `<span class="calc-main">${greenBooksNeeded.toLocaleString()}</span> <span class="calc-paren">(${(greenBooksNeeded * bookExp.green).toLocaleString()} EXP)</span>`);
    DOMHelpers.setHTML('char-books-blue', `<span class="calc-main">${blueBooksNeeded.toLocaleString()}</span> <span class="calc-paren">(${(blueBooksNeeded * bookExp.blue).toLocaleString()} EXP)</span>`);
    DOMHelpers.setHTML('char-books-purple', `<span class="calc-main">${purpleBooksNeeded.toLocaleString()}</span> <span class="calc-paren">(${(purpleBooksNeeded * bookExp.purple).toLocaleString()} EXP)</span>`);
    DOMHelpers.setHTML('char-books-yellow', `<span class="calc-main">${yellowBooksNeeded.toLocaleString()}</span> <span class="calc-paren">(${(yellowBooksNeeded * bookExp.yellow).toLocaleString()} EXP)</span>`);
    
    // Show/hide essence results based on whether they're needed
    const greenEssResult = document.getElementById('char-essences-green')?.parentElement;
    const blueEssResult = document.getElementById('char-essences-blue')?.parentElement;
    const purpleEssResult = document.getElementById('char-essences-purple')?.parentElement;
    
    if (essencesNeeded.green > 0) {
        const requiredText = typeof t === 'function' ? t('common.required') : '(of {0} required)';
        const filled = requiredText.replace('{0}', DOMHelpers.formatNum(essencesNeeded.green));
        document.getElementById('char-essences-green').innerHTML = `${DOMHelpers.formatNum(essencesMissing.green)} <span style="color: white;">${filled}</span>`;
        if (greenEssResult) greenEssResult.style.display = '';
    } else {
        if (greenEssResult) greenEssResult.style.display = 'none';
    }
    
    if (essencesNeeded.blue > 0) {
        const requiredText = typeof t === 'function' ? t('common.required') : '(of {0} required)';
        const filled = requiredText.replace('{0}', DOMHelpers.formatNum(essencesNeeded.blue));
        document.getElementById('char-essences-blue').innerHTML = `${DOMHelpers.formatNum(essencesMissing.blue)} <span style="color: white;">${filled}</span>`;
        if (blueEssResult) blueEssResult.style.display = '';
    } else {
        if (blueEssResult) blueEssResult.style.display = 'none';
    }
    
    if (essencesNeeded.purple > 0) {
        const requiredText = typeof t === 'function' ? t('common.required') : '(of {0} required)';
        const filled = requiredText.replace('{0}', DOMHelpers.formatNum(essencesNeeded.purple));
        document.getElementById('char-essences-purple').innerHTML = `${DOMHelpers.formatNum(essencesMissing.purple)} <span style="color: white;">${filled}</span>`;
        if (purpleEssResult) purpleEssResult.style.display = '';
    } else {
        if (purpleEssResult) purpleEssResult.style.display = 'none';
    }

    // Reset calculated-number classes then add to all numeric results except the total EXP-from-books
    if (results) {
        results.classList.add('show');
        const values = results.querySelectorAll('.result-value');
        values.forEach(v => v.classList.remove('calculated-number'));
        values.forEach(v => {
            if (v.id !== 'char-total-exp-books') {
                v.classList.add('calculated-number');
            }
        });
    }
    
    // Calculate farming runs
    const farmingSection = document.getElementById('char-farming-section');
    
    if (targetLevel > currentLevel && farmingSection) {
        // For books, calculate runs based on XP, not material count
        // Each level gives different XP values, so we need to find the most efficient level
        let bookRunsNeeded = 0;
        let bestBookLevel = 6;
        
        if (missingExp > 0) {
            let bestBookRuns = Infinity;
            // Try each difficulty level for books
            for (let level = 1; level <= 6; level++) {
                const rewards = settings.farmingRewards.book[level];
                // Calculate total XP from this level's rewards
                const totalXP = (rewards.green * bookExp.green) + 
                              (rewards.blue * bookExp.blue) + 
                              (rewards.purple * bookExp.purple) + 
                              (rewards.yellow * bookExp.yellow);
                
                if (totalXP > 0) {
                    const runsNeeded = Math.ceil(missingExp / totalXP);
                    // Prefer fewer runs, and prefer higher level on ties
                    if (runsNeeded < bestBookRuns || (runsNeeded === bestBookRuns && level > bestBookLevel)) {
                        bestBookRuns = runsNeeded;
                        bestBookLevel = level;
                    }
                }
            }
            bookRunsNeeded = (bestBookRuns === Infinity) ? 0 : bestBookRuns;
        }
        
        // Calculate essence runs - apply conversions to owned essences first
        // Support both upgrade (green→blue→purple) and downgrade (purple→green→blue)
        let essenceDeficit = {
            green: essencesMissing.green,
            blue: essencesMissing.blue,
            purple: essencesMissing.purple
        };
        
        // Track excess of each color
        let excessGreen = Math.max(0, greenEssences - essencesNeeded.green);
        let excessBlue = Math.max(0, blueEssences - essencesNeeded.blue);
        let excessPurple = Math.max(0, purpleEssences - essencesNeeded.purple);
        
        // First, match owned to needed in each color
        essenceDeficit.green = Math.max(0, essencesNeeded.green - greenEssences);
        essenceDeficit.blue = Math.max(0, essencesNeeded.blue - blueEssences);
        essenceDeficit.purple = Math.max(0, essencesNeeded.purple - purpleEssences);
        
        // Now handle conversions: use excess to cover deficits
        // Downgrade: purple → blue → green
        if (essenceDeficit.blue > 0 && excessPurple > 0) {
            const purpleToUse = Math.min(excessPurple, Math.ceil(essenceDeficit.blue / 3));
            essenceDeficit.blue = Math.max(0, essenceDeficit.blue - (purpleToUse * 3));
            excessPurple -= purpleToUse;
        }
        
        if (essenceDeficit.green > 0 && excessPurple > 0) {
            const purpleToUse = Math.min(excessPurple, Math.ceil(essenceDeficit.green / 9));
            essenceDeficit.green = Math.max(0, essenceDeficit.green - (purpleToUse * 9));
            excessPurple -= purpleToUse;
        }
        
        if (essenceDeficit.green > 0 && excessBlue > 0) {
            const blueToUse = Math.min(excessBlue, Math.ceil(essenceDeficit.green / 3));
            essenceDeficit.green = Math.max(0, essenceDeficit.green - (blueToUse * 3));
            excessBlue -= blueToUse;
        }
        
        // Upgrade: green → blue → purple
        if (essenceDeficit.blue > 0 && excessGreen > 0) {
            const greenNeeded = Math.ceil(essenceDeficit.blue * 3);
            const greenToUse = Math.min(excessGreen, greenNeeded);
            const blueFromGreen = Math.floor(greenToUse / 3);
            essenceDeficit.blue = Math.max(0, essenceDeficit.blue - blueFromGreen);
            excessGreen -= blueFromGreen * 3;
        }
        
        if (essenceDeficit.purple > 0 && excessGreen > 0) {
            const greenNeeded = Math.ceil(essenceDeficit.purple * 9);
            const greenToUse = Math.min(excessGreen, greenNeeded);
            const purpleFromGreen = Math.floor(greenToUse / 9);
            essenceDeficit.purple = Math.max(0, essenceDeficit.purple - purpleFromGreen);
            excessGreen -= purpleFromGreen * 9;
        }
        
        if (essenceDeficit.purple > 0 && excessBlue > 0) {
            const blueNeeded = Math.ceil(essenceDeficit.purple * 3);
            const blueToUse = Math.min(excessBlue, blueNeeded);
            const purpleFromBlue = Math.floor(blueToUse / 3);
            essenceDeficit.purple = Math.max(0, essenceDeficit.purple - purpleFromBlue);
            excessBlue -= purpleFromBlue * 3;
        }
        
        // Calculate essence farming runs using purple equivalent
        let bestEssenceLevel = 6;
        let bestEssenceRuns = 0;
        const purpleEquivalentNeeded = (essenceDeficit.green / 9) + (essenceDeficit.blue / 3) + essenceDeficit.purple;
        
        if (purpleEquivalentNeeded > 0) {
            let bestEssenceRunsTemp = Infinity;
            for (let level = 1; level <= 6; level++) {
                const rewards = settings.farmingRewards.essence[level];
                const purpleEquivalentFromRewards = rewards.purple + (rewards.blue / 3) + (rewards.green / 9);
                
                if (purpleEquivalentFromRewards > 0) {
                    const runsNeeded = Math.ceil(purpleEquivalentNeeded / purpleEquivalentFromRewards);
                    if (runsNeeded < bestEssenceRunsTemp || (runsNeeded === bestEssenceRunsTemp && level > bestEssenceLevel)) {
                        bestEssenceRunsTemp = runsNeeded;
                        bestEssenceLevel = level;
                    }
                }
            }
            bestEssenceRuns = (bestEssenceRunsTemp === Infinity) ? 0 : bestEssenceRunsTemp;
        }
        
        // Get stamina costs
        const bookStamina = bookRunsNeeded > 0 ? bookRunsNeeded * settings.farmingRewards.book[bestBookLevel].stamina : 0;
        const essenceStamina = bestEssenceRuns > 0 ? bestEssenceRuns * settings.farmingRewards.essence[bestEssenceLevel].stamina : 0;
        const totalStamina = bookStamina + essenceStamina;
        
        // Update labels with recommended levels
        const bookLabel = document.querySelector('#char-farming-section [data-i18n="farming.bookRuns"]');
        const essenceLabel = document.querySelector('#char-farming-section [data-i18n="farming.essenceRuns"]');
        if (bookLabel) {
            const baseText = typeof t === 'function' ? t('farming.bookRuns') : 'Book Runs (Lv.6):';
            bookLabel.textContent = baseText.replace('Lv.6', `Lv.${bestBookLevel}`);
        }
        if (essenceLabel) {
            const baseText = typeof t === 'function' ? t('farming.essenceRuns') : 'Essence Runs (Lv.6):';
            essenceLabel.textContent = baseText.replace('Lv.6', `Lv.${bestEssenceLevel}`);
        }
        
        DOMHelpers.setText('char-book-runs', bookRunsNeeded);
        DOMHelpers.setText('char-book-stamina', `(${bookStamina} stamina)`);
        DOMHelpers.setText('char-essence-runs', bestEssenceRuns);
        DOMHelpers.setText('char-essence-stamina', `(${essenceStamina} stamina)`);
        DOMHelpers.setText('char-total-stamina', totalStamina);
        
        farmingSection.style.display = 'block';
    } else {
        if (farmingSection) farmingSection.style.display = 'none';
    }
}

function calculateWeapon() {
    const currentLevel = parseInt(document.getElementById('weapon-current-level').value);
    const targetLevel = parseInt(document.getElementById('weapon-target-level').value);
    const greenTamahagane = parseInt(document.getElementById('weapon-green-tamahagane').value) || 0;
    const blueTamahagane = parseInt(document.getElementById('weapon-blue-tamahagane').value) || 0;
    const purpleTamahagane = parseInt(document.getElementById('weapon-purple-tamahagane').value) || 0;
    const yellowTamahagane = parseInt(document.getElementById('weapon-yellow-tamahagane').value) || 0;
    const ownedHammers = {
        green: parseFloat(document.getElementById('weapon-green-hammers').value) || 0,
        blue: parseFloat(document.getElementById('weapon-blue-hammers').value) || 0,
        purple: parseFloat(document.getElementById('weapon-purple-hammers').value) || 0
    };

    const tamahaganeExp = settings.weapon.tamahaganeExp;
    const availableExp =
        greenTamahagane * tamahaganeExp.green +
        blueTamahagane * tamahaganeExp.blue +
        purpleTamahagane * tamahaganeExp.purple +
        yellowTamahagane * tamahaganeExp.yellow;

    const results = document.getElementById('weapon-results');
    if (results) results.classList.remove('show');

    if (targetLevel <= currentLevel) {
        return;
    }

    let hammerNeeded = { green: 0, blue: 0, purple: 0 };
    LEVEL_BRACKETS.forEach(seg => {
        if (currentLevel < seg.to && targetLevel > seg.from) {
            const costs = settings.weapon.hammers[seg.key];
            hammerNeeded.green += costs.green;
            hammerNeeded.blue += costs.blue;
            hammerNeeded.purple += costs.purple;
        }
    });

    const hammerMissing = {
        green: Math.max(0, hammerNeeded.green - ownedHammers.green),
        blue: Math.max(0, hammerNeeded.blue - ownedHammers.blue),
        purple: Math.max(0, hammerNeeded.purple - ownedHammers.purple)
    };

    // Display hammers status
    const totalHammersOwned = ownedHammers.green + ownedHammers.blue + ownedHammers.purple;
    const totalMaterials = hammerNeeded.green + hammerNeeded.blue + hammerNeeded.purple;
    if (totalHammersOwned >= totalMaterials) {
        const hammersMsg = typeof t === 'function' ? t('weapon.enoughHammers') : '✓ You have enough Hammers!';
        DOMHelpers.setText('weapon-hammers-status', hammersMsg);
        document.getElementById('weapon-hammers-status').style.color = '#10b981';
        DOMHelpers.show('weapon-hammers-status-container');
    } else {
        DOMHelpers.hide('weapon-hammers-status-container');
    }

    let gold = 0;
    let ascensionKans = 0;
    let tamahaganeXpRequired = 0;
    
    LEVEL_BRACKETS.forEach(seg => {
        if (currentLevel < seg.to && targetLevel > seg.from) {
            gold += settings.weapon.gold[seg.key];
            ascensionKans += settings.weapon.ascensionKans[seg.key];
        }
    });

    TAMAHAGANE_BRACKETS.forEach(seg => {
        if (currentLevel < seg.to && targetLevel > seg.from) {
            tamahaganeXpRequired += settings.weapon.tamahaganeXpCosts[seg.key];
        }
    });

    DOMHelpers.setText('weapon-total-exp-tamahagane', availableExp.toLocaleString());
    DOMHelpers.setText('weapon-total-tamahagane-xp', tamahaganeXpRequired.toLocaleString());
    
    // Display tamahagane status
    if (availableExp >= tamahaganeXpRequired) {
        const tamahaganeMsg = typeof t === 'function' ? t('weapon.enoughTamahagane') : '✓ You have enough Tamahagane!';
        DOMHelpers.setText('weapon-tamahagane-status', tamahaganeMsg);
        document.getElementById('weapon-tamahagane-status').style.color = '#10b981';
        DOMHelpers.show('weapon-tamahagane-status-container');
    } else {
        DOMHelpers.hide('weapon-tamahagane-status-container');
    }
    
    const missingExp = Math.max(0, tamahaganeXpRequired - availableExp);
    DOMHelpers.setText('weapon-missing-exp', missingExp.toLocaleString());
    
    const greenTamahaganeNeeded = Math.ceil(missingExp / settings.weapon.tamahaganeExp.green);
    const blueTamahaganeNeeded = Math.ceil(missingExp / settings.weapon.tamahaganeExp.blue);
    const purpleTamahaganeNeeded = Math.ceil(missingExp / settings.weapon.tamahaganeExp.purple);
    const yellowTamahaganeNeeded = Math.ceil(missingExp / settings.weapon.tamahaganeExp.yellow);
    
    DOMHelpers.setText('weapon-gold', gold.toLocaleString());
    DOMHelpers.setText('weapon-asc-kans', ascensionKans.toLocaleString());
    
    DOMHelpers.setHTML('weapon-tamahagane-green', `<span class="calc-main">${greenTamahaganeNeeded.toLocaleString()}</span> <span class="calc-paren">(${(greenTamahaganeNeeded * settings.weapon.tamahaganeExp.green).toLocaleString()} EXP)</span>`);
    DOMHelpers.setHTML('weapon-tamahagane-blue', `<span class="calc-main">${blueTamahaganeNeeded.toLocaleString()}</span> <span class="calc-paren">(${(blueTamahaganeNeeded * settings.weapon.tamahaganeExp.blue).toLocaleString()} EXP)</span>`);
    DOMHelpers.setHTML('weapon-tamahagane-purple', `<span class="calc-main">${purpleTamahaganeNeeded.toLocaleString()}</span> <span class="calc-paren">(${(purpleTamahaganeNeeded * settings.weapon.tamahaganeExp.purple).toLocaleString()} EXP)</span>`);
    DOMHelpers.setHTML('weapon-tamahagane-yellow', `<span class="calc-main">${yellowTamahaganeNeeded.toLocaleString()}</span> <span class="calc-paren">(${(yellowTamahaganeNeeded * settings.weapon.tamahaganeExp.yellow).toLocaleString()} EXP)</span>`);
    
    // Show/hide hammer results based on whether they're needed
    const greenResult = document.getElementById('weapon-hammers-green')?.parentElement;
    const blueResult = document.getElementById('weapon-hammers-blue')?.parentElement;
    const purpleResult = document.getElementById('weapon-hammers-purple')?.parentElement;
    
    if (hammerNeeded.green > 0) {
        const requiredText = typeof t === 'function' ? t('common.required') : '(of {0} required)';
        const filled = requiredText.replace('{0}', DOMHelpers.formatNum(hammerNeeded.green));
        document.getElementById('weapon-hammers-green').innerHTML = `<span style="color: #ff9500;">${DOMHelpers.formatNum(hammerMissing.green)}</span> <span style="color: white;">${filled}</span>`;
        if (greenResult) greenResult.style.display = '';
    } else {
        if (greenResult) greenResult.style.display = 'none';
    }
    
    if (hammerNeeded.blue > 0) {
        const requiredText = typeof t === 'function' ? t('common.required') : '(of {0} required)';
        const filled = requiredText.replace('{0}', DOMHelpers.formatNum(hammerNeeded.blue));
        document.getElementById('weapon-hammers-blue').innerHTML = `<span style="color: #ff9500;">${DOMHelpers.formatNum(hammerMissing.blue)}</span> <span style="color: white;">${filled}</span>`;
        if (blueResult) blueResult.style.display = '';
    } else {
        if (blueResult) blueResult.style.display = 'none';
    }
    
    if (hammerNeeded.purple > 0) {
        const requiredText = typeof t === 'function' ? t('common.required') : '(of {0} required)';
        const filled = requiredText.replace('{0}', DOMHelpers.formatNum(hammerNeeded.purple));
        document.getElementById('weapon-hammers-purple').innerHTML = `<span style="color: #ff9500;">${DOMHelpers.formatNum(hammerMissing.purple)}</span> <span style="color: white;">${filled}</span>`;
        if (purpleResult) purpleResult.style.display = '';
    } else {
        if (purpleResult) purpleResult.style.display = 'none';
    }
    
    if (results) results.classList.add('show');
    
    // Calculate farming runs with bidirectional conversions
    const farmingSection = document.getElementById('weapon-farming-section');
    
    if (targetLevel > currentLevel && farmingSection) {
        // Calculate hammers with bidirectional conversions
        let hammerDeficit = {
            green: hammerMissing.green,
            blue: hammerMissing.blue,
            purple: hammerMissing.purple
        };
        
        // Track excess of each color
        let excessGreen = Math.max(0, ownedHammers.green - hammerNeeded.green);
        let excessBlue = Math.max(0, ownedHammers.blue - hammerNeeded.blue);
        let excessPurple = Math.max(0, ownedHammers.purple - hammerNeeded.purple);
        
        // Downgrade: purple → blue → green
        if (hammerDeficit.blue > 0 && excessPurple > 0) {
            const purpleToUse = Math.min(excessPurple, Math.ceil(hammerDeficit.blue / 3));
            hammerDeficit.blue = Math.max(0, hammerDeficit.blue - (purpleToUse * 3));
            excessPurple -= purpleToUse;
        }
        
        if (hammerDeficit.green > 0 && excessPurple > 0) {
            const purpleToUse = Math.min(excessPurple, Math.ceil(hammerDeficit.green / 9));
            hammerDeficit.green = Math.max(0, hammerDeficit.green - (purpleToUse * 9));
            excessPurple -= purpleToUse;
        }
        
        if (hammerDeficit.green > 0 && excessBlue > 0) {
            const blueToUse = Math.min(excessBlue, Math.ceil(hammerDeficit.green / 3));
            hammerDeficit.green = Math.max(0, hammerDeficit.green - (blueToUse * 3));
            excessBlue -= blueToUse;
        }
        
        // Upgrade: green → blue → purple
        if (hammerDeficit.blue > 0 && excessGreen > 0) {
            const greenNeeded = Math.ceil(hammerDeficit.blue * 3);
            const greenToUse = Math.min(excessGreen, greenNeeded);
            const blueFromGreen = Math.floor(greenToUse / 3);
            hammerDeficit.blue = Math.max(0, hammerDeficit.blue - blueFromGreen);
            excessGreen -= blueFromGreen * 3;
        }
        
        if (hammerDeficit.purple > 0 && excessGreen > 0) {
            const greenNeeded = Math.ceil(hammerDeficit.purple * 9);
            const greenToUse = Math.min(excessGreen, greenNeeded);
            const purpleFromGreen = Math.floor(greenToUse / 9);
            hammerDeficit.purple = Math.max(0, hammerDeficit.purple - purpleFromGreen);
            excessGreen -= purpleFromGreen * 9;
        }
        
        if (hammerDeficit.purple > 0 && excessBlue > 0) {
            const blueNeeded = Math.ceil(hammerDeficit.purple * 3);
            const blueToUse = Math.min(excessBlue, blueNeeded);
            const purpleFromBlue = Math.floor(blueToUse / 3);
            hammerDeficit.purple = Math.max(0, hammerDeficit.purple - purpleFromBlue);
            excessBlue -= purpleFromBlue * 3;
        }
        
        // Calculate hammer farming runs using purple equivalent
        let bestHammerLevel = 6;
        let bestHammerRuns = 0;
        const hammerPurpleEquivalentNeeded = (hammerDeficit.green / 9) + (hammerDeficit.blue / 3) + hammerDeficit.purple;
        
        if (hammerPurpleEquivalentNeeded > 0) {
            let bestHammerRunsTemp = Infinity;
            for (let level = 1; level <= 6; level++) {
                const rewards = settings.farmingRewards.hammer[level];
                const purpleEquivalentFromRewards = rewards.purple + (rewards.blue / 3) + (rewards.green / 9);
                
                if (purpleEquivalentFromRewards > 0) {
                    const runsNeeded = Math.ceil(hammerPurpleEquivalentNeeded / purpleEquivalentFromRewards);
                    if (runsNeeded < bestHammerRunsTemp || (runsNeeded === bestHammerRunsTemp && level > bestHammerLevel)) {
                        bestHammerRunsTemp = runsNeeded;
                        bestHammerLevel = level;
                    }
                }
            }
            bestHammerRuns = (bestHammerRunsTemp === Infinity) ? 0 : bestHammerRunsTemp;
        }
        
        // For tamahagane, use XP-based calculation (non-convertible)
        let tamahaganeRunsNeeded = 0;
        let bestTamahaganeLevel = 6;
        
        if (missingExp > 0) {
            let bestTamahaganeRuns = Infinity;
            for (let level = 1; level <= 6; level++) {
                const rewards = settings.farmingRewards.tamahagane[level];
                const totalXP = (rewards.green * settings.weapon.tamahaganeExp.green) + 
                              (rewards.blue * settings.weapon.tamahaganeExp.blue) + 
                              (rewards.purple * settings.weapon.tamahaganeExp.purple) + 
                              (rewards.yellow * settings.weapon.tamahaganeExp.yellow);
                
                if (totalXP > 0) {
                    const runsNeeded = Math.ceil(missingExp / totalXP);
                    if (runsNeeded < bestTamahaganeRuns || (runsNeeded === bestTamahaganeRuns && level > bestTamahaganeLevel)) {
                        bestTamahaganeRuns = runsNeeded;
                        bestTamahaganeLevel = level;
                    }
                }
            }
            tamahaganeRunsNeeded = (bestTamahaganeRuns === Infinity) ? 0 : bestTamahaganeRuns;
        }
        
        const hammerStamina = bestHammerRuns > 0 ? bestHammerRuns * settings.farmingRewards.hammer[bestHammerLevel].stamina : 0;
        const tamahaganeStamina = tamahaganeRunsNeeded > 0 ? tamahaganeRunsNeeded * settings.farmingRewards.tamahagane[bestTamahaganeLevel].stamina : 0;
        const totalStamina = hammerStamina + tamahaganeStamina;
        
        // Update labels
        const hammerLabel = document.querySelector('#weapon-farming-section [data-i18n="farming.hammerRuns"]');
        const tamahaganeLabel = document.querySelector('#weapon-farming-section [data-i18n="farming.tamahaganeRuns"]');
        if (hammerLabel) {
            const baseText = typeof t === 'function' ? t('farming.hammerRuns') : 'Hammer Runs (Lv.6):';
            hammerLabel.textContent = baseText.replace('Lv.6', `Lv.${bestHammerLevel}`);
        }
        if (tamahaganeLabel) {
            const baseText = typeof t === 'function' ? t('farming.tamahaganeRuns') : 'Tamahagane Runs (Lv.6):';
            tamahaganeLabel.textContent = baseText.replace('Lv.6', `Lv.${bestTamahaganeLevel}`);
        }
        
        DOMHelpers.setText('weapon-hammer-runs', bestHammerRuns);
        DOMHelpers.setText('weapon-hammer-stamina', `(${hammerStamina} stamina)`);
        DOMHelpers.setText('weapon-tamahagane-runs', tamahaganeRunsNeeded);
        DOMHelpers.setText('weapon-tamahagane-stamina', `(${tamahaganeStamina} stamina)`);
        DOMHelpers.setText('weapon-total-stamina', totalStamina);
        
        farmingSection.style.display = 'block';
    } else {
        if (farmingSection) farmingSection.style.display = 'none';
    }
}

function calculateSkill() {
    const currentLevel = parseInt(document.getElementById('skill-current-level').value);
    const targetLevel = parseInt(document.getElementById('skill-target-level').value);
    const greenArtOwned = parseInt(document.getElementById('skill-green-art-owned').value) || 0;
    const blueArtOwned = parseInt(document.getElementById('skill-blue-art-owned').value) || 0;
    const purpleArtOwned = parseInt(document.getElementById('skill-purple-art-owned').value) || 0;

    // Get selected skill types
    const selectedTypes = [];
    if (document.getElementById('skill-type-basic').checked) selectedTypes.push('basic-attack');
    if (document.getElementById('skill-type-technique').checked) selectedTypes.push('technique');
    if (document.getElementById('skill-type-counter').checked) selectedTypes.push('counter');
    if (document.getElementById('skill-type-ultimate').checked) selectedTypes.push('ultimate');

    const results = document.getElementById('skill-results');

    if (targetLevel <= currentLevel) {
        DOMHelpers.setText('skill-green-art', '0');
        DOMHelpers.setText('skill-blue-art', '0');
        DOMHelpers.setText('skill-purple-art', '0');
        DOMHelpers.setText('skill-kans', '0');
        if (results) results.classList.remove('show');
        updateSkillFarmingSection();
        return;
    }

    if (selectedTypes.length === 0) {
        DOMHelpers.setText('skill-green-art', '0');
        DOMHelpers.setText('skill-blue-art', '0');
        DOMHelpers.setText('skill-purple-art', '0');
        DOMHelpers.setText('skill-kans', '0');
        if (results) results.classList.add('show');
        updateSkillFarmingSection();
        return;
    }
    const skillRequirements = getSkillRequirements();
    let totalGreen = 0, totalBlue = 0, totalPurple = 0, totalKans = 0;

    for (let level = currentLevel + 1; level <= targetLevel; level++) {
        const req = skillRequirements[level];
        totalGreen += req.greenArt * selectedTypes.length;
        totalBlue += req.blueArt * selectedTypes.length;
        totalPurple += req.purpleArt * selectedTypes.length;
        totalKans += req.kans * selectedTypes.length;
    }

    const missingGreen = Math.max(0, totalGreen - greenArtOwned);
    const missingBlue = Math.max(0, totalBlue - blueArtOwned);
    const missingPurple = Math.max(0, totalPurple - purpleArtOwned);

    DOMHelpers.setText('skill-green-art', missingGreen.toFixed(2));
    DOMHelpers.setText('skill-blue-art', missingBlue.toFixed(2));
    DOMHelpers.setText('skill-purple-art', missingPurple.toFixed(2));
    DOMHelpers.setText('skill-kans', totalKans.toLocaleString());

    if (results) results.classList.add('show');
    
    // Update farming section (includes both active skills and passives)
    updateSkillFarmingSection();
}

function getTotalPassiveOmamori() {
    let total = 0;
    
    // Sum up omamori from all three passives
    for (let i = 1; i <= 3; i++) {
        const omamoriElement = document.getElementById(`passive${i}-omamori`);
        if (omamoriElement) {
            const value = parseInt(omamoriElement.textContent) || 0;
            total += value;
        }
    }
    
    return total;
}

function updateSkillFarmingSection() {
    // This function updates the farming section to reflect both active skills and passives
    const farmingSection = document.getElementById('skill-farming-section');
    if (!farmingSection) return;
    showFarmingSection();
    
    const currentLevel = parseInt(document.getElementById('skill-current-level').value);
    const targetLevel = parseInt(document.getElementById('skill-target-level').value);
    const selectedTypes = Array.from(document.querySelectorAll('.skill-checkbox:checked')).map(cb => cb.value);
    const omamoriOwned = parseFloat(document.getElementById('passive-omamori-owned')?.value) || 0;
    
    // Check if there are any active skill upgrades or passive upgrades
    const hasSkillUpgrades = (targetLevel > currentLevel && selectedTypes.length > 0);
    const totalPassiveOmamori = getTotalPassiveOmamori();
    const hasPassiveUpgrades = totalPassiveOmamori > 0;
    const hasOmamoriInput = omamoriOwned > 0;

    // Detect if any passive target level is above current (so the panel should open even if owned covers the need)
    const passiveTargets = [1, 2, 3].map(i => ({
        current: parseInt(document.getElementById(`passive${i}-current-level`)?.value || '0'),
        target: parseInt(document.getElementById(`passive${i}-target-level`)?.value || '0'),
        enabled: i !== 3 || document.getElementById('passive3-toggle')?.checked !== false
    }));
    const hasPassiveTargets = passiveTargets.some(p => p.enabled && p.target > p.current);
    
    if (hasSkillUpgrades || hasPassiveUpgrades || hasOmamoriInput || hasPassiveTargets) {
        // Art calculation (from active skills)
        let bestArtRuns = 0;
        let bestArtLevel = 6;
        let artStamina = 0;
        
        if (hasSkillUpgrades) {
            const greenArtOwned = parseFloat(document.getElementById('skill-green-art-owned').value) || 0;
            const blueArtOwned = parseFloat(document.getElementById('skill-blue-art-owned').value) || 0;
            const purpleArtOwned = parseFloat(document.getElementById('skill-purple-art-owned').value) || 0;
            
            const skillRequirements = getSkillRequirements();
            let totalGreen = 0, totalBlue = 0, totalPurple = 0;
            
            for (let level = currentLevel + 1; level <= targetLevel; level++) {
                const req = skillRequirements[level];
                totalGreen += req.greenArt * selectedTypes.length;
                totalBlue += req.blueArt * selectedTypes.length;
                totalPurple += req.purpleArt * selectedTypes.length;
            }
            
            const neededEquivalent = (totalGreen / 9) + (totalBlue / 3) + totalPurple;
            const ownedEquivalent = (greenArtOwned / 9) + (blueArtOwned / 3) + purpleArtOwned;
            const purpleEquivalentNeeded = Math.max(0, neededEquivalent - ownedEquivalent);
            
            if (purpleEquivalentNeeded > 0) {
                let bestArtRunsTemp = Infinity;
                for (let level = 1; level <= 6; level++) {
                    const rewards = settings.farmingRewards.art[level];
                    const purpleEquivalentFromRewards = rewards.purple + (rewards.blue / 3) + (rewards.green / 9);
                    
                    if (purpleEquivalentFromRewards > 0) {
                        const runsNeeded = Math.ceil(purpleEquivalentNeeded / purpleEquivalentFromRewards);
                        if (runsNeeded < bestArtRunsTemp || (runsNeeded === bestArtRunsTemp && level > bestArtLevel)) {
                            bestArtRunsTemp = runsNeeded;
                            bestArtLevel = level;
                        }
                    }
                }
                bestArtRuns = (bestArtRunsTemp === Infinity) ? 0 : bestArtRunsTemp;
            }
            
            artStamina = bestArtRuns > 0 ? bestArtRuns * settings.farmingRewards.art[bestArtLevel].stamina : 0;
        }
        
        // Omamori calculation (from passives)
        let bestOmamoriRuns = 0;
        let bestOmamoriLevel = 6;
        let omamoriStamina = 0;
        
        if (totalPassiveOmamori > 0) {
            // Get owned omamori (single purple tier)
            const omamoriNeeded = Math.max(0, totalPassiveOmamori - omamoriOwned);
            
            if (omamoriNeeded > 0) {
                let bestOmamoriRunsTemp = Infinity;
                for (let level = 1; level <= 6; level++) {
                    const rewards = settings.farmingRewards.omamori[level];
                    const omamoriPerRun = rewards.yellow;
                    
                    if (omamoriPerRun > 0) {
                        const runsNeeded = Math.ceil(omamoriNeeded / omamoriPerRun);
                        if (runsNeeded < bestOmamoriRunsTemp || (runsNeeded === bestOmamoriRunsTemp && level > bestOmamoriLevel)) {
                            bestOmamoriRunsTemp = runsNeeded;
                            bestOmamoriLevel = level;
                        }
                    }
                }
                bestOmamoriRuns = (bestOmamoriRunsTemp === Infinity) ? 0 : bestOmamoriRunsTemp;
            }
            omamoriStamina = bestOmamoriRuns > 0 ? bestOmamoriRuns * settings.farmingRewards.omamori[bestOmamoriLevel].stamina : 0;
        }
        
        const totalStamina = artStamina + omamoriStamina;
        
        // Update labels with recommended levels
        const artLabel = document.querySelector('#skill-farming-section [data-i18n="farming.artRuns"]');
        const omamoriLabel = document.querySelector('#skill-farming-section [data-i18n="farming.omamoriRuns"]');
        if (artLabel) {
            const baseText = typeof t === 'function' ? t('farming.artRuns') : 'Art Runs (Lv.6):';
            artLabel.textContent = baseText.replace('Lv.6', `Lv.${bestArtLevel}`);
        }
        if (omamoriLabel) {
            const baseText = typeof t === 'function' ? t('farming.omamoriRuns') : 'Omamori Runs (Lv.6):';
            omamoriLabel.textContent = baseText.replace('Lv.6', `Lv.${bestOmamoriLevel}`);
        }
        
        DOMHelpers.setText('skill-art-runs', bestArtRuns);
        DOMHelpers.setText('skill-art-stamina', `(${artStamina} stamina)`);
        DOMHelpers.setText('skill-omamori-runs', bestOmamoriRuns);
        DOMHelpers.setText('skill-omamori-stamina', `(${omamoriStamina} stamina)`);
        DOMHelpers.setText('skill-total-stamina', totalStamina);
        
        // panel is always visible; nothing to hide here
    }

    // Safety: ensure the panel stays visible even if upstream styles interfere
    showFarmingSection();
}

// Helper to force show the farming panel and scroll it into view
function showFarmingSection() {
    const farmingSection = document.getElementById('skill-farming-section');
    const skillResults = document.getElementById('skill-results');
    // The farming panel lives inside #skill-results, which defaults to display:none unless
    // the "show" class is present. Passive-only flows can hide it (e.g., when skill target
    // equals current), so force it visible whenever we reveal the farming panel.
    if (skillResults) {
        skillResults.classList.add('show');
    }
    if (!farmingSection) return;
    farmingSection.removeAttribute('hidden');
    farmingSection.hidden = false;
    farmingSection.classList.remove('hidden', 'collapse', 'collapsed');
    farmingSection.style.setProperty('display', 'block', 'important');
    farmingSection.style.visibility = 'visible';
    farmingSection.style.opacity = '1';
    farmingSection.style.height = 'auto';
    farmingSection.style.maxHeight = 'none';
    farmingSection.style.overflow = 'visible';
    farmingSection.ariaHidden = 'false';
    // Unhide any hidden ancestors (tab containers)
    let parent = farmingSection.parentElement;
    while (parent && parent !== document.body) {
        if (parent.hasAttribute('hidden')) parent.removeAttribute('hidden');
        parent.hidden = false;
        if (parent.style && parent.style.display === 'none') {
            parent.style.setProperty('display', 'block', 'important');
        }
        parent = parent.parentElement;
    }
    // Scroll into view when triggered by passive/omamori changes
    // Smooth scroll to the panel; retry on next frame to handle layout shifts
    const scrollToPanel = () => farmingSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    scrollToPanel();
    requestAnimationFrame(scrollToPanel);
}

// Expose helpers for inline handlers
window.showFarmingSection = showFarmingSection;
window.updatePassivesFarmingSection = updatePassivesFarmingSection;

// Wrapper to clarify intent when farming updates are driven by passive inputs
function updatePassivesFarmingSection() {
    updateSkillFarmingSection();
}

function calculatePassive(passiveNum) {
    const currentLevel = parseInt(document.getElementById(`passive${passiveNum}-current-level`).value);
    const targetLevel = parseInt(document.getElementById(`passive${passiveNum}-target-level`).value);

    if (targetLevel <= currentLevel) {
        DOMHelpers.setText(`passive${passiveNum}-omamori`, '0');
        DOMHelpers.setText(`passive${passiveNum}-kans`, '0');
        updatePassivesFarmingSection();
        showFarmingSection();
        return;
    }

    const passiveRequirements = getPassiveRequirements(passiveNum);
    let totalOmamori = 0, totalKans = 0;

    for (let level = currentLevel + 1; level <= targetLevel; level++) {
        const req = passiveRequirements[level];
        totalOmamori += req.omamori;
        totalKans += req.kans;
    }

    DOMHelpers.setText(`passive${passiveNum}-omamori`, totalOmamori);
    DOMHelpers.setText(`passive${passiveNum}-kans`, totalKans.toLocaleString());
    updatePassivesFarmingSection();
    showFarmingSection();
}

// Generic toggle conversion function for all tabs
function toggleConversion(suffix = '') {
    const contentId = suffix ? `conversion-content-${suffix}` : 'conversion-content';
    const arrowId = suffix ? `conversion-arrow-${suffix}` : 'conversion-arrow';
    const tileId = suffix ? `conversion-tile-${suffix}` : 'conversion-tile';
    
    const content = document.getElementById(contentId);
    const arrow = document.getElementById(arrowId);
    const tile = document.getElementById(tileId);
    
    if (!content || !arrow || !tile) return;
    
    const isHidden = content.style.display === 'none';
    content.style.display = isHidden ? 'block' : 'none';
    arrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(-90deg)';
    tile.style.padding = isHidden ? '25px' : '15px 25px';
    content.style.marginTop = isHidden ? '20px' : '0';
}

// Compatibility functions for existing HTML calls
function toggleConversionChar() { toggleConversion('char'); }
function toggleConversionWeapon() { toggleConversion('weapon'); }

function initSkillsUI() {
    const tableBody = document.getElementById('skill-table-body');
    const skillRequirements = getSkillRequirements();
    if (!tableBody) return;
    
    for (let level = 1; level <= 9; level++) {
        const req = skillRequirements[level];
        const row = document.createElement('tr');
        row.style.cssText = 'border: 1px solid #ddd;';
        
        const greenDisplay = req.greenArt > 0 ? req.greenArt.toFixed(2) : '-';
        const blueDisplay = req.blueArt > 0 ? req.blueArt.toFixed(2) : '-';
        const purpleDisplay = req.purpleArt > 0 ? req.purpleArt.toFixed(2) : '-';
        const kansDisplay = req.kans > 0 ? req.kans.toLocaleString() : '-';
        
        row.innerHTML = `
            <td style="padding: 10px; border: 1px solid #ddd;">${level}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${greenDisplay}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${blueDisplay}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${purpleDisplay}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${kansDisplay}</td>
        `;
        tableBody.appendChild(row);
    }
    
    // Toggle passive 3 warning
    if (typeof togglePassive3Warning === 'function') {
        togglePassive3Warning();
    }
    
    // Initial calculations
    calculateSkill();
    calculatePassive(1);
    calculatePassive(2);
    calculatePassive(3);
    updateSkillFarmingSection();
    showFarmingSection();
}

function togglePassive3Warning() {
    const targetLevel = document.getElementById('passive3-target-level');
    const warning = document.getElementById('passive3-warning');
    if (!targetLevel || !warning) return;
    warning.style.display = targetLevel.value === '3' ? 'block' : 'none';
}

// Unified event delegation - consolidate input and change events
document.addEventListener('input', handleSkillArtInput);
document.addEventListener('change', handleSkillArtChange);

function handleSkillArtInput(e) {
    // Handle skill level selects
    if (e.target.id === 'skill-current-level' || e.target.id === 'skill-target-level') {
        const max = parseInt(e.target.max);
        const min = parseInt(e.target.min);
        let value = parseInt(e.target.value);
        if (value > max) e.target.value = max;
        if (value < min) e.target.value = min;
        calculateSkill();
    }
    // Handle arts owned inputs
    else if (['skill-green-art-owned', 'skill-blue-art-owned', 'skill-purple-art-owned'].includes(e.target.id)) {
        calculateSkill();
    }
    // Handle omamori owned input (update immediately on typing)
    else if (e.target.id === 'passive-omamori-owned') {
        updatePassivesFarmingSection();
        showFarmingSection();
    }
}

function handleSkillArtChange(e) {
    // Handle skill level selects
    if (e.target.id === 'skill-current-level' || e.target.id === 'skill-target-level') {
        const max = parseInt(e.target.max);
        const min = parseInt(e.target.min);
        let value = parseInt(e.target.value);
        if (value > max) e.target.value = max;
        if (value < min) e.target.value = min;
        calculateSkill();
    }
    // Handle arts owned inputs
    else if (['skill-green-art-owned', 'skill-blue-art-owned', 'skill-purple-art-owned'].includes(e.target.id)) {
        calculateSkill();
    }
    // Handle omamori owned input
    else if (e.target.id === 'passive-omamori-owned') {
        updatePassivesFarmingSection();
        showFarmingSection();
    }
    // Handle skill type checkboxes
    else if (['skill-type-basic', 'skill-type-technique', 'skill-type-counter', 'skill-type-ultimate'].includes(e.target.id)) {
        calculateSkill();
    }
    // Handle passive level changes
    else if (e.target.id === 'passive1-current-level' || e.target.id === 'passive1-target-level') {
        calculatePassive(1);
        showFarmingSection();
    }
    else if (e.target.id === 'passive2-current-level' || e.target.id === 'passive2-target-level') {
        calculatePassive(2);
        showFarmingSection();
    }
    else if (e.target.id === 'passive3-current-level' || e.target.id === 'passive3-target-level') {
        if (document.getElementById('passive3-toggle').checked) {
            calculatePassive(3);
            showFarmingSection();
        }
    }
    else if (e.target.id === 'passive3-toggle') {
        handlePassive3Toggle(e.target);
        showFarmingSection();
    }
}

function handlePassive3Toggle(toggle) {
    const isEnabled = toggle.checked;
    const label = document.getElementById('passive3-toggle-label');
    const passive3CurrentLevel = document.getElementById('passive3-current-level');
    const passive3TargetLevel = document.getElementById('passive3-target-level');
    
    if (label) label.textContent = isEnabled ? 'SSR' : 'SR';
    
    if (passive3CurrentLevel) {
        passive3CurrentLevel.disabled = !isEnabled;
        passive3CurrentLevel.style.opacity = isEnabled ? '1' : '0.5';
    }
    if (passive3TargetLevel) {
        passive3TargetLevel.disabled = !isEnabled;
        passive3TargetLevel.style.opacity = isEnabled ? '1' : '0.5';
    }
    
    if (!isEnabled) {
        document.getElementById('passive3-omamori').textContent = '0';
        document.getElementById('passive3-kans').textContent = '0';
        updateSkillFarmingSection();
    } else {
        calculatePassive(3);
    }
}

// Dark mode toggle
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const lightModeMessage = document.getElementById('light-mode-message');
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    
    // Show message only in light mode
    if (lightModeMessage) {
        lightModeMessage.style.display = isDark ? 'none' : 'inline';
    }
}

// Generic function to attach event listeners to input elements
function attachCalcListeners(inputIds, calculateFunction) {
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => calculateFunction());
            element.addEventListener('change', () => calculateFunction());
        }
    });
}

// Initialize character tab with real-time updates
function initCharacterUI() {
    const inputs = [
        'char-current-level', 'char-target-level',
        'char-green-books', 'char-blue-books', 'char-purple-books', 'char-yellow-books',
        'char-green-essences', 'char-blue-essences', 'char-purple-essences'
    ];
    attachCalcListeners(inputs, calculateCharacter);
}

// Initialize weapon tab with real-time updates
function initWeaponUI() {
    const inputs = [
        'weapon-current-level', 'weapon-target-level',
        'weapon-green-tamahagane', 'weapon-blue-tamahagane', 'weapon-purple-tamahagane', 'weapon-yellow-tamahagane',
        'weapon-green-hammers', 'weapon-blue-hammers', 'weapon-purple-hammers'
    ];
    attachCalcListeners(inputs, calculateWeapon);
}

// Enable mouse wheel scrolling on number inputs with real-time updates
document.addEventListener('wheel', (e) => {
    if (e.target.type === 'number') {
        e.preventDefault();
        const input = e.target;
        const step = parseFloat(input.step) || 1;
        const currentValue = parseFloat(input.value) || 0;
        const minValue = parseFloat(input.min) !== null && input.min !== '' ? parseFloat(input.min) : -Infinity;
        const maxValue = parseFloat(input.max) !== null && input.max !== '' ? parseFloat(input.max) : Infinity;
        
        if (e.deltaY < 0) {
            // Scroll up - increase
            const newValue = currentValue + step;
            input.value = Math.min(maxValue, Math.max(minValue, newValue));
        } else {
            // Scroll down - decrease
            const newValue = currentValue - step;
            input.value = Math.max(minValue, Math.min(maxValue, newValue));
        }
        
        // Trigger change event for real-time updates
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    // Enable mouse wheel scrolling on level select dropdowns (Character, Weapon, and Skills tabs)
    else if (e.target.tagName === 'SELECT' && 
             (e.target.id === 'char-current-level' || e.target.id === 'char-target-level' ||
              e.target.id === 'weapon-current-level' || e.target.id === 'weapon-target-level' ||
              e.target.id === 'skill-current-level' || e.target.id === 'skill-target-level')) {
        e.preventDefault();
        const select = e.target;
        const currentIndex = select.selectedIndex;
        
        if (e.deltaY < 0 && currentIndex < select.options.length - 1) {
            // Scroll up - increase level
            select.selectedIndex = currentIndex + 1;
        } else if (e.deltaY > 0 && currentIndex > 0) {
            // Scroll down - decrease level
            select.selectedIndex = currentIndex - 1;
        }
        
        // Trigger change event for real-time updates
        select.dispatchEvent(new Event('change', { bubbles: true }));
    }
}, { passive: false });

// Calculate farming runs needed
function calculateFarmingRuns(materialsNeeded, materialsOwned, farmingType1, farmingType2) {
    // Helper function to calculate deficit after considering conversions from owned materials
    function calculateDeficitWithOwnedConversions(needed, owned) {
        // Start with what we own
        let availableGreen = owned.green || 0;
        let availableBlue = owned.blue || 0;
        let availablePurple = owned.purple || 0;
        let availableYellow = owned.yellow || 0;
        
        // Calculate what we need
        const needGreen = needed.green || 0;
        const needBlue = needed.blue || 0;
        const needPurple = needed.purple || 0;
        const needYellow = needed.yellow || 0;
        
        // First, use direct matches (no conversion needed)
        let remainingGreen = Math.max(0, needGreen - availableGreen);
        let remainingBlue = Math.max(0, needBlue - availableBlue);
        let remainingPurple = Math.max(0, needPurple - availablePurple);
        let remainingYellow = Math.max(0, needYellow - availableYellow);
        
        // Calculate excess materials that could be converted
        let excessGreen = Math.max(0, availableGreen - needGreen);
        let excessBlue = Math.max(0, availableBlue - needBlue);
        let excessPurple = Math.max(0, availablePurple - needPurple);
        
        // Now apply conversions from excess owned materials (downgrade only: purple→blue/green, blue→green)
        // Can we convert excess purple to blue?
        if (remainingBlue > 0 && excessPurple > 0) {
            const purpleToUse = Math.min(excessPurple, Math.ceil(remainingBlue / 3));
            const blueFromPurple = purpleToUse * 3;
            remainingBlue = Math.max(0, remainingBlue - blueFromPurple);
            excessPurple -= purpleToUse;
        }
        
        // Can we convert excess purple to green?
        if (remainingGreen > 0 && excessPurple > 0) {
            const purpleToUse = Math.min(excessPurple, Math.ceil(remainingGreen / 9));
            const greenFromPurple = purpleToUse * 9;
            remainingGreen = Math.max(0, remainingGreen - greenFromPurple);
            excessPurple -= purpleToUse;
        }
        
        // Can we convert excess blue to green?
        if (remainingGreen > 0 && excessBlue > 0) {
            const blueToUse = Math.min(excessBlue, Math.ceil(remainingGreen / 3));
            const greenFromBlue = blueToUse * 3;
            remainingGreen = Math.max(0, remainingGreen - greenFromBlue);
            excessBlue -= blueToUse;
        }
        
        return {
            green: remainingGreen,
            blue: remainingBlue,
            purple: remainingPurple,
            yellow: remainingYellow
        };
    }
    
    // Material types that support conversion (purple <-> blue <-> green)
    const convertibleTypes = ['essence', 'art', 'hammer'];
    
    // Calculate actual deficit after considering owned materials + conversions
    // Only apply conversions for essence, art, hammer (not books, tamahagane, omamori)
    const deficit1 = convertibleTypes.includes(farmingType1) 
        ? calculateDeficitWithOwnedConversions(materialsNeeded[farmingType1], materialsOwned[farmingType1])
        : {
            green: Math.max(0, (materialsNeeded[farmingType1]?.green || 0) - (materialsOwned[farmingType1]?.green || 0)),
            blue: Math.max(0, (materialsNeeded[farmingType1]?.blue || 0) - (materialsOwned[farmingType1]?.blue || 0)),
            purple: Math.max(0, (materialsNeeded[farmingType1]?.purple || 0) - (materialsOwned[farmingType1]?.purple || 0)),
            yellow: Math.max(0, (materialsNeeded[farmingType1]?.yellow || 0) - (materialsOwned[farmingType1]?.yellow || 0))
        };
    const deficit2 = convertibleTypes.includes(farmingType2)
        ? calculateDeficitWithOwnedConversions(materialsNeeded[farmingType2], materialsOwned[farmingType2])
        : {
            green: Math.max(0, (materialsNeeded[farmingType2]?.green || 0) - (materialsOwned[farmingType2]?.green || 0)),
            blue: Math.max(0, (materialsNeeded[farmingType2]?.blue || 0) - (materialsOwned[farmingType2]?.blue || 0)),
            purple: Math.max(0, (materialsNeeded[farmingType2]?.purple || 0) - (materialsOwned[farmingType2]?.purple || 0)),
            yellow: Math.max(0, (materialsNeeded[farmingType2]?.yellow || 0) - (materialsOwned[farmingType2]?.yellow || 0))
        };
    
    // Helper function to calculate total material need accounting for future conversions
    // This is for choosing which level to farm
    function calculateEquivalentPurple(deficit) {
        const purpleFromGreen = deficit.green / 9;
        const purpleFromBlue = deficit.blue / 3;
        const purpleFromPurple = deficit.purple;
        return purpleFromGreen + purpleFromBlue + purpleFromPurple;
    }
    
    // Helper function to find best level accounting for conversions
    function findBestLevelWithConversion(deficit, farmingType) {
        let bestLevel = 6;
        let bestRunsNeeded = Infinity;
        
        // If no deficit, return 0 runs
        const totalDeficit = deficit.green + deficit.blue + deficit.purple + (deficit.yellow || 0);
        if (totalDeficit === 0) {
            return { level: 6, runs: 0 };
        }
        
        const isConvertible = convertibleTypes.includes(farmingType);
        
        // Try each difficulty level
        for (let level = 1; level <= 6; level++) {
            const rewards = settings.farmingRewards[farmingType][level];
            let runsNeeded = 0;
            
            if (isConvertible) {
                // For convertible materials (essence, art, hammer): use purple equivalent
                const purpleEquivalentNeeded = calculateEquivalentPurple(deficit);
                const purpleEquivalentFromRewards = rewards.purple + (rewards.blue / 3) + (rewards.green / 9);
                
                if (purpleEquivalentNeeded > 0 && purpleEquivalentFromRewards > 0) {
                    runsNeeded = Math.ceil(purpleEquivalentNeeded / purpleEquivalentFromRewards);
                } else if (purpleEquivalentNeeded > 0) {
                    runsNeeded = Infinity;
                }
            } else {
                // For non-convertible materials (books, tamahagane, omamori): calculate each color separately
                const greenNeeded = deficit.green || 0;
                const blueNeeded = deficit.blue || 0;
                const purpleNeeded = deficit.purple || 0;
                const yellowNeeded = deficit.yellow || 0;
                
                // Calculate runs needed for each color independently
                if (greenNeeded > 0) {
                    if (rewards.green > 0) {
                        runsNeeded = Math.max(runsNeeded, Math.ceil(greenNeeded / rewards.green));
                    } else {
                        runsNeeded = Infinity;
                    }
                }
                if (blueNeeded > 0) {
                    if (rewards.blue > 0) {
                        runsNeeded = Math.max(runsNeeded, Math.ceil(blueNeeded / rewards.blue));
                    } else {
                        runsNeeded = Infinity;
                    }
                }
                if (purpleNeeded > 0) {
                    if (rewards.purple > 0) {
                        runsNeeded = Math.max(runsNeeded, Math.ceil(purpleNeeded / rewards.purple));
                    } else {
                        runsNeeded = Infinity;
                    }
                }
                if (yellowNeeded > 0) {
                    if (rewards.yellow > 0) {
                        runsNeeded = Math.max(runsNeeded, Math.ceil(yellowNeeded / rewards.yellow));
                    } else {
                        runsNeeded = Infinity;
                    }
                }
            }
            
            // Prefer fewer runs (most efficient), and prefer higher level on ties
            if (runsNeeded < bestRunsNeeded || (runsNeeded === bestRunsNeeded && level > bestLevel)) {
                bestRunsNeeded = runsNeeded;
                bestLevel = level;
            }
        }
        
        return { level: bestLevel, runs: bestRunsNeeded };
    }
    
    // Find best levels for each material type
    const result1 = findBestLevelWithConversion(deficit1, farmingType1);
    const result2 = findBestLevelWithConversion(deficit2, farmingType2);
    
    const rewards1 = settings.farmingRewards[farmingType1][result1.level];
    const rewards2 = settings.farmingRewards[farmingType2][result2.level];
    
    const stamina1 = result1.runs * rewards1.stamina;
    const stamina2 = result2.runs * rewards2.stamina;
    
    return {
        [farmingType1]: { runs: result1.runs, stamina: stamina1, level: result1.level },
        [farmingType2]: { runs: result2.runs, stamina: stamina2, level: result2.level },
        totalStamina: stamina1 + stamina2
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode') !== 'false';
    const lightModeMessage = document.getElementById('light-mode-message');
    if (darkMode) {
        document.body.classList.add('dark');
        document.getElementById('dark-mode-toggle').textContent = '☀️ Light Mode';
        if (lightModeMessage) lightModeMessage.style.display = 'none';
    } else {
        if (lightModeMessage) lightModeMessage.style.display = 'inline';
    }
    document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
    
    // Hide dashboard tab initially (only show if authenticated)
    const dashboardTab = document.querySelector('.tabs .tab:nth-child(4)');
    if (dashboardTab && sessionStorage.getItem('bsrAdminAuth') !== 'true') {
        dashboardTab.style.display = 'none';
    }
    
    // Secret keyboard shortcut to show login (Ctrl+Shift+Alt+W)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.altKey && e.key === 'W') {
            e.preventDefault();
            showLoginModal();
        }
    });
});

// Load initial tab content for character
(async function init() {
    await loadTabContent('character');
})();