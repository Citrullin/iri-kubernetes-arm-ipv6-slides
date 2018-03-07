function SlidesRenderer(timeout){
  var elementTemplate = {
    name: "",
    url: ""
  };

  var registeredElementOrder = [];
  var registeredElements = [];
  var htmlElements = [];

  function areElementsReady(){
    var areReady = true;

    for(var i = 0; i < registeredElements.length; i++){
      if(registeredElements[i].ready == false){
        areReady = false;
      }
    }

    return areReady;
  }

  return {
    registerFileAlias: function(alias, url){
      var index = registeredElements.length;

      registeredElements[index] = {
        alias,
        url,
        ready: false,
        html: ""
      };

      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);

      xhr.onreadystatechange = function(event){
        if(xhr.status == 200){
          registeredElements[index] = {
            alias,
            url,
            ready: true,
            html: xhr.responseText
          }
        }
      };

      xhr.send();
    },
    setAliasOrder: function(orderElements){
      registeredElementOrder = orderElements;
      if(areElementsReady()){
        for(var i = 0; i < registeredElements.length; i++){
          var registeredElement = registeredElements[i];
          for(var ii=0; ii < orderElements.length; ii++){
            if(orderElements[ii] == registeredElement.alias){
              orderElements[ii] = registeredElement.html;
            }
          }
        }

        htmlElements = orderElements;
      }else{
        setTimeout(function(){
          this.setAliasOrder(registeredElementOrder);
        }.bind(this), timeout);
      }
    },
    render(callbacks){
      if(areElementsReady()){
        document.getElementById("webslides").innerHTML = htmlElements.join("");
        for(var i = 0; i < callbacks.length; i++){
          callbacks[i]();
        }
      }else{
        setTimeout(function(){
          this.setAliasOrder(registeredElementOrder);
          this.render(callbacks);
        }.bind(this), timeout);
      }
    }
  }
}
