"use strict";
jQuery(window).on("load", function() {

    /* COUNTER */
    jQuery(".tu-menu").on("click",function(){
      this.classList.toggle('opened');
      this.setAttribute('aria-expanded', this.classList.contains('opened'))
    })
    // onclick=""
    try {
      var _tu_statistics = jQuery('#tu-counter');
      _tu_statistics.appear(function () {
          var _tu_statistics = jQuery('.tu-stats li h4 span');
          _tu_statistics.countTo({
              formatter: function (value, options) {
                return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
              }
          });
      });
    } catch (err) {}
    //  Instructor Slider
    var tu_instructorslider = document.getElementById('tu-instructorslider')
    if(tu_instructorslider !== null){
      var splideslider = new Splide( '#tu-instructorslider', {
        type   : 'loop',
        perPage: 4,
        perMove: 1,
        gap: 24,
        pagination: true,
        arrows: false,
        breakpoints: {
          1400: {
            perPage: 3,
          },
          991: {
            perPage: 2,
          },
          767: {
            perPage: 1,
          }
        }
      } );
      splideslider.mount();
    }
    //  Instructor Slider
    var tu_categoriesslider = document.getElementById('tu-categoriesslider')
    if(tu_categoriesslider !== null){
      var splideslider = new Splide( '#tu-categoriesslider', {
        type   : 'loop',
        perPage: 4,
        perMove: 1,
        gap: 24,
        pagination: true,
        arrows: false,
        breakpoints: {
          1199: {
            perPage: 3,
          },
          991: {
            perPage: 2,
          },
          575: {
            perPage: 1,
          }
        }
      } );
      splideslider.mount();
    }
    //  Instructor Slider
    var tu_sucesstorslider = document.getElementById('tu-sucesstorslider')
    if(tu_sucesstorslider !== null){
      var splideslider = new Splide( '#tu-sucesstorslider', {
        type   : 'loop',
        perPage: 1,
        perMove: 1,
        gap: 100,
        autoplay: true,
        interval: 3000,
        pagination: false,
        arrows: true,
        breakpoints: {
          1199: {
            pagination: true,
            arrows: false,
          }
        }
      } );
      splideslider.mount();
    }
    //  Instructor Slider
    //  Feature Slider
    var tu_featurelist = document.getElementById('tu-featurelist')
    if(tu_featurelist !== null){
      var splideslider = new Splide( '#tu-featurelist', {
        type   : 'loop',
        perPage: 4,
        perMove: 1,
        gap: 24,
        pagination: true,
        arrows: false,
        breakpoints: {
          1400: {
            perPage: 3,
          },
          991: {
            perPage: 2,
          },
          767 : {
            perPage: 1,
          }
        }
      } );
      splideslider.mount();
    }
    //  Feature Slider
    var tu_sucesstorieslider = document.getElementById('tu-sucesstorieslider')
    if(tu_sucesstorieslider !== null){
      var splideslider = new Splide( '#tu-sucesstorieslider', {
        type   : 'loop',
        perPage: 3,
        perMove: 1,
        gap: 24,
        pagination: false,
        arrows: true,
        breakpoints: {
          1399: {
            perPage: 2,
            pagination: true,
            arrows: false,
          },
          991: {
            perPage: 1,
            pagination: true,
            arrows: false,
          },
        }
      } );
      splideslider.mount();
    }
  // Service detail sync slider
  jQuery(window).on("resize", function () {
    var tu_splide = document.getElementById('tu_splide_one')
    if (tu_splide !== null) {
      var secondarySlider = new Splide( '#tusyncthumbnail_one', {
        type       : 'loop',
        rewind      : true,
        fixedWidth  : 50,
        fixedHeight : 50,
        isNavigation: true,
        gap         : 10,
        pagination  : false,
        arrows     : false,
        focus  : 'center',
        updateOnMove: true,
        
      } ).mount();
      var primarySlider = new Splide( '#tu_splide_one', {
        type       : 'fade',
        pagination : false,
        cover      : true,
        arrows     : false,
      } )
      primarySlider.sync( secondarySlider ).mount(); 
    }
    var tu_splide = document.getElementById('tu_splide_two')
    if (tu_splide !== null) {
      var secondarySlider = new Splide( '#tusyncthumbnail_two', {
        type       : 'loop',
        rewind      : true,
        fixedWidth  : 50,
        fixedHeight : 50,
        isNavigation: true,
        gap         : 10,
        pagination  : false,
        arrows     : false,
        focus  : 'center',
        updateOnMove: true,
        
      } ).mount();
      var primarySlider = new Splide( '#tu_splide_two', {
        type       : 'fade',
        pagination : false,
        cover      : true,
        arrows     : false,
      } )
      primarySlider.sync( secondarySlider ).mount(); 
    }    
    var tu_splide = document.getElementById('tu_splide_three')
      if (tu_splide !== null) {
        var secondarySlider = new Splide( '#tusyncthumbnail_three', {
          type       : 'loop',
          rewind      : true,
          fixedWidth  : 50,
          fixedHeight : 50,
          isNavigation: true,
          gap         : 10,
          pagination  : false,
          arrows     : false,
          focus  : 'center',
          updateOnMove: true,
          
        } ).mount();
        var primarySlider = new Splide( '#tu_splide_three', {
          type       : 'fade',
          pagination : false,
          cover      : true,
          arrows     : false,
        } )
        primarySlider.sync( secondarySlider ).mount(); 
      }    
      var tu_splide = document.getElementById('tu_splide_four')
      if (tu_splide !== null) {
        var secondarySlider = new Splide( '#tusyncthumbnail_four', {
          type       : 'loop',
          rewind      : true,
          fixedWidth  : 50,
          fixedHeight : 50,
          isNavigation: true,
          gap         : 10,
          pagination  : false,
          arrows     : false,
          focus  : 'center',
          updateOnMove: true,
          
        } ).mount();
        var primarySlider = new Splide( '#tu_splide_four', {
          type       : 'fade',
          pagination : false,
          cover      : true,
          arrows     : false,
        } )
        primarySlider.sync( secondarySlider ).mount(); 
      }    
      var tu_splide = document.getElementById('tu_splide_five')
      if (tu_splide !== null) {
        var secondarySlider = new Splide( '#tusyncthumbnail_five', {
          type       : 'loop',
          rewind      : true,
          fixedWidth  : 50,
          fixedHeight : 50,
          isNavigation: true,
          gap         : 10,
          pagination  : false,
          arrows     : false,
          focus  : 'center',
          updateOnMove: true,
          
        } ).mount();
        var primarySlider = new Splide( '#tu_splide_five', {
          type       : 'fade',
          pagination : false,
          cover      : true,
          arrows     : false,
        } )
        primarySlider.sync( secondarySlider ).mount(); 
      }    
  }).trigger("resize");
  // JRATE STARS
  var jrate1 = document.getElementById('tu-addreview')
  if (jrate1 !== null) {
    jQuery(function () {
      var that = this;
      var toolitup = $("#tu-addreview").jRate({
          rating: 4.0,
          strokeColor: '#DDDDDD',
          precision: 1,
          startColor: "#EAB308",
          endColor: "#EAB308",
          backgroundColor: '#DDDDDD',
          minSelected: 1,
          shapeGap: '6px',
          count: 5,
          width: 22,
          height: 22,
          onChange: function(rating) {
              jQuery('.counter').text(rating + '');
          },
          onSet: function(rating) {
              console.log("OnSet: Rating: "+rating);
          }
      });
    });
  }
  // Loade More
  let classes = [
    '.tu-categorieslist',
    '.tu-commenteditem',
    '.tu-filterselect li',
    '.tu-commentarea'
  ];
  for ( let i = 0; i < classes.length; ++i) {
    if (classes[i].length <= 3) {
      jQuery(".tu-show_more").hide();
    } 
    else if (classes[i].length >= 3) {
      jQuery(".tu-show_more").show();
      jQuery(".tu-categorieslist li:nth-child(n+7)").hide();
      jQuery(".tu-collapseitem .tu-commenteditem:nth-child(n+6)").hide();
      jQuery(".tu-filterselect li:nth-child(n+7)").hide();
      jQuery(".tu-commentarea .tu-commentlist:nth-child(n+5)").hide();
    }
  }
  jQuery(".tu-show_more").on("click", function() {
    jQuery(this).text($(this).text() === "Show less" ? "Show all" : "Show less");
    jQuery(this).closest(".tu-asideitem").find(".tu-categorieslist li:nth-child(n+7)").slideToggle();
    jQuery(this).closest(".tu-asideitem").find(".tu-collapseitem .tu-commenteditem:nth-child(n+6)").slideToggle();
    jQuery(this).closest(".tu-aside-content").find(".tu-filterselect li:nth-child(n+7)").slideToggle();
    jQuery(this).closest(".tu-tabswrapper").find(".tu-commentarea .tu-commentlist:nth-child(n+5)").slideToggle();
    jQuery(this).closest(".tu-boxlg").find(".tu-commentarea .tu-commentlist:nth-child(n+5)").slideToggle();
  });
  // select2
  jQuery(".tu-selectv").select2({
    width: '165' ,
    minimumResultsForSearch: Infinity
  });
  var config = {
    '#selectv1'  : {allowClear: true, minimumResultsForSearch: Infinity},
    '#selectv2'  : {allowClear: true, minimumResultsForSearch: Infinity},
    '#selectv3'  : {allowClear: true, minimumResultsForSearch: Infinity},
    '#selectv4'  : {allowClear: true, minimumResultsForSearch: Infinity},
    '#selectv5'  : {allowClear: true, minimumResultsForSearch: Infinity},
    '#selectv6'  : {allowClear: true, minimumResultsForSearch: Infinity},
    '#selectv10'  : {allowClear: true, minimumResultsForSearch: Infinity},
    '#selectv7'  : {allowClear: true},
    '#selectv8'  : {allowClear: true},
    '#selectv9'  : {allowClear: true},
    '#selectv10'  : {allowClear: true},
    '#selectv11'  : {allowClear: true},
    '#tu-selectv5'  : {allowClear: true},
  }
  jQuery('[data-placeholderinput]').each(function(item){
    var data_placeholder = jQuery('[data-placeholderinput]')[item]
    var tu_id = jQuery(data_placeholder).attr('id')
    var tu_placeholder = jQuery(data_placeholder).attr('data-placeholderinput')
    jQuery('#'+tu_id).on('select2:open', function(e) {
      jQuery('input.select2-search__field').prop('placeholder', tu_placeholder);
    });
  });
  for (var selector in config) {
    jQuery(selector).select2(config[selector]);
  }
  jQuery('select').on('select2:open', function (e) {
    jQuery('.select2-results__options').mCustomScrollbar('destroy');
    setTimeout(function () {
      jQuery('.select2-results__options').mCustomScrollbar();
    }, 0);
  });
  // range mater collapse
  jQuery(".tu-rangevalue").on("click",function() {
    jQuery("#tu-rangecollapse").collapse("show");
  });
   // RangeSlider
   var softSlider = document.getElementById("tu-rangeslidertwo");
   if (softSlider !== null) {
     noUiSlider.create(softSlider, {
       start: 256,
       connect: "lower",
       range: {
         min: 0,
         max: 500,
       },
       format: wNumb({
         decimals: 0,
       }),
     });
     var slider1Value = document.getElementById("slider1-span");
 
     softSlider.noUiSlider.on("update", function(values, handle) {
       slider1Value.innerHTML = values[handle];
     });
   }
 
   var stepsSlider = document.getElementById("tu-rangeslider");
   if (stepsSlider !== null) {
     var input0 = document.getElementById("tu-min-value");
     var input1 = document.getElementById("tu-max-value");
     var inputs = [input0, input1];
 
     noUiSlider.create(stepsSlider, {
       start: [200, 400],
       connect: true,
       range: {
         min: 0,
         max: 600,
       },
       format: {
         to: (v) => parseFloat(v).toFixed(0),
         from: (v) => parseFloat(v).toFixed(0),
         suffix: " (US $)",
       },
     });
     stepsSlider.noUiSlider.on("update", function(values, handle) {
       inputs[handle].value = values[handle];
     });
     inputs.forEach(function(input, handle) {
       input.addEventListener("change", function() {
         stepsSlider.noUiSlider.setHandle(handle, this.value);
       });
       input.addEventListener("keydown", function(e) {
         var values = stepsSlider.noUiSlider.get();
         var value = Number(values[handle]);
         var steps = stepsSlider.noUiSlider.steps();
         var step = steps[handle];
         var position;
         switch (e.which) {
           case 13:
             stepsSlider.noUiSlider.setHandle(handle, this.value);
             break;
           case 38:
             position = step[1];
             if (position === false) {
               position = 1;
             }
             if (position !== null) {
               stepsSlider.noUiSlider.setHandle(handle, value + position);
             }
           break;
           case 40:
             position = step[0];
             if (position === false) {
               position = 1;
             }
             if (position !== null) {
               stepsSlider.noUiSlider.setHandle(handle, value - position);
             }
           break;
         }
       });
     });
   }
  //  liked 
   jQuery(".tu-iconheart,.tu-linkheart").on("click", function() {
    jQuery(this).children("i.icon-heart").addClass("tu-colorred");
    jQuery(this).children("span").text("Saved");
  });
  // remove
  jQuery(".tu-searchtags li span a, .tu-labels li span a").on("click", function() {
    jQuery(this).closest("li").remove();
  })
  // Particles
  var particle = document.getElementById("tu-particle");
    if (particle !== null) {
      particlesJS("tu-particle", {
      particles: {
      number: {
        value: 10,
      },
      color: {
        value: ["#1DA1F2","#22C55E","#F97316"],
      },
      "opacity": {
        "random": true,
      },
      line_linked: {
        enable: false,
      },
      size: {
        value: 12,
        random: true,
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "auto",
      },
      },
    });
  }
  // particals
  var tu_particle = document.getElementById("tu-particlev2");
    if (tu_particle !== null) {
    // particles.js config 
    particlesJS("tu-particlev2", {
      "particles": {
        "number": {
          "value": 40,
        },
        "color": {
          "value": "#ffffff"
        },
        "opacity": {
          "value": 0.4,
          "random": false,
          
        },
        size: {
          value: 12,
          random: true,
        },
        "line_linked": {
          "enable": false,
        },
        "move": {
          "enable": true,
          "speed": 3,
        }
      },
      "interactivity": {
        "enable": false,
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "grab"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
        },
      },
    });
  }
  // Service detail sync slider
  jQuery(window).on("resize", function () {
    var tu_splide = document.getElementById('tu_splide')
    if (tu_splide !== null) {
      var secondarySlider = new Splide( '#tu_splidev2', {
        gap: 10,
        // type: "loop",
        arrows: true,
        rewind: false,
        drag: false,
        focus: "center",
        fixedWidth: 100,
        fixedHeight: 100,
        isNavigation: true, 
        pagination: false,
        updateOnMove: true,
        cover      : true,
        breakpoints: {
          1400 : {
            fixedWidth: 96,
            fixedHeight: 96,
          },
          1199 : {
            fixedWidth: 66,
            fixedHeight: 66,
          }
        }
      } ).mount();
      var primarySlider = new Splide( '#tu_splide', {
        type       : "fade",
        pagination : false,
        cover      : true,
        arrows: false,
        breakpoints: {
          767 : {
            pagination : true,
          },
        }
      } )
      primarySlider.sync( secondarySlider ).mount(); 
    }
  }).trigger("resize"); 
  // VenoBox Video Popup
  let venobox = document.querySelector(".tu-themegallery");
  if (venobox !== null) {
    jQuery(".tu-themegallery").venobox({
      spinner : 'cube-grid',
      
    });
  }
  // lite picker
  var pickers = document.querySelectorAll(".tu-datepicker");
  jQuery(pickers).each(function(index) {
    var picker = new Litepicker({
      element: pickers[index],
      singleMode: false,
      start: new Date(),
      maxDate: new Date(),
      tooltipText: {
        one: "night",
        other: "nights",
      },
      tooltipNumber: (totalDays) => {
        return totalDays - 1;
      },
    });
  });
  //toggle two classes on mobile menu
  jQuery(".tu-dbmenu").on("click", function() {
    jQuery(".tu-asidewrapper").toggleClass("tu-opendbmenu");
  });
  // tippy start
  const tu_verifed = document.getElementById("tu-verifed");
  if (tu_verifed !== null) {
    tippy('[data-tippy-html="#tu-verifed"]', {
      content: tu_verifed.innerHTML,
      allowHTML: true,
      animation: "scale",
    });
  }
  
  const tu_industrypro = document.getElementById("tu-industrypro");
  if (tu_industrypro !== null) {
    tippy('[data-tippy-html="#tu-industrypro"]', {
      content: tu_industrypro.innerHTML,
      allowHTML: true,
      animation: "scale",
    });
  }
   // RESPONSIVE
  function responsive(){
    var width = jQuery('body').width();
    if (width > 1200){
      jQuery(".menu-item-has-children,.sub-menu .menu-item-has-children").hover(function() {
        var isHovered = jQuery(this).is(":hover");
        if (isHovered) {
          jQuery(this).children("ul").stop().slideDown(450);
        } else {
          jQuery(this).children("ul").stop().slideUp(400);
        }
      });
    }
  }
  responsive()
  jQuery(window).resize(function() {
  responsive()
  });
  function collapseMenu(){
    jQuery('.menu-item-has-children > a,.menu-item-has-children strong').on('click', function() {
      jQuery(this).parent('li').toggleClass('tu-open-menu');
      jQuery(this).next().slideToggle(300);
    });
  }
  collapseMenu();
   // typing animated styling
   let lo_typethree = document.querySelector(".type")
   if( lo_typethree !== null){
     var typed = new Typed(".type", {
       strings:["A bright future", "Equitable societies", "Self confidence"],
       typeSpeed: 100,
       backSpeed:100,
       loop: true,
       showCursor: false,
     });
   };
   jQuery(".tu-pagination > ul").on('click', 'li',function () {
    $('.tu-pagination > ul  li.active').removeClass('active');
    $(this).addClass('active');
    });
});

/* PRELOADER*/
jQuery(window).on("load",function () { 
  jQuery(".tu-preloader").delay(700).fadeOut();
  jQuery(".tu-preloader_holder").delay(500).fadeOut("slow");
})

 