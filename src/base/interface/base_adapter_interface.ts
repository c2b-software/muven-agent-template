export interface IConversionToMuven<DTO, ENTITY> {
    convertToMuven(dto:DTO, additionalParams?: any): Promise<ENTITY>;
}

export interface IConversionFromMuven<DTO, ENTITY> {
    convertFromMuven(entity:ENTITY, additionalParams?: any): Promise<DTO>;
}

export interface IAdapterValidation<DTO, ENTITY> {
    validateBeforeSync(entity:ENTITY): void;
    validateAfterSync(dto:DTO): void;
}

export interface IAdapterNewComparator<DTO> {
    isNew(dto: DTO): boolean;
}
