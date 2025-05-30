
import React, { useEffect } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

interface AnalyticsTrackerProps {
  measurementId?: string;
}

const AnalyticsTracker = ({ measurementId }: AnalyticsTrackerProps) => {
  const { trackEvent, trackPageView } = useAnalytics(measurementId);

  useEffect(() => {
    // Track page view on component mount
    trackPageView(window.location.pathname);

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track scroll milestones
        if (scrollPercent >= 25 && maxScroll < 25) {
          trackEvent('scroll_depth', { depth: '25%' });
        } else if (scrollPercent >= 50 && maxScroll < 50) {
          trackEvent('scroll_depth', { depth: '50%' });
        } else if (scrollPercent >= 75 && maxScroll < 75) {
          trackEvent('scroll_depth', { depth: '75%' });
        } else if (scrollPercent >= 90 && maxScroll < 90) {
          trackEvent('scroll_depth', { depth: '90%' });
        }
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', { duration: timeSpent });
    };

    // Track clicks on external links
    const handleExternalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.href.includes(window.location.hostname)) {
        trackEvent('external_link_click', { 
          url: link.href,
          text: link.textContent 
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', trackTimeOnPage);
    document.addEventListener('click', handleExternalClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', trackTimeOnPage);
      document.removeEventListener('click', handleExternalClick);
    };
  }, [trackEvent, trackPageView]);

  return null;
};

export default AnalyticsTracker;
