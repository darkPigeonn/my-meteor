import "./input.html";
import "./input.scss";

Template.selectComponent.onRendered(function () {
  setTimeout(() => {
    console.log(this.data.listData);
    const selectBox = document.querySelector(".select-box");
    const selectOption = document.querySelector(".select-option");
    const soValue = document.querySelector("#" + this.data.id);
    const optionSearch = document.querySelector("#optionSearch");
    const options = document.querySelector(".options");
    const optionsList = document.querySelectorAll(".options li");

    selectOption.addEventListener("click", function () {
      selectBox.classList.toggle("active");
    });
    optionsList.forEach(function (optionsListSingle) {
      console.log(optionsListSingle);
      optionsListSingle.addEventListener("click", function () {
        text = this.textContent;
        const value = this.getAttribute("value");

        soValue.value = value + "-" + text;
        selectBox.classList.remove("active");
      });
    });
    optionSearch.addEventListener("keyup", function () {
      var filter, li, i, textValue;
      filter = optionSearch.value.toUpperCase();
      li = options.getElementsByTagName("li");
      for (let i = 0; i < li.length; i++) {
        liCount = li[i];
        textValue = liCount.textContent || liCount.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    });
  }, 1000);
});
Template.selectComponent.helpers({
  getItemProperty(item) {
    // Periksa apakah selectedProperty adalah string yang valid
    if (typeof Template.instance().data.labelSelect === "string") {
      // Periksa apakah properti yang dipilih ada di setiap item
      if (item.hasOwnProperty(Template.instance().data.labelSelect)) {
        // Jika benar, kembalikan nilainya
        return item[Template.instance().data.labelSelect];
      }
    }
    // Jika ada kesalahan, kembalikan pesan kesalahan
    return "Error: Invalid selected property";
  },
  getItemPropertyValue(item) {
    // Periksa apakah selectedProperty adalah string yang valid
    if (typeof Template.instance().data.value === "string") {
      // Periksa apakah properti yang dipilih ada di setiap item
      if (item.hasOwnProperty(Template.instance().data.value)) {
        // Jika benar, kembalikan nilainya
        return item[Template.instance().data.value];
      }
    }
    // Jika ada kesalahan, kembalikan pesan kesalahan
    return "Error: Invalid selected property";
  },
});
