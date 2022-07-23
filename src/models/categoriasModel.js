import joi from "joi";

const categoria = joi.object(
    {
        id: joi.number(),
        name: joi.string().min(1).required()
    }
);


export default categoria;