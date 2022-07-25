import joi from "joi";

const aluguel = joi.object(
    {
        customerId: joi.number().min(1).required(),
        gameId: joi.number().min(1).required(),   // data em que o aluguel foi feito
        daysRented: joi.number().min(1).required(),          // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
    }
);

export default aluguel;