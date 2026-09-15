// API Response validation and formatting utilities

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Validates API response structure and type
 * @param response - The API response to validate
 * @returns Validated response or throws error
 */
export function validateApiResponse<T>(response: any): ApiResponse<T> {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response format: expected object');
  }

  if (typeof response.success !== 'boolean') {
    throw new Error('Invalid response format: missing success field');
  }

  if (!response.success && !response.message && !response.error) {
    throw new Error('API request failed without error message');
  }

  return response;
}

/**
 * Handles API request with error handling
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @returns Parsed JSON response
 */
export async function fetchApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return validateApiResponse<T>(data).data || data;
  } catch (error) {
    console.error(`[API Error] ${url}:`, error);
    throw error;
  }
}

/**
 * Fetch dashboard statistics
 */
export async function fetchDashboardData() {
  return fetchApi('/api/super-admin/dashboard');
}

/**
 * Fetch pending members list with pagination
 * @param page - Page number (1-indexed)
 * @param limit - Items per page (max 100)
 * @param search - Search term for filtering
 * @param level - Optional level filter
 * @param status - Member status filter (default: 'Pending')
 * @returns Members list with pagination info
 */
export async function fetchPendingMembers(
  page: number = 1,
  limit: number = 10,
  search: string = '',
  level?: number,
  status: string = 'Pending'
) {
  // Validate parameters
  if (page < 1) page = 1;
  if (limit < 1) limit = 10;
  if (limit > 100) limit = 100;

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    status,
    ...(level && { level: level.toString() }),
  });

  const response = await fetchApi<any>(`/api/super-admin/members/pending?${params.toString()}`);
  
  if (!response.success || !response.data) {
    throw new Error('Invalid response format from pending members endpoint');
  }

  return response;
}

/**
 * Fetch member details by ID
 * Includes KYC, bank, and referral information
 * @param memberId - The member ID to fetch details for
 * @returns Complete member details object
 */
export async function fetchMemberDetails(memberId: string) {
  if (!memberId || typeof memberId !== 'string') {
    throw new Error('Invalid member ID');
  }

  const response = await fetchApi<any>(`/api/super-admin/members/${memberId}`);
  
  if (!response.success || !response.data) {
    throw new Error('Failed to fetch member details');
  }

  return response.data;
}

/**
 * Review member (approve/reject)
 */
export async function reviewMember(
  memberId: string,
  action: 'approve' | 'reject',
  reason: string = ''
) {
  return fetchApi<{ message: string }>('/api/super-admin/members/pending', {
    method: 'POST',
    body: JSON.stringify({ memberId, action, reason }),
  });
}

/**
 * Logout super admin
 */
export async function logoutSuperAdmin() {
  return fetchApi('/supper-admin/api/auth/logout', {
    method: 'POST',
  });
}
