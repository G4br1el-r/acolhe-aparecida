"use client";

import { Copy, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BrandButton } from "@/components/ui/brand-button";
import { hashString } from "@/lib/Modules/Hospedagens/hash";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import type { PixCharge } from "@/services/Modules/Reserva/payments";

const QR_GRID_SIZE = 21;
const QR_CELL_COUNT = QR_GRID_SIZE * QR_GRID_SIZE;
const SECONDS_IN_MINUTE = 60;
const TICK_IN_MS = 1000;
const FINDER_SIZE = 7;
const BIT_MASK = 1;

type PixPanelProps = {
  charge: PixCharge;
  isConfirming: boolean;
  onConfirm: () => void;
  onExpire: () => void;
};

function isFinderCell(row: number, column: number): boolean {
  const inTopLeft = row < FINDER_SIZE && column < FINDER_SIZE;
  const inTopRight = row < FINDER_SIZE && column >= QR_GRID_SIZE - FINDER_SIZE;
  const inBottomLeft =
    row >= QR_GRID_SIZE - FINDER_SIZE && column < FINDER_SIZE;

  if (!(inTopLeft || inTopRight || inBottomLeft)) return false;

  const localRow = row % FINDER_SIZE;
  const localColumn = column % FINDER_SIZE;
  const isBorder =
    localRow === 0 ||
    localRow === FINDER_SIZE - 1 ||
    localColumn === 0 ||
    localColumn === FINDER_SIZE - 1;
  const isCenter =
    localRow >= 2 && localRow <= 4 && localColumn >= 2 && localColumn <= 4;

  return isBorder || isCenter;
}

function buildQrCells(code: string): boolean[] {
  return Array.from({ length: QR_CELL_COUNT }, (_, index) => {
    const row = Math.floor(index / QR_GRID_SIZE);
    const column = index % QR_GRID_SIZE;
    const inFinderArea =
      (row < FINDER_SIZE + 1 && column < FINDER_SIZE + 1) ||
      (row < FINDER_SIZE + 1 && column >= QR_GRID_SIZE - FINDER_SIZE - 1) ||
      (row >= QR_GRID_SIZE - FINDER_SIZE - 1 && column < FINDER_SIZE + 1);

    if (inFinderArea) return isFinderCell(row, column);

    return (hashString(`${code}:${index}`) & BIT_MASK) === 1;
  });
}

function formatRemaining(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
  const seconds = totalSeconds % SECONDS_IN_MINUTE;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function PixPanel({
  charge,
  isConfirming,
  onConfirm,
  onExpire,
}: PixPanelProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    Math.max(
      0,
      Math.floor(
        (new Date(charge.expiresAt).getTime() - Date.now()) / TICK_IN_MS,
      ),
    ),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const next = Math.max(
        0,
        Math.floor(
          (new Date(charge.expiresAt).getTime() - Date.now()) / TICK_IN_MS,
        ),
      );
      setRemainingSeconds(next);
      if (next === 0) {
        clearInterval(interval);
        onExpire();
      }
    }, TICK_IN_MS);

    return () => clearInterval(interval);
  }, [charge.expiresAt, onExpire]);

  const cells = buildQrCells(charge.code);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(charge.code);
      toast.success("Código PIX copiado");
    } catch {
      toast.error("Não foi possível copiar. Selecione o código manualmente.");
    }
  }

  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
      <div className="mx-auto flex w-fit flex-col items-center gap-2">
        <div
          role="img"
          aria-label="QR Code PIX de demonstração"
          className="grid gap-px rounded-2xl bg-white p-3 ring-1 ring-blue-950/10"
          style={{ gridTemplateColumns: `repeat(${QR_GRID_SIZE}, 6px)` }}
        >
          {cells.map((isDark, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: células de um padrão fixo
              key={index}
              className={`h-1.5 w-1.5 ${isDark ? "bg-blue-950" : "bg-white"}`}
            />
          ))}
        </div>
        <p className="flex items-center gap-1 text-[11px] text-blue-950/50">
          <QrCode className="h-3 w-3" aria-hidden />
          Demonstração, sem cobrança real
        </p>
      </div>

      <div className="min-w-0">
        <p className="text-sm text-blue-950/70">
          Abra o app do seu banco, escolha pagar com PIX e escaneie o código ou
          cole o código abaixo.
        </p>
        <p className="mt-3 text-2xl font-bold text-blue-950">
          {formatCurrency(charge.amount)}
        </p>
        <p
          aria-live="polite"
          className={`mt-1 text-sm ${remainingSeconds < SECONDS_IN_MINUTE * 2 ? "text-cta" : "text-blue-950/60"}`}
        >
          Código válido por {formatRemaining(remainingSeconds)}
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50 p-2 pl-3">
          <code className="min-w-0 flex-1 truncate text-xs text-blue-950/80">
            {charge.code}
          </code>
          <button
            type="button"
            onClick={copyCode}
            className="flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-semibold text-blue-950 ring-1 ring-blue-950/10 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden />
            Copiar
          </button>
        </div>

        <BrandButton
          className="mt-5"
          size="lg"
          variant="accent"
          fullWidth
          onClick={onConfirm}
          isLoading={isConfirming}
          loadingLabel="Confirmando pagamento"
          disabled={remainingSeconds === 0}
        >
          Já fiz o pagamento
        </BrandButton>
        <p className="mt-2 text-xs text-blue-950/55">
          Na versão final, a confirmação é automática assim que o banco avisa.
        </p>
      </div>
    </div>
  );
}
