import bcrypt from "bcrypt";

export const getPassword = async(req, res) => {
    const salt = await bcrypt.genSalt(10);
    res.json({
        result:{
            password:req.body.password,
            bcrypt:bcrypt.hashSync(req.body.password,salt),
        }
    })
}
