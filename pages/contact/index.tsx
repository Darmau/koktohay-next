import { useRouter } from 'next/router';
import { useState } from 'react';
import { Labels } from '@/types/default'
import getLabel from '../api/translation';
import ModalSingleAction from '@/components/ModalSingleAction';

const labels: Labels = {
  'zh-CN': {
    header: '联系我',
    description: '合作、交流、咨询皆可，我会尽快回复',
    name: '称呼',
    wechat: '微信',
    email: '邮箱',
    message: '留言',
    button: '提交',
  },
  'en': {
    header: 'Contact Me',
    description: 'Cooperation, communication, consultation are available, I will reply as soon as possible',
    name: 'Name',
    wechat: 'WeChat',
    email: 'Email',
    message: 'Message',
    button: 'Let\'s talk',
  }
}

const Contact = () => {
  const { locale } = useRouter();
  const label = getLabel(labels, locale)
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const submitUrl = process.env.NEXT_PUBLIC_EZ_FORM_URL ?? 'localhost:1337/api/ezforms/submit/'

  // 保存及提交表单数据
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitData = {
      'formName': 'Contact',
      'formData': formData,
    }
    fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    }).then(() => { 
      setFormData({});
      setShowModal(true)
     })
      .catch((err: Error) => {
        alert('Error:' + err.message)
      })
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <>
      {showModal && <ModalSingleAction />}
      <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
        {/* 背景图案 */}
        {/* <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div> */}

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{label.header}</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {label.description}
          </p>
        </div>
        <form onSubmit={handleSubmit} action={submitUrl} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                {label.name}
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="nickname"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="wechat" className="block text-sm font-semibold leading-6 text-gray-900">
                {label.wechat}
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="wechat"
                  id="wechat"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                {label.email}
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                {label.message}
              </label>
              <div className="mt-2.5">
                <textarea
                  onChange={handleInputChange}
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {label.button}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Contact