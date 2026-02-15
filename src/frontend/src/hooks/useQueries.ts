import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { RegistrationForm } from '../backend';

export function useSubmitRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: RegistrationForm) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitRegistration(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

export function useGetAllRegistrations() {
  const { actor, isFetching } = useActor();

  return useQuery<RegistrationForm[]>({
    queryKey: ['registrations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRegistrations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAnalytics() {
  const { actor, isFetching } = useActor();

  return useQuery<{ totalRegistrations: bigint }>({
    queryKey: ['analytics'],
    queryFn: async () => {
      if (!actor) return { totalRegistrations: BigInt(0) };
      return actor.getAnalytics();
    },
    enabled: !!actor && !isFetching,
  });
}
