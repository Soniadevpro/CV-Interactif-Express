const express = require("express");
const path = require("path");

const app = express();
const port = 3000;
const session = require("express-session");

// Configuration des middlewares
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Route principale
app.get("/", (req, res) => {
  const successMessage = req.session.successMessage;
  req.session.successMessage = null;

  res.render("index", {
    errors: null,
    successMessage: successMessage,
    formData: { nom: "", email: "", message: "" },
  });
});

app.get("/download-cv", (req, res) => {
  res.download(path.join(__dirname, "public/documents/CV-Sonia-Sabbahi.pdf"));
});

// Route pour le formulaire de contact avec validation
app.post("/contact", (req, res) => {
  const { nom, email, message } = req.body;

  // Validation simple
  const errors = [];

  if (nom.length < 2) {
    errors.push("Nom trop court");
  }

  if (!email.includes("@") || !email.includes(".")) {
    errors.push("Email invalide");
  }

  if (message.length < 10) {
    errors.push("Message trop court");
  }

  // Si des erreurs existent, renvoyer à la page principale
  if (errors.length > 0) {
    return res.render("index", {
      errors: errors,
      successMessage: null,
      formData: req.body,
    });
  }

  req.session.successMessage = "Votre message a été envoyé avec succès !"; // Utilisation de la session pour stocker le message temporairement
  res.redirect("/"); // Redirection vers la page d'accueil
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
