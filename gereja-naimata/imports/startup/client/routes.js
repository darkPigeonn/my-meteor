import { FlowRouter } from "meteor/ostrio:flow-router-extra";

// Import needed templates
import "../../ui/layouts/body/body.js";
import "../../ui/pages/home/home.js";
import "../../ui/pages/kub/kub.js";
import "../../ui/pages/keluarga/keluarga.js";
import "../../ui/pages/not-found/not-found.js";

// Set up all routes in the app
FlowRouter.route("/", {
  name: "App.home",
  action() {
    this.render("App_body", "home_adminStasi");
  },
});

FlowRouter.notFound = {
  action() {
    this.render("App_body", "App_notFound");
  },
};

FlowRouter.route("/kub/", {
  name: "kubPage",
  action() {
    this.render("App_body", "kubPage");
  },
});
FlowRouter.route("/kub/:_id/detail", {
  name: "kubPageDetail",
  action() {
    this.render("App_body", "kubPageDetail");
  },
});
FlowRouter.route("/keluarga/:_id/detail", {
  name: "keluargaDetailPage",
  action() {
    this.render("App_body", "keluargaDetailPage");
  },
});
