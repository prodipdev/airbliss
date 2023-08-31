import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { toast } from 'react-hot-toast';
import AllUsers from './AllUsers';


const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [axiosSecure] = UseAxiosSecure()
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserRole, setSelectedUserRole] = useState("");
    const [selectedUserStatus, setSelectedUserStatus] = useState("");

    useEffect(() => {
        axiosSecure.get('/users')
            .then(response => {
                setUsers(response?.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [axiosSecure]);


    const handleModalOpen = (userId, role, status) => {
        setSelectedUserId(userId);
        setSelectedUserRole(role);
        setSelectedUserStatus(status);
        window.my_modal_3.showModal();
    };


    const currentUser = users.map(userData => userData?._id)
    console.log(currentUser);

    const handleSubmit = (event) => {
        event.preventDefault();
        const usersData = {
            role: event.target.role.value,
            status: event.target.status.value,
        };
        console.log(usersData);

        if (selectedUserId) {
            fetch(`http://localhost:5000/users/${selectedUserId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usersData }), // Use usersData instead of formData
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.acknowledged === true) {
                        toast.success('User Data submitted successfully');
                        setUsers((prevUsers) =>
                            prevUsers.map((user) =>
                                user._id === selectedUserId
                                    ? { ...user, role: usersData.role, status: usersData.status }
                                    : user
                            )
                        );
                    } else {
                        toast.error('Failed to update user data');
                    }
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(selectedUserId);
            console.log(usersData);
        }
    };




    return (
        <div className='lg:mt-10'>
            <h1 className='lg:text-[36px] lg:ml-6 text-xl mb-7 font-semibold text-gray-900 capitalize'>Manage User's Information</h1>
            <div className="overflow-x-auto mx-1 lg:mx-7 mt-[50px] px-10 py-5 rounded-xl bg-white">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Occupation</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <AllUsers
                                key={user._id}
                                user={user}
                                index={index}
                                handleModalOpen={handleModalOpen}
                            ></AllUsers>)
                        }
                    </tbody>
                </table>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form
                            method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit}>
                            <h1 className='text-xl font-semibold mb-3 text-gray-950'>
                                Change the user role and status
                            </h1>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <label htmlFor="role" className="block mb-2 font-semibold text-[#222] text-[18px]">
                                        Role:
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                        value={selectedUserRole}
                                        onChange={(e) => setSelectedUserRole(e.target.value)}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="status" className="block mb-2 font-semibold text-[#222] text-[18px]">
                                        Status:
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                        value={selectedUserStatus}
                                        onChange={(e) => setSelectedUserStatus(e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="normal">Normal</option>
                                        <option value="ban">Ban</option>
                                    </select>
                                </div>
                            </div>
                            <input
                                className='btn bg-cyan-500 px-8 py-4 text-white rounded-md mt-5 border-2 hover:border-cyan-500 border-cyan-500 hover:bg-transparent hover:text-cyan-500'
                                type="submit"
                                value="Update"
                            />
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ManageUsers;