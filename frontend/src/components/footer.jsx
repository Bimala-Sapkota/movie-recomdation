import React from "react";

const footer = () => {
  return (
    <div className="text-gray-500 md:px-20">
      <div>
        <p> Develop by Bimala & Shreejana</p>
        <p> Read about Movie TV show and watch in Tumundu.com</p>
      </div>
      <p className="pd-5">Question? Contact us.</p>

      <div className=" grid grid-cols-2 md:grid-cols-4 text-sm pb-10 max-w-5xl">
        <ul className=" flex flex-col space-y-2">
          <li>FAQ</li>
          <li>Investor Relation</li>
          <li>privacy</li>
          <li>speedTest</li>
        </ul>

        <ul className=" flex flex-col space-y-2">
          <li> Help Center</li>
          <li> Jobs</li>
          <li>Cookie preference</li>
          <li> Legal Notice</li>
        </ul>
        <ul className=" flex flex-col space-y-2">
          <li> Account</li>
          <li> Ways to watch</li>
          <li> Corrporate Information</li>
          <li> Only on this movie app</li>
        </ul>

        <ul className=" flex flex-col space-y-2">
          <li> Media Center</li>
          <li> Terms of use</li>
          <li> Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default footer;
