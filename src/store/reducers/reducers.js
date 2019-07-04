import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_LINECHART_SUCCESS,
  FETCH_TASKLIST_SUCCESS,
  FETCH_BARCHART_SUCCESS,
  FETCH_DOTCHART_SUCCESS,
  FETCH_COMPANY_DETAILS
} from "../actions/actions";

// initailze the state
const initialState = {
  pending: false,
  products: {},
  error: null,
  lineChartsData: {},
  barChartData: {},
  dotChartData: {},
  taskList: {},
  companyDetails: {}
};

/**
 * FunctionName: productsReducer()
 * @param {state} state
 * @param {action} action
 * created reducer with the state and the action.
 */
export function productsReducer(state = initialState, action) {
  // console.log("type", action.type);
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      // console.log("pending", action.type);
      return {
        ...state,
        pending: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      // console.log("success", action.type);
      // eslint-disable-next-line no-console
      console.log("product reducer", JSON.stringify(action.products));
      return {
        ...state,
        pending: false,
        products: action.products
        // chartsData: action.products
      };
    case FETCH_LINECHART_SUCCESS:
      return {
        ...state,
        pending: false,
        lineChartsData: action.lineChartsData
      };
    case FETCH_BARCHART_SUCCESS:
      return {
        ...state,
        pending: false,
        barChartData: action.barChartData
      };
    case FETCH_DOTCHART_SUCCESS:
      return {
        ...state,
        pending: false,
        dotChartData: action.dotChartData
      };
    case FETCH_TASKLIST_SUCCESS:
      return {
        ...state,
        pending: false,
        taskList: action.taskList
      };
    case FETCH_COMPANY_DETAILS:
      return {
        ...state,
        pending: false,
        companyDetails: action.companyDetails
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const getProducts = state => state.products;
export const getchartProducts = state => state.lineChartsData;
export const getbarChartProduct = state => state.barChartData;
export const getdotChartProduct = state => state.dotChartData;
export const gettaskList = state => state.taskList;
export const getCompanyDetails = state => state.companyDetails;
export const getProductsPending = state => state.pending;
export const getProductsError = state => state.error;
