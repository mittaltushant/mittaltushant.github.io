(function () {
  'use strict';

  var storageKey = 'tushant-theme';
  var root = document.documentElement;
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  var preference = null;
  var button;

  function validPreference(value) {
    return value === 'dark' || value === 'light' ? value : null;
  }

  try {
    preference = validPreference(window.localStorage.getItem(storageKey));
  } catch (error) {
    // The toggle still works when the browser blocks local storage.
  }

  function applyTheme() {
    var theme = preference || (systemTheme.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    if (button) {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  // Run in the head so the chosen theme is applied before the page paints.
  applyTheme();

  function addToggle() {
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Dark mode');
    button.innerHTML =
      '<svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 13.2A8.5 8.5 0 0 1 10.8 3.5 8.5 8.5 0 1 0 20.5 13.2Z"/></svg>' +
      '<svg class="theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>';
    button.addEventListener('click', function () {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(storageKey, preference);
      } catch (error) {
        // Keep the current page usable even if the choice cannot be saved.
      }
      applyTheme();
    });
    applyTheme();
    document.body.appendChild(button);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToggle, { once: true });
  } else {
    addToggle();
  }

  function followSystemTheme() {
    if (!preference) applyTheme();
  }

  if (systemTheme.addEventListener) {
    systemTheme.addEventListener('change', followSystemTheme);
  } else {
    systemTheme.addListener(followSystemTheme);
  }

  window.addEventListener('storage', function (event) {
    if (event.key === storageKey || event.key === null) {
      preference = validPreference(event.key === null ? null : event.newValue);
      applyTheme();
    }
  });
}());
