import { Section } from '@/components/Section';
import { getCaseStudyBySlug } from '@/config/caseStudies';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      {/* Header Section */}
      <Section
        id="case-study-header"
        title={caseStudy.title}
        subtitle={caseStudy.category}
      >
        <p className="max-w-2xl mx-auto text-lg text-gray-300 text-center mb-8">
          {caseStudy.description}
        </p>
        {caseStudy.year && (
          <p className="text-sm text-gray-400">
            {caseStudy.client ? `${caseStudy.client} • ` : ''}
            {caseStudy.year}
          </p>
        )}
      </Section>

      {/* Project Overview */}
      <Section id="overview">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">Challenge</h3>
              <p className="text-gray-300">{caseStudy.challenge}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">Solution</h3>
              <p className="text-gray-300">{caseStudy.solution}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">Result</h3>
              <p className="text-gray-300">{caseStudy.result}</p>
            </div>
          </div>

          {/* Gallery/Media Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg aspect-video flex items-center justify-center mb-12">
            <p className="text-gray-500">Project Media</p>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-12">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Details Section */}
      <Section id="details" className="bg-gray-950">
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-serif font-bold mb-8">Project Details</h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              This case study demonstrates our approach to solving complex design and technical
              challenges. Through collaborative ideation, innovative problem-solving, and meticulous
              execution, we delivered a solution that exceeded expectations.
            </p>

            <h3 className="text-2xl font-serif font-bold mt-12 mb-6">Key Achievements</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-4">
                <span className="text-white font-bold">•</span>
                <span>Successfully delivered the project on time and within budget</span>
              </li>
              <li className="flex gap-4">
                <span className="text-white font-bold">•</span>
                <span>Exceeded performance targets and user engagement metrics</span>
              </li>
              <li className="flex gap-4">
                <span className="text-white font-bold">•</span>
                <span>Received positive feedback from stakeholders and end users</span>
              </li>
              <li className="flex gap-4">
                <span className="text-white font-bold">•</span>
                <span>Established best practices for future similar projects</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Next Project Navigation */}
      <Section id="next-project" className="bg-black">
        <div className="w-full max-w-4xl">
          <Link
            href="/work"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back to Work
          </Link>
        </div>
      </Section>
    </>
  );
}

export function generateStaticParams() {
  return [
    { slug: 'immersive-portfolio' },
    { slug: 'digital-brand' },
    { slug: 'motion-graphics' },
  ];
}
