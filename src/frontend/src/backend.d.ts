import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RegistrationForm {
    major: string;
    interests: string;
    name: string;
    year: string;
    email: string;
    university: string;
    skillLevel: string;
    phone: string;
}
export interface backendInterface {
    getAllRegistrations(): Promise<Array<RegistrationForm>>;
    getAnalytics(): Promise<{
        totalRegistrations: bigint;
    }>;
    submitRegistration(form: RegistrationForm): Promise<void>;
}
