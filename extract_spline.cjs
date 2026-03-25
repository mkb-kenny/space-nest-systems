const fs = require('fs');

async function extract() {
  console.log("Fetching Spline HTML...");
  const res = await fetch('https://my.spline.design/nexbotrobotcharacterconcept-n2a7ttqQs9FJXJBCtzWUEJJl/');
  const text = await res.text();
  
  console.log("Parsing start function array...");
  // Look for app.start([ ... ])
  const regex = /app\.start\(\[([\d, ]+)\]\)/;
  const match = text.match(regex);
  
  if (match && match[1]) {
    console.log("Found embedded binary data. Length of string: " + match[1].length);
    const bytes = match[1].split(',').map(n => Number(n.trim()));
    const buffer = Buffer.from(bytes);
    fs.writeFileSync('public/nexbot.splinecode', buffer);
    console.log("Successfully wrote public/nexbot.splinecode (" + buffer.length + " bytes)");
  } else {
    console.log("Regex did not match app.start([data]). Searching for other signatures...");
    // maybe it's app.load("...")?
    const urlMatch = text.match(/app\.load\(['"](.*?)['"]\)/);
    if (urlMatch) {
       console.log("Found URL instead: " + urlMatch[1]);
    } else {
       // just dump to temp to inspect
       fs.writeFileSync('spline_viewer.html', text);
       console.log("Dumped to spline_viewer.html for inspection. Array pattern not found.");
    }
  }
}

extract().catch(console.error);
