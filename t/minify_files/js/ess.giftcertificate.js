document.observe("dom:loaded", function(e) {

    var orderForm = $("orderForm");
    if (orderForm) {
        orderForm.onsubmit = function() {
          return verifyGiftFields();
        };
    }

    var select_amount = $("select_amount");
    var input_amount = $("input_amount");
    var amount = $("certificateAmount");

    if ( select_amount ) {
        select_amount.observe( 'keyup', function() {
            if ( select_amount.getValue() != '' ) {
                setAmount( select_amount.getValue() );
                input_amount.value = '';
            }
            checkAmount();
        } );
        select_amount.observe( 'click', function() {
            if ( select_amount.getValue() != '' ) {
                setAmount( select_amount.getValue() );
                input_amount.value = '';
            }
            checkAmount();
        } );
    }

    if ( input_amount ) {
        input_amount.observe( 'keyup', function() {
            if ( input_amount.getValue() != '' ) {
                setAmount( input_amount.getValue() );
                select_amount.selectedIndex = 0;
            }
            checkAmount();
        } );
    }
    
    function setAmount( newAmount ) {
        amount.value = newAmount;
    }
    function checkAmount() {
        if ( (input_amount.getValue() == '') && (select_amount.getValue() == '') ) {
            amount.value = '';
        }
    }
    
    function verifyGiftFields() {
        var emailReg = "^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$";
        
        var ele = $("recipientName");
        if (ele && !ele.present()) {
            //alert(ess.messages.validateRequiredFields);
            alert("Please enter the recipients name.");
            ele.focus();
            return false;
        }

        var ele = $("recipientEmail");
        if (!ess.validateEmail(ele.identify())) {
            alert("Please Enter valid Email Address");
            // $("recipientEmail").focus();
            ele.focus();
            return false;
        }

        ele = $("message");
        if(ele && ele.value==""){
            alert("Please enter the message.");
            ele.focus();
            return false;
        }

        if (ele && ele.value.length > 200) {
            //alert(ess.messages.validateGiftCertificateMessageLength);
            alert("Please reduce the length of the message.");
            ele.focus();
            return false;
        }

        ele = $("senderName");
        if (ele && !ele.present()) {
            //alert(ess.messages.validateRequiredFields);
            alert("Please enter your name.");
            ele.focus();
            return false;
        }

        ele = amount;

        if ( ele ) {
            // for some reason the regexp was not working to check this
            if (ele.value.indexOf(".") != -1) {
                alert("Please enter a whole dollar amount.");
                input_amount.focus();
                return false;
            }

            if ( isNaN( amount.value ) ) {
                //alert(ess.messages.validateGiftCertificateValue3);
                alert("Please enter an amount.");
                input_amount.focus();
                return false;
            }

            var numberRegEx = /^\d+$/;

            if ( !numberRegEx.test( amount.value ) ) {
                //alert(ess.messages.validateGiftCertificateValue2);
                alert("Please enter an amount.");
                input_amount.focus();
                return false;
            }

            if ( parseInt( amount.value ) < 5 ) {
                //alert(ess.messages.validateGiftCertificateValue1);
                alert("Please increase the amount you entered.");
                input_amount.focus();
                return false;
            }

            if ( parseInt( amount.value ) > 250 ) {
                //alert(ess.messages.validateGiftCertificateValue1);
                alert("Please decrease the amount you entered.");
                input_amount.focus();
                return false;
            }

            if ( parseInt( amount.value ) % 5 != 0 ) {
                //alert(ess.messages.validateGiftCertificateValue1);
                alert("Please select an amount that is an increment of 5.");
                input_amount.focus();
                return false;
            }
        }
        return true;
    }

});