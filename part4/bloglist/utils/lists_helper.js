// eslint-disable-next-line import/no-extraneous-dependencies
const lodash = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, current) => sum + current.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return {};
  }

  return blogs.reduce((best, current) => (current.likes > best.likes ? current : best));
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return {};
  }
  const authors = lodash.countBy(blogs, 'author');

  const biggestAuthorName = Object.keys(authors)
    .reduce((best, current) => (authors[current] > authors[best] ? current : best));

  return { author: biggestAuthorName, blogs: authors[biggestAuthorName] };
};

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return {};
  }
  const authors = lodash.groupBy(blogs, 'author');
  const sumAuthors = lodash.map(authors, (author, key) => ({ author: key, likes: lodash.sumBy(author, 'likes') }));
  return sumAuthors.reduce((best, current) => (current.likes > best.likes ? current : best));
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
