'use client';

import React from 'react';

const BRAND_LOGOS = [
  {
    name: 'Pepe Jeans London',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pepe-Jeans-Logo.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
    height: 22,
  },
  {
    name: 'Myntra',
    logo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/65c5da9f878952603e370d03_Myntra-Logo_1.svg/1280px-65c5da9f878952603e370d03_Myntra-Logo_1.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
    height: 24,
  },
  {
    name: 'Flipkart',
    logo: 'https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png',
    height: 24,
  },
  {
    name: 'Landmark Styli',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Landmark_Group_Logo.svg/1280px-Landmark_Group_Logo.svg.png',
    height: 20,
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    height: 20,
  },
  {
    name: 'Nordstrom',
    logo: 'https://1000logos.net/wp-content/uploads/2022/08/Nordstrom-logo.png',
    height: 20,
  },
  {
    name: 'Wildfang',
    logo: 'https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/modified/acd0a1e6-1c5e-4584-a3d3-dcadb2a3d9c0.png',
    height: 20,
  },
  {
    name: 'Gant',
    logo: 'https://download.logo.wine/logo/Gant_(retailer)/Gant_(retailer)-Logo.wine.png',
    height: 24,
  },
  {
    name: 'Bloomingwear',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUVvrpt0g2OqzElAeBzyDAIN5u7YuwtzkKtI7ag7XC48p7GlPKNMxZEiXw&s=10',
    height: 22,
  },
  {
    name: 'Iconic',
    logo: 'https://www.iconicindia.com/cdn/shop/files/iconic-logo.png?v=1698047257&width=200',
    height: 22,
  },
  {
    name: 'True Religion',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/True_Religion_logo.svg/1280px-True_Religion_logo.svg.png',
    height: 26,
  },
  {
    name: 'The Souled Store',
    logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/1d635d200302101.Y3JvcCwxMjQyLDk3MSwwLDEzNQ.jpg',
    height: 24,
  },
  {
    name: 'Wrogn',
    logo: 'https://wrogn.com/cdn/shop/files/logo_icon_1_bd4a99ba-1c20-43de-81ff-1f5fb0685b8e.svg?v=1736489168&width=100',
    height: 24,
  },
  {
    name: 'Kidbea',
    logo: 'https://cdn.shopify.com/s/files/1/0606/1785/1119/files/kidbea_logo-05_1.webp?v=1773731230&width=270',
    height: 24,
  },
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="bg-[#171615] border-t border-[#F5F1EA]/10 py-7 overflow-hidden relative select-none">
      <div className="text-center text-[10px] tracking-[3px] uppercase text-[#8A837A] font-semibold mb-5">
        Designed, produced &amp; shipped for
      </div>

      <div className="flex overflow-hidden relative w-full">
        {/* Infinite Looping Track */}
        <div className="brandscroll-anim flex items-center">
          {/* First loop */}
          <div className="flex items-center gap-14 pr-14">
            {BRAND_LOGOS.map((brand, idx) => (
              <div key={`brand-1-${idx}`} className="flex items-center justify-center min-w-[110px]">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  style={{ 
                    height: `${brand.height}px`, 
                    maxWidth: '130px', 
                    objectFit: 'contain', 
                    filter: 'grayscale(100%) brightness(0) invert(1)', 
                    opacity: 0.8 
                  }}
                  className="hover:opacity-100 hover:scale-105 transition-all"
                />
              </div>
            ))}
          </div>
          {/* Duplicate loop for seamless infinite wrap */}
          <div aria-hidden="true" className="flex items-center gap-14 pr-14">
            {BRAND_LOGOS.map((brand, idx) => (
              <div key={`brand-2-${idx}`} className="flex items-center justify-center min-w-[110px]">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  style={{ 
                    height: `${brand.height}px`, 
                    maxWidth: '130px', 
                    objectFit: 'contain', 
                    filter: 'grayscale(100%) brightness(0) invert(1)', 
                    opacity: 0.8 
                  }}
                  className="hover:opacity-100 hover:scale-105 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
