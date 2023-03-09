import { Labels } from "@/function/Types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import getLabel from "../../function/GetLabel";

// 动态加载对话框
const Success = dynamic(() => import("@/components/ModalSingleAction"))


const Contact = () => {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    wechat: "",
  });
  const [showModal, setShowModal] = useState(false);
  const submitUrl =
    process.env.NEXT_PUBLIC_EZ_FORM_URL ?? "localhost:1337/api/ezforms/submit/";

  // 保存及提交表单数据
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitData = {
      formName: formData.name,
      formData: formData,
    };

    fetch(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_EZ_FORM_TOKEN}`,
      },
      body: JSON.stringify(submitData),
    })
      .then((response) => {
        // 推送通知到手机
        if (response.ok) {
          return fetch(
            `${process.env.NEXT_PUBLIC_BARK}${formData.name}/${formData.message}`
          );
        }
        throw new Error("Error:" + response.statusText);
      })
      .then(() => {
        setFormData({ name: "", email: "", message: "", wechat: "" });
        setShowModal(true);
      })
      .catch((err: Error) => {
        alert("Error:" + err.message);
        console.log("Error:", err);
      });
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {showModal && <Success />}
      <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {label.header}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {label.description}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          action={submitUrl}
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {label.name}
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="nickname"
                  required
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="wechat"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {label.wechat}
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="wechat"
                  id="wechat"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {label.email}
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {label.message}
              </label>
              <div className="mt-2.5">
                <textarea
                  onChange={handleInputChange}
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {label.button}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;

const labels: Labels = {
  "zh-CN": {
    header: "联系我",
    description: "合作、交流、咨询皆可，我会尽快回复",
    name: "称呼",
    wechat: "微信",
    email: "邮箱",
    message: "留言",
    button: "提交",
  },
  en: {
    header: "Contact Me",
    description:
      "Cooperation, communication, consultation are available, I will reply as soon as possible",
    name: "Name",
    wechat: "WeChat",
    email: "Email",
    message: "Message",
    button: "Let's talk",
  },
};
