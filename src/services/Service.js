import http from "./http";

const getAllArticles = (params) => {
  return http.get(`/api/v1/articles`, { params: params});
};
const getDetailArticle = (id) => {
  return http.get(`/api/v1/articles/${id}`)
            .catch(function (error) {
            });
};
const getAllCategories = () => {
    return http.get("/api/v1/categories");
  };
const Service = {
    getAllArticles,
    getDetailArticle,
    getAllCategories
};

export default Service;
