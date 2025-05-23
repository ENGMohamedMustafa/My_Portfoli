

document.getElementById("year").textContent = new Date().getFullYear();

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

const animateElements = document.querySelectorAll(".animate");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animateElements.forEach((element) => {
  observer.observe(element);
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  emailjs.init("f6pXFNCyIqwdjwIQ9"); // ✅ Public Key

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    try {
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: "mohamedmshaban99@gmail.com" // ممكن تخصصها في لوحة التحكم بدل هنا
      };

      const response = await emailjs.send(
        "service_7zu80yi",    // ✅ Service ID
        "template_6cctq5s",   // ✅ Template ID
        templateParams
      );

      if (response.status === 200) {
        alert("✅ تم إرسال الرسالة بنجاح! هتواصل معك قريبًا.");
        contactForm.reset();
      } else {
        throw new Error("EmailJS response error");
      }

    } catch (error) {
      alert("❌ حصلت مشكلة في إرسال الرسالة. حاول مرة تانية.");
      console.error("Error:", error);
    } finally {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });
}

window.addEventListener("beforeprint", () => {
  document.body.classList.add("printing");
});

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing");
});
