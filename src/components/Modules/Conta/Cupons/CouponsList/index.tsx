"use client";

import { TicketPercent } from "lucide-react";
import { CouponItem } from "@/components/Modules/Conta/Cupons/CouponItem";
import { ContaPageHeading } from "@/components/Modules/Conta/Shared/ContaPageHeading";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useCoupons } from "@/hooks/Modules/Conta/use-coupons";
import { resolveCouponStatus } from "@/lib/Modules/Conta/coupon-status";

export function CouponsList() {
  const { data: coupons, isPending, isError, refetch } = useCoupons();

  const sortedCoupons = [...(coupons ?? [])].sort((first, second) => {
    const firstAvailable = resolveCouponStatus(first) === "disponivel";
    const secondAvailable = resolveCouponStatus(second) === "disponivel";

    if (firstAvailable === secondAvailable) return 0;

    return firstAvailable ? -1 : 1;
  });

  return (
    <section aria-labelledby="cupons-title">
      <ContaPageHeading
        title="Cupons"
        description="Descontos válidos para usar no checkout. O valor final aparece antes de você confirmar."
      />

      {isPending ? (
        <div aria-busy className="mt-8 flex flex-col gap-3">
          <Skeleton className="h-28 rounded-3xl" />
          <Skeleton className="h-28 rounded-3xl" />
        </div>
      ) : isError ? (
        <EmptyState
          icon={TicketPercent}
          tone="error"
          title="Não conseguimos carregar seus cupons"
          description="Tente de novo em instantes."
          action={
            <BrandButton variant="outline" onClick={() => refetch()}>
              Tentar novamente
            </BrandButton>
          }
          className="mt-8"
        />
      ) : sortedCoupons.length === 0 ? (
        <EmptyState
          icon={TicketPercent}
          title="Nenhum cupom disponível"
          description="Quando houver uma condição especial para você, ela aparece aqui e também no checkout."
          action={
            <BrandLink href="/hospedagens" variant="secondary">
              Ver hospedagens
            </BrandLink>
          }
          className="mt-8"
        />
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {sortedCoupons.map((coupon) => (
            <CouponItem key={coupon.code} coupon={coupon} />
          ))}
        </ul>
      )}
    </section>
  );
}
