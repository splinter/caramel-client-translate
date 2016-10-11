$(function() {
  
  function pageLanguage() {
    return document.documentElement.lang || "en";
  }
  
  function languageURL(url,langCode) {
    return caramel.url(url + '/' + langCode + '.json');
  }

  function fetchLanguageDefinition(url, langCode) {
    url = languageURL(url,langCode);
    $.getJSON(url).done(function(data) {
      store(langCode, data);
    });
  }

  function gettext(key) {
    key = key || '';
    var langCode = pageLanguage();
    var langDef = store(langCode);
    if (!langDef) {
      return key;
    }
    return langDef[key] || key;
  }

  function InMemoryStore() {
    this.map = {};
  }
  InMemoryStore.prototype.setItem = function(key, value) {
    this.map[key] = value;
  }
  InMemoryStore.prototype.getItem = function(key) {
    return this.map[key];
  }

  function store() {
    if (!window.hasOwnProperty('inMemoryStore')) {
      window.inMemoryStore = new InMemoryStore();
    }
    var inMemoryStore = window.inMemoryStore;
    var impl = window.hasOwnProperty('sessionStorage') ? window.sessionStorage : inMemoryStore;
    if (arguments.length === 1) {
      return JSON.parse(impl.getItem(arguments[0]) || '{}' );
    } else if (arguments.length === 2) {
      impl.setItem(arguments[0], JSON.stringify(arguments[1]));
      return;
    }
    throw 'Invalid number of arguments, either provided a key to retrieve a value or a key-value pair to store it in memory';
  }

  function init() {
    var url = "/i18n";//"https://api.myjson.com/bins/1h8bq";
    var langCode = pageLanguage();
    //Do nothing if the language code is en as
    //the text is already in English
    if(langCode === 'en') {
      return;
    }
    fetchLanguageDefinition(url, langCode);
  }
  window.gettext = gettext;
  init();
});
