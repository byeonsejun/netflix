export function readLocalStorage(key) {
  const target = window.localStorage.getItem(key);
  return JSON.parse(target);
}

export function addLocalStorage(key, value) {
  const stringify = JSON.stringify(value);
  return window.localStorage.setItem(key, stringify);
}

export function initLocalStorage(key, currentId) {
  const lovalStorageLikeValue = readLocalStorage(key);
  if (lovalStorageLikeValue === null) return null;
  return lovalStorageLikeValue.find((storageId) => storageId === currentId);
}
