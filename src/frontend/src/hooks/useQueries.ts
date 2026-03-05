import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  DashboardStats,
  InterviewSession,
  UserProfile,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetDashboardStats() {
  const { actor, isFetching } = useActor();
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) {
        return {
          totalInterviews: BigInt(0),
          averageScore: BigInt(0),
          averageConfidence: BigInt(0),
          improvementRate: BigInt(0),
        };
      }
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetInterviewSessions() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<InterviewSession>>({
    queryKey: ["interviewSessions"],
    queryFn: async () => {
      if (!actor) return [];
      const sessions = await actor.getInterviewSessions();
      if (sessions.length === 0) {
        await actor.seedInterviewSessions();
        return actor.getInterviewSessions();
      }
      return sessions;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}
