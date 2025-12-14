'use client';

import { Section } from '@/components/Section';

export default function ContactPage() {
  return (
    <>
      {/* Contact Form Section */}
      <Section id="contact-form" title="Get in Touch" subtitle="Let's Create Together">
        <div className="max-w-2xl mx-auto w-full">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                placeholder="What's this about?"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Tell us about your project..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </Section>

      {/* Contact Info Section */}
      <Section id="contact-info" title="Other Ways to Connect">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {[
            {
              title: 'Email',
              value: 'hello@example.com',
              href: 'mailto:hello@example.com',
            },
            {
              title: 'Phone',
              value: '+1 (555) 123-4567',
              href: 'tel:+15551234567',
            },
            {
              title: 'Location',
              value: 'San Francisco, CA',
              href: '#',
            },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors"
            >
              <p className="text-sm text-gray-400 mb-2">{item.title}</p>
              <p className="text-xl font-serif font-bold text-white">{item.value}</p>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
