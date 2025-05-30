
import { useAnalytics } from './useAnalytics';

export const useConversionTracking = (measurementId?: string) => {
  const { trackEvent, trackConversion } = useAnalytics(measurementId);

  const trackFormSubmission = (formType: string, formData?: Record<string, any>) => {
    trackEvent('form_submit', {
      form_type: formType,
      event_category: 'lead_generation',
      ...formData
    });
    
    trackConversion('form_submission', 1);
  };

  const trackWhatsAppClick = (source: string) => {
    trackEvent('whatsapp_click', {
      source: source,
      event_category: 'contact'
    });
    
    trackConversion('whatsapp_contact', 1);
  };

  const trackVideoEngagement = (action: string, videoId?: string, progress?: number) => {
    trackEvent('video_engagement', {
      video_action: action,
      video_id: videoId,
      progress: progress,
      event_category: 'video'
    });
  };

  const trackSectionView = (sectionName: string) => {
    trackEvent('section_view', {
      section_name: sectionName,
      event_category: 'engagement'
    });
  };

  const trackCTAClick = (ctaText: string, location: string) => {
    trackEvent('cta_click', {
      cta_text: ctaText,
      cta_location: location,
      event_category: 'conversion'
    });
  };

  return {
    trackFormSubmission,
    trackWhatsAppClick,
    trackVideoEngagement,
    trackSectionView,
    trackCTAClick
  };
};
