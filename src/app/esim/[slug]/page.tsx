"use client";

export default function ESimProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <div>{slug}</div>;
}
