module.exports = function(eleventyConfig) {
  
  // Allow data cascading instead of replacing. Mainly for post tags.
  eleventyConfig.setDataDeepMerge(true);
  
// Folders to copy into output.
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");

  // If we use Netlify and has the _redirects file.
  eleventyConfig.addPassthroughCopy("_redirects");
  
  eleventyConfig.addPassthroughCopy({ "_includes": "/" });
  
  eleventyConfig.addFilter("toISOString", function(date) {
    return date.toISOString().split('T')[0];
  });
  
  eleventyConfig.addCollection("lastThreeTasks", function(collection) {
    return collection.getFilteredByTag('task').slice(-3).reverse()
  });
}

