'use strict';

var site = 'newegg.com';
var ttd = 'TerribleTerribleDamage=1';

function detectNewegg(url) {
  var is_newegg_jss_page = -1;
  var lower_url = url.toLowerCase();
  if (lower_url.includes(site)) is_newegg_jss_page = 0;
  var count = (lower_url.match(/terribleterribledamage/g) || []).length;
  is_newegg_jss_page += count;
  return is_newegg_jss_page;
}