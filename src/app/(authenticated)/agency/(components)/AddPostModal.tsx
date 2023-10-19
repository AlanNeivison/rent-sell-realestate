'use client';

import { Button } from '@/components/ui/button';

import React from 'react';
import DialogCustom from '@/components/ui/dialogCustom';
// import { Label } from '@/components/ui/label';
import { SelectDanhMuc } from './SelectDanhMuc';
import { BaiVietForm } from './(addPost)/BaiVietForm';
import { getRequest } from '@/lib/fetch';
import { useSession } from 'next-auth/react';
import { MuaLeModal } from '../goi-dich-vu/MuaLeModal';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
// import * as z from 'zod';

// const formSchema = z.object({});
export const AddPostModal = () => {
  const [open, setOpen] = React.useState(false);
  const [danhMucValue, setDanhMucValue] = React.useState(null);
  const [thue, setThue] = React.useState(false);
  const [ban, setBan] = React.useState(false);
  const [isMuaLeModalOpen, setIsMuaLeModalOpen] = React.useState(false);
  const session = useSession();
  const { queryUser } = useAuth();

  const { data: user, refetch: refetchUser } = queryUser(session);

  return (
    <div className="w-full h-full">
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Đăng tin bất động sản
      </Button>

      {open ? (
        <DialogCustom
          className="w-full lg:w-[60%] h-[80%] lg:h-[95%] flex items-center justify-center"
          setIsModalOpen={setOpen}
          isModalOpen={open}
          warningOnClose={true}
          callBack={() => {
            setThue(false);
            setBan(false);
            setDanhMucValue(null);
          }}
        >
          <div className="flex flex-col gap-y-6 w-full h-full px-1">
            <div className="flex flex-row justify-between items-center">
              <div className="text-lg font-bold">Đăng tin bất động sản</div>
              <div className="text-sm font-bold text-gray-400">
                {user?.name}
              </div>
            </div>
            <div className="w-full h-full">
              <div className=" mb-3 sm:max-w-lg ">
                <p>
                  Bạn hiện có{' '}
                  <span className="font-bold text-red-500"> {user?.luot}</span>{' '}
                  lượt đăng bài viết.
                </p>
              </div>
            </div>

            {user?.luot > 0 ? (
              <>
                <div className="flex flex-col space-y-3">
                  <div className="font-bold text-sm">Thông tin chung</div>
                  <SelectDanhMuc
                    setThue={setThue}
                    setBan={setBan}
                    thue={thue}
                    ban={ban}
                    setDanhMucValue={setDanhMucValue}
                  />
                </div>
                {danhMucValue && (thue || ban) ? (
                  <BaiVietForm
                    setIsMuaLeModalOpen={setIsMuaLeModalOpen}
                    danhMucValue={danhMucValue}
                    isChoThue={thue}
                    setOpen={setOpen}
                  />
                ) : null}
              </>
            ) : (
              <>
                <div className="font-bol text-sm text-red-500">
                  Bạn đã hết lượt đăng bài viết, vui lòng mua thêm lượt.
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <Button
                    onClick={() => {
                      setIsMuaLeModalOpen(true);
                    }}
                    className="w-[60%]"
                  >
                    Mua ngay
                  </Button>
                </div>
              </>
            )}
          </div>
          {isMuaLeModalOpen ? (
            <MuaLeModal
              isModalOpen={isMuaLeModalOpen}
              setIsModalOpen={setIsMuaLeModalOpen}
              isChild={true}
              callback={async () => {
                setIsMuaLeModalOpen(false);
                setTimeout(() => {
                  refetchUser();
                }, 2000); //2000 is 2 seconds
              }}
            />
          ) : null}
        </DialogCustom>
      ) : null}
    </div>
  );
};
