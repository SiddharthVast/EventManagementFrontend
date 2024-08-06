import React from 'react';
import Image from 'next/image';
import annualFunctionImg from '../../../public/AnnualFunctionImage.jpg';

interface Event {
    id: number;
    image: string;
    title: string;
    type: string;
    startTime: string;
    endTime: string;
}

const events: Event[] = [
    { id: 1, image: '', title: 'Song by Lalit', type: 'Play', startTime: '11:00 AM', endTime: '11:20 AM' },
    { id: 2, image: '/path/to/image1.jpg', title: 'Song by Lalit', type: 'Play', startTime: '11:00 AM', endTime: '11:20 AM' },
    { id: 3, image: '/path/to/image2.jpg', title: 'Speed by Director', type: 'Play', startTime: '09:30 AM', endTime: '10:30 AM' },
    { id: 4, image: '/path/to/image3.jpg', title: 'Group Dance', type: 'Play', startTime: '10:30 AM', endTime: '10:50 AM' },
    { id: 5, image: '/path/to/image4.jpg', title: 'lkjlk', type: 'Group Dance', startTime: '345', endTime: '234' },
    { id: 6, image: '/path/to/image5.jpg', title: 'lkjlhk', type: 'Songs', startTime: '345', endTime: '234' },
];

const ViewPrograms = () => {
    return (
        <div className="p-8">
            <h2 className="text-black uppercase text-2xl font-semibold mb-4 border-b-4 border-black pb-2">
                All Event Programs
            </h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-300 text-base font-semibold text-center">
                            <th className="px-6 py-3 border">ID</th>
                            <th className="px-6 py-3 border">Image</th>
                            <th className="px-6 py-3 border">Title</th>
                            <th className="px-6 py-3 border">Type</th>
                            <th className="px-6 py-3 border">Start Time</th>
                            <th className="px-6 py-3 border">End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id} className="text-center">
                                <td className="border px-6 py-3">{event.id}</td>
                                <td className="border px-6 py-3">
                                    <Image src={event.image} alt={event.title} width={50} height={50} className="object-cover mx-auto" />
                                </td>
                                <td className="border px-6 py-3">{event.title}</td>
                                <td className="border px-6 py-3">{event.type}</td>
                                <td className="border px-6 py-3">{event.startTime}</td>
                                <td className="border px-6 py-3">{event.endTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewPrograms;
