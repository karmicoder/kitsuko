import Kitsu from 'kitsu';
console.log('kitsu base is ' + process.env.API_BASE_URL);

export default new Kitsu({
  baseURL: process.env.API_BASE_URL
});
