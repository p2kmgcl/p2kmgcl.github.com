const LOCAL_STORAGE_ID = 'experiment_notes';
const textarea = document.querySelector('textarea');

textarea.value = localStorage.getItem(LOCAL_STORAGE_ID) || '';
textarea.focus();

textarea.addEventListener('keyup', () => {
  localStorage.setItem(LOCAL_STORAGE_ID, textarea.value);
});
