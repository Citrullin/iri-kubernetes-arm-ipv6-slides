function ContentReplacer(webSlideInstance){
  var configuration = {
    footer: {
      left: false,
      right: true
    },
    header: {
      title: true,
      subTitle: true
    }
  };

  var header = {
    title: "",
    subTitle: ""
  };
  var footer = {
    right: "",
    left: ""
  };

  var methods = {
    init: function(webSlideInstance){
      var slideElements = webSlideInstance.slides;

      slideElements.forEach(function(slide){
        slide.el.addEventListener('slide:enable', methods.slideSwitchEventListener.bind(methods));
      });
    },
    clearHeaderContent: function(){
      if(configuration.header.title){
        document.getElementById('header__title').innerHTML = "";
      }

      if(configuration.header.subTitle){
        document.getElementById('header__subheadline').innerHTML = "";
      }
    },
    clearFooterContent: function(){
      if(configuration.footer.left){
        document.getElementById('footer__left').innerHTML = "";
      }

      if(configuration.footer.right){
        document.getElementById('footer__right').innerHTML = "";
      }
    },
    addHeader: function(newHeader){
      if(configuration.header.title && !!newHeader.title && newHeader.title !== header.title){
        document.getElementById('header__title').innerHTML = newHeader.title;
      }

      if(configuration.header.subTitle && !!newHeader.subTitle && newHeader.subTitle !== header.subTitle){
        document.getElementById('header__subheadline').innerHTML = newHeader.subTitle;
      }
    },
    addFooter: function(newFooter){
      if(configuration.footer.left && !!footer.left && footer.left !== newFooter.left){
        document.getElementById('footer__left').innerHTML = newFooter.left;
      }
      if(configuration.footer.right && !!footer.right && footer.right !== newFooter.right){
        document.getElementById('footer__right').innerHTML = newFooter.right;
      }
    },
    slideSwitchEventListener: function(event){
      var contentAttribute = event.target.getAttribute('content');

      if(!!contentAttribute){
        var content = JSON.parse(contentAttribute);

        if(!!content.header){
          this.addHeader(content.header);
        }else{
          this.clearHeaderContent();
        }

        if(!!content.footer){
          this.addFooter(content.footer);
        }else{
          this.clearFooterContent();
        }
      }else{
        this.clearHeaderContent();
        this.clearFooterContent();
      }
    }
  };

  methods.init(webSlideInstance);

  return methods;
}
