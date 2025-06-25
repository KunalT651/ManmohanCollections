export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-bold tracking-tight">Manmohan Collections</div>
        <div className="flex gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-yellow-400">Instagram</a>
          <a href="mailto:info@manmohancollections.com" className="hover:text-yellow-400">Contact</a>
          <a href="/privacy" className="hover:text-yellow-400">Privacy Policy</a>
          <a href="/terms" className="hover:text-yellow-400">Terms</a>
        </div>
        <div className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Manmohan Collections</div>
      </div>
    </footer>
  );
} 