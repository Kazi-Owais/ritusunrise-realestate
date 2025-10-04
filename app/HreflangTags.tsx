import { Metadata } from 'next';

export function generateHreflangTags() {
  const baseUrl = 'https://ritusunriserealestate.ae';
  const languages = [
    { lang: 'en-AE', url: baseUrl },
    { lang: 'ar-AE', url: `${baseUrl}/ar` },
    { lang: 'x-default', url: baseUrl }
  ];

  return (
    <>
      {languages.map(({ lang, url }) => (
        <link 
          key={lang}
          rel="alternate"
          href={url}
          hrefLang={lang}
        />
      ))}
    </>
  );
}
