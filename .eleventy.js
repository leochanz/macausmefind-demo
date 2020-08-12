module.exports = function(eleventyConfig) {
  
  // If we use Netlify and has the _redirects file.
  eleventyConfig.addPassthroughCopy("_redirects");
  
  eleventyConfig.addCollection("tagList", function(collection) {
  let tagSet = new Set();
  collection.getAll().forEach(function(item) {
    if( "tags" in item.data ) {
      let tags = item.data.tags;

      tags = tags.filter(function(item) {
        switch(item) {
          // this list should match the `filter` list in tags.njk
          case "all":
          case "nav":
          case "post":
          case "posts":
            return false;
        }

        return true;
      });

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });

  // returning an array in addCollection works in Eleventy 0.5.3
  return [...tagSet];
});
  
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
  
  eleventyConfig.addShortcode("lastPostTitle", function(collection) {
    return collection[collection.length-1].data.title
  });

}

