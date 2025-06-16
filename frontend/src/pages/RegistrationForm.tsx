import React, { useState } from "react";
import Input from "../components/Input/Input";
import { createUser } from "../services/userServices";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    birthdate:null,
    conf_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Add this line

    if (formData.password != formData.conf_password) {
      alert("Password is not same");
      return;
    }
    try {
      const user = await createUser({
        name: `${formData.lname}, ${formData.fname} ${formData.mname}`,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        birthdate: formData.birthdate
      });

      console.log("User created: ", user);
    } catch (err: any) {
      if (err.response) {
        console.error("Backend validation error:", err.response.data); // ✅ Inspect actual error
      } else {
        console.error("Error Creating User: ", err);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
            SMART PARKING SYSTEM
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="bg-primary"></div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-active md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Input
                    id="fname"
                    name="fname"
                    type="text"
                    required={false}
                    label="First Name"
                    value={formData.fname}
                    onChange={handleChange}
                  />

                  <Input
                    id="mname"
                    name="mname"
                    type="text"
                    required={false}
                    label="Middle Name"
                    value={formData.mname}
                    onChange={handleChange}
                  />

                  <Input
                    id="lname"
                    name="lname"
                    type="text"
                    required={false}
                    label="Last Name"
                    value={formData.lname}
                    onChange={handleChange}
                  />

                  <Input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    required={true}
                    label="Birthdate"
                    value={formData.birthdate || ""}
                    onChange={handleChange}
                  />

                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required={false}
                    label="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />

                  <Input
                    id="email"
                    name="email"
                    type="text"
                    required={false}
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required={false}
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <Input
                    id="conf_password"
                    name="conf_password"
                    type="password"
                    required={false}
                    label="Confirm Password"
                    value={formData.conf_password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistrationForm;
