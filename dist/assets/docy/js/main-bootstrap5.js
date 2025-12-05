(function () {
  "use strict";

  //*=============menu sticky js =============*//
  var didScroll,
    lastScrollTop = 0,
    delta = 5,
    mainNav = document.querySelector(".sticky-nav"),
    body = document.body,
    mainNavHeight = mainNav ? mainNav.offsetHeight + 15 : 0,
    scrollTop;

  function handleScroll() {
    didScroll = true;
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  }

  window.addEventListener("scroll", handleScroll);

  setInterval(function () {
    if (didScroll && mainNav) {
      if (Math.abs(lastScrollTop - scrollTop) <= delta) {
        return;
      }
      if (scrollTop > lastScrollTop && scrollTop > mainNavHeight) {
        mainNav
          .classList.remove("fadeInDown")
          .classList.add("fadeInUp");
        mainNav.style.top = -mainNavHeight + "px";
        body.classList.remove("remove");
        body.classList.add("add");
      } else {
        if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) {
          mainNav
            .classList.remove("fadeInUp")
            .classList.add("fadeInDown");
          mainNav.style.top = "0px";
          mainNav.classList.add("gap");
          body.classList.remove("add");
          body.classList.add("remove");
        }
      }
      lastScrollTop = scrollTop;
      didScroll = false;
    }
  }, 200);

  // Sticky navigation
  if (document.querySelector(".sticky-nav")) {
    window.addEventListener("scroll", function () {
      var scroll = window.pageYOffset || document.documentElement.scrollTop;
      var stickyNav = document.querySelector(".sticky-nav");
      if (scroll) {
        stickyNav.classList.add("navbar_fixed");
        var bodyFixed = document.querySelector(".sticky-nav-doc .body_fixed");
        if (bodyFixed) {
          bodyFixed.classList.add("body_navbar_fixed");
        }
      } else {
        stickyNav.classList.remove("navbar_fixed");
        var bodyFixed = document.querySelector(".sticky-nav-doc .body_fixed");
        if (bodyFixed) {
          bodyFixed.classList.remove("body_navbar_fixed");
        }
      }
    });
  }

  // Back to top functionality
  document.addEventListener("DOMContentLoaded", function () {
    var backToTop = document.getElementById("back-to-top");
    if (backToTop) {
      window.addEventListener("scroll", function () {
        if (window.pageYOffset > 500) {
          body.classList.add("test");
          backToTop.style.display = "block";
        } else {
          body.classList.remove("test");
          backToTop.style.display = "none";
        }
      });

      backToTop.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  });

  // Navbar fixed for stickyTwo
  function navbarFixedTwo() {
    var stickyTwo = document.getElementById("stickyTwo");
    if (stickyTwo) {
      window.addEventListener("scroll", function () {
        var scroll = window.pageYOffset || document.documentElement.scrollTop;
        if (scroll) {
          stickyTwo.classList.add("navbar_fixed");
        } else {
          stickyTwo.classList.remove("navbar_fixed");
        }
      });
    }
  }
  navbarFixedTwo();

  // Tab fixed functionality
  function tabFixed() {
    var windowWidth = window.innerWidth;
    var headerTabsArea = document.querySelector(".header_tabs_area");
    if (headerTabsArea && windowWidth > 576) {
      var tabs = document.querySelector(".header_tab_items");
      var tabsHeight = tabs ? tabs.offsetHeight + 100 : 100;
      var leftOffset = headerTabsArea.offsetTop + tabsHeight;

      window.addEventListener("scroll", function () {
        var scroll = window.pageYOffset || document.documentElement.scrollTop;
        if (scroll >= leftOffset) {
          headerTabsArea.classList.add("tab_fixed");
        } else {
          headerTabsArea.classList.remove("tab_fixed");
        }
      });
    }
  }
  tabFixed();

  // Body fixed functionality
  function bodyFixed() {
    var bodyFixedElement = document.querySelector(".body_fixed");
    if (bodyFixedElement) {
      var headerHeight = document.querySelector(".header_area");
      if (headerHeight) {
        bodyFixedElement.style.paddingTop = headerHeight.offsetHeight + "px";
      }
    }
  }
  bodyFixed();

  // Menu functionality
  function Menu_js() {
    var menuToggle = document.querySelector(".menu_toggle");
    var hamburger = document.querySelector(".hamburger");
    var hamburgerCross = document.querySelector(".hamburger-cross");

    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        if (hamburger) hamburger.classList.toggle("active");
        if (hamburgerCross) hamburgerCross.classList.toggle("active");
      });
    }

    // Dropdown functionality
    var dropdownToggles = document.querySelectorAll("[data-bs-toggle='dropdown']");
    dropdownToggles.forEach(function (toggle) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        var dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains("dropdown-menu")) {
          dropdown.classList.toggle("show");
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".dropdown")) {
        var openDropdowns = document.querySelectorAll(".dropdown-menu.show");
        openDropdowns.forEach(function (dropdown) {
          dropdown.classList.remove("show");
        });
      }
    });
  }
  Menu_js();

  // Parallax functionality
  function parallax() {
    var parallaxElements = document.querySelectorAll(".parallax");
    if (parallaxElements.length) {
      window.addEventListener("scroll", function () {
        var scrolled = window.pageYOffset;
        parallaxElements.forEach(function (element) {
          var speed = element.dataset.speed || 0.5;
          element.style.transform = "translateY(" + (scrolled * speed) + "px)";
        });
      });
    }
  }
  parallax();

  // Tooltip functionality
  function tooltip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Initialize tooltips when DOM is ready
  if (typeof bootstrap !== 'undefined') {
    document.addEventListener("DOMContentLoaded", tooltip);
  }

  // Active dropdown functionality
  function active_dropdown() {
    var dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var parent = this.closest(".dropdown");
        if (parent) {
          var toggle = parent.querySelector(".dropdown-toggle");
          if (toggle) {
            toggle.textContent = this.textContent;
          }
        }
      });
    });
  }
  active_dropdown();

  // Counter up functionality
  function counterUp() {
    var counters = document.querySelectorAll(".counter");
    var options = {
      threshold: 0.5
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var count = parseInt(target.dataset.count) || 0;
          var duration = parseInt(target.dataset.duration) || 2000;
          var increment = count / (duration / 16);
          var current = 0;

          var timer = setInterval(function () {
            current += increment;
            if (current >= count) {
              target.textContent = count;
              clearInterval(timer);
            } else {
              target.textContent = Math.floor(current);
            }
          }, 16);
        }
      });
    }, options);

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  // Initialize counter up when DOM is ready
  document.addEventListener("DOMContentLoaded", counterUp);

  // Popup gallery functionality
  function popupGallery() {
    var galleryItems = document.querySelectorAll(".popup_gallery");
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        var imgSrc = this.href;
        var imgTitle = this.title || "";
        
        // Create modal
        var modal = document.createElement("div");
        modal.className = "modal fade";
        modal.innerHTML = `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${imgTitle}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body text-center">
                <img src="${imgSrc}" class="img-fluid" alt="${imgTitle}">
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        var bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
        
        modal.addEventListener("hidden.bs.modal", function () {
          document.body.removeChild(modal);
        });
      });
    });
  }

  // Initialize popup gallery when DOM is ready
  document.addEventListener("DOMContentLoaded", popupGallery);

  // WOW.js initialization
  function initWow() {
    if (typeof WOW !== 'undefined') {
      new WOW().init();
    }
  }

  // Initialize WOW when DOM is ready
  document.addEventListener("DOMContentLoaded", initWow);

  // General initialization
  function general() {
    // Smooth scrolling for anchor links
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (href !== "#") {
          e.preventDefault();
          var target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }
      });
    });

    // Form validation
    var forms = document.querySelectorAll(".needs-validation");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
        }
        form.classList.add("was-validated");
      });
    });
  }

  // Initialize general functionality when DOM is ready
  document.addEventListener("DOMContentLoaded", general);

  // Dark mode functionality
  function initDarkMode() {
    var darkModeSwitcher = document.querySelector(".dark_mode_switcher");
    if (darkModeSwitcher) {
      darkModeSwitcher.addEventListener("change", function () {
        if (this.checked) {
          document.body.classList.add("dark_mode");
          localStorage.setItem("darkMode", "enabled");
        } else {
          document.body.classList.remove("dark_mode");
          localStorage.setItem("darkMode", "disabled");
        }
      });

      // Check for saved dark mode preference
      var savedDarkMode = localStorage.getItem("darkMode");
      if (savedDarkMode === "enabled") {
        darkModeSwitcher.checked = true;
        document.body.classList.add("dark_mode");
      }
    }
  }

  // Initialize dark mode when DOM is ready
  document.addEventListener("DOMContentLoaded", initDarkMode);

  // Preloader functionality
  function initPreloader() {
    var preloader = document.getElementById("preloader");
    if (preloader) {
      window.addEventListener("load", function () {
        preloader.style.opacity = "0";
        setTimeout(function () {
          preloader.style.display = "none";
        }, 500);
      });
    }
  }

  // Initialize preloader when DOM is ready
  document.addEventListener("DOMContentLoaded", initPreloader);

})();
