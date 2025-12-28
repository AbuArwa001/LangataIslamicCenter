"use client";

import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold text-[#441A05] mb-8">
        Send us a Message
      </h2>
      <form
        className="space-y-8"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = {
            first_name: formData.get("firstName"),
            last_name: formData.get("lastName"),
            email: formData.get("email"),
            message: formData.get("message"),
          };

          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (response.ok) {
              alert("Message sent successfully!");
              (e.target as HTMLFormElement).reset();
            } else {
              alert("Failed to send message. Please try again.");
            }
          } catch (error) {
            alert("An error occurred. Please try again.");
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-bold text-[#441A05] uppercase tracking-wider"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-[#00b17b] bg-transparent focus:outline-none transition-colors"
              placeholder="Salim"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-bold text-[#441A05] uppercase tracking-wider"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-[#00b17b] bg-transparent focus:outline-none transition-colors"
              placeholder="Salim"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-bold text-[#441A05] uppercase tracking-wider"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-[#00b17b] bg-transparent focus:outline-none transition-colors"
            placeholder="salim@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-bold text-[#441A05] uppercase tracking-wider"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-[#00b17b] bg-transparent focus:outline-none transition-colors resize-none"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 py-4 px-10 bg-[#441A05] text-white font-bold rounded-full hover:bg-[#2d1103] transition-all shadow-lg hover:-translate-y-1"
        >
          Send Message
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
