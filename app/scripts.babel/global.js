'use strict';

var site = 'newegg.com';
var ttd = 'TerribleTerribleDamage=1';

function detectNewegg(url) {
  var is_newegg_jss_page = false;
  var lower_url = url.toLowerCase();
  var count = (lower_url.match(/terribleterribledamage/g) || []).length;
  if (lower_url.includes(site) && count <= 1) {
    is_newegg_jss_page = true;
  }
  return is_newegg_jss_page;
}