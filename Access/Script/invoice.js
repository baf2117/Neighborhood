function after() {
    var height = window.innerHeight;
    var size = "height:" + height + "px";
    document.getElementById("imagediv").setAttribute("style", size);
    document.getElementById("resumediv").setAttribute("style", size);
    document.getElementById("mobilediv").setAttribute("style", size);
  };

  var nextButtondesk = document.querySelector('#next-desk');
  var nextButtonmobile = document.querySelector('#next-mobile');
  var phoneInputField = document.querySelector("#BillToPhone");
  var formdesk = document.querySelector('#formdesk');
  var formmobile = document.querySelector('#formmobile');
  var nitinput = document.querySelector('#BillToTaxId');
  var nitinputmobile = document.querySelector('#BillToTaxIdmobile');
  var cityinput = document.querySelector('#BillToAddressCity');
  var cityinputmobile = document.querySelector('#BillToAddressCitymobile');
  var addressinput = document.querySelector('#BillToAddress');
  var addressinputmobile = document.querySelector('#BillToAddressmobile');
  var emailinput = document.querySelector('#BillToEmail');
  var phoneInputFieldDone = document.querySelector("#PostBillToPhone");
  var emailinputmobile = document.querySelector('#BillToEmailmobile');
  var phoneInputFieldmobile = document.querySelector("#BillToPhonemobile");
  var phoneInputFieldDonemobile = document.querySelector("#PostBillToPhonemobile");
  const nitval = /\d*/g;
  var submitflag = false;

  var phoneInput = window.intlTelInput(phoneInputField, {
          preferredCountries: ["gt"],
          utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });

  var phoneInputFieldMobile = document.querySelector("#BillToPhonemobile");
  var phoneInputMobile = window.intlTelInput(phoneInputFieldMobile, {
          preferredCountries: ["gt"],
          utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });

  function cf(){
      var nit = document.getElementById('BillToTaxId');
      var cityinput = document.getElementById('BillToAddressCity');
      var addressinput = document.getElementById('BillToAddress');
      nit.value = "consumidor final"
      nit.style.color = 'black';
      nit.style.borderColor = '#EFEFEF'
      cityinput.value = "ciudad"
      cityinput.style.color = 'black';
      cityinput.style.borderColor = '#EFEFEF'
      addressinput.value = "ciudad"
      addressinput.style.color = 'black';
      addressinput.style.borderColor = '#EFEFEF'
  }

  function cfmobile(){
      var nit = document.getElementById('BillToTaxIdmobile');
      var cityinput = document.getElementById('BillToAddressCitymobile');
      var addressinput = document.getElementById('BillToAddressmobile');
      nit.value = "consumidor final"
      nit.style.color = 'black';
      nit.style.borderColor = '#EFEFEF'
      cityinput.value = "ciudad"
      cityinput.style.color = 'black';
      cityinput.style.borderColor = '#EFEFEF'
      addressinput.value = "ciudad"
      addressinput.style.color = 'black';
      addressinput.style.borderColor = '#EFEFEF'
  }

  function validatenit(nit) {
      if (nit.toLowerCase() === 'cf')
          return true

      if (nit.toLowerCase() === 'consumidor final')
          return true

      nit = nit.replaceAll('-','');

      if (nit[0] === '0')
          return false;

      if (nit.length > 9 || nit.length < 4)
          return false;

      const array = [...nit.matchAll(nitval)];

      if (array.length === 0)
          return false;
      if (array.length > 2)
          return false

      return true;
  }

  function validateEmail(email) {
      const re = /^(([^<>()[\]\.,;:\s@@\"]+(\.[^<>()[\]\.,;:\s@@\"]+)*)|(\".+\"))@@(([^<>()[\]\.,;:\s@@\"]+\.)+[^<>()[\]\.,;:\s@@\"]{2,})$/i;
      return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone){
      phone = phone.replaceAll(" ", "");
      phone = phone.replaceAll("-", "");
      return true;
  }

  function popupnext() {
      var popup = document.getElementById("popupnext");
      popup.classList.toggle("show");
  }

  cityinput.addEventListener('input', function changenit(e){
      var city = e.target.value;
      if(city.length === 0 && submitflag){
          cityinput.style.color = 'red';
          cityinput.style.borderColor = 'red'
      }else{
          var popup = document.getElementById("popupnext");
          popup.classList.add("hide");
          popup.classList.remove("show");
          cityinput.style.color = 'black';
          cityinput.style.borderColor = '#EFEFEF'
      }
  });

  addressinput.addEventListener('input', function changenit(e){
      var city = e.target.value;
      if(city.length === 0 && submitflag){
          addressinput.style.color = 'red';
          addressinput.style.borderColor = 'red'
      }else{
          var popup = document.getElementById("popupnext");
          popup.classList.add("hide");
          popup.classList.remove("show");
          addressinput.style.color = 'black';
          addressinput.style.borderColor = '#EFEFEF'
      }
  });

  emailinput.addEventListener('input', function changenit(e){
      var email = e.target.value;
      if(!validateEmail(email) && submitflag){
          emailinput.style.color = 'red';
          emailinput.style.borderColor = 'red'
      }else{
          var popup = document.getElementById("popupnext");
          popup.classList.add("hide");
          popup.classList.remove("show");
          emailinput.style.color = 'black';
          emailinput.style.borderColor = '#EFEFEF'
      }
  });

  nitinput.addEventListener('input', function changenit(e){
      var nit = e.target.value;
      if(!validatenit(nit) && submitflag){
          nitinput.style.color = 'red';
          nitinput.style.borderColor = 'red'
      }else{
          var popup = document.getElementById("popupnext");
          popup.classList.add("hide");
          popup.classList.remove("show");
          nitinput.style.color = 'black';
          nitinput.style.borderColor = '#EFEFEF'
      }
  });

  phoneInputField.addEventListener('input',function event(e){
      var phone = e.target.value;
      if((!phone || phone.length === 0 || !validatePhone(phone)) && submitflag){
          phoneInputField.style.color = 'red';
          document.getElementById('divbilltophone').style.borderColor = 'red';
      }else{
          var popup = document.getElementById("popupnext");
          popup.classList.add("hide");
          popup.classList.remove("show");
          phoneInputField.style.color = 'black';
          document.getElementById('divbilltophone').style.borderColor = '#EFEFEF';
      }
  })

  cityinputmobile.addEventListener('input', function changenit(e){
      var city = e.target.value;
      if(city.length === 0 && submitflag){
          cityinputmobile.style.color = 'red';
          cityinputmobile.style.borderColor = 'red'
      }else{
          cityinputmobile.style.color = 'black';
          cityinputmobile.style.borderColor = '#EFEFEF'
      }
  });

  addressinputmobile.addEventListener('input', function changenit(e){
      var city = e.target.value;
      if(city.length === 0 && submitflag){
          addressinputmobile.style.color = 'red';
          addressinputmobile.style.borderColor = 'red'
      }else{
          addressinputmobile.style.color = 'black';
          addressinputmobile.style.borderColor = '#EFEFEF'
      }
  });

  emailinputmobile.addEventListener('input', function changenit(e){
      var email = e.target.value;
      if(!validateEmail(email) && submitflag){
          emailinputmobile.style.color = 'red';
          emailinputmobile.style.borderColor = 'red'
      }else{
          emailinputmobile.style.color = 'black';
          emailinputmobile.style.borderColor = '#EFEFEF'
      }
  });

  nitinputmobile.addEventListener('input', function changenit(e){
      var nit = e.target.value;
      if(!validatenit(nit) && submitflag){
          nitinputmobile.style.color = 'red';
          nitinputmobile.style.borderColor = 'red'
      }else{
          nitinputmobile.style.color = 'black';
          nitinputmobile.style.borderColor = '#EFEFEF'
      }
  });

  phoneInputFieldmobile.addEventListener('input',function event(e){
      var phone = e.target.value;
      if((!phone || phone.length === 0 || !validatePhone(phone)) && submitflag){
          phoneInputFieldmobile.style.color = 'red';
          document.getElementById('divbilltophonemobile').style.borderColor = 'red';
      }else{
          phoneInputFieldmobile.style.color = 'black';
          document.getElementById('divbilltophonemobile').style.borderColor = '#EFEFEF';
      }
  })

  nextButtondesk.addEventListener('click', function () {
    var nit = nitinput.value;
    var city = cityinput.value;
    var address = addressinput.value;
    var email = emailinput.value;
    var errors = 0;


    if(!city || city.length === 0){
        cityinput.style.color = 'red';
        cityinput.style.borderColor = 'red';
        errors ++;
    }

    if(!address || address.length === 0){
        addressinput.style.color = 'red';
        addressinput.style.borderColor = 'red';
        errors ++;
    }

    if(!validatenit(nit)){
        nitinput.style.color = 'red';
        nitinput.style.borderColor = 'red';
        errors ++;
    }

    if(!validateEmail(email)){
        emailinput.style.color = 'red';
        emailinput.style.borderColor = 'red';
        errors ++;
    }

    var phoneNumber = phoneInput.getNumber();
    phoneInputFieldDone.value = phoneNumber;

    if(!phoneNumber || phoneNumber.length === 0){
        phoneInputField.style.color = 'red';
        document.getElementById('divbilltophone').style.borderColor = 'red';
        errors++;
    }

    if(errors === 0){
        nextButtondesk.disabled = true;
        formdesk.submit();
    } else { 
        var popup = document.getElementById("popupnext");
        popup.classList.toggle("show");
    }
  });

  nextButtonmobile.addEventListener('click', function () {
    var nit = nitinputmobile.value;
    var city = cityinputmobile.value;
    var address = addressinputmobile.value;
    var email = emailinputmobile.value;
    var errors = 0;


    if(!city || city.length === 0){
        cityinputmobile.style.color = 'red';
        cityinputmobile.style.borderColor = 'red';
        errors ++;
    }

    if(!address || address.length === 0){
        addressinputmobile.style.color = 'red';
        addressinputmobile.style.borderColor = 'red';
        errors ++;
    }

    if(!validatenit(nit)){
        nitinputmobile.style.color = 'red';
        nitinputmobile.style.borderColor = 'red';
        errors ++;
    }

    if(!validateEmail(email)){
        emailinputmobile.style.color = 'red';
        emailinputmobile.style.borderColor = 'red';
        errors ++;
    }

    var phoneNumber = phoneInputMobile.getNumber();
    phoneInputFieldDonemobile.value = phoneNumber;

    if(!phoneNumber || phoneNumber.length === 0){
        phoneInputFieldmobile.style.color = 'red';
        document.getElementById('divbilltophonemobile').style.borderColor = 'red';
        errors++;
    }

    if(errors === 0){
        nextButtondesk.disabled = true;
        formmobile.submit();
    } else { 
        /*var popup = document.getElementById("popupnext");
        popup.classList.toggle("show");*/
    }
  });