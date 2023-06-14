$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function () {
    const remainingCharsText = $(this).closest('form').find('.counter')
    const remaining = 140 - $(this).val().length;
    
    remainingCharsText.text(remaining);

    if (remaining < 0) {
      remainingCharsText.addClass('counter-red');
    } else {
      remainingCharsText.removeClass('counter-red');
    }
  });
});
