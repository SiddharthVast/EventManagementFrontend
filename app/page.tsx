import Image from "next/image";
import CollegeImg from '../public/CollegeImg.png'
import Link from "next/link";

export default function Home() {
  return (
    // <main>
    //   <h1>Hello EventManagement</h1>
    // </main>

    <main style={{ padding: '2em', textAlign: 'center' }}>
      <div className="relative  flex justify-center" >
        <Image src={CollegeImg} alt="College Event Management System Banner" className=" " />
      </div>
      <section style={{ display: 'flex', justifyContent: 'space-between', padding: '2em' }}>
        <div style={{ width: '60%' }}>
          <h2 style={{ color: 'red', textTransform: 'uppercase', borderBottom: '2px solid gray', paddingBottom: '0.5em', marginBottom: '1em', fontSize: '1.5em', textAlign: 'left', width: '100%' }}>
            About College Event Management System
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1em' }}>
            <div style={{ border: '1px solid #ccc', padding: '1em', borderRadius: '8px' }}>
              <h3 style={{ textAlign: 'left' }}>Manage Events</h3>
              <Image src={CollegeImg} alt="Manage Events" layout="responsive" width={500} height={300} />
              <p>Ability to define Special Event days (days where employees cannot request time-off, are warned or notified on the calendar can also be done.)</p>
              <Link href="/login" legacyBehavior>
                <a target="_blank" style={{ display: 'block', marginTop: '1em', backgroundColor: 'gray', color: 'white', textAlign: 'center', padding: '0.5em', borderRadius: '4px' }}>Read More</a>
              </Link>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '1em', borderRadius: '8px' }}>
              <h3 style={{ textAlign: 'left' }}>Manage Users</h3>
              <Image src={CollegeImg} alt="Manage Users" layout="responsive" width={500} height={300} />
              <p>Add custom employee categories (i.e., departments, projects). Group your users by offices. Ability to display balance in hours or in days</p>
              <Link href="/login" legacyBehavior>
                <a target="_blank" style={{ display: 'block', marginTop: '1em', backgroundColor: 'gray', color: 'white', textAlign: 'center', padding: '0.5em', borderRadius: '4px' }}>Read More</a>
              </Link>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '1em', borderRadius: '8px' }}>
              <h3 style={{ textAlign: 'left' }}>Manage Event Themes</h3>
              <Image src={CollegeImg} alt="Manage Event Themes" layout="responsive" width={500} height={300} />
              <p>Customize your event themes to make them more engaging and lively for the attendees.</p>
              <Link href="/login" legacyBehavior>
                <a target="_blank" style={{ display: 'block', marginTop: '1em', backgroundColor: 'gray', color: 'white', textAlign: 'center', padding: '0.5em', borderRadius: '4px' }}>Read More</a>
              </Link>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '1em', borderRadius: '8px' }}>
              <h3 style={{ textAlign: 'left' }}>Manage Login</h3>
              <Image src={CollegeImg} alt="Manage Login" layout="responsive" width={500} height={300} />
              <p>Ensure your event stands out from the rest with secure and easy login management for all users.</p>
              <Link href="/login" legacyBehavior>
                <a target="_blank" style={{ display: 'block', marginTop: '1em', backgroundColor: 'gray', color: 'white', textAlign: 'center', padding: '0.5em', borderRadius: '4px' }}>Read More</a>
              </Link>
            </div>
          </div>
        </div>
        <div style={{ width: '25%' }}>
          <h2 style={{ color: 'red', textTransform: 'uppercase', borderBottom: '2px solid gray', paddingBottom: '0.5em', marginBottom: '1em', fontSize: '1.5em', textAlign: 'left', width: '100%' }}>
            Features
          </h2>
          <div style={{ height: '1000px', overflow: 'hidden' }}>
            <div style={{ border: '1px solid #ccc', padding: '1em', borderRadius: '8px', marginBottom: '1em', height: '400px' }}>
              <Image src={CollegeImg} alt="Features" objectFit="cover" width={500} height={100} />
            </div>
            <div style={{ border: '1px solid #ccc', padding: '1em', borderRadius: '8px', marginBottom: '1em', height: '400px' }}>
              <Image src={CollegeImg} alt="Pure Sound" layout="responsive" width={500} height={300} />
            </div>

          </div>
        </div>
      </section>
    </main>

  );
}
