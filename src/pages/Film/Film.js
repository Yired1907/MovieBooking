import { Button, Table } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListFilm } from "../../redux/reducer/ManagementFilmSlice";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteFilm } from "../../redux/reducer/ManagementFilmSlice";
function Film() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { listFilmDefault } = useSelector((state) => state.ManagementFilmSlice);
  useEffect(() => {
    dispatch(getListFilm());
  }, []);
  const searchRef = useRef(null);
  const onSearch = (value) => {
    dispatch(getListFilm(value));
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  console.log(search);

  const columns = [
    {
      title: "Mã Phim",
      width: "10%",

      dataIndex: "maPhim",
      // sorter: (a, b) => a.maPhim - b.maPhim,
      //   sortOrder: "descend ",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",

      width: "30%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text, record) => {
        return <img className="w-[50px] h-[70px]" src={text} alt="" />;
      },
      responsive: ["sm"],
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text) => {
        return <p className="w-[400px] truncate ...">{text}</p>;
      },
      responsive: ["lg"],
    },
    {
      width: "10%",

      title: "",
      dataIndex: "",
      render: (text, record) => {
        return (
          <div className="flex">
            <Button
              size="default"
              onClick={() => {
                navigate(`edit/${record.maPhim}`);
              }}
              className="h-[30px] sm:h-[40px] bg-[#1677ff] mr-2 w-[30px] sm:w-[40px] flex items-center justify-center"
              type="primary"
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteFilm(record.maPhim));
                  }
                });
              }}
              size="default"
              className="h-[30px] sm:h-[40px] mr-2 w-[30px] sm:w-[40px] flex items-center justify-center"
              danger
              type="primary"
            >
              <DeleteOutlined />
            </Button>
            <Button
              size="default"
              onClick={() => {
                navigate(`show-time/${record.maPhim}/${record.tenPhim}`);
                localStorage.setItem("filmDetail", JSON.stringify(record));
              }}
              className="h-[30px] sm:h-[40px] bg-[#7AA874] w-[30px] sm:w-[40px] flex items-center justify-center"
              type="primary"
            >
              <CalendarOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  const data = listFilmDefault;
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Quản lý phim</h1>
      <div className="max-w-[500px] bg-[#1677ff] my-6 rounded-lg mx-auto ">
        <Search
          placeholder="Tìm phim"
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
          navigate("/admin/film/add-new");
        }}
        className="mb-4"
        ghost
      >
        Thêm Phim
      </Button>
      <div className="">
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          rowKey={"maPhim"}
        />
      </div>
    </>
  );
}

export default Film;
