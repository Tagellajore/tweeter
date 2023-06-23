/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const $form = $('#new-tweet-item');

  $form.on('submit', (event) => {
  event.preventDefault();
  $(".error").addClass("hideerror");
  console.log(event);

  let val = $('#tweet-text').val();
  console.log(val);
  
  if(val.length === 0)  {
    $(".error").removeClass("hideerror");
    $("#errormessage").html("You need to type something first");
    console.log("val.length === 0");
    return
  } else if (val === null) {
    $(".error").removeClass("hideerror");
    $("#errormessage").html("text area can not be null");
    return
  } else if (val.length > 140) {
    $(".error").removeClass("hideerror");
    $("#errormessage").html("Characters length needs to be less than 140");
    return
  }

  
  console.log('form has been submitted')
  
  const urlEncodedString = $form.serialize();
  console.log(urlEncodedString);
  
  
  $.ajax({
    url: "http://localhost:8080/tweets",
    method: "POST",
    data: urlEncodedString
  }).then(() => {
    console.log("tweet sent to server");
    loadtweets();
  })
  });

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    const time = timeago.format(tweetData.created_at);
  const $tweet = $(
    `<article>
      <header class="tweet">
        <div class="img-tweet">
          <img class="user-icon" src="${tweetData.user['avatars']}">
        <p class="user-name">${tweetData.user['name']}</p>
        </div>
        <div>
          ${tweetData.user['handle']}
        </div>
      </header>
      <p class="underline">
        ${escape(tweetData.content['text'])}
      </p>
      <footer class="tweet">
        <time>
          ${time}
        </time>
        <div class="icons">
          <i class="fa-solid fa-flag icon" ></i> <i class="fa-solid fa-retweet icon"></i></i> <i class="fa-solid fa-heart icon"></i>
        </div>
      </footer>
    </article>`
  );
  return $tweet
  };

  const renderTweets = function(tweets) {
    for (const tweetObj of tweets) {
      const $tweet = createTweetElement(tweetObj);
      $('#tweets-container').prepend($tweet);
    }
  }

  const loadtweets = function() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET'
    }).then((tweets) => {
      renderTweets(tweets)
    })
  };

  loadtweets();

});






