import Image from "next/image";
import SummerPartyImage from "../../public/SummerPartyImage.jpg";
import RevelationImage from "../../public/RevelationImage.jpg";

const About = () => {
  return (
    <div className="bg-white-100 min-h-screen container mx-auto pt-28">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4 text-left">
            College Event Management System
          </h1>
          <div className="border-b-2 border-gray-300 mb-4 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-white px-2"></div>
          </div>
          <p className="mb-4">
            Event management is the application of project management to the
            creation and development of large scale events such as festivals,
            conferences, ceremonies, weddings, formal parties, concerts, or
            conventions. It involves studying the brand, identifying its target
            audience, devising the event concept, and coordinating the technical
            aspects before actually launching the event.
          </p>
          <p className="mb-4">
            The process of planning and coordinating the event is usually
            referred to as event planning and which can include budgeting,
            scheduling, site selection, acquiring necessary permits,
            coordinating transportation and parking, arranging for speakers or
            entertainers, arranging decor, event security, catering,
            coordinating with third party vendors, and emergency plans. Each
            event is different in its nature so process of planning & execution
            of each event differs on basis of type of event.
          </p>
          <p className="mb-4">
            The events industry now includes events of all sizes from the
            Olympics down to business breakfast meetings. Many industries,
            charitable organizations, and interest groups hold events in order
            to market themselves, build business relationships, raise money, or
            celebrate achievement.
          </p>
          <p className="mb-4">
            Sustainable event management (also known as event greening) is the
            process used to produce an event with particular concern for
            environmental, economic, and social issues. Sustainability in event
            management incorporates socially and environmentally responsible
            decision making into the planning, organization and implementation
            of, and participation in, an event. It involves including
            sustainable development principles and practices in all levels of
            event organization, and aims to ensure that an event is hosted
            responsibly. It represents the total package of interventions at an
            event, and needs to be done in an integrated manner. Event greening
            should start at the inception of the project, and should involve all
            the key role players, such as clients, organizers, venues,
            sub-contractors, and suppliers.
          </p>
        </div>
        <div className="lg:w-1/4 p-4">
          <div className="mb-4">
            <Image src={SummerPartyImage} alt="Summer Party" />
          </div>
          <div>
            <Image src={RevelationImage} alt="Revelation" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
