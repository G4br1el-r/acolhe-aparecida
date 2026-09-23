"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import { RangeSlider } from "@/components/ui/range-slider";
import {
  DISTANCE_OPTIONS,
  PRICE_RANGE,
  RATING_OPTIONS,
} from "@/constants/Modules/Hospedagens/Busca/filter-options";
import {
  ACCESSIBILITY_LABELS,
  ACCOMMODATION_TYPE_LABELS,
  BOOKING_LABELS,
  MEAL_LABELS,
  PARKING_LABELS,
  STRUCTURE_LABELS,
} from "@/constants/Modules/Hospedagens/features";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import type { SearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { FilterGroup } from "../FilterGroup";

type FilterListKey =
  | "tipo"
  | "alimentacao"
  | "estacionamento"
  | "estrutura"
  | "acesso"
  | "reserva";

type FiltersPanelProps = {
  values: SearchParams;
  onChange: (changes: Partial<SearchParams>) => void;
};

function toggleValue<Value extends string>(
  list: Value[],
  value: Value,
): Value[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function FiltersPanel({ values, onChange }: FiltersPanelProps) {
  function toggleIn<Key extends FilterListKey>(
    key: Key,
    value: SearchParams[Key][number],
  ) {
    const current = values[key] as SearchParams[Key][number][];
    onChange({ [key]: toggleValue(current, value) } as Partial<SearchParams>);
  }

  return (
    <div className="flex flex-col divide-y divide-blue-950/10">
      <FilterGroup title="Preço por noite">
        <RangeSlider
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={PRICE_RANGE.step}
          value={[
            values.preco_min ?? PRICE_RANGE.min,
            values.preco_max ?? PRICE_RANGE.max,
          ]}
          onValueChange={([min, max]) =>
            onChange({
              preco_min: min > PRICE_RANGE.min ? min : undefined,
              preco_max: max < PRICE_RANGE.max ? max : undefined,
            })
          }
          ariaLabels={["Preço mínimo", "Preço máximo"]}
          formatValue={(value) =>
            value >= PRICE_RANGE.max
              ? `${formatCurrency(value)}+`
              : formatCurrency(value)
          }
        />
      </FilterGroup>

      <FilterGroup title="Distância do Santuário">
        <div className="flex flex-wrap gap-2">
          {DISTANCE_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              isSelected={values.distancia === option.value}
              onToggle={() =>
                onChange({
                  distancia:
                    values.distancia === option.value
                      ? undefined
                      : option.value,
                })
              }
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Tipo de hospedagem">
        <div className="flex flex-wrap gap-2">
          {(
            Object.keys(ACCOMMODATION_TYPE_LABELS) as Array<
              keyof typeof ACCOMMODATION_TYPE_LABELS
            >
          ).map((type) => (
            <Chip
              key={type}
              label={ACCOMMODATION_TYPE_LABELS[type]}
              isSelected={values.tipo.includes(type)}
              onToggle={() => toggleIn("tipo", type)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Alimentação">
        {(Object.keys(MEAL_LABELS) as Array<keyof typeof MEAL_LABELS>).map(
          (meal) => (
            <Checkbox
              key={meal}
              label={MEAL_LABELS[meal].label}
              checked={values.alimentacao.includes(meal)}
              onCheckedChange={() => toggleIn("alimentacao", meal)}
            />
          ),
        )}
      </FilterGroup>

      <FilterGroup title="Estacionamento">
        {(
          Object.keys(PARKING_LABELS) as Array<keyof typeof PARKING_LABELS>
        ).map((parking) => (
          <Checkbox
            key={parking}
            label={PARKING_LABELS[parking].label}
            checked={values.estacionamento.includes(parking)}
            onCheckedChange={() => toggleIn("estacionamento", parking)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Acessibilidade">
        {(
          Object.keys(ACCESSIBILITY_LABELS) as Array<
            keyof typeof ACCESSIBILITY_LABELS
          >
        ).map((feature) => (
          <Checkbox
            key={feature}
            label={ACCESSIBILITY_LABELS[feature].label}
            checked={values.acesso.includes(feature)}
            onCheckedChange={() => toggleIn("acesso", feature)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Estrutura">
        {(
          Object.keys(STRUCTURE_LABELS) as Array<keyof typeof STRUCTURE_LABELS>
        ).map((feature) => (
          <Checkbox
            key={feature}
            label={STRUCTURE_LABELS[feature].label}
            checked={values.estrutura.includes(feature)}
            onCheckedChange={() => toggleIn("estrutura", feature)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Reserva">
        {(
          Object.keys(BOOKING_LABELS) as Array<keyof typeof BOOKING_LABELS>
        ).map((feature) => (
          <Checkbox
            key={feature}
            label={BOOKING_LABELS[feature].label}
            checked={values.reserva.includes(feature)}
            onCheckedChange={() => toggleIn("reserva", feature)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Avaliação dos hóspedes">
        <div className="flex flex-wrap gap-2">
          {RATING_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              isSelected={values.nota === option.value}
              onToggle={() =>
                onChange({
                  nota: values.nota === option.value ? undefined : option.value,
                })
              }
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}
