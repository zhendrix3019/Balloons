$(function(){
    // Pick a date setup
    $('#birthday').pickadate({ format: 'mmmm, d' });

    // Ensure all checkboxes are unchecked initially (useful for Firefox)
    $('.form-check-input').prop('checked', false);

    // Event listener for checkbox change to show/hide and animate balloons
    $('.form-check-input').not('#toggleAll').on('change', function () {
        var balloonImg = $('#' + this.id + 'Img');
        balloonImg.css('visibility', 'visible');
        if ($(this).is(':checked')) {
            balloonImg.removeClass().addClass('animate__animated animate__bounceInDown');
        } else {
            balloonImg.addClass('animate__animated animate__bounceOutUp');
        }
    });

    // Randomize attention seeker for the h1 element
    const attentionSeekers = [
        'animate__heartBeat', 'animate__bounce', 'animate__flash', 
        'animate__pulse', 'animate__rubberBand', 'animate__shakeX', 
        'animate__shakeY', 'animate__headShake', 'animate__swing', 
        'animate__tada', 'animate__wobble', 'animate__jello', 
        'animate__flip'
    ];
    const randomAttentionSeeker = attentionSeekers[Math.floor(Math.random() * attentionSeekers.length)];
    $('h1').addClass(randomAttentionSeeker);

    // Audio setup
    var toastSound = new Audio("media/toast(1).wav"); // Ensure the path is correct

    // Check/uncheck all balloons with a single click
    $('#toggleAll').on('change', function() {
        const isChecked = $(this).is(':checked');
        $('.form-check-input').not(this).prop('checked', isChecked).trigger('change');
    });

    // Hover effect for changing h1 color based on balloon color
    $('.form-check-label').hover(
        function() {
            // Check if the hovered element is not the Select/Deselect All label
            if (this.htmlFor !== "toggleAll") {
                const color = $(this).text().includes('Red') ? 'red' :
                              $(this).text().includes('Green') ? 'green' :
                              $(this).text().includes('Blue') ? 'blue' : 'slategray'; // Default to original if no match
                $('h1').css('color', color);
            }
        }, 
        function() {
            if (this.htmlFor !== "toggleAll") {
                $('h1').css('color', 'slategray');
            }
        }
    );

    // Additional hover effect specifically for the Select/Deselect All label
    $('label[for="toggleAll"]').hover(
        function() {
            // Change h1 color to yellow
            $('h1').css('color', 'yellow');
        }, 
        function() {
            // Reset h1 color to original on mouseout
            $('h1').css('color', 'slategray');
        }
    );

    var toastSound = new Audio("media/toast.wav"); // Make sure the path matches the location of your audio file

    // Event listener for the submit button click
    $('#submit').on('click', function() {
        // Check if no balloons are selected
        if ($('.form-check-input:checked').length === 0) {
            $('.toast').toast('show'); // Show the toast notification
            toastSound.play(); // Play the audio file
        }
    });
});
