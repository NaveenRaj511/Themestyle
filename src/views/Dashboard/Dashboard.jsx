import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchProductsAction from "../../store/actions/fetchProducts";
import Footer from "../../components/Footer/Footer";
import {
  getProductsError,
  getProducts,
  getProductsPending,
  getchartProducts,
  getbarChartProduct,
  getdotChartProduct,
  gettaskList
  // getCompanyDetails
} from "../../store/reducers/reducers";

import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_LINECHART_SUCCESS,
  FETCH_BARCHART_SUCCESS,
  FETCH_DOTCHART_SUCCESS,
  FETCH_TASKLIST_SUCCESS
  // FETCH_COMPANY_DETAILS
} from "../../store/actions/actions";
// import { Dailysaleschart } from "../../variables/dailySalesChart";

class Dashboard extends React.Component {
  // state = {
  //   value: 0,
  //   products: []
  // };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { fetchProducts } = this.props;
    // console.log("called mount", this.props);
    fetchProducts("linechart/data", FETCH_LINECHART_SUCCESS);
    fetchProducts("dashboard/data", FETCH_PRODUCTS_SUCCESS);
    fetchProducts("barchart/data", FETCH_BARCHART_SUCCESS);
    fetchProducts("taskchart/data", FETCH_DOTCHART_SUCCESS);
    fetchProducts("tasklists/list", FETCH_TASKLIST_SUCCESS);
    // fetchProducts("companydetails", FETCH_COMPANY_DETAILS);
  }

  shouldComponentRender() {
    if (this.pending === false) return false;
    // more tests
    return true;
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const {
      classes,
      products,
      lineChartsData,
      barChartData,
      dotChartData,
      taskList
      // companyDetails
    } = this.props;
    // eslint-disable-next-line react/prop-types
    // const { products } = this.props;
    // eslint-disable-next-line no-console
    console.log("product in dashboard", products);
    // eslint-disable-next-line no-console
    console.log("barChartData in dashboard", barChartData);
    if (!this.shouldComponentRender()) return <p>Error</p>;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Used Space</p>
                <h3 className={classes.cardTitle}>
                  {products.occupiedSize}/{products.totalSize}
                  <small>{products.sizeCategory}</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Revenue</p>
                <h3 className={classes.cardTitle}>${products.revenue}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>{products.fixedIssue}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+{products.followers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                {/* {lineChartsData.labels} */}
                {/* <Dailysaleschart data={products} /> */}
                <ChartistGraph
                  className="ct-chart"
                  data={lineChartsData}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={barChartData}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={dotChartData}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={taskList.bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={taskList.website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={taskList.server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {/* <Footer value={companyDetails} /> */}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  lineChartsData: PropTypes.object.isRequired,
  barChartData: PropTypes.object.isRequired,
  dotChartData: PropTypes.object.isRequired,
  taskList: PropTypes.object.isRequired
  // companyDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  error: getProductsError(state),
  products: getProducts(state),
  pending: getProductsPending(state),
  lineChartsData: getchartProducts(state),
  barChartData: getbarChartProduct(state),
  dotChartData: getdotChartProduct(state),
  taskList: gettaskList(state)
  // companyDetails: getCompanyDetails(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts: fetchProductsAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(dashboardStyle)(Dashboard));

// export default withStyles(dashboardStyle)(Dashboard);
