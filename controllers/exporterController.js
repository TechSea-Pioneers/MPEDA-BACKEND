import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from '../mailer/SendMail.js'
import mongoose from 'mongoose'
import ExporterModel from '../models/ExporterModel.js'

const addExporter = async (req,res)=>{
    try{
        console.log("BODY : ",req.body);
        const exporter = new ExporterModel(req.body);
        exporter.save().then(data=>{
            res.json({
                "success":true,
                "message":"Exporter Added Successfully",
                "data":data.toJSON()
            })
        })
    }catch(err){
        // console.log(err);
        res.json({"success":"false","message":err.message});
    }
}
const addExporters = async(req,res)=>{
    try{
        console.log("BODY : ",req.body.data);
        ExporterModel.insertMany(req.body.data).then(data=>{
            res.json({
                "success":true,
                "message":"Exporters Added Successfully",
                "data":data
            })
        })
    }catch(err){
        // console.log(err);
        res.json({"success":"false","message":err.message});
    }
}
const getExporter = async (req, res)=>{
    try{
        ExporterModel.find({}).then(data=>{
            res.json({"success":true,"message":"Exporter data retrieved successfully","data":data});
        })
    }catch(err){
        res.json({"success":false,"message":err.message})
    }
}
export {addExporter, getExporter, addExporters}