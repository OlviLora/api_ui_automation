//  <reference types="cypress" />

context("GET json placeholder", () => {
    it("cy.request() - get list todo json placeholder", function () {
      cy.request({
         method: "GET",
         url: "/todos",
         }).then(function (response) {
            expect(response.status).to.eq(200)
            let json_response = JSON.stringify(response)
            expect(json_response).to.contain('userId')
            expect(json_response).to.contain('id')
            expect(json_response).to.contain('title')
            expect(json_response).to.contain('completed')
         });
      });
    
    it("cy.request() - get one todo json placeholder", function () {
      cy.request({
          method: "GET",
          url: "/todos/1",
          }).then(function (response) {
            expect(response.status).to.eq(200)
            expect(response.body).have.property("userId").to.be.a('number')
            expect(response.body).have.property("id").to.be.a('number')
            expect(response.body).have.property("title").to.be.a('string')
            expect(response.body).have.property("completed").and.be.oneOf([true, false])
          });
      });
    
      it("cy.request() - create todo json placeholder", function () {
        cy.request({
            method: "POST",
            url: "/todos",
            body: {
              userId: 100,
              title: 'testing todo json placeholder',
              completed: true
            },
            headers: {'Content-Type': 'application/json'}
            }).then(function (response) {
              expect(response.status).to.eq(201)
              expect(response.body).to.contain({
                userId: 100,
                title: 'testing todo json placeholder',
                completed: true
                });
            });
        });
      
      it("cy.request() - update todo json placeholder", function () {
        cy.request({
            method: "PUT",
            url: "/todos/5",
            body: {
              userId: 100,
              title: 'testing udpate todo json placeholder',
              completed: false
            },
            headers: {'Content-Type': 'application/json'}
            }).then(function (response) {
              expect(response.status).to.eq(200)
              expect(response.body).to.contain({
                userId: 100,
                title: 'testing udpate todo json placeholder',
                completed: false
                });
            });
        });

        it("cy.request() - update todo json placeholder partially", function () {
          cy.request({
              method: "PATCH",
              url: "/todos/5",
              body: {
                userId: 100,
                completed: false
              },
              headers: {'Content-Type': 'application/json'}
              }).then(function (response) {
                expect(response.status).to.eq(200)
                expect(response.body).to.contain({
                  userId: 100,
                  title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
                  completed: false
                  });
              });
          });

        it("cy.request() - delete todo json placeholder", function () {
          cy.request({
              method: "DELETE",
              url: "/todos/50",
              }).then(function (response) {
                let json_response = JSON.stringify(response)
                cy.log(json_response)
                expect(response.status).to.eq(200)
                expect(response.body).to.contain({});
              });
          });
  })
  