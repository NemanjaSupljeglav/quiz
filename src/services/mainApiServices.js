import axios from "axios";

const API = "process.env.MAIN_API_URL";

export const getFunc = async url => {
  return axios
    .get(`${API}/${url}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};

export const postFunc = async (url, body) => {
  return axios
    .post(`${API}/${url}`, body)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};

export const deleteFunc = async url => {
  return axios
    .delete(`${API}/${url}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};

export const putFunc = async (url, body) => {
  return axios
    .put(`${API}/${url}`, body)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};
