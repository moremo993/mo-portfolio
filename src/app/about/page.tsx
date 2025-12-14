'use client';

import { Section } from '@/components/Section';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section
        id="about-hero"
        title="About Us"
        subtitle="Crafting Immersive Digital Experiences"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-300 mb-6">
            We are a team of designers, developers, and creatives passionate about pushing the
            boundaries of web experiences.
          </p>
          <p className="text-lg text-gray-300">
            With expertise in modern web technologies like React, Three.js, and GSAP, we create
            interactive narratives that captivate and inspire.
          </p>
        </div>
      </Section>

      {/* Values Section */}
      <Section id="values" title="Our Values">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {[
            {
              title: 'Innovation',
              description:
                'We embrace new technologies and techniques to create cutting-edge experiences.',
            },
            {
              title: 'Quality',
              description:
                'Every detail matters. We obsess over pixel-perfect design and smooth interactions.',
            },
            {
              title: 'Storytelling',
              description:
                'We believe in the power of narrative to create meaningful connections with users.',
            },
          ].map((value) => (
            <div key={value.title} className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-serif font-bold mb-4">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section id="team" title="Our Team">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {[
            {
              name: 'Creative Lead',
              role: 'Director',
              description: 'Visionary leader directing the creative direction of all projects.',
            },
            {
              name: 'Technical Lead',
              role: 'Senior Developer',
              description: 'Expert in modern web technologies and performance optimization.',
            },
            {
              name: 'Design Specialist',
              role: 'UI/UX Designer',
              description: 'Crafting beautiful and intuitive user experiences.',
            },
            {
              name: 'Motion Designer',
              role: 'Animation Specialist',
              description: 'Bringing designs to life with smooth and engaging animations.',
            },
          ].map((member) => (
            <div key={member.name} className="bg-gray-900 rounded-lg p-6">
              <div className="bg-gray-800 rounded-lg aspect-square mb-4 flex items-center justify-center">
                <p className="text-gray-500">Photo</p>
              </div>
              <h4 className="text-lg font-serif font-bold mb-1">{member.name}</h4>
              <p className="text-sm text-gray-400 mb-3">{member.role}</p>
              <p className="text-gray-300">{member.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="about-cta" title="Let's Work Together">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-300 mb-8">
            Have a project in mind? We'd love to hear about it and discuss how we can help bring
            your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </Section>
    </>
  );
}
