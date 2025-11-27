import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-hispBlue text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-medium mb-4">© 2025 HISP Ethiopia • All rights reserved</p>
        <div className="flex justify-center space-x-6 text-sm text-blue-100">
          <span>Powered by DHIS2 Community</span>
          <span>•</span>
          <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
          <span>•</span>
          <Link to="#" className="hover:text-white transition-colors">Terms</Link>
          <span>•</span>
          <Link to="#" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;