"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function SuperAdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('super_admin_logged_in') === 'true';
    
    if (isLoggedIn) {
      // Redirect to pending review if already logged in
      router.push('/supper-admin/PendingReview');
    } else {
      // Redirect to login if not logged in
      router.push('/supper-admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader size={32} className="animate-spin text-[#eab900]" />
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
