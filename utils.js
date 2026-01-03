// utils.js — DOM helpers and small UI utilities
// Keeps DOM helper utilities and wheel/select handlers separated from main logic.

'use strict';

const DOMHelpers = {
    setText: (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
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
    formatNum: (n) => {
        if (n === null || n === undefined || Number.isNaN(n)) return '-';
        return n.toLocaleString();
    }
};

function attachWheelAndSelectHandlers() {
    document.addEventListener('wheel', function (ev) {
        const target = ev.target;
        if (!target) return;
        // Only adjust number inputs and specific level selects
        if (target.tagName === 'INPUT' && target.type === 'number') {
            ev.preventDefault();
            const step = parseFloat(target.step) || 1;
            const dir = ev.deltaY > 0 ? 1 : -1;
            const min = target.min !== '' ? parseFloat(target.min) : -Infinity;
            const max = target.max !== '' ? parseFloat(target.max) : Infinity;
            let value = parseFloat(target.value) || 0;
            value = Math.min(max, Math.max(min, value + dir * step));
            target.value = value;
            target.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (target.tagName === 'SELECT') {
            const id = target.id || '';
            if (/-(?:current|target)-level$/.test(id)) {
                ev.preventDefault();
                const dir = ev.deltaY > 0 ? 1 : -1;
                const newIndex = Math.min(target.options.length - 1, Math.max(0, target.selectedIndex + dir));
                if (newIndex !== target.selectedIndex) {
                    target.selectedIndex = newIndex;
                    target.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }
    }, { passive: false });
}

function attachCalcListeners() {
    // Placeholder: this function exists so main script can call a named registration point
    // The main `scripts.js` already wires calculate handlers; call this function if needed.
}

// Expose utilities globally for other scripts to call
window.DOMHelpers = DOMHelpers;
window.attachWheelAndSelectHandlers = attachWheelAndSelectHandlers;
window.attachCalcListeners = attachCalcListeners;
