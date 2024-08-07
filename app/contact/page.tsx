import React from 'react';
import whereToFindUs from '../../public/WhereToFindUs.jpg'
import Image from 'next/image';

const ContactUs = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-left">Contact Us</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Company</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Phone</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={5}
                                ></textarea>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Submit
                                </button>
                                <button
                                    type="reset"
                                    className="w-1/2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-left">Where to Find Us</h2>
                        <div className="mb-4">
                            <Image
                                src={whereToFindUs}
                                alt="Map"
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                        <div>
                            <p className="text-sm mb-4">Get in touch</p>
                            <p className="text-sm mb-4">
                                You will find us offices sitting right in the town centre in the middle of Guildford, Surrey.
                            </p>
                            <address className="text-sm not-italic mb-4">
                                171 abc Street<br />
                                Lipsum<br />
                                Lorem<br />
                                GUS 3AB
                            </address>
                            <p className="text-sm mb-4">+44 (0)2563 586215</p>
                            <p className="text-sm">info@lipsum.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
