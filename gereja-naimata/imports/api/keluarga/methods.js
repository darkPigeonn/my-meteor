// Methods related to links

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Keluarga, Umat } from "./keluarga";
import { HTTP } from "meteor/http";

function getDetailAddress(data) {
  return { id: data.split("-")[0], label: data.split("-")[1] };
}
Meteor.methods({
  async "keluarga.insert"(id, name) {
    check(id, String);
    check(name, String);

    const data = {
      idKub: id,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdFamily = await Keluarga.insert(data);

    const dataUmat = {
      fullName: name,
      familyId: createdFamily,
      relationship: 1,
    };
    const craetedUmat = await Umat.insert(dataUmat);

    return Keluarga.update(
      { _id: createdFamily },
      { $set: { familyHeadId: craetedUmat } }
    );
  },
  "keluarga.getAll"() {
    return Keluarga.find().fetch();
  },
  "keluarga.getById"(id) {
    check(id, String);
    return Keluarga.findOne({ _id: id });
  },
  "keluarga.updateDataKeluarga"(id, newData) {
    let {
      name,
      familyHeadId,
      address,
      provinci,
      regencies,
      district,
      village,
      rt,
      rw,
    } = newData;
    provinci = getDetailAddress(provinci);
    regencies = getDetailAddress(regencies);
    district = getDetailAddress(district);
    village = getDetailAddress(village);
    const newModel = {
      name,
      familyHeadId,
      address,
      provinciId: provinci.id,
      provinciName: provinci.label,
      regenciesId: regencies.id,
      regenciesName: regencies.label,
      districtId: district.id,
      districtName: district.label,
      villageId: village.id,
      villageName: village.label,
      regencies,
      district,
      rt,
      rw,
    };
    return Keluarga.update({ _id: id }, { $set: newModel });
  },

  //umat
  "umat.getByKeluarga"(id) {
    console.log(id);
    return Umat.find({ familyId: id }).fetch();
  },
  "umat.addAnggota"(id, body) {
    const {
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
    } = body;
    const thisFamily = Keluarga.findOne({ _id: id });

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
      familyId: id,
      idKub: thisFamily.idKub,
      createdAt: new Date(),
      // createdBy: thisUser._id,
      updateAt: new Date(),
    };

    return Umat.insert(dataModel);
  },

  "users.register"(username, email, password) {
    // Buat pengguna baru
    const userId = Accounts.createUser({
      username: "adminnaimata",
      email: "admin@naimata.org",
      password: "NuWdro1bO6BhC6a4NWNj",
    });

    return userId;
  },

  // alamat
  async getProvinsi() {
    const getData = await HTTP.call(
      "GET",
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    return getData;
  },
  async getRegency(code) {
    const getData = await HTTP.call(
      "get",
      "https://www.emsifa.com/api-wilayah-indonesia/api/regencies/" +
        code +
        ".json"
    );
    return getData;
  },
  async getDistrict(code) {
    const getData = await HTTP.call(
      "get",
      "https://www.emsifa.com/api-wilayah-indonesia/api/districts/" +
        code +
        ".json"
    );
    return getData;
  },
  async getVillages(code) {
    const getData = await HTTP.call(
      "get",
      "https://www.emsifa.com/api-wilayah-indonesia/api/villages/" +
        code +
        ".json"
    );
    return getData;
  },
});
