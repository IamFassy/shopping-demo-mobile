import { create } from 'apisauce';
import { baseUrl, httpMethods } from './EndPoints';
/**
 * @class NetworkManager
 */

/**
 * Base api
 * @memberof NetworkManager
 */
const baseApi = create({
  baseURL: baseUrl,
  timeout: 10000,
});
/**
 * Network callbacks
 *
 * @description  API requesting function
 * @memberof NetworkManager
 * @return  returns API Response
 */
const NetworkManager = {
  request: (url, httpMethod, parameters) => {
    baseApi.setHeaders({
      'Content-Type': 'application/json',
    });
    switch (httpMethod) {
      /// GET
      case httpMethods.get:
        return baseApi
          .get(url)
          .then(response => {
            return response;
          })
          .catch(error => {
            return error;
          });
      /// POST
      case httpMethods.post:
        return baseApi
          .post(url, parameters)
          .then(response => {
            return response;
          })
          .catch(error => {
            return error;
          });

      /// PUT
      case httpMethods.put:
        return baseApi
          .put(url, parameters)
          .then(response => {
            return response;
          })
          .catch(error => {
            return error;
          });
      /// DELETE
      case httpMethods.delete:
        return baseApi
          .delete(url, parameters)
          .then(response => {
            return response;
          })
          .catch(error => {
            return error;
          });
      default:
        return;
    }
  },
};

export default NetworkManager;
