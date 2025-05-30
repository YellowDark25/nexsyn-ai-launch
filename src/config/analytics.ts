
export const ANALYTICS_CONFIG = {
  // Google Analytics 4 Measurement ID
  GA_MEASUREMENT_ID: process.env.REACT_APP_GA_MEASUREMENT_ID || '',
  
  // Enable analytics in production only
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
  
  // Event names for consistency
  EVENTS: {
    FORM_SUBMIT: 'form_submit',
    WHATSAPP_CLICK: 'whatsapp_click',
    VIDEO_PLAY: 'video_play',
    VIDEO_PAUSE: 'video_pause',
    SECTION_VIEW: 'section_view',
    CTA_CLICK: 'cta_click',
    SCROLL_DEPTH: 'scroll_depth',
    TIME_ON_PAGE: 'time_on_page',
    EXTERNAL_LINK: 'external_link_click'
  },
  
  // Conversion values
  CONVERSION_VALUES: {
    FORM_SUBMISSION: 10,
    WHATSAPP_CONTACT: 15,
    VIDEO_COMPLETION: 5
  }
};
