document.addEventListener("DOMContentLoaded", () => {
    // Load header
    fetch('header.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('header').innerHTML = html;
  
        // burger logic
        const burgerIcon = document.getElementById("burger-icon");
        const burgerMenu = document.querySelector(".burgcontainer");
        const backdrop = document.querySelector(".burger-backdrop");
  
        if (burgerIcon && burgerMenu) {
          burgerIcon.addEventListener("click", () => {
            burgerMenu.classList.toggle("open");
            burgerIcon.classList.toggle("open");
            backdrop.classList.toggle("open"); 
          });
        } else {
          console.warn("Burger menu or icon not found.");
        }
        
        document.addEventListener("click", (e) => {
            const isClickInsideMenu = burgerMenu.contains(e.target);
            const isClickOnIcon = burgerIcon.contains(e.target);
            
          

            if (!isClickInsideMenu && !isClickOnIcon) {
              burgerMenu.classList.remove("open");
              burgerIcon.classList.remove("open"); 
              // site dim when burger menu is open
              backdrop.classList.remove("open"); 
            }
          });
      })
      .catch(error => console.error('Error loading header:', error));
  
    // Load footer
    fetch('footer.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('footer').innerHTML = html;
      })
      .catch(error => console.error('Error loading footer:', error));
  });
  
  