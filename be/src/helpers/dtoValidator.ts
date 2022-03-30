import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
export const dtoValidator =  async (dto: any, body: any): Promise<any> => {
    const instance = plainToInstance(dto, body);
    const validationResult = await validate(instance);
    // Errors is an array of validation errors
    if (validationResult.length > 0) {
        let errorTexts: Array<any> = [];
        for (let errorItem of validationResult) {
            if (errorItem.constraints) {
                errorTexts = errorTexts.concat(errorItem.constraints);
            }
            if (errorItem.children && errorItem.children.length > 0) {
                errorItem.children.map((childİtem) => {
                    errorTexts = errorTexts.concat(childİtem.constraints);
                });
            }
        }
        return errorTexts;
    } else {
        // Correct
        return null;
    }
};