'use client';

import { AddPostModal } from './AddPostModal';
import { SelectTinhTrangList } from './SelectTinhTrangList';
import React from 'react'
import { Dispatch, SetStateAction } from "react";
import { searchType } from './RealEstateListLayout';
// import * as z from "zod";


// const formSchema = z.object({
//   searchWord: z.string({}),
//   type: z.string({}),
//   branch: z.string({}),
//   isRent: z.string({}),
//   loaiCanHo: z.string({}),
//   loaiNhaO: z.string({}),
//   loaiVanPhong: z.string({}),
//   loaiDatDai: z.string({}),
//   huongBanCong: z.string({}),
//   huongCuaChinh: z.string({}),
//   huongDat: z.string({}),
//   soPhongNgu: z.string({}),
//   soPhongTam: z.string({}),
//   tranThai: z.string({}),
// });

type props = {
  setSearchProps: Dispatch<SetStateAction<searchType>>;
};

export function SearchBarAndCreate({ setSearchProps }: props) {
  const [tinhTrangValue, setTinhTrangValue] = React.useState();

  // 2. Define a submit handler.
  function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setSearchProps({
      searchWord: "",
      location: "",
      type: "",
      branch: "",
      isRent: "",
      loaiCanHo: "",
      loaiNhaO: "",
      loaiVanPhong: "",
      loaiDatDai: "",
      huongBanCong: "",
      huongCuaChinh: "",
      huongDat: "",
      soPhongNgu: "",
      soPhongTam: "",
      minPrice: "",
      maxPrice: "",
      minSquare: "",
      maxSquare: "",
      trangThai: tinhTrangValue,
    });
  }
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <SelectTinhTrangList setTrangThaiValue={setTinhTrangValue} onSubmit={onSubmit} />
      <AddPostModal />
    </div>
  );
}

export default SearchBarAndCreate;
