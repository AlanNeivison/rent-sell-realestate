import React from "react";
import { getSession } from "@/lib/auth";
import Header from "./(components)/Header";
import { Sidebar } from "./(components)/Sidebar";
import { redirect } from "next/navigation";
import AgencyRegisterModal from "./(components)/AgencyRegisterModal";
import { Footer } from "@/components/footer";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { CiCoinInsert, CiUser } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

const navItems = [
  {
    title: "Bất động sản của tôi",
    value: "/",
    icon: <HiOutlineBuildingOffice2 className="w-5 h-5" />,
  },
  {
    title: "Hồ sơ đối tác",
    value: "profile",
    icon: <CiUser className="w-5 h-5" />,
  },
  {
    title: "Dịch vụ",
    value: "goi-dich-vu",
    icon: <CiCoinInsert className="w-5 h-5" />,
  },
  // Add more items as needed
];
export default async function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  if (session?.user?.duyetKhachHang == "da_duyet") {
    return (
      <div className="w-full h-full bg-slate-50">
        <Header session={session} />
        {/* <Header session={session}/> */}
        <div className="flex flex-col lg:flex-row justify-between h-full ">
          <AgencyRegisterModal session={session} />
          <Sidebar
            navItems={navItems}
            title="Navigation"
            className="w-full lg:basis-1/4 bg-white shadow-md"
          />
          <div className="flex-1 w-full h-full min-h-screen bg-slate-50">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center text-red-400 text-xl mt-6">
        <MdOutlineCancel /> Tài khoản khách hàng của bạn cần được duyệt để sử
        dụng chức năng này
      </div>
    );
  }
}
