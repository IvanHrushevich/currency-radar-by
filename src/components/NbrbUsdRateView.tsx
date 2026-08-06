import { useEffect, useState, type JSX } from 'react';
import { fetchNbrbUsdRate } from '../api/nbrb';
import type { NbrbUsdRate } from '../types/rates';

function formatNbrbDate(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const year: number = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function NbrbUsdRateView(): JSX.Element | null {
  const [nbrbRate, setNbrbRate] = useState<NbrbUsdRate | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): (() => void) => {
    let cancelled: boolean = false;

    async function loadNbrbRate(): Promise<void> {
      setIsLoading(true);
      setError(undefined);

      try {
        const rate: NbrbUsdRate = await fetchNbrbUsdRate();

        if (!cancelled) {
          setNbrbRate(rate);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message: string =
            err instanceof Error ? err.message : 'Не удалось загрузить курс НБРБ';
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadNbrbRate();

    return (): void => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <p>Загрузка…</p>;
  }

  if (error !== undefined) {
    return <p className="error">{error}</p>;
  }

  if (nbrbRate === undefined) {
    return null;
  }

  const dateLabel: string = formatNbrbDate(nbrbRate.date);
  const rateLabel: string = nbrbRate.officialRate.toFixed(4);

  return (
    <p>
      {`Курс НБРБ сегодня (${dateLabel}): `}
      <strong>{rateLabel}</strong>
    </p>
  );
}
