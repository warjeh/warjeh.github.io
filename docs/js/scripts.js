const brightness = {
  0: 'system',
  1: 'light',
  2: 'dark',
};

const getLocalThemeMode = () => localStorage.getItem('flutter.theme');

const getPreferredScheme = () =>
  window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches
    ? 'dark'
    : 'light';

function setColorScheme(scheme) {
  switch (scheme) {
    case 'dark':
      return 'rgba(23, 29, 41, 255)';
    case 'light':
      return 'white';
  }
}

function setTheme() {
  let bgColor = 'white';
  const localThemeMode = getLocalThemeMode();
  if (['1', '2'].includes(localThemeMode)) {
    bgColor = setColorScheme(brightness[localThemeMode]);
  } else {
    bgColor = setColorScheme(getPreferredScheme());
  }
  document.body.style.backgroundColor = bgColor;
}

// document.addEventListener("DOMContentLoaded", setTheme(), false);
