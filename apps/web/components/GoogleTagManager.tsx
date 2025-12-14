'use client';

import { useEffect } from 'react';

export default function GoogleTagManager() {
  useEffect(() => {
    // Load GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-P37SFGTP';
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-P37SFGTP');
    `;
    document.head.appendChild(script);

    // Load GTM noscript iframe
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-P37SFGTP"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    `;
    document.body.prepend(noscript);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(script);
      if (noscript.parentNode) {
        document.body.removeChild(noscript);
      }
    };
  }, []);

  return null;
}