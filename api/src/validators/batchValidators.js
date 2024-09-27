import Joi from "joi";

export const newBatchValidator = (sale) => {
    const batchValidatorSchema = Joi.object({
        userId: Joi.string().required(),
        receivedDate: Joi.date().required(),
        totalEggs: Joi.number().required(),
        price: Joi.number().required(),
        batchStatus: Joi.string().required()
    })
        .messages({
            'any.required': 'All fileds are required.',
            'date.base': 'Sale date must be a valid date.',
            'number.base': 'Total eggs and price must be numbers.',
        });

    return batchValidatorSchema.validate(sale);
};