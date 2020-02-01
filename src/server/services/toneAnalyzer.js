const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const toneAnalyzer = new ToneAnalyzerV3({
  version: "2019-09-06",
  iam_apikey: "TOKEN KEY",
  url: "https://gateway.watsonplatform.net/tone-analyzer/api"
});

module.exports = {
  analyze: textToAnalyze => {
    let requestData = {
      tone_input: {"text": textToAnalyze},
      content_type: "application/json"
    };

    return toneAnalyzer.tone(requestData);
  }
}
