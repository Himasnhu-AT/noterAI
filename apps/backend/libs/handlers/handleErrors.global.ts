import { HttpException, HttpStatus } from '@nestjs/common';

function handleErrors(error: any) {
  switch (error.code) {
    case 'P2000':
      throw new HttpException(
        `The provided value for the column is too long for the column's type. Column: ${error.column}`,
        HttpStatus.BAD_REQUEST,
      );
    case 'P2001':
      throw new HttpException(
        `The record searched for in the where condition (${error.model}.${error.argument} = ${error.value}) does not exist`,
        HttpStatus.NOT_FOUND,
      );
    case 'P2002':
      throw new HttpException(
        `Unique constraint failed on the ${error.constraint}`,
        HttpStatus.BAD_REQUEST,
      );
    case 'P2004':
      throw new HttpException(
        `A constraint failed on the database: ${error.database_error}`,
        HttpStatus.BAD_REQUEST,
      );
    case 'P2005':
      throw new HttpException(
        `The value ${error.field_value} stored in the database for the field ${error.field_name} is invalid for the field's type`,
        HttpStatus.BAD_REQUEST,
      );
    default:
      console.log(error);
      throw new HttpException(
        'Something Wrong with communicating with Server. Check if correct request is made.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}

export default handleErrors;
