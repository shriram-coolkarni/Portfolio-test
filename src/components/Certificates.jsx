import React from "react";

// Sample data for certificates
const CERTIFICATES = [
    {
      title: "AZ-204",
      issuer: "Azure",
      date: "Currently ongoing",
      link: "https://drive.google.com/file/d/1VFEpsc6Ww5R2C-KrinF48Fup9DQEdlKw/view?usp=sharing", // Replace with actual link
    },
  
  // Add more certificates as needed
];

const Certificates = () => {
  return (
    <section className="py-10">
      <h2 className='my-20 text-center text-4xl'>Certificates</h2>
      <div className="flex flex-wrap justify-center">
        {CERTIFICATES.map((cert, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md m-4 p-4 text-center w-80"
          >
            <h3 className="text-xl font-semibold">{cert.title}</h3>
            <p className="text-gray-400">{cert.issuer}</p>
            <p className="text-gray-400">{cert.date}</p>
            <a
              href={cert.link}
              className="text-blue-400 hover:underline mt-2 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href="https://drive.google.com/drive/folders/102uvvHcWGsC3HVqrWfs7NygEMejVObAC?usp=sharing" // Replace with your Google Drive link
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          See All Certifications
        </a>
      </div>
    </section>
  );
};

export default Certificates;
