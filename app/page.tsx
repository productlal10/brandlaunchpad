'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

const HOME_BODY_HTML = `
  <!-- CUSTOM CURSOR -->
  <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
  <div class="cursor-ring" id="cursorRing" aria-hidden="true"><span class="cr-label">View →</span></div>

  <!-- ═══ NAVBAR ═══ -->
  <nav class="site-nav" id="siteNav">
    <div class="nav-inner">
      <a href="#" class="nav-logo-link">
        <img src="/logo.png" alt="Lal10 Logo" class="desktop-logo-img" />
        <div class="desktop-logo-divider"></div>
        <img src="https://thefashionos.com/assets/logo-Dl4_z_fN.png" alt="TheFashionOS Logo" class="desktop-second-logo-img" />
        <div class="mobile-text-logo">
          <div class="logo-main">LAL10</div>
          <div class="logo-sub">FASHIONOS</div>
        </div>
      </a>

      <div class="desktop-nav-links">
        <a href="#offerings">What We Do</a>
        <a href="#process">Process</a>
        <a href="#engagement">Engagement</a>
        <a href="#team">About</a>
        <button class="btn-nav-cta" onclick="openDiscoveryModal('General')">
          <span>Book a Discovery Call</span> <span class="arw">↗</span>
        </button>
      </div>

      <div class="mobile-menu-btn">
        <button class="mobile-call-cta" onclick="openDiscoveryModal('General')">BOOK A CALL</button>
        <button class="mobile-hamburger" id="hamburgerBtn" aria-label="Toggle menu" onclick="toggleMobileMenu()">
          <i data-lucide="menu" id="menuIcon" style="width: 24px; height: 24px;"></i>
        </button>
      </div>
    </div>

    <div class="mobile-dropdown-menu" id="mobileMenu">
      <a href="#offerings" onclick="toggleMobileMenu()">What We Do</a>
      <a href="#process" onclick="toggleMobileMenu()">Process</a>
      <a href="#engagement" onclick="toggleMobileMenu()">Engagement</a>
      <a href="#team" onclick="toggleMobileMenu()">About</a>
      <button class="btn-menu-book" onclick="openDiscoveryModal('General')">
        <span>Book a Discovery Call</span> <span>↗</span>
      </button>
    </div>
  </nav>

  <!-- ═══ HERO — pinned chaos→order system ═══ -->
  <header class="hero" id="hero">
    <div class="hs-stage" id="hsStage">

      <div class="hs-copy">
        <div class="hs-eyebrow"><span>Fashion Brand Advisory &amp; Operating System</span><i></i></div>

        <h1 class="hs-headline" id="hsHeadline">
          <span class="w"><span>Your</span></span> <span class="w"><span>fashion</span></span> <span class="w"><span>brand,</span></span>
          <em><span class="w"><span>built</span></span> <span class="w"><span>on</span></span> <span class="w"><span>supply-chain</span></span> <span class="w"><span>intelligence.</span></span></em>
        </h1>

        <p class="hs-body" id="hsBody">
          From <strong>market intelligence</strong> to <strong>brand launch</strong> and scale, we partner with founders to build iconic fashion brands that win in the real world.
        </p>

        <div class="hs-cta" id="hsCta">
          <button class="btn-primary-lg" onclick="openDiscoveryModal('Launch Sprint')">
            <span>Book a Discovery Call</span> <span class="arw">↗</span>
          </button>
          <a href="#offerings" class="btn-secondary-lg">
            <span>See how we work</span> <span class="arw">→</span>
          </a>
        </div>

        <div class="hs-stats" id="hsStats">
          <div><div class="sn">10+</div><div class="sl">Years of Experience</div></div>
          <div><div class="sn">50+</div><div class="sl">Brands Launched &amp; Scaled</div></div>
          <div><div class="sn">25+</div><div class="sl">Markets Worldwide</div></div>
        </div>
      </div>

      <div class="hs-plate" id="hsPlate">
        <div class="hs-shots" id="hsShots">
          <div class="hs-shot s0"></div><div class="hs-shot s1"></div><div class="hs-shot s2"></div>
          <div class="hs-shot s3"></div><div class="hs-shot s4"></div><div class="hs-shot s5"></div>
        </div>
        <canvas class="hs-canvas" id="hsCanvas"></canvas>

        <div class="hs-hint" id="hsHint"><span>Scroll</span><i></i></div>

        <div class="hs-foot">
          <div class="hs-rail">
            <div class="hs-rail-line"><div class="hs-rail-fill" id="hsRailFill"></div></div>
            <div class="hs-rail-ticks" id="hsRailTicks">
              <span><b>01</b>Product</span><span><b>02</b>Market</span><span><b>03</b>Intelligence</span>
              <span><b>04</b>Assortment</span><span><b>05</b>Sourcing</span><span><b>06</b>Scale</span>
            </div>
          </div>

        <div class="hs-cap">
          <div class="hs-cap-idx" id="hsCapIdx">01</div>
          <div class="hs-cap-body" id="hsCapBody">
            <div class="hs-cap-item on">
              <span class="hs-cap-label">Product</span>
              <span class="hs-cap-note">Design direction, moodboard review, range finalisation, sample development and quality approvals.</span>
              <span class="hs-cap-credit">Fashion illustration in sketching · <a href="https://commons.wikimedia.org/wiki/File:Fashion_illustration_in_sketching.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons, CC BY-SA</a></span>
            </div>
            <div class="hs-cap-item">
              <span class="hs-cap-label">Market</span>
              <span class="hs-cap-note">Pricing, inventory and revenue across all digital distribution channels.</span>
              <span class="hs-cap-credit">Runway show · <a href="https://commons.wikimedia.org/wiki/File:Runway_show_pexels.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons, CC0</a></span>
            </div>
            <div class="hs-cap-item">
              <span class="hs-cap-label">Trend Intelligence</span>
              <span class="hs-cap-note">Competitor brands analysis on SKU level. Bestseller identification and rating-trend analysis.</span>
              <span class="hs-cap-credit">Grafana dashboard · <a href="https://commons.wikimedia.org/wiki/File:Grafana_Dashboard_(2017).jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons, CC BY-SA</a></span>
            </div>
            <div class="hs-cap-item">
              <span class="hs-cap-label">Assortment</span>
              <span class="hs-cap-note">Enough width to test the range, enough depth to survive a bestseller.</span>
              <span class="hs-cap-credit">Women’s clothes store · <a href="https://commons.wikimedia.org/wiki/File:Women%27s_clothes_store_(Unsplash).jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons, CC0</a></span>
            </div>
            <div class="hs-cap-item">
              <span class="hs-cap-label">Sourcing</span>
              <span class="hs-cap-note">Vendor introductions from our network, fabric library access and production-readiness assessment.</span>
              <span class="hs-cap-credit">Shopping · <a href="https://commons.wikimedia.org/wiki/File:Shopping_freak_(Unsplash).jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons, CC0</a></span>
            </div>
            <div class="hs-cap-item">
              <span class="hs-cap-label">Scale</span>
              <span class="hs-cap-note">Data-driven assortments. Real business outcomes. Build · Scale · Repeat.</span>
              <span class="hs-cap-credit">Shopping · <a href="https://commons.wikimedia.org/wiki/File:Shopping_freak_(Unsplash).jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons, CC0</a></span>
            </div>
          </div>
        </div>

        </div>
      </div>


    </div>
  </header>

  <!-- ═══ TRUSTED TICKER ═══ -->
  <section class="ticker-section">
    <div class="ticker-title">DESIGNED, PRODUCED &amp; SHIPPED FOR</div>
    <div class="ticker-rail">
      <div class="ticker-track" id="tickerTrack">
        <div class="ticker-group" id="tickerGroup">
          <span class="ticker-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Pepe-Jeans-Logo.svg" alt="Pepe Jeans London" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/65c5da9f878952603e370d03_Myntra-Logo_1.svg/1280px-65c5da9f878952603e370d03_Myntra-Logo_1.svg.png" alt="Myntra" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png" alt="Flipkart" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://1000logos.net/wp-content/uploads/2022/08/Nordstrom-logo.png" alt="Nordstrom" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/modified/acd0a1e6-1c5e-4584-a3d3-dcadb2a3d9c0.png" alt="Wildfang" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://download.logo.wine/logo/Gant_(retailer)/Gant_(retailer)-Logo.wine.png" alt="Gant" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUVvrpt0g2OqzElAeBzyDAIN5u7YuwtzkKtI7ag7XC48p7GlPKNMxZEiXw&s=10" alt="Bloomingwear" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://www.iconicindia.com/cdn/shop/files/iconic-logo.png?v=1698047257&width=200" alt="Iconic" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://mir-s3-cdn-cf.behance.net/projects/404/1d635d200302101.Y3JvcCwxMjQyLDk3MSwwLDEzNQ.jpg" alt="The Souled Store" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://wrogn.com/cdn/shop/files/logo_icon_1_bd4a99ba-1c20-43de-81ff-1f5fb0685b8e.svg?v=1736489168&width=100" alt="Wrogn" /></span><span class="ticker-dot"></span>
          <span class="ticker-item"><img src="https://cdn.shopify.com/s/files/1/0606/1785/1119/files/kidbea_logo-05_1.webp?v=1773731230&width=270" alt="Kidbea" /></span><span class="ticker-dot"></span>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ CONVICTION ═══ -->
  <section class="conviction">
    <svg class="conviction-weave" id="convictionWeave" preserveAspectRatio="none" viewBox="0 0 1200 600" aria-hidden="true">
      <g stroke="#C6D5DE" stroke-width="0.7" fill="none" id="weaveLines"></g>
    </svg>
    <div class="container conviction-inner">
      <div class="eyebrow" data-reveal>Operators, not advisers</div>
      <p class="conviction-quote" id="convictionQuote">
        We don't just read about fashion. We have <em>designed, sampled, produced and shipped</em> it — across womenswear, menswear and kidswear.
      </p>
    </div>
  </section>

  <!-- ═══ CAPABILITIES ═══ -->
  <section id="offerings">
    <div class="container cap-intro">
      <div class="eyebrow" data-reveal>What We Bring to the Table</div>
      <h2 class="section-headline" data-reveal style="margin: 22px 0 22px;">Three capabilities, one operating system.</h2>
      <p class="section-description" data-reveal>Everything a founder needs to go from concept to a live, competitive listing — grounded in real supply-chain experience, not theory.</p>
    </div>

    <div class="cap-stack" id="capStack">
      <!-- 01 PRODUCT -->
      <article class="cap-panel">
        <div class="container">
          <div class="cap-grid">
            <div class="cap-num">01</div>
            <div>
              <h3 class="cap-title">Product</h3>
              <p class="cap-body">Design direction, moodboard review, range finalisation, sample development and quality approvals. Assortment planning powered by Lal10 Market Intelligence.</p>
            </div>
            <div class="cap-vis">
              <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <g data-draw>
                  <path class="vthin" d="M60 34 L240 34 M60 34 L60 206 M240 34 L240 206 M60 206 L240 206" />
                  <path class="vline" d="M60 34 C 108 92, 192 92, 240 34" />
                  <path class="vline" d="M60 82 C 112 140, 188 140, 240 82" />
                  <path class="vline" d="M60 130 C 116 188, 184 188, 240 130" />
                  <path class="vthin" d="M150 34 L150 206" />
                  <circle class="vdot" cx="150" cy="34" r="3" />
                  <circle class="vdot" cx="150" cy="120" r="3" />
                  <circle class="vdot" cx="150" cy="206" r="3" />
                </g>
              </svg>
              <span class="cap-vis-label">Pattern · Range · Sample</span>
            </div>
          </div>
        </div>
      </article>

      <!-- 02 TREND INTELLIGENCE -->
      <article class="cap-panel">
        <div class="container">
          <div class="cap-grid">
            <div class="cap-num">02</div>
            <div>
              <span class="cap-tag">Powered by FashionOS</span>
              <h3 class="cap-title">Trend Intelligence</h3>
              <p class="cap-body">Competitor brands analysis on SKU level — pricing, inventory and revenue across all digital distribution channels. Data-driven insight to inform your positioning and go-to-market strategy.</p>
            </div>
            <div class="cap-vis">
              <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <g data-draw>
                  <path class="vthin" d="M36 200 L268 200 M36 40 L36 200" />
                  <path class="vthin" d="M36 160 L268 160 M36 120 L268 120 M36 80 L268 80" stroke-dasharray="2 5" />
                  <path class="vline" d="M36 176 L82 150 L128 158 L174 104 L220 118 L268 62" />
                  <circle class="vdot" cx="82" cy="150" r="2.6" /><circle class="vdot" cx="128" cy="158" r="2.6" />
                  <circle class="vdot" cx="174" cy="104" r="2.6" /><circle class="vdot" cx="220" cy="118" r="2.6" />
                  <circle class="vdot" cx="268" cy="62" r="3.4" />
                  <rect class="vbar" x="52" y="186" width="10" height="14" /><rect class="vbar" x="96" y="178" width="10" height="22" />
                  <rect class="vbar hi" x="140" y="168" width="10" height="32" /><rect class="vbar" x="184" y="182" width="10" height="18" />
                  <rect class="vbar" x="228" y="174" width="10" height="26" />
                </g>
              </svg>
              <span class="cap-vis-label">SKU · Price band · Sell-through</span>
            </div>
          </div>
        </div>
      </article>

      <!-- 03 SOURCING -->
      <article class="cap-panel">
        <div class="container">
          <div class="cap-grid">
            <div class="cap-num">03</div>
            <div>
              <h3 class="cap-title">Sourcing</h3>
              <p class="cap-body">Vendor introductions from our network, fabric library access, supplier shortlisting guidance and production-readiness assessment. Low-MOQ production across factories vetted at the product level: shirts, t-shirts, dresses, polos, kids so you start small with confidence.</p>
            </div>
            <div class="cap-vis">
              <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <g data-draw>
                  <path class="vline" d="M150 120 L64 58 M150 120 L252 74 M150 120 L52 168 M150 120 L242 184 M150 120 L150 36 M150 120 L128 214" />
                  <circle class="vthin" cx="150" cy="120" r="26" />
                  <circle class="vdot" cx="150" cy="120" r="4" />
                  <circle class="vdot" cx="64" cy="58" r="3" /><circle class="vdot" cx="252" cy="74" r="3" />
                  <circle class="vdot" cx="52" cy="168" r="3" /><circle class="vdot" cx="242" cy="184" r="3" />
                  <circle class="vdot" cx="150" cy="36" r="3" /><circle class="vdot" cx="128" cy="214" r="3" />
                  <path class="vthin" d="M64 58 C 120 30, 200 44, 252 74 M52 168 C 110 208, 200 214, 242 184" stroke-dasharray="3 5" />
                </g>
              </svg>
              <span class="cap-vis-label">Vendor · Fabric · Capacity</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>

  <!-- ═══ ENGAGEMENT ═══ -->
  <section id="engagement" class="bg-light-tint section-padding">
    <div class="container">
      <div class="eyebrow" data-reveal>Engagement Options</div>
      <h2 class="section-headline" data-reveal style="margin: 22px 0 22px;">Ways to work with us.</h2>
      <p class="section-description" data-reveal style="margin-bottom: 64px;">Three engagement tracks — from launching your first collection to ongoing growth support and standalone market intelligence.</p>

      <div class="eng-list">
        <div class="eng-panel" data-reveal onclick="openDiscoveryModal('Launch Sprint')">
          <div class="eng-head">
            <div class="eng-index">01</div>
            <h3 class="eng-title">Launch Sprint</h3>
            <div>
              <div class="eng-sub">For founders launching their first collection</div>
              <div class="eng-meta">6–10 week engagement</div>
            </div>
            <div class="eng-arrow">↗</div>
          </div>
          <div class="eng-reveal"><div class="eng-reveal-inner">
            <ul class="eng-features">
              <li>Product strategy — moodboard, range finalisation, design direction</li>
              <li>Assortment planning powered by Market Intelligence</li>
              <li>Fabric mapping and material selection advisory</li>
              <li>Vendor introduction and supplier shortlisting</li>
              <li>Product-market fit validation against live data</li>
              <li>Pricing strategy — MRP, discount corridor, margins</li>
            </ul>
          </div></div>
        </div>

        <div class="eng-panel" data-reveal onclick="openDiscoveryModal('Growth Advisory')">
          <div class="eng-head">
            <div class="eng-index">02</div>
            <h3 class="eng-title">Growth Advisory</h3>
            <div>
              <div class="eng-sub">For brands that want continued strategic guidance</div>
              <div class="eng-meta">Continued strategic guidance</div>
            </div>
            <div class="eng-arrow">↗</div>
          </div>
          <div class="eng-reveal"><div class="eng-reveal-inner">
            <ul class="eng-features gold">
              <li>Monthly performance review — sell-through, returns, health</li>
              <li>Next-collection planning and seasonal calendar</li>
              <li>New category expansion strategy</li>
              <li>Sale-event strategy (EORS, BFF, BBD)</li>
              <li>Ongoing vendor pipeline and sourcing advisory</li>
              <li>Priority access to Lal10's vendor &amp; fabric network</li>
            </ul>
          </div></div>
        </div>

        <div class="eng-panel dark" data-reveal onclick="openDiscoveryModal('Market Intelligence')">
          <div class="eng-head" style="padding-left: 36px; padding-right: 36px;">
            <div class="eng-index">03</div>
            <h3 class="eng-title">Market Intelligence</h3>
            <div>
              <div class="eng-sub">Powered by Lal10's FashionOS arm. Competitor brands analysis on SKU level across all digital distribution channels.</div>
            </div>
            <div class="eng-arrow">↗</div>
          </div>
          <div class="eng-reveal"><div class="eng-reveal-inner">
            <ul class="eng-features gold" style="padding-left: 36px; padding-right: 36px;">
              <li>SKU-level analysis across all digital channels</li>
              <li>Price-band mapping and discount-pattern tracking</li>
              <li>Inventory depth and availability monitoring</li>
              <li>Revenue estimation across digital channels</li>
              <li>Bestseller identification and rating-trend analysis</li>
              <li>Actionable report for assortment &amp; positioning</li>
            </ul>
          </div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ PROCESS ═══ -->
  <section id="process" class="section-padding">
    <div class="container">
      <div class="eyebrow" data-reveal>How It Works</div>
      <h2 class="section-headline" data-reveal style="margin: 22px 0 22px;">From first call to first order.</h2>
      <p class="section-description" data-reveal style="margin-bottom: 64px;">A structured engagement that takes you from vision to a production-ready collection in 6–10 weeks.</p>

      <div class="proc-wrap" id="procWrap">
        <div class="proc-rail">
          <svg preserveAspectRatio="none" viewBox="0 0 2 1000" aria-hidden="true">
            <line class="rail-bg" x1="1" y1="0" x2="1" y2="1000" />
            <line class="rail-fg" id="railFg" x1="1" y1="0" x2="1" y2="1000" />
          </svg>
        </div>
        <div>
          <div class="proc-step">
            <div class="proc-step-time">01 · 30 Min</div>
            <h4>Discovery Call</h4>
            <p>Your vision, budget and category — and whether it's the right fit.</p>
          </div>
          <div class="proc-step">
            <div class="proc-step-time">02 · Week 1–2</div>
            <h4>Diagnostic</h4>
            <p>Budget mapping, market scan and feasibility check against the network.</p>
          </div>
          <div class="proc-step">
            <div class="proc-step-time">03 · Week 2–10</div>
            <h4>Launch Sprint</h4>
            <p>Product and assortment advisory, factory shortlist, locked collection plan.</p>
          </div>
          <div class="proc-step">
            <div class="proc-step-time">04 · Week 4–8</div>
            <h4>Sample &amp; Production</h4>
            <p>Development at actuals — a contained first run before you scale.</p>
          </div>
          <div class="proc-step">
            <div class="proc-step-time">05 · Ongoing</div>
            <h4>Growth Advisory</h4>
            <p>Sell-through review, next-collection planning, category expansion.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ ASSORTMENT INTELLIGENCE ═══ -->
  <section class="assort" id="assortment">
    <div class="container">
      <div class="eyebrow" data-reveal>Assortment Math — Live</div>

      <div class="assort-head" style="margin-top: 26px;">
        <div>
          <h2 class="section-headline" data-reveal style="margin-bottom: 18px;">
            Move the sliders.<br />
            <em>Watch your collection appear.</em>
          </h2>
          <p class="section-description" data-reveal style="font-size: 15px; max-width: 56ch;">
            This is the first model we build in every engagement: a budget, a landed cost, a depth per option — and the collection that math allows. Real plans add category mix, size curves and sell-through assumptions.
          </p>
        </div>
        <div class="assort-head-right" data-reveal style="border-left: 1px solid var(--border-light); padding-left: 36px;">
          <div class="label-xs">From ideas to iconic brands</div>
          <div style="width: 24px; height: 1px; background: #CBD3D8; margin: 12px 0;"></div>
          <p style="font-size: 14px; line-height: 1.65; color: var(--text-subtle);">Smarter assortment planning for a stronger tomorrow.</p>
        </div>
      </div>

      <div class="assort-console" data-reveal>
        <!-- Controls -->
        <div class="assort-controls">
          <div>
            <div class="ctrl-top">
              <span class="ctrl-name">Collection Budget</span>
              <span class="ctrl-val" id="htmlBudgetValue">₹12L</span>
            </div>
            <input type="range" min="1" max="50" step="1" value="12" id="htmlBudgetSlider" class="assortment-slider" oninput="updateAssortmentCalc()" aria-label="Collection budget" />
            <div class="ctrl-scale"><span>₹1L</span><span>₹50L</span></div>
          </div>

          <div>
            <div class="ctrl-top">
              <span class="ctrl-name">Landed Cost per Unit</span>
              <span class="ctrl-val" id="htmlCostValue">₹600</span>
            </div>
            <input type="range" min="100" max="2000" step="50" value="600" id="htmlCostSlider" class="assortment-slider" oninput="updateAssortmentCalc()" aria-label="Landed cost per unit" />
            <div class="ctrl-scale"><span>₹100</span><span>₹2,000</span></div>
          </div>

          <div>
            <div class="ctrl-top">
              <span class="ctrl-name">Depth per Option</span>
              <span class="ctrl-val" id="htmlDepthValue">110 units</span>
            </div>
            <input type="range" min="10" max="500" step="10" value="110" id="htmlDepthSlider" class="assortment-slider" oninput="updateAssortmentCalc()" aria-label="Depth per option" />
            <div class="ctrl-scale"><span>10</span><span>500</span></div>
          </div>

          <div class="read-on-it" onclick="openDiscoveryModal('Launch Sprint')">
            <div>
              <div class="label-xs" style="color: var(--brand-maroon); margin-bottom: 8px;">Read on it</div>
              <p style="font-size: 13px; line-height: 1.65; color: var(--text-muted);">
                A balanced first buy: enough width to test the range, enough depth to survive a bestseller. This is the shape we aim for in a launch sprint.
              </p>
            </div>
            <span class="arw" style="font-size: 18px; color: var(--text-main);">→</span>
          </div>
        </div>

        <!-- Readout -->
        <div class="assort-readout">
          <div class="metric-row">
            <div>
              <div class="metric-num accent" id="htmlOptionsDisplay">18</div>
              <div class="label-xs">Options</div>
            </div>
            <div>
              <div class="metric-num" id="htmlUnitsDisplay">1,980</div>
              <div class="label-xs">Units</div>
            </div>
            <div>
              <div class="metric-num accent" id="htmlMrpDisplay">₹2,040</div>
              <div class="label-xs">Indicative MRP</div>
            </div>
          </div>

          <div>
            <div class="label-xs" style="color: var(--text-muted); margin-bottom: 14px;">The buy, one square per option</div>
            <div class="buy-squares" id="htmlSquaresContainer"></div>
            <div style="font-size: 12px; color: var(--text-light); font-weight: 500;" id="htmlBuySubtext">18 options at 110 units each</div>
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 24px;">
            <div class="label-xs" style="color: var(--text-muted); margin-bottom: 16px;">Size curve, units per option</div>
            <div class="size-row"><span class="sz">S</span><span class="size-track"><span class="size-fill" id="fillS"></span></span><span class="size-val" id="htmlSizeS">17</span></div>
            <div class="size-row"><span class="sz">M</span><span class="size-track"><span class="size-fill" id="fillM"></span></span><span class="size-val" id="htmlSizeM">33</span></div>
            <div class="size-row"><span class="sz">L</span><span class="size-track"><span class="size-fill" id="fillL"></span></span><span class="size-val" id="htmlSizeL">39</span></div>
            <div class="size-row"><span class="sz">XL</span><span class="size-track"><span class="size-fill" id="fillXL"></span></span><span class="size-val" id="htmlSizeXL">21</span></div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 24px; flex-wrap: wrap; gap: 14px;">
            <div class="label-xs">Data-driven assortments.<br />Real business outcomes.</div>
            <div style="width: 1px; height: 28px; background: var(--border-light);"></div>
            <div style="text-align: right;">
              <div style="font-family: var(--font-serif); font-size: 17px; font-weight: 700; letter-spacing: 4px; color: var(--text-main); line-height: 1;">L A L 1 0</div>
              <div class="label-xs" style="margin-top: 4px;">Build · Scale · Repeat</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ LIVE FACTORY FIT ENGINE ═══ -->
      <div class="factory-fit-container" id="factoryFitSection" data-reveal>
        <div class="ff-header-bar">
          <div class="ff-title-group">
            <h3>Factory Fit</h3>
            <p>Match the collection to capabilities that can actually deliver it.</p>
          </div>
          <div class="ff-status-badge">
            <span class="dot"></span>
            <span>142 Vetted Factories • Live Capacity Data</span>
          </div>
        </div>

        <!-- Top Grid -->
        <div class="ff-top-grid">
          <!-- Left: Production Readiness -->
          <div class="ff-readiness-card">
            <div>
              <div class="ff-readiness-top">
                <div class="ff-readiness-label">Production Readiness</div>
                <div class="ff-readiness-score-box">
                  <div>
                    <span class="ff-readiness-score" id="ffReadinessScore">92</span>
                    <span class="ff-readiness-total">/100</span>
                  </div>
                  <span class="ff-fit-tag" id="ffFitTag">High Fit</span>
                </div>
              </div>

              <!-- Segmented block meter (20 blocks) -->
              <div class="ff-meter-blocks" id="ffMeterBlocks">
                <!-- Populated dynamically -->
              </div>

              <p class="ff-readiness-desc" id="ffReadinessDesc">
                Your collection is highly compatible with available factory capabilities, capacity and timelines.
              </p>

              <!-- 5 Metric Rows -->
              <div class="ff-metrics-list">
                <div class="ff-metric-item">
                  <span class="ff-metric-name">Capacity Fit</span>
                  <div class="ff-metric-track"><div class="ff-metric-fill" id="ffMetricCapacityFill" style="width: 96%;"></div></div>
                  <span class="ff-metric-val" id="ffMetricCapacityVal">96</span>
                </div>
                <div class="ff-metric-item">
                  <span class="ff-metric-name">Lead Time</span>
                  <div class="ff-metric-track"><div class="ff-metric-fill" id="ffMetricLeadTimeFill" style="width: 91%;"></div></div>
                  <span class="ff-metric-val" id="ffMetricLeadTimeVal">91</span>
                </div>
                <div class="ff-metric-item">
                  <span class="ff-metric-name">Fabric Capability</span>
                  <div class="ff-metric-track"><div class="ff-metric-fill" id="ffMetricFabricFill" style="width: 94%;"></div></div>
                  <span class="ff-metric-val" id="ffMetricFabricVal">94</span>
                </div>
                <div class="ff-metric-item">
                  <span class="ff-metric-name">Print / Finish</span>
                  <div class="ff-metric-track"><div class="ff-metric-fill" id="ffMetricPrintFill" style="width: 89%;"></div></div>
                  <span class="ff-metric-val" id="ffMetricPrintVal">89</span>
                </div>
                <div class="ff-metric-item">
                  <span class="ff-metric-name">MOQ Fit</span>
                  <div class="ff-metric-track"><div class="ff-metric-fill" id="ffMetricMoqFill" style="width: 95%;"></div></div>
                  <span class="ff-metric-val" id="ffMetricMoqVal">95</span>
                </div>
              </div>
            </div>

            <div class="ff-readiness-foot">
              Based on current collection brief, factory capabilities and available capacity.
            </div>
          </div>

          <!-- Right: Factory Matches -->
          <div class="ff-matches-card">
            <div class="ff-matches-head">
              <span class="ff-matches-title">Factory Matches</span>
              <span class="ff-matches-count" id="ffMatchesCount">Showing 4 of 142</span>
            </div>
            <div class="ff-cards-list" id="ffCardsList">
              <!-- Dynamically populated factory cards -->
            </div>
          </div>
        </div>

        <!-- Capability Coverage Table -->
        <div class="ff-coverage-section">
          <div class="ff-coverage-head">
            <span class="ff-coverage-title">Capability Coverage</span>
            <span class="ff-coverage-sub">Matching your collection across key processes</span>
          </div>
          <div class="ff-table-wrap">
            <table class="ff-table">
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th>Collection Need</th>
                  <th>Matched Factories</th>
                  <th>Coverage</th>
                  <th>Lead Time</th>
                </tr>
              </thead>
              <tbody id="ffTableBody">
                <!-- Dynamically populated rows -->
              </tbody>
            </table>
          </div>
          <div class="ff-coverage-note">
            Coverage reflects factories currently meeting the selected quantity, fabric, process and 45-day production window.
          </div>
        </div>

        <!-- Bottom: What the Data Says -->
        <div class="ff-insights-bar">
          <div class="ff-insight-col">
            <div class="ff-insight-lead-title">What the Data Says</div>
            <div class="ff-insight-lead-sub">Real insights. Production outcomes.</div>
          </div>
          <div class="ff-insight-col">
            <div class="ff-insight-num" id="ffInsightDepth">18</div>
            <div class="ff-insight-label">Options fit within planned depth</div>
          </div>
          <div class="ff-insight-col">
            <div class="ff-insight-num" id="ffInsightWindow">11</div>
            <div class="ff-insight-label">Factories meet the 45-day window</div>
          </div>
          <div class="ff-insight-col">
            <div class="ff-insight-num" id="ffInsightPrint">7</div>
            <div class="ff-insight-label">Factories support required print method</div>
          </div>
          <div class="ff-insight-col">
            <div class="ff-insight-num" id="ffInsightCapacity">4</div>
            <div class="ff-insight-label">Factories have available capacity</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ EXECUTION NETWORK ═══ -->
  <section class="bg-light-tint section-padding">
    <div class="container">
      <div class="eyebrow" data-reveal>Execution Network</div>
      <h2 class="section-headline" data-reveal style="margin: 22px 0 22px;">We advise. Vetted partners execute.</h2>
      <p class="section-description" data-reveal style="margin-bottom: 70px;">
        We're consultants, not an agency. Through Lal10's curated network of affiliate partners, we connect you with verified specialists for everything beyond strategy. Partners bill you directly.
      </p>

      <div class="hub-grid">
        <div class="hub-vis" id="hubVis">
          <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <g data-draw>
              <circle class="hub-ring" cx="200" cy="200" r="188" stroke-dasharray="2 7" />
              <circle class="hub-ring" cx="200" cy="200" r="130" />
              <circle class="hub-ring" cx="200" cy="200" r="72" stroke-dasharray="3 6" />
            </g>
            <g id="hubLinks">
              <path class="hub-link" data-hub="0" d="M200 200 L200 46" />
              <path class="hub-link" data-hub="1" d="M200 200 L333 123" />
              <path class="hub-link" data-hub="2" d="M200 200 L333 277" />
              <path class="hub-link" data-hub="3" d="M200 200 L200 354" />
              <path class="hub-link" data-hub="4" d="M200 200 L67 277" />
              <path class="hub-link" data-hub="5" d="M200 200 L67 123" />
            </g>
            <g id="hubNodes">
              <circle class="hub-node" data-hub="0" cx="200" cy="46" r="7" />
              <circle class="hub-node" data-hub="1" cx="333" cy="123" r="7" />
              <circle class="hub-node" data-hub="2" cx="333" cy="277" r="7" />
              <circle class="hub-node" data-hub="3" cx="200" cy="354" r="7" />
              <circle class="hub-node" data-hub="4" cx="67" cy="277" r="7" />
              <circle class="hub-node" data-hub="5" cx="67" cy="123" r="7" />
            </g>
          </svg>
          <div class="hub-core">
            <div class="hc-mark">LAL10</div>
            <div class="hc-sub">Advisory core</div>
          </div>
        </div>

        <div class="hub-list">
          <div class="hub-item" data-hub="0" onclick="openPartnerModal('Photography & Shoots')">
            <div class="hi-num">01</div>
            <div>
              <div class="hi-title">Photography &amp; Shoots</div>
              <div class="hi-desc">E-commerce, model, flat-lay and lifestyle imagery, shot to marketplace spec.</div>
            </div>
            <div class="hi-arrow">→</div>
          </div>
          <div class="hub-item" data-hub="1" onclick="openPartnerModal('Marketplace Onboarding')">
            <div class="hi-num">02</div>
            <div>
              <div class="hi-title">Marketplace Onboarding</div>
              <div class="hi-desc">Myntra and Amazon account setup, catalog upload, listing and returns handling.</div>
            </div>
            <div class="hi-arrow">→</div>
          </div>
          <div class="hub-item" data-hub="2" onclick="openPartnerModal('Identity & Packaging')">
            <div class="hi-num">03</div>
            <div>
              <div class="hi-title">Identity &amp; Packaging</div>
              <div class="hi-desc">Logo, brand guidelines, packaging, label and tag artwork.</div>
            </div>
            <div class="hi-arrow">→</div>
          </div>
          <div class="hub-item" data-hub="3" onclick="openPartnerModal('Performance Marketing')">
            <div class="hi-num">04</div>
            <div>
              <div class="hi-title">Performance Marketing</div>
              <div class="hi-desc">Marketplace ads, social, influencer outreach and D2C website setup.</div>
            </div>
            <div class="hi-arrow">→</div>
          </div>
          <div class="hub-item" data-hub="4" onclick="openPartnerModal('Legal & Compliance')">
            <div class="hi-num">05</div>
            <div>
              <div class="hi-title">Legal &amp; Compliance</div>
              <div class="hi-desc">Trademark registration, BIS compliance and brand protection.</div>
            </div>
            <div class="hi-arrow">→</div>
          </div>
          <div class="hub-item" data-hub="5" onclick="openPartnerModal('Logistics & Warehousing')">
            <div class="hi-num">06</div>
            <div>
              <div class="hi-title">Logistics &amp; Warehousing</div>
              <div class="hi-desc">3PL setup, warehousing and last-mile delivery optimisation.</div>
            </div>
            <div class="hi-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ TEAM ═══ -->
  <section id="team" class="team-section">
    <div class="container">
      <div class="eyebrow" data-reveal>Who's behind it</div>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 40px; margin: 26px 0 72px;">
        <h2 class="section-headline" data-reveal style="max-width: 16ch;">
          Operators who've built the <em style="color: var(--brand-maroon);">machine.</em>
        </h2>
        <p class="section-description" data-reveal style="max-width: 42ch; font-size: 16px;">
          A founding team spanning marketplace strategy, production discipline, and the technology that ties 50 factories into one system.
        </p>
      </div>

      <div class="team-grid">
        <article class="team-card" data-reveal data-cursor="view">
          <div class="team-img-wrap">
            <img src="/images/team/Maneet.webp" alt="Maneet Gohil" class="team-img" loading="lazy" decoding="async" />
          </div>
          <div class="team-rule"></div>
          <h3 class="team-name">Maneet Gohil</h3>
          <div class="team-role">Co-Founder and CEO, Lal10 &amp; TheFashionOS</div>
          <p class="team-bio">
            Co-founder of Lal10 and TheFashionOS, and a TEDx speaker. Over the past decade he's turned raw ideas into operating companies, with deep expertise in exports and go-to-market. At Lal10 he's built a full-stack fashion ecosystem connecting global D2C and B2B brands with certified MSME factories. Forbes 30 Under 30 and Entrepreneur 35 Under 35.
          </p>
          <div class="team-foot">
            <a href="https://www.linkedin.com/in/maneetgohil/" target="_blank" rel="noopener noreferrer" class="linkedin-link" aria-label="Maneet Gohil LinkedIn">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            <span class="label-xs">LinkedIn</span>
          </div>
        </article>

        <article class="team-card" data-reveal data-cursor="view">
          <div class="team-img-wrap">
            <img src="/images/team/Sanchit.webp" alt="Sanchit Govil" class="team-img" loading="lazy" decoding="async" />
          </div>
          <div class="team-rule"></div>
          <h3 class="team-name">Sanchit Govil</h3>
          <div class="team-role">Co-Founder and COO, Lal10 &amp; Brand Launchpad</div>
          <p class="team-bio">
            Co-founder of Lal10 and Brand Launchpad, where he's built the brand and manufacturer partnerships behind the platform. His background spans supply chain leadership at Flipkart and an engineering-to-IIM path (DCE, IIM Mumbai) that shapes his operator's view of fashion. Forbes India 30 Under 30 and Entrepreneur 35 Under 35 honoree.
          </p>
          <div class="team-foot">
            <a href="https://www.linkedin.com/in/sanchitgovil/" target="_blank" rel="noopener noreferrer" class="linkedin-link" aria-label="Sanchit Govil LinkedIn">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            <span class="label-xs">LinkedIn</span>
          </div>
        </article>

        <article class="team-card" data-reveal data-cursor="view">
          <div class="team-img-wrap">
            <img src="/images/team/Albin.webp" alt="Albin Jose" class="team-img" loading="lazy" decoding="async" />
          </div>
          <div class="team-rule"></div>
          <h3 class="team-name">Albin Jose</h3>
          <div class="team-role">Co-Founder and CPO, Lal10 &amp; TheFashionOS</div>
          <p class="team-bio">
            Co-founder of Lal10 and TheFashionOS, leading product and technology across the ecosystem. He has built LAL10’s ERP and data infrastructure, connecting 50+ factories with their capacity, production, quality, and operational data. His work spans fashion intelligence, trend analysis, dashboards, and technology systems that turn manufacturing and market data into faster, smarter decisions.
          </p>
          <div class="team-foot">
            <a href="https://www.linkedin.com/in/albin-anto-jose-26670532/" target="_blank" rel="noopener noreferrer" class="linkedin-link" aria-label="Albin Jose LinkedIn">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            <span class="label-xs">LinkedIn</span>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ═══ CINEMATIC CTA ═══ -->
  <section id="contact" class="cta-cinema">
    <div class="cta-form" id="ctaForm" aria-hidden="true">
      <div class="cr a"></div><div class="cr b"></div><div class="cr c"></div><div class="cdisc"></div>
    </div>
    <div class="container">
      <div class="cta-inner">
        <div class="eyebrow" data-reveal>Next Step</div>
        <h2 class="cta-headline" data-reveal>Let's start with a conversation.</h2>
        <p class="cta-body" data-reveal>
          A 30-minute discovery call to understand your vision, budget and category — and to figure out if this is the right fit for both of us. No commitment, no pitch.
        </p>
        <button class="btn-cta-cinema" data-reveal onclick="openDiscoveryModal('General')">
          <span>Book a Discovery Call</span> <span class="arw">→</span>
        </button>
      </div>
    </div>
  </section>

  <!-- ═══ INVESTORS ═══ -->
  <section class="inv-section">
    <div class="container">
      <div class="inv-head">
        <div>
          <h2 class="section-headline" data-reveal style="margin-bottom: 18px;">Institutional capital<br />behind the platform.</h2>
          <p class="section-description" data-reveal style="font-size: 15px; max-width: 54ch;">
            Lal10 has raised across seven rounds from a mix of funds and operators — the pre-Series A was led by Yuj Ventures (Xander Group) and Beyond Capital Ventures.
          </p>
        </div>
        <div class="inv-head-right" data-reveal>
          <div class="eyebrow" style="margin-bottom: 16px;">Backed by believers</div>
          <p style="font-size: 15px; line-height: 1.65; color: var(--text-subtle);">
            A community of institutional investors and industry operators who believe in a more efficient, transparent and modern fashion ecosystem.
          </p>
        </div>
      </div>

      <div class="inv-grid">
        <div data-reveal>
          <div class="inv-col-head">
            <div class="label-xs">01</div>
            <h3>Institutional Investors</h3>
            <div class="label-xs" style="font-weight: 600;">Long-term partners backing a larger vision.</div>
          </div>
          <div class="inv-row"><div style="display: flex; align-items: center; gap: 22px;"><span class="irn">01</span><span class="irname">Yuj Ventures (Xander Group)</span></div><span class="arw">→</span></div>
          <div class="inv-row"><div style="display: flex; align-items: center; gap: 22px;"><span class="irn">02</span><span class="irname">Beyond Capital Ventures</span></div><span class="arw">→</span></div>
          <div class="inv-row"><div style="display: flex; align-items: center; gap: 22px;"><span class="irn">03</span><span class="irname">Spiral Ventures</span></div><span class="arw">→</span></div>
          <div class="inv-row"><div style="display: flex; align-items: center; gap: 22px;"><span class="irn">04</span><span class="irname">Singularity Ventures</span></div><span class="arw">→</span></div>
          <div class="inv-row"><div style="display: flex; align-items: center; gap: 22px;"><span class="irn">05</span><span class="irname">Asymmetry Ventures</span></div><span class="arw">→</span></div>
          <div class="inv-row"><div style="display: flex; align-items: center; gap: 22px;"><span class="irn">06</span><span class="irname">BlackSoil</span></div><span class="arw">→</span></div>
          <div class="inv-row"><div style="display: flex; align-items: center; gap: 22px;"><span class="irn">07</span><span class="irname">Panthera Peak</span></div><span class="arw">→</span></div>
          <div class="inv-row"><div style="display: flex; align-items: center; gap: 22px;"><span class="irn">08</span><span class="irname">Pegasus FinInvest</span></div><span class="arw">→</span></div>
          <div class="inv-row"><div style="display: flex; align-items: center; gap: 22px;"><span class="irn">09</span><span class="irname">Suprajit Group</span></div><span class="arw">→</span></div>
        </div>

        <div data-reveal>
          <div class="inv-col-head">
            <div class="label-xs">02</div>
            <h3>Operator Angels</h3>
            <div class="label-xs" style="font-weight: 600;">Builders who have been there.</div>
          </div>
          <div class="inv-row"><span class="irname">Nitish Mittersain</span><div style="display: flex; align-items: center; gap: 18px;"><span class="irmeta">Nazara Technologies</span><span class="arw">→</span></div></div>
          <div class="inv-row"><span class="irname">Bikky Khosla</span><div style="display: flex; align-items: center; gap: 18px;"><span class="irmeta">TradeIndia</span><span class="arw">→</span></div></div>
          <div class="inv-row"><span class="irname">Ashok Gudibandla</span><div style="display: flex; align-items: center; gap: 18px;"><span class="irmeta">Notion</span><span class="arw">→</span></div></div>
          <div class="inv-row"><span class="irname">Kishore Ganji</span><div style="display: flex; align-items: center; gap: 18px;"><span class="irmeta">Astir Ventures</span><span class="arw">→</span></div></div>
          <div class="inv-row"><span class="irname">Partners at McKinsey</span><span class="arw">→</span></div>
          <div class="inv-row"><span class="irname">Insaan Group</span><div style="display: flex; align-items: center; gap: 18px;"><span class="irmeta">Reasoned Ventures</span><span class="arw">→</span></div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ PRESS RAIL ═══ -->
  <section class="press-section" id="pressSection">
    <div class="container" style="margin-bottom: 56px;">
      <div class="eyebrow" data-reveal>In the news</div>
      <h2 class="section-headline" data-reveal style="margin-top: 22px; max-width: 24ch;">Everybody has got something to say about us</h2>
    </div>

    <div class="press-rail-wrap" id="pressRailWrap">
      <div class="press-track" id="pressTrack" style="padding: 0 40px;">
        <a class="press-card" data-cursor="view" href="https://economictimes.indiatimes.com/tech/funding/exclusive-msme-focussed-startup-lal10-raises-5-5-million-in-funding-led-by-yuj-ventures-others/articleshow/92959055.cms" target="_blank" rel="noopener noreferrer">
          <div class="press-img"><img src="https://d2fgyp2oqmihhv.cloudfront.net/images/NewsSectionImages/Desktop/three-standing-founders.webp" alt="The Economic Times" loading="lazy" decoding="async" /></div>
          <div class="press-src">The Economic Times</div>
          <h3 class="press-title">MSME focussed startup Lal10 raises $5.5M in funding</h3>
          <div class="press-read"><span>Read more</span> <span class="arw">→</span></div>
        </a>

        <a class="press-card" data-cursor="view" href="https://inc42.com/buzz/b2b-marketplace-lal10-bags-5-5-mn-to-help-rural-smbs-sell-globally/?itm_source=inc42-popular-read&itm_medium=website&itm_campaign=popular-read-widget" target="_blank" rel="noopener noreferrer">
          <div class="press-img"><img src="https://d2fgyp2oqmihhv.cloudfront.net/images/NewsSectionImages/Desktop/Aunty.webp" alt="Inc42" loading="lazy" decoding="async" /></div>
          <div class="press-src">Inc42</div>
          <h3 class="press-title">Lal10 Bags $5.5 Mn To Help Rural SMBs Sell Globally</h3>
          <div class="press-read"><span>Read more</span> <span class="arw">→</span></div>
        </a>

        <a class="press-card" data-cursor="view" href="https://www.financialexpress.com/industry/sme/lal10-this-startup-is-building-the-alibaba-of-indian-crafts-industry/2401283/" target="_blank" rel="noopener noreferrer">
          <div class="press-img"><img src="https://d2fgyp2oqmihhv.cloudfront.net/images/NewsSectionImages/Desktop/three-sitting-founders.webp" alt="Financial Express" loading="lazy" decoding="async" /></div>
          <div class="press-src">Financial Express</div>
          <h3 class="press-title">Lal10 is building the Alibaba of Indian crafts industry</h3>
          <div class="press-read"><span>Read more</span> <span class="arw">→</span></div>
        </a>

        <a class="press-card" data-cursor="view" href="https://www.thehindubusinessline.com/info-tech/cross-border-trading-platform-lal10-expands-operations-to-japan/article65783052.ece" target="_blank" rel="noopener noreferrer">
          <div class="press-img"><img src="https://d2fgyp2oqmihhv.cloudfront.net/images/NewsSectionImages/Desktop/two-founders.webp" alt="The Hindu BusinessLine" loading="lazy" decoding="async" /></div>
          <div class="press-src">The Hindu BusinessLine</div>
          <h3 class="press-title">Cross-border trading platform expands operations to Japan</h3>
          <div class="press-read"><span>Read more</span> <span class="arw">→</span></div>
        </a>
      </div>
    </div>
  </section>

  <!-- ═══ FOOTER ═══ -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="logo-title">LAL10</div>
          <div class="logo-tagline">From moodboard to marketplace.</div>
        </div>
        <div style="display: flex; gap: 64px; flex-wrap: wrap;">
          <div class="footer-nav-col">
            <h5>Services</h5>
            <a href="#offerings">Product</a>
            <a href="#offerings">Trend Intelligence</a>
            <a href="#offerings">Sourcing</a>
            <a href="#engagement">Market Intelligence</a>
          </div>
          <div class="footer-nav-col">
            <h5>Company</h5>
            <a href="#team">Team</a>
            <a href="#process">How It Works</a>
            <a href="#engagement">Engagement</a>
          </div>
          <div class="footer-nav-col">
            <h5>Get in Touch</h5>
            <button onclick="openDiscoveryModal('General')">Book a Call</button>
            <a href="mailto:launchpad@lal10.com">launchpad@lal10.com</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 Lal10 FashionOS. Part of Lal10.</div>
        <div>The playbook behind launching and scaling brands.</div>
      </div>
    </div>
  </footer>

  <button class="floating-chat-btn" onclick="openDiscoveryModal('Floating Call')" aria-label="Book a call">
    <i data-lucide="message-square" style="width: 21px; height: 21px;"></i>
  </button>

  <!-- ═══ DISCOVERY MODAL ═══ -->
  <div class="modal-overlay" id="discoveryModal" onclick="handleOverlayClick(event, 'discoveryModal')">
    <div class="modal-card">
      <button class="modal-close-btn" onclick="closeDiscoveryModal()" aria-label="Close modal">
        <i data-lucide="x" style="width: 15px; height: 15px;"></i>
      </button>

      <div id="discoveryFormState">
        <div style="padding: 40px 34px 26px; border-bottom: 1px solid #F2F4F5;">
          <div class="label-xs" style="color: var(--brand-gold); margin-bottom: 14px;">Lal10 FashionOS Advisory</div>
          <h2 style="font-family: var(--font-serif); font-size: 32px; font-weight: 400; color: #0A0C0D; margin-bottom: 8px; line-height: 1.1;">
            Book a discovery call
          </h2>
          <p style="font-size: 14px; color: #6A7277; line-height: 1.5;">
            Let’s explore how we can help your brand grow.
          </p>
        </div>

        <form id="discoveryForm" onsubmit="handleDiscoverySubmit(event)" style="padding: 28px 34px 34px; display: flex; flex-direction: column; gap: 20px;">
          <div id="discoveryErrorBox" style="display: none; align-items: center; gap: 10px; padding: 13px 15px; background: rgba(11,58,83,0.07); border: 1px solid rgba(11,58,83,0.2); font-size: 13px; color: var(--brand-maroon);">
            <i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
            <span id="discoveryErrorMsg">Please fill in all required fields.</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-input-group">
              <label class="form-label">Name <span style="color: var(--brand-maroon);">*</span></label>
              <input type="text" class="form-input" id="discFullName" required placeholder="Your name" />
            </div>
            <div class="form-input-group">
              <label class="form-label">Brand <span style="color: var(--brand-maroon);">*</span></label>
              <input type="text" class="form-input" id="discBrandName" required placeholder="Brand name" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-input-group">
              <label class="form-label">Category <span style="color: var(--brand-maroon);">*</span></label>
              <div class="custom-dropdown-wrap" id="categoryDropdownWrap">
                <button type="button" class="custom-dropdown-trigger" id="categoryDropdownBtn" onclick="toggleCustomDropdown('category')">
                  <span class="custom-dropdown-label" id="categoryDropdownLabel">Womenswear</span>
                  <svg class="custom-dropdown-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke="#4C5459" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="custom-dropdown-menu" id="categoryDropdownMenu">
                  <div class="custom-dropdown-item selected" data-value="Womenswear" onclick="selectCustomOption('category', 'Womenswear', 'Womenswear')">
                    <span>Womenswear</span>
                    <span class="check-icon">✓</span>
                  </div>
                  <div class="custom-dropdown-item" data-value="Menswear" onclick="selectCustomOption('category', 'Menswear', 'Menswear')">
                    <span>Menswear</span>
                    <span class="check-icon">✓</span>
                  </div>
                  <div class="custom-dropdown-item" data-value="Kidswear" onclick="selectCustomOption('category', 'Kidswear', 'Kidswear')">
                    <span>Kidswear</span>
                    <span class="check-icon">✓</span>
                  </div>
                  <div class="custom-dropdown-item" data-value="Footwear &amp; Accessories" onclick="selectCustomOption('category', 'Footwear &amp; Accessories', 'Footwear &amp; Accessories')">
                    <span>Footwear &amp; Accessories</span>
                    <span class="check-icon">✓</span>
                  </div>
                  <div class="custom-dropdown-item" data-value="General / Multi-Category" onclick="selectCustomOption('category', 'General / Multi-Category', 'General / Multi-Category')">
                    <span>General / Multi-Category</span>
                    <span class="check-icon">✓</span>
                  </div>
                </div>
                <input type="hidden" id="discCategory" value="Womenswear" />
              </div>
            </div>

            <div class="form-input-group">
              <label class="form-label">Stage</label>
              <div class="custom-dropdown-wrap" id="stageDropdownWrap">
                <button type="button" class="custom-dropdown-trigger" id="stageDropdownBtn" onclick="toggleCustomDropdown('stage')">
                  <span class="custom-dropdown-label placeholder" id="stageDropdownLabel">Select a stage</span>
                  <svg class="custom-dropdown-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke="#4C5459" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="custom-dropdown-menu" id="stageDropdownMenu">
                  <div class="custom-dropdown-item" data-value="Concept &amp; Early Moodboard" onclick="selectCustomOption('stage', 'Concept &amp; Early Moodboard', 'Concept &amp; Early Moodboard')">
                    <span>Concept &amp; Early Moodboard</span>
                    <span class="check-icon">✓</span>
                  </div>
                  <div class="custom-dropdown-item" data-value="Sampling &amp; Development" onclick="selectCustomOption('stage', 'Sampling &amp; Development', 'Sampling &amp; Development')">
                    <span>Sampling &amp; Development</span>
                    <span class="check-icon">✓</span>
                  </div>
                  <div class="custom-dropdown-item" data-value="Production Ready" onclick="selectCustomOption('stage', 'Production Ready', 'Production Ready')">
                    <span>Production Ready</span>
                    <span class="check-icon">✓</span>
                  </div>
                  <div class="custom-dropdown-item" data-value="Scaling an Existing Label" onclick="selectCustomOption('stage', 'Scaling an Existing Label', 'Scaling an Existing Label')">
                    <span>Scaling an Existing Label</span>
                    <span class="check-icon">✓</span>
                  </div>
                  <div class="custom-dropdown-item" data-value="Looking for Market Intelligence" onclick="selectCustomOption('stage', 'Looking for Market Intelligence', 'Looking for Market Intelligence')">
                    <span>Looking for Market Intelligence</span>
                    <span class="check-icon">✓</span>
                  </div>
                </div>
                <input type="hidden" id="discStage" value="" />
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-input-group">
              <label class="form-label">Email <span style="color: var(--brand-maroon);">*</span></label>
              <input type="email" class="form-input" id="discEmail" required placeholder="you@brand.com" />
            </div>
            <div class="form-input-group">
              <label class="form-label">Phone (Optional)</label>
              <input type="tel" class="form-input" id="discPhone" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div class="form-input-group">
            <label class="form-label">Current sourcing challenge</label>
            <textarea class="form-input" id="discNotes" rows="3" style="resize: none;" placeholder="In one line..."></textarea>
          </div>

          <button type="submit" class="form-btn-submit" id="discSubmitBtn">
            <span>Book my call</span>
            <i data-lucide="arrow-up-right" style="width: 16px; height: 16px;"></i>
          </button>

          <div style="display: flex; align-items: center; justify-content: center; gap: 7px;">
            <i data-lucide="lock" style="width: 12px; height: 12px; color: #99A1A5;"></i>
            <span style="font-size: 12px; color: #99A1A5;">We respect your time. No spam, ever.</span>
          </div>
        </form>
      </div>

      <div id="discoverySuccessState" style="display: none; padding: 56px 40px; flex-direction: column; align-items: flex-start;">
        <div style="width: 56px; height: 56px; background: var(--brand-maroon); display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <i data-lucide="check" style="width: 26px; height: 26px; color: #FFFFFF;"></i>
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 30px; font-weight: 400; color: #0A0C0D; margin-bottom: 14px; line-height: 1.2;">
          You’re on the list
        </h3>
        <p style="font-size: 14px; color: #4C5459; line-height: 1.7; max-width: 360px; margin-bottom: 8px;">
          Thank you, <strong style="color: #0A0C0D;" id="successName">Founder</strong>. We’ve received your request for <strong style="color: #0A0C0D;" id="successBrand">your brand</strong>.
        </p>
        <p style="font-size: 13.5px; color: #4C5459; line-height: 1.7; max-width: 360px; margin-bottom: 32px;">
          Our advisory team will send a calendar invite to <strong style="color: var(--brand-maroon);" id="successEmail">your email</strong> within 24 hours.
        </p>
        <button onclick="closeDiscoveryModal()" style="padding: 15px 34px; font-size: 11px; letter-spacing: 2.2px; text-transform: uppercase; font-weight: 700; color: #fff; background: var(--text-main); border: none; cursor: pointer;">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- ═══ PARTNER MODAL ═══ -->
  <div class="modal-overlay" id="partnerModal" onclick="handleOverlayClick(event, 'partnerModal')">
    <div class="modal-card">
      <div style="padding: 28px; background: var(--bg-dark); color: #FFFFFF; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
        <div>
          <div class="label-xs" style="color: var(--brand-gold); margin-bottom: 8px;">Lal10 Partner Network</div>
          <h3 style="font-family: var(--font-serif); font-size: 26px; font-weight: 400; color: #FFFFFF; line-height: 1.15;" id="partnerModalServiceTitle">
            Request Intro: Photography &amp; Shoots
          </h3>
          <p style="font-size: 12.5px; color: rgba(255,255,255,0.7); margin-top: 8px;">
            Direct connection with verified specialist partners. No agency markups.
          </p>
        </div>
        <button onclick="closePartnerModal()" style="background: transparent; border: none; color: rgba(255,255,255,0.7); cursor: pointer;" aria-label="Close">
          <i data-lucide="x" style="width: 20px; height: 20px;"></i>
        </button>
      </div>

      <div style="padding: 30px 34px 34px;">
        <div id="partnerFormState">
          <form id="partnerForm" onsubmit="handlePartnerSubmit(event)" style="display: flex; flex-direction: column; gap: 16px;">
            <div id="partnerErrorBox" style="display: none; align-items: center; gap: 10px; padding: 12px 14px; background: rgba(11,58,83,0.08); color: var(--brand-maroon); font-size: 12.5px;">
              <i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
              <span id="partnerErrorMsg">Please fill in all required fields.</span>
            </div>

            <div class="form-input-group">
              <label class="form-label">Founder Name *</label>
              <input type="text" class="form-input" id="partnerFullName" required placeholder="e.g. Rahul Mehta" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-input-group">
                <label class="form-label">Email *</label>
                <input type="email" class="form-input" id="partnerEmail" required placeholder="rahul@brand.com" />
              </div>
              <div class="form-input-group">
                <label class="form-label">Brand Name *</label>
                <input type="text" class="form-input" id="partnerBrandName" required placeholder="e.g. Atelier Noir" />
              </div>
            </div>

            <div class="form-input-group">
              <label class="form-label">Project Brief &amp; Scope Requirements</label>
              <textarea class="form-input" id="partnerBrief" rows="3" style="resize: none;" placeholder="Describe your timeline, number of SKUs, or specific marketplace requirements..."></textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
              <button type="submit" class="btn-primary-lg" id="partnerSubmitBtn" style="padding: 15px 26px;">
                <span>Request Intro</span>
                <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
          </form>
        </div>

        <div id="partnerSuccessState" style="display: none; padding: 16px 0;">
          <i data-lucide="check-circle-2" style="width: 42px; height: 42px; color: var(--brand-maroon); margin-bottom: 16px; display: block;"></i>
          <h4 style="font-family: var(--font-serif); font-size: 26px; font-weight: 400; color: var(--text-main); margin-bottom: 10px;">Introduction Requested</h4>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 26px; line-height: 1.7;">
            We have received your request for <span id="partnerSuccessServiceName" style="font-weight: 600; color: var(--text-main);">the service</span>. Our ecosystem coordinator will initiate direct email introductions with vetted partners.
          </p>
          <button onclick="closePartnerModal()" style="background: var(--text-main); color: #FFF; padding: 13px 28px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; border: none; cursor: pointer;">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
`;

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: HOME_BODY_HTML }} />
      <Script
        src="/home3.js"
        strategy="afterInteractive"
      />
    </>
  );
}
