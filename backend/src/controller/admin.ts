import {prisma} from "../prisma/index"
import jwt from "jsonwebtoken"
import {LoginInfo, UserInfo} from "../utils/validateInput"
const JWT_SECRET=process.env.JWT_SECRET ;


export const SignupAdmin=async(req:any,res:any)=>{

    const userdata:UserInfo=req.body;

    try{

        const find=await prisma.user.findFirst({
            where:{
                email:userdata.email
            }
        })
        if(find){
            return res.status(400).json({msg:"user already exist please signin"})
        }
        const user=await prisma.user.create({
            data:{
                firstName:userdata.firstName,
                middleName:userdata.middleName,
                lastName:userdata.lastName,
                email:userdata.email,
                password:userdata.password
            },
            select:{
                user_id:true
            }
        })

        return res.status(201).json({msg:"user created succesfull", user})

    }catch(err){

        return res.status(500).json({msg:"Internal server error"});

    }


}

export const LoginAdmin=async(req:any,res:any)=>{
    const userdata:LoginInfo=req.body;

    try{

        const user=await prisma.user.findUnique({
            where:{
                email:userdata.email,
                password:userdata.password
            },
            select:{
                user_id:true
            }

        })
        if(!user){
            return res.status(404).json({msg:"user not found please singup"});
        }

        const token=jwt.sign({user_id:user.user_id},JWT_SECRET);
        
        return res.status(200).json({msg:"user found",token:token});

    }catch(err){

    }
}

export const DeleteAccount=async(req:any,res:any)=>{
    const data:LoginInfo=req.body;
    try{
        const user=await prisma.user.findUnique({
            where:{
                email:data.email,
                password:data.password
            }
        })
        if(!user){
            return res.status(404).json({msg:"user not found"});

        }
        const response=await prisma.user.delete({
            where:{
                email:data.email
            }
        })

        return res.status(200).json({msg:"user deleted succesfull"});

    }catch(err){

    }
}