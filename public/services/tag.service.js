angular.module('floorplan').service('tagService', function ($http) {
  const TEMPLATE_COMMENT_ID = 'template';
  this.getTags = id => $http.put('/api/tags', { id });
  this.addTags = tags => $http.post('/api/tags', { tags, comment: TEMPLATE_COMMENT_ID });
  this.addTagsByCommentId = (tags, id) => $http.post('/api/tags', { tags, comment: id });
  this.getTagTemplate = () =>
    $http.get(`/api/tags/${TEMPLATE_COMMENT_ID}`).then((response) => {
      const categories = {};
      if (!response.data.length) return;
      response.data.forEach((tag) => {
        if (!categories[tag.category]) {
          categories[tag.category] = {};
        }
        if (!categories[tag.category][tag.subcategory]) {
          categories[tag.category][tag.subcategory] = [];
        }
        categories[tag.category][tag.subcategory].push({ title: tag.title });
      });
      //console.log(categories);
      return categories;
    });

  this.addTagTemplate = (categories) => {
    let tagSql = [];
    Object.keys(categories).forEach((category) => {
      //console.log(category);
      Object.keys(categories[category]).forEach((subcategory) => {
        const sql = categories[category][subcategory].map(tag => ({
          title: tag.title,
          subcategory,
          category
        }));
        tagSql.push(sql);
      });
    });

    tagSql = tagSql.reduce((acc, cur) => [...acc, ...cur]);
    //console.log(tagSql);
    return $http.post('/api/tags', { tags: tagSql, comment: TEMPLATE_COMMENT_ID });
  };
});
