import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { apiTags, apiTagTypes } from "../../constants/tagTypes";
import { Button } from "../Button";

const categories: { key: apiTagTypes; img: string }[] = [
  { key: "ai", img: "category-ai" },
  { key: "bank", img: "category-bank" },
  { key: "cooking", img: "category-cooking" },
  { key: "e-commerce", img: "category-e-commerce" },
  { key: "economics", img: "category-economics" },
  { key: "entertainment", img: "category-entertainment" },
  { key: "environment", img: "category-environment" },
  { key: "healthcare", img: "category-healthcare" },
  { key: "language", img: "category-language" },
  { key: "social-network", img: "category-social-networks" },
  { key: "sport", img: "category-sport" },
  { key: "technology", img: "category-technology" },
  { key: "weather", img: "category-weather" },
  { key: "other", img: "category-others" },
];

export const CategoryCollection = () => {
  const { push } = useRouter();

  const CategoryButton = ({ t }: { t: { key: apiTagTypes; img: string } }) => {
    return (
      <Button
        className="!ml-0 !min-w-[140px] md:!min-w-[170px] !bg-white !text-slate-700 !p-3 md:!p-4 hover:shadow"
        label={
          <div className="flex flex-col gap-2 items-center !text-sm md:!text-base">
            <div className="h-16 w-16 p-0 rounded-full flex justify-center items-center bg-indigo-50/50 border-2 border-indigo-50">
              <img src={`/img/category/${t.img}.png`} className="h-full" />
            </div>
            {apiTags[t.key as apiTagTypes]}
          </div>
        }
        onClick={() =>
          push({ pathname: ROUTES.EXPLORE(), query: { category: t.key } })
        }
      />
    );
  };

  return (
    <div className="overflow-auto max-w-full !pb-4">
      <div className="flex flex-nowrap gap-2">
        {categories.slice(0, categories.length / 2).map((t) => (
          <CategoryButton key={t.key} t={t} />
        ))}
      </div>
      <div className="flex flex-nowrap gap-2 mt-2">
        {categories.slice(categories.length / 2).map((t) => (
          <CategoryButton key={t.key} t={t} />
        ))}
      </div>
    </div>
  );
};
