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

export function handlePopUp() {
  const root = document.getElementById('root');
  const bellModal = document.getElementById('bell_modal');
  const modalStyle = window.getComputedStyle(bellModal);
  root.addEventListener('click', (e) => {
    const modalDisplay = modalStyle.display;
    if (e.target.id === 'bell_ui') {
      modalDisplay === 'none' ? (bellModal.style.display = 'flex') : (bellModal.style.display = 'none');
    } else {
      if (!e.target.closest('#bell_modal')) bellModal.style.display = 'none';
    }
  });
}
