import joi from "joi";

const jogo = joi.object(
    {
        name: joi.string().min(1).required(),
        image: joi.string(),
        stockTotal: joi.number().min(1).required(),
        categoryId: joi.number().min(1).required(),
        pricePerDay: joi.number().min(1).required(),
    });

export default jogo;