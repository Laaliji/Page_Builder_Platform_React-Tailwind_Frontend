import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validation des champs
    if (!name) newErrors.name = true;
    if (!email || !validateEmail(email)) newErrors.email = true;
    if (!phone.match(/^\d{10}$/)) newErrors.phone = true;
    if (!message) newErrors.message = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phone, message }),
        });

        if (response.ok) {
          setSuccessMessage("Votre message a été envoyé avec succès !");
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        } else {
          setSuccessMessage(
            "Erreur lors de l'envoi du message. Veuillez réessayer."
          );
        }
      } catch (error) {
        setSuccessMessage("Erreur de connexion.API (-_-).");
      }
    }
  };

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Nous contacter
        </h2>
        <div className="flex flex-wrap bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-100">
            <img
              src="/assets/images/Contact2.png"
              alt="Contact"
              className="w-full h-full"
            />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Entrez votre nom"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Entrez votre email"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Téléphone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Entrez votre numéro de téléphone"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Écrivez votre message"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-bold"
                >
                  Envoyer E-mail →
                </button>
                <p className="text-green-500 text-sm mt-4">{successMessage}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
