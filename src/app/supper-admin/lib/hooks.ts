import { useState, useEffect, useCallback } from 'react';
import {
  fetchDashboardData,
  fetchPendingMembers,
  fetchMemberDetails,
  reviewMember,
} from './apiClient';
import {
  DashboardData,
  PendingMember,
  MemberDetails,
  validateDashboardData,
  validatePendingMember,
  validateMemberDetails,
} from './schemas';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook for fetching dashboard data with auto-refresh
 */
export function useDashboardData(refreshInterval: number = 30000) {
  const [state, setState] = useState<UseAsyncState<DashboardData>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const response = await fetchDashboardData();
        const validatedData = validateDashboardData(response);
        setState({ data: validatedData, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return state;
}

/**
 * Hook for fetching pending members with pagination
 */
export function usePendingMembers(
  page: number = 1,
  limit: number = 10,
  search: string = ''
) {
  const [state, setState] = useState<
    UseAsyncState<{
      members: PendingMember[];
      total: number;
      totalPages: number;
    }>
  >({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const response = await fetchPendingMembers(page, limit, search);
        const validatedMembers = response.data.map(validatePendingMember);
        setState({
          data: {
            members: validatedMembers,
            total: response.pagination?.total || 0,
            totalPages: response.pagination?.totalPages || 1,
          },
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };

    fetchData();
  }, [page, limit, search]);

  return state;
}

/**
 * Hook for fetching member details
 */
export function useMemberDetails(memberId: string | null) {
  const [state, setState] = useState<UseAsyncState<MemberDetails>>({
    data: null,
    loading: !!memberId,
    error: null,
  });

  useEffect(() => {
    if (!memberId) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const response = await fetchMemberDetails(memberId);
        const validatedDetails = validateMemberDetails(response);
        setState({ data: validatedDetails, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };

    fetchData();
  }, [memberId]);

  return state;
}

/**
 * Hook for member review actions
 */
export function useMemberReview() {
  const [state, setState] = useState<UseAsyncState<{ message: string }>>({
    data: null,
    loading: false,
    error: null,
  });

  const review = useCallback(
    async (memberId: string, action: 'approve' | 'reject', reason: string = '') => {
      try {
        setState({ data: null, loading: true, error: null });
        const response = await reviewMember(memberId, action, reason);
        setState({ data: response, loading: false, error: null });
        return true;
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
        return false;
      }
    },
    []
  );

  return { ...state, review };
}
