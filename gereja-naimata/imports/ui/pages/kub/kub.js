import "./kub.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.kubPage.onCreated(function () {
  const self = this;

  self.items = new ReactiveVar();

  Meteor.call("kub.getAll", function (error, result) {
    if (result) {
      self.items.set(result);
    }
  });
});
Template.kubPage.helpers({
  listItems() {
    return Template.instance().items.get();
  },
});
Template.kubPage.events({
  "click #showModal": function (event, template) {
    $("#exampleModal").modal("show");
  },
  "click #hideModal": function (event, template) {
    $("#exampleModal").modal("hide");
  },
  "click #btn-save-modal"(event, template) {
    event.preventDefault();

    const code = $("#input-code").val();
    const name = $("#input-name").val();

    Meteor.call("kub.insert", code, name, function (error, result) {
      if (result) {
        alert("berhasil");
        location.reload();
      } else {
        alert("gagal", error);
      }
    });
  },
});

Template.kubPageDetail.onCreated(function () {
  const self = this;
  const id = FlowRouter.current().params._id;
  self.item = new ReactiveVar();
  Meteor.call("kub.getById", id, function (error, result) {
    if (result) {
      self.item.set(result);
    }
  });
});
Template.kubPageDetail.helpers({
  item() {
    return Template.instance().item.get();
  },
});
Template.kubPageDetail.events({
  "click #showModal": function (event, template) {
    $("#exampleModal").modal("show");
  },
  "click #hideModal": function (event, template) {
    $("#exampleModal").modal("hide");
  },
  "click #btn-save-modal"(event, template) {
    event.preventDefault();

    const id = FlowRouter.current().params._id;
    const name = $("#input-name").val();

    Meteor.call("keluarga.insert", id, name, function (error, result) {
      if (result) {
        alert("berhasil");
        location.reload();
      } else {
        alert("gagal", error);
      }
    });
  },
});
