"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { Controller, type Path, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { User } from "@/@types/Modules/Conta/user";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { TextAreaField, TextField } from "@/components/ui/text-field";
import { TRAVELER_TYPE_LABELS } from "@/constants/Modules/Hospedagens/Detalhe/review-labels";
import {
  REVIEW_CATEGORY_LABELS,
  REVIEW_CATEGORY_ORDER,
} from "@/constants/Modules/Hospedagens/features";
import {
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  TRAVELER_TYPE_OPTIONS,
} from "@/constants/Modules/Viagem/review-form";
import { useCreateReview } from "@/hooks/Modules/Reserva/use-reservations";
import { RESERVATION_REVIEW_QUERY_KEY } from "@/hooks/Modules/Viagem/use-reservation-review";
import { formatStayRange } from "@/lib/Modules/Hospedagens/format-date";
import { buildReviewAuthorName } from "@/lib/Modules/Viagem/author-name";
import {
  createReviewSchema,
  type ReviewFormValues,
} from "@/schemas/Modules/Viagem/review";
import { PhotoPicker } from "../PhotoPicker";
import { StarRating } from "../StarRating";

const NO_SCORE = 0;

type ReviewFormProps = {
  reservation: Reservation;
  accommodation: Accommodation;
  user: User;
};

export function ReviewForm({
  reservation,
  accommodation,
  user,
}: ReviewFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const travelerTypeId = useId();
  const createReview = useCreateReview();

  const categories = REVIEW_CATEGORY_ORDER.filter(
    (category) => accommodation.ratingBreakdown[category] !== undefined,
  );
  const schema = createReviewSchema(categories);

  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      overallScore: NO_SCORE,
      categoryScores: {},
      title: "",
      comment: "",
      photos: [],
    },
  });

  const commentLength = watch("comment").trim().length;
  const detailHref = `/minha-viagem/${reservation.id}`;

  function submit(raw: ReviewFormValues) {
    clearErrors();
    const result = schema.safeParse(raw);

    if (!result.success) {
      for (const issue of result.error.issues) {
        setError(issue.path.join(".") as Path<ReviewFormValues>, {
          message: issue.message,
        });
      }
      return;
    }

    const values = result.data;

    createReview.mutate(
      {
        accommodationSlug: accommodation.slug,
        reservationId: reservation.id,
        userId: user.id,
        authorName: buildReviewAuthorName(user.fullName),
        travelerType: values.travelerType,
        stayedAt: reservation.checkOut,
        overallScore: values.overallScore,
        categoryScores: values.categoryScores,
        title: values.title || undefined,
        comment: values.comment,
        photos: values.photos,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [RESERVATION_REVIEW_QUERY_KEY, reservation.id],
          });
          toast.success("Avaliação publicada", {
            description: `Obrigado por ajudar quem ainda vai a ${accommodation.name}.`,
          });
          router.push(detailHref);
        },
        onError: () => {
          toast.error("Não conseguimos publicar agora. Tente de novo.");
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      noValidate
      className="flex flex-col gap-8"
    >
      <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/8 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
          {formatStayRange(reservation.checkIn, reservation.checkOut)}
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-blue-950">
          {accommodation.name}
        </h2>

        <div className="mt-6">
          <Controller
            control={control}
            name="overallScore"
            render={({ field }) => (
              <StarRating
                name={field.name}
                label="Nota geral da estadia"
                value={field.value}
                onChange={field.onChange}
                error={errors.overallScore?.message}
                size="lg"
              />
            )}
          />
        </div>

        <div className="mt-6 grid gap-x-10 gap-y-3 border-t border-blue-950/10 pt-6 sm:grid-cols-2">
          {categories.map((category) => (
            <Controller
              key={category}
              control={control}
              name={`categoryScores.${category}`}
              render={({ field }) => (
                <StarRating
                  name={field.name}
                  label={REVIEW_CATEGORY_LABELS[category]}
                  value={field.value ?? NO_SCORE}
                  onChange={field.onChange}
                  error={errors.categoryScores?.[category]?.message}
                />
              )}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5 rounded-3xl bg-white p-5 ring-1 ring-blue-950/8 sm:p-7">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={travelerTypeId}
            className="text-sm font-medium text-blue-950"
          >
            Como foi a viagem?
          </label>
          <select
            id={travelerTypeId}
            defaultValue=""
            aria-invalid={errors.travelerType ? true : undefined}
            {...register("travelerType")}
            className="h-12 w-full cursor-pointer appearance-none rounded-xl bg-white px-4 text-base text-blue-950 ring-1 ring-blue-950/15 focus:outline-none focus:ring-2 focus:ring-blue-900 aria-invalid:ring-2 aria-invalid:ring-red-500"
          >
            <option value="" disabled>
              Escolha uma opção
            </option>
            {TRAVELER_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {TRAVELER_TYPE_LABELS[option]}
              </option>
            ))}
          </select>
          {errors.travelerType && (
            <p role="alert" className="text-sm text-red-600">
              {errors.travelerType.message}
            </p>
          )}
        </div>

        <TextField
          label="Título (opcional)"
          placeholder="Um resumo em poucas palavras"
          error={errors.title?.message}
          {...register("title")}
        />

        <div>
          <TextAreaField
            label="Conte como foi"
            placeholder="O que mais ajudou na sua viagem? Como foi a chegada, o quarto, o café, o atendimento?"
            hint={`Pelo menos ${MIN_COMMENT_LENGTH} caracteres. Seja específico: isso é o que mais ajuda outras pessoas.`}
            error={errors.comment?.message}
            maxLength={MAX_COMMENT_LENGTH}
            {...register("comment")}
          />
          <p
            aria-live="polite"
            className="mt-1 text-right text-xs tabular-nums text-blue-950/50"
          >
            {commentLength} / {MIN_COMMENT_LENGTH} mín.
          </p>
        </div>

        <Controller
          control={control}
          name="photos"
          render={({ field }) => (
            <PhotoPicker
              value={field.value}
              onChange={field.onChange}
              error={errors.photos?.message}
            />
          )}
        />
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <BrandLink href={detailHref} variant="ghost">
          Deixar para depois
        </BrandLink>
        <BrandButton
          type="submit"
          variant="accent"
          size="lg"
          isLoading={createReview.isPending}
          loadingLabel="Publicando"
        >
          Publicar avaliação
        </BrandButton>
      </div>
    </form>
  );
}
