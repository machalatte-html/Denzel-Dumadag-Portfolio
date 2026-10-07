/*NAVIGATION*/

const navLinksContainer = document.getElementById("navLinks"); 

const navigationItems = [ 
    { 
        name: "Home", 
        target: "home" }, 
    { 
        name: "About Me", 
        target: "about" }, 
    {
        name: "Projects", 
        target: "projects" }, 
    { 
        name: "Contact", 
        target: "contact" } 
]; 

navigationItems.forEach((item, index) => { 

    const link = document.createElement("a"); 

    link.href = `#${item.target}`; 
    link.textContent = item.name; 
    link.classList.add("nav-link"); 

    if (index === 0) { 
        link.classList.add("active"); 
    } 
    navLinksContainer.appendChild(link); 
});

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


/*ACTIVE NAVIGATION*/

const sections = document.querySelectorAll("section"); 
const navigationLinks = document.querySelectorAll(".nav-link"); 

window.addEventListener("scroll", () => { 
    let currentSection = ""; 
    sections.forEach(section => { 
        const sectionTop = section.offsetTop - 150; 
        const sectionHeight = section.offsetHeight; 
        
        if ( window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight ) { 
            currentSection = section.id; 
        } 
    }); 
        
    navigationLinks.forEach(link => { 
        link.classList.remove("active"); 
        if ( link.getAttribute("href") === `#${currentSection}` ) { 
            link.classList.add("active"); 
        } 
    }); 
});


/*HOME BUTTONS*/

const homeButtons =document.querySelector(".home-buttons");
const viewWorkButton = document.createElement("a");

viewWorkButton.href = "#projects";
viewWorkButton.textContent = "View My Work";
viewWorkButton.className = "primary-button";
const aboutButton = document.createElement("a");
aboutButton.href = "#about";
aboutButton.textContent = "About Me";
aboutButton.className = "secondary-button";
const resumeButton = document.createElement("a");
resumeButton.href = "/resume/resume.html";
resumeButton.textContent = "Resume";
resumeButton.className = "secondary-button";
homeButtons.appendChild(viewWorkButton);
homeButtons.appendChild(aboutButton);
homeButtons.appendChild(resumeButton);
/*INTEREST SLIDERS*/

const interestSliders =
    document.querySelectorAll(".interest-card");


interestSliders.forEach(card => {
    const slides = card.querySelectorAll(".interest-slide");
    const previousButton = card.querySelector(".slider-prev");
    const nextButton = card.querySelector(".slider-next");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        slides[index].classList.add("active");
    }


    previousButton.addEventListener("click", () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    });


    nextButton.addEventListener("click", () => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    });
});


/*GRAPHIC DESIGN SLIDER*/

const graphicsTrack = document.getElementById("graphicsTrack");
const graphicsSlides = document.querySelectorAll(".graphic-slide");
const graphicsPrev = document.getElementById("graphicsPrev");
const graphicsNext = document.getElementById("graphicsNext");
const graphicsIndicators = document.getElementById("graphicsIndicators");

let currentGraphic = 0;


graphicsSlides.forEach((slide, index) => {

    const indicator = document.createElement("button");

    indicator.className = "graphic-indicator";
     if (index === 0) {
        indicator.classList.add("active");
    }

    indicator.addEventListener("click", () => {
        currentGraphic = index;
        updateGraphicSlider();
    });
    graphicsIndicators.appendChild(indicator);
});

function updateGraphicSlider() {
    graphicsTrack.style.transform = `translateX(-${currentGraphic * 100}%)`;
    const indicators = document.querySelectorAll(".graphic-indicator");
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle( "active",index === currentGraphic);
    });
}


graphicsNext.addEventListener("click", () => {
    currentGraphic++;
    if ( currentGraphic >= graphicsSlides.length) {
        currentGraphic = 0;
    }
    updateGraphicSlider();
});


graphicsPrev.addEventListener("click", () => {
    currentGraphic--;
    if (currentGraphic < 0) {
        currentGraphic = graphicsSlides.length - 1;
    }
    updateGraphicSlider();
});


/*OPTIONAL AUTO SLIDE FOR GRAPHICS*/

setInterval(() => {
    currentGraphic++;
    if (currentGraphic >= graphicsSlides.length) {
        currentGraphic = 0;
    }
    updateGraphicSlider();
}, 6000);


/*CONTACT FORM BUTTON*/

const formActions = document.querySelector(".form-actions");

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Send Message";
submitButton.className = "submit-button";
formActions.appendChild(submitButton);


/*CONTACT FORM*/

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("formStatus");


/*VALIDATION FUNCTIONS*/

function showError(input, errorElement, message) {
    input
        .closest(".form-group")
        .classList.add("invalid");
    errorElement.textContent = message;
}

function clearError(input, errorElement) {
    input
        .closest(".form-group")
        .classList.remove("invalid");
    errorElement.textContent = "";
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/*REAL-TIME VALIDATION*/

nameInput.addEventListener("input", () => {
    if (nameInput.value.trim() !== "") {
        clearError(nameInput, document.getElementById("nameError"));
    }
});

emailInput.addEventListener("input", () => {
    if (validateEmail(emailInput.value.trim())) {
        clearError(emailInput, document.getElementById("emailError"));
    }
});

subjectInput.addEventListener("input", () => {
    if (subjectInput.value.trim() !== "") {
        clearError(subjectInput, document.getElementById("subjectError"));
    }
});


messageInput.addEventListener("input", () => {
    if (messageInput.value.trim().length >= 10) {
        clearError(messageInput, document.getElementById("messageError"));
    }
});


/*FORM SUBMISSION*/

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();
        let isValid = true;

        if (nameInput.value.trim() === "") {
            showError(nameInput, document.getElementById("nameError"),"Please enter your name.");
            isValid = false;
        }

        if (emailInput.value.trim() === "") {
            showError(emailInput, document.getElementById("emailError"), "Please enter your email.");
            isValid = false;
        }

        else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, document.getElementById("emailError"),"Please enter a valid email address.");
            isValid = false;
        }

        if (subjectInput.value.trim() === "") {
            showError(subjectInput, document.getElementById("subjectError"), "Please enter a subject.");
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            showError(messageInput, document.getElementById("messageError"), "Please enter your message.");
            isValid = false;
        }

        else if (messageInput.value.trim().length < 10) {
            showError(messageInput, document.getElementById("messageError"), "Message must contain at least 10 characters.");
            isValid = false;
        }

        if (!isValid) { 
            formStatus.className = "form-status error";
            formStatus.textContent = "Please correct the errors above.";
            return;
        }


        /*MOCKAPI REQUEST*/

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.className = "form-status";
        formStatus.textContent = "";
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message:  messageInput.value.trim(),
            date: new Date().toISOString()
        };

        try {
            const response = await fetch("https://api.mockfly.dev/mocks/095fe88d-0559-42c6-92bc-30d91c41ad8d/contact",{
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body:JSON.stringify(formData)
                    }
                );

            if (!response.ok) {
                throw new Error("Failed to submit form.");
            }

            formStatus.className = "form-status success";
            formStatus.textContent = "Your message has been sent successfully!";
            contactForm.reset();
        }

        catch (error) {
            console.error(error);
            formStatus.className = "form-status error";
            formStatus.textContent = "Something went wrong. Please try again.";
        }

        finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    }
);