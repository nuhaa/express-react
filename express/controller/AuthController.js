import User from "../models/UserModel.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export const getAuth = async(req, res) => {
    const dataUser = await User.findOne({
        where:{
            email:req.body.email
        }
    });
    if (dataUser === null) {
        console.log('Not found!');
    } else {
        // const salt = await bcrypt.genSalt(10);
        const valid = await bcrypt.compareSync(req.body.password, dataUser.password);
        res.json({
            hasil:valid,
            // isi: bcrypt.hashSync(req.body.password,salt),
            lama: dataUser.password,
            password: req.body.password
        })
    }
}