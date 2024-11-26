import React from "react";

const Contact = () => {
  return (
    <section className="py-0 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Nous contacter
        </h2>
        <div className="flex flex-wrap bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Colonne gauche */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-100">
            <img
              src="/assets/images/Contact2.png"
              alt="Placeholder"
              className="w-full h-full"
            />
          </div>

          {/* Colonne droite */}
          <div className="w-full md:w-1/2 p-8">
            <div className="space-y-4">
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-700 placeholder-gray-500"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-700 placeholder-gray-500"
                  placeholder="Entrez votre email"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sujet:
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-700 placeholder-gray-500"
                  placeholder="Entrez le sujet"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-700 placeholder-gray-500"
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </section>
  );
};

export default Contact;
