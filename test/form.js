var should = require("should");
var helper = require("./helper.js");

describe("Form", function() {
   var $form;

   before(function(done) {
      helper.wufoo.getForms(function(err, forms){
         $form = forms[0];
         done(err);
      });
   })

   describe("#getEntries", function() {
      it("Should return array of entries", function(done){
         $form.getEntries({system:'true'}, function(err, entries){
            (entries.constructor == Array).should.be.true;
            helper.isEntry(entries[0]);
            done(err);
         });
      })

   });

   describe("#getFields", function() {
      it("Should return array of fields", function(done){
         $form.getFields({system:'true'}, function(err, fields){
            (fields.constructor == Array).should.be.true;
            helper.isField(fields[0]);
            done(err);
         });
      })


   });

   describe("#getEntriesCount", function() {
      it("Should return a number", function(done) {
         $form.getEntriesCount(function(err, count) {
            (typeof(count)).should.be.equal("number");
            done(err);
         });
      });
   });

   describe("#addWebhook and #deleteWebhook", function() {
      it("Should add a webhoook successfully", function(done) {
         $form.addWebhook("http://localhost:3000/bin", function(err, hashid) {
            should.exist(hashid);
            (typeof(hashid)).should.equal("string");
            $form.deleteWebhook(hashid, function(err, success) {
               success.should.be.true;
               done(err);
            });
         });
      });

      it("Should add a webhoook successfully with Async", function(done) {
         $form.addWebhookAsync("http://localhost:3000/bin")
            .then((hashid) => {
               should.exist(hashid);
               (typeof(hashid)).should.equal("string");
               return $form.deleteWebhookAsync(hashid);
            })
            .then((success) => {
               success.should.be.true;
               done();
            });
      });
   })


})
