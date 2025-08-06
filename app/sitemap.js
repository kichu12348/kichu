const URL = "https://mahadevan.dev";

export default async function sitemap() {
  // Define static routes
  const routes = ["", "/terminal", "/not-about-you","/os"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly", // Or 'yearly' if content rarely changes
    priority: route === "" ? 1.0 : 0.8, // Homepage has highest priority, other pages slightly lower
  }));

  // If you have dynamic routes (e.g., blog posts), fetch them and add them here
  // Example:
  // const posts = await fetch('...'); // Fetch your dynamic content
  // const dynamicRoutes = posts.map((post) => ({
  //   url: `${URL}/blog/${post.slug}`,
  //   lastModified: post.updatedAt, // Use the actual last modified date
  //   changeFrequency: 'weekly',
  //   priority: 0.6,
  // }));

  // Combine static and dynamic routes (only static in this case)
  return [...routes];
}
