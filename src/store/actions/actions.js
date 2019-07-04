export const FETCH_PRODUCTS_PENDING = "FETCH_PRODUCTS_PENDING";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_LINECHART_SUCCESS = "FETCH_LINECHART_SUCCESS";
export const FETCH_BARCHART_SUCCESS = "FETCH_BARCHART_SUCCESS";
export const FETCH_DOTCHART_SUCCESS = "FETCH_DOTCHART_SUCCESS";
export const FETCH_TASKLIST_SUCCESS = "FETCH_TASKLIST_SUCCESS";
export const FETCH_COMPANY_DETAILS = "FETCH_COMPANY_DETAILS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

// export the function with the return type is pending
export function fetchProductsPending() {
  return {
    type: FETCH_PRODUCTS_PENDING
  };
}

// export the function with the return type is success
export function fetchProductsSuccess(products) {
  // console.log("fetch action", products);
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products: products
  };
}

// export the function with the return type is success
export function fetchLineChartSuccess(lineChartsData) {
  // console.log("fetch action", products);
  return {
    type: FETCH_LINECHART_SUCCESS,
    lineChartsData: lineChartsData
  };
}

// export the function with the return type is success
export function fetchBarChartSuccess(barChartData) {
  // console.log("fetch action", products);
  return {
    type: FETCH_BARCHART_SUCCESS,
    barChartData: barChartData
  };
}

// export the function with the return type is success
export function fetchDotChartSuccess(dotChartData) {
  // console.log("fetch action", products);
  return {
    type: FETCH_DOTCHART_SUCCESS,
    dotChartData: dotChartData
  };
}

// export the function with the return type is success
export function fetchTaskListSuccess(taskList) {
  // console.log("fetch action", products);
  return {
    type: FETCH_TASKLIST_SUCCESS,
    taskList: taskList
  };
}

// export the function with the return type is success
export function fetchCompanyDetails(companyDetails) {
  // console.log("fetch action", products);
  return {
    type: FETCH_COMPANY_DETAILS,
    companyDetails: companyDetails
  };
}

// export the function with the return type is error
export function fetchProductsError(error) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error: error
  };
}
