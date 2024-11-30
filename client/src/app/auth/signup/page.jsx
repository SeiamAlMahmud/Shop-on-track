import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'


const signup = () => {
    return (
        <div className='flex mx-auto mt-7'>
            <Tabs defaultValue="customer" className="w-[800px] dlex mx-auto">
                <TabsList className="flex flex-wrap mx-auto w-auto gap-1">
                    <TabsTrigger value="customer" className="px-6">Customer</TabsTrigger>
                    <TabsTrigger value="seller" className="px-6">Seller</TabsTrigger>
                    <TabsTrigger value="Courier" className="px-6">Courier</TabsTrigger>
                </TabsList>
                
                <div className='w-full'>
                    <TabsContent value="customer">
                        <div className="w-full mx-auto font-[sans-serif] p-6">
                            <div className="text-center mb-16 w-full">
                                <h4 className="text-gray-800 text-base font-semibold mt-2 ">Sign up into your customer account</h4>
                            </div>

                            <form>
                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                                        <input name="name" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                                        <input name="lname" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                                        <input name="email" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
                                        <input name="number" type="number" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                        <input name="password" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                        <input name="cpassword" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" />
                                    </div>
                                </div>

                                <div className="!mt-12">
                                    <button type="button" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </TabsContent>
                    <TabsContent value="seller">
                        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
                            <div className="text-center mb-16">

                                <h4 className="text-gray-800 text-base font-semibold mt-2">Sign up into your seller account</h4>
                            </div>

                            <form>
                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                                        <input name="name" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                                        <input name="lname" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                                        <input name="email" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
                                        <input name="number" type="number" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                        <input name="password" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                        <input name="cpassword" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" />
                                    </div>
                                </div>

                                <div className="!mt-12">
                                    <button type="button" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </TabsContent>
                    <TabsContent value="Courier">
                        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
                            <div className="text-center mb-16">

                                <h4 className="text-gray-800 text-base font-semibold mt-2">Sign up into your  Courier account</h4>
                            </div>

                            <form>
                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                                        <input name="name" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                                        <input name="lname" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                                        <input name="email" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
                                        <input name="number" type="number" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                        <input name="password" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                        <input name="cpassword" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" />
                                    </div>
                                </div>

                                <div className="!mt-12">
                                    <button type="button" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>


        </div>
    )
}


export default signup