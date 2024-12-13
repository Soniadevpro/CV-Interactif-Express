document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const successMessage = document.querySelector(".success-message");

  if (successMessage) {
    setTimeout(() => {
      // Faire disparaître le message de succès
      successMessage.style.transition = "opacity 0.5s ease-out";
      successMessage.style.opacity = "0";

      // Attendre que la transition soit terminée avant de réinitialiser le formulaire
      setTimeout(() => {
        successMessage.remove();
        const form = document.querySelector("form");
        form.reset();
      }, 500);
    }, 3000);
  }
});

console.log("Script chargé");
