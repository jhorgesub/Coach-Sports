import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-12 py-6 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-inter">
      <div>
        &copy; {currentYear} Coach Sports & Fitness. All rights reserved.
      </div>
      <div className="flex gap-4 mt-2 sm:mt-0">
        <a href="#privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
        <span>&middot;</span>
        <a href="#terms" className="hover:text-brand-blue transition-colors">Terms of Service</a>
        <span>&middot;</span>
        <span className="text-gray-600">v1.2.0</span>
      </div>
    </footer>
  );
}
