// Methods related to links

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Kubs } from "./kub";
import { Keluarga, Umat } from "../keluarga/keluarga";

Meteor.methods({
  "kub.insert"(code, name) {
    check(code, String);
    check(name, String);

    const data = {
      code,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return Kubs.insert(data);
  },
  "kub.getAll"() {
    return Kubs.find().fetch();
  },
  async "kub.getById"(id) {
    check(id, String);
    const item = await Kubs.findOne({ _id: id });

    //get keluarga
    const keluarga = await Keluarga.find({ idKub: id }).fetch();
    item.keluarga = keluarga;
    item.keluargaCount = keluarga.length;
    console.log(keluarga);
    return item;
  },

  //stasi
  "summary.stasi"() {
    const thisuser = Meteor.users.findOne({ _id: Meteor.userId() });

    const kub = Kubs.find().fetch().length;
    const family = Keluarga.find().fetch().length;
    const umat = Umat.find().fetch();

    const pria = umat.filter((item) => {
      return item.gender == "0";
    }).length;
    console.log("pria", pria);
    const wanita = umat.filter((item) => {
      return item.gender == "1";
    }).length;
    const tetap = umat.filter((item) => {
      return item.civilStatus == "1";
    }).length;
    const tidakTetap = umat.filter((item) => {
      return item.civilStatus == "2";
    }).length;

    return { kub, family, umat: umat.length, pria, wanita, tetap, tidakTetap };
  },
});
