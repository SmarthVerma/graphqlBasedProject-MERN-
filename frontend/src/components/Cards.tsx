import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Transaction } from "@/graphql/types";


type Test = { transactions: Transaction[] } | undefined;

export function Cards({ cardData }: { cardData: Test }) {
  if (!cardData) return null; // filter out undefined here

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={cardData.transactions} /> {/* non-null assertion */}
    </div>
  );
}

