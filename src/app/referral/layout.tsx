import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Program | MBD - Born to Win",
  description:
    "Join MBD referral program. Refer friends, grow your network, complete levels, and earn exclusive rewards.",
  keywords: [
    "referral program",
    "earn money",
    "referral rewards",
    "network growth",
  ],
};

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}