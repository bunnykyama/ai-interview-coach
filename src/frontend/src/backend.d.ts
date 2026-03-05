import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface DashboardStats {
    improvementRate: bigint;
    averageConfidence: bigint;
    totalInterviews: bigint;
    averageScore: bigint;
}
export interface UserProfile {
    displayName: string;
    email: string;
}
export interface InterviewSession {
    overallScore: bigint;
    jobRole: string;
    feedback: string;
    confidenceScore: bigint;
    timestamp: Time;
    technicalScore: bigint;
    communicationScore: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createInterviewSession(session: InterviewSession): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardStats>;
    getInterviewSessions(): Promise<Array<InterviewSession>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInterviewSessions(): Promise<void>;
}
