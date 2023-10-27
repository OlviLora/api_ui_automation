let clinicCode=null;
let isFromWeb=1;
let bookVaccineId=null;
let vaccineCategory=null;
let vaccineBrand=null;
let bookDate=null;
let bookTime=null;
let isHomecare=0;
let bookTimeId=1;
let childName=null;
let gender=null;
let dateOfBirth=null;
let parentName=null;
let phone=null;
let email=null;
let paymentType="FULL";
let childId=null;
let getUrl=true;
let token=null;
let fileInputName = 'ManualOrderVaccine.csv'; 
let fileOutputName = 'JSONManualOrderVaccine.json';

context("Convert CSV to JSON", () =>{
   it("Convert CSV to JSON", function () {
      cy.readFile(fileInputName).then(data => {
         var lines=data.split("\n");
         var result = [];
         var headers=(lines[0].replace(/(\r\n|\n|\r)/gm, "")).split(",");
         for(var i=1;i<lines.length;i++){
            var obj = {};
            var currentline=lines[i].split(",");
      
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
      
            result.push(obj);
         }
         cy.writeFile(fileOutputName, result);
      });
   });
});

context("GET json file", () => {
    it("cy.request() - GET json file", function () {
        cy.readFile(fileOutputName).then(BookVaccine => {
            clinicCode = BookVaccine[0].clinicCode;
            vaccineCategory = BookVaccine[0].vaccineCategory;
            vaccineBrand = BookVaccine[0].vaccineBrand;
            bookDate = BookVaccine[0].bookDate;
            bookTime = BookVaccine[0].bookTime;
            childName = BookVaccine[0].childName;
            gender = BookVaccine[0].gender;
            dateOfBirth = BookVaccine[0].dateOfBirth;
            parentName = BookVaccine[0].parentName;
            phone = BookVaccine[0].phone;
            email = BookVaccine[0].email;
        })
      });
});

context("POST book vaccine", () => {
    it("cy.request() - POST book vaccine", function () {
      cy.request({
         method: "POST",
         body: {
            "clinicCode": clinicCode,
            "isFromWeb" : isFromWeb
         },
         url: "https://api-app-parent-guest-book-vaccine-preprod.primaku.com/v2/vaccine/book",
         }).then(function (response) {
            expect(response.status).to.eq(200)
            expect(response.body.data).have.property("id").to.be.a('number')
            bookVaccineId = response.body.data.id;
         });
      });
});

context("POST add to cart", () => {
    it("cy.request() - POST add to cart", function () {
      cy.request({
         method: "POST",
         body: {
            "bookVaccineId" : bookVaccineId,
            "vaccineCategory" : vaccineCategory,
            "vaccineBrand" : vaccineBrand
         },
         url: "https://api-app-parent-guest-book-vaccine-preprod.primaku.com/vaccine/add-to-cart",
         }).then(function (response) {
            expect(response.status).to.eq(200)
         });
      });
});

context("PUT update vaccine", () => {
   it("cy.request() - PUT update vaccine", function () {
     cy.request({
        method: "PUT",
        body: {
            "clinicCode" : clinicCode,
            "bookDate" : bookDate,
            "bookTime" : bookTime,
            "isFromWeb" : isFromWeb,
            "isHomecare" : isHomecare,
            "bookTimeId" : bookTimeId
        },
        url: "https://api-app-parent-guest-book-vaccine-preprod.primaku.com/v2/vaccine/update/"+bookVaccineId,
        }).then(function (response) {
           expect(response.status).to.eq(200)
        });
     });
});

context("POST register child", () => {
   it("cy.request() - POST register child", function () {
     cy.request({
        method: "POST",
        body: {
            "childName" : childName,
            "gender" : gender,
            "dateOfBirth" : dateOfBirth,
            "parentName" : parentName,
            "phone" : phone,
            "email" : email
        },
        url: "https://api-app-parent-guest-book-vaccine-preprod.primaku.com/auth/register",
        }).then(function (response) {
           expect(response.status).to.eq(201)
           token = response.body.data.token;
           childId = response.body.data.childId;
        });
     });
});

context("PUT transaction pre payment", () => {
   it("cy.request() - PUT transaction pre payment", function () {
     cy.request({
        method: "PUT",
        headers: {
            Authorization: 'Bearer ' +token
        },
        body: {
            "paymentType": paymentType,
            "childId": childId,
            "clinicCode": clinicCode,
            "bookDate": bookDate,
            "bookTime": bookTime,
            "bookTimeId": bookTimeId,
            "getUrl": getUrl,
            "isHomecare": isHomecare
        },
        url: "https://api-app-parent-guest-book-vaccine-preprod.primaku.com/transaction/v2/pre-pay/"+bookVaccineId,
        }).then(function (response) {
           expect(response.status).to.eq(200)
        });
     });
});
