import Image from 'next/image';
import annualFunctionImg from '../../public/AnnualFunctionImage.jpg';
import freshersPartyImg from '../../public/FreshersPartyImg.png';
import jobSeminarImg from '../../public/JobSeminarImg.jpg';
import sportsEventImg from '../../public/SportsEventImg.jpg'
import hackathonsEventImg from '../../public/HackathonsEventImg.jpg'
import Link from 'next/link';

const Events = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-black">ALL AVAILABLE EVENTS</h1>
            <div className="border-b-2 border-gray-300 mb-4 relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-white px-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* First Row of Cards */}
                <div className="border rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-80 relative">
                        <Image src={annualFunctionImg} alt="Annual Function" layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Annual Function</h2>
                        <Link href="/events/eventDetails" legacyBehavior>
                            <a className="text-blue-500">Read More</a>
                        </Link>
                    </div>
                </div>
                <div className="border rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-80 relative">
                        <Image src={freshersPartyImg} alt="Freshers Party" layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Freshers Party</h2>
                        <Link href="/events/eventDetails" legacyBehavior>
                            <a className="text-blue-500">Read More</a>
                        </Link>
                    </div>
                </div>
                <div className="border rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-80 relative">
                        <Image src={jobSeminarImg} alt="Job Seminar" layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Job Seminar</h2>
                        <Link href="/events/eventDetails" legacyBehavior>
                            <a className="text-blue-500">Read More</a>
                        </Link>
                    </div>
                </div>
                {/* Second Row of Cards */}
                <div className="border rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-80 relative">
                        <Image src={sportsEventImg} alt="Sports Event" layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Sports Event</h2>
                        <Link href="/events/eventDetails" legacyBehavior>
                            <a className="text-blue-500">Read More</a>
                        </Link>
                    </div>
                </div>
                <div className="border rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-80 relative">
                        <Image src={hackathonsEventImg} alt="Hackathon Event" layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Hackathon Event</h2>
                        <Link href="/events/eventDetails" legacyBehavior>
                            <a className="text-blue-500">Read More</a>
                        </Link>
                    </div>
                </div>
                {/* <div className="border rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-80 relative">
                        <Image src={jobSeminarImg} alt="Job Seminar" layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Job Seminar</h2>
                        <Link href="/events/eventDetails" legacyBehavior>
                            <a className="text-blue-500">Read More</a>
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>

    );
};

export default Events;
