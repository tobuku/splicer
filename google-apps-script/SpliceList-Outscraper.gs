/**
 * SpliceList.com
 * Outscraper Automation for Cable Splicing Contractor Listings
 *
 * Target sheet columns (17):
 * id, business_name, description, category, services, phone, email,
 * website, address, city, state, zip, latitude, longitude,
 * rating, reviews_count, created_at
 *
 * Usage:
 * 1. Open Google Sheets (create a new blank sheet)
 * 2. Extensions > Apps Script
 * 3. Paste this entire file, replacing any existing code
 * 4. Save (Ctrl+S)
 * 5. Run main() — approve permissions on first run
 * 6. If runtime stops (6 min limit), run main() again — it resumes automatically
 * 7. When complete, run exportToJson() to get the import file
 *
 * Notes:
 * - Dedupe uses name OR phone OR address
 * - 2 second delay between API calls
 * - Category auto-assigned from business name + Google category keywords
 * - JSON export matches /api/import/listings endpoint format
 */

var CONFIG = {
  OUTSCRAPER_API_KEY: "MjVjMTU4YmYxNzdlNGZlNGEzZjI4N2U0NzA4Y2Y4OTd8MjNlYzYwOTdmZg",
  SHEET_NAME: "splicelist-listings",
  RESULTS_PER_QUERY: 20,
  DELAY_MS: 2000,
};

// Search queries — 3 query types x 50 states = 150 total searches
var SEARCH_QUERIES = [];

var STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

// Build query list: 3 search types per state
(function buildQueries() {
  for (var i = 0; i < STATES.length; i++) {
    var s = STATES[i];
    SEARCH_QUERIES.push({ query: "fiber optic splicing contractors, " + s,   hintCategory: "FIBER" });
    SEARCH_QUERIES.push({ query: "cable splicing contractors, " + s,         hintCategory: "TELECOM" });
    SEARCH_QUERIES.push({ query: "copper cable splicing contractors, " + s,  hintCategory: "COPPER" });
  }
})();

var STATE_ABBREVS = {
  "alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA",
  "colorado":"CO","connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA",
  "hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA",
  "kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD",
  "massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS",
  "missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV",
  "new hampshire":"NH","new jersey":"NJ","new mexico":"NM","new york":"NY",
  "north carolina":"NC","north dakota":"ND","ohio":"OH","oklahoma":"OK",
  "oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC",
  "south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT",
  "virginia":"VA","washington":"WA","west virginia":"WV","wisconsin":"WI",
  "wyoming":"WY","district of columbia":"DC"
};

var TEMPLATE_HEADERS = [
  "id","business_name","description","category","services","phone","email",
  "website","address","city","state","zip","latitude","longitude",
  "rating","reviews_count","created_at"
];

// ─── MAIN ────────────────────────────────────────────────────────────────────

function main() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME);

  ensureHeader(sheet);

  var props = PropertiesService.getScriptProperties();
  var startIndex = parseInt(props.getProperty("lastCompletedQuery") || "-1", 10) + 1;

  if (startIndex >= SEARCH_QUERIES.length) {
    Logger.log("All " + SEARCH_QUERIES.length + " queries complete. Run resetProgress() to restart.");
    return;
  }

  Logger.log("Resuming from query " + (startIndex + 1) + " of " + SEARCH_QUERIES.length);

  var existing = getExistingRows(sheet);
  var added = 0;

  for (var i = startIndex; i < SEARCH_QUERIES.length; i++) {
    var item    = SEARCH_QUERIES[i];
    var query   = item.query;
    var hint    = item.hintCategory;

    Logger.log("Query " + (i + 1) + "/" + SEARCH_QUERIES.length + ": " + query);

    var places = fetchOutscraper(query);
    if (!places || places.length === 0) {
      Logger.log("No results: " + query);
      props.setProperty("lastCompletedQuery", String(i));
      continue;
    }

    for (var j = 0; j < places.length; j++) {
      var row = mapToRow(places[j], hint);
      if (!row) continue;

      var name    = row[1];
      var phone   = row[5];
      var address = row[7];

      if (isDuplicate(existing, name, phone, address)) continue;

      sheet.appendRow(row);
      existing.push({
        name:    normKey(name),
        phone:   normPhone(phone),
        address: normKey(address)
      });
      added++;
    }

    props.setProperty("lastCompletedQuery", String(i));

    if (i < SEARCH_QUERIES.length - 1) Utilities.sleep(CONFIG.DELAY_MS);
  }

  Logger.log("Session complete. Added " + added + " rows total.");
}

function resetProgress() {
  PropertiesService.getScriptProperties().deleteProperty("lastCompletedQuery");
  Logger.log("Progress reset. Run main() to start from the beginning.");
}

// ─── OUTSCRAPER API ───────────────────────────────────────────────────────────

function fetchOutscraper(query) {
  var url = "https://api.app.outscraper.com/maps/search-v3"
    + "?query=" + encodeURIComponent(query)
    + "&limit=" + CONFIG.RESULTS_PER_QUERY
    + "&async=false";

  var options = {
    method: "get",
    headers: { "X-API-KEY": CONFIG.OUTSCRAPER_API_KEY },
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var code = response.getResponseCode();

  if (code !== 200) {
    Logger.log("API error " + code + ": " + response.getContentText().substring(0, 300));
    return [];
  }

  var json = JSON.parse(response.getContentText());
  if (json.data && json.data.length > 0 && Array.isArray(json.data[0])) return json.data[0];
  return [];
}

// ─── ROW MAPPING ─────────────────────────────────────────────────────────────

function mapToRow(place, hintCategory) {
  if (!place || !place.name) return null;

  var name        = safeText(place.name).trim();
  var phone       = normPhone(safeText(place.phone));
  var website     = safeText(place.site || place.website);
  var email       = extractEmail(place);
  var address     = safeText(place.street || place.address || "");
  var city        = safeText(place.city);
  var state       = normalizeState(place.us_state || place.state || "");
  var zip         = safeText(place.postal_code || place.zip || "");
  var lat         = place.latitude  || place.lat || "";
  var lng         = place.longitude || place.lng || "";
  var rating      = place.rating || place.stars || "";
  var reviewCount = place.reviews || place.reviews_count || 0;
  var description = safeText(place.description || place.about || "");

  // Category mapping
  var category = mapCategory(place, hintCategory);

  // Services — derived from category + Google categories
  var services = deriveServices(place, category);

  return [
    Utilities.getUuid(),
    name,
    description,
    category,
    services.join(", "),
    phone,
    email,
    website,
    address,
    city,
    state,
    zip,
    lat,
    lng,
    rating,
    reviewCount,
    new Date().toISOString()
  ];
}

// ─── CATEGORY MAPPING ─────────────────────────────────────────────────────────

function mapCategory(place, hint) {
  var text = [
    safeText(place.name),
    safeText(place.category),
    safeText(place.description),
  ].join(" ").toLowerCase();

  var cats = place.categories;
  if (Array.isArray(cats)) text += " " + cats.join(" ").toLowerCase();

  // Fiber signals
  if (
    text.indexOf("fiber") !== -1 ||
    text.indexOf("fibre") !== -1 ||
    text.indexOf("optical") !== -1 ||
    text.indexOf("fusion") !== -1 ||
    text.indexOf("otdr") !== -1 ||
    text.indexOf("fttx") !== -1 ||
    text.indexOf("ftth") !== -1
  ) return "FIBER";

  // Copper signals
  if (
    text.indexOf("copper") !== -1 ||
    text.indexOf("telephone") !== -1 ||
    text.indexOf("low voltage") !== -1 ||
    text.indexOf("buried cable") !== -1 ||
    text.indexOf("pedestal") !== -1 ||
    text.indexOf("dsl") !== -1
  ) return "COPPER";

  // Telecom signals
  if (
    text.indexOf("telecom") !== -1 ||
    text.indexOf("telecommunications") !== -1 ||
    text.indexOf("outside plant") !== -1 ||
    text.indexOf("osp") !== -1 ||
    text.indexOf("network") !== -1 ||
    text.indexOf("cable splice") !== -1 ||
    text.indexOf("splicing") !== -1
  ) return "TELECOM";

  // Fall back to query hint
  return hint || "TELECOM";
}

function deriveServices(place, category) {
  var base = {
    FIBER:   ["Fiber Optic Splicing", "Fusion Splicing", "OTDR Testing"],
    TELECOM: ["Cable Splicing", "OSP Splicing", "Telecom Infrastructure"],
    COPPER:  ["Copper Cable Splicing", "Buried Cable Repair", "Telephone Line Splicing"]
  };

  var services = base[category] ? base[category].slice() : ["Cable Splicing"];

  // Add emergency if indicated
  var text = [safeText(place.name), safeText(place.description)].join(" ").toLowerCase();
  if (text.indexOf("emergency") !== -1 || text.indexOf("24/7") !== -1 || text.indexOf("24 hour") !== -1) {
    services.push("Emergency Service");
  }

  return services;
}

// ─── EXPORT TO JSON ───────────────────────────────────────────────────────────
// Run this after main() completes to generate the import file for /api/import/listings

function exportToJson() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) { Logger.log("Sheet not found."); return; }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) { Logger.log("No data rows."); return; }

  var data    = sheet.getRange(2, 1, lastRow - 1, TEMPLATE_HEADERS.length).getValues();
  var records = [];

  for (var i = 0; i < data.length; i++) {
    var r = data[i];
    var businessName = String(r[1] || "").trim();
    var city         = String(r[10] || "").trim();
    var state        = String(r[11] || "").trim();
    var category     = String(r[3] || "").trim();

    // Skip rows missing required fields
    if (!businessName || !city || !state || !category) continue;

    // category must be valid
    if (["FIBER","TELECOM","COPPER"].indexOf(category) === -1) continue;

    var servicesRaw = String(r[4] || "");
    var services    = servicesRaw
      ? servicesRaw.split(",").map(function(s){ return s.trim(); }).filter(Boolean)
      : [];

    var lat = parseFloat(r[12]);
    var lng = parseFloat(r[13]);

    records.push({
      business_name: businessName,
      description:   String(r[2] || "").trim() || null,
      category:      [category],
      services:      services,
      phone:         String(r[5] || "").trim() || null,
      email:         String(r[6] || "").trim() || null,
      website:       String(r[7] || "").trim() || null,
      address:       String(r[8] || "").trim() || null,
      city:          city,
      state:         state,
      zip:           String(r[11] || "").trim() || null,
      latitude:      isNaN(lat) ? null : lat,
      longitude:     isNaN(lng) ? null : lng,
      rating:        parseFloat(r[14]) || null,
      reviews_count: parseInt(r[15]) || 0
    });
  }

  var json = JSON.stringify(records, null, 2);
  var fileName = "splicelist-import-" + Utilities.formatDate(new Date(), "America/New_York", "yyyyMMdd-HHmm") + ".json";
  var file = DriveApp.createFile(fileName, json, MimeType.PLAIN_TEXT);

  Logger.log("Export complete: " + records.length + " records");
  Logger.log("Download: " + file.getUrl());
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function ensureHeader(sheet) {
  var row1 = sheet.getRange(1, 1, 1, TEMPLATE_HEADERS.length).getValues()[0];
  var match = true;
  for (var i = 0; i < TEMPLATE_HEADERS.length; i++) {
    if (String(row1[i] || "").trim() !== TEMPLATE_HEADERS[i]) { match = false; break; }
  }
  if (!match) sheet.getRange(1, 1, 1, TEMPLATE_HEADERS.length).setValues([TEMPLATE_HEADERS]);
}

function getExistingRows(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var data = sheet.getRange(2, 1, lastRow - 1, TEMPLATE_HEADERS.length).getValues();
  var rows = [];
  for (var i = 0; i < data.length; i++) {
    rows.push({
      name:    normKey(data[i][1]),
      phone:   normPhone(data[i][5]),
      address: normKey(data[i][8])
    });
  }
  return rows;
}

function isDuplicate(existing, name, phone, address) {
  var n = normKey(name);
  var p = normPhone(phone);
  var a = normKey(address);
  if (!n && !p && !a) return false;
  for (var i = 0; i < existing.length; i++) {
    var r = existing[i];
    if (n && r.name    && n === r.name)    return true;
    if (p && r.phone   && p === r.phone)   return true;
    if (a && r.address && a === r.address) return true;
  }
  return false;
}

function extractEmail(place) {
  if (!place) return "";
  if (place.email) return safeText(place.email);
  if (place.emails && Array.isArray(place.emails) && place.emails.length > 0) return safeText(place.emails[0]);
  return "";
}

function normalizeState(raw) {
  if (!raw) return "";
  var t = String(raw).trim();
  if (/^[A-Za-z]{2}$/.test(t)) return t.toUpperCase();
  var key = t.toLowerCase();
  if (STATE_ABBREVS[key]) return STATE_ABBREVS[key];
  return t.toUpperCase().substring(0, 2);
}

function safeText(val) {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  try { return JSON.stringify(val); } catch(e) { return ""; }
}

function normKey(s) {
  return String(s || "").trim().toLowerCase();
}

function normPhone(phone) {
  return String(phone || "").trim().replace(/^\+1/, "").replace(/\D/g, "");
}
