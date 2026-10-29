/**
 * Cherry Doces - Script Principal
 * Confeitaria Artesanal por Lorrany Romeu
 * Visualização Galeria: Carrossel 3D Coverflow
 */

document.addEventListener('DOMContentLoaded', () => {
  // Garantir que a página sempre inicie no topo e previna restauração de rolagem
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
  const WHATSAPP_NUMBER = '5511985751371';
  const INSTAGRAM_HANDLE = 'CherryDoces1';

  // Medir dinamicamente a altura exata do cabeçalho para garantir espaçamento perfeito da Hero e Menu
  function updateHeaderHeight() {
    const siteHdr = document.querySelector('.site-header');
    if (siteHdr) {
      const h = Math.ceil(siteHdr.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--site-header-height', `${h}px`);
    }
  }
  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);

  // Base de Dados dos Temas da Galeria
  const GALLERY_CATEGORIES = {
  "naked_cake": {
    "id": "naked_cake",
    "title": "Naked Cake",
    "tag": "Rústico & Frutas",
    "cover": "naked_cake/naked_cake.png",
    "desc": "Visual rústico sofisticado com massas fofinhas, recheios aparentes super fartos, morangos frescos e frutas vermelhas selecionadas.",
    "badge": "Mais Pedido ♡",
    "images": [
      "naked_cake/naked_cake.png",
      "naked_cake/1792714594058.jpg",
      "naked_cake/1792714594124.jpg",
      "naked_cake/1792714594173.jpg",
      "naked_cake/1792714594218.jpg",
      "naked_cake/1792714594349.jpg",
      "naked_cake/1792714594625.jpg",
      "naked_cake/1792714595073.jpg",
      "naked_cake/1792714595225.jpg",
      "naked_cake/1792714595249.jpg",
      "naked_cake/1792714595299.jpg",
      "naked_cake/1792714595322.jpg",
      "naked_cake/1792714595422.jpg",
      "naked_cake/1792714595494.jpg",
      "naked_cake/1792714596234.jpg",
      "naked_cake/bolo_morango.jpg"
    ],
    "count": 16
  },
  "bolo_tematico": {
    "id": "bolo_tematico",
    "title": "Bolos Temáticos & Infantis",
    "tag": "Personagens & Festas",
    "cover": "bolo_tematico/bolo_tematico.jpg",
    "desc": "Criações personalizadas com toppers nobres, temas infantis, heróis, desenhos e decorações divertidas com chantininho de alta definição.",
    "badge": "Personalizado",
    "images": [
      "bolo_tematico/bolo_tematico.jpg",
      "bolo_tematico/1792714594148.jpg",
      "bolo_tematico/1792714594459.jpg",
      "bolo_tematico/1792714594509.jpg",
      "bolo_tematico/1792714594652.jpg",
      "bolo_tematico/1792714594706.jpg",
      "bolo_tematico/1792714595049.jpg",
      "bolo_tematico/1792714595173.jpg",
      "bolo_tematico/1792714595472.jpg",
      "bolo_tematico/1792714595679.jpg",
      "bolo_tematico/1792714595700.jpg",
      "bolo_tematico/1792714595780.jpg",
      "bolo_tematico/1792714595914.jpg",
      "bolo_tematico/1792714596198.jpg",
      "bolo_tematico/1792714596216.jpg",
      "bolo_tematico/1792714596569.jpg",
      "bolo_tematico/IMG_20250902_150650.jpg",
      "bolo_tematico/IMG_20251030_214355.jpg",
      "bolo_tematico/IMG_20251129_121538.jpg",
      "bolo_tematico/IMG_20251207_115335.jpg",
      "bolo_tematico/IMG_20260419_135952.jpg",
      "bolo_tematico/IMG_20260503_140656.jpg",
      "bolo_tematico/IMG_20260625_151328.jpg"
    ],
    "count": 23
  },
  "bolo_coquette": {
    "id": "bolo_coquette",
    "title": "Bolo Estilo Coquette",
    "tag": "Laços & Romantismo",
    "cover": "bolo_coquette/bolo_coquette.jpg",
    "desc": "Tendência delicada e ultra feminina com laços de cetim, pérolas comestíveis, tons pastéis e acabamento vintage com bicos especiais.",
    "badge": "Tendência 2026",
    "images": [
      "bolo_coquette/bolo_coquette.jpg",
      "bolo_coquette/1792714595349.jpg",
      "bolo_coquette/IMG_20260509_182357.jpg"
    ],
    "count": 3
  },
  "bolo_elegante": {
    "id": "bolo_elegante",
    "title": "Bolos Elegantes & Bodas",
    "tag": "Noivados & Comemorações",
    "cover": "bolo_elegante/bolo_elegante.jpg",
    "desc": "Elegância minimalista em chantininho aveludado, flores nobres, detalhes dourados e textura espatulada para momentos inesquecíveis.",
    "badge": "Sofisticado",
    "images": [
      "bolo_elegante/bolo_elegante.jpg",
      "bolo_elegante/1792714595073.jpg",
      "bolo_elegante/1792714595556.jpg",
      "bolo_elegante/1792714596388.jpg",
      "bolo_elegante/IMG_20251026_160522.jpg",
      "bolo_elegante/IMG_20251204_193619.jpg",
      "bolo_elegante/IMG_20251225_195837.jpg",
      "bolo_elegante/IMG_20260207_115033.jpg",
      "bolo_elegante/IMG_20260313_174218.jpg",
      "bolo_elegante/IMG_20260313_231923.jpg",
      "bolo_elegante/IMG_20260419_140007.jpg"
    ],
    "count": 11
  },
  "bolo_corte": {
    "id": "bolo_corte",
    "title": "Bolos de Corte",
    "tag": "Rendimento & Festas",
    "cover": "bolo_corte/bolo_corte.png",
    "desc": "Praticidade e generosidade em fatias uniformes. Massa molhadinha e recheios fartos para servir muitos convidados com elegância e economia.",
    "badge": "Super Farto",
    "images": [
      "bolo_corte/bolo_corte.png",
      "bolo_corte/1792714594240.jpg",
      "bolo_corte/1792714594377.jpg",
      "bolo_corte/1792714595023.jpg",
      "bolo_corte/1792714595580.jpg",
      "bolo_corte/1792714596036.jpg",
      "bolo_corte/IMG_20250821_081402.jpg",
      "bolo_corte/IMG_20260301_114050.jpg",
      "bolo_corte/IMG_20260526_211347.jpg"
    ],
    "count": 9
  },
  "dec_simples": {
    "id": "dec_simples",
    "title": "Decoração Simples & Afetiva",
    "tag": "Clássicos do Dia a Dia",
    "cover": "dec_simples/dec_simples.jpg",
    "desc": "Visual acolhedor com bicos artesanais de chantininho cremoso, granulados coloridos e muito sabor para celebrações íntimas e em família.",
    "badge": "Artesanal",
    "images": [
      "dec_simples/dec_simples.jpg",
      "dec_simples/1792714594599.jpg",
      "dec_simples/1792714595273.jpg",
      "dec_simples/1792714596051.jpg",
      "dec_simples/1792714596180.jpg",
      "dec_simples/1792714596427.jpg",
      "dec_simples/1792714596505.jpg"
    ],
    "count": 7
  },
  "bento_cake": {
    "id": "bento_cake",
    "title": "Bentô Cake Tradicional",
    "tag": "Memes & Mensagens",
    "cover": "bento_cake/bento_cake.png",
    "desc": "O clássico mini bolo com frases divertidas, desenhos cômicos ou mensagens afetivas para surpreender alguém especial em qualquer data.",
    "badge": "Queridinho",
    "images": [
      "bento_cake/bento_cake.png",
      "bento_cake/1792714594569.jpg",
      "bento_cake/1792714595199.jpg",
      "bento_cake/1792714595537.jpg",
      "bento_cake/1792714595859.jpg",
      "bento_cake/IMG_20251005_121630.jpg"
    ],
    "count": 6
  },
  "bento_marmitinha": {
    "id": "bento_marmitinha",
    "title": "Bentô na Marmitinha",
    "tag": "Presenteável & Prático",
    "cover": "bento_marmitinha/bento_marmitinha.jpg",
    "desc": "Apresentação irresistível na marmitinha de isopor decorada, com garfinho de madeira e velinha inclusos. O mimo perfeito para presentear.",
    "badge": "Mimo Perfeito",
    "images": [
      "bento_marmitinha/bento_marmitinha.jpg",
      "bento_marmitinha/1792714595373.jpg",
      "bento_marmitinha/1792714596001.jpg",
      "bento_marmitinha/IMG_20251005_150304.jpg"
    ],
    "count": 4
  },
  "bolo_caseiro": {
    "id": "bolo_caseiro",
    "title": "Bolos Caseiros da Vovó",
    "tag": "Café da Tarde",
    "cover": "bolo_caseiro/bolo_caseiro.jpg",
    "desc": "Receitas afetivas fofinhas com vulcão de chocolate, calda de laranja, goiabada ou fubá cremoso para deixar qualquer tarde mais especial.",
    "badge": "Sabor de Casa",
    "images": [
      "bolo_caseiro/bolo_caseiro.jpg",
      "bolo_caseiro/1792714594759.jpg",
      "bolo_caseiro/1792714594924.jpg",
      "bolo_caseiro/1792714594950.jpg",
      "bolo_caseiro/1792714594974.jpg",
      "bolo_caseiro/1792714596688.jpg",
      "bolo_caseiro/1792714596746.jpg"
    ],
    "count": 7
  },
  "cento_doce": {
    "id": "cento_doce",
    "title": "Cento de Brigadeiros & Doces",
    "tag": "Tradicionais & Gourmet",
    "cover": "cento_doce/cento_doce.jpg",
    "desc": "Brigadeiros tradicionais e gourmet boleados à mão com granulados nobres (ao leite, Ninho, beijinho, bicho de pé e paçoca) para a sua festa.",
    "badge": "Festa Completa",
    "images": [
      "cento_doce/cento_doce.jpg",
      "cento_doce/1792714594431.jpg",
      "cento_doce/1792714594483.jpg",
      "cento_doce/1792714595111.jpg",
      "cento_doce/1792714595983.jpg",
      "cento_doce/1792714596786.jpg",
      "cento_doce/IMG_20260301_114558.jpg",
      "cento_doce/IMG_20260312_205111.jpg"
    ],
    "count": 8
  },
  "natal_especial": {
    "id": "natal_especial",
    "title": "Especial de Natal & Festas",
    "tag": "Edição Limitada de Fim de Ano 🎄",
    "cover": "natal/logo_natal.jpg",
    "desc": "Delícias especiais para a ceia de Natal e Réveillon: Bolos decorados, bombons de travessa, pudins e tortas artesanais para celebrar com a família.",
    "badge": "Edição de Natal 🎄",
    "images": [
      "natal/Gemini_Generated_Image_8j96qo8j96qo8j96.jpg",
      "natal/IMG_20251121_172131.jpg",
      "natal/IMG_20251122_162656.jpg",
      "natal/IMG_20251205_072206.jpg",
      "natal/Sobremesas Cremosas com Chocolate e Calda Dourada.png",
      "natal/bolo de limão.png",
      "natal/bolo natalino.png",
      "natal/bombom de travessa.png",
      "natal/natal_inicial.jpg",
      "natal/pudim.png",
      "natal/torta de limao.jpg"
    ],
    "count": 11
  },
  "pascoa_especial": {
    "id": "pascoa_especial",
    "title": "Especial de Páscoa",
    "tag": "Ovos de Colher & Chocolates 🐰",
    "cover": "pascoa/logo_pascoa.jpg",
    "desc": "Criações pascoais artesanais: Ovos de colher super recheados em caixas presenteáveis, ovos trufados e muito chocolate nobre feito sob encomenda.",
    "badge": "Edição Páscoa 🐰",
    "images": [
      "pascoa/IMG_20260401_215021.jpg",
      "pascoa/IMG_20260403_133437.jpg",
      "pascoa/IMG_20260403_133501.jpg",
      "pascoa/IMG_20260403_133723.jpg",
      "pascoa/IMG_20260403_140421.jpg",
      "pascoa/IMG_20260403_140447.jpg",
      "pascoa/IMG_20260404_122623.jpg",
      "pascoa/IMG_20260404_122627.jpg",
      "pascoa/IMG_20260404_144916.jpg",
      "pascoa/IMG_20260404_160704.jpg",
      "pascoa/IMG_20260404_162312.jpg",
      "pascoa/IMG_20260404_195912.jpg",
      "pascoa/IMG_20260404_214043.jpg",
      "pascoa/IMG_20260405_000719.jpg",
      "pascoa/IMG_20260405_121421.jpg",
      "pascoa/IMG_20260405_122003.jpg",
      "pascoa/IMG_20260510_164107.jpg",
      "pascoa/IMG_20260510_164153.jpg",
      "pascoa/IMG_20260531_160522.jpg",
      "pascoa/Screenshot_2026-03-11-15-43-28-177_com.google.android.apps.photos.jpg",
      "pascoa/Screenshot_2026-03-11-15-47-21-126_com.google.android.apps.photos.jpg",
      "pascoa/WhatsApp Image 2026-10-23 at 11.34.17.jpeg",
      "pascoa/WhatsApp Image 2026-10-23 at 11.34.23.jpeg",
      "pascoa/pascoa_inicial.jpg"
    ],
    "count": 24
  }
};


      // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      const isExpanded = mobileToggle.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Navegação suave com prevenção de hashes na URL que causariam rolagem no reload
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetHash = this.getAttribute('href');
      if (!targetHash || targetHash === '#' || targetHash === '#cardapio') return;
      const targetElement = document.querySelector(targetHash);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        if (history.replaceState) {
          history.replaceState(null, null, window.location.pathname + window.location.search);
        }
      }
    });
  });

  // 2. Sticky Header shadow on scroll
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 3. Active Nav Link on Scroll (Scrollspy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  });

  // 4. Filtros Visuais Rápidos da Galeria
  const filterBtns = document.querySelectorAll('.filter-btn');
  const categoryCards = document.querySelectorAll('.category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      categoryCards.forEach(card => {
        const group = card.getAttribute('data-filter-group');
        if (filterValue === 'all' || group === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInDown 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 4.5 Sistema Automatizado de Cardápios & Galerias Sazonais (Natal & Páscoa)
  // ==========================================================================

  function checkAdminMode() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('admin') || urlParams.has('dev') || urlParams.has('simulador')) {
      const val = (urlParams.get('admin') || urlParams.get('dev') || urlParams.get('simulador') || '').toLowerCase();
      if (val === 'off' || val === 'false' || val === '0') {
        localStorage.removeItem('cherry_admin_mode');
        return false;
      }
      localStorage.setItem('cherry_admin_mode', 'true');
      return true;
    }
    return localStorage.getItem('cherry_admin_mode') === 'true';
  }

  function determineActiveSeason() {
    // 1. Verificar override via parâmetro URL (?season=natal | ?season=pascoa | ?season=off)
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('season');
    if (param && ['natal', 'pascoa', 'off'].includes(param.toLowerCase())) {
      return param.toLowerCase();
    }

    // 2. Verificar preferência do simulador (apenas se estiver em modo admin)
    if (checkAdminMode()) {
      const stored = localStorage.getItem('cherry_season_override');
      if (stored && ['natal', 'pascoa', 'off'].includes(stored)) {
        return stored;
      }
    }

    // 3. Regra Automática por Data Real:
    // - Páscoa: A partir de 15 de Fevereiro (mês 1, dia >= 15) até 30 de Abril (mês 3)
    // - Natal: A partir de 15 de Outubro (mês 9, dia >= 15) até 15 de Janeiro (mês 0)
    // - Outros meses: 'off' ("Cardápios sazonais em breve")
    const now = new Date();
    const month = now.getMonth(); // 0-indexed: 0=Jan, 1=Fev, ... 9=Out, 10=Nov, 11=Dez
    const day = now.getDate();

    const isNatal = (month === 9 && day >= 15) || (month === 10) || (month === 11) || (month === 0 && day <= 15);
    const isPascoa = (month === 1 && day >= 15) || (month === 2) || (month === 3);

    if (isNatal) return 'natal';
    if (isPascoa) return 'pascoa';
    return 'off';
  }

  function renderSeasonalAmbientParticles(season) {
    const ambientContainer = document.getElementById('seasonalAmbientDecor');
    if (!ambientContainer) return;
    ambientContainer.innerHTML = '';

    if (season !== 'natal' && season !== 'pascoa') return;

    const symbols = season === 'natal'
      ? ['🎄', '⭐', '❄️', '✨', '🎁', '🔔', '🍪']
      : ['🐰', '🌸', '🥚', '🌷', '✨', '🍫', '🎀'];

    const particleCount = 16;
    for (let i = 0; i < particleCount; i++) {
      const span = document.createElement('span');
      span.className = 'seasonal-particle';
      span.textContent = symbols[i % symbols.length];
      const leftPos = (i * (100 / particleCount) + (i % 3) * 2) % 98;
      const duration = 11 + (i % 7) * 2.2;
      const delay = (i * 0.85) % 10;
      const fontSize = 0.85 + (i % 4) * 0.22;
      span.style.left = `${leftPos}%`;
      span.style.animationDuration = `${duration}s`;
      span.style.animationDelay = `-${delay}s`;
      span.style.fontSize = `${fontSize}rem`;
      ambientContainer.appendChild(span);
    }
  }

  function applySeasonalThemeAndLogos(activeSeason) {
    // 1. Classes de tema global no <body>
    document.body.classList.remove('season-natal', 'season-pascoa', 'season-off');
    document.body.classList.add(`season-${activeSeason}`);

    // 2. Definir qual logo usar conforme a época
    const logoMap = {
      natal: 'natal/logo_natal.jpg',
      pascoa: 'pascoa/logo_pascoa.jpg',
      off: 'logo-badge.png'
    };
    const activeLogoSrc = logoMap[activeSeason] || 'logo-badge.png';

    const logoAltMap = {
      natal: 'Logotipo Cherry Doces - Edição Especial de Natal',
      pascoa: 'Logotipo Cherry Doces - Edição Especial de Páscoa',
      off: 'Logotipo Cherry Doces'
    };
    const activeLogoAlt = logoAltMap[activeSeason] || 'Logotipo Cherry Doces';

    // Atualizar todas as logos no cabeçalho e no rodapé
    document.querySelectorAll('.brand-logo-img, .footer-logo-img').forEach(img => {
      img.src = activeLogoSrc;
      img.alt = activeLogoAlt;
    });

    // Atualizar subtítulo da marca no cabeçalho e rodapé
    const headerSub = document.getElementById('headerBrandSubtitle');
    const footerBadge = document.getElementById('footerBrandBadge');
    if (activeSeason === 'natal') {
      if (headerSub) headerSub.textContent = '🎄 Especial de Natal';
      if (footerBadge) footerBadge.textContent = '🎄 Edição Especial de Natal';
    } else if (activeSeason === 'pascoa') {
      if (headerSub) headerSub.textContent = '🐰 Especial de Páscoa';
      if (footerBadge) footerBadge.textContent = '🐰 Edição Especial de Páscoa';
    } else {
      if (headerSub) headerSub.textContent = 'Doces Artesanais';
      if (footerBadge) footerBadge.textContent = 'Doces Artesanais';
    }

    // 3. Faixa Festiva Superior no Topo do Header (#seasonalTopRibbon)
    const topRibbon = document.getElementById('seasonalTopRibbon');
    if (topRibbon) {
      if (activeSeason === 'natal') {
        topRibbon.className = 'seasonal-top-ribbon active';
        topRibbon.innerHTML = `
          <div class="seasonal-top-ribbon-inner">
            <span>🎄 <strong>Especial de Natal &amp; Réveillon Cherry Doces:</strong> Encomendas abertas até 20/12! ✨</span>
            <button type="button" class="seasonal-top-ribbon-cta js-open-catalog">📖 Cardápio de Natal</button>
            <button type="button" class="seasonal-top-ribbon-cta btn-ribbon-lembrancinhas js-open-lembrancinhas" id="ribbonNatalLembrancinhasBtn">🎁 Lembrancinhas</button>
            <button type="button" class="seasonal-top-ribbon-cta" id="ribbonNatalGalleryBtn">🖼️ Fotos de Natal</button>
          </div>
        `;
        const ribbonBtn = document.getElementById('ribbonNatalGalleryBtn');
        if (ribbonBtn) ribbonBtn.addEventListener('click', () => openCategoryCarousel('natal_especial'));
      } else if (activeSeason === 'pascoa') {
        topRibbon.className = 'seasonal-top-ribbon active';
        topRibbon.innerHTML = `
          <div class="seasonal-top-ribbon-inner">
            <span>🐰 <strong>Especial de Páscoa Artesanal Cherry Doces:</strong> Ovos de Colher &amp; Chocolates Recheados! 🍫🥚</span>
            <button type="button" class="seasonal-top-ribbon-cta js-open-catalog">📖 Cardápio de Páscoa</button>
            <button type="button" class="seasonal-top-ribbon-cta" id="ribbonPascoaGalleryBtn">🖼️ Fotos de Páscoa</button>
          </div>
        `;
        const ribbonBtn = document.getElementById('ribbonPascoaGalleryBtn');
        if (ribbonBtn) ribbonBtn.addEventListener('click', () => openCategoryCarousel('pascoa_especial'));
      } else {
        topRibbon.className = 'seasonal-top-ribbon';
        topRibbon.innerHTML = '';
      }
    }

    // 4. Foto Inicial, Descrições, Saudação e Emblemas Sazonais na Seção Hero
    const heroPill = document.getElementById('heroGreetingPill');
    const heroLogoMount = document.getElementById('heroSeasonalLogoMount');
    const heroFrameLogo = document.getElementById('heroFrameSeasonalLogo');
    const heroFloatingBadgeTop = document.getElementById('heroFloatingBadgeTop');
    const heroPhotoImg = document.getElementById('heroPhotoImg');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroSealIcon = document.getElementById('heroSealIcon');
    const heroSealTitle = document.getElementById('heroSealTitle');
    const heroSealSubtitle = document.getElementById('heroSealSubtitle');

    if (activeSeason === 'natal') {
      if (heroPhotoImg) {
        heroPhotoImg.src = 'natal/natal_inicial.jpg';
        heroPhotoImg.alt = 'Sobremesas e Bolos Especiais de Natal - Cherry Doces';
      }
      if (heroSubtitle) {
        heroSubtitle.innerHTML = 'Cardápio especial de fim de ano com bolos temáticos, sobremesas artesanais e muito carinho para adoçar a sua ceia de Natal e Réveillon em Carapicuíba e região.';
      }
      if (heroSealIcon) heroSealIcon.textContent = '🎄';
      if (heroSealTitle) heroSealTitle.textContent = 'Bolo Natalino';
      if (heroSealSubtitle) heroSealSubtitle.textContent = 'Ceia & Réveillon Cherry Doces ♡';

      if (heroPill) {
        heroPill.innerHTML = '<span>🎄</span> Temporada Especial de Natal &amp; Festas • Encomendas Abertas!';
      }
      if (heroFloatingBadgeTop) {
        heroFloatingBadgeTop.innerHTML = '<span>🎄</span> Especial de Natal';
      }
      if (heroLogoMount) {
        heroLogoMount.innerHTML = `
          <div class="hero-seasonal-emblem-card natal">
            <img src="natal/logo_natal.jpg" alt="Logo Especial de Natal Cherry Doces" class="hero-seasonal-emblem-img">
            <div class="hero-seasonal-emblem-info">
              <span class="hero-seasonal-emblem-tag">🎄 Clima Natalino Cherry Doces</span>
              <div class="hero-seasonal-emblem-title">Sobremesas Exclusivas para a sua Ceia de Natal &amp; Ano Novo</div>
              <div class="hero-seasonal-emblem-actions-row">
                <button type="button" class="hero-seasonal-emblem-btn btn-view-lembrancinhas js-open-lembrancinhas" id="heroNatalLembrancinhasLink">
                  🎁 Lembrancinhas de Natal
                </button>
                <button type="button" class="hero-seasonal-emblem-btn btn-view-photos" id="heroNatalGalleryLink">
                  🖼️ Ver Fotos de Natal (11 Fotos)
                </button>
                <a href="cardapio_natal.pdf" target="_blank" rel="noopener noreferrer" class="hero-seasonal-emblem-btn btn-view-cardapio" id="heroNatalPdfLink">
                  📖 Ver Cardápio (PDF) &rarr;
                </a>
              </div>
            </div>
          </div>
        `;
        const heroLink = document.getElementById('heroNatalGalleryLink');
        if (heroLink) heroLink.addEventListener('click', () => openCategoryCarousel('natal_especial'));
      }
      if (heroFrameLogo) {
        heroFrameLogo.innerHTML = '<img src="natal/logo_natal.jpg" alt="Selo Natal Cherry Doces">';
      }
    } else if (activeSeason === 'pascoa') {
      if (heroPhotoImg) {
        heroPhotoImg.src = 'pascoa/pascoa_inicial.jpg';
        heroPhotoImg.alt = 'Ovos de Colher Artesanais de Páscoa - Cherry Doces';
      }
      if (heroSubtitle) {
        heroSubtitle.innerHTML = 'Temporada especial de Páscoa em Carapicuíba. Ovos de colher artesanais super recheados, cascas de chocolate nobre e presentes deliciosos feitos sob encomenda com muito amor.';
      }
      if (heroSealIcon) heroSealIcon.textContent = '🐰';
      if (heroSealTitle) heroSealTitle.textContent = 'Ovo da Páscoa';
      if (heroSealSubtitle) heroSealSubtitle.textContent = 'Criação Artesanal Cherry Doces ♡';

      if (heroPill) {
        heroPill.innerHTML = '<span>🐰</span> Temporada Especial de Páscoa • Ovos de Colher &amp; Chocolates!';
      }
      if (heroFloatingBadgeTop) {
        heroFloatingBadgeTop.innerHTML = '<span>🐰</span> Especial de Páscoa';
      }
      if (heroLogoMount) {
        heroLogoMount.innerHTML = `
          <div class="hero-seasonal-emblem-card pascoa">
            <img src="pascoa/logo_pascoa.jpg" alt="Logo Especial de Páscoa Cherry Doces" class="hero-seasonal-emblem-img">
            <div class="hero-seasonal-emblem-info">
              <span class="hero-seasonal-emblem-tag">🐰 Doce Páscoa Cherry Doces</span>
              <div class="hero-seasonal-emblem-title">Ovos de Colher Recheados &amp; Presentes Artesanais de Páscoa</div>
              <div class="hero-seasonal-emblem-actions-row">
                <button type="button" class="hero-seasonal-emblem-btn btn-view-photos" id="heroPascoaGalleryLink">
                  🖼️ Ver Fotos de Páscoa (24 Fotos)
                </button>
                <a href="cardapio_pascoa.pdf" target="_blank" rel="noopener noreferrer" class="hero-seasonal-emblem-btn btn-view-cardapio" id="heroPascoaPdfLink">
                  📖 Ver Cardápio (PDF) &rarr;
                </a>
              </div>
            </div>
          </div>
        `;
        const heroLink = document.getElementById('heroPascoaGalleryLink');
        if (heroLink) heroLink.addEventListener('click', () => openCategoryCarousel('pascoa_especial'));
      }
      if (heroFrameLogo) {
        heroFrameLogo.innerHTML = '<img src="pascoa/logo_pascoa.jpg" alt="Selo Páscoa Cherry Doces">';
      }
    } else {
      if (heroPhotoImg) {
        heroPhotoImg.src = 'assets/products/bolo_inicial_fotografico.jpg';
        heroPhotoImg.alt = 'Bolo Artesanal de Morangos com Laço Vermelho - Cherry Doces';
      }
      if (heroSubtitle) {
        heroSubtitle.innerHTML = 'Produção exclusiva e fresquinha em Carapicuíba. Ingredientes nobres, recheios fartos e muito carinho em cada detalhe para adoçar suas celebrações.';
      }
      if (heroSealIcon) heroSealIcon.textContent = '🎂';
      if (heroSealTitle) heroSealTitle.textContent = 'Bolo Festa Morango';
      if (heroSealSubtitle) heroSealSubtitle.textContent = 'Criação Artesanal Cherry Doces ♡';

      if (heroPill) {
        heroPill.innerHTML = '<span>🍰</span> Confeitaria 100% Artesanal &amp; Afetiva';
      }
      if (heroFloatingBadgeTop) {
        heroFloatingBadgeTop.innerHTML = '<span>🍓</span> Morangos Frescos';
      }
      if (heroLogoMount) heroLogoMount.innerHTML = '';
      if (heroFrameLogo) heroFrameLogo.innerHTML = '';
    }

    // 5. Partículas Ambientais Flutuantes (Neve / Estrelas no Natal; Ovos / Coelhinhos na Páscoa)
    renderSeasonalAmbientParticles(activeSeason);
    setTimeout(updateHeaderHeight, 50);
  }

  function initSeasonalSystem() {
    const isAdmin = checkAdminMode();
    if (isAdmin) {
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.remove('admin-mode');
    }

    const activeSeason = determineActiveSeason();
    const activeOverride = (isAdmin && localStorage.getItem('cherry_season_override')) ? localStorage.getItem('cherry_season_override') : 'auto';

    const simulatorHtml = isAdmin ? `
      <div class="season-simulator-widget">
        <span class="season-simulator-label">⚙️ Simulador de Temporadas (Apenas você vê):</span>
        <div class="season-simulator-buttons">
          <button class="season-sim-btn ${activeOverride === 'auto' ? 'active' : ''}" data-season="auto">Automático (Data)</button>
          <button class="season-sim-btn ${activeSeason === 'natal' && activeOverride !== 'auto' ? 'active' : ''}" data-season="natal">🎄 Natal</button>
          <button class="season-sim-btn ${activeSeason === 'pascoa' && activeOverride !== 'auto' ? 'active' : ''}" data-season="pascoa">🐰 Páscoa</button>
          <button class="season-sim-btn ${activeSeason === 'off' && activeOverride !== 'auto' ? 'active' : ''}" data-season="off">⏳ Fora de Época</button>
          <button class="season-sim-btn close-admin-btn" id="btnCloseAdminSim" title="Ocultar simulador e voltar à visão dos clientes" style="background: rgba(220,53,69,0.3); border-color: rgba(220,53,69,0.5); margin-left: 0.5rem;">✕ Ocultar</button>
        </div>
      </div>
    ` : '';

    // Aplicar Tema de Decoração da Época e Trocar Logos (logo_natal / logo_pascoa / padrão)
    applySeasonalThemeAndLogos(activeSeason);

    const bannerMount = document.getElementById('seasonalBannerMount');
    const filtersContainer = document.getElementById('galleryFilters');
    const categoryGrid = document.getElementById('categoryGrid');
    const catalogMount = document.getElementById('catalogSeasonalMount');

    // ----------------------------------------------------
    // A. Renderizar Banner de Destaque na Galeria
    // ----------------------------------------------------
    if (bannerMount) {
      if (activeSeason === 'natal') {
        bannerMount.innerHTML = `
          <div class="seasonal-highlight-banner theme-natal">
            <div class="seasonal-banner-header">
              <span class="seasonal-badge">🎄 Edição Especial de Fim de Ano</span>
              <span class="seasonal-banner-deadline">📅 Encomendas até 20/12!</span>
            </div>
            <div class="seasonal-banner-brand-row">
              <img src="natal/logo_natal.jpg" alt="Logo Natal Cherry Doces" class="seasonal-banner-logo-medallion">
              <div>
                <h3 class="seasonal-banner-title">✦ Cardápio e Galeria Especial de Natal &amp; Réveillon ✦</h3>
                <p class="seasonal-banner-desc" style="margin-bottom: 0;">
                  Já estamos aceitando encomendas para a ceia de Natal e Réveillon! Bolos temáticos decorados, Bombons de travessa fartos, Tortas artesanais e Pudim de leite condensado tradicional com calda dourada. Garanta já a sua sobremesa antes do encerramento das vagas!
                </p>
              </div>
            </div>
            <div class="seasonal-banner-actions">
              <button class="btn-seasonal-cta btn-primary js-open-catalog">
                📖 Ver Cardápio de Natal Completo
              </button>
              <button class="btn-seasonal-cta btn-lembrancinhas js-open-lembrancinhas" id="btnOpenNatalLembrancinhas">
                🎁 Lembrancinhas de Natal
              </button>
              <button class="btn-seasonal-cta btn-outline" id="btnOpenNatalGallery">
                🖼️ Ver Fotos dos Doces de Natal (11 Fotos)
              </button>
            </div>
${simulatorHtml}
          </div>
        `;
      } else if (activeSeason === 'pascoa') {
        bannerMount.innerHTML = `
          <div class="seasonal-highlight-banner theme-pascoa">
            <div class="seasonal-banner-header">
              <span class="seasonal-badge">🐰 Edição Especial de Páscoa</span>
              <span class="seasonal-banner-deadline">📅 Vagas Limitadas da Temporada</span>
            </div>
            <div class="seasonal-banner-brand-row">
              <img src="pascoa/logo_pascoa.jpg" alt="Logo Páscoa Cherry Doces" class="seasonal-banner-logo-medallion">
              <div>
                <h3 class="seasonal-banner-title">✦ Cardápio e Galeria Especial de Páscoa ✦</h3>
                <p class="seasonal-banner-desc" style="margin-bottom: 0;">
                  Temporada dos mais pedidos Ovos de Colher recheados artesanais (Ninho com Morangos Frescos, Prestígio, Maracujá e Brigadeiro Belga), Ovos Trufados e caixas presenteáveis com chocolate nobre para presentear e celebrar!
                </p>
              </div>
            </div>
            <div class="seasonal-banner-actions">
              <a href="cardapio_pascoa.pdf" target="_blank" rel="noopener noreferrer" class="btn-seasonal-cta btn-primary" style="text-decoration: none;">
                📖 Ver Cardápio de Páscoa (PDF)
              </a>
              <button class="btn-seasonal-cta btn-outline" id="btnOpenPascoaGallery">
                🖼️ Ver Fotos de Páscoa (24 Fotos)
              </button>
            </div>
${simulatorHtml}
          </div>
        `;
      } else {
        bannerMount.innerHTML = `
          <div class="seasonal-highlight-banner theme-off">
            <div class="seasonal-banner-header">
              <span class="seasonal-badge">✨ Cardápios Sazonais em Breve</span>
              <span class="seasonal-banner-deadline">📅 Abertura por Datas Festivas</span>
            </div>
            <h3 class="seasonal-banner-title">Cardápios Especiais de Páscoa &amp; Natal em Breve</h3>
            <p class="seasonal-banner-desc">
              Nossos cardápios sazonais exclusivos abrem em épocas festivas do ano: o <strong>Especial de Páscoa</strong> fica disponível a partir de <strong>15 de Fevereiro</strong>, e o <strong>Especial de Natal</strong> a partir de <strong>15 de Outubro</strong>. Enquanto isso, aproveite nossos 10 temas artesanais tradicionais disponíveis o ano inteiro!
            </p>
            <div class="seasonal-banner-actions">
              <button class="btn-seasonal-cta btn-primary js-open-catalog">
                📖 Ver Cardápio Tradicional
              </button>
              <a href="#galeria" class="btn-seasonal-cta btn-outline">
                🎂 Ver Nossos 10 Temas da Galeria
              </a>
            </div>
${simulatorHtml}
          </div>
        `;
      }

      // Eventos dos botões de ação rápida no banner
      const btnNatal = document.getElementById('btnOpenNatalGallery');
      if (btnNatal) btnNatal.addEventListener('click', () => openCategoryCarousel('natal_especial'));

      const btnPascoa = document.getElementById('btnOpenPascoaGallery');
      if (btnPascoa) btnPascoa.addEventListener('click', () => openCategoryCarousel('pascoa_especial'));

      // Eventos para abrir o modal do cardápio e das lembrancinhas a partir dos botões recém-injetados
      document.querySelectorAll('.js-open-lembrancinhas').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const lModal = document.getElementById('lembrancinhasModal');
          if (lModal) {
            lModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        });
      });

      document.querySelectorAll('#seasonalBannerMount .js-open-catalog, #seasonalTopRibbon .js-open-catalog').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const catModal = document.getElementById('catalogModal');
          if (catModal) {
            catModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        });
      });

      // Eventos do simulador (apenas se for admin)
      if (isAdmin) {
        bannerMount.querySelectorAll('.season-sim-btn[data-season]').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetSeason = btn.getAttribute('data-season');
            if (targetSeason === 'auto') {
              localStorage.removeItem('cherry_season_override');
            } else {
              localStorage.setItem('cherry_season_override', targetSeason);
            }
            // Atalho Secreto: 5 toques rápidos no rodapé ativam/desativam o Modo Administrador
  let footerTapCount = 0;
  let footerTapTimer = null;
  const footerBottomEl = document.querySelector('.footer-bottom');
  if (footerBottomEl) {
    footerBottomEl.style.cursor = 'pointer';
    footerBottomEl.addEventListener('click', () => {
      footerTapCount++;
      clearTimeout(footerTapTimer);
      footerTapTimer = setTimeout(() => { footerTapCount = 0; }, 1800);
      if (footerTapCount >= 5) {
        footerTapCount = 0;
        const currentAdmin = localStorage.getItem('cherry_admin_mode') === 'true';
        if (currentAdmin) {
          localStorage.removeItem('cherry_admin_mode');
          localStorage.removeItem('cherry_season_override');
          document.body.classList.remove('admin-mode');
          alert('Modo Administrador Desativado.\nO simulador foi ocultado e você está vendo o site exatamente como os clientes veem.');
        } else {
          localStorage.setItem('cherry_admin_mode', 'true');
          document.body.classList.add('admin-mode');
          alert('Modo Administrador Ativado!\nO Simulador de Temporadas agora está visível no banner da Galeria apenas para você.');
        }
        initSeasonalSystem();
      }
    });
  }

  initSeasonalSystem();
          });
        });

        const closeBtn = document.getElementById('btnCloseAdminSim');
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            localStorage.removeItem('cherry_admin_mode');
            localStorage.removeItem('cherry_season_override');
            document.body.classList.remove('admin-mode');
            initSeasonalSystem();
          });
        }
      }
    }

    // ----------------------------------------------------
    // B. Atualizar Filtros da Galeria
    // ----------------------------------------------------
    if (filtersContainer) {
      const existingSeasonalBtn = filtersContainer.querySelector('.seasonal-tab');
      if (existingSeasonalBtn) existingSeasonalBtn.remove();

      if (activeSeason === 'natal') {
        const seasonalBtn = document.createElement('button');
        seasonalBtn.className = 'filter-btn seasonal-tab';
        seasonalBtn.setAttribute('data-filter', 'sazonal');
        seasonalBtn.textContent = '🎄 Especial de Natal';
        filtersContainer.insertBefore(seasonalBtn, filtersContainer.children[1] || null);
      } else if (activeSeason === 'pascoa') {
        const seasonalBtn = document.createElement('button');
        seasonalBtn.className = 'filter-btn seasonal-tab pascoa';
        seasonalBtn.setAttribute('data-filter', 'sazonal');
        seasonalBtn.textContent = '🐰 Especial de Páscoa';
        filtersContainer.insertBefore(seasonalBtn, filtersContainer.children[1] || null);
      }
    }

    // ----------------------------------------------------
    // C. Atualizar Card Sazonal na Grade da Galeria
    // ----------------------------------------------------
    if (categoryGrid) {
      const existingSeasonalCard = categoryGrid.querySelector('.category-card-seasonal');
      if (existingSeasonalCard) existingSeasonalCard.remove();

      if (activeSeason === 'natal') {
        const natalCard = document.createElement('article');
        natalCard.className = 'category-card category-card-seasonal';
        natalCard.setAttribute('data-category', 'natal_especial');
        natalCard.setAttribute('data-filter-group', 'sazonal');
        natalCard.innerHTML = `
          <div class="category-card-thumb">
            <img src="natal/logo_natal.jpg" alt="Especial de Natal Confeitaria Artesanal Cherry Doces" class="category-card-img" loading="lazy">
            <span class="category-tag-badge">Fim de Ano 🎄</span>
            <span class="category-card-count">📷 11 fotos</span>
          </div>
          <div class="category-card-body">
            <h3 class="category-card-title">Especial de Natal &amp; Festas</h3>
            <p class="category-card-desc">
              Bolos temáticos natalinos, bombom de travessa, torta de limão cremosa e pudim tradicional com calda dourada para a sua ceia.
            </p>
            <div class="category-card-footer">
              <span class="category-badge-pill">Edição Limitada 🎄</span>
              <span class="category-card-action">Ver Fotos &rarr;</span>
            </div>
          </div>
        `;
        categoryGrid.insertBefore(natalCard, categoryGrid.firstChild);
      } else if (activeSeason === 'pascoa') {
        const pascoaCard = document.createElement('article');
        pascoaCard.className = 'category-card category-card-seasonal';
        pascoaCard.setAttribute('data-category', 'pascoa_especial');
        pascoaCard.setAttribute('data-filter-group', 'sazonal');
        pascoaCard.innerHTML = `
          <div class="category-card-thumb">
            <img src="pascoa/logo_pascoa.jpg" alt="Especial de Páscoa Confeitaria Artesanal Cherry Doces" class="category-card-img" loading="lazy">
            <span class="category-tag-badge">Temporada Páscoa 🐰</span>
            <span class="category-card-count">📷 24 fotos</span>
          </div>
          <div class="category-card-body">
            <h3 class="category-card-title">Especial de Páscoa</h3>
            <p class="category-card-desc">
              Ovos de colher artesanais super recheados em caixas presenteáveis, ovos trufados e chocolates nobres para presentear e saborear.
            </p>
            <div class="category-card-footer">
              <span class="category-badge-pill">Edição Páscoa 🐰</span>
              <span class="category-card-action">Ver Fotos &rarr;</span>
            </div>
          </div>
        `;
        categoryGrid.insertBefore(pascoaCard, categoryGrid.firstChild);
      }
    }

    // ----------------------------------------------------
    // D. Renderizar Bloco no Modal do Cardápio (#catalogModal)
    // ----------------------------------------------------
    if (catalogMount) {
      if (activeSeason === 'natal') {
        catalogMount.innerHTML = `
          <div class="catalog-seasonal-block seasonal-natal-theme">
            <div class="catalog-seasonal-header">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="natal/logo_natal.jpg" alt="Logo Natal Cherry Doces" class="seasonal-banner-logo-medallion" style="width: 72px; height: 72px;">
                <div>
                  <h3 class="catalog-seasonal-title">🎄 Encomendas de Natal e Ano Novo ✦</h3>
                  <p class="catalog-seasonal-sub">Já estamos a aceitar encomendas para sobremesas de Natal e Réveillon! <strong>Aceitaremos até o dia 20/12!</strong></p>
                </div>
              </div>
              <a href="cardapio_natal.pdf" target="_blank" rel="noopener noreferrer" class="btn-seasonal-pdf">
                📄 Abrir Cardápio Oficial de Natal (PDF)
              </a>
            </div>

            <div class="seasonal-items-list">
              <div class="catalog-item-row">
                <div class="catalog-item-info">
                  <h4>🎂 Bolos com Tema Natalino</h4>
                  <p>Massas fofinhas e recheios artesanais com decoração especial para a sua ceia.</p>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Bolo com Tema Natalino', 'Olá, Lorrany! Gostaria de encomendar um Bolo com Tema Natalino para a ceia de Natal.')">Pedir</button>
              </div>

              <div class="catalog-item-row">
                <div class="catalog-item-info">
                  <h4>🍓 Bombom de Travessa (Morango ou Uva)</h4>
                  <p>Camadas generosas de creme artesanal, fruta fresca selecionada e ganache de chocolate.</p>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Bombom de Travessa', 'Olá, Lorrany! Gostaria de encomendar o Bombom de Travessa para as festas de fim de ano.')">Pedir</button>
              </div>

              <div class="catalog-item-row">
                <div class="catalog-item-info">
                  <h4>🍋 Torta de Limão Cremosa</h4>
                  <p>Base crocante amanteigada, recheio cremoso de limão e cobertura suave.</p>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Torta de Limão', 'Olá, Lorrany! Gostaria de encomendar a Torta de Limão para a ceia de Natal.')">Pedir</button>
              </div>

              <div class="catalog-item-row">
                <div class="catalog-item-info">
                  <h4>🍮 Pudim de Leite Condensado</h4>
                  <p>Receita clássica tradicional de família, textura super cremosa e calda dourada de caramelo.</p>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Pudim de Leite Condensado', 'Olá, Lorrany! Gostaria de encomendar o Pudim de Leite Condensado para a ceia.')">Pedir</button>
              </div>

              <div class="catalog-item-row">
                <div class="catalog-item-info">
                  <h4>🍋 Bolo Especial de Limão</h4>
                  <p>Massa aromática super fofinha com cobertura delicada e raspas de limão frescas.</p>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Bolo Especial de Limão')">Pedir</button>
              </div>
            </div>

            <!-- Destaque: Lembrancinhas de Natal com Fotos -->
            <div class="catalog-lembrancinhas-feature">
              <div class="catalog-lembrancinhas-header">
                <h4 class="catalog-lembrancinhas-title">🎁 Lembrancinhas &amp; Mimos Doces de Natal</h4>
                <button type="button" class="btn-seasonal-cta btn-lembrancinhas js-open-lembrancinhas" style="padding: 0.4rem 1rem; font-size: 0.82rem;">
                  Ver Cardápio com Fotos &rarr;
                </button>
              </div>
              <div class="catalog-lembrancinhas-list">
                <div class="catalog-lembrancinha-mini-item">
                  <img src="lembrancinhas/1.jpg?v=3" alt="Cubo Mágico Acredite na Magia do Natal" class="catalog-lembrancinha-mini-thumb">
                  <div class="catalog-lembrancinha-mini-info">
                    <h5>1. Cubo Mágico "Acredite na Magia"</h5>
                    <span>R$ 15,00</span>
                  </div>
                  <button class="btn-add-order" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;" onclick="sendWhatsApp('Cubo Mágico de Natal (R$ 15)')">Pedir</button>
                </div>
                <div class="catalog-lembrancinha-mini-item">
                  <img src="lembrancinhas/2.jpg?v=3" alt="Caixinha Encanto de Natal" class="catalog-lembrancinha-mini-thumb">
                  <div class="catalog-lembrancinha-mini-info">
                    <h5>2. Caixinha Encanto de Natal</h5>
                    <span>R$ 15,00</span>
                  </div>
                  <button class="btn-add-order" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;" onclick="sendWhatsApp('Caixinha Encanto de Natal (R$ 15)')">Pedir</button>
                </div>
                <div class="catalog-lembrancinha-mini-item">
                  <img src="lembrancinhas/3.jpg?v=3" alt="Pote Encantado de Biscoitos Amanteigados" class="catalog-lembrancinha-mini-thumb">
                  <div class="catalog-lembrancinha-mini-info">
                    <h5>3. Pote Biscoitos Amanteigados</h5>
                    <span>R$ 20,00</span>
                  </div>
                  <button class="btn-add-order" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;" onclick="sendWhatsApp('Pote Biscoitos Amanteigados (R$ 20)')">Pedir</button>
                </div>
                <div class="catalog-lembrancinha-mini-item">
                  <img src="lembrancinhas/4.jpg?v=3" alt="Vitrine Doce Feliz Natal" class="catalog-lembrancinha-mini-thumb">
                  <div class="catalog-lembrancinha-mini-info">
                    <h5>4. Vitrine Doce "Feliz Natal"</h5>
                    <span>R$ 20,00</span>
                  </div>
                  <button class="btn-add-order" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;" onclick="sendWhatsApp('Vitrine Doce Feliz Natal (R$ 20)')">Pedir</button>
                </div>
                <div class="catalog-lembrancinha-mini-item">
                  <img src="lembrancinhas/5.jpg?v=3" alt="Mimo Cristal Boas Festas" class="catalog-lembrancinha-mini-thumb">
                  <div class="catalog-lembrancinha-mini-info">
                    <h5>5. Mimo Cristal "Boas Festas"</h5>
                    <span>R$ 15,00</span>
                  </div>
                  <button class="btn-add-order" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;" onclick="sendWhatsApp('Mimo Cristal Boas Festas (R$ 15)')">Pedir</button>
                </div>
              </div>
            </div>

            <div style="margin-top: 1rem; font-size: 0.88rem; color: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 0.75rem;">
              <span>💳 Aceitamos cartão de crédito e débito</span>
              <span>📱 Contato: (11) 98575-1371 — Lorrany • Cherry Doces</span>
            </div>
          </div>
        `;
      } else if (activeSeason === 'pascoa') {
        catalogMount.innerHTML = `
          <div class="catalog-seasonal-block seasonal-pascoa-theme">
            <div class="catalog-seasonal-header">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="pascoa/logo_pascoa.jpg" alt="Logo Páscoa Cherry Doces" class="seasonal-banner-logo-medallion" style="width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 2px solid #f08ea8;">
                <div>
                  <div style="display: inline-block; background: #f08ea8; color: #431f18; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 10px; border-radius: 999px; margin-bottom: 4px;">♥ EDIÇÃO ESPECIAL</div>
                  <h3 class="catalog-seasonal-title">🐰 Cardápio Especial de Páscoa ✦</h3>
                  <p class="catalog-seasonal-sub">Ovos artesanais com chocolate nobre e recheios fartos. Faça sua encomenda com antecedência!</p>
                </div>
              </div>
              <a href="cardapio_pascoa.pdf" target="_blank" rel="noopener noreferrer" class="btn-seasonal-pdf">
                📄 Abrir Cardápio Oficial (PDF)
              </a>
            </div>

            <!-- Avisos / Observações Importantes -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.2rem;">
              <div style="flex: 1 1 280px; background: rgba(70, 40, 32, 0.65); border: 1px solid rgba(240, 142, 168, 0.4); border-radius: 8px; padding: 0.6rem 0.9rem; font-size: 0.84rem; display: flex; align-items: center; gap: 0.5rem; color: #fff;">
                <span style="font-size: 1.1rem;">🍫</span>
                <span><strong>Opções com Chocolate Branco:</strong> acréscimo de <strong>R$ 10,00</strong></span>
              </div>
              <div style="flex: 1 1 280px; background: rgba(240, 142, 168, 0.2); border: 1px solid rgba(240, 142, 168, 0.5); border-radius: 8px; padding: 0.6rem 0.9rem; font-size: 0.84rem; display: flex; align-items: center; gap: 0.5rem; color: #ffe6ee;">
                <span style="font-size: 1.1rem;">✨</span>
                <span><strong>Sabores Gourmet:</strong> acréscimo de <strong>R$ 10,00</strong> a mais!</span>
              </div>
            </div>

            <div class="seasonal-items-list">
              <!-- Item 1: Ovos de Colher -->
              <div class="catalog-item-row" style="align-items: flex-start;">
                <div class="catalog-item-info" style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <h4 style="margin: 0;">🥄 Ovos de Colher Recheados</h4>
                    <span style="background: rgba(240,142,168,0.25); color: #ffd1dc; border: 1px solid rgba(240,142,168,0.4); font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">MAIS PEDIDO</span>
                  </div>
                  <p style="margin: 0.35rem 0 0.6rem 0;">Casca de chocolate nobre recheada com sua combinação favorita de sabor e confeitos artesanais. Acompanha colherzinha e caixa presenteável.</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">250g • R$ 65,00</span>
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">350g • R$ 75,00</span>
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">500g • R$ 85,00</span>
                  </div>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Ovo de Colher Recheado', 'Olá, Lorrany! Gostaria de encomendar um Ovo de Colher Recheado para a Páscoa. Quais sabores estão disponíveis?')">Pedir</button>
              </div>

              <!-- Item 2: Ovos Fechados Tradicionais -->
              <div class="catalog-item-row" style="align-items: flex-start;">
                <div class="catalog-item-info" style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <h4 style="margin: 0;">🍫 Ovos Fechados Tradicionais</h4>
                    <span style="background: rgba(54,164,167,0.25); color: #a9e5e7; border: 1px solid rgba(54,164,167,0.4); font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">COM BOMBONS</span>
                  </div>
                  <p style="margin: 0.35rem 0 0.6rem 0;">Casca clássica de chocolate ao leite nobre, embalada em papel presenteável com bombons sortidos artesanais dentro.</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">250g • R$ 40,00</span>
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">350g • R$ 45,00</span>
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">500g • R$ 65,00</span>
                  </div>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Ovo Fechado Tradicional', 'Olá, Lorrany! Gostaria de encomendar um Ovo Fechado Tradicional para a Páscoa.')">Pedir</button>
              </div>

              <!-- Item 3: Ovos Trufados Casca Dupla Recheada -->
              <div class="catalog-item-row" style="align-items: flex-start;">
                <div class="catalog-item-info" style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <h4 style="margin: 0;">🥥 Ovos Trufados (Casca Dupla Recheada)</h4>
                    <span style="background: rgba(212,175,55,0.25); color: #ffd700; border: 1px solid rgba(212,175,55,0.4); font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">SUPER RECHEADO</span>
                  </div>
                  <p style="margin: 0.35rem 0 0.6rem 0;">A experiência definitiva: casca dupla inteiramente recheada por dentro com trufa macia e cremosa.</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">350g • R$ 90,00</span>
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">500g • R$ 110,00</span>
                    <span style="background: rgba(212,175,55,0.2); border: 1px solid rgba(212,175,55,0.4); color: #ffd700; border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 700;">1 Kg Família • R$ 150,00</span>
                  </div>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Ovo Trufado Casca Dupla', 'Olá, Lorrany! Gostaria de encomendar o Ovo Trufado com Casca Dupla Recheada.')">Pedir</button>
              </div>

              <!-- Item 4: Mini Ovinhos (Kit Degustação & Presente) -->
              <div class="catalog-item-row" style="align-items: flex-start;">
                <div class="catalog-item-info" style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <h4 style="margin: 0;">🎁 Mini Ovinhos (Degustação &amp; Presente)</h4>
                    <span style="background: rgba(54,164,167,0.25); color: #a9e5e7; border: 1px solid rgba(54,164,167,0.4); font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">KIT PRESENTE</span>
                  </div>
                  <p style="margin: 0.35rem 0 0.6rem 0;">Caixa decorada de presente contendo 4 mini ovinhos recheados com colherzinha, perfeita para experimentar vários sabores ou presentear com carinho.</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="background: rgba(54,164,167,0.25); border: 1px solid rgba(54,164,167,0.4); color: #a9e5e7; border-radius: 6px; padding: 3px 10px; font-size: 0.85rem; font-weight: 700;">Caixa com 4 unidades (50g cada) • R$ 55,00</span>
                  </div>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Kit Mini Ovinhos Degustação', 'Olá, Lorrany! Gostaria de encomendar a Caixa de Mini Ovinhos (Kit Degustação de 4 un.).')">Pedir</button>
              </div>

              <!-- Item 5: Ovo Infantil com Brinde Surpresa -->
              <div class="catalog-item-row" style="align-items: flex-start;">
                <div class="catalog-item-info" style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <h4 style="margin: 0;">🧸 Ovo Infantil com Chaveiro Surpresa</h4>
                    <span style="background: rgba(240,142,168,0.25); color: #ffd1dc; border: 1px solid rgba(240,142,168,0.4); font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">BRINDE SURPRESA</span>
                  </div>
                  <p style="margin: 0.35rem 0 0.6rem 0;">O queridinho das crianças! Chocolate ao leite cremoso embalado com tema lúdico e um chaveiro fofo surpresa como brinde especial.</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">250g • R$ 45,00</span>
                    <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 3px 8px; font-size: 0.82rem; font-weight: 600;">350g • R$ 55,00</span>
                  </div>
                </div>
                <button class="btn-add-order" onclick="sendWhatsApp('Ovo Infantil com Chaveiro Surpresa', 'Olá, Lorrany! Gostaria de encomendar o Ovo Infantil com Chaveiro Surpresa.')">Pedir</button>
              </div>
            </div>

            <!-- Tabela / Seção de Sabores de Recheio -->
            <div style="margin-top: 1.25rem; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 1rem 1.15rem;">
              <h4 style="margin: 0 0 0.75rem 0; font-size: 0.98rem; color: #ffd1dc; display: flex; align-items: center; gap: 0.4rem;">
                <span>✨</span> Sabores de Recheios Disponíveis
              </h4>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px; border-left: 3px solid #36a4a7;">
                  <strong style="color: #a9e5e7; font-size: 0.86rem; display: block; margin-bottom: 0.4rem;">🍫 Sabores Tradicionais:</strong>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                    <span style="background: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Brigadeiro Tradicional</span>
                    <span style="background: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Sensação</span>
                    <span style="background: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Mousse de Maracujá</span>
                    <span style="background: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Mousse de Morango</span>
                    <span style="background: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Beijinho</span>
                  </div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px; border-left: 3px solid #f08ea8;">
                  <strong style="color: #ffd1dc; font-size: 0.86rem; display: block; margin-bottom: 0.4rem;">⭐ Sabores Gourmet (+ R$ 10,00):</strong>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                    <span style="background: rgba(240,142,168,0.15); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Mousse de Ninho</span>
                    <span style="background: rgba(240,142,168,0.15); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Café</span>
                    <span style="background: rgba(240,142,168,0.15); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Prestígio</span>
                    <span style="background: rgba(240,142,168,0.15); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Ninho com Morango</span>
                    <span style="background: rgba(240,142,168,0.15); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Brigadeiro com Maracujá</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Rodapé com Pagamento e Informações -->
            <div style="margin-top: 1rem; font-size: 0.86rem; color: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 0.75rem;">
              <span>💳 Aceitamos cartão de débito, crédito e PIX (parcelas acima de R$ 100)</span>
              <span>📱 (11) 98575-1371 — Lorrany • Cherry Doces</span>
            </div>
          </div>
        `;
      } else {
        catalogMount.innerHTML = `
          <div class="catalog-seasonal-notice-off">
            <span class="seasonal-off-icon">✨</span>
            <div>
              <strong>Cardápios sazonais em breve!</strong>
              <p>Nosso cardápio especial de <strong>Páscoa</strong> fica disponível a partir de <strong>15 de Fevereiro</strong>, e o especial de <strong>Natal</strong> a partir de <strong>15 de Outubro</strong>. Aproveite nossos deliciosos bolos e doces tradicionais abaixo!</p>
            </div>
          </div>
        `;
      }
    }
  }


  // 5. Motor do Carrossel 3D Coverflow
  let currentCategoryKey = 'naked_cake';
  let currentSlideIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  const carouselModal = document.getElementById('galleryCarouselModal');
  const closeCarouselBtn = document.getElementById('closeCarouselBtn');
  const carouselModalTitle = document.getElementById('carouselModalTitle');
  const carouselCategoryTag = document.getElementById('carouselCategoryTag');
  const carouselCounter = document.getElementById('carouselCounter');
  const coverflowTrack = document.getElementById('coverflowTrack');
  const coverflowStage = document.getElementById('coverflowStage');
  const carouselDots = document.getElementById('carouselDots');
  const carouselPrevBtn = document.getElementById('carouselPrevBtn');
  const carouselNextBtn = document.getElementById('carouselNextBtn');

  // Fullscreen Lightbox Elements (Zoom Detalhado com Navegação)
  const fullscreenLightboxModal = document.getElementById('fullscreenLightboxModal');
  const closeFullscreenLightbox = document.getElementById('closeFullscreenLightbox');
  const fullscreenLightboxImg = document.getElementById('fullscreenLightboxImg');
  const fullscreenLightboxTitle = document.getElementById('fullscreenLightboxTitle');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxZoomStage = document.getElementById('lightboxZoomStage');

  // Inicializar Slides do Coverflow 3D
  function buildCoverflowSlides() {
    const cat = GALLERY_CATEGORIES[currentCategoryKey];
    if (!cat || !cat.images || cat.images.length === 0 || !coverflowTrack) return;

    coverflowTrack.innerHTML = '';

    cat.images.forEach((src, idx) => {
      const slide = document.createElement('div');
      slide.className = 'coverflow-slide';
      slide.setAttribute('data-index', idx);
      slide.setAttribute('title', 'Clique para ver foto ou ampliar');

      const img = document.createElement('img');
      img.src = src;
      img.alt = `${cat.title} - Foto ${idx + 1} Cherry Doces`;
      img.loading = 'eager';
      img.decoding = 'async';

      slide.appendChild(img);

      // Clique no slide
      slide.addEventListener('click', (e) => {
        e.stopPropagation();
        if (idx === currentSlideIndex) {
          openFullscreenZoom();
        } else {
          currentSlideIndex = idx;
          updateCoverflowPositions();
        }
      });

      coverflowTrack.appendChild(slide);
    });

    // Renderizar Indicadores de Bolinhas (Dots)
    if (carouselDots) {
      carouselDots.innerHTML = '';
      cat.images.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `carousel-dot${idx === currentSlideIndex ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Ir para foto ${idx + 1} de ${cat.images.length}`);
        dot.title = `Foto ${idx + 1}`;
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          currentSlideIndex = idx;
          updateCoverflowPositions();
        });
        carouselDots.appendChild(dot);
      });
    }

    updateCoverflowPositions();
  }

  // Atualizar Posições 3D de Todos os Slides no Coverflow
  function updateCoverflowPositions() {
    const cat = GALLERY_CATEGORIES[currentCategoryKey];
    if (!cat || !cat.images) return;

    const total = cat.images.length;
    if (currentSlideIndex < 0) currentSlideIndex = total - 1;
    if (currentSlideIndex >= total) currentSlideIndex = 0;

    // Atualiza cabeçalho e contador
    if (carouselModalTitle) carouselModalTitle.textContent = cat.title;
    if (carouselCategoryTag) carouselCategoryTag.textContent = cat.tag || 'Artesanal';
    if (carouselCounter) carouselCounter.textContent = `Foto ${currentSlideIndex + 1} de ${total}`;

    const slides = coverflowTrack ? coverflowTrack.querySelectorAll('.coverflow-slide') : [];
    slides.forEach((slide, idx) => {
      // Limpa classes anteriores de posição
      slide.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'hidden-slide');

      const diff = idx - currentSlideIndex;

      if (diff === 0) {
        slide.classList.add('active');
      } else if (diff === -1) {
        slide.classList.add('prev-1');
      } else if (diff === 1) {
        slide.classList.add('next-1');
      } else if (diff === -2) {
        slide.classList.add('prev-2');
      } else if (diff === 2) {
        slide.classList.add('next-2');
      } else {
        slide.classList.add('hidden-slide');
      }
    });

    // Atualiza Bolinhas (Dots)
    if (carouselDots) {
      const dots = carouselDots.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlideIndex);
      });
    }

    // Atualiza Barra de Cardápio Integrada dentro da Galeria
    const cardapioBadge = document.getElementById('carouselCardapioBadge');
    const cardapioText = document.getElementById('carouselCardapioText');
    const cardapioPdfBtn = document.getElementById('carouselCardapioPdfBtn');

    if (currentCategoryKey === 'natal_especial') {
      if (cardapioBadge) cardapioBadge.textContent = '🎄 Cardápio Especial de Natal';
      if (cardapioText) cardapioText.textContent = 'Bolos temáticos, tortas, bombom de travessa e pudim para sua ceia';
      if (cardapioPdfBtn) {
        cardapioPdfBtn.href = 'cardapio_natal.pdf';
        cardapioPdfBtn.innerHTML = '<span>📄 Abrir Cardápio de Natal (PDF)</span>';
      }
    } else if (currentCategoryKey === 'pascoa_especial') {
      if (cardapioBadge) cardapioBadge.textContent = '🐰 Cardápio Especial de Páscoa';
      if (cardapioText) cardapioText.textContent = 'Ovos de colher artesanais super recheados e chocolates nobres';
      if (cardapioPdfBtn) {
        cardapioPdfBtn.href = 'cardapio_pascoa.pdf';
        cardapioPdfBtn.innerHTML = '<span>📄 Abrir Cardápio de Páscoa (PDF)</span>';
      }
    } else {
      if (cardapioBadge) cardapioBadge.textContent = `📖 Cardápio Oficial • ${cat.title}`;
      if (cardapioText) cardapioText.textContent = 'Confira tabela completa de sabores, recheios por kg e valores';
      if (cardapioPdfBtn) {
        cardapioPdfBtn.href = 'cardapio_cherry_doces.pdf';
        cardapioPdfBtn.innerHTML = '<span>📄 Abrir Cardápio (PDF)</span>';
      }
    }
  }

  // Abrir Carrossel para Categoria Selecionada
  function openCategoryCarousel(categoryKey) {
    if (!GALLERY_CATEGORIES[categoryKey]) return;
    currentCategoryKey = categoryKey;
    currentSlideIndex = 0;
    buildCoverflowSlides();

    if (carouselModal) {
      carouselModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Navegação
  function nextSlide() {
    const cat = GALLERY_CATEGORIES[currentCategoryKey];
    if (!cat) return;
    currentSlideIndex = (currentSlideIndex + 1) % cat.images.length;
    updateCoverflowPositions();
  }

  function prevSlide() {
    const cat = GALLERY_CATEGORIES[currentCategoryKey];
    if (!cat) return;
    currentSlideIndex = (currentSlideIndex - 1 + cat.images.length) % cat.images.length;
    updateCoverflowPositions();
  }

  if (carouselNextBtn) carouselNextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });
  if (carouselPrevBtn) carouselPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });

  // Swipe de Toque no Celular
  if (coverflowStage) {
    coverflowStage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    coverflowStage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextSlide(); // Deslizar para esquerda -> próxima foto
      else prevSlide();          // Deslizar para direita -> foto anterior
    }
  }

  // Atualizar e renderizar foto no Lightbox com animacao suave
  function renderLightboxPhoto(direction = 0) {
    const cat = GALLERY_CATEGORIES[currentCategoryKey];
    if (!cat || !cat.images || cat.images.length === 0) return;
    const currentSrc = cat.images[currentSlideIndex];

    if (fullscreenLightboxModal && fullscreenLightboxImg) {
      if (direction !== 0) {
        fullscreenLightboxImg.style.opacity = '0';
        fullscreenLightboxImg.style.transform = `translateX(${direction > 0 ? '35px' : '-35px'}) scale(0.96)`;
        setTimeout(() => {
          fullscreenLightboxImg.src = currentSrc;
          fullscreenLightboxImg.alt = `${cat.title} em Detalhes - Foto ${currentSlideIndex + 1}`;
          if (fullscreenLightboxTitle) {
            fullscreenLightboxTitle.textContent = `${cat.title} • Foto ${currentSlideIndex + 1} de ${cat.images.length}`;
          }
          fullscreenLightboxImg.style.opacity = '1';
          fullscreenLightboxImg.style.transform = 'translateX(0) scale(1)';
        }, 140);
      } else {
        fullscreenLightboxImg.src = currentSrc;
        fullscreenLightboxImg.alt = `${cat.title} em Detalhes - Foto ${currentSlideIndex + 1}`;
        if (fullscreenLightboxTitle) {
          fullscreenLightboxTitle.textContent = `${cat.title} • Foto ${currentSlideIndex + 1} de ${cat.images.length}`;
        }
        fullscreenLightboxImg.style.opacity = '1';
        fullscreenLightboxImg.style.transform = 'translateX(0) scale(1)';
      }
    }

    // Sincroniza o carrossel Coverflow no fundo
    updateCoverflowPositions();
  }

  function nextLightboxPhoto() {
    const cat = GALLERY_CATEGORIES[currentCategoryKey];
    if (!cat || !cat.images || cat.images.length === 0) return;
    currentSlideIndex = (currentSlideIndex + 1) % cat.images.length;
    renderLightboxPhoto(1);
  }

  function prevLightboxPhoto() {
    const cat = GALLERY_CATEGORIES[currentCategoryKey];
    if (!cat || !cat.images || cat.images.length === 0) return;
    currentSlideIndex = (currentSlideIndex - 1 + cat.images.length) % cat.images.length;
    renderLightboxPhoto(-1);
  }

  // Abrir Lightbox com Zoom na Foto Ativa
  function openFullscreenZoom() {
    renderLightboxPhoto(0);
    if (fullscreenLightboxModal) {
      fullscreenLightboxModal.classList.add('active');
    }
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextLightboxPhoto();
    });
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevLightboxPhoto();
    });
  }

  // Gesto de deslizar (Swipe) no Lightbox (Celular / Touchscreen)
  let lightboxTouchStartX = 0;
  let lightboxTouchEndX = 0;
  let lightboxTouchStartY = 0;
  let lightboxTouchEndY = 0;

  if (fullscreenLightboxModal) {
    fullscreenLightboxModal.addEventListener('touchstart', (e) => {
      lightboxTouchStartX = e.changedTouches[0].screenX;
      lightboxTouchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    fullscreenLightboxModal.addEventListener('touchend', (e) => {
      lightboxTouchEndX = e.changedTouches[0].screenX;
      lightboxTouchEndY = e.changedTouches[0].screenY;
      handleLightboxSwipe();
    }, { passive: true });
  }

  function handleLightboxSwipe() {
    const diffX = lightboxTouchEndX - lightboxTouchStartX;
    const diffY = lightboxTouchEndY - lightboxTouchStartY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextLightboxPhoto(); // Deslizar para esquerda -> proxima foto
      } else {
        prevLightboxPhoto(); // Deslizar para direita -> foto anterior
      }
    }
  }

  // Arrastar com o Mouse no Desktop (Drag to navigate)
  let isDraggingLightbox = false;
  let mouseStartX = 0;

  if (lightboxZoomStage) {
    lightboxZoomStage.addEventListener('mousedown', (e) => {
      isDraggingLightbox = true;
      mouseStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDraggingLightbox) return;
      isDraggingLightbox = false;
      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) > 50) {
        if (diffX < 0) {
          nextLightboxPhoto();
        } else {
          prevLightboxPhoto();
        }
      }
    });
  }

  // Vincular clique nos cards de categoria (delegação de evento dinâmica)
  const categoryGridEl = document.getElementById('categoryGrid');
  if (categoryGridEl) {
    categoryGridEl.addEventListener('click', (e) => {
      const card = e.target.closest('.category-card');
      if (!card) return;
      const catKey = card.getAttribute('data-category');
      if (catKey) {
        openCategoryCarousel(catKey);
      }
    });
  }

  // Inicializar Sistema Sazonal Automatizado
  initSeasonalSystem();

  // 5.1 Modal de Lembrancinhas de Natal
  const lembrancinhasModal = document.getElementById('lembrancinhasModal');
  document.querySelectorAll('.js-open-lembrancinhas').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (catalogModal) catalogModal.classList.remove('active');
      if (carouselModal) carouselModal.classList.remove('active');
      if (lembrancinhasModal) {
        lembrancinhasModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // 6. Modal do Cardápio Completo (Cardápio Cherry Doces.pdf)
  const catalogModal = document.getElementById('catalogModal');
  const openCatalogBtns = document.querySelectorAll('.js-open-catalog, a[href="#cardapio"]');

  openCatalogBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (carouselModal) carouselModal.classList.remove('active');
      if (catalogModal) {
        catalogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // 7. Fechamento Unificado de Todos os Modais (Botão X, Clique Fora e Tecla ESC)
  function restoreBodyScrollIfNoModal() {
    if (!document.querySelector('.modal-backdrop.active')) {
      document.body.style.overflow = '';
    }
  }

  function closeAllModals() {
    if (fullscreenLightboxModal && fullscreenLightboxModal.classList.contains('active')) {
      fullscreenLightboxModal.classList.remove('active');
      restoreBodyScrollIfNoModal();
      return;
    }
    document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  // Vincular TODOS os botões "X" (.modal-close-btn e .lightbox-close-btn) de todas as janelas
  document.querySelectorAll('.modal-close-btn, .lightbox-close-btn').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentModal = closeBtn.closest('.modal-backdrop');
      if (parentModal) {
        parentModal.classList.remove('active');
      }
      restoreBodyScrollIfNoModal();
    });
  });

  // Fechar ao clicar fora da janela (no backdrop ou fundo escuro do Lightbox)
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (
        e.target === backdrop ||
        e.target.classList.contains('lightbox-fullscreen-container') ||
        e.target.classList.contains('lightbox-zoom-stage')
      ) {
        backdrop.classList.remove('active');
        restoreBodyScrollIfNoModal();
      }
    });
  });

  // Tecla ESC para fechar e Setas do teclado para navegar tanto no Zoom quanto no Coverflow 3D
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    } else if (e.key === 'ArrowRight') {
      if (fullscreenLightboxModal && fullscreenLightboxModal.classList.contains('active')) {
        nextLightboxPhoto();
      } else if (carouselModal && carouselModal.classList.contains('active')) {
        nextSlide();
      }
    } else if (e.key === 'ArrowLeft') {
      if (fullscreenLightboxModal && fullscreenLightboxModal.classList.contains('active')) {
        prevLightboxPhoto();
      } else if (carouselModal && carouselModal.classList.contains('active')) {
        prevSlide();
      }
    }
  });

  // Prevenir que cliques dentro do conteúdo da janela (.modal-window) fechem o modal acidentalmente
  document.querySelectorAll('.modal-window').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // 8. Helper global para envio direto pelo WhatsApp
  window.sendWhatsApp = function(productName, customText) {
    let msg = `Olá, Lorrany! Vim pelo site da Cherry Doces e gostaria de fazer uma encomenda.`;
    if (customText) {
      msg = customText;
    } else if (productName) {
      msg = `Olá, Lorrany! Vi o ${productName} no site da Cherry Doces e gostaria de encomendar! Poderia me passar os detalhes? ♡`;
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };
});

// Garantir scroll no topo ao terminar o carregamento e antes de descarregar
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  const siteHdr = document.querySelector('.site-header');
  if (siteHdr) {
    const h = Math.ceil(siteHdr.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--site-header-height', `${h}px`);
  }
});
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});
