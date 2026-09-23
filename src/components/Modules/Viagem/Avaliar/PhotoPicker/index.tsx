"use client";

import { Check, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useEffect, useId, useRef, useState } from "react";
import type { ReviewPhoto } from "@/@types/Modules/Hospedagens/review";
import {
  MAX_REVIEW_PHOTOS,
  MOCK_REVIEW_PHOTOS,
} from "@/constants/Modules/Viagem/review-form";
import { cn } from "@/lib/utils";

const THUMB_SIZES = "(min-width: 640px) 8rem, 33vw";

type UploadPreview = {
  photo: ReviewPhoto;
  previewUrl: string;
};

type PhotoPickerProps = {
  value: ReviewPhoto[];
  onChange: (photos: ReviewPhoto[]) => void;
  error?: string;
};

export function PhotoPicker({ value, onChange, error }: PhotoPickerProps) {
  const inputId = useId();
  const [uploads, setUploads] = useState<UploadPreview[]>([]);
  const uploadsRef = useRef(uploads);
  uploadsRef.current = uploads;

  useEffect(() => {
    return () => {
      for (const upload of uploadsRef.current) {
        URL.revokeObjectURL(upload.previewUrl);
      }
    };
  }, []);

  const selectedIds = new Set(value.map((photo) => photo.id));
  const isFull = value.length >= MAX_REVIEW_PHOTOS;

  function toggleMock(photo: ReviewPhoto) {
    if (selectedIds.has(photo.id)) {
      onChange(value.filter((candidate) => candidate.id !== photo.id));
      return;
    }
    if (isFull) return;
    onChange([...value, photo]);
  }

  function removeUpload(upload: UploadPreview) {
    URL.revokeObjectURL(upload.previewUrl);
    setUploads((current) => current.filter((item) => item !== upload));
    onChange(value.filter((candidate) => candidate.id !== upload.photo.id));
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || isFull) return;

    const source =
      MOCK_REVIEW_PHOTOS[uploads.length % MOCK_REVIEW_PHOTOS.length];
    const upload: UploadPreview = {
      previewUrl: URL.createObjectURL(file),
      photo: {
        id: `upload-${Date.now()}`,
        url: source.url,
        caption: file.name.replace(/\.[^.]+$/, "") || source.caption,
      },
    };

    setUploads((current) => [...current, upload]);
    onChange([...value, upload.photo]);
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium text-blue-950">
          Fotos <span className="font-normal text-blue-950/50">(opcional)</span>
        </p>
        <p className="text-xs tabular-nums text-blue-950/55">
          {value.length} de {MAX_REVIEW_PHOTOS}
        </p>
      </div>
      <p className="mt-0.5 text-xs text-blue-950/55">
        Escolha entre as sugestões ou envie do seu celular.
      </p>

      <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {MOCK_REVIEW_PHOTOS.map((photo) => {
          const isSelected = selectedIds.has(photo.id);
          const isDisabled = !isSelected && isFull;

          return (
            <li key={photo.id}>
              <button
                type="button"
                onClick={() => toggleMock(photo)}
                aria-pressed={isSelected}
                aria-label={photo.caption}
                disabled={isDisabled}
                className={cn(
                  "relative block aspect-4/3 w-full cursor-pointer overflow-hidden rounded-xl bg-blue-100 ring-offset-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 disabled:cursor-not-allowed disabled:opacity-40",
                  isSelected && "ring-2 ring-blue-900",
                )}
              >
                <Image
                  src={photo.url}
                  alt=""
                  fill
                  sizes={THUMB_SIZES}
                  className="object-cover"
                />
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-900 text-white shadow">
                    <Check
                      className="h-3.5 w-3.5"
                      strokeWidth={3}
                      aria-hidden
                    />
                  </span>
                )}
              </button>
            </li>
          );
        })}

        {uploads.map((upload) => (
          <li key={upload.photo.id} className="relative">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-blue-100 ring-2 ring-blue-900 ring-offset-2">
              <Image
                src={upload.previewUrl}
                alt={upload.photo.caption}
                fill
                unoptimized
                sizes={THUMB_SIZES}
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => removeUpload(upload)}
              aria-label={`Remover ${upload.photo.caption}`}
              className="absolute top-1.5 right-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white text-blue-950 shadow ring-1 ring-blue-950/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </li>
        ))}

        <li>
          <label
            htmlFor={inputId}
            className={cn(
              "flex aspect-4/3 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-blue-950/25 text-xs font-medium text-blue-900 transition-colors hover:bg-blue-50 focus-within:ring-2 focus-within:ring-blue-900 focus-within:ring-offset-2",
              isFull && "cursor-not-allowed opacity-40 hover:bg-transparent",
            )}
          >
            <ImagePlus className="h-5 w-5" aria-hidden />
            Enviar foto
            <input
              id={inputId}
              type="file"
              accept="image/*"
              disabled={isFull}
              onChange={handleFile}
              className="sr-only"
            />
          </label>
        </li>
      </ul>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
