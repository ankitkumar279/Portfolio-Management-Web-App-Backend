document.addEventListener('DOMContentLoaded', function() {
  const readMoreBtns = document.querySelectorAll('.read-more');
  
  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const desc = this.parentElement;
      desc.classList.toggle('expanded');
      this.textContent = desc.classList.contains('expanded') ? ' Show Less' : '... Read More';
    });
  });
});
