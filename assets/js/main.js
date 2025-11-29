/**
 * Template Name: Lonely - v4.3.0
 * Updated for Lian Sixin Portfolio - Dark Mode
 */
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  // ==========================================================
  // 【修复内容】替换：新增 document.body.classList.toggle('mobile-nav-active')
  // ==========================================================
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
    document.body.classList.toggle('mobile-nav-active'); // 新增：用于CSS解除Header的锁定
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
        document.body.classList.remove('mobile-nav-active'); // 修复：确保关闭时移除body class
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-filters li', true);

      on('click', '#portfolio-filters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Simple Typing Effect for Hero
   */
  const typingText = select('.typing-effect');
  if(typingText) {
    const words = ["不知名签约作家.", "IT 科技爱好者.", "白日梦想家.", "C/C++ 工程师", "嵌入式工程师", "文学爱好者" , "浪漫主义诗人"];
    let i = 0; // 词语索引
    let j = 0; // 字符索引
    let isDeleting = false; // 是否在删除
    let timer;

    function type() {
      const currentWord = words[i % words.length]; // **FIX: 每次调用 type 时获取当前词语**
      let displayedText = currentWord.substring(0, j);

      typingText.innerHTML = `<span class="typed-text">${displayedText}</span><span class="cursor"></span>`;

      if (!isDeleting) {
        // 打字模式
        j++;
        if (j > currentWord.length) {
          isDeleting = true;
          // 完成打字后停顿1.5秒，然后切换到删除模式
          timer = setTimeout(type, 1500);
          return; // 结束当前 type 循环，等待 setTimeout 再次调用
        }
      } else {
        // 删除模式
        j--;
        if (j < 0) {
          isDeleting = false;
          i++; // 切换到下一个词
          j = 0; // 修复：重置字符索引为0
          // 完成删除后停顿0.5秒，然后切换到打字模式
          timer = setTimeout(type, 500);
          return; // 结束当前 type 循环，等待 setTimeout 再次调用
        }
      }

      // 如果没有进入上面任何一个 return 逻辑，则继续打字或删除
      timer = setTimeout(type, isDeleting ? 75 : 150); // **FIX: 统一使用 timer 变量来保存 setTimeout ID**
    }

    // 首次启动打字效果
    type();
  }

  /**
   * Mobile Portfolio Click Toggle (Fix for touch)
   */
  on('click', '.portfolio-wrap', function(e) {
    if (window.innerWidth <= 991) {
      // 如果点击的是链接本身，则不阻止默认行为
      if (e.target.closest('.portfolio-links a')) {
        return;
      }

      // 切换 .show-links 类来控制链接的显示/隐藏
      this.classList.toggle('show-links');

      // 阻止默认的 GLightbox 行为，直到链接显示
      if (!this.classList.contains('show-links')) {
        e.preventDefault();
      }
    }
  }, true);
})()