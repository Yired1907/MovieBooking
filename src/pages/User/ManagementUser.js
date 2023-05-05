import React, { useEffect, useState } from "react";
import Search from "antd/es/input/Search";
import { Button, Drawer, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getListUser,
} from "../../redux/reducer/ManagementUserSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { forIn } from "lodash";
function ManagementUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const onSearch = (value) => {
    console.log(value);
    dispatch(getListUser(value));
  };
  const { listUser } = useSelector((state) => state.ManagementUserSlice);
  useEffect(() => {
    dispatch(getListUser());
  }, []);
  // table antd
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      render: (text) => <p className="w-[100px] truncate ...">{text}</p>,
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      render: (text) => <p>{text}</p>,
      responsive: ["sm"],
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      render: (text) => <p>{text}</p>,
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <p>{text}</p>,
      responsive: ["sm"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      render: (text) => <p>{text}</p>,
      responsive: ["sm"],
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      // responsive: ["sm"],

      render: (text, record) => {
        let colors = "";
        if (text === "QuanTri") {
          colors = "green";
        } else {
          colors = "blue";
        }
        return (
          <Tag color={colors} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      width: "10%",

      render: (text, record) => {
        return (
          <div className="flex">
            <Button
              onClick={() => {
                setOpen(true);
                setUser(record);
                localStorage.setItem("USER_UPDATE", JSON.stringify(record));
              }}
              type="primary"
              className="h-[30px] bg-[#1677ff] sm:h-[40px] mr-2 w-[30px] sm:w-[40px] flex items-center justify-center"
            >
              <EditOutlined />
            </Button>

            <Button
              onClick={() => {
                dispatch(deleteUser(record.taiKhoan));
              }}
              danger
              type="primary"
              className="h-[30px] sm:h-[40px] mr-2 w-[30px] sm:w-[40px] flex items-center justify-center"
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  const data = listUser;
  const onClose = () => {
    localStorage.removeItem("USER_UPDATE");
    setOpen(false);
  };
  return (
    <div>
      <p className="text-4xl font-bold text-center">
        Quản lý tài khoản người dùng
      </p>
      <div className="max-w-[500px] bg-[#1677ff] my-6 rounded-lg mx-auto ">
        <Search
          placeholder="Tìm người dùng theo tên tài khoản "
          allowClear
          enterButton="Search"
          size="large"
          onChange={(e) => {
            setSearch(e.target.value);

            // searchRef.current = setTimeout(() => {
            //   setSearch(e.target.value);
            // }, 6000);
          }}
          value={search}
          onSearch={onSearch}
        />
      </div>
      <Button
        type="primary "
        onClick={() => {
          setOpen(true);
          localStorage.setItem("USER_UPDATE", JSON.stringify("addNew"));

          setUser(" ");
        }}
        className="mb-4"
        ghost
      >
        Thêm người dùng
      </Button>
      <Drawer
        // title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <ProfileForm onClose={onClose} infoUserUpdate={user} />
      </Drawer>
      <div className="w-full">
        <Table
          className="w-full"
          columns={columns}
          dataSource={data}
          rowKey={"taiKhoan"}
        />
      </div>
    </div>
  );
}

export default ManagementUser;
