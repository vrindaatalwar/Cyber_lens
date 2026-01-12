export type OwnerType = "anonymous" | "user";

export interface OwnerContext {
  type: OwnerType;
  id: string;
}
