export interface NbrbRateDto {
  readonly Cur_ID: number;
  readonly Date: string;
  readonly Cur_Abbreviation: string;
  readonly Cur_Scale: number;
  readonly Cur_Name: string;
  readonly Cur_OfficialRate: number;
}

export function isNbrbRateDto(value: unknown): value is NbrbRateDto {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (
    !('Cur_OfficialRate' in value) ||
    !('Date' in value) ||
    !('Cur_Abbreviation' in value)
  ) {
    return false;
  }

  return (
    typeof value.Cur_OfficialRate === 'number' &&
    typeof value.Date === 'string' &&
    typeof value.Cur_Abbreviation === 'string'
  );
}
