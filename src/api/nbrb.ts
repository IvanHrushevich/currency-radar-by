import { isNbrbRateDto } from "../types/nbrbRateDto";
import type { NbrbUsdRate } from "../types/rates";

const NBRB_USD_CUR_ID = 431;
const NBRB_USD_RATE_URL = `https://api.nbrb.by/exrates/rates/${NBRB_USD_CUR_ID}`;

export async function fetchNbrbUsdRate(): Promise<NbrbUsdRate> {
  const response: Response = await fetch(NBRB_USD_RATE_URL);

  if (!response.ok) {
    throw new Error(`НБРБ: HTTP ${response.status}`);
  }

  const payload: unknown = await response.json();

  if (!isNbrbRateDto(payload)) {
    throw new Error("НБРБ: неожиданный формат ответа");
  }

  return {
    officialRate: payload.Cur_OfficialRate,
    date: new Date(payload.Date),
  };
}
