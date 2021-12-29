var auth = false
var x = 1;
var loggedOut = false;
(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 768) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header slider
    $('.header-slider').slick({
      //  autoplay: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });


    // Product Slider 4 Column
    $('.product-slider-4').slick({
        //autoplay: true,
        infinite: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });



/*
    // Product Detail Slider
    $('.product-slider-single').slick({
        infinite: true,
        autoplay: true,
        dots: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.product-slider-single-nav'
    });
    $('.product-slider-single-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        asNavFor: '.product-slider-single'
    });

*/

    // Brand Slider
    $('.brand-slider').slick({
        speed: 5000,
      //  autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        swipeToSlide: true,
        centerMode: true,
        focusOnSelect: false,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


/*
    // Review slider
    $('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

*/
    // Widget slider
    $('.sidebar-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });


    // Quantity
    $('.qty button').on('click', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });


    // Shipping address show hide
    $('.checkout #shipto').change(function () {
        if($(this).is(':checked')) {
            $('.checkout .shipping-address').slideDown();
        } else {
            $('.checkout .shipping-address').slideUp();
        }
    });


    // Payment methods show hide
    $('.checkout .payment-method .custom-control-input').change(function () {
        if ($(this).prop('checked')) {
            var checkbox_id = $(this).attr('id');
            $('.checkout .payment-method .payment-content').slideUp();
            $('#' + checkbox_id + '-show').slideDown();
        }
    });


    // $("#registerForm").ready(() => {

    // });


    // if(window.location.pathname === '/users/register'){
    //     fetch('http:localhost/3000/users/register')
    //     .then(res => {
    //         console.log('he entered here');
    //         return res.json();
    //     })
    //     .then(res => {
    //         if(!res.authenticated){
    //             window.location.replace("http://localhost:8080/error");
    //         }
    //     })
    //     .catch(err => console.log(err));
    // }

    // if(window.location.href === 'http://localhost:8080/users/login'){
    //     fetch('http://localhost/3000/users/login')
    //     .then(res => {
    //         console.log('here');
    //         return res.json();
    //     })
    //     .then(res => {
    //         if(!res.authenticated){
    //             window.location.replace("http://localhost:8080/error");
    //         }
    //     })
    //     .catch(err => console.log(err));
    // }

    

    //controlling register page
    let mes;
    $("#registerForm").submit( (e) => {
        e.preventDefault();

        const name = $('#name').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const password2 = $('#password2').val();

        // $('.login #registerForm input');
        fetch('http://localhost:3000/users/register', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password2: password2
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(res => {
            //when email exist
            if(res.st === 2){
                var mesg = '<div class="alert alert-success alert-dismissible fade show" role="alert">' + 
                    res.message +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
                $("form").prepend(mesg);
            }
            //when email is created
            if(res.st === 3){
                mes = res.message;
                window.location.href = 'http://localhost:8080/users/login';
                // var mesg = '<div class="alert alert-success alert-dismissible fade show" role="alert">' + 
                // res.message +
                // '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
                // console.log(mesg);
                // console.log(res.message);
                // //Cookies.set('success_msg', res.message);
                // $("form").prepend(mesg);
            }
            //when there is an error in input fields
            if(res.st === 1){
                for(var i = 0; i < res.errors.length; i++){
                    var mesg = '<div class="alert alert-warning alert-dismissible fade show" role="alert">' + 
                    res.errors[i].msg +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
                    $("form").before(mesg);
                }
            }
        })
        .catch(err => console.log(err));
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // var url = document.location.href;
    // fetch('http://localhost:3000/users/login',{
    //     method: 'GET'
    // })
    // .then(res => {
    //     return res.json();
    // })
    // .then(res => {
    //     auth = res.authenticated;
    // })
    // .catch(err => console.log(err));

    // fetch('http://localhost:3000/users/logout')
    // .then(res => {
    //     return res.json();
    // })
    // .then(res => {
    //     loggedOut = res.loggedout;
    // })
    // .catch(err => console.log(err));

    // if(auth === true){
    //     if(window.location.href === 'http://localhost:8080/users/login'){
    //         window.location.href = 'http://localhost:8080/error'
    //     }
    // }
    // if(auth === false) {
    //     if(x === 1){
    //         if(window.location.href === 'http://localhost:8080/users/login'){
    //             x = 2;
    //         }   
    //     }
    // }
    // if(loggedOut === true){
    //     auth = false;
    //     x = 1;
    // }
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // $("#loginBtn").click( (e) => {
    //     e.preventDefault();
    //     fetch('http://localhost:3000/users/login',{
    //         method: 'GET'
    //     })
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(res => {
    //         if(res.authenticated === false){
    //             window.location.href = 'http://localhost:8080/users/login';
    //         }
    //     })
    //     .catch(err => console.log(err))
    // });

    
    //controlling login page
    $("#loginForm").submit( (e) => {
        e.preventDefault();

        // if(mes !== null){
        //     mes = '<div class="alert alert-success alert-dismissible fade show" role="alert">' + mes
        //     '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
        //     $('#loginForm').prepend(mes);
        //     mes = null;
        // }

        const email = $('#email').val();
        const password = $('#password').val();

        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            //console.log(res);
            return res.json();
            // window.location.href = 'http://localhost:8080/users/login';
            // var er = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Login Operation is unacceptable<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            // $('#loginForm').before(er);
        })
        .then(res => {
            localStorage.setItem('token', res.token);
            //console.log(res);
            //window.location.href = 'http://localhost:8080/shop';
            fetch('http://localhost:3000/shop', {
            headers: {
                Authorization: 'Bearer '+ res.token
            }
            })
            .then(res => {
                //console.log(res);
                return res.json();
            })
            .then(res => {
                console.log(res);
                var product;
              //  window.location.href = 'http://localhost:8080/shop';
                for(let i = 0; i < res.products.length; i++){
                    product = '<div class="col-md-4"><div class="product-item"><div class="product-title"><a href="#">'+
                    res.products[i].name + '</a><div><a href="">' + res.products[i].description + '</a></div></div>' + 
                    '<div class="product-image"><a href=""> <img style="width: 300px; height: 300px;" src="'+ res.products[i].image +'" alt="Product Image">' +
                    '</a></div><div class="product-price"><h3><span>$</span>' + res.products[i].price +'</h3><a class="btn" ><i class="fa fa-shopping-cart"></i>Add to Cart</a>';
                    $('#productsRow').append(product);
                }
            })
            // var cookies = getCookies();
            // console.log(cookies);
        })
        .catch(err => console.log(err));
    });

    // $('.product-view').ready( () => {
    //     let token = localStorage.getItem('token')
    //     fetch('http://localhost:3000/shop', {
    //         headers: {
    //             Authorization: 'Bearer '+ token
    //         }
    //     })
    //     .then(res => {
    //         //console.log(res);
    //         return res.json();
    //     })
    //     .then(res => {
    //         console.log(res);
    //         var product;
    //         for(let i = 0; i < res.products.length; i++){
    //             product = '<div class="col-md-4"><div class="product-item"><div class="product-title"><a href="#">'+
    //             res.products[i].name + '</a><div><a href="">' + res.products[i].description + '</a></div></div>' + 
    //             '<div class="product-image"><a href=""> <img style="width: 300px; height: 300px;" src="'+ res.products[i].image +'" alt="Product Image">' +
    //             '</a></div><div class="product-price"><h3><span>$</span>' + res.products[i].price +'</h3><a class="btn" ><i class="fa fa-shopping-cart"></i>Add to Cart</a>';
    //             $('#productsRow').append(product);
    //         }
    //     })
    //     .catch(err => console.log(err));
    // });

    // $('#myProducts').ready( () => {
    //     fetch('http://localhost:3000/my-account')
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(res => {
    //         var cash = '<h3>Your Cash amount: ' + res.user.cash + '</h3>';
    //         $('.section-header').append(cash);

    //         if(res.products.length > 0){
    //             for( let i = 0; i < res.products.length; i++){
    //                 var prod = '<div class="col-md-4"><div class="product-item"><div class="product-title"><a href="#">' + res.products[i].name + '</a><div><a href="">' + res.products[i].description + 
    //                 '</a></div></div><div class="product-image"><a href=""><img style="width: 300px; height: 300px;" src="' + res.products[i].image + '" alt="Product Image"></a></div><div class="product-price">' +
    //                 '<h3><span>$</span>' + res.products[i].price + '</h3><a class="btn" href="/remove_item/' + res.products[i]._id + ' "><i class="fa fa-shopping-cart"></i>Remove</a></div></div></div>';
    //                 $('.row').append(prod);
    //             }
    //         }
    //         else {
    //             var empty = '[{<div class="product-image"><a> you ' + "don't have any products yet, please add some.</a></div><pre></pre><pre></pre><pre></pre><pre></pre><pre></pre><pre></pre><pre></pre><pre></pre><pre></pre>}]"
    //             $('.row').append(empty);
    //         }
    //     })
    //     .catch(err => console.log(err));
    // });

    // $('#myHistory').ready( () => {
    //     fetch('http://localhost:3000/history')
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(res => {
    //         if(res.order !== null && order !== undefined){
    //             for(let i = 0; i < res.order.length; i++){
    //                 for(let j = 0; j < res.order[i].cart.items.length; j++){
    //                     var prods = '<div class="col-md-4"><div class="product-item"><div class="product-title"><a>' + res.order[i].cart.items[j].title +
    //                     '</a></div><div class="product-image"><a href=""><img style="width: 300px; height: 300px;" src="' + res.order[i].cart.items[j].image + '" alt="Product Image"></a></div>' + 
    //                     '<div class="product-price"><h3><span>$</span>' + res.order[i].cart.items[j].price + ' $</h3><div><a>' + res.order[i].createdAt + '</a></div></div></div></div>';
    //                     $('.row').append(prods);
    //                 }
    //             }
    //         }
    //     })
    //     .catch(err => console.log(err));
    // });

    $('#loginbtn').click( () => {
        fetch
    });

})(jQuery);

function togglePopup(){
  document.getElementById("popup-1").classList.toggle("active");
}



// document.addEventListener('DOMContentLoaded', ()=>{ 
        
//     document.querySelector('#loginForm').addEventListener('submit', (e) => {
//         //e.preventDefault();
//         const email = document.querySelector('#email').val();
//         const password = document.querySelector('#password').val();

//         fetch('http://localhost:3000/users/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 email: email,
//                 password: password
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(res => {
//             return res.json();
//         })
//         .then(res => {
//             console.log(res);
//             window.location.href = "http://www.w3schools.com";
//         })
//         .catch(err => console.log(err));
//     });
// })
var getCookies = function(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  }