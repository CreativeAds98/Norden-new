document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const left = document.querySelector('.arrow-left');
  const right = document.querySelector('.arrow-right');
  let index = 0;
  let timer;
  const DURATION = 5000;

  function goTo(i){
    slides.forEach((s,k)=>s.classList.toggle('active',k===i));
    index=(i+slides.length)%slides.length;
  }
  function next(){goTo((index+1)%slides.length);}
  function prev(){goTo((index-1+slides.length)%slides.length);}
  function startAuto(){stopAuto();timer=setInterval(next,DURATION);}
  function stopAuto(){if(timer)clearInterval(timer);}

  goTo(0);
  startAuto();

  if(right) right.addEventListener('click',()=>{next();startAuto();});
  if(left) left.addEventListener('click',()=>{prev();startAuto();});

  const slider=document.querySelector('.slider');
  slider.addEventListener('mouseenter',stopAuto);
  slider.addEventListener('mouseleave',startAuto);
});




// === Multi-dropdown click logic ===
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(drop => {
    const button = drop.querySelector(".dropbtn");

    // Toggle dropdown
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      // close other dropdowns
      dropdowns.forEach(d => d !== drop && d.classList.remove("active"));
      drop.classList.toggle("active");
    });
  });

  // Close all when clicking outside
  document.addEventListener("click", (e) => {
    dropdowns.forEach(drop => {
      if (!drop.contains(e.target)) drop.classList.remove("active");
    });
  });
});
// === End Multi-dropdown click logic ===


// === Track Record Counter Animation ===
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".record-number");
  const cards = document.querySelectorAll(".record-card");

  const speed = 100; // lower = faster

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 40);
      } else {
        counter.innerText = target.toLocaleString();
      }
    });
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cards.forEach((card) => card.classList.add("active"));
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector(".track-record"));
});
// === End Track Record Counter Animation ===


// === Dynamic Year Update ===

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});


// === End Dynamic Year Update ==




// ===== FEEDBACK SLIDER =====
const slider = document.querySelector(".feedback-slider");
const cards = document.querySelectorAll(".feedback-card");
const dotsContainer = document.querySelector(".feedback-dots");

let index = 0;

// Create dots dynamically
cards.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("feedback-dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    index = i;
    updateSlider();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".feedback-dot");

function updateSlider() {
  slider.style.transform = `translateX(${-index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function autoSlide() {
  index = (index + 1) % cards.length;
  updateSlider();
}

setInterval(autoSlide, 5000);

// ----- Scroll Reveal -----
const section = document.querySelector(".feedback-section");

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      section.classList.add("show");
    }
  },
  { threshold: 0.3 }
);

observer.observe(section);




// ===== End FEEDBACK SLIDER =====

// 🔺 Scroll to Top Button (Glowing)
// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when scroll 300px down
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "flex";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// Smooth scroll to top
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===== End SCROLL TO TOP BUTTON =====



// ===== Floating Mail Popup =====
const mailBtn = document.getElementById("mailBtn");
const mailPopup = document.getElementById("mailPopup");
const closeMail = document.getElementById("closeMail");

mailBtn.addEventListener("click", () => {
  mailPopup.style.display = "flex";
});

closeMail.addEventListener("click", () => {
  mailPopup.style.display = "none";
});

// Close popup when clicking outside the box
mailPopup.addEventListener("click", (e) => {
  if (e.target === mailPopup) {
    mailPopup.style.display = "none";
  }
});

// Handle form submit (you can later send email via backend)
document.getElementById("quickMailForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Message Sent!");
  mailPopup.style.display = "none";
});



// ===== End Floating Mail Popup =====



/* ================================
   SERVICES – STAGGER REVEAL
================================ */
const serviceCards = document.querySelectorAll('.service-card');

function revealServiceCards() {
  const triggerPoint = window.innerHeight * 0.85;

  serviceCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerPoint) {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 300); // 300ms delay per card
    }
  });
}

window.addEventListener("scroll", revealServiceCards);
revealServiceCards(); // in case already visible
/* ================================
   END SERVICES – STAGGER REVEAL
================================ */ 

