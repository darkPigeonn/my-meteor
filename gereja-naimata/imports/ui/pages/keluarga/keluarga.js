import "./keluarga.html";
import "/imports/ui/components/input/input";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.keluargaDetailPage.onCreated(function () {
  const self = this;
  const id = FlowRouter.current().params._id;
  self.dataKeluarga = new ReactiveVar();

  Meteor.call("keluarga.getById", id, function (error, result) {
    if (result) {
      console.log(result);
      self.dataKeluarga.set(result);
    }
  });

  self.listProvinsi = new ReactiveVar();
  self.listRegency = new ReactiveVar();
  self.listDistrict = new ReactiveVar();
  self.listVillage = new ReactiveVar();
  Meteor.call("getProvinsi", function (error, result) {
    if (result) {
      console.log(result);
      self.listProvinsi.set(result.data);
    }
  });
  //get umat
  self.anggotaKeluarga = new ReactiveVar();
  Meteor.call("umat.getByKeluarga", id, function (error, result) {
    if (result) {
      console.log(result);
      self.anggotaKeluarga.set(result);
    }
  });
});
Template.keluargaDetailPage.helpers({
  anggotaKeluarga() {
    return Template.instance().anggotaKeluarga.get();
  },
  dataKeluarga() {
    return Template.instance().dataKeluarga.get();
  },
  getProvinsi() {
    return Template.instance().listProvinsi.get();
  },
  listRegency() {
    return Template.instance().listRegency.get();
  },
  listDistrict() {
    return Template.instance().listDistrict.get();
  },
  listVillage() {
    return Template.instance().listVillage.get();
  },
});
Template.keluargaDetailPage.events({
  "click #btn-edit-keluarga"(e, t) {
    e.preventDefault();

    $("#modalEditKeluarga").modal("show");
  },
  "click #btn-tambah-anggota-keluarga"(e, t) {
    e.preventDefault();

    $("#modalTambahAnggota").modal("show");
  },
  "click #btn-save-anggota"(e, t) {
    e.preventDefault();
    const id = FlowRouter.current().params._id;
    const fullName = $("#fullName").val();
    const nik = $("#nik").val();
    const gender = $(".opt-gender").val();
    const pob = $("#pob").val();
    const dob = $("#dob").val();
    const religion = $("#select-religion").val();
    const education = $("#education").val();
    const job = $("#job").val();
    const marritalStatus = $("#select-marrital").val();
    const relationship = $("#relationship").val();
    const civilStatus = $("#select-civil-status").val();

    const dataModel = {
      fullName,
      nik,
      gender,
      pob,
      dob,
      religion,
      education,
      job,
      marritalStatus,
      relationship,
      civilStatus,
    };
    Meteor.call("umat.addAnggota", id, dataModel, function (error, result) {
      if (result) {
        alert("Success");
      } else {
        alert("error");
      }
    });
  },
  "click #btn-save-modal-edit"(e, t) {
    e.preventDefault();
    const id = FlowRouter.current().params._id;
    const familyHead = $("#select-familyHead").val();
    const address = $("#input-address").val();
    const provinci = $("#select-provinci").val();
    const regencies = $("#select-regency").val();
    const district = $("#select-district").val();
    const village = $("#select-village").val();
    const rt = $("#rt").val();
    const rw = $("#rw").val();

    const newData = {
      name: familyHead.split("-")[1],
      familyHeadId: familyHead.split("-")[0],
      address,
      provinci,
      regencies,
      district,
      village,
      rt,
      rw,
    };
    Meteor.call(
      "keluarga.updateDataKeluarga",
      id,
      newData,
      function (error, result) {
        if (result) {
          alert("success");
          location.reload();
        } else {
          alert("Gagal");
          console.log(error);
        }
      }
    );
  },
  "change #select-provinci"(e, t) {
    e.preventDefault();
    Meteor.call(
      "getRegency",
      e.target.value.split("-")[0],
      function (error, result) {
        if (result) {
          t.listRegency.set(result.data);
        }
      }
    );
  },
  "change #select-regency"(e, t) {
    e.preventDefault();
    Meteor.call(
      "getDistrict",
      e.target.value.split("-")[0],
      function (error, result) {
        if (result) {
          t.listDistrict.set(result.data);
        }
      }
    );
  },
  "change #select-district"(e, t) {
    e.preventDefault();
    Meteor.call(
      "getVillages",
      e.target.value.split("-")[0],
      function (error, result) {
        if (result) {
          t.listVillage.set(result.data);
        }
      }
    );
  },
});
