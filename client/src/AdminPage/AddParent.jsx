import { useState } from "react";
import { setParent } from "../redux/parentSlice";
import { serverUrl } from "../main";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setActive } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

function AddParent() {
  const [searchQuery, setSearchQuery] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [occupation, setOccupation] = useState("");
  let [address, setAddress] = useState("");
  let [loading, setLoading] = useState(false);
  let [searchResult, setSearchResult] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/parent/admin/create/profile`,
        { name, email, password, occupation, address },
        { withCredentials: true },
      );
      
      dispatch(setParent(result.data));
      navigate("/");
      dispatch(setActive("Parents"));
      toast.success("Parent added");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handelSearchParent = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${serverUrl}/api/parent/search`, {
        params: { query: searchQuery },
        withCredentials: true, 
      });
      setNotFound(false);
      setSearchResult(result.data);
      dispatch(setParent(result.data));
      toast.success("Found ✅");
    } catch (error) {
      setSearchResult(null);
      setNotFound(true);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ✅ Left: Search Parent */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Search Parent
          </h2>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Search by name / email / phone
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="e.g. Rahul / rahul@gmail.com / 9876543210"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <button
              onClick={() => {
                handelSearchParent();
              }}
              className="rounded-xl cursort-pointer bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          {/* ✅ Search Result UI (Demo Card) */}
          {searchResult && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-900">
                🔍 Search Result
              </p>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Parent Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {searchResult?.userId?.name || "Parent Name"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {searchResult?.userId?.email || "Parent Email"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Occupation</p>
                  <p className="text-sm font-medium text-gray-900">
                    {searchResult?.occupation || "Parent Occupation"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-900">
                    {searchResult?.address.split(" ")[0] || "Parent Occupation"}
                  </p>
                </div>
              </div>

              <button className="mt-4 w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">
                Select Parent
              </button>
            </div>
          )}

          {/* Not Found UI */}
          {notFound && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-700">
                ❌ Parent not found
              </p>
              <p className="mt-1 text-xs text-red-600">
                Create a new parent from the form on the right side.
              </p>
            </div>
          )}
        </div>

        {/* ✅ Right: Create Parent */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Create New Parent
            </h2>
          </div>

          <form
            onSubmit={handleAdminSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter parent full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                This password will be used for parent login.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                placeholder="Set a password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                This password will be used for parent login.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Occupation
              </label>
              <input
                type="text"
                placeholder="e.g. Business / Teacher"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 mt-2 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="w-full rounded-xl cursor-pointer bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {loading ? (
                  <ClipLoader color="white" size={30} />
                ) : (
                  "Create Parent"
                )}
              </button>
            </div>

            {/* Small Footer Note */}
            <p className="md:col-span-2 text-xs text-gray-500">
              Tip: After creating parent, you can link them to a student from
              student admission form.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddParent;
