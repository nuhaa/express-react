import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAuth = async(req, res) => {
    const dataUser = await User.findOne({
        where:{
            email:req.body.email
        }
    });
    if (dataUser === null) {
        res.status(422).json({
            status: "warning",
            message: "User Not Found"
        })
    } else {
        // const salt = await bcrypt.genSalt(10);
        const valid = await bcrypt.compareSync(req.body.password, dataUser.password);
        if (!valid) {
            res.status(422).json({
                status: "warning",
                message: "invalid username / password"
            })
        } else {
            const accessToken = jwt.sign({
                id: dataUser.id,
                username: dataUser.email
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1m"})
            const refreshToken = jwt.sign({
                id: dataUser.id,
                username: dataUser.email
            }, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"1d"})
            await User.update({refresh_token: refreshToken},{
                where:{
                    id:dataUser.id
                }
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                // secure: true,
                maxAge: 24*60*60*1000
            })
            res.status(200).json({
                status: "success",
                result: {
                    message: "berhasil melakukan login",
                    token: accessToken,
                }
            })
        }
    }
}

export const register = async(req, res) => {
    const {name, email, gender, password, confirmPassword} = req.body;
    if(password!=confirmPassword){
        return res.status(422).json({
                status: "warning",
                message: "Mohon periksa konfirmasi password"
            });        
    } 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const cekUser = await User.count({
            where: {
                email: email
            }
        });
        if (cekUser > 0) {
            res.status(422).json({
                status: "warning",
                message: "Email sudah terdaftar "
            })
        } else {
            await User.create({
               name: name, 
               email: email, 
               gender: gender, 
               password: hashPassword, 
            });
            res.status(200).json({
                status: "success",
                result: {
                    message: "berhasil menambahkan user",
                    datas: {
                        name: name, 
                        email: email, 
                        gender: gender, 
                    }
                }
            })
        }
    } catch (error) {
        res.status(422).json({
            status: "warning",
            message: "Gagal melakukan registrasi "+error
        })
    }
}