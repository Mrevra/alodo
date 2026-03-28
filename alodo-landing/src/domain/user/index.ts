export type DomainUser = {
  id: string;
  phone: string;
  /** Archetype métier — corresponds to the `type` column in Supabase `profiles` */
  type?: "vendeur" | "artisan" | "transformateur" | "prestataire";
};
