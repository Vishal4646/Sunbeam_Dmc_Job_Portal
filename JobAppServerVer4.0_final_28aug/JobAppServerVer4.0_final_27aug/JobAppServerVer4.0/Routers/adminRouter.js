const express = require("express")
const db = require("../dbConnect/dbConnect")
const router = express.Router()
const utils = require("../utils/utils")


        //get applicant count
        router.get("/allapplicant", (request, response) => {
        db.query("select count(*) count from applicant_account", (error, data) => {
        response.send(utils.createObject(error, data));
        });
        });



        //get recruiter count
        router.get("/allrecruiter", (request, response) => {
        db.query("select count(*) count from recruiter_account", (error, data) => {
        response.send(utils.createObject(error, data));
        });
        });


        //GET ALL RECRUITER API
        router.get("/getallrecruiter",(request, response)=>{
                let query ='select * from recruiter_account'
                db.query(query,(error,result)=>{
                response.send(utils.createObject(error,result))
                })
        })





        //GET ALL applicant API
        router.get("/applicant/", (request, response) => {
        let query = "select * from applicant_account";
        db.query(query, (error, result) => {
        response.send(utils.createObject(error, result));
        });
        });
    
    
        //DELETE_RECRUITER_API
        router.delete("/dltrecruiter/:id",(req,resp)=>{
                db.query("delete from recruiter_account where recruiter_id = ?",[req.params.id],(err,data)=>{
                resp.send(utils.createObject(err,data));
                })
        })



        //DELETE_APPLICANT_API
        router.delete("/dltapplicant/:id",(req,resp)=>{
                db.query("delete from applicant_account where applicant_id = ?",[req.params.id],(err,data)=>{
                resp.send(utils.createObject(err,data));
                })
        })


    


module.exports = router;