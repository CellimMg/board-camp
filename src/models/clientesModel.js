import joi from "joi";

const cliente = joi.object({
    name: joi.string().min(1).required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.string().isoDate().required()
});


export default cliente;