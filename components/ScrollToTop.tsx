import { useState, useEffect } from 'react';
import { ArrowLongUpIcon } from '@heroicons/react/24/outline';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return isVisible ? (
    <button
      type="button"
      className="fixed transition-all z-50 bottom-8 right-8 inline-flex items-center rounded-full border border-slate-50 bg-white p-3 text-zinc-600e shadow-lg hover:shadow-md hover:boder-slate-100"
      onClick={handleScrollToTop}
    >
      <ArrowLongUpIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  ) : null;
}

export default ScrollToTop;