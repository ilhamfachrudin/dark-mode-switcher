# Dark Mode Switcher

A lightweight, zero-dependency library to handle complex theme switching in web applications. Supports system preference detection, localStorage persistence, and smooth CSS variable transitions.

## Features
- < 1kb gzipped
- CSS custom properties based theming
- System preference detection (`prefers-color-scheme`)
- localStorage persistence across page reloads
- Subscribe to theme changes
- TypeScript-ready

## Usage

### Basic
```js
import { DarkSwitch } from 'dark-mode-switcher';

const ds = new DarkSwitch({ persist: true });
ds.toggle();              // Toggle between light/dark
ds.setTheme('dark');      // Force a theme
ds.getTheme();            // Returns current theme string
```

### Listen to changes
```js
const unsubscribe = ds.onThemeChange((theme) => {
  console.log('Theme changed to:', theme);
});
// Call unsubscribe() to stop listening
```

### CSS Setup
```css
[data-theme="light"] { --bg: #fff; --text: #000; }
[data-theme="dark"]  { --bg: #0a0a0f; --text: #cdd6f4; }

body { background: var(--bg); color: var(--text); transition: background 0.3s; }
```

## Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `persist` | boolean | `true` | Save theme to localStorage |
| `defaultTheme` | string | `'system'` | Initial theme (`'light'`, `'dark'`, `'system'`) |

## Tech Stack
- Vanilla JavaScript / TypeScript
- CSS Custom Properties

## Author
**Xeran** — [github.com/ilhamfachrudin](https://github.com/ilhamfachrudin)
