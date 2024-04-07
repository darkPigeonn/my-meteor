import "./home.html";
import "/imports/ui/components/card/card";
import "../../components/hello/hello.js";
import "../../components/info/info.js";

import XLSX from "xlsx";

Template.App_home.onCreated(function () {
  const self = this;

  self.listSelfAssessment = new ReactiveVar();
  self.listSelfAssessmentAnalisis = new ReactiveVar();
  self.listSelfAssessmentAnalisisIsu = new ReactiveVar();
});
Template.App_home.helpers({
  listSelfAssessment() {
    return Template.instance().listSelfAssessment.get();
  },
  listSelfAssessmentAnalisis() {
    return Template.instance().listSelfAssessmentAnalisis.get();
  },
  listSelfAssessmentAnalisisIsu() {
    return Template.instance().listSelfAssessmentAnalisisIsu.get();
  },
});
Template.App_home.events({
  "change #input-file"(e, t) {
    const file = e.target.files[0];
    const reader = new FileReader();
    let dataJson = {};

    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      for (let i = 0; i < 4; i++) {
        const sheetName = workbook.SheetNames[i]; // Ambil nama sheet pertama
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (i == 1) {
          // Lakukan sesuatu dengan data JSON, misalnya menampilkannya di UI
          const indexNameSchool = 3;
          const indexHeadmasterName = 4;

          const indexStartItem = 11;
          const listItems = [];

          for (let index = indexStartItem; index < jsonData.length; index++) {
            const element = jsonData[index];
            if (element.length < 1) {
              index = jsonData.length;
            } else {
              const indexKodeItem = 1;
              const indexKodePenilaian = 3;
              const indexAlasan = 4;
              const indexRencana = 5;

              //repair data kode item
              const codeItem = element[indexKodeItem]
                .split(":")[1]
                .split("\n")[0]
                .replace(" ", "");

              const newData = {
                namaSekolah: element[indexNameSchool],
                codeItemPertanyaan: codeItem,
                codePenilaian: element[indexKodePenilaian],
                reason: element[indexAlasan],
                plan: element[indexRencana],
              };
              listItems.push(newData);
            }
          }

          t.listSelfAssessment.set(listItems);
        }
        //analisis isu
        if (i == 2) {
          const indexStartItem = 10;
          const listItemAnalisis = [];
          const listItemAnalisisIsu = [];
          for (let index = indexStartItem; index < jsonData.length; index++) {
            const element = jsonData[index];
            if (element.length < 1) {
              index = jsonData.length;
            } else {
              const indexKomponenPeringkatRendah = 1;
              const indexAlasan = 2;
              const indexRencana = 3;
              //analisis isu
              const indexIsu = 5;
              const indexIsuAlasan = 6;
              const indexIsuUsulan = 7;
              const indexIsuPenjelasan = 8;

              const newDataAnalisis = {
                komponen_peringkatRendah: element[indexKomponenPeringkatRendah],
                alasan_pemilihanPeringkat: element[indexAlasan],
                rencana_pengembangan: element[indexRencana],
              };
              listItemAnalisis.push(newDataAnalisis);
              const newDataAnalisisIsu = {
                isu_strategis: element[indexIsu],
                alasan_pemilihanIsu: element[indexIsuAlasan],
                usulan_program: element[indexIsuUsulan],
                penjelasan_usulanProgram: element[indexIsuPenjelasan],
              };
              listItemAnalisisIsu.push(newDataAnalisisIsu);
            }
          }

          t.listSelfAssessmentAnalisis.set(listItemAnalisis);
          t.listSelfAssessmentAnalisisIsu.set(listItemAnalisisIsu);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  },
});

Template.home_adminStasi.onCreated(function () {
  const self = this;

  self.summary = new ReactiveVar();

  Meteor.call("summary.stasi", function (error, result) {
    if (result) {
      console.log(result);
      self.summary.set(result);
    }
  });
});
Template.home_adminStasi.helpers({
  summary() {
    return Template.instance().summary.get();
  },
});
