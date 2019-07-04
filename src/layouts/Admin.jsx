import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/Small.png";

// Edited by naveen
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchProductsAction from "../store/actions/fetchProducts";
import {
  getProductsError,
  getProductsPending,
  getCompanyDetails
} from "../store/reducers/reducers";

import { FETCH_COMPANY_DETAILS } from "../store/actions/actions";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

class Dashboard extends React.Component {
  state = {
    image: image,
    color: "blue",
    hasImage: true,
    fixedClasses: "dropdown show",
    mobileOpen: false
  };
  mainPanel = React.createRef();
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return window.location.pathname !== "/admin/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
    }
    // eslint-disable-next-line react/prop-types
    const { fetchProducts } = this.props;
    fetchProducts("companydetails", FETCH_COMPANY_DETAILS);
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, companyDetails, ...rest } = this.props;
    // eslint-disable-next-line no-console
    console.log("companyDetails in dashboard", companyDetails.companyName);
    // const cmpy = companyDetails.companyName;
    // let text = "";
    // // eslint-disable-next-line no-console
    // console.log("cmpy", cmpy);
    // if (companyDetails.companyName !== "undefined") {
    //   this.text = cmpy.substring(0, 8);
    //   // eslint-disable-next-line no-console
    //   console.log("00000000", text);
    // }
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"Wipadika"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer companyName={companyDetails.companyName} version={companyDetails.productVersion} /> : null}
          <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  companyDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  error: getProductsError(state),
  pending: getProductsPending(state),
  companyDetails: getCompanyDetails(state)
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
