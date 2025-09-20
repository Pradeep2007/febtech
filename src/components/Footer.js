import React from "react";

function Footer() {
  return (
    <footer className="py-8 bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} Medical. All rights reserved.</p>
        <div className="text-sm">Built with ❤️</div>
      </div>
    </footer>
  );
}

export default Footer;


