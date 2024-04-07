import "./navbar.html";
import "./navbar.css";
Template.navbar.onCreated(function () {});
Template.navbar.events({
  "click .nav-item"(e, t) {
    $(".nav-item").removeClass("active");
    $(e.target).addClass("active");
  },
});
