import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError,
  fetchLineChartSuccess,
  fetchBarChartSuccess,
  fetchDotChartSuccess,
  fetchTaskListSuccess,
  fetchCompanyDetails
} from "./actions";

// import { FETCH_PRODUCTS_SUCCESS, FETCH_LINECHART_SUCCESS } from "./actions";

const API = "https://da1236f1-315e-4d0f-8ff3-b8ffada3c44c.mock.pstmn.io/";
// Implement function to get the list of data from teh API
/**
 * Function Name: fetchProducts()
 * @param {url} url
 * @param {type} type
 * To get the url and the type
 */
function fetchProducts(url, type) {
  // eslint-disable-next-line no-console
  console.log("called fetch products", API + url);
  return dispatch => {
    dispatch(fetchProductsPending());
    fetch(API + url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        const items = data;
        // eslint-disable-next-line no-console
        console.log("fetchhhhh", items);
        if (items.error) {
          throw items.error;
        }
        // console.log("response", items);
        switch (type) {
          case "FETCH_PRODUCTS_SUCCESS":
            dispatch(fetchProductsSuccess(items));
            return items;
          case "FETCH_LINECHART_SUCCESS":
            // eslint-disable-next-line no-console
            console.log("line", items);
            dispatch(fetchLineChartSuccess(items));
            return items;
          case "FETCH_BARCHART_SUCCESS":
            // eslint-disable-next-line no-console
            console.log("bar", items);
            dispatch(fetchBarChartSuccess(items));
            return items;
          case "FETCH_DOTCHART_SUCCESS":
            dispatch(fetchDotChartSuccess(items));
            return items;
          case "FETCH_TASKLIST_SUCCESS":
            // eslint-disable-next-line no-console
            console.log("task", items);
            dispatch(fetchTaskListSuccess(items));
            return items;
          case "FETCH_COMPANY_DETAILS":
            dispatch(fetchCompanyDetails(items));
            return items;
          default:
            alert("nothiung");
        }
      })
      .catch(error => {
        dispatch(fetchProductsError(error));
      });
  };
}

export default fetchProducts;
