// data.js — constants and default settings for BSR Calculator
// Declared as top-level consts so scripts.js can reference them directly.

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

const expData = {
    1: { 20: 35792, 30: 99276, 40: 216908, 50: 421035, 60: 752613, 70: 1256584, 80: 1973318, 90: 2930463, 100: 4101463 },
    20: { 30: 63484, 40: 181116, 50: 382761, 60: 697868, 70: 1160996, 80: 1812596, 90: 2698156, 100: 3869156 },
    30: { 40: 117632, 50: 319277, 60: 634384, 70: 1097512, 80: 1749112, 90: 2634672, 100: 3805672 },
    40: { 50: 204127, 60: 516752, 70: 979880, 80: 1631480, 90: 2517040, 100: 3688040 },
    50: { 60: 331578, 70: 778235, 80: 1429835, 90: 2315395, 100: 3486395 },
    60: { 70: 503971, 80: 1114728, 90: 2000288, 100: 3171288 },
    70: { 80: 716734, 90: 1537160, 100: 2708160 },
    80: { 90: 957145, 100: 2056560 },
    90: { 100: 1171000 }
};

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
