'use client';

import { Section } from '@/components/Section';
import { caseStudies, getFeaturedCaseStudies } from '@/config/caseStudies';
import Link from 'next/link';

export default function WorkPage() {
  const featured = getFeaturedCaseStudies();

  return (
    <>
      {/* Header Section */}
      <Section
        id="work-header"
        title="Our Work"
        subtitle="A collection of innovative projects and experiences"
      >
        <p className="max-w-2xl mx-auto text-lg text-gray-300 text-center">
          Each project represents our commitment to excellence, creativity, and pushing the
          boundaries of what's possible on the web.
        </p>
      </Section>

      {/* Featured Projects */}
      <Section id="featured" title="Featured Projects">
        <div className="w-full max-w-6xl space-y-16">
          {featured.map((study, index) => (
            <div
              key={study.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="flex-1">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 h-64 flex items-center justify-center">
                  <p className="text-gray-500">Featured Image</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-400 mb-2">{study.category}</p>
                <h3 className="text-3xl font-serif font-bold mb-4">{study.title}</h3>
                <p className="text-gray-300 mb-6">{study.description}</p>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-400">Challenge</p>
                    <p className="text-gray-300">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Solution</p>
                    <p className="text-gray-300">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Result</p>
                    <p className="text-gray-300">{study.result}</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-6 flex-wrap">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-block px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Case Study
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* All Case Studies Grid */}
      <Section id="all-projects" title="All Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="group"
            >
              <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div
                  className="bg-gradient-to-br from-gray-800 to-gray-900 aspect-square flex items-center justify-center group-hover:from-gray-700 group-hover:to-gray-800 transition-colors"
                >
                  <p className="text-gray-500">{study.title}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-2">{study.category}</p>
                  <h4 className="text-lg font-serif font-bold mb-2">{study.title}</h4>
                  <p className="text-sm text-gray-400 line-clamp-2">{study.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
