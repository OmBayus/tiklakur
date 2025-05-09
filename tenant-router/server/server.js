const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load user templates
let userTemplates;
try {
  userTemplates = JSON.parse(fs.readFileSync("users.json", "utf-8"));
} catch (error) {
  console.error("Error loading users.json:", error);
  process.exit(1);
}

// Middleware to handle subdomain routing
app.use((req, res, next) => {
  try {
    const host = req.headers.host;
    const subdomain = host.split(".")[0];

    const selectedTemplate = userTemplates[subdomain];
    if (!selectedTemplate) {
      return res.status(404).send("Template not found for this subdomain.");
    }

    // Add template info to request object
    req.templatePath = path.join(__dirname, "templates", selectedTemplate);
    next();
  } catch (error) {
    next(error);
  }
});

// Serve static files for each template
app.use((req, res, next) => {
  if (!req.templatePath) {
    return next();
  }

  const filePath = path.join(req.templatePath, req.path);
  
  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }

  // For React routing, serve index.html
  res.sendFile(path.join(req.templatePath, "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
