import React from "react";
import "/public/css/aboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutUs p-4 d-flex flex-column align-items-center" id="aboutUs">
      <div className="content">
        <div className="row d-flex flex-row justify-content-between">
          <div className="col-4">
            <img src="/img/aboutus.png" alt="Tentang kami" />
          </div>
          <div className="col-8">
            <p className="title" id="aboutUs">
              Tentang Kami
            </p>
            <h2>Ketahui lebih banyak tentang kami</h2>
            <p className="about">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque sequi error modi veniam similique distinctio, repellendus saepe veritatis aliquam dolore iure perspiciatis explicabo? Eum dolor, unde laborum in assumenda asperiores.
              Deleniti autem mollitia ipsum eos nesciunt aperiam earum necessitatibus atque, neque quos facere numquam excepturi, recusandae nihil dolor! Provident voluptates maiores nisi expedita facilis corporis nostrum dicta consequuntur laudantium fugit!
              Enim veniam itaque natus beatae quia laborum aliquam porro aperiam recusandae quam. Autem accusantium laborum quisquam iure deleniti. Dolores sapiente hic necessitatibus animi itaque possimus nisi maiores facilis repellat aut?
              Dignissimos adipisci accusamus ipsam earum optio, voluptates ea, deleniti similique maiores iste recusandae reprehenderit reiciendis unde voluptatem voluptatibus debitis numquam aut quos ex molestiae laboriosam minima molestias aliquid? Quasi, suscipit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
