"use client";

import { fetchLists } from "@/redux/features/ListSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "@/lib/axios";

export default function ListPage() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.listdata);
  const [userId, setUserId] = useState(null);
  const token = Cookies.get("token");

  const deleteList = async (id) => {
    try {
      await axios.delete(`/api/list/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const doneButton = async (id, isCompleted) => {
    try {
      await axios.patch(`/api/list/${id}`, {
        completed: !isCompleted,
      });
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const authCheck = async () => {
    if (token) {
      const decode = await jwtDecode(token);
      await setUserId(decode.id);
    }
  };

  const getList = async () => {
    try {
      await dispatch(fetchLists(userId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    await authCheck();
    if (userId !== null) {
      getList();
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <main>
      <a className="bg-inherit self-center" href="/todo-list/create">
        <button>
          <div className="bg-[#1960EA] ms-[20px] w-[180px] h-[48px] my-[20px] items-center flex justify-evenly rounded-[10px] me-[25px]">
            <div className="bg-inherit text-white text-[14px] leading-[20px]">
              Create New List
            </div>
          </div>
        </button>
      </a>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      No
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      To Do
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Due Date
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Time Created
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data, index) => {
                    return (
                      <tr
                        key={data.id}
                        className={`border-b dark:border-neutral-500 ${
                          data.completed ? "bg-green-500" : null
                        }`}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.list}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.dueDate}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.createdAt}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="bg-inherit flex justify-center">
                            <div className="bg-inherit">
                              <button>
                                <a
                                  href={`/todo-list/edit/${data.id}`}
                                  className="bg-white w-[75px] h-[35px] items-center flex justify-evenly rounded-[10px] border-2 border-[#1960EA]"
                                >
                                  <div className="bg-inherit text-[#1960EA] text-[12px] leading-[18px]">
                                    Edit
                                  </div>
                                </a>
                              </button>
                            </div>
                            <div className="bg-inherit ms-[10px]">
                              <button onClick={() => deleteList(data.id)}>
                                <a className="bg-white w-[75px] h-[35px] items-center flex justify-evenly rounded-[10px] border-2 border-[#1960EA]">
                                  <div className="bg-inherit text-[#1960EA] text-[12px] leading-[18px]">
                                    Delete
                                  </div>
                                </a>
                              </button>
                            </div>
                            <div className="bg-inherit ms-[10px]">
                              <button
                                onClick={() =>
                                  doneButton(data.id, data.completed)
                                }
                              >
                                <a className="bg-white w-[75px] h-[35px] items-center flex justify-evenly rounded-[10px] border-2 border-[#1960EA]">
                                  <div className="bg-inherit text-[#1960EA] text-[12px] leading-[18px]">
                                    Done
                                  </div>
                                </a>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
