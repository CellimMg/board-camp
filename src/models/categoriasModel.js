import joi from "joi";

const categoria = joi.object(
    {
        id: joi.number().required(),
        name: joi.string().required()
    }
);


export default categoria;