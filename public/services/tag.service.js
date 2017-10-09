angular.module('floorplan').service('tagService', function ($http) {
  const TEMPLATE_COMMENT_ID = 105;
  // this.getComments = id => $http.get(`/api/location/${id}/comments`);
  this.addTags = tags => $http.post('/api/tags', { tags, comment: TEMPLATE_COMMENT_ID });
  this.getTagTemplate = () => $http.get(`/api/tags/${TEMPLATE_COMMENT_ID}`);

  this.addTagTemplate = (categories) => {
    let tagSql = [];
    Object.keys(categories).forEach((category) => {
      console.log(category);
      Object.keys(categories[category]).forEach((subcategory) => {
        const sql = categories[category][subcategory].map(tag => ({
          title: tag.title,
          subcategory,
          category
        }));
        tagSql.push(sql);
      });
    });

    // categories.forEach((category) => {
    //   category.subcategories.forEach((subcategory) => {
    //     const sql = subcategory.tags.map(tag => ({
    //       title: tag.title,
    //       subcategory: subcategory.title,
    //       category: category.title
    //     }));
    //     tagSql.push(sql);
    //   });
    // });
    tagSql = tagSql.reduce((acc, cur) => [...acc, ...cur]);
    console.log(tagSql);
    return $http.post('/api/tags', { tags: tagSql, comment: TEMPLATE_COMMENT_ID });
  };
});
