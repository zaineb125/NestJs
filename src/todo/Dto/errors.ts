import { Injectable, NestMiddleware } from '@nestjs/common';
import { ValidationArguments } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export class Errors {
    public static minLengthError(validationData: ValidationArguments) :  string  {
    return `La taille de votre ${validationData.property} ${validationData.value} est courte,
    la taille minimale de ${validationData.property} est ${validationData.constraints[0]}`
  }

  public static maxLengthError(validationData: ValidationArguments) :  string  {
    return `La taille de votre ${validationData.property} ${validationData.value} est longue,
    la taille maximale de ${validationData.property} est ${validationData.constraints[0]}`
  }

  public static requiredError(validationData: ValidationArguments) :  string  {
    return `Le champs ${validationData.property} est obligatoire`
  }
}