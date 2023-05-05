import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import HistoryBooking from "../../components/HistoryBooking/HistoryBooking";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const onChange = (key) => {
  console.log(key);
};

function Profile() {
  let { infoUserUpdate } = useSelector((state) => state.ManagementUserSlice);
  const items = [
    {
      key: "1",
      label: <p className="text-2xl">Thông tin cá nhân</p>,
      children: (
        <div className="w-full">
          <div className=" bg-[#ECF2FF] w-full p-2  sm:w-[70%] mx-auto rounded-lg py-5  ">
            <ProfileForm infoUserUpdate={infoUserUpdate} />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <p className="text-2xl">Lịch sử đặt vé</p>,
      children: (
        <div className=" bg-[#ECF2FF] mx-auto p-5 rounded-lg ">
          <dl className="grid max-w-2xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            <HistoryBooking infoUserUpdate={infoUserUpdate} />
          </dl>
        </div>
      ),
    },
  ];
  return (
    <div className=" mt-[6rem]  mb-4 ">
      <Tabs
        className="text-white  p-10"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}

export default Profile;
