import webmessageModel from "../models/webMessageModel.js"

export const createWebMessage = (req, res) => {
    try {
        const {name, contact, message} = req.body
        if(!name || !contact || !message) {
            return res.status(402).send({
                success: false,
                Message: "Enter all the deatils"
            })
        }

        const webMessage = new webmessageModel({name, contact, message})
        webMessage.save()

        res.status(201).send({
            success: true,
            message: "Message sent successfully",
            webMessage
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "Error in webMessageController",
            error
        })
    }
}

export const getAllWebMessage = async (req, res) => {
    try {
        const allWebMessage = await webmessageModel.find({})

        res.status(201).send({
            success: true,
            message: "All Web Messages",
            length: allWebMessage.length,
            allWebMessage
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "Error in getAllWebMessageController",
            error
        })
    }
}

export const deleteWebMessage = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(402).send({
                success: false,
                message: "Please provide id"
            })
        }

        const webMessage = await webmessageModel.findByIdAndDelete(id)

        res.status(200).send({
            success: true,
            message: "web message deleted successfully",
            webMessage
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleteWebMessageController",
            error
        })
    }
}