
/*


https://hueniverse.com/oauth/guide/workflow/

https://discussions.udacity.com/t/how-to-make-ajax-request-to-yelp-api/13699/3


https://discussions.udacity.com/t/yelp-api-oauth-issue/40606/9





*/



///v1

function nonce_generate() {
  return (Math.floor(Math.random() * 1e12).toString());
}

var yelp_url = 'http://api.yelp.com/v2/business' +'epcot-lake-buena-vista-2';

    var parameters = {
      oauth_consumer_key: "qRkzbb3AEjVSjJCp62JqOw",
      oauth_token: "N3A6NtzOh_MozWQxrCVEDJqOT9rE3bjh",
      oauth_nonce: nonce_generate(),
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version : '1.0',
      callback: 'cb'              // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    };

    var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, "X4l2OtQhUwq7v9uCrU2CkKOfxsk", "v9xCA5ZAlkqXtnB2N4TQ4oNpTj0");
    parameters.oauth_signature = encodedSignature;

    var settings = {
      url: yelp_url,
      data: parameters,
      cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
      dataType: 'jsonp',
      success: function(results) {
        // Do stuff with results
        console.log(results);
      },
      fail: function() {
        // Do stuff on fail
        console.log("fail");
      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);


///v2



var auth = {
    consumerKey : "qRkzbb3AEjVSjJCp62JqOw",
    consumerSecret : "X4l2OtQhUwq7v9uCrU2CkKOfxsk",
    accessToken : "N3A6NtzOh_MozWQxrCVEDJqOT9rE3bjh",
    accessTokenSecret : "v9xCA5ZAlkqXtnB2N4TQ4oNpTj0",
    serviceProvider : {
        signatureMethod : "HMAC-SHA1"
    }
};

var terms = 'epcot-lake-buena-vista-2';
//var near = 'San+Francisco';

var accessor = {
    consumerSecret : auth.consumerSecret,
    tokenSecret : auth.accessTokenSecret
};
parameters = [];
//parameters.push(['term', terms]);
//parameters.push(['location', near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
//parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
//parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
    'action' : 'http://api.yelp.com/v2/business'+'epcot-lake-buena-vista-2',
    'method' : 'GET',
    'parameters' : parameters
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
console.log(parameterMap);

$.ajax({
    'url' : message.action,
    'data' : parameterMap,
    'dataType' : 'jsonp',
    'jsonpCallback' : 'cb',
    'success' : function(data, textStats, XMLHttpRequest) {
        console.log(data);
            if(data) {
                var hits = data.businesses,
                    item_str = '<li>%name%</li>';
                hits.forEach(function(result) { $('#results').append(item_str.replace('%name%', result.name))
                });
            }
    },
    'error' : function(error) {                                       $('#error').css('opacity', '1');
    }
});
