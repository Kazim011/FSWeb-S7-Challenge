import React from "react";
import Header from "./Header";
import foto from "./image/Pizza.jpg";
import foto2 from "./image/canlı.jpeg";
import foto3 from "./image/dsc5080.jpg";
import "./about.css";

function About() {
  return (
    <div>
      <Header />
      <div className="ana-conteiner">
        <div className="img-conteiner">
          <img src={foto} alt="" />
        </div>
        <div className="bilgi">
          <h2>Cliff Cafe</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            molestiae, iusto veniam placeat delectus, consectetur mollitia
            consequuntur, a numquam ab autem at aut quod nostrum eum optio nihil
            excepturi ex laborum temporibus obcaecati illum iure corporis cum!
            Nihil id eaque, dolor debitis labore, tempore dolorem voluptates
            enim odit nesciunt minima? Incidunt inventore ut id, sequi nemo
            commodi doloremque corporis similique debitis eaque voluptatibus
            sint molestias ab eveniet vel quaerat et molestiae impedit porro,
            dolor nesciunt voluptatum atque minus. Minus facere suscipit aliquam
            reprehenderit incidunt temporibus architecto nemo natus fuga. A
            praesentium sint iusto, unde enim et eaque facilis laborum ad?
          </p>
        </div>
      </div>

      <div className="fotolar">
        <div className="foto1">
          <h3>Lorem ipsum dolor sit amet.</h3>
          <img src={foto2} alt="" />
        </div>
        <div className="foto2">
          <h3>Lorem ipsum dolor sit amet.</h3>
          <img src={foto3} alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
