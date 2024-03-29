import React from "react";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { Block } from "components";
import { Loading } from "components/UI";
import { menuKeys } from "constants/queryKeys";
import { MenuService } from "services/MenuService";

export const Menu: React.FC = () => {
  const { id } = useParams();

  const { data: menu, isLoading } = useQuery({
    queryKey: menuKeys.detail(id as string),
    queryFn: () => MenuService.getPublic(id as string),
    select: (data) => ({
      ...data,
      blocks: data.blocks?.sort((a, b) => a.place - b.place),
    }),
  });

  return (
    <Loading loading={isLoading}>
      <div className="flex h-screen flex-col items-center pt-4">
        {menu?.image && (
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src={menu?.image || ""} alt={menu?.title} />
            </div>
          </div>
        )}

        {menu?.title && <h2 className="text-xl font-bold">{menu.title}</h2>}

        {menu?.description && <p className="text-md">{menu.description}</p>}

        <div className="my-6 w-full max-w-3xl">
          {menu?.blocks?.map((block) => (
            <Block
              key={block.id}
              separatorClassName="hover:bg-transparent"
              data={block}
            />
          ))}
        </div>

        {menu?.footer && <p className="text-md mb-4">{menu.footer}</p>}
      </div>
    </Loading>
  );
};
