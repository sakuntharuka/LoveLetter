var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var section = document.querySelector(".heart-section");

// Function to resize the canvas to match the section
function resizeCanvas() {
    canvas.width = section.clientWidth;
    canvas.height = section.clientHeight;
    centerx = canvas.width / 2;
    centery = canvas.height / 2;
}

// Call the function on page load and when resizing
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

var numhearts = Math.floor(canvas.width / 2); // Adjust number of hearts dynamically
var hearts = [];
var speed = 3;

for (var i = 0; i < numhearts; i++) {
    hearts[i] = new heart();
}

function heart() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.height;
    this.color = Math.random() * 360;
    
    this.move = function () {
        this.z += speed;
        if (this.z >= canvas.height) {
            this.z = 0;
        }
    };

    this.show = function () {
        var x, y, s;
        x = (this.x - centerx) * (canvas.width / this.z);
        x = x + centerx;
        y = (this.y - centery) * (canvas.width / this.z);
        y = y + centery;
        s = 1.8 * (canvas.width / this.z);

        context.beginPath();
        context.fillStyle = "hsl(" + this.color + ",100%,50%)";

        // Draw heart shape with reduced height
        context.moveTo(x, y);
        context.bezierCurveTo(x + s, y - (s * 0.5), x + (2 * s), y + (s * 0.8), x, y + (1.8 * s));
        context.bezierCurveTo(x - (2 * s), y + (s * 0.8), x - s, y - (s * 0.5), x, y);

        context.fill();
    };
}

function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < numhearts; i++) {
        hearts[i].show();
        hearts[i].move();
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach((section, i) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        snap: {
            snapTo: "center", // Snaps sections to the center of the screen
            duration: 0.5, // Smooth transition duration
            ease: "power1.inOut" // Easing effect
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    function requestFullScreen() {
        let elem = document.documentElement; // Fullscreen the entire page

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Edge
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // Internet Explorer/Edge
            elem.msRequestFullscreen();
        }
    }

    // Try entering fullscreen automatically
    requestFullScreen();

    
    // Optional: Trigger fullscreen automatically
    setTimeout(requestFullScreen, 500);

     // Force fullscreen on mobile
     setTimeout(() => {
        if (window.innerWidth < 768) { // Only for mobile screens
            requestFullScreen();
        }
    }, 500);

});

// Animate text using GSAP
gsap.to(".overlay-text", {
    opacity: 1,
    y: -20, // Moves up slightly
    duration: 1.5,
    ease: "power2.out",
});

gsap.from("#headline", {
    opacity: 0,
    y: 50, // Starts from below
    duration: 1.5,
    delay: 0.5,
    ease: "elastic.out(1, 0.5)"
});

gsap.from("#message", {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    delay: 1,
    ease: "back.out(1.7)"
});

