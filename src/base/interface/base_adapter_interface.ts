export interface IBaseAdapter<DTO, ENTITY> {
    convertFromMuven(entity:ENTITY, additionalParams?: any): Promise<DTO>;
    convertToMuven(dto:DTO, additionalParams?: any): Promise<ENTITY>;
}

export interface IBaseValidatorAdapter<DTO, ENTITY> {
    validateBeforeSync(entity:ENTITY): void;
    validateAfterSync(dto:DTO): void;
}

export interface IBaseNewComparator<DTO> {
    isNew(dto: DTO): boolean;
}
