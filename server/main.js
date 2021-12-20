import { Meteor } from "meteor/meteor";
import bcrypt from "bcryptjs";

import { Customer } from "../imports/api/Customer";
import { Mandor } from "../imports/api/Mandor";
import { Experience } from "../imports/api/Experience";
import { Deal } from "../imports/api/Deal"
import { Review } from "../imports/api/Review"
import { Portfolio } from "../imports/api/Portfolio"

Meteor.startup(() => {
  if(Portfolio.find().count() == 0){
    Portfolio.insert({})
  }

  if(Experience.find().count() == 0){
    Experience.insert({})
  }

  if(Deal.find().count() == 0){
    Deal.insert({})
  }

  if(Review.find().count() == 0){
    Review.insert({})
  }

  if(Customer.find().count() == 0){
    const password = "customer123";
    const hashPassword = bcrypt.hashSync(password, 10);

    Customer.insert({
      name: "Muh. Arga Swara Iskandar",
      email: "arga@gmail.com",
      password: hashPassword,
      address: "Enrekang, Sulawesi Selatan",
      phone: "081340796948",
      moto: "",
      profile: "",
      imgUrl: "/img/arga.jpg",
      created_at: new Date()
    })
  }

  if(Mandor.find().count() == 0){
    const password = "mandor123";
    const hashPassword = bcrypt.hashSync(password, 10);

    Mandor.insert({
      name: "Atrianto Masri",
      email: "anto@gmail.com",
      password: hashPassword,
      address: "Enrekang, Sulawesi Selatan",
      phone: "081235980586",
      imgUrl: "/img/anto.png",
      moto: "Professional  Mandor at Indonesia",
      profile: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt alias, ipsum nemo aliquam sequi sapiente! Magnam sit commodi laudantium, nostrum consequatur quasi reiciendis eaque, error eum nemo, odio temporibus eius! Nostrum molestiae quam dolor provident fuga est rerum? Reprehenderit omnis ratione neque doloremque, iure dolorum, perferendis optio officiis quo qui eos, saepe laborum veritatis. Sequi aut harum eligendi blanditiis ab.",
      salary: 50000,
      jobDone: 10,
      skills: ["Rumah", "Gedung"],
      Experiences: [],
      rating: 4.9,
      created_at: new Date
    })
  }

});
