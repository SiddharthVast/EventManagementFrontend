import Image from "next/image";
import AdminSummerImage from '../../../public/JpgAdminSummerImage.jpg'; // Make sure to save your images in the public folder
import SecondImage from '../../../public/AdminMusicNightImage.jpg'; // Replace with your second image

const AddEvent = () => {
    return (
        <div className="bg-gray-100 min-h-screen ">
            <div className="flex justify-center items-start p-8 pt-20"> {/* Added margin-top here */}
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 flex">
                    <div className="w-2/3">
                        <h2 className="text-2xl font-semibold text-red-500 mb-6">EVENT REGISTRATION</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Event Title</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Event Theme</label>
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option>Please Select</option>
                                    {/* Add your event themes here */}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Event Venue</label>
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option>Please Select</option>
                                    {/* Add your event statuses here */}
                                </select>
                            </div>
                            {/* <div className="flex justify-between mb-4"> */}
                            {/* <div className="w-1/2 pr-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Minimum Guest</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        placeholder="Enter minimum"
                                    />
                                </div> */}
                            {/* <div className="w-1/2 pl-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Maximum Guest</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        placeholder="Enter maximum"
                                    />
                                </div> */}
                            {/* </div> */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Event Start Date</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="datetime-local"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Event End Date</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="datetime-local"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Photo</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="file"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter description"
                                    rows={4}
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" type="button">
                                    Submit
                                </button>
                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="reset">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="w-1/3 ml-4">
                        <Image
                            src={AdminSummerImage}
                            className="w-full h-auto object-cover"
                            alt="Event Poster"
                        />
                        <Image
                            src={SecondImage}
                            className="w-full h-auto object-cover mt-4"
                            alt="Second Event Poster"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEvent;
