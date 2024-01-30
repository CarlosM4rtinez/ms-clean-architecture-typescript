import Ajv from 'ajv';
import fs from 'fs';
import { TechnicalMessage } from '../../../../../../domain/model/common/exception/message/TechnicalMessage.js'
import { throwTechnicalException } from '../../../../../../domain/model/common/exception/util/ExceptionUtil.js';
import logger from "../../../../../helpers/logger/src/Logger.js";

export default class SchemaValidator {

    constructor() {
        this.schemas = this.loadSchemas();
        logger.info({ title: "The signature schemes were loaded.", schemas: Object.getOwnPropertyNames(this.schemas) });
    }

    loadSchemas = () => {
        const directoryPath = "./infrastructure/entry-points/api-rest/src/resources/signatures";
        const validator = new Ajv();
        const schemaFiles = fs.readdirSync(directoryPath);
        const schemas = {};
        schemaFiles.forEach(file => {
            const schemaName = file.split('.')[0];
            const schema = JSON.parse(fs.readFileSync(`${directoryPath}/${file}`, 'utf-8'));
            schemas[schemaName] = validator.compile(schema);
        });
        return schemas;
    }

    validate = (schemaName) => {
        return (request, response, next) => {
            const validate = this.schemas[schemaName]
            if (!validate) throwTechnicalException(TechnicalMessage.MST007, `${TechnicalMessage.MST007.message} Schema: ${schemaName}`);
            if (!validate(request.body)) throwTechnicalException(TechnicalMessage.MST006, this.getMessageWithErrors(validate))
            next();
        }
    }

    getMessageWithErrors = (resultValidation) => {
        return resultValidation.errors.map(error => error.message);
    }

}