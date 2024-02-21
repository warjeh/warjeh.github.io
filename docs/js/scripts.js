const brightness = {
  0: 'system',
  1: 'light',
  2: 'dark',
};

function getLocalThemeMode() {
  return localStorage.getItem('flutter.theme');
}
function getPreferredScheme() {
  return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches
    ? 'dark'
    : 'light';
}
function setColorScheme(scheme) {
  switch (scheme) {
    case 'dark':
      return 'rgba(23, 29, 41, 255)';
    case 'light':
    default:
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

const versionKey = 'app.version';
async function currentVersion() {
  const response = await fetch('data/version.json');
  return await response.json();
}
function cachedVersion() {
  return localStorage.getItem(versionKey);
}
function setVersion(version) {
  return localStorage.setItem(versionKey, version);
}
async function isNewVersion() {
  const _version = (await currentVersion()).version;
  console.log(_version);
  const cacheVersion = cachedVersion();
  if (cacheVersion != _version) {
    setVersion(_version);
    location.reload(true);
  }
}
