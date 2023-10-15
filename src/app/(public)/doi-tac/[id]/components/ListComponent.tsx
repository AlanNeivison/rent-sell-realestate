"use client";
import { Button } from "@/components/ui/button";
import { useBatDongSan } from "@/hooks/useBatDongSan";
import { useState } from "react";
import { HiSortAscending } from "react-icons/hi";
import { ListItemComponent } from "../../../bat-dong-san/components/ListItemComponent";
import { Pagination } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { searchType } from "./LayoutBatDongSanCuaDoiTac";
type props = {
  searchProps: searchType | unknown;
  id: number;
};

export function ListComponent({ searchProps, id }: props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchAllBatDongSanCuaDoiTac } = useBatDongSan();
  const { data } = useQuery({
    queryKey: [
      ["bat-dong-san", currentPage],
      ["props", searchProps],
      ["iduser", id],
    ],
    queryFn: () => fetchAllBatDongSanCuaDoiTac(currentPage, searchProps, id),
    staleTime: 60 * 1000 * 1,
    keepPreviousData: true,
  });
  const ref = React.useRef(null);

  //Set page state when change review page index
  const onPageChange = (page) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentPage(page);
  };

  const [isDefault, setIsDefault] = useState(true);

  const sort = () => {
    if (isDefault) {
      data?.data.sort((a, b) => {
        return (
          new Date(b?.ngayDang).getTime() - new Date(a?.ngayDang).getTime()
        );
      });
    } else
      data?.data.sort((a, b) => {
        return (
          new Date(a?.ngayDang).getTime() - new Date(b?.ngayDang).getTime()
        );
      });
    setIsDefault((prev) => !prev);
  };
  return (
    <div ref={ref} className="mr-6">
      <div className="flex justify-between p-4 rounded-xl bg-white border-[1px] shadow-sm">
        <div className=" text-[14px] text-gray-500 flex my-auto">
          {data?.totalItems} kết quả
        </div>
        <div className="flex flex-row">
          <p className="text-[14px] text-neutral-800 flex my-auto mr-2 font-semibold">
            Sắp xếp theo ngày đăng:{" "}
          </p>
          <Button
            variant={"outline"}
            size={"sm"}
            className="bg-white text-neutral-800 text-base hover:bg-gray-100 hover:text-neutral active:scale-75 transition ease-in-out duration-200"
            onClick={sort}
          >
            <HiSortAscending />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {data?.data.map((item) => (
          <ListItemComponent item={item} />
        ))}
      </div>
      <div className="flex justify-center p-6">
        <Pagination
          showControls
          total={data?.totalPages}
          initialPage={1}
          onChange={(page) => {
            onPageChange(page);
          }}
          page={currentPage}
        />
      </div>
    </div>
  );
}
