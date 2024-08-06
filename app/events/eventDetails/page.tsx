import Image from 'next/image';
import Link from 'next/link';
import annualFunctionImg from '../../../public/AnnualFunctionImage.jpg';

const EventDetails = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-black">DETAILS OF EVENT ANNUAL FUNCTION</h1>
            <div className="border-b-2 border-gray-300 mb-4 relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-white px-2"> </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full md:w-1/3">
                    <Image src={annualFunctionImg} alt="Annual Function" layout="responsive" objectFit="cover" />
                </div>
                <div className="w-full md:w-2/3">
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2 font-bold">Name</td>
                                <td className="p-2">Annual Function <Link href="/events/eventDetails/viewPrograms" legacyBehavior><a className="text-blue-500">(View Programs)</a></Link></td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-bold">Date</td>
                                <td className="p-2">15 September, 2024</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-bold">Theme</td>
                                <td className="p-2">Fun Event</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-bold">Status</td>
                                <td className="p-2">New</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-bold">Minimum Guest Allowed</td>
                                <td className="p-2">100 Guests</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-bold">Maximum Guest Allowed</td>
                                <td className="p-2">300 Guests</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-bold">Description</td>
                                <td className="p-2">Annual Function</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link href="/login">
                        <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded">Login to Join</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
