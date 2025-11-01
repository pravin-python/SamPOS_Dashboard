const htmlElement = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  const setDarkMode = (isDark) => {
    if (isDark) {
      htmlElement.classList.add('dark');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      htmlElement.classList.remove('dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  };

  // Toggle on click
  themeToggle.addEventListener('click', () => {
    const isDark = !htmlElement.classList.contains('dark');
    setDarkMode(isDark);
    localStorage.setItem('darkMode', isDark);
  });

  // Load dark mode preference
  const loadDarkMode = () => {
    const preference = localStorage.getItem('darkMode');
    if (preference !== null) {
      setDarkMode(preference === 'true');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  };

  loadDarkMode();

  const showAlert = ({ message, type, duration }) => {
    document.querySelector('')
  }