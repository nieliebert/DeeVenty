const fs = require('fs');
const path = require('path');
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Watch for CSS changes
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");
  
  // Custom filter to get certificate images
  eleventyConfig.addFilter("getCertificateImages", function() {
    const certificatesDir = path.join(__dirname, "src/assets/images/certificates");
    if (!fs.existsSync(certificatesDir)) return [];

    return fs.readdirSync(certificatesDir)
      .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map(file => {
        const filePath = path.join(certificatesDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          path: `/assets/images/certificates/${file}`,
          size: stats.size,
          date: stats.mtime
        };
      })
      .sort((a, b) => b.date - a.date);
  });

  // Add limit filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Add date filter
  eleventyConfig.addFilter("date", function(date) {
    return DateTime.fromJSDate(date).toFormat("dd MMM yyyy");
  });

  // Create posts collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });
  
  // Create projects collection
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md");
  });

  // Create tags collection
  eleventyConfig.addCollection("tagList", function(collection) {
    const tagsSet = new Set();
    collection.getAll().forEach(item => {
      if (!item.data.tags) return;
      item.data.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  });

  // Pass-through files
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");

  // Base Config
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}; 