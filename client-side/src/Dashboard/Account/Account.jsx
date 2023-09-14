import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import InforMation from "./InforMation";
import Edit from "./Edit";
import View from "./View";
import { toast } from "react-hot-toast";

const Account = () => {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [axiosSecure] = UseAxiosSecure();

  const switchToEditOrUpdate = () => {
    setIsEdit((prevMode) => !prevMode);
  };

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((response) => {
        setUsers(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [axiosSecure, users]);

  const currentUser = users.find((userData) => userData?.email === user?.email);

  const handleSubmit = (event) => {
    event.preventDefault();
    const usersData = {
      name: event.target.name.value,
      occupation: event.target.occupation.value,
      dateOfBirth: event.target.dateOfBirth.value,
      gender: event.target.gender.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      about: event.target.about.value,
      nation: event.target.nation.value,
      relationship: event.target.relationship.value,
      from: event.target.from.value,
      live: event.target.live.value,
      nickname: event.target.nickname.value,
      bio: event.target.bio.value,
    };

    fetch(`http://localhost:5000/users/${currentUser._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usersData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          toast.success("User Data submitted successfully");
        } else {
          toast.error("Failed to update user data");
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="bg-white p-5 shadow rounded-xl">
        <h1 className="text-[22px] font-semibold text-gray-900 capitalize">
          <span className="text-[24px] font-bold">{user?.displayName}</span>'s
          AirBliss Account
        </h1>
      </div>
      <div className="grid lg:grid-row-3 grid-row-1 gap-8 mt-8">
        <div className=" lg:row-span-1 h-fit rounded-xl">
          <InforMation currentUser={currentUser} />
        </div>

        {/* User Personal info card */}
        <div className="bg-white shadow-md  lg:row-span-2  py-[30px] px-6 md:px-8 rounded-xl">
          <div className="flex justify-between ">
            <h1 className="lg:text-[36px] text-xl mb-7 font-semibold text-gray-900 capitalize">
              Personal Information
            </h1>
            <button className="btn btn-sm" onClick={switchToEditOrUpdate}>
              {isEdit ? "View" : "Edit"}
            </button>
          </div>
          <>
            {isEdit ? (
              <Edit handleSubmit={handleSubmit} currentUser={currentUser} />
            ) : (
              <View currentUser={currentUser} />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Account;
