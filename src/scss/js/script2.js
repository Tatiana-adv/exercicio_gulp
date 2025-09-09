
// Arquivo 2: comportamento dinâmico
document.addEventListener('DOMContentLoaded', () => {
  const heading = document.querySelector('h1');
  if (heading) {
    heading.style.transition = 'color 0.5s ease';
    heading.addEventListener('click', () => {
      heading.style.color = '#e74c3c';
    });
  }
});
