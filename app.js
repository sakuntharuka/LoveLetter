gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

if (ScrollTrigger.isTouch !== 1) {

	ScrollSmoother.create({
		wrapper: '.wrapper',
		content: '.content',
		smooth: 1.5,
		effects: true
	})

	gsap.fromTo('.hero-section', { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
			trigger: '.hero-section',
			start: 'center',
			end: '820',
			scrub: true
		}
	})

	let itemsL = gsap.utils.toArray('.gallery__left .gallery__item')

	itemsL.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: -50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-850',
				end: '-100',
				scrub: true
			}
		})
	})

	let itemsR = gsap.utils.toArray('.gallery__right .gallery__item')

	itemsR.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: 50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-750',
				end: 'top',
				scrub: true
			}
		})
	})

}

// Background

function getRandomPastelColor() {
	const r = Math.floor(Math.random() * 56 + 190); // 200-255 for lighter colors
	const g = Math.floor(Math.random() * 56 + 190);
	const b = Math.floor(Math.random() * 56 + 190);
	return `rgb(${r}, ${g}, ${b})`;
}

function changeBackground() {
	const color1 = getRandomPastelColor();
	const color2 = getRandomPastelColor();
	document.body.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
}

setInterval(changeBackground, 2500); // Changes every 4 seconds
changeBackground(); // Initial background change


document.addEventListener("DOMContentLoaded", function() {  
	if (document.documentElement.requestFullscreen) {  
		document.documentElement.requestFullscreen();  
	}  
});  


// Cursor

const hearts = [];

    document.addEventListener('mousemove', (e) => {
      const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      heart.setAttribute("viewBox", "0 0 32 29.6");
      heart.setAttribute("class", "heart");
      heart.style.width = `${10 + Math.random() * 15}px`;
      heart.style.height = `${10 + Math.random() * 15}px`;
      heart.style.left = `${e.clientX + 10}px`;
      heart.style.top = `${e.clientY + 22}px`;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M23.6,0c-3.4,0-6.4,2.7-7.6,5.4C14.8,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,6.9,12,17.1,15.2,20.3c0.5,0.5,1.3,0.5,1.8,0 C20,25.5,32,15.3,32,8.4C32,3.8,28.2,0,23.6,0z");
      heart.appendChild(path);

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.style.opacity = '0';
        heart.style.transform += ' scale(1.5)';
      }, 50);

      setTimeout(() => {
        heart.remove();
      }, 1000);
    });

	//Tilt Text

	const tiltElements = document.querySelectorAll(".tilt-text");

        document.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const rotateX = ((clientY / innerHeight) * 40) - 10; 
            const rotateY = ((clientX / innerWidth) * 40) - 10;  

            tiltElements.forEach(element => {
                element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });

        document.addEventListener("mouseleave", () => {
            tiltElements.forEach(element => {
                element.style.transform = "rotateX(0deg) rotateY(0deg)";
            });
        });

	// Image Tilt
	const image = document.getElementById("tiltImage");

			document.addEventListener("mousemove", (e) => {
				const { clientX, clientY } = e;
				const { innerWidth, innerHeight } = window;

				const rotateX = ((clientY / innerHeight) * 40) - 20; 
				const rotateY = ((clientX / innerWidth) * 40) - 20;  

				image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
			});

			document.addEventListener("mouseleave", () => {
				image.style.transform = "rotateX(0deg) rotateY(0deg)";
			});

	// Stars

	const textElement = document.getElementById('glowingText');

  // Function to create a star at a random position within the text
  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.textContent = '✦';

    // Random position within the text area
    const x = Math.random() * textElement.offsetWidth;
    const y = Math.random() * textElement.offsetHeight;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    textElement.appendChild(star);

    // Remove star after animation ends
    setTimeout(() => star.remove(), 2000);
  }

  // Create 2-3 stars at random intervals
  setInterval(() => {
    const starCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 stars
    for (let i = 0; i < starCount; i++) {
      setTimeout(createStar, Math.random() * 500);
    }
  }, 3000);


  // Detect the screen width
  if (window.innerWidth >= 1024) {
	// Show laptop content and hide mobile message
	document.querySelector('.laptop-content').style.display = 'block';
	document.querySelector('.mobile-message').style.display = 'none';
  } else {
	// Show mobile message and hide laptop content
	document.querySelector('.laptop-content').style.display = 'none';
	document.querySelector('.mobile-message').style.display = 'block';
  }

  // Optional: Add event listener to handle window resize
  window.addEventListener('resize', function() {
	if (window.innerWidth >= 1024) {
	  document.querySelector('.laptop-content').style.display = 'block';
	  document.querySelector('.mobile-message').style.display = 'none';
	} else {
	  document.querySelector('.laptop-content').style.display = 'none';
	  document.querySelector('.mobile-message').style.display = 'block';
	}
  });
