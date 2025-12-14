'use client';

import { Section } from '@/components/Section';
import { storySegments } from '@/config/segments';
import { segmentCopy } from '@/config/copy';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {storySegments.map((segment) => {
        const copy = segmentCopy[segment.id];

        return (
          <Section key={segment.id} id={segment.id} title={segment.title} subtitle={segment.subtitle}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">{copy?.body}</p>
              {copy?.cta && (
                <Link
                  href={copy.cta.href}
                  className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300"
                >
                  {copy.cta.text}
                </Link>
              )}
            </div>
          </Section>
        );
      })}

      {/* Case Studies Preview */}
      <Section id="case-studies" title="Our Work" subtitle="Featured Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              style={{
                aspectRatio: '1 / 1.2',
                cursor: 'pointer',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col justify-end p-6">
                <h3 className="text-xl font-serif font-bold mb-2">Case Study {i}</h3>
                <p className="text-sm text-gray-400 mb-4">Interactive Design</p>
                <Link href={`/case-studies/${i}`} className="text-white hover:text-gray-300">
                  View Project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="contact" title="Let's Create Something Amazing" className="bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-300 mb-8">
            Ready to bring your vision to life? Let's work together to create an unforgettable
            experience.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 mr-4"
          >
            Get in Touch
          </Link>
          <Link
            href="/work"
            className="inline-block px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Explore Work
          </Link>
        </div>
      </Section>
    </>
  );
}
