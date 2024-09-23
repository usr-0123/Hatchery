import Joi from "joi";

export const newSaleValidator = (sale) => {
    const saleValidatorSchema = Joi.object({
        saleDate: Joi.date().required(),
        quantitySold: Joi.number().required(),
        price: Joi.number().required()
    })
        .messages({
            'any.required': 'All fileds are required.',
            'date.base': 'Sale date must be a valid date.',
            'number.base': 'Quantity sold and price must be numbers.'
        });

    return saleValidatorSchema.validate(sale);
};

export const updateSaleValidator = (sale) => {
    const saleValidatorSchema = Joi.object({
        saleDate: Joi.date().optional(),
        quantitySold: Joi.number().optional(),
        price: Joi.number().optional(),
    })
        .min(1).messages({
            'object.min': 'At least one field must be provided for update.',
            'date.base': 'Sale date must be a valid date.',
            'number.base': 'Quantity sold and price must be numbers.',
        });

    return saleValidatorSchema.validate(sale);
};