import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">Page Not Found</p>
        <p className="text-gray-400 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
