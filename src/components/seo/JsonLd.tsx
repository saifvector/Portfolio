import React from 'react';
import { OWNER_INFO, PROJECTS } from '../../data/portfolioData';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://saifur-ai.vercel.app/#person',
        name: OWNER_INFO.name,
        jobTitle: 'AI Engineer & Data Scientist',
        description: OWNER_INFO.bio,
        url: 'https://saifur-ai.vercel.app',
        sameAs: [
          OWNER_INFO.socials.github,
          OWNER_INFO.socials.linkedin,
          OWNER_INFO.socials.twitter
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: OWNER_INFO.education.institution,
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'Andhra Pradesh',
            addressCountry: 'IN'
          }
        },
        knowsAbout: [
          'Artificial Intelligence',
          'Deep Learning',
          'Cybersecurity',
          'Network Intrusion Detection Systems',
          'Medical Image Segmentation',
          'PyTorch',
          'Explainable AI',
          'SHAP',
          'FastAPI',
          'PostgreSQL',
          'Computer Vision'
        ]
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://saifur-ai.vercel.app/#profilepage',
        url: 'https://saifur-ai.vercel.app',
        name: 'Shaik Saifur Rahman - AI Engineer & Data Scientist Portfolio',
        mainEntity: { '@id': 'https://saifur-ai.vercel.app/#person' }
      },
      ...PROJECTS.map((proj) => ({
        '@type': 'SoftwareApplication',
        name: proj.title,
        alternateName: proj.subtitle,
        description: proj.description,
        applicationCategory: proj.category,
        operatingSystem: 'Cross-platform',
        author: { '@id': 'https://saifur-ai.vercel.app/#person' }
      }))
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
