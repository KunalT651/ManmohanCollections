export const metadata = {
  title: "Manmohan Collections",
  description: "Explore Indian art and puja essentials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
