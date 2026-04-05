/**
 * DarkSwitch — Zero-dependency theme switcher
 * @author Xeran <novi240397@gmail.com>
 */
class DarkSwitch {
  constructor({ persist = true, defaultTheme = 'system' } = {}) {
    this.persist = persist;
    this._listeners = [];
    this._current = this._resolve(defaultTheme);
    this._apply(this._current);
  }

  _resolve(pref) {
    if (this.persist) {
      const stored = localStorage.getItem('ds-theme');
      if (stored) return stored;
    }
    if (pref === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return pref;
  }

  _apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (this.persist) localStorage.setItem('ds-theme', theme);
    this._listeners.forEach(fn => fn(theme));
  }

  getTheme() { return this._current; }

  setTheme(theme) {
    this._current = theme;
    this._apply(theme);
  }

  toggle() {
    this.setTheme(this._current === 'dark' ? 'light' : 'dark');
  }

  onThemeChange(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  }
}

/* ── Demo wiring ── */
const ds = new DarkSwitch({ persist: true });
const btn = document.getElementById('toggle');
const icon = btn.querySelector('.icon');
const label = btn.querySelector('.label');

function syncBtn() {
  const dark = ds.getTheme() === 'dark';
  icon.textContent = dark ? '☀️' : '🌙';
  label.textContent = dark ? 'Light Mode' : 'Dark Mode';
}

btn.addEventListener('click', () => { ds.toggle(); syncBtn(); });
syncBtn();

// Listen to system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('ds-theme')) {
    ds.setTheme(e.matches ? 'dark' : 'light');
    syncBtn();
  }
});
