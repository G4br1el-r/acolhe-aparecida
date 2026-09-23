import type { User } from "@/@types/Modules/Conta/user";
import type { ProfileFormValues } from "@/schemas/Modules/Conta/profile";

export function toProfileFormValues(user: User): ProfileFormValues {
  return {
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    city: user.address.city,
    state: user.address.state as ProfileFormValues["state"],
    birthDate: user.birthDate ?? "",
  };
}
