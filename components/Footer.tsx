import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

const Footer = (): React.JSX.Element => {
  const { t } = useLocalization();
  return (
    <footer className="w-full text-center text-xs text-gray-500 dark:text-gray-400 p-4 space-x-4">
      <span>(C) Noam Gold AI 2025</span>
      <a href="mailto:gold.noam@gmail.com" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
        {t.sendFeedback}
      </a>
    </footer>
  );
};

export default Footer;